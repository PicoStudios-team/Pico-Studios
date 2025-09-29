import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import EventCard from "./EventCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { type Event } from "@shared/schema";

interface EventsSectionProps {
  onViewAllEvents?: () => void;
}

export default function EventsSection({ onViewAllEvents }: EventsSectionProps) {
  const { data: events = [], isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-background" id="eventos">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="text-xl text-muted-foreground">Cargando eventos...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-background" id="eventos">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="text-xl text-destructive">Error al cargar eventos</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-background" id="eventos">
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
            <Film className="w-8 h-8 text-primary mr-3" data-testid="icon-events" />
            <h2 
              className="text-4xl md:text-5xl font-bold text-foreground"
              data-testid="text-events-title"
            >
              Eventos
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubre nuestros eventos épicos diseñados para desafiar tus límites y crear experiencias inolvidables
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EventCard
                title={event.title}
                description={event.description}
                image={event.imageUrl}
                onViewDetails={() => console.log(`View ${event.title} details`)}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => {
              console.log('View all events clicked');
              onViewAllEvents?.();
            }}
            data-testid="button-view-all-events"
          >
            Ver todos los eventos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}