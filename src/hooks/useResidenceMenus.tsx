import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export interface MenuData {
  dias: string[];
  comidas: {
    Desayuno: Record<string, string>;
    Almuerzo: Record<string, string>;
    Merienda: Record<string, string>;
    Cena: Record<string, string>;
  };
}

export interface ResidenceMenu {
  id: string;
  residence_id: string;
  season: 'verano' | 'invierno';
  nota: string | null;
  menu_data: MenuData;
  created_at: string;
  updated_at: string;
}

const transformMenuData = (row: {
  id: string;
  residence_id: string;
  season: string;
  nota: string | null;
  menu_data: Json;
  created_at: string;
  updated_at: string;
}): ResidenceMenu => {
  return {
    id: row.id,
    residence_id: row.residence_id,
    season: row.season as 'verano' | 'invierno',
    nota: row.nota,
    menu_data: row.menu_data as unknown as MenuData,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

export const useResidenceMenus = (residenceId: string) => {
  return useQuery({
    queryKey: ['residence-menus', residenceId],
    queryFn: async (): Promise<ResidenceMenu[]> => {
      const { data, error } = await supabase
        .from('residence_menus')
        .select('*')
        .eq('residence_id', residenceId)
        .order('season', { ascending: false }); // verano first

      if (error) throw error;
      return (data || []).map(transformMenuData);
    },
    enabled: !!residenceId,
  });
};

export const useUpsertResidenceMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      residenceId,
      season,
      nota,
      menuData,
    }: {
      residenceId: string;
      season: 'verano' | 'invierno';
      nota: string;
      menuData: MenuData;
    }) => {
      // First try to find existing menu
      const { data: existing } = await supabase
        .from('residence_menus')
        .select('id')
        .eq('residence_id', residenceId)
        .eq('season', season)
        .single();

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from('residence_menus')
          .update({
            nota,
            menu_data: menuData as unknown as Json,
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return transformMenuData(data);
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('residence_menus')
          .insert({
            residence_id: residenceId,
            season,
            nota,
            menu_data: menuData as unknown as Json,
          })
          .select()
          .single();

        if (error) throw error;
        return transformMenuData(data);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['residence-menus', variables.residenceId] });
    },
  });
};

export const useDeleteResidenceMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ menuId, residenceId }: { menuId: string; residenceId: string }) => {
      const { error } = await supabase
        .from('residence_menus')
        .delete()
        .eq('id', menuId);

      if (error) throw error;
      return { menuId, residenceId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['residence-menus', result.residenceId] });
    },
  });
};
