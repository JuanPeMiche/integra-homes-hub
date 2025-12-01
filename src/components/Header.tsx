import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Integra Residenciales" className="h-12 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/buscar" 
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Buscar Residencias
            </NavLink>
            <NavLink 
              to="/sobre-integra" 
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Sobre Integra
            </NavLink>
            <NavLink 
              to="/servicios" 
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Servicios
            </NavLink>
            <NavLink 
              to="/noticias" 
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Noticias
            </NavLink>
            <NavLink 
              to="/contacto" 
              className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Contacto
            </NavLink>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="tel:+59899923330">
                <Phone className="h-4 w-4" />
                (+598) 99 923 330
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-border">
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
              to="/servicios" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </NavLink>
            <NavLink 
              to="/noticias" 
              className="block py-2 text-base font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Noticias
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
