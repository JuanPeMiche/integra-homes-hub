import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SendMethodDialog } from "@/components/SendMethodDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, 
  CheckCircle, 
  Users, 
  Shield,
  Award,
  TrendingUp,
  Heart,
  Send,
  Star
} from "lucide-react";
import { toast } from "sonner";

const AsociarResidencia = () => {
  const [formData, setFormData] = useState({
    nombreResidencia: "",
    nombreContacto: "",
    cargo: "",
    email: "",
    telefono: "",
    direccion: "",
    departamento: "",
    capacidadPlazas: "",
    tipoAtencion: [] as string[],
    habilitaciones: "",
    mensaje: "",
    aceptaCondiciones: false,
  });
  const [showSendDialog, setShowSendDialog] = useState(false);

  const departamentos = [
    "Montevideo",
    "Canelones",
    "Maldonado",
    "Colonia",
    "Paysandú",
    "Salto",
    "Rivera",
    "Rocha",
    "Tacuarembó",
    "Cerro Largo",
    "Treinta y Tres",
    "Lavalleja",
    "Florida",
    "Durazno",
    "Flores",
    "San José",
    "Soriano",
    "Río Negro",
    "Artigas",
  ];

  const tiposAtencion = [
    "Larga estadía",
    "Estadía temporal",
    "Centro de día",
    "Rehabilitación",
    "Atención Alzheimer/Demencia",
    "Pacientes encamados",
  ];

  const handleTipoToggle = (tipo: string) => {
    setFormData(prev => ({
      ...prev,
      tipoAtencion: prev.tipoAtencion.includes(tipo)
        ? prev.tipoAtencion.filter(t => t !== tipo)
        : [...prev.tipoAtencion, tipo]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombreResidencia || !formData.email || !formData.telefono || !formData.aceptaCondiciones) {
      toast.error("Por favor completá los campos requeridos y aceptá las condiciones");
      return;
    }
    setShowSendDialog(true);
  };

  const benefits = [
    {
      icon: Users,
      title: "Mayor visibilidad",
      description: "Llegá a más familias que buscan residenciales de calidad en Uruguay"
    },
    {
      icon: Shield,
      title: "Sello de confianza",
      description: "Formá parte de una red verificada y reconocida por el MIDES"
    },
    {
      icon: Award,
      title: "Capacitación",
      description: "Acceso a formación en Atención Centrada en la Persona"
    },
    {
      icon: TrendingUp,
      title: "Derivaciones",
      description: "Recibí consultas de familias que buscan plazas en tu zona"
    },
  ];

  const requirements = [
    "Habilitación vigente del Ministerio de Salud Pública",
    "Registro actualizado en el MIDES",
    "Compromiso con los estándares de calidad de Integra",
    "Participación en capacitaciones de la red",
    "Transparencia en información de servicios y precios",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/90 to-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Para Residenciales</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Asociá tu Residencial
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Formá parte de la red de residencias de confianza más importante de Uruguay. 
                Juntos, trabajamos por mejorar la calidad del cuidado de personas mayores.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Beneficios de ser parte de Integra</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Requisitos para asociarse</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-12 bg-gradient-to-br from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "Desde que nos asociamos a Integra, hemos recibido más consultas de familias 
                que buscan un lugar de confianza para sus mayores. El respaldo de la asociación 
                es invaluable."
              </blockquote>
              <p className="font-semibold">— Directora de Residencial Monteverde</p>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Send className="h-6 w-6 text-primary" />
                    Solicitar Asociación
                  </CardTitle>
                  <CardDescription>
                    Completá el formulario y nos pondremos en contacto para coordinar una visita
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombreResidencia">Nombre del Residencial *</Label>
                      <Input
                        id="nombreResidencia"
                        value={formData.nombreResidencia}
                        onChange={(e) => setFormData(prev => ({ ...prev, nombreResidencia: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombreContacto">Nombre de contacto</Label>
                        <Input
                          id="nombreContacto"
                          value={formData.nombreContacto}
                          onChange={(e) => setFormData(prev => ({ ...prev, nombreContacto: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cargo">Cargo</Label>
                        <Input
                          id="cargo"
                          value={formData.cargo}
                          onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                          placeholder="Ej: Director/a, Administrador/a"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección del residencial</Label>
                      <Input
                        id="direccion"
                        value={formData.direccion}
                        onChange={(e) => setFormData(prev => ({ ...prev, direccion: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Departamento</Label>
                        <Select 
                          value={formData.departamento} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, departamento: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {departamentos.map((dep) => (
                              <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Capacidad (plazas)</Label>
                        <Select 
                          value={formData.capacidadPlazas} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, capacidadPlazas: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1 a 10 plazas</SelectItem>
                            <SelectItem value="11-20">11 a 20 plazas</SelectItem>
                            <SelectItem value="21-40">21 a 40 plazas</SelectItem>
                            <SelectItem value="41-60">41 a 60 plazas</SelectItem>
                            <SelectItem value="mas-60">Más de 60 plazas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Tipos de atención que ofrece</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tiposAtencion.map((tipo) => (
                          <div key={tipo} className="flex items-center space-x-2">
                            <Checkbox
                              id={tipo}
                              checked={formData.tipoAtencion.includes(tipo)}
                              onCheckedChange={() => handleTipoToggle(tipo)}
                            />
                            <label
                              htmlFor={tipo}
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              {tipo}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Habilitaciones vigentes</Label>
                      <Select 
                        value={formData.habilitaciones} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, habilitaciones: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="msp-mides">MSP y MIDES</SelectItem>
                          <SelectItem value="solo-msp">Solo MSP</SelectItem>
                          <SelectItem value="en-tramite">En trámite</SelectItem>
                          <SelectItem value="consultar">Consultar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje adicional</Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                        placeholder="Contanos más sobre tu residencial..."
                        rows={4}
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="aceptaCondiciones"
                        checked={formData.aceptaCondiciones}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, aceptaCondiciones: checked as boolean }))}
                      />
                      <label
                        htmlFor="aceptaCondiciones"
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        Acepto los requisitos de asociación y me comprometo a mantener los estándares 
                        de calidad de Integra Residenciales *
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Send className="h-5 w-5" />
                      Enviar Solicitud
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Tenés dudas sobre el proceso?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Contactanos y te explicamos todos los detalles sobre cómo formar parte de nuestra red
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = "/contacto")}
              >
                Contactar
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
              >
                <a href="https://wa.me/59897774000?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20para%20asociar%20mi%20residencial%20a%20Integra" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <SendMethodDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        formData={{
          ...formData,
          tipoAtencion: formData.tipoAtencion.join(", "),
        }}
        subject="Solicitud de asociación - Nuevo Residencial"
      />
    </div>
  );
};

export default AsociarResidencia;
