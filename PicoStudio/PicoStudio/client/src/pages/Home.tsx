import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    switch (section) {
      case "events":
        eventsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "team":
        teamRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "hero":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onNavigate={scrollToSection} />
      
      <main>
        <HeroSection 
          onViewEvents={() => scrollToSection("events")}
          onViewTeam={() => scrollToSection("team")}
        />
        
        <div ref={eventsRef}>
          <EventsSection onViewAllEvents={() => console.log('Navigate to events page')} />
        </div>
        
        <div ref={teamRef}>
          <TeamSection onViewMember={(memberId) => console.log(`View member ${memberId}`)} />
        </div>
      </main>
    </div>
  );
}