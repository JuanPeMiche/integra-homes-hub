import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User, Scale, Users } from "lucide-react";
import { useCommissions } from "@/hooks/useCommissions";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/animations";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  display_order: number;
}

export const TeamSection = () => {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const { data: fiscalMembers = [] } = useCommissions('fiscal');
  const { data: eticaMembers = [] } = useCommissions('etica');

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Nuestra directiva
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            El equipo que lidera Integra Residenciales
          </p>
        </Reveal>

        <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <StaggerItem key={member.id}>
              <div className="group text-center">
                <div className="relative mb-4 mx-auto w-full aspect-[4/5] overflow-hidden rounded-2xl bg-primary/10 backdrop-blur-sm border-2 border-primary/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/40">
                  {member.photo_url ? (
                    <img 
                      src={member.photo_url} 
                      alt={member.name}
                      className="w-full h-full object-cover object-[center_15%]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-24 w-24 text-primary/40" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1 text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium">{member.role}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Commission Sections - as rows like Directiva */}
        {fiscalMembers.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground text-center">
              Comisión fiscal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {fiscalMembers.map((member) => (
                <div key={member.id} className="group text-center">
                  <div className="relative mb-4 mx-auto w-32 h-32 overflow-hidden rounded-2xl bg-primary/10 backdrop-blur-sm border-2 border-primary/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/40">
                    <div className="w-full h-full flex items-center justify-center">
                      <Scale className="h-12 w-12 text-primary/40" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-1 text-foreground">{member.name}</h4>
                  {member.role && (
                    <p className="text-primary text-sm font-medium capitalize">{member.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {eticaMembers.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground text-center">
              Comisión de ética
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {eticaMembers.map((member) => (
                <div key={member.id} className="group text-center">
                  <div className="relative mb-4 mx-auto w-32 h-32 overflow-hidden rounded-2xl bg-primary/10 backdrop-blur-sm border-2 border-primary/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/40">
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary/40" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-1 text-foreground">{member.name}</h4>
                  {member.role && (
                    <p className="text-primary text-sm font-medium capitalize">{member.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
