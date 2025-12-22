import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User, Scale, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  display_order: number;
}

// Comisión Fiscal members
const comisionFiscal = [
  { name: "Gerardo Pilatti", role: "Presidente" },
  { name: "María José Pintos", role: "" },
  { name: "Liliana Massei", role: "" },
];

// Comisión de Ética members
const comisionEtica = [
  { name: "Claudia Hernández", role: "" },
  { name: "Mariana López", role: "" },
  { name: "Sandra Berlín", role: "" },
];

export const TeamSection = () => {
  const [fiscalOpen, setFiscalOpen] = useState(false);
  const [eticaOpen, setEticaOpen] = useState(false);
  
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Nuestra directiva
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            El equipo que lidera Integra Residenciales
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="group text-center"
            >
              <div className="relative mb-4 mx-auto w-52 h-52 overflow-hidden rounded-2xl bg-primary/10 backdrop-blur-sm border-2 border-primary/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/40">
                {member.photo_url ? (
                  <img 
                    src={member.photo_url} 
                    alt={member.name}
                    className="w-full h-full object-cover"
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
          ))}
        </div>

        {/* Commission Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Dialog open={fiscalOpen} onOpenChange={setFiscalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2">
                <Scale className="h-5 w-5" />
                Ver comisión fiscal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Comisión fiscal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {comisionFiscal.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      {member.role && (
                        <p className="text-sm text-primary font-medium">{member.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={eticaOpen} onOpenChange={setEticaOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Ver comisión de ética
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Comisión de ética</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {comisionEtica.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
