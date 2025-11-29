import { Building2, Users, Award, HeartHandshake } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Building2,
      value: "+500",
      label: "Residencias en Nuestra Red",
    },
    {
      icon: Users,
      value: "+10,000",
      label: "Familias Ayudadas",
    },
    {
      icon: Award,
      value: "20 Años",
      label: "de Experiencia",
    },
    {
      icon: HeartHandshake,
      value: "100%",
      label: "Asesoramiento Gratuito",
    },
  ];

  return (
    <section className="py-16 bg-wellness-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-base text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
