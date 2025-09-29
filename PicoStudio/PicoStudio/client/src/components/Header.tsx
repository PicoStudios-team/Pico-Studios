import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import picoLogo from "@assets/generated_images/Pico_Studios_logo_design_23dcd388.png";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [location] = useLocation();

  const navItems = [
    { label: "Inicio", href: "/", section: "hero" },
    { label: "Equipo", href: "/equipo", section: "team" },
    { label: "Eventos", href: "/eventos", section: "events" },
  ];

  const handleNavClick = (section: string, href: string) => {
    if (onNavigate && href === "/") {
      onNavigate(section);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3 hover-elevate rounded-md p-2 transition-all duration-300">
              <img 
                src={picoLogo} 
                alt="Pico Studios Logo" 
                className="h-10 w-auto object-contain"
                data-testid="img-logo"
              />
              <span className="text-xl font-bold text-foreground hidden sm:block">
                Pico Studios
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                <button
                  onClick={() => handleNavClick(item.section, item.href)}
                  className={`text-base font-medium transition-all duration-300 hover:text-primary ${
                    location === item.href 
                      ? "text-primary border-b-2 border-primary" 
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            data-testid="button-mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}