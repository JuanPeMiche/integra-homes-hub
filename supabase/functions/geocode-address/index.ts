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

// Common Uruguayan street abbreviations
const streetAbbreviations: Record<string, string> = {
  'Pte.': 'Presidente ',
  'Pte ': 'Presidente ',
  'Gral.': 'General ',
  'Gral ': 'General ',
  'Av.': 'Avenida ',
  'Av ': 'Avenida ',
  'Bvar.': 'Bulevar ',
  'Bvar ': 'Bulevar ',
  'Blvr.': 'Bulevar ',
  'Blvr ': 'Bulevar ',
  'Dr.': 'Doctor ',
  'Dr ': 'Doctor ',
  'Cno.': 'Camino ',
  'Cno ': 'Camino ',
  'Rbla.': 'Rambla ',
  'Rbla ': 'Rambla ',
  'esq.': 'esquina ',
  'esq ': 'esquina ',
};

// Expand abbreviations in address
function expandAbbreviations(address: string): string {
  let expanded = address;
  for (const [abbr, full] of Object.entries(streetAbbreviations)) {
    expanded = expanded.replace(new RegExp(abbr.replace('.', '\\.'), 'gi'), full);
  }
  return expanded;
}

// Clean address by removing duplicates and extra info
function cleanAddress(address: string, city: string, province: string): string[] {
  // First expand abbreviations
  const expandedAddress = expandAbbreviations(address);
  
  // Remove common patterns that cause issues
  const cleanedAddress = expandedAddress
    .replace(/,\s*Uruguay/gi, '')
    .replace(/,\s*Montevideo/gi, '')
    .replace(/esquina\s+\w+/gi, '') // Remove corner references that confuse geocoding
    .trim();
  
  const cleanedCity = city
    .replace(/,\s*Uruguay/gi, '')
    .replace(/,\s*Montevideo/gi, '')
    .trim();
  
  const cleanedProvince = province
    .replace(/,\s*Uruguay/gi, '')
    .trim();
  
  // Extract just the street number for simpler queries
  const streetMatch = expandedAddress.match(/^([A-Za-záéíóúñÁÉÍÓÚÑ\s]+)\s*(\d+)/i);
  const streetOnly = streetMatch ? `${streetMatch[1].trim()} ${streetMatch[2]}` : null;
  
  // Generate multiple search queries to try
  const queries = [
    // Most specific: expanded street + number + Uruguay
    streetOnly ? `${streetOnly}, Uruguay` : null,
    // With city
    streetOnly ? `${streetOnly}, ${cleanedCity}, Uruguay` : null,
    // Cleaned full address
    `${cleanedAddress}, Uruguay`,
    // With city
    `${cleanedAddress}, ${cleanedCity}, Uruguay`,
    // Full but cleaned
    `${cleanedAddress}, ${cleanedCity}, ${cleanedProvince}, Uruguay`,
  ].filter(Boolean) as string[];
  
  return [...new Set(queries)]; // Remove duplicates
}

// Fallback to Nominatim (OpenStreetMap) - free service
async function geocodeWithNominatim(address: string, city: string, province: string): Promise<{ lat: number; lng: number; formatted_address: string } | null> {
  const queries = cleanAddress(address, city, province);
  
  for (const query of queries) {
    console.log(`Nominatim: Trying query: ${query}`);
    const encodedAddress = encodeURIComponent(query);
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&countrycodes=uy`;
    
    try {
      const response = await fetch(nominatimUrl, {
        headers: {
          'User-Agent': 'IntegraResidencias/1.0 (contact@integraresidencias.uy)'
        }
      });
      const data = await response.json();
      
      console.log(`Nominatim response for "${query}": ${JSON.stringify(data)}`);
      
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
      
      // Small delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`Nominatim geocoding error for "${query}":`, error);
    }
  }
  
  console.log('Nominatim: No results found for any query variant');
  return null;
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

    console.log(`Geocoding address: ${address}, city: ${city}, province: ${province}`);
    
    // Build full address for Google geocoding
    const fullAddress = [address, city, province, 'Uruguay'].filter(Boolean).join(', ');
    
    // Try Google first
    const googleApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    let result = null;
    
    if (googleApiKey) {
      result = await geocodeWithGoogle(fullAddress, googleApiKey);
    } else {
      console.log('No Google API key configured, skipping Google geocoding');
    }
    
    // Fallback to Nominatim if Google fails (with smarter query handling)
    if (!result) {
      console.log('Trying Nominatim as fallback...');
      result = await geocodeWithNominatim(address, city || '', province || '');
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
