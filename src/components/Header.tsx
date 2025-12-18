import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolidHeader = !isHomePage || isScrolled;

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${showSolidHeader ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src="/logo-integra.ico" alt="Integra" className="h-10 w-10 object-contain" />
            <span className={`text-xl font-bold transition-colors ${showSolidHeader ? "text-primary" : "text-white"}`}>
              <span className="font-light">integra</span>Residenciales
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center space-x-6">
            {[
              { to: "/", label: "Inicio" },
              { to: "/buscar", label: "Buscar Residencias" },
              { to: "/sobre-integra", label: "Sobre Integra" },
              { to: "/asesoramiento", label: "Buscamos por Ti" },
              { to: "/contacto", label: "Contacto" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`text-base font-medium transition-colors ${showSolidHeader ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"}`}
                activeClassName={showSolidHeader ? "text-primary font-semibold" : "text-white font-semibold"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Button variant={showSolidHeader ? "outline" : "secondary"} size="lg" className={`gap-2 ${!showSolidHeader ? "bg-white/20 hover:bg-white/30 text-white border-white/30" : ""}`} asChild>
              <a href="tel:+59899923330">
                <Phone className="h-4 w-4" />
                (+598) 99 923 330
              </a>
            </Button>
          </div>

          <button className={`lg:hidden p-2 rounded-md ${showSolidHeader ? "hover:bg-accent" : "hover:bg-white/10"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={`h-6 w-6 ${showSolidHeader ? "" : "text-white"}`} /> : <Menu className={`h-6 w-6 ${showSolidHeader ? "" : "text-white"}`} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-4 space-y-3 border-t border-border bg-background rounded-b-lg">
            {[
              { to: "/", label: "Inicio" },
              { to: "/buscar", label: "Buscar Residencias" },
              { to: "/sobre-integra", label: "Sobre Integra" },
              { to: "/asesoramiento", label: "Buscamos por Ti" },
              { to: "/contacto", label: "Contacto" },
            ].map((link) => (
              <NavLink key={link.to} to={link.to} className="block py-2 text-base font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <Button variant="outline" size="lg" className="w-full gap-2 mt-4" asChild>
              <a href="tel:+59899923330">
                <Phone className="h-4 w-4" />
                (+598) 99 923 330
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
