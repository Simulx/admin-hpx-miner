# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HPX Miner is a cryptocurrency mining investment platform with MLM (Multi-Level Marketing) features. The project is structured as a **Turborepo monorepo** with three main applications:

- **admin-panel** (`apps/admin-panel`) - Administrative dashboard deployed to VPS (`system-manage.dev`)
- **dashboard-user** (`apps/dashboard-user`) - User dashboard deployed to Netlify (`app.hpxminer.io`) 
- **landing-page** (`apps/landing-page`) - Marketing site deployed to Vercel (`hpxminer.io`)

The backend uses **Supabase** with PostgreSQL database and Edge Functions for API endpoints.

## Development Commands

### Root Level (Turborepo)
```bash
npm run dev          # Start all apps in parallel
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run clean        # Clean all build outputs
```

### Individual Apps
```bash
# Admin panel (port 5173)
cd apps/admin-panel && npm run dev
cd apps/admin-panel && npm run build
cd apps/admin-panel && npm run lint

# User dashboard (port 5174) 
cd apps/dashboard-user && npm run dev

# Landing page (port 5175)
cd apps/landing-page && npm run dev
```

## Architecture Overview

### Monorepo Structure
- `apps/` - Three main applications
- `packages/` - Shared components, types, utilities (planned)
- `supabase/` - Database schema and Edge Functions (not implemented)
- `docs/` - Technical documentation
- `sql/` - Database schema files

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, Radix UI, Shadcn/UI
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Routing**: React Router DOM
- **Build System**: Turborepo
- **Package Manager**: npm with workspaces

### Key Design Constraints
**CRITICAL**: The UI design is immutable and must match Figma designs exactly. No visual changes, spacing adjustments, color modifications, or layout improvements are permitted without explicit authorization.

## Database Schema

The system uses a comprehensive 17-table PostgreSQL schema:

### Core Entities
- `User` - User accounts with MLM hierarchy and balance management
- `Admins` - Administrative users with multi-factor authentication
- `Plano` - Investment plans with different tiers
- `NovoInvestimento` - Active investments linked to users and plans

### Financial System
- `WebhookPagamento` - Payment confirmations from PIX/USDT gateways
- `Saque` - Withdrawal requests requiring admin approval
- `WalletUSDT` / `ChavePix` - User payment methods

### MLM System (7-level hierarchy)
- `RedeDeIndicacao` - Referral network structure
- `Pontuacao` - MLM points calculation
- `Bonus` - Commission distribution
- `BonusGlobal` - Global bonus pools

## Authentication Flows

### User Authentication (Dashboard)
- Standard email/password login via Supabase Auth
- Mandatory referral-based registration only
- JWT session management

### Admin Authentication (Admin Panel)
Multi-step authentication required:
1. Email/password validation
2. PIN verification
3. TOTP (Google Authenticator) 2FA

## Current Implementation Status

### Completed
- ✅ Monorepo structure with Turborepo
- ✅ Admin panel React app with routing
- ✅ UI components using Shadcn/UI
- ✅ Complete database schema design
- ✅ Authentication context and hooks
- ✅ Figma-based UI implementation

### Missing/Mock Implementation
- ❌ Supabase Edge Functions (all API endpoints)
- ❌ Real database connections
- ❌ Payment gateway integrations
- ❌ WebSocket real-time features
- ❌ User dashboard app
- ❌ Landing page app
- ❌ MLM calculation engine
- ❌ Email notifications

## File Path Aliases

All apps use `@/` alias pointing to their respective `src/` directories:
```typescript
// Resolves to apps/admin-panel/src/components/...
import { Button } from '@/components/ui/button'
```

## Key Service Files

### Admin Panel Authentication
- `apps/admin-panel/src/hooks/useAdminAuth.tsx` - Admin auth context
- `apps/admin-panel/src/components/auth/AdminLoginForm.tsx` - Multi-step login

### Mock Services (Replace with Real APIs)
- `apps/admin-panel/src/dashboard/services/userService.tsx` - Mock user data

## Security Considerations

- Service role keys must NEVER be exposed in frontend code
- All database tables require Row Level Security (RLS) policies
- Admin permissions validated server-side on every sensitive operation
- JWT tokens expire and require refresh
- Rate limiting on authentication endpoints

## Deployment Configuration

### Development
- Uses Vite dev server with HMR
- Configured for ngrok tunneling (admin panel)
- CORS enabled for local development

### Production
- Admin panel: VPS deployment with nginx
- User dashboard: Netlify static hosting
- Landing page: Vercel deployment
- Backend: Supabase Edge Functions

## Database Migration

Use the complete schema in `sql/SQL-Supabase.sql` for initial database setup. The schema includes:
- All table definitions
- Relationships and constraints
- Indexes for performance
- RLS policy definitions

## Testing

Currently no test framework configured. Consider adding:
- Vitest for unit testing
- Playwright for E2E testing
- MSW for API mocking during development

## Important Notes

1. **UI Changes**: Require explicit authorization and must match Figma designs exactly
2. **Backend Implementation**: All API endpoints currently return mock data
3. **Real-time Features**: WebSocket subscriptions planned but not implemented
4. **Payment Processing**: Webhook handlers for PIX/USDT need implementation
5. **MLM Engine**: Complex 7-level commission calculation system needs backend implementation