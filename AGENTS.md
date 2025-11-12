# Agent Guide

## Commands

```bash
# Setup
npm install                    # Install dependencies (runs prisma generate automatically)

# Development
npm run dev                    # Start dev server (http://localhost:3000)

# Build & Test
npm run build                  # Build for production
npm run lint                   # Run ESLint
npm run check                  # Run lint + TypeScript check
npm run format                 # Format code with Prettier

# Database
npm run dbpush                 # Push schema changes and generate Prisma client
```

## Tech Stack
- **Framework**: Next.js 13 (Pages Router) + TypeScript
- **Database**: Prisma ORM with CockroachDB
- **API**: tRPC v10 for end-to-end type-safe APIs
- **Auth**: NextAuth.js with GitHub OAuth
- **Styling**: Tailwind CSS + Radix UI primitives
- **Validation**: Zod schemas
- **Forms**: React Hook Form

## Architecture
- `/src/pages` - Next.js pages and API routes (tRPC endpoint at `/api/trpc/[trpc].ts`)
- `/src/trpc` - tRPC routers and server configuration
- `/src/components` - Feature components
- `/src/ui` - Reusable UI components (Radix + Tailwind)
- `/src/schema` - Zod validation schemas
- `/prisma` - Database schema

## Code Style
- **Prettier**: Double quotes, 2-space indent, semicolons, trailing commas
- **Imports**: Use `@/*` path alias for src imports
- **Components**: Tailwind CSS with clsx for conditional classes
- **Type Safety**: Strict TypeScript, tRPC for API types, Zod for runtime validation
