import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Users, 
  Home,
  Shield,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { getAllProvinces, getAllBarrios } from "@/data/residences";

const Asesoramiento = () => {
  const [formData, setFormData] = useState({
    // Datos de contacto
    nombre: "",
    email: "",
    telefono: "",
    relacion: "",
    
    // Datos del adulto mayor
    edadAdulto: "",
    genero: "",
    situacionActual: "",
    
    // Necesidades
    tipoEstadia: "",
    departamentoPreferido: "",
    barrioPreferido: "",
    presupuesto: "",
    urgencia: "",
    
    // Condiciones especiales
    necesidadesEspeciales: [] as string[],
    
    // Comentarios
    comentarios: "",
    
    // Consentimiento
    aceptaContacto: false,
  });

  const departamentos = getAllProvinces();
  const barrios = getAllBarrios();

  const necesidadesOptions = [
    "Atención Alzheimer / Demencia",
    "Silla de ruedas",
    "Persona encamada",
    "Rehabilitación / Postoperatorio",
    "Atención psicológica",
    "Fisioterapia intensiva",
    "Dieta especial",
    "Espacio para mascotas",
  ];

  const handleNecesidadToggle = (necesidad: string) => {
    setFormData(prev => ({
      ...prev,
      necesidadesEspeciales: prev.necesidadesEspeciales.includes(necesidad)
        ? prev.necesidadesEspeciales.filter(n => n !== necesidad)
        : [...prev.necesidadesEspeciales, necesidad]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceptaContacto) {
      toast.error("Por favor, acepta ser contactado para continuar");
      return;
    }

    // Here you would send the data to your backend
    console.log("Form submitted:", formData);
    
    toast.success("¡Solicitud enviada con éxito!", {
      description: "Nuestro equipo se pondrá en contacto contigo en menos de 24 horas.",
    });

    // Reset form
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      relacion: "",
      edadAdulto: "",
      genero: "",
      situacionActual: "",
      tipoEstadia: "",
      departamentoPreferido: "",
      barrioPreferido: "",
      presupuesto: "",
      urgencia: "",
      necesidadesEspeciales: [],
      comentarios: "",
      aceptaContacto: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/90 to-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Servicio 100% Gratuito</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Buscamos por Ti
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Sabemos que encontrar el hogar ideal para tu ser querido puede ser abrumador. 
                Déjanos ayudarte. Nuestro equipo de expertos analizará tus necesidades y te 
                recomendará las mejores opciones de forma gratuita y sin compromiso.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Respuesta rápida</h3>
                  <p className="text-sm text-muted-foreground">Te contactamos en menos de 24 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Asesoramiento experto</h3>
                  <p className="text-sm text-muted-foreground">Profesionales con experiencia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Opciones personalizadas</h3>
                  <p className="text-sm text-muted-foreground">Según tus necesidades específicas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sin compromiso</h3>
                  <p className="text-sm text-muted-foreground">Servicio totalmente gratuito</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Datos de Contacto */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        Tus datos de contacto
                      </CardTitle>
                      <CardDescription>
                        Para poder comunicarnos contigo y enviarte las recomendaciones
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relacion">Relación con el adulto mayor</Label>
                        <Select 
                          value={formData.relacion} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, relacion: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hijo">Hijo/a</SelectItem>
                            <SelectItem value="nieto">Nieto/a</SelectItem>
                            <SelectItem value="conyuge">Cónyuge</SelectItem>
                            <SelectItem value="otro-familiar">Otro familiar</SelectItem>
                            <SelectItem value="cuidador">Cuidador profesional</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Datos del Adulto Mayor */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Sobre el adulto mayor
                      </CardTitle>
                      <CardDescription>
                        Información para encontrar la opción más adecuada
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="edadAdulto">Edad aproximada</Label>
                          <Input
                            id="edadAdulto"
                            type="number"
                            min="60"
                            max="120"
                            value={formData.edadAdulto}
                            onChange={(e) => setFormData(prev => ({ ...prev, edadAdulto: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Género</Label>
                          <RadioGroup
                            value={formData.genero}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, genero: value }))}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="femenino" id="femenino" />
                              <Label htmlFor="femenino">Femenino</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="masculino" id="masculino" />
                              <Label htmlFor="masculino">Masculino</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Situación actual</Label>
                          <Select 
                            value={formData.situacionActual} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, situacionActual: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="domicilio">En domicilio propio</SelectItem>
                              <SelectItem value="familia">Con familia</SelectItem>
                              <SelectItem value="hospital">En hospital</SelectItem>
                              <SelectItem value="otro-residencial">En otro residencial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Necesidades especiales (selecciona las que apliquen)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {necesidadesOptions.map((necesidad) => (
                            <div key={necesidad} className="flex items-center space-x-2">
                              <Checkbox
                                id={necesidad}
                                checked={formData.necesidadesEspeciales.includes(necesidad)}
                                onCheckedChange={() => handleNecesidadToggle(necesidad)}
                              />
                              <label
                                htmlFor={necesidad}
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                {necesidad}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preferencias */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Preferencias de búsqueda
                      </CardTitle>
                      <CardDescription>
                        Cuéntanos qué tipo de residencia estás buscando
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Tipo de estadía</Label>
                          <Select 
                            value={formData.tipoEstadia} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, tipoEstadia: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="permanente">Permanente (larga estadía)</SelectItem>
                              <SelectItem value="temporal">Temporal (semanas/meses)</SelectItem>
                              <SelectItem value="diurna">Centro de día</SelectItem>
                              <SelectItem value="rehabilitacion">Rehabilitación / Postoperatorio</SelectItem>
                              <SelectItem value="no-seguro">No estoy seguro/a</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Urgencia</Label>
                          <Select 
                            value={formData.urgencia} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, urgencia: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inmediato">Inmediato (esta semana)</SelectItem>
                              <SelectItem value="pronto">Pronto (este mes)</SelectItem>
                              <SelectItem value="planificando">Planificando (próximos meses)</SelectItem>
                              <SelectItem value="explorando">Solo explorando opciones</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Departamento preferido</Label>
                          <Select 
                            value={formData.departamentoPreferido} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, departamentoPreferido: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sin preferencia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Sin preferencia</SelectItem>
                              {departamentos.map((dep) => (
                                <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Barrio / Zona preferida</Label>
                          <Select 
                            value={formData.barrioPreferido} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, barrioPreferido: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sin preferencia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Sin preferencia</SelectItem>
                              {barrios.map((b) => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Presupuesto mensual aproximado</Label>
                        <Select 
                          value={formData.presupuesto} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, presupuesto: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar rango" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hasta-50000">Hasta $50.000 UY</SelectItem>
                            <SelectItem value="50000-80000">$50.000 - $80.000 UY</SelectItem>
                            <SelectItem value="80000-120000">$80.000 - $120.000 UY</SelectItem>
                            <SelectItem value="mas-120000">Más de $120.000 UY</SelectItem>
                            <SelectItem value="flexible">Flexible / A definir</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comentarios adicionales */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        Comentarios adicionales
                      </CardTitle>
                      <CardDescription>
                        ¿Hay algo más que debamos saber para ayudarte mejor?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={formData.comentarios}
                        onChange={(e) => setFormData(prev => ({ ...prev, comentarios: e.target.value }))}
                        rows={4}
                        placeholder="Cuéntanos cualquier detalle adicional que consideres importante..."
                      />
                    </CardContent>
                  </Card>

                  {/* Consent and Submit */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="aceptaContacto"
                            checked={formData.aceptaContacto}
                            onCheckedChange={(checked) => 
                              setFormData(prev => ({ ...prev, aceptaContacto: checked as boolean }))
                            }
                          />
                          <label
                            htmlFor="aceptaContacto"
                            className="text-sm leading-relaxed cursor-pointer"
                          >
                            Acepto ser contactado/a por Integra Residenciales para recibir asesoramiento 
                            personalizado sobre opciones de residencias. Entiendo que este servicio es 
                            gratuito y sin compromiso. *
                          </label>
                        </div>

                        <Button type="submit" size="lg" className="w-full gap-2">
                          <Send className="h-5 w-5" />
                          Enviar Solicitud de Asesoramiento
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          Nos comprometemos a contactarte en menos de 24 horas hábiles.
                          Tus datos serán tratados con confidencialidad.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Alternative */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">¿Prefieres hablar directamente?</h2>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo está disponible para atenderte por teléfono o WhatsApp
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <a href="tel:+59899923330">
                    <Phone className="h-5 w-5" />
                    Llamar: (+598) 99 923 330
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-green-600 border-green-600 hover:bg-green-50" asChild>
                  <a href="https://wa.me/59899923330" target="_blank" rel="noopener noreferrer">
                    <CheckCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Asesoramiento;
