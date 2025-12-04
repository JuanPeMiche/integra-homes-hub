import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const Footer = () => {
  return (
    <footer className="bg-trust text-trust-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">Integra Residenciales</h3>
            <p className="text-sm text-trust-foreground/90 mb-4">
              Integra Residenciales es una asociación civil sin fines de lucro dedicada a mejorar la calidad del cuidado de personas mayores en Uruguay.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Rincón 454 of. 213, Montevideo</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+59899923330" className="hover:text-secondary transition-colors">
                  (+598) 99 923 330
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:hola@integraresidenciales.com.uy" className="hover:text-secondary transition-colors">
                  hola@integraresidenciales.com.uy
                </a>
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
              <NavLink to="/sobre-integra" className="hover:text-secondary transition-colors">
                Sobre Integra
              </NavLink>
              <NavLink to="/servicios" className="hover:text-secondary transition-colors">
                Nuestros Servicios
              </NavLink>
              <NavLink to="/noticias" className="hover:text-secondary transition-colors">
                Noticias
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
              <NavLink to="/sobre-integra" className="hover:text-secondary transition-colors">
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
              <a 
                href="https://www.facebook.com/people/Integra-Residenciales-Uy/100063468792108/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors" 
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/integra_residenciales/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors" 
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
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
