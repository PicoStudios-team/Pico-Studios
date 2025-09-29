import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Twitter, Instagram, MessageSquare, Eye } from "lucide-react";

interface TeamCardProps {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  socialLinks?: string;
  onViewProfile?: (id: string) => void;
}

export default function TeamCard({ id, name, role, bio, imageUrl, socialLinks, onViewProfile }: TeamCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSocialLinks = () => {
    if (!socialLinks) return {};
    try {
      return JSON.parse(socialLinks);
    } catch {
      return {};
    }
  };

  const links = getSocialLinks();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'discord':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getSocialUrl = (platform: string, handle: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return `https://twitter.com/${handle.replace('@', '')}`;
      case 'github':
        return `https://github.com/${handle.replace('@', '')}`;
      case 'instagram':
        return `https://instagram.com/${handle.replace('@', '')}`;
      case 'discord':
        // Discord handles are not URLs, copy to clipboard instead
        return null;
      default:
        return null;
    }
  };

  const handleSocialClick = (platform: string, handle: string) => {
    const url = getSocialUrl(platform, handle);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (platform.toLowerCase() === 'discord') {
      navigator.clipboard.writeText(handle);
      console.log(`Discord handle ${handle} copied to clipboard`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden bg-card border-card-border hover-elevate">
        <CardContent className="p-6 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={imageUrl || ""} alt={name} />
            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          
          <h3 
            className="text-xl font-bold text-card-foreground mb-2"
            data-testid={`text-team-name-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {name}
          </h3>
          
          <Badge 
            variant="secondary" 
            className="mb-3"
            data-testid={`badge-team-role-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {role}
          </Badge>
          
          {bio && (
            <p 
              className="text-muted-foreground text-sm leading-relaxed mb-4"
              data-testid={`text-team-bio-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {bio}
            </p>
          )}
          
          {Object.keys(links).length > 0 && (
            <div className="flex justify-center space-x-2 mb-4">
              {Object.entries(links).map(([platform, handle]) => (
                <Button
                  key={platform}
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSocialClick(platform, handle as string)}
                  aria-label={`Visit ${name} on ${platform}`}
                  data-testid={`button-social-${platform}-${name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {getSocialIcon(platform)}
                </Button>
              ))}
            </div>
          )}
          
          {onViewProfile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(id)}
              className="w-full mt-2"
              data-testid={`button-view-member-${id}`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Perfil
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}