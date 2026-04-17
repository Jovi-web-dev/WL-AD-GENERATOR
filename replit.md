# WL Importados Platform

## Overview
WL Importados Center is now a full-stack SaaS-style platform in Portuguese for AI-assisted e-commerce ad generation. It preserves the original dark/gold WL visual identity while moving sensitive AI configuration and generation persistence to the server.

## Current Architecture
- `client/`: React + Vite frontend with modular pages, components, theme system, authentication flow, dashboard, ad generator, history, plans, API status, settings, and admin overview.
- `server/`: Express API server with PostgreSQL persistence, JWT authentication, protected routes, AI provider status, generation history, credit tracking, admin metrics, and placeholder-safe media pipeline.
- `shared/`: Shared schema/type placeholders for generation payloads and assets.
- `src/App.jsx`: Original imported monolithic React source retained as reference during migration.

## Runtime and Workflow
- Runtime: Node.js 20.
- Development command: `npm start`.
- The Express server runs on `0.0.0.0:5000` and serves Vite middleware in development, so frontend and API share the same origin.
- Production deployment is configured as an autoscale web app: build with `npm run build`, run with `npm run start:prod`.

## Database
PostgreSQL is required through `DATABASE_URL`. On server startup, the app creates these tables when missing:
- `users`
- `generations`
- `generation_assets`
- `credit_transactions`
- `api_usage_logs`

The first registered user becomes `admin`; later users default to `user`.

## AI and Security Notes
- AI keys are no longer stored in browser localStorage.
- The frontend only reads provider configuration status from the server.
- Server-side environment variables supported now: `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `GOOGLE_IMAGE_API_KEY`, `GOOGLE_VERTEX_SERVICE_ACCOUNT`, `VEO3_API_KEY`, `GOOGLE_VIDEO_API_KEY`, `JWT_SECRET`.
- If no AI provider key is configured in development, text/media generation returns explicit safe placeholder output and warnings instead of failing silently.

## User Preferences
- Language: Portuguese (PT-BR).
- Branding: preserve WL Importados Center dark/gold premium aesthetic and existing theme options.
- Direction: continue the approved staged migration: frontend restructure, backend/auth/history, AI integrations, then admin/plans/credits maturation.
