import { Users } from "lucide-react";
import TeamCard from "./TeamCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { type TeamMember } from "@shared/schema";

interface TeamSectionProps {
  onViewMember?: (memberId: string) => void;
}

export default function TeamSection({ onViewMember }: TeamSectionProps) {
  const { data: teamMembers = [], isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ['/api/team'],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-muted/20" id="equipo">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="text-xl text-muted-foreground">Cargando equipo...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-muted/20" id="equipo">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="text-xl text-destructive">Error al cargar el equipo</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-muted/20" id="equipo">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-primary mr-3" data-testid="icon-team" />
            <h2 
              className="text-4xl md:text-5xl font-bold text-foreground"
              data-testid="text-team-title"
            >
              Nuestro Equipo
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conoce a los creativos visionarios detrás de Pico Studios que hacen posibles estas experiencias épicas
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TeamCard
                id={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio || undefined}
                imageUrl={member.imageUrl || undefined}
                socialLinks={member.socialLinks || undefined}
                onViewProfile={onViewMember}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}