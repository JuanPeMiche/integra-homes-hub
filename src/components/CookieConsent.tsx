import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Settings, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const COOKIE_CONSENT_KEY = "integra_cookie_consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to avoid showing immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    saveConsent(allAccepted);
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false };
    saveConsent(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card border border-border rounded-xl shadow-2xl p-6 relative">
            <button
              onClick={acceptNecessaryOnly}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex-grow pr-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  🍪 Utilizamos cookies
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Usamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. 
                  Puedes aceptar todas las cookies, solo las necesarias, o configurar tus preferencias.{" "}
                  <Link to="/politica-privacidad" className="text-primary hover:underline">
                    Más información
                  </Link>
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="bg-primary hover:bg-primary/90">
                    Aceptar todas
                  </Button>
                  <Button variant="outline" onClick={acceptNecessaryOnly}>
                    Solo necesarias
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowSettings(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de Cookies
            </DialogTitle>
            <DialogDescription>
              Personaliza qué tipos de cookies deseas permitir. Las cookies necesarias no se pueden desactivar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Cookies Necesarias</Label>
                <p className="text-sm text-muted-foreground">
                  Esenciales para el funcionamiento del sitio. No se pueden desactivar.
                </p>
              </div>
              <Switch checked={true} disabled className="mt-1" />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Cookies de Análisis</Label>
                <p className="text-sm text-muted-foreground">
                  Nos ayudan a entender cómo se usa el sitio para mejorarlo. Incluye Google Analytics.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Cookies de Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Permiten mostrar contenido personalizado y compartir en redes sociales.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancelar
            </Button>
            <Button onClick={saveCustomPreferences}>
              Guardar preferencias
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
