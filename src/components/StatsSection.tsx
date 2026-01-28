import { Building2, Users, Award, HeartHandshake } from "lucide-react";
import { CountUp, Reveal, StaggerReveal, StaggerItem } from "@/components/animations";

export const StatsSection = () => {
  const stats = [
    {
      icon: Building2,
      value: 120,
      prefix: "+",
      suffix: "",
      label: "Residencias en Uruguay",
    },
    {
      icon: Users,
      value: 3000,
      prefix: "+",
      suffix: "",
      label: "Hogares encontrados",
    },
    {
      icon: Award,
      value: 100,
      prefix: "",
      suffix: "%",
      label: "Asesoramiento gratuito",
    },
    {
      icon: HeartHandshake,
      value: 0,
      prefix: "Sin fines",
      suffix: "",
      label: "de lucro",
      isText: true,
    },
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-2">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-white">
                  {stat.isText ? (
                    stat.prefix
                  ) : (
                    <CountUp 
                      end={stat.value} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix}
                      duration={900}
                    />
                  )}
                </div>
                <div className="text-base text-white/80 font-medium">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};
