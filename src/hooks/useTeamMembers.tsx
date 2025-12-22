import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as TeamMember[];
    },
  });
};

export const useAdminTeamMembers = () => {
  const queryClient = useQueryClient();

  const { data: teamMembers, isLoading, refetch } = useQuery({
    queryKey: ['admin-team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const createMember = useMutation({
    mutationFn: async (member: { name: string; role: string; display_order?: number }) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert([member])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast.success("Miembro agregado");
    },
    onError: (error) => {
      toast.error("Error al agregar miembro: " + error.message);
    },
  });

  const updateMember = useMutation({
    mutationFn: async ({ id, ...member }: Partial<TeamMember> & { id: string }) => {
      const { data, error } = await supabase
        .from('team_members')
        .update(member)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast.success("Miembro actualizado");
    },
    onError: (error) => {
      toast.error("Error al actualizar miembro: " + error.message);
    },
  });

  const deleteMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast.success("Miembro eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar miembro: " + error.message);
    },
  });

  return {
    teamMembers,
    isLoading,
    refetch,
    createMember,
    updateMember,
    deleteMember,
  };
};
