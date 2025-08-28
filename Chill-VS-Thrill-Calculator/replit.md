# Revenue Calculator Application

## Overview

This is a full-stack web application that provides a comprehensive Revenue Calculator tool, inspired by NerdWallet's financial calculators. The application allows users to calculate pricing strategies to reach their revenue goals, with support for both one-time product sales and subscription pricing models. 

**Key Features Implemented:**
- Revenue goal input with formatted currency display
- Flexible timeframe input (accepts decimal years)
- Profit margin calculator with percentage-based adjustments
- Product pricing strategy table (customers: 10,000 down to 5)
- Subscription pricing strategy table (customers: 10,000 down to 5)
- Responsive revenue breakdown cards showing Year/Month/Day targets
- Clickable example scenarios for quick testing
- NerdWallet-inspired green color scheme with accessible design

The application features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens inspired by NerdWallet's color scheme
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Management**: PostgreSQL-based session store with connect-pg-simple
- **Build System**: esbuild for production bundling

### Monorepo Structure
The application uses a monorepo structure with clear separation of concerns:
- `client/` - Frontend React application
- `server/` - Backend Express.js API
- `shared/` - Shared TypeScript types and database schema
- `components.json` - shadcn/ui configuration

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Basic user authentication with username/password
- **Schema Validation**: Zod schemas for runtime type checking
- **Type Generation**: Drizzle generates TypeScript types from schema

### Frontend Components
- **Revenue Calculator** (`client/src/pages/revenue-calculator.tsx`): Main calculator interface with input controls and results tables
- **UI Components** (`client/src/components/ui/`): Complete set of shadcn/ui components including forms, tables, cards, and navigation
- **Custom Hooks**: Mobile detection and toast notifications

### Backend Infrastructure
- **Storage Layer** (`server/storage.ts`): Abstracted storage interface with in-memory implementation
- **Route Registration** (`server/routes.ts`): Modular API route setup
- **Development Server** (`server/vite.ts`): Vite integration for HMR in development

## Data Flow

1. **User Input**: Users enter revenue goals, timeframes, and profit margins through React form components
2. **Real-time Calculations**: Frontend performs immediate calculations for pricing scenarios
3. **API Communication**: TanStack Query manages API calls with automatic caching and error handling
4. **Database Operations**: Drizzle ORM handles type-safe database queries through the storage interface
5. **Session Management**: PostgreSQL sessions maintain user authentication state

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **zod**: Runtime type validation

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Static type checking
- **tsx**: TypeScript execution for development
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Features**: Hot module replacement, error overlays, and Replit development banner
- **Database**: Uses DATABASE_URL environment variable for PostgreSQL connection

### Production
- **Build Process**: 
  1. `vite build` - Compiles React frontend to static assets
  2. `esbuild` - Bundles Express server for Node.js deployment
- **Output**: 
  - Frontend assets in `dist/public/`
  - Server bundle in `dist/index.js`
- **Start Command**: `npm start`

### Database Management
- **Migrations**: Drizzle Kit manages schema migrations in `./migrations/`
- **Schema Push**: `npm run db:push` applies schema changes directly
- **Configuration**: `drizzle.config.ts` defines database connection and schema location

The application is designed for easy deployment on platforms like Replit, with environment-based configuration and PostgreSQL compatibility for scalable data storage.