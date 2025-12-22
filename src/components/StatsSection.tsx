import { Building2, Users, Award, HeartHandshake } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Building2,
      value: "+30",
      label: "Residencias en Uruguay",
    },
    {
      icon: Users,
      value: "+200",
      label: "Hogares encontrados",
    },
    {
      icon: Award,
      value: "100%",
      label: "Asesoramiento gratuito",
    },
    {
      icon: HeartHandshake,
      value: "Sin fines",
      label: "de lucro",
    },
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-2">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-base text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
