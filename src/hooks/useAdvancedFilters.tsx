import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAllServices() {
  return useQuery({
    queryKey: ['all-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('residences')
        .select('services');
      
      if (error) throw error;
      
      const allServices = new Set<string>();
      data?.forEach(row => {
        (row.services || []).forEach((service: string) => allServices.add(service));
      });
      
      return Array.from(allServices).sort((a, b) => a.localeCompare(b));
    },
  });
}

export function useAllFacilities() {
  return useQuery({
    queryKey: ['all-facilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('residences')
        .select('facilities');
      
      if (error) throw error;
      
      const allFacilities = new Set<string>();
      data?.forEach(row => {
        (row.facilities || []).forEach((facility: string) => allFacilities.add(facility));
      });
      
      return Array.from(allFacilities).sort((a, b) => a.localeCompare(b));
    },
  });
}

export function useAllActivities() {
  return useQuery({
    queryKey: ['all-activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('residences')
        .select('activities');
      
      if (error) throw error;
      
      const allActivities = new Set<string>();
      data?.forEach(row => {
        (row.activities || []).forEach((activity: string) => allActivities.add(activity));
      });
      
      return Array.from(allActivities).sort((a, b) => a.localeCompare(b));
    },
  });
}
