import { type User, type InsertUser, type Event, type InsertEvent, type TeamMember, type InsertTeamMember } from "@shared/schema";
import { randomUUID } from "crypto";
// Image URLs for sample data
const minecraftImage = "/assets/generated_images/Minecraft_event_stage_scene_02cec325.png";
const squidGamesImage = "/assets/generated_images/Squid_Pico_Games_event_bcce87dc.png";
const elHoyoImage = "/assets/generated_images/El_Hoyo_event_atmosphere_556b4f57.png";
const dedsafioImage = "/assets/generated_images/Dedsafio_challenge_event_b9f48c58.png";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
  
  // Team Members
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private events: Map<string, Event>;
  private teamMembers: Map<string, TeamMember>;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.teamMembers = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Todo: remove mock functionality - replace with real data
    const sampleEvents: InsertEvent[] = [
      {
        title: "Squid Pico Games",
        description: "Una competencia épica inspirada en los juegos más desafiantes. ¿Podrás sobrevivir a todos los desafíos y reclamar el premio final? Participa en este evento único donde la estrategia y la habilidad son fundamentales.",
        imageUrl: squidGamesImage,
        status: "upcoming",
        eventDate: new Date("2024-02-15T18:00:00Z"),
        location: "Arena Virtual Pico",
        maxParticipants: "50"
      },
      {
        title: "El Hoyo",
        description: "Sumérgete en un evento misterioso y atmosférico donde la estrategia y la supervivencia son clave para el éxito. Un desafío psicológico que pondrá a prueba tu capacidad de adaptación.",
        imageUrl: elHoyoImage,
        status: "upcoming",
        eventDate: new Date("2024-02-20T20:00:00Z"),
        location: "Sala Temática Underground",
        maxParticipants: "30"
      },
      {
        title: "Dedsafio",
        description: "El desafío definitivo que pondrá a prueba todas tus habilidades gaming. Solo los más valientes se atreverán a participar en esta competencia extrema.",
        imageUrl: dedsafioImage,
        status: "ongoing",
        eventDate: new Date("2024-01-25T19:00:00Z"),
        location: "Centro de Competencias Pico",
        maxParticipants: "100"
      },
      {
        title: "Minecraft Arena",
        description: "Construye, explora y compite en nuestro evento masivo de Minecraft con escenarios únicos y desafíos creativos. Una experiencia épica para builders y aventureros.",
        imageUrl: minecraftImage,
        status: "completed",
        eventDate: new Date("2024-01-10T16:00:00Z"),
        location: "Servidor Pico MC",
        maxParticipants: "200"
      }
    ];

    for (const eventData of sampleEvents) {
      await this.createEvent(eventData);
    }

    // Sample team members
    const sampleTeam: InsertTeamMember[] = [
      {
        name: "Alex Rodriguez",
        role: "Director Creativo",
        bio: "Visionario detrás de los eventos más épicos de Pico Studios. Con más de 8 años de experiencia en gaming y eventos.",
        imageUrl: "",
        socialLinks: JSON.stringify({ twitter: "@alexrodpico", discord: "AlexR#1234" }),
        order: "1"
      },
      {
        name: "Maria Santos",
        role: "Coordinadora de Eventos",
        bio: "Especialista en logística y organización de eventos masivos. Asegura que cada experiencia sea perfecta.",
        imageUrl: "",
        socialLinks: JSON.stringify({ twitter: "@mariapico", instagram: "@maria_events" }),
        order: "2"
      },
      {
        name: "Carlos Mendez",
        role: "Desarrollador Principal",
        bio: "Mago de la programación que hace posible los mundos virtuales más increíbles de nuestros eventos.",
        imageUrl: "",
        socialLinks: JSON.stringify({ github: "carlosmendez", twitter: "@carlosdev" }),
        order: "3"
      }
    ];

    for (const memberData of sampleTeam) {
      await this.createTeamMember(memberData);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent,
      id, 
      status: insertEvent.status || "upcoming",
      eventDate: insertEvent.eventDate || null,
      location: insertEvent.location || null,
      maxParticipants: insertEvent.maxParticipants || null,
      createdAt: new Date()
    };
    this.events.set(id, event);
    return event;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => 
      parseInt(a.order || "0") - parseInt(b.order || "0")
    );
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = { 
      ...insertMember, 
      id,
      bio: insertMember.bio || null,
      imageUrl: insertMember.imageUrl || null,
      socialLinks: insertMember.socialLinks || null,
      order: insertMember.order || null
    };
    this.teamMembers.set(id, member);
    return member;
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) {
      return undefined;
    }
    
    const updatedEvent: Event = {
      ...existingEvent,
      ...updateData,
      status: updateData.status || existingEvent.status,
      eventDate: updateData.eventDate !== undefined ? updateData.eventDate : existingEvent.eventDate,
      location: updateData.location !== undefined ? updateData.location : existingEvent.location,
      maxParticipants: updateData.maxParticipants !== undefined ? updateData.maxParticipants : existingEvent.maxParticipants,
    };
    
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }

  async updateTeamMember(id: string, updateData: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existingMember = this.teamMembers.get(id);
    if (!existingMember) {
      return undefined;
    }
    
    const updatedMember: TeamMember = {
      ...existingMember,
      ...updateData,
      bio: updateData.bio !== undefined ? updateData.bio : existingMember.bio,
      imageUrl: updateData.imageUrl !== undefined ? updateData.imageUrl : existingMember.imageUrl,
      socialLinks: updateData.socialLinks !== undefined ? updateData.socialLinks : existingMember.socialLinks,
      order: updateData.order !== undefined ? updateData.order : existingMember.order,
    };
    
    this.teamMembers.set(id, updatedMember);
    return updatedMember;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    return this.teamMembers.delete(id);
  }
}

export const storage = new MemStorage();
