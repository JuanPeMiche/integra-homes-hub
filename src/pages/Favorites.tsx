import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import { mockResidences } from "@/data/residences";
import { ResidenceCard } from "@/components/ResidenceCard";
import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading: favLoading } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const favoriteResidences = mockResidences.filter(r => favorites.includes(r.id));

  if (authLoading || favLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-subtle py-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Heart className="h-10 w-10 text-red-500 fill-red-500" />
              Mis favoritos
            </h1>
            <p className="text-muted-foreground text-lg">
              Residencias que has guardado para consultar más tarde
            </p>
          </div>

          {favoriteResidences.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-2">No tienes favoritos aún</h2>
              <p className="text-muted-foreground mb-6">
                Explora nuestras residencias y guarda las que más te interesen
              </p>
              <Button size="lg" onClick={() => navigate("/buscar")}>
                <Search className="mr-2 h-5 w-5" />
                Buscar residencias
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteResidences.map((residence) => (
                <ResidenceCard key={residence.id} residence={residence} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
