# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Environment Setup:**
- Create `.dev.vars` file with required environment variables before starting
- Run `npm run codegen` to generate GraphQL SDK and types from schema (required before first start)

**Development Server:**
- `npm run dev` - Starts the full development server (builds CSS, starts Remix watcher, and Wrangler dev server)
- Server runs on `http://127.0.0.1:8788` by default
- Individual components:
  - `npm run dev:remix` - Remix watcher only
  - `npm run dev:wrangler` - Wrangler pages dev server only  
  - `npm run dev:css` - TailwindCSS watcher only

**Build & Deploy:**
- `npm run build` - Full production build (CSS + Remix)
- `npm run build:css` - Build and minify CSS only
- `npm run start` - Production server
- Deploy: Push to `main` for production, `develop` for staging

**Code Quality:**
- `npm run tsc` - TypeScript type checking (no lint command available)
- `npm run codegen` - Regenerate GraphQL types and SDK
- `npm run svg:build` - Generate React components from SVG files
- `npm run env` - Generate environment types

## Architecture Overview

**Framework Stack:**
- **Remix** (v1.9.0) with Cloudflare Pages deployment target
- **React 17** with TypeScript
- **TailwindCSS** for styling
- **GraphQL** with Shopify Storefront API integration
- **Cloudflare Workers/Pages** for hosting and serverless functions

**Project Structure:**

**Core Application (`app/`):**
- `root.tsx` - Root layout with global state management (cart, wishlist, user auth, notifications)
- `routes/` - File-based routing structure following Remix conventions
- `components/` - React components organized by feature
- `providers/` - GraphQL data fetching logic for different domains (cart, products, customers, etc.)
- `generated/` - Auto-generated GraphQL types and SDK (from `codegen`)

**Key Architectural Patterns:**

**State Management:**
- Global state handled in `root.tsx` with React useState hooks
- Cart, wishlist, user authentication, and UI modals managed centrally
- No external state management library used

**Data Fetching:**
- GraphQL integration with Shopify Storefront and Admin APIs
- Providers pattern: separate files for each domain (cart, products, customers, etc.)
- Types auto-generated from GraphQL schemas using `@graphql-codegen`
- Server-side data loading in route loaders following Remix patterns

**Component Organization:**
- `components/` - Feature-specific components (Footer, Menu, ProductModal, etc.)
- `components/shared/` - Reusable UI components (Button, Input, Image, etc.)
- `components/shared/icons/` - SVG icon components (auto-generated from `svgs/` folder)
- `pages/` - Page-specific components used within routes

**Configuration:**
- `app/config/config.ts` - Central configuration for pages, email, cart settings
- Type-safe configuration with TypeScript interfaces
- Page routing and navigation structure defined here

**GraphQL Integration:**
- Dual API setup: Shopify Storefront API (public) + Admin API (private operations)
- Code generation from live GraphQL schemas via `codegen.ts`
- Generated SDKs provide type-safe API calls

**Styling:**
- TailwindCSS with custom configuration
- Separate CSS build process (`build:css` command)
- Global styles in `styles/app.css`

**Deployment:**
- Cloudflare Pages with serverless functions
- Branch-based deployment (main → production, develop → staging)
- Build artifacts in `functions/` and `public/build/`

**Important Notes:**
- Always run `npm run codegen` after GraphQL schema changes
- Environment variables must be in `.dev.vars` for local development
- The application expects Shopify integration (storefront and admin tokens required)
- Romanian language application ("ro" locale)