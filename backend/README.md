# AI Argue Buddy — Backend Boilerplate

Node + Express + TypeScript backend to integrate with the existing `ai-argue-buddy` frontend.

## Features
- Express + TypeScript
- MongoDB (Mongoose)
- JWT authentication (simple)
- Chat endpoints and LLM hook (OpenAI placeholder)
- Ready-to-run dev script with `ts-node-dev`

## Quick start

1. Copy `.env.example` to `.env` and fill values.
2. Install:
```bash
npm install
```
3. Start dev server:
```bash
npm run dev
```
4. Build for production:
```bash
npm run build
npm start
```

API base path: `/api/v1`

Endpoints:
- `POST /api/v1/auth/signup` — signup
- `POST /api/v1/auth/login` — login
- `GET /api/v1/auth/me` — get current user (protected)
- `POST /api/v1/chat` — start chat / send message
- `GET /api/v1/chat/:sessionId` — get chat session

