import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCommissions } from "@/hooks/useCommissions";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/animations";
import { responsiveImageProps } from "@/lib/imageUrl";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  photo_url: string | null;
  display_order: number;
}

// Card widths: 2 cols on mobile, 3 on sm, 5 on lg (matches the grid below)
const PHOTO_SIZES = "(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw";
const PHOTO_WIDTHS = [320, 480, 640];

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const MemberPhoto = ({ name, photoUrl }: { name: string; photoUrl: string | null }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = photoUrl && !failed;

  return (
    <div className="relative mb-4 w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/15 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
      {showImage ? (
        <>
          {!loaded && <div className="absolute inset-0 animate-pulse bg-primary/10" aria-hidden="true" />}
          <img
            {...responsiveImageProps(photoUrl, PHOTO_WIDTHS)}
            sizes={PHOTO_SIZES}
            alt={`Foto de ${name}`}
            width={480}
            height={600}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={cn(
              "w-full h-full object-cover object-[center_20%] transition-[opacity,transform] duration-500 group-hover:scale-105",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
          <span className="text-4xl md:text-5xl font-semibold tracking-wide text-primary/50 select-none">
            {getInitials(name)}
          </span>
        </div>
      )}
    </div>
  );
};

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="group text-center">
    <MemberPhoto name={member.name} photoUrl={member.photo_url} />
    <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground leading-tight">{member.name}</h3>
    {member.role && <p className="text-primary text-sm font-medium first-letter:uppercase">{member.role}</p>}
  </div>
);

const CommissionGroup = ({ title, members }: { title: string; members: TeamMember[] }) => {
  if (members.length === 0) return null;
  return (
    <div className="mt-16">
      <Reveal>
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground text-center">{title}</h3>
      </Reveal>
      <div className="flex flex-wrap justify-center gap-6 lg:gap-10 max-w-7xl mx-auto">
        {members.map((member) => (
          <div key={member.id} className="w-[calc(50%-12px)] sm:w-[calc(33.33%-16px)] lg:w-[calc(20%-32px)]">
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

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
              <MemberCard member={member} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        <CommissionGroup title="Comisión fiscal" members={fiscalMembers} />
        <CommissionGroup title="Comisión de ética" members={eticaMembers} />
      </div>
    </section>
  );
};
