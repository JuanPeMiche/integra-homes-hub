import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, Target, Lightbulb, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Sobre Integra Residenciales</h1>
              <p className="text-xl text-white/95 leading-relaxed">
                La única asociación civil sin fines de lucro del sector residenciales en Uruguay, 
                dedicada a promover cuidados de calidad para personas mayores
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Mission */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-4 text-primary">Nuestra Misión</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Promover la gestión y cuidados de servicios de calidad, contribuir en la mejora continua 
                        al integrar a los diferentes actores del sector de cuidados: prestadores médicos, 
                        profesionales del área, cuidadores, residentes y familiares. Trabajamos para garantizar 
                        que cada persona mayor reciba la atención digna y humanizada que merece.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="border-2 border-secondary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-4 text-secondary">Nuestra Visión</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Posicionarnos como el referente nacional en gestión de cuidados de calidad para 
                        personas mayores, liderando la innovación y las mejores prácticas en el sector 
                        residencial de Uruguay, promoviendo siempre el bienestar integral y la dignidad 
                        de nuestros adultos mayores.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Values */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Heart className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        Los valores que guían todas nuestras acciones y definen nuestra identidad institucional:
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: Heart, title: "Humanización", description: "Trato cálido y personalizado" },
                      { icon: Shield, title: "Respeto", description: "Dignidad en cada acción" },
                      { icon: Award, title: "Integridad", description: "Transparencia y honestidad" },
                      { icon: Users, title: "Confianza", description: "Compromiso con las familias" },
                      { icon: Target, title: "Excelencia", description: "Calidad en el servicio" },
                      { icon: Lightbulb, title: "Innovación", description: "Mejora continua" },
                    ].map((value, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                        <value.icon className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-1">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Organization */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Quiénes Somos</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Integra Residenciales es una asociación civil sin fines de lucro con personería jurídica 
                  reconocida, estatutos aprobados por el Ministerio de Educación y Cultura (MEC) y RUT oficial. 
                  Somos el único organismo de este tipo en el sector de residenciales en Uruguay.
                </p>
              </div>

              <Card className="bg-gradient-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Nuestra Red</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Nucleamos a residenciales de todo el país bajo una misión común de cuidados excelentes 
                    y humanizados. Cada residencial miembro mantiene su independencia en la gestión diaria, 
                    pero todos comparten los valores y estándares de calidad promovidos por Integra.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">+100</div>
                      <p className="text-sm text-muted-foreground">Residencias en la Red</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-secondary mb-2">+1.000</div>
                      <p className="text-sm text-muted-foreground">Familias Ayudadas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent-foreground mb-2">100%</div>
                      <p className="text-sm text-muted-foreground">Sin Fines de Lucro</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Madrina Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Nuestra Madrina Institucional</h2>
                    <h3 className="text-2xl text-primary font-semibold mb-2">Lourdes Bermejo</h3>
                    <p className="text-muted-foreground">Experta Internacional en Gerontología</p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Lourdes Bermejo es una reconocida experta internacional en gerontología con más de 
                      25 años de experiencia en formación, acompañamiento y atención en el cuidado de 
                      personas mayores. Española, consultora y formadora especializada en envejecimiento, 
                      es autora de numerosas publicaciones y conferencista destacada en el ámbito gerontológico.
                    </p>

                    <div className="bg-gradient-hero text-white rounded-xl p-8 text-center">
                      <p className="text-2xl font-semibold italic mb-4">
                        "El amor es el regalo más grande que una generación le puede dejar a otra"
                      </p>
                      <p className="text-white/90">- Lourdes Bermejo</p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      Su rol como madrina institucional de Integra Residenciales aporta una mirada 
                      internacional de excelencia y refuerza nuestra filosofía intergeneracional y de 
                      afecto en el cuidado de adultos mayores.
                    </p>

                    <div className="flex justify-center pt-4">
                      <Button variant="outline" size="lg" asChild>
                        <a href="https://www.lourdesbermejo.com" target="_blank" rel="noopener noreferrer">
                          Conocer más sobre Lourdes Bermejo
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                ¿Querés formar parte de nuestra red?
              </h2>
              <p className="text-lg text-muted-foreground">
                Si sos un residencial y compartís nuestros valores, o si necesitás ayuda para 
                encontrar el mejor hogar para tu familiar, contactanos.
              </p>
              <Button size="lg" onClick={() => window.location.href = '/contacto'}>
                Contactar Ahora
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
