import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Convenio {
  id: string;
  name: string;
  main_benefit: string;
  details: string | null;
  conditions: string | null;
  logo_url: string | null;
  secondary_logo_url: string | null;
  cta_label: string | null;
  cta_link: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useConvenios = () => {
  return useQuery({
    queryKey: ['convenios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('convenios')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as Convenio[];
    },
  });
};

export const useAdminConvenios = () => {
  const queryClient = useQueryClient();

  const conveniosQuery = useQuery({
    queryKey: ['admin-convenios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('convenios')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as Convenio[];
    },
  });

  const createConvenio = useMutation({
    mutationFn: async (convenio: { name: string; main_benefit: string; display_order?: number; is_active?: boolean }) => {
      const { data, error } = await supabase
        .from('convenios')
        .insert([convenio])
        .select()
        .single();
      
      if (error) throw error;
      return data as Convenio;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-convenios'] });
      queryClient.invalidateQueries({ queryKey: ['convenios'] });
    },
  });

  const updateConvenio = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Convenio> & { id: string }) => {
      const { data, error } = await supabase
        .from('convenios')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-convenios'] });
      queryClient.invalidateQueries({ queryKey: ['convenios'] });
    },
  });

  const deleteConvenio = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('convenios')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-convenios'] });
      queryClient.invalidateQueries({ queryKey: ['convenios'] });
    },
  });

  return {
    convenios: conveniosQuery.data,
    isLoading: conveniosQuery.isLoading,
    refetch: conveniosQuery.refetch,
    createConvenio,
    updateConvenio,
    deleteConvenio,
  };
};
