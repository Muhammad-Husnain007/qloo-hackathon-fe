# TasteMate AI — Frontend

TasteMate AI helps people discover movies, restaurants, and hotels through a guided, conversational experience. This repository contains the responsive React frontend; recommendation data and conversation prompts are supplied by the companion Express API.

## Features

- Category selection for Movies, Restaurants, and Hotels
- Category-specific questions and quick replies from the backend
- Free-text answers, including destination entry for hotel searches
- Recommendation cards with match scores, explanations, and imagery
- Save and unsave recommendations during the current session
- Responsive desktop and mobile layouts
- Configurable backend URL through a Vite environment variable

## Tech stack

- React 18 and TypeScript
- Vite 6
- Tailwind CSS 3 with project-specific styles
- Native `fetch` for backend requests

## Requirements

- Node.js 18 or newer
- npm
- The TasteMate backend running locally or at a reachable API URL

## Getting started

From the repository root, open two terminals.

### 1. Start the backend

```powershell
cd backend-be
npm install
npm run dev
```

By default, the API listens at `http://localhost:3001`.

### 2. Start the frontend

```powershell
cd frontend-fe
npm install
Copy-Item .env.example .env
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

The frontend defaults to `http://localhost:3001/api`. The `.env` file is optional when using that default. To use another backend URL, set `VITE_API_URL` in `frontend-fe/.env`:

```dotenv
VITE_API_URL=http://localhost:3001/api
```

Restart the Vite server after changing environment variables. Keep secrets such as LLM API keys in the backend environment; they do not belong in frontend variables.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally for review. |

## Backend integration

The chat client sends the selected category, answers so far, and conversation history to `POST /api/chat`. The backend returns either the next question and quick replies or a recommendation list. Recommendation text and match data come from the API; the frontend maps known recommendations to local presentation images.

If the API cannot be reached, confirm that the backend is running and that its `FRONTEND_ORIGIN` setting allows the Vite origin (`http://localhost:5173`). The backend can return mock recommendations without an LLM API key.

## Project structure

```text
frontend-fe/
├── index.html
├── src/
│   ├── services/api.ts   # API requests and response mapping
│   ├── App.tsx           # Chat interface and application state
│   ├── data.ts           # Category labels and recommendation images
│   ├── icons.tsx         # Local SVG icon components
│   ├── styles.css        # Tailwind layers and responsive styles
│   └── main.tsx          # React application entry point
├── .env.example
├── package.json
└── vite.config.ts
```
