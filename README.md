# AL Anser Electronic

AL Anser Electronic is a modular e-commerce application with a React/TypeScript
client, an Express/TypeScript API, and a Prisma-backed PostgreSQL data layer.
The repository is organized as a Node.js monorepo with npm workspaces.

## Architecture

- `client/` — React 18 + TypeScript + Vite + React Router + Tailwind CSS UI
- `server/` — Express + TypeScript API with Prisma ORM, authentication, and
  payment/order workflows
- `shared/` — TypeScript types used by both client and server
- `prisma/` — Prisma schema and seed data

## Setup

```bash
npm install
cp .env.example .env
npm run install-all
npm run db:push
npm run db:seed
```

## Development

```bash
npm run dev
```

The client is served by Vite and the API by Express concurrently.

## Build

```bash
npm run build
```

## Seed example data

```bash
npm run db:push
npm run db:seed
```
