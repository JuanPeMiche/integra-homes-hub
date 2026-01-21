import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, ChevronDown, FileText, Shield, Info, Handshake, Search } from "lucide-react";
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
import logoIntegra from "@/assets/logo-integra-new.png";

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
          {/* Logo - Clickeable, más grande y visible */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <img 
              src={logoIntegra} 
              alt="Integra Residenciales" 
              className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain drop-shadow-sm" 
            />
            <span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold transition-colors whitespace-nowrap ${showSolidHeader ? "text-foreground" : "text-white drop-shadow-md"}`}>
              Integra Residenciales
            </span>
          </Link>

          {/* Desktop Nav - Sin "Inicio" ya que el logo lleva al home */}
          <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
            {[
              { to: "/buscar", label: "Buscar residencias" },
              { to: "/convenios", label: "Convenios" },
              { to: "/noticias", label: "Noticias" },
              { to: "/contacto", label: "Contacto" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`text-sm lg:text-base font-medium transition-colors ${showSolidHeader ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"}`}
                activeClassName={showSolidHeader ? "text-primary font-semibold" : "text-white font-semibold"}
              >
                {link.label}
              </NavLink>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-1 text-sm lg:text-base font-medium transition-colors ${showSolidHeader ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"}`}>
                  Más
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background">
                <DropdownMenuItem onClick={() => navigate("/sobre-integra")} className="cursor-pointer">
                  <Info className="mr-2 h-4 w-4" />
                  Sobre Integra
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/asesoramiento")} className="cursor-pointer">
                  <Search className="mr-2 h-4 w-4" />
                  Buscamos por ti
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/trabaja-con-nosotros")} className="cursor-pointer">
                  <Handshake className="mr-2 h-4 w-4" />
                  Trabaja con nosotros
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/politica-privacidad")} className="cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  Política de privacidad
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/terminos-condiciones")} className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Términos y condiciones
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden xl:flex items-center gap-2 lg:gap-3">
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
                      Mi cuenta
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
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
              <a href="tel:+59897774000">
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">598 97 774 000</span>
                <span className="lg:hidden">Llamar</span>
              </a>
            </Button>
          </div>

          {/* Mobile/Tablet menu button - visible below xl (1280px) */}
          <button 
            className={`xl:hidden p-2 rounded-md transition-colors ${showSolidHeader ? "hover:bg-accent" : "hover:bg-white/10"}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className={`h-6 w-6 ${showSolidHeader ? "" : "text-white"}`} /> : <Menu className={`h-6 w-6 ${showSolidHeader ? "" : "text-white"}`} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="xl:hidden py-3 space-y-1 border-t border-border bg-background rounded-b-lg px-2 animate-fade-in">
            {[
              { to: "/buscar", label: "Buscar residencias" },
              { to: "/convenios", label: "Convenios" },
              { to: "/sobre-integra", label: "Sobre Integra" },
              { to: "/noticias", label: "Noticias" },
              { to: "/asesoramiento", label: "Buscamos por ti" },
              { to: "/contacto", label: "Contacto" },
              { to: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
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
                  <Button variant="outline" size="sm" className="w-full justify-start text-destructive mt-2" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
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
              <a href="tel:+59897774000">
                <Phone className="h-4 w-4" />
                598 97 774 000
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
