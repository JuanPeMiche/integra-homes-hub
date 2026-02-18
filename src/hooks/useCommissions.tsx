import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CommissionMember {
  id: string;
  commission_type: string;
  name: string;
  role: string | null;
  photo_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCommissions = (commissionType?: string) => {
  return useQuery({
    queryKey: ['commission-members', commissionType],
    queryFn: async () => {
      let query = supabase
        .from('commission_members')
        .select('*')
        .order('display_order');
      
      if (commissionType) {
        query = query.eq('commission_type', commissionType);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as CommissionMember[];
    },
  });
};

export const useAdminCommissions = () => {
  const queryClient = useQueryClient();

  const { data: commissionMembers, isLoading, refetch } = useQuery({
    queryKey: ['admin-commission-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('commission_members')
        .select('*')
        .order('commission_type')
        .order('display_order');
      
      if (error) throw error;
      return data as CommissionMember[];
    },
  });

  const createMember = useMutation({
    mutationFn: async (member: { commission_type: string; name: string; role?: string; display_order?: number }) => {
      const { data, error } = await supabase
        .from('commission_members')
        .insert([member])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-commission-members'] });
      queryClient.invalidateQueries({ queryKey: ['commission-members'] });
      toast.success("Miembro agregado");
    },
    onError: (error) => {
      toast.error("Error al agregar miembro: " + error.message);
    },
  });

  const updateMember = useMutation({
    mutationFn: async ({ id, ...member }: Partial<CommissionMember> & { id: string }) => {
      const { data, error } = await supabase
        .from('commission_members')
        .update(member)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-commission-members'] });
      queryClient.invalidateQueries({ queryKey: ['commission-members'] });
      toast.success("Miembro actualizado");
    },
    onError: (error) => {
      toast.error("Error al actualizar miembro: " + error.message);
    },
  });

  const deleteMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('commission_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-commission-members'] });
      queryClient.invalidateQueries({ queryKey: ['commission-members'] });
      toast.success("Miembro eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar miembro: " + error.message);
    },
  });

  return {
    commissionMembers,
    isLoading,
    refetch,
    createMember,
    updateMember,
    deleteMember,
  };
};
