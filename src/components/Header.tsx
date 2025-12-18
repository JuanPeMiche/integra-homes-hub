import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo-integra.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Integra Residenciales" 
              className={`h-12 w-auto object-contain transition-all duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={`text-base font-medium transition-colors ${
                isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
              activeClassName={isScrolled ? "text-primary font-semibold" : "text-white font-semibold"}
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/buscar" 
              className={`text-base font-medium transition-colors ${
                isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
              activeClassName={isScrolled ? "text-primary font-semibold" : "text-white font-semibold"}
            >
              Buscar Residencias
            </NavLink>
            <NavLink 
              to="/sobre-integra" 
              className={`text-base font-medium transition-colors ${
                isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
              activeClassName={isScrolled ? "text-primary font-semibold" : "text-white font-semibold"}
            >
              Sobre Integra
            </NavLink>
            <NavLink 
              to="/comparar" 
              className={`text-base font-medium transition-colors ${
                isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
              activeClassName={isScrolled ? "text-primary font-semibold" : "text-white font-semibold"}
            >
              Comparador
            </NavLink>
            <NavLink 
              to="/contacto" 
              className={`text-base font-medium transition-colors ${
                isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
              activeClassName={isScrolled ? "text-primary font-semibold" : "text-white font-semibold"}
            >
              Contacto
            </NavLink>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant={isScrolled ? "outline" : "secondary"} 
              size="lg" 
              className={`gap-2 ${!isScrolled ? "bg-white/20 hover:bg-white/30 text-white border-white/30" : ""}`}
              asChild
            >
              <a href="tel:+59899923330">
                <Phone className="h-4 w-4" />
                (+598) 99 923 330
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md ${isScrolled ? "hover:bg-accent" : "hover:bg-white/10"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-border bg-background rounded-b-lg">
            <NavLink 
              to="/" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/buscar" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Buscar Residencias
            </NavLink>
            <NavLink 
              to="/sobre-integra" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Integra
            </NavLink>
            <NavLink 
              to="/comparar" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Comparador
            </NavLink>
            <NavLink 
              to="/contacto" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </NavLink>
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
