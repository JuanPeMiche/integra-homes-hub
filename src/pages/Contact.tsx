import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SendMethodDialog } from "@/components/SendMethodDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Phone, MapPin, Facebook, Instagram, Send, MessageCircle, Clock, Heart } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    consulta: "",
    genero: "",
    habitacion: "",
  });
  const [showSendDialog, setShowSendDialog] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.consulta) {
      toast.error("Por favor completá todos los campos requeridos");
      return;
    }
    setShowSendDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/90 to-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactanos</h1>
              <p className="text-xl text-white/90">
                Estamos aquí para ayudarte a encontrar el mejor hogar para tus seres queridos
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Send className="h-6 w-6 text-primary" />
                      Envianos tu consulta
                    </CardTitle>
                    <CardDescription>
                      Completá el formulario y elegí cómo enviarlo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre completo *</Label>
                          <Input
                            id="nombre"
                            placeholder="Tu nombre"
                            required
                            value={formData.nombre}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                        <Input
                          id="telefono"
                          type="tel"
                          placeholder="099 123 456"
                          required
                          value={formData.telefono}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consulta">Tu consulta *</Label>
                        <Textarea
                          id="consulta"
                          placeholder="Contanos en qué podemos ayudarte..."
                          required
                          rows={4}
                          value={formData.consulta}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label>El huésped es</Label>
                          <RadioGroup
                            value={formData.genero}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, genero: value }))
                            }
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mujer" id="mujer" />
                              <Label htmlFor="mujer" className="cursor-pointer">
                                Mujer
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hombre" id="hombre" />
                              <Label htmlFor="hombre" className="cursor-pointer">
                                Hombre
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-3">
                          <Label>Prefiere habitación</Label>
                          <RadioGroup
                            value={formData.habitacion}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, habitacion: value }))
                            }
                            className="flex flex-wrap gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="privada" id="privada" />
                              <Label htmlFor="privada" className="cursor-pointer">
                                Privada
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="compartida" id="compartida" />
                              <Label htmlFor="compartida" className="cursor-pointer">
                                Compartida
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cualquiera" id="cualquiera" />
                              <Label htmlFor="cualquiera" className="cursor-pointer">
                                Cualquiera
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full gap-2">
                        <Send className="h-5 w-5" />
                        Enviar Consulta
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Vías de contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a
                      href="mailto:hola@integraresidenciales.com.uy"
                      className="flex items-center gap-3 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="text-sm font-medium">hola@integraresidenciales.com.uy</span>
                    </a>

                    <a
                      href="https://wa.me/59899923330"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">WhatsApp: (+598) 99 923 330</span>
                    </a>

                    <div className="flex gap-3 pt-2">
                      <a
                        href="https://www.facebook.com/people/Integra-Residenciales-Uy/100063468792108/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a
                        href="https://www.instagram.com/integra_residenciales/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Work With Us */}
                <Card className="border-secondary/30 bg-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Heart className="h-5 w-5 text-secondary" />
                      Trabajá con nosotros
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      Si tenés vocación de servicio en el cuidado de personas mayores y te gustaría
                      formar parte de nuestro equipo, consultá las oportunidades disponibles.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => (window.location.href = "/trabaja-con-nosotros")}
                    >
                      Ver Oportunidades
                    </Button>
                  </CardContent>
                </Card>

                {/* Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Horarios de atención
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lunes a Viernes</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sábados</span>
                      <span className="font-medium">10:00 - 14:00</span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                      WhatsApp disponible las 24 horas para consultas urgentes
                    </p>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Ubicación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">Montevideo, Uruguay</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Atendemos consultas de todo el país
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Preferís que te asesoremos personalmente?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Completá nuestro formulario de asesoramiento gratuito y te contactaremos para
              ayudarte a encontrar la mejor opción
            </p>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => (window.location.href = "/asesoramiento")}
            >
              Solicitar Asesoramiento Gratuito
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      <SendMethodDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        formData={formData}
        subject="Nueva consulta desde Contacto"
      />
    </div>
  );
};

export default Contact;
