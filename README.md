# TasteMate AI — Frontend

TasteMate AI is an AI-powered personalized recommendation platform that helps users discover movies, restaurants, and hotels through an interactive chatbot experience.

This repository contains the responsive frontend, built with React and TypeScript. It communicates with the companion Express.js backend to collect user preferences and display personalized recommendations.

## Features

- Category selection for Movies, Restaurants, and Hotels.
- Category-specific chatbot questions and quick replies.
- Free-text answers, including destination entry for hotel searches.
- Recommendation cards with match scores, explanations, and images.
- Save and unsave recommendations during the current session.
- Responsive desktop and mobile layouts.
- Configurable backend URL through environment variables.

## Tech Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 3
- Native Fetch API

## Run Locally

**Prerequisites:** Node.js 18 or newer and npm.

**1. Clone the repository**

```bash
git clone https://github.com/Muhammad-Husnain007/qloo-hackathon-fe.git
cd qloo-hackathon-fe
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Copy `.env.example` to `.env`:

```powershell
Copy-Item .env.example .env
```

By default, the frontend connects to:

```text
http://localhost:3001/api
```

If your backend runs at another URL, configure `VITE_API_URL` in `.env`:

```dotenv
VITE_API_URL=http://localhost:3001/api
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit the local URL provided by Vite, usually:

```text
http://localhost:5173
```

Make sure the companion TasteMate AI backend is running before using the chatbot.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server. |
| `npm run build` | Type-check and create the production build. |
| `npm run preview` | Preview the production build locally. |

## Backend Integration

The frontend communicates with the TasteMate AI backend through REST API requests.

The chatbot sends the selected category, user answers, and conversation history to `POST /api/chat`.

The backend processes the conversation and returns either the next question or personalized recommendations.

For backend setup, visit the [TasteMate AI Backend Repository](https://github.com/Muhammad-Husnain007/qloo-hackathon-be).

## Project Structure

```text
src/
├── services/
│   └── api.ts          # API requests and response mapping
├── App.tsx             # Chat interface and application state
├── data.ts             # Category labels and recommendation images
├── icons.tsx           # SVG icon components
├── styles.css          # Tailwind and responsive styles
└── main.tsx            # React application entry point
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Developed by Muhammad Husnain**

TasteMate AI — Discover what you love.