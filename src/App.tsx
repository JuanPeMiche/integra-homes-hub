import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/animations";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ResidenceDetail from "./pages/ResidenceDetail";
import Compare from "./pages/Compare";
import Services from "./pages/Services";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Asesoramiento from "./pages/Asesoramiento";
import Favorites from "./pages/Favorites";
import TrabajaConNosotros from "./pages/TrabajaConNosotros";
import AsociarResidencia from "./pages/AsociarResidencia";
import Convenios from "./pages/Convenios";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgress />
          <ScrollToTop />
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
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Navigate to="/admin-login" replace />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
            <Route path="/asociar-residencia" element={<AsociarResidencia />} />
            <Route path="/convenios" element={<Convenios />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
            <Route path="/terminos-condiciones" element={<TermsConditions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
