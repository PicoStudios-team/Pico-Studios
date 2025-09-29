import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEventSchema, insertTeamMemberSchema } from "@shared/schema";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets
  app.use('/assets', express.static('attached_assets'));

  // Events API routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });

  app.get('/api/events/:id', async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  });

  app.post('/api/events', async (req, res) => {
    try {
      const validation = insertEventSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: 'Invalid event data', details: validation.error });
      }
      
      const event = await storage.createEvent(validation.data);
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });

  // Team Members API routes
  app.get('/api/team', async (req, res) => {
    try {
      const teamMembers = await storage.getAllTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      console.error('Error fetching team members:', error);
      res.status(500).json({ error: 'Failed to fetch team members' });
    }
  });

  app.get('/api/team/:id', async (req, res) => {
    try {
      const member = await storage.getTeamMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: 'Team member not found' });
      }
      res.json(member);
    } catch (error) {
      console.error('Error fetching team member:', error);
      res.status(500).json({ error: 'Failed to fetch team member' });
    }
  });

  app.post('/api/team', async (req, res) => {
    try {
      const validation = insertTeamMemberSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: 'Invalid team member data', details: validation.error });
      }
      
      const member = await storage.createTeamMember(validation.data);
      res.status(201).json(member);
    } catch (error) {
      console.error('Error creating team member:', error);
      res.status(500).json({ error: 'Failed to create team member' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
