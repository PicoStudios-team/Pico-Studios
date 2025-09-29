# replit.md

## Overview

Pico Studios is a gaming events company website built with a modern full-stack architecture. The application showcases gaming events like "Squid Pico Games," "El Hoyo," and "Dedsafío" with a dark, cinematic aesthetic inspired by gaming industry design. The platform features event management, team member profiles, and a responsive design optimized for showcasing epic gaming experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system featuring dark mode and gaming-focused aesthetics
- **Animations**: Framer Motion for smooth transitions and hover effects

### Design System
- **Color Palette**: Dark theme with deep black backgrounds, orange accents (#FF6600), and gaming-inspired gradients
- **Typography**: Inter/Poppins font stack with dramatic hierarchy for cinematic presentation
- **Component Library**: Comprehensive shadcn/ui implementation with custom gaming-themed variants
- **Layout**: Grid-based carousel layouts with hover animations and card-based content organization

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured for events, team members, and user management
- **Storage Strategy**: In-memory storage implementation with interface for easy database migration
- **API Design**: RESTful endpoints for events and team member management with proper error handling

### Data Models
- **Events**: Title, description, image URLs, status tracking, dates, and participant limits
- **Team Members**: Profile information, roles, bios, social links, and display ordering
- **Users**: Basic authentication structure with username/password (prepared for future auth implementation)

### Development Environment
- **Hot Reload**: Vite development server with HMR for rapid iteration
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Path Aliases**: Configured for clean imports (@/ for client, @shared for common code)
- **Asset Management**: Static asset serving with organized image handling

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching layer
- **wouter**: Lightweight React router for single-page application navigation
- **framer-motion**: Animation library for interactive UI elements and transitions

### UI Component Libraries
- **@radix-ui/***: Headless UI primitives for accessibility and customization
- **shadcn/ui**: Pre-built component system built on Radix UI
- **lucide-react**: Icon library for consistent iconography
- **tailwindcss**: Utility-first CSS framework for rapid styling

### Backend Infrastructure
- **drizzle-orm**: Type-safe ORM for database operations
- **@neondatabase/serverless**: PostgreSQL driver for serverless database connections
- **express**: Web application framework for API server
- **zod**: Schema validation for runtime type checking

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and enhanced development experience
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

### Database & Validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation
- **connect-pg-simple**: PostgreSQL session store for future authentication needs
- **react-hook-form**: Form handling with validation integration

### Utility Libraries
- **clsx & tailwind-merge**: CSS class management utilities
- **class-variance-authority**: Component variant management
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation