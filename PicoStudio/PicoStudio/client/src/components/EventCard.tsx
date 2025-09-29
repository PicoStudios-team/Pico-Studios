import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EventCardProps {
  title: string;
  description: string;
  image: string;
  onViewDetails?: () => void;
}

export default function EventCard({ title, description, image, onViewDetails }: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden bg-card border-card-border hover-elevate">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-event-${title.toLowerCase().replace(/\s+/g, '-')}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <CardContent className="p-6">
          <h3 
            className="text-xl font-bold text-card-foreground mb-3"
            data-testid={`text-event-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {title}
          </h3>
          
          <p 
            className="text-muted-foreground mb-4 leading-relaxed"
            data-testid={`text-event-description-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {description}
          </p>
          
          <Button
            variant="outline"
            className="w-full text-foreground hover:bg-foreground/10"
            onClick={() => {
              console.log(`View details for ${title}`);
              onViewDetails?.();
            }}
            data-testid={`button-event-details-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Ver Detalles
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}