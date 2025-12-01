import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensaje enviado", {
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Déjanos tu consulta y te responderemos
              lo antes posible
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre *</Label>
                        <Input id="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto *</Label>
                      <Input id="subject" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea id="message" rows={6} required />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="privacy" required />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        Acepto la política de privacidad y el tratamiento de mis
                        datos personales *
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Información de Contacto
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Dirección</h3>
                          <p className="text-muted-foreground">
                            Rincón 454 of. 213, Centro
                            <br />
                            Montevideo, Uruguay
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Teléfono</h3>
                          <p className="text-muted-foreground">
                            <a
                              href="tel:+59899923330"
                              className="hover:text-primary transition-colors"
                            >
                              (+598) 99 923 330
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-muted-foreground">
                            <a
                              href="mailto:hola@integraresidenciales.com.uy"
                              className="hover:text-primary transition-colors"
                            >
                              hola@integraresidenciales.com.uy
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">
                            Horario de Atención
                          </h3>
                          <p className="text-muted-foreground">
                            Lunes a Viernes: 9:00 - 18:00h
                            <br />
                            Sábados: 10:00 - 14:00h
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card>
                  <CardContent className="p-0">
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Mapa de ubicación (Google Maps)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
