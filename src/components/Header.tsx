import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolidHeader = !isHomePage || isScrolled;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${showSolidHeader ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/logo-integra.ico" alt="Integra" className="h-10 w-10 object-contain" />
            <span className={`text-xl font-bold transition-colors ${showSolidHeader ? "text-primary" : "text-white"}`}>
              <span className="font-light">integra</span>Residenciales
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {[
              { to: "/", label: "Inicio" },
              { to: "/buscar", label: "Buscar Residencias" },
              { to: "/convenios", label: "Convenios" },
              { to: "/sobre-integra", label: "Sobre Integra" },
              { to: "/noticias", label: "Noticias" },
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

          <div className="hidden lg:flex items-center gap-3">
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={showSolidHeader ? "outline" : "secondary"} size="sm" className={`gap-2 ${!showSolidHeader ? "bg-white/20 hover:bg-white/30 text-white border-white/30" : ""}`}>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {getInitials(user.email || "")}
                        </AvatarFallback>
                      </Avatar>
                      Mi Cuenta
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate("/favoritos")} className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Mis Favoritos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant={showSolidHeader ? "default" : "secondary"} 
                  size="sm" 
                  className={`gap-2 ${!showSolidHeader ? "bg-white/20 hover:bg-white/30 text-white border-white/30" : ""}`}
                  onClick={() => navigate("/auth")}
                >
                  <User className="h-4 w-4" />
                  Ingresar
                </Button>
              )
            )}
            <Button variant={showSolidHeader ? "outline" : "secondary"} size="sm" className={`gap-2 ${!showSolidHeader ? "bg-white/20 hover:bg-white/30 text-white border-white/30" : ""}`} asChild>
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
          <nav className="lg:hidden py-3 space-y-1 border-t border-border bg-background rounded-b-lg px-2">
            {[
              { to: "/", label: "Inicio" },
              { to: "/buscar", label: "Buscar Residencias" },
              { to: "/convenios", label: "Convenios" },
              { to: "/sobre-integra", label: "Sobre Integra" },
              { to: "/noticias", label: "Noticias" },
              { to: "/asesoramiento", label: "Buscamos por Ti" },
              { to: "/contacto", label: "Contacto" },
            ].map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className="block py-2.5 px-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            
            
            {!loading && (
              user ? (
                <>
                  <NavLink 
                    to="/favoritos" 
                    className="block py-2.5 px-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="inline mr-2 h-4 w-4" />
                    Mis Favoritos
                  </NavLink>
                  <Button variant="outline" size="sm" className="w-full justify-start text-destructive mt-2" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button variant="default" size="sm" className="w-full mt-2" onClick={() => { setIsMenuOpen(false); navigate("/auth"); }}>
                  <User className="mr-2 h-4 w-4" />
                  Ingresar / Registrarse
                </Button>
              )
            )}
            
            <Button variant="outline" size="sm" className="w-full gap-2 mt-2" asChild>
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
