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
import { 
  Briefcase, 
  Heart, 
  Users, 
  GraduationCap, 
  Clock,
  MapPin,
  Send,
  CheckCircle,
  Building2
} from "lucide-react";
import { toast } from "sonner";

const TrabajaConNosotros = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    profesion: "",
    experiencia: "",
    disponibilidad: "",
    departamento: "",
    mensaje: "",
  });
  const [showSendDialog, setShowSendDialog] = useState(false);

  const profesiones = [
    "Auxiliar de Enfermería",
    "Enfermero/a",
    "Médico/a",
    "Fisioterapeuta",
    "Terapeuta Ocupacional",
    "Psicólogo/a",
    "Trabajador/a Social",
    "Nutricionista",
    "Cuidador/a",
    "Personal de Limpieza",
    "Cocinero/a",
    "Administración",
    "Otro",
  ];

  const departamentos = [
    "Montevideo",
    "Canelones",
    "Maldonado",
    "Colonia",
    "Paysandú",
    "Salto",
    "Rivera",
    "Cualquier departamento",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.profesion) {
      toast.error("Por favor completá los campos requeridos");
      return;
    }
    setShowSendDialog(true);
  };

  const benefits = [
    {
      icon: Heart,
      title: "Trabajo con propósito",
      description: "Contribuí al bienestar de las personas mayores y sus familias"
    },
    {
      icon: Users,
      title: "Equipo profesional",
      description: "Trabajá junto a profesionales comprometidos y capacitados"
    },
    {
      icon: GraduationCap,
      title: "Capacitación continua",
      description: "Accedé a formación constante en atención centrada en la persona"
    },
    {
      icon: Building2,
      title: "Red de residencias",
      description: "Oportunidades en múltiples centros asociados en todo Uruguay"
    },
  ];

  const positions = [
    {
      title: "Auxiliar de Enfermería",
      location: "Montevideo, Canelones",
      type: "Tiempo completo",
      description: "Buscamos auxiliares con vocación de servicio para atención directa a residentes."
    },
    {
      title: "Fisioterapeuta",
      location: "Maldonado",
      type: "Part-time",
      description: "Para programa de rehabilitación y mantenimiento funcional."
    },
    {
      title: "Cuidador/a",
      location: "Varios departamentos",
      type: "Turnos rotativos",
      description: "Personal para acompañamiento y asistencia en actividades diarias."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/90 to-secondary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Briefcase className="h-5 w-5" />
                <span className="font-medium">Oportunidades Laborales</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Trabaja con Nosotros
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Sumate a nuestra red de profesionales dedicados al cuidado de personas mayores. 
                Si tenés vocación de servicio y querés marcar la diferencia, este es tu lugar.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Posiciones Abiertas</h2>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <Card key={index} className="hover:shadow-soft transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{position.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {position.type}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{position.description}</p>
                        </div>
                        <Button 
                          className="shrink-0"
                          onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
                        >
                          Postularme
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="form-section" className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Send className="h-6 w-6 text-primary" />
                    Enviar mi Postulación
                  </CardTitle>
                  <CardDescription>
                    Completá el formulario y nos pondremos en contacto contigo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo *</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                          required
                        />
                      </div>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="space-y-2">
                        <Label>Profesión / Cargo *</Label>
                        <Select 
                          value={formData.profesion} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, profesion: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {profesiones.map((prof) => (
                              <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Experiencia en el sector</Label>
                        <Select 
                          value={formData.experiencia} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, experiencia: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sin-experiencia">Sin experiencia</SelectItem>
                            <SelectItem value="menos-1">Menos de 1 año</SelectItem>
                            <SelectItem value="1-3">1 a 3 años</SelectItem>
                            <SelectItem value="3-5">3 a 5 años</SelectItem>
                            <SelectItem value="mas-5">Más de 5 años</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Disponibilidad</Label>
                        <Select 
                          value={formData.disponibilidad} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, disponibilidad: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inmediata">Inmediata</SelectItem>
                            <SelectItem value="15-dias">En 15 días</SelectItem>
                            <SelectItem value="1-mes">En 1 mes</SelectItem>
                            <SelectItem value="a-convenir">A convenir</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Departamento de preferencia</Label>
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
                      <Label htmlFor="mensaje">Mensaje / Presentación</Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                        placeholder="Contanos brevemente sobre tu experiencia y motivación..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Send className="h-5 w-5" />
                      Enviar Postulación
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Sos residencial y querés publicar ofertas?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Si tu residencia es parte de Integra y necesitás publicar ofertas de empleo, contactanos
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "/contacto")}
            >
              Contactar
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      <SendMethodDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        formData={formData}
        subject="Postulación laboral - Trabaja con Nosotros"
      />
    </div>
  );
};

export default TrabajaConNosotros;
