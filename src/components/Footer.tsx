import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-trust text-trust-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Integra Residenciales" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-trust-foreground/90 mb-4">
              Integra Residenciales es una asociación civil sin fines de lucro dedicada a mejorar la calidad del cuidado de personas mayores en Uruguay.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Montevideo, Uruguay</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>2908 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hola@integraresidenciales.com.uy</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <NavLink to="/" className="hover:text-secondary transition-colors">
                Inicio
              </NavLink>
              <NavLink to="/buscar" className="hover:text-secondary transition-colors">
                Buscar Residencias
              </NavLink>
              <NavLink to="/comparar" className="hover:text-secondary transition-colors">
                Comparador
              </NavLink>
              <NavLink to="/servicios" className="hover:text-secondary transition-colors">
                Nuestros Servicios
              </NavLink>
              <NavLink to="/contacto" className="hover:text-secondary transition-colors">
                Contacto
              </NavLink>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Información Legal</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <NavLink to="/quienes-somos" className="hover:text-secondary transition-colors">
                Quiénes Somos
              </NavLink>
              <NavLink to="/aviso-legal" className="hover:text-secondary transition-colors">
                Aviso Legal
              </NavLink>
              <NavLink to="/privacidad" className="hover:text-secondary transition-colors">
                Política de Privacidad
              </NavLink>
              <NavLink to="/cookies" className="hover:text-secondary transition-colors">
                Política de Cookies
              </NavLink>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Boletín Informativo</h3>
            <p className="text-sm text-trust-foreground/90 mb-4">
              Suscríbete para recibir consejos y novedades sobre el cuidado de mayores.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Tu email" 
                className="bg-trust-foreground/10 border-trust-foreground/20 text-trust-foreground placeholder:text-trust-foreground/60"
              />
              <Button variant="secondary" size="icon" className="shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-trust-foreground/20 pt-6 text-center text-sm text-trust-foreground/80">
          <p>&copy; {new Date().getFullYear()} Integra Residenciales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
