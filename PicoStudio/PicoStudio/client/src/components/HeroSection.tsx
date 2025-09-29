import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onViewEvents?: () => void;
  onViewTeam?: () => void;
}

export default function HeroSection({ onViewEvents, onViewTeam }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/50" />
      
      {/* Optional Background Image Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title */}
          <h1 
            className="text-6xl md:text-8xl font-bold text-foreground mb-8 tracking-tight"
            data-testid="text-hero-title"
          >
            Pico Studios
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            Bienvenido a Pico Studios, creamos eventos como:{" "}
            <span className="text-primary font-semibold">Squid Pico Games</span>,{" "}
            <span className="text-primary font-semibold">El Hoyo</span>,{" "}
            <span className="text-primary font-semibold">Dedsafio</span>, y más!!!{" "}
            <br className="hidden md:block" />
            ¿Estás preparado?
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                console.log('Ver Eventos clicked');
                onViewEvents?.();
              }}
              data-testid="button-view-events"
            >
              Ver Eventos
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2 text-foreground hover:bg-foreground/10 bg-background/20 backdrop-blur-sm"
              onClick={() => {
                console.log('Conoce al Equipo clicked');
                onViewTeam?.();
              }}
              data-testid="button-view-team"
            >
              Conoce al Equipo
            </Button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}