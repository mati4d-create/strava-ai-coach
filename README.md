# Enduro Coach

Enduro Coach is an AI-powered training companion for endurance athletes. It reads your workout data (starting with FIT files) and lets you have a natural conversation with an AI coach about your training, your progress, and what to do next.

## Features (current and planned)

- [x] Landing page
- [ ] Upload FIT files
- [ ] Athlete memory
- [ ] AI Coach conversation
- [ ] Personalized recommendations

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI
- Supabase (planned)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Philosophy

Enduro Coach aims to turn raw training data into a conversation. Instead of dashboards full of charts, the athlete asks questions in plain language and gets answers grounded in their own workout history.

The AI Coach is designed to build a persistent understanding of each athlete over time, remembering past workouts, goals, and patterns rather than treating every question in isolation. This memory is what allows recommendations to feel personal instead of generic.

The project favors a simple, focused interface and an incremental build order: get a working conversation loop first, then layer in file parsing, memory, and recommendations on top of it.

## Roadmap

- [x] Sprint 0 — Project setup
- [x] Sprint 1 — Landing page
- [ ] Sprint 2 — FIT upload
- [ ] Sprint 3 — Workout parser
- [ ] Sprint 4 — Athlete memory
- [ ] Sprint 5 — AI Coach
- [ ] Sprint 6 — Race recommendations
