import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Try Google Maps Geocoding API first
async function geocodeWithGoogle(fullAddress: string, apiKey: string): Promise<{ lat: number; lng: number; formatted_address: string } | null> {
  const encodedAddress = encodeURIComponent(fullAddress);
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  
  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    
    console.log(`Google Geocode response status: ${data.status}`);
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      console.log(`Google: Coordinates found: lat=${location.lat}, lng=${location.lng}`);
      return {
        lat: location.lat,
        lng: location.lng,
        formatted_address: data.results[0].formatted_address
      };
    }
    
    console.log(`Google failed with status: ${data.status}, error: ${data.error_message || 'none'}`);
    return null;
  } catch (error) {
    console.error('Google geocoding error:', error);
    return null;
  }
}

// Fallback to Nominatim (OpenStreetMap) - free service
async function geocodeWithNominatim(fullAddress: string): Promise<{ lat: number; lng: number; formatted_address: string } | null> {
  const encodedAddress = encodeURIComponent(fullAddress);
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
  
  try {
    const response = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'IntegraResidencias/1.0'
      }
    });
    const data = await response.json();
    
    console.log(`Nominatim response: ${JSON.stringify(data)}`);
    
    if (data && data.length > 0) {
      const result = data[0];
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);
      console.log(`Nominatim: Coordinates found: lat=${lat}, lng=${lng}`);
      return {
        lat,
        lng,
        formatted_address: result.display_name
      };
    }
    
    console.log('Nominatim: No results found');
    return null;
  } catch (error) {
    console.error('Nominatim geocoding error:', error);
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address, city, province } = await req.json();
    
    if (!address) {
      return new Response(
        JSON.stringify({ error: 'Address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build full address for better geocoding results
    const fullAddress = [address, city, province, 'Uruguay'].filter(Boolean).join(', ');
    console.log(`Geocoding address: ${fullAddress}`);
    
    // Try Google first
    const googleApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    let result = null;
    
    if (googleApiKey) {
      result = await geocodeWithGoogle(fullAddress, googleApiKey);
    } else {
      console.log('No Google API key configured, skipping Google geocoding');
    }
    
    // Fallback to Nominatim if Google fails
    if (!result) {
      console.log('Trying Nominatim as fallback...');
      result = await geocodeWithNominatim(fullAddress);
    }
    
    if (result) {
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.log(`No results found for address: ${fullAddress}`);
      return new Response(
        JSON.stringify({ error: 'No se encontraron coordenadas para esta dirección' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
