import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { compressImage } from "@/lib/imageCompression";
import { toast } from "sonner";

const BUCKET = "team-photos";
// Photos above this size get re-encoded
const SIZE_THRESHOLD = 400 * 1024;

type PhotoTable = "team_members" | "commission_members";

const storagePath = (url: string) => url.split(`/${BUCKET}/`)[1]?.split("?")[0];

/**
 * One-off maintenance: re-compresses team and commission photos that were
 * uploaded before client-side compression existed.
 */
export function useOptimizeTeamPhotos() {
  const queryClient = useQueryClient();
  const [optimizing, setOptimizing] = useState(false);

  const optimize = async () => {
    setOptimizing(true);
    let optimized = 0;
    let failed = 0;

    try {
      for (const table of ["team_members", "commission_members"] as PhotoTable[]) {
        const { data, error } = await supabase
          .from(table)
          .select("id, name, photo_url")
          .not("photo_url", "is", null);
        if (error) throw error;

        for (const row of data ?? []) {
          const oldPath = row.photo_url && storagePath(row.photo_url);
          if (!oldPath) continue;

          try {
            const res = await fetch(row.photo_url!, { cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            if (blob.size <= SIZE_THRESHOLD) continue;

            const original = new File([blob], oldPath.split("/").pop()!, { type: blob.type || "image/jpeg" });
            const compressed = await compressImage(original, { maxDimension: 1000, quality: 0.8 });
            if (compressed === original) continue;

            const folder = oldPath.split("/").slice(0, -1).join("/");
            const newPath = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
            const { error: uploadError } = await supabase.storage
              .from(BUCKET)
              .upload(newPath, compressed, { cacheControl: "31536000", contentType: "image/webp" });
            if (uploadError) throw uploadError;

            const newUrl = supabase.storage.from(BUCKET).getPublicUrl(newPath).data.publicUrl;
            const { error: updateError } = await supabase
              .from(table)
              .update({ photo_url: newUrl })
              .eq("id", row.id);
            if (updateError) throw updateError;

            await supabase.storage.from(BUCKET).remove([oldPath]);
            optimized++;
          } catch (err) {
            console.error(`Error optimizing photo for ${row.name}:`, err);
            failed++;
          }
        }
      }

      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["admin-team-members"] });
      queryClient.invalidateQueries({ queryKey: ["commission-members"] });
      queryClient.invalidateQueries({ queryKey: ["admin-commission-members"] });

      if (failed > 0) {
        toast.warning(`Se optimizaron ${optimized} fotos, ${failed} fallaron`);
      } else if (optimized > 0) {
        toast.success(`Se optimizaron ${optimized} fotos`);
      } else {
        toast.info("Todas las fotos ya están optimizadas");
      }
    } catch (error) {
      toast.error("Error al optimizar fotos: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setOptimizing(false);
    }
  };

  return { optimize, optimizing };
}
