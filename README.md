# GymOS

> **GymOS** – an AI‑powered gym discovery and management SaaS platform.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Target Market](#target-market)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Clone the Repository](#clone-the-repository)
  - [Run PostgreSQL with Docker](#run-postgresql-with-docker)
  - [Backend Configuration](#backend-configuration)
  - [Prisma Setup](#prisma-setup)
  - [Start the Backend](#start-the-backend)
  - [Frontend Configuration](#frontend-configuration)
  - [Start the Frontend](#start-the-frontend)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Database Design](#database-design)
- [Development Commands](#development-commands)
- [Testing & Quality Checks](#testing--quality-checks)
- [Security Practices](#security-practices)
- [Current Status & Roadmap](#current-status--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

GymOS provides two core capabilities:

### Gym Discovery
- Search gyms by location, name, facilities, or membership plans.
- View detailed gym profiles, facilities, trainers, offers, reviews, and operating hours.
- Nearby‑gym search using geographic coordinates.
- Public endpoints do **not** require authentication.

### Gym Management (Owner / Staff)
- Dashboard for gym owners to manage facilities, trainers, membership plans, offers, and enquiries.
- Role‑based access control (Super admin, Gym owner, Gym staff, Trainer, Member).
- Attendance tracking, workout plan association, and progress records are modelled and ready for future UI integration.

### Platform Administration
- Super‑admin endpoints for user and gym moderation.
- Audit logs and notification infrastructure are present in the data model.

> **Note**: Only the discovery APIs and authentication flows are fully implemented. Management‑area UI is a work‑in‑progress.

---

## Target Market

GymOS initially targets gyms in **Keshav Nagar, Pune, Maharashtra, India** with an eye toward expansion to nearby localities such as Mundhwa, Magarpatta, Kharadi, and Hadapsar. The architecture deliberately supports multi‑city scaling; the current seed data is for development only and does **not** represent real businesses.

---

## Technology Stack

**Frontend** (in `frontend/`)
- React 19
- Vite 8
- TypeScript ~6.0
- Tailwind CSS 4
- TanStack React Query 5
- Zustand 5
- Recharts 3
- Lucide React (icon library)
- React Router 7
- Oxlint for linting

**Backend** (in `backend/`)
- Node.js + Express 4
- TypeScript 5.5
- PostgreSQL (via Docker for local dev)
- Prisma ORM 5
- Zod for schema validation
- JWT (access & refresh tokens)
- Argon2 / bcrypt for password hashing
- Helmet, CORS, express‑rate‑limit for hardening
- Winston for logging
- Swagger UI Express for OpenAPI docs

All dependencies are reflected in the respective `package.json` files.

---

## Architecture

```text
User (browser) ──► React + Vite frontend (http://localhost:5173)
    │
    ▼
Versioned REST API (/api/v1) ──► Express + TypeScript backend
    │
    ▼
Prisma ORM ──► PostgreSQL database
```

The backend serves both the web UI and a future mobile client via the same public API.

---

## Project Structure

```
GymOS/
├─ frontend/               # React + Vite application
│  ├─ src/                # Components, pages, routes, stores, types
│  ├─ public/             # Static assets
│  ├─ vite.config.ts      # Vite configuration (includes Tailwind)
│  └─ package.json
├─ backend/                # Express API server
│  ├─ src/                # Controllers, routes, middleware, utils
│  │  ├─ app.ts           # Express app configuration
│  │  ├─ server.ts        # Server entry point
│  │  ├─ routes/          # auth.ts, gyms.ts, rbacTest.ts
│  │  ├─ controllers/     # gymsController.ts (discovery logic)
│  │  ├─ middleware/      # auth, rbac, rateLimiter, validation, errorHandler
│  │  ├─ prisma/          # Prisma client wrapper
│  │  └─ utils/           # logger, password helpers
│  ├─ prisma/              # Prisma schema & migrations
│  ├─ .env.example        # Example environment variables
│  └─ package.json
├─ .gitignore
└─ README.md               # **This file**
```

---

## Prerequisites

- **Node.js** (v20 or later) – matches the version used in `package.json`.
- **npm** (comes with Node) – used for dependency management.
- **Docker Desktop** – for running a local PostgreSQL container (optional but recommended).
- **PostgreSQL** client tools (`psql`) – useful for manual inspection.
- **Git** – to clone the repository.

---

## Installation & Setup

### Clone the repository
```bash
# Replace with the actual URL if known
git clone https://github.com/your-org/gymos.git
cd gymos
```

### Run PostgreSQL with Docker
```bash
docker run -d \
  --name gymos-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=CHANGE_ME \
  -e POSTGRES_DB=gymos \
  -p 5432:5432 \
  postgres:14
```
- The container will persist data while it is running. Use `docker start gymos-postgres` to restart a stopped container.
- The password `CHANGE_ME` is for local development only; never use it in production.

### Backend configuration
```bash
cd backend
cp .env.example .env   # then edit .env with real values
```
Edit the file and ensure the following variables are set (keep the placeholders if you are only testing):

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | HTTP port for the API server | Yes |
| `NODE_ENV` | `development` or `production` | Yes |
| `CORS_ORIGIN` | Front‑end origin (e.g., `http://localhost:5173`) | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens | Yes |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | Yes |
| `JWT_ACCESS_EXPIRES_IN` | Access token TTL (e.g., `15m`) | Yes |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL (e.g., `7d`) | Yes |
| Rate‑limit values (`RATE_LIMIT_*`) | Optional – defaults are in the example file | No |

### Install backend dependencies
```bash
npm install
```

### Prisma setup
```bash
# Validate schema
npx prisma validate
# Generate client
npx prisma generate
# Apply migrations (creates tables in the local DB)
npx prisma migrate dev
# (Optional) Seed development data if a seed script is provided
npm run seed   # runs `ts-node ./prisma/seed.ts`
```

### Start the backend
```bash
npm run dev   # runs ts-node-dev src/server.ts
```
The API will be reachable at `http://localhost:4000/api/v1`.

### Front‑end configuration
```bash
cd ../frontend
cp .env.example .env   # (if an example exists – otherwise create manually)
npm install
```
If the front‑end needs to know the API base URL, set `VITE_API_BASE` (or edit the constant in the code) to `http://localhost:4000/api/v1`.

### Start the front‑end
```bash
npm run dev   # Vite dev server on http://localhost:5173
```
Open the URL in a browser; the app will load and communicate with the backend.

---

## Environment Variables

See the **Backend** section above for a full table. All variables in `.env.example` must be defined in a real `.env` file; **never** commit the real `.env` to version control.

---

## API Documentation

- **Health** – `GET /health` – returns `{ status: "ok", timestamp: "..." }`.
- **Swagger UI** – `GET /api/docs` – interactive OpenAPI explorer.
- **OpenAPI JSON** – `GET /api/openapi.json`.
- **Auth** – `/api/v1/auth/*` (register, login, refresh, logout, me).
- **Gym Discovery** – `/api/v1/gyms/*` (list, slug, search, nearby, facilities, trainers, memberships, offers, reviews, hours, gallery).
- **RBAC test** – `/api/v1/admin/test`, `/owner/test`, `/trainer/test`, `/member/test` (requires appropriate role).

Only the routes listed above are functional; other endpoints are placeholders.

---

## Authentication & Authorization

- **Registration & Login** – email/password with Argon2/bcrypt hashing.
- **Access Token** – short‑lived JWT (default 15 min).
- **Refresh Token** – stored as HttpOnly cookie; rotated on each refresh.
- **Roles** (defined in `RoleName` enum):
  - `SUPER_ADMIN`
  - `GYM_OWNER`
  - `GYM_STAFF`
  - `TRAINER`
  - `MEMBER`
- **RBAC middleware** (`requireRole`) enforces role access on protected routes.
- **Rate limiting** – global and per‑endpoint limits are applied via `express-rate-limit`.

Refresh‑token revocation, logout, and token rotation are implemented and logged.

---

## Database Design

The Prisma schema (`backend/prisma/schema.prisma`) defines the core data model. Key entities include:
- **User** – authentication, role, linked to Gym (owner) and optional Trainer/Member profiles.
- **Gym** – core gym record with facilities, images, videos, operating hours, offers, reviews, and related staff.
- **Trainer**, **Member**, **MembershipPlan**, **Membership**, **Attendance**, **ProgressRecord**, **WorkoutPlan** – support management of staff and members.
- **RefreshToken**, **Notification**, **AuditLog** – security & observability.
- Enums: `RoleName`, `MembershipStatus`, `AttendanceStatus`.

For a visual diagram, see `backend/prisma/schema.prisma` directly.

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies (run in `backend` or `frontend`). |
| `npm run dev` | Start development server (backend: `ts-node-dev`, frontend: Vite). |
| `npm run build` | Compile TypeScript (`backend`) or generate production assets (`frontend`). |
| `npm start` | Run compiled production server (`backend`). |
| `npx prisma validate` | Validate Prisma schema. |
| `npx prisma generate` | Generate Prisma client. |
| `npx prisma migrate dev` | Apply migrations to local DB. |
| `npm run seed` | Execute the development seed script (if present). |
| `npm test` | Run test suite (if defined). |

Make sure you are in the correct directory before running a command.

---

## Testing & Quality Checks

The repo currently contains no explicit test files, but the following commands are available and will pass if the code compiles:
```bash
npm run build        # ensure TypeScript compiles without errors
npx prisma validate  # validate Prisma models
```
Add unit/integration tests under `backend/__tests__` or `frontend/src/__tests__` for future coverage.

---

## Security Practices

- **Never** commit `.env` or any secrets.
- Use strong, random strings for JWT secrets.
- Passwords are stored only as salted hashes (Argon2 or bcrypt).
- All API routes are protected by JWT authentication where required.
- Rate limiting mitigates brute‑force attacks.
- Helmet and CORS help harden HTTP headers.
- Validate all external input with Zod schemas.
- In production, serve over HTTPS and restrict CORS to trusted origins.
- Keep dependencies up‑to‑date (`npm audit` can help).

---

## Current Status & Roadmap

### Implemented & Verified
- Full gym discovery API (list, filter, search, nearby, details).
- User registration, login, JWT access/refresh flow.
- Role‑based access control with test endpoints.
- Swagger UI documentation.
- Prisma data model with migrations.
- Basic rate‑limiting and error handling middleware.
- Front‑end scaffolding with React, Vite, Tailwind.

### In Progress
- Front‑end integration of discovery endpoints (currently mock data).
- Member‑side workflows (attendance, progress tracking) – models exist, UI pending.
- Payment handling – plans exist, gateway integration not yet added.
- Notification service – schema present, delivery mechanism pending.

### Planned
- Mobile / PWA client.
- Real‑time updates via WebSockets or Server‑Sent Events.
- Payment gateway integration (e.g., Stripe).
- Admin dashboard for audit logs and platform analytics.
- Multi‑city expansion with geo‑partitioning.
- Comprehensive test suite (unit, integration, e2e).
- CI/CD pipeline with automated migrations and security scans.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Follow the existing TypeScript style and lint rules (`npm run lint`).
4. Add or update tests for new backend functionality.
5. Keep the API documentation up‑to‑date (Swagger comments or `openapi.yaml`).
6. Do **not** commit any secrets or `.env` files.
7. Run `npm run build && npm test` before pushing.
8. Submit a pull request with a clear description of the changes.

---

## License

The repository does not currently contain a LICENSE file. Until a license is added, the code should be considered **unlicensed** and may not be redistributed. Add an appropriate open‑source license (e.g., MIT) if you intend to publish the project publicly.

---

*This README was generated based on the current state of the GymOS repository on 2026‑10‑09.*
