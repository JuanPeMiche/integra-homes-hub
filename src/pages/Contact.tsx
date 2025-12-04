import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Facebook, Instagram } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent("Nueva consulta desde el sitio web");
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\n` +
      `Email: ${formData.email}\n` +
      `Teléfono: ${formData.telefono}\n` +
      `El huésped es: ${formData.genero}\n` +
      `Prefiere habitación: ${formData.habitacion}\n\n` +
      `Consulta:\n${formData.consulta}`
    );
    
    // Open email client
    window.location.href = `mailto:hola@integraresidenciales.com.uy?subject=${subject}&body=${body}`;
    
    toast.success("Redirigiendo a tu cliente de correo", {
      description: "Se abrirá tu aplicación de email para enviar el mensaje.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Contact Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                  Completá el<br />
                  formulario y<br />
                  escribí tu<br />
                  consulta aquí
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      id="nombre" 
                      placeholder="Nombre*" 
                      required 
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>

                  <div>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Email*" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>

                  <div>
                    <Input 
                      id="telefono" 
                      type="tel" 
                      placeholder="Teléfono*" 
                      required
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>

                  <div>
                    <Textarea 
                      id="consulta" 
                      placeholder="Consulta*" 
                      required 
                      rows={4}
                      value={formData.consulta}
                      onChange={handleInputChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary resize-none"
                    />
                  </div>

                  {/* Gender Selection */}
                  <div className="pt-4">
                    <Label className="text-primary font-medium">El huésped es*</Label>
                    <div className="flex gap-6 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mujer" 
                          checked={formData.genero === "mujer"}
                          onCheckedChange={() => setFormData(prev => ({ ...prev, genero: "mujer" }))}
                        />
                        <label htmlFor="mujer" className="text-sm cursor-pointer">Mujer</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hombre"
                          checked={formData.genero === "hombre"}
                          onCheckedChange={() => setFormData(prev => ({ ...prev, genero: "hombre" }))}
                        />
                        <label htmlFor="hombre" className="text-sm cursor-pointer">Hombre</label>
                      </div>
                    </div>
                  </div>

                  {/* Room Preference */}
                  <div className="pt-2">
                    <Label className="text-primary font-medium">Prefiere habitación*</Label>
                    <div className="flex gap-6 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="privada"
                          checked={formData.habitacion === "privada"}
                          onCheckedChange={() => setFormData(prev => ({ ...prev, habitacion: "privada" }))}
                        />
                        <label htmlFor="privada" className="text-sm cursor-pointer">Privada</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="compartida"
                          checked={formData.habitacion === "compartida"}
                          onCheckedChange={() => setFormData(prev => ({ ...prev, habitacion: "compartida" }))}
                        />
                        <label htmlFor="compartida" className="text-sm cursor-pointer">Compartida</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="cualquier"
                          checked={formData.habitacion === "cualquier"}
                          onCheckedChange={() => setFormData(prev => ({ ...prev, habitacion: "cualquier" }))}
                        />
                        <label htmlFor="cualquier" className="text-sm cursor-pointer">Cualquier opción</label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="bg-muted/30 border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-2">
                      <span className="text-foreground">Elegí trabajar</span><br />
                      <span className="text-muted-foreground font-normal">con Integra Residenciales</span>
                    </h2>
                    <p className="text-muted-foreground mt-4">
                      Si tenes vocación de servicio en el cuidado de las personas 
                      mayores y te gustaría formar parte de nuestro equipo, 
                      comunícate con nosotros a{" "}
                      <a 
                        href="mailto:hola@integraresidenciales.com.uy" 
                        className="text-primary hover:underline"
                      >
                        hola@integraresidenciales.com.uy
                      </a>
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-2">
                      <span className="text-foreground">Vías de</span><br />
                      <span className="text-muted-foreground font-normal">contacto</span>
                    </h2>
                    
                    <div className="mt-6 space-y-4">
                      <a 
                        href="mailto:hola@integraresidenciales.com.uy"
                        className="flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors w-fit"
                      >
                        <Mail className="h-5 w-5" />
                        hola@integraresidenciales.com.uy
                      </a>
                      
                      <div className="flex gap-3 mt-4">
                        <a 
                          href="https://www.facebook.com/people/Integra-Residenciales-Uy/100063468792108/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Facebook className="h-6 w-6" />
                        </a>
                        <a 
                          href="https://www.instagram.com/integra_residenciales/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Instagram className="h-6 w-6" />
                        </a>
                      </div>
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
