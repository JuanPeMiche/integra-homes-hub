import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import logoIntegra from "@/assets/logo-integra-new.png";

export const Footer = () => {
  return (
    <footer className="bg-trust text-trust-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Mobile: Logo centered at top */}
        <div className="md:hidden flex justify-center mb-8">
          <Link to="/" className="flex flex-col items-center gap-2">
            <img 
              src={logoIntegra} 
              alt="Integra Residenciales" 
              className="h-16 w-auto object-contain bg-white rounded-lg p-2"
            />
            <span className="text-lg font-bold">Integra Residenciales</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info - Desktop logo */}
          <div className="text-center md:text-left">
            {/* Desktop logo */}
            <div className="hidden md:flex items-center gap-3 mb-4">
              <img 
                src={logoIntegra} 
                alt="Integra Residenciales" 
                className="h-12 w-auto object-contain bg-white rounded-lg p-1"
              />
              <h3 className="font-bold text-xl">Integra Residenciales</h3>
            </div>
            <h3 className="font-bold text-xl mb-4 md:hidden">Sobre nosotros</h3>
            <p className="text-sm text-trust-foreground/90 mb-4">
              Integra Residenciales es una asociación civil sin fines de lucro dedicada a mejorar la calidad del cuidado de personas mayores en Uruguay.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Rincón 454 of. 213, Montevideo</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+59897774000" className="hover:text-secondary transition-colors">
                  598 97 774 000
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:integraresidenciales@cncs.com.uy" className="hover:text-secondary transition-colors text-xs sm:text-sm break-all">
                  integraresidenciales@cncs.com.uy
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <nav className="flex flex-col space-y-2 text-sm items-center md:items-start">
              <NavLink to="/" className="hover:text-secondary transition-colors">
                Inicio
              </NavLink>
              <NavLink to="/buscar" className="hover:text-secondary transition-colors">
                Buscar residencias
              </NavLink>
              <NavLink to="/sobre-integra" className="hover:text-secondary transition-colors">
                Sobre Integra
              </NavLink>
              <NavLink to="/servicios" className="hover:text-secondary transition-colors">
                Nuestros servicios
              </NavLink>
              <NavLink to="/noticias" className="hover:text-secondary transition-colors">
                Noticias
              </NavLink>
              <NavLink to="/contacto" className="hover:text-secondary transition-colors">
                Contacto
              </NavLink>
            </nav>
          </div>

          {/* For Professionals */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4">Para profesionales</h3>
            <nav className="flex flex-col space-y-2 text-sm items-center md:items-start">
              <NavLink to="/trabaja-con-nosotros" className="hover:text-secondary transition-colors">
                Trabaja con nosotros
              </NavLink>
              <NavLink to="/asociar-residencia" className="hover:text-secondary transition-colors">
                Asociar tu residencial
              </NavLink>
              <NavLink to="/asesoramiento" className="hover:text-secondary transition-colors">
                Buscamos por ti
              </NavLink>
              <NavLink to="/sobre-integra" className="hover:text-secondary transition-colors">
                Quiénes somos
              </NavLink>
              <a 
                href="https://app.integrasoft.com.uy/IntegraSoft/com.gp.seguridad.login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                Acceso a residenciales
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4">Seguinos</h3>
            <p className="text-sm text-trust-foreground/90 mb-4">
              Encontranos en redes sociales para novedades y consejos sobre el cuidado de mayores.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="https://www.facebook.com/people/Integra-Residenciales-Uy/100063468792108/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors flex items-center gap-2" 
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
                <span className="text-sm">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/integra_residenciales/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors flex items-center gap-2" 
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-trust-foreground/20 pt-6 text-center text-sm text-trust-foreground/80">
          <p className="mb-2">&copy; {new Date().getFullYear()} Integra Residenciales. Todos los derechos reservados.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            <NavLink to="/politica-privacidad" className="hover:text-secondary transition-colors underline">
              Política de privacidad
            </NavLink>
            <span className="text-trust-foreground/40 hidden sm:inline">|</span>
            <NavLink to="/terminos-condiciones" className="hover:text-secondary transition-colors underline">
              Términos y condiciones
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
