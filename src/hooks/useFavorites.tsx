import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('residence_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data?.map(f => f.residence_id) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = useCallback((residenceId: string) => {
    return favorites.includes(residenceId);
  }, [favorites]);

  const toggleFavorite = useCallback(async (residenceId: string) => {
    if (!user) {
      toast.error('Iniciá sesión para guardar favoritos');
      return false;
    }

    const isCurrentlyFavorite = favorites.includes(residenceId);

    try {
      if (isCurrentlyFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('residence_id', residenceId);

        if (error) throw error;

        setFavorites(prev => prev.filter(id => id !== residenceId));
        toast.success('Eliminado de favoritos');
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            residence_id: residenceId
          });

        if (error) throw error;

        setFavorites(prev => [...prev, residenceId]);
        toast.success('Agregado a favoritos');
      }
      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Error al actualizar favoritos');
      return false;
    }
  }, [user, favorites]);

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites
  };
};