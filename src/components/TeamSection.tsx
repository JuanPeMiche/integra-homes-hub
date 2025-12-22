import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "lucide-react";

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

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestra directiva
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            El equipo que lidera Integra Residenciales
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="group text-center"
            >
              <div className="relative mb-4 mx-auto w-40 h-40 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg transition-transform group-hover:scale-105">
                {member.photo_url ? (
                  <img 
                    src={member.photo_url} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-16 w-16 text-white/40" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-white/70 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
