import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ResidenceDetail from "./pages/ResidenceDetail";
import Compare from "./pages/Compare";
import Services from "./pages/Services";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Asesoramiento from "./pages/Asesoramiento";
import Favorites from "./pages/Favorites";
import TrabajaConNosotros from "./pages/TrabajaConNosotros";
import AsociarResidencia from "./pages/AsociarResidencia";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/buscar" element={<SearchResults />} />
            <Route path="/residencia/:id" element={<ResidenceDetail />} />
            <Route path="/comparar" element={<Compare />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/sobre-integra" element={<About />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/noticias/:id" element={<News />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/asesoramiento" element={<Asesoramiento />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
            <Route path="/asociar-residencia" element={<AsociarResidencia />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
