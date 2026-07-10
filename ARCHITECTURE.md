# Architecture

This document describes how Enduro Coach (strava-ai-coach) is organized and the
principles that guide its design. It is intentionally short. If a section here
starts feeling out of date, update it in the same PR that changes the code.

## High-level architecture

Enduro Coach is a single Next.js application (App Router) that serves both the
UI and the backend. There is no separate backend service and no microservices
— one deployable unit, one repository, one developer can hold the whole thing
in their head.

```
Browser (React UI)
   │  user question + optional .fit file
   ▼
Next.js Route Handlers (app/api/*)
   │  parse .fit file, load activity history
   ▼
Database (activities, parsed metrics, chat history)
   │  context for the question
   ▼
AI layer (LLM call with training data as context)
   │  answer
   ▼
Browser (rendered response)
```

The product surface is simple: a user asks a question about their training
(optionally attaching a `.fit` file from Strava/Garmin) and gets an
AI-generated answer grounded in their activity data.

## Folder structure

```
app/
  layout.tsx       # Root layout, global providers, fonts
  page.tsx          # Main chat UI (question input, file upload)
  globals.css       # Tailwind entry + theme tokens
  api/              # Route Handlers — the backend lives here
    .../route.ts    # e.g. app/api/chat/route.ts, app/api/activities/route.ts
public/             # Static assets
```

As the app grows, group by feature rather than by technical layer:

```
app/
  api/
    chat/route.ts
    activities/route.ts
  (chat)/               # route group for chat-related pages, if needed
lib/
  db/                   # database client + queries
  ai/                   # prompt building + LLM client
  fit/                  # .fit file parsing
```

Keep everything inside `app/` and `lib/`. Avoid inventing new top-level
directories (`src/`, `server/`, `services/`) — Next.js App Router already
gives every piece of code an obvious home.

## Frontend responsibilities

- Render the chat interface: question input, `.fit` file upload, response
  display.
- Client-side state only for what's on screen (current question, selected
  file, loading state). No client-side data layer, no global state library.
- Call backend Route Handlers via `fetch`; never talk to the database or the
  LLM directly from the browser.
- Keep components in `app/` co-located with the routes that use them. Extract
  a shared component only once it's actually reused.

## Backend responsibilities

- Live entirely in Next.js Route Handlers (`app/api/**/route.ts`). No
  separate Express/Fastify server.
- Validate and parse incoming requests (question text, uploaded `.fit`
  files).
- Parse `.fit` files into structured activity data (distance, pace, heart
  rate, power, etc.).
- Persist parsed activities and read them back to build context for the AI
  layer.
- Call the AI layer and return its response to the client.
- Handle errors as HTTP responses with clear status codes — no silent
  failures.

## Database responsibilities

- Store the durable state the app needs across requests: uploaded/parsed
  activities, derived training metrics, and (once auth exists) which user
  they belong to.
- A single relational database (Postgres) accessed through a thin data
  access layer in `lib/db/`. No ORM abstraction beyond what's needed to write
  typed queries — avoid building a generic repository framework.
- The database is a source of facts for the AI layer, not a place for
  business logic (no stored procedures, no triggers driving app behavior).

## AI responsibilities

- One AI layer (`lib/ai/`) responsible for turning "user question + relevant
  activity data" into an answer.
- Retrieves the minimal relevant context from the database (recent
  activities, parsed metrics for an uploaded file) and builds a prompt — no
  speculative RAG pipeline or vector database until the data actually
  requires one.
- Calls the LLM (Claude, via the Anthropic API) server-side only. API keys
  never reach the client.
- Treats the model as a stateless function: context in, answer out. Chat
  history, if stored, lives in the database, not in the AI layer.

## Future integrations

These are anticipated, not yet built. Each should slot into an existing
layer rather than requiring a new one:

- **Strava OAuth sync** — pulls activities automatically instead of relying
  on manual `.fit` uploads. Lives in `app/api/` as new routes plus a
  `lib/strava/` client; writes to the same activities table.
- **User accounts / auth** — adds a `user_id` to existing tables and an auth
  check in Route Handlers. Does not require restructuring the app.
- **Additional file formats** (`.tcx`, `.gpx`) — new parsers alongside
  `lib/fit/`, normalized into the same activity schema.
- **Notifications / weekly summaries** — a scheduled job that reuses the
  existing AI layer to generate a summary, sent by email or push.

## Guiding architectural principles

- **One developer should be able to understand the whole system.** If a
  change needs a diagram to explain, it's probably too complex for this
  project's stage.
- **Boring and simple beats clever.** Prefer the obvious Next.js way of
  doing something over a novel abstraction.
- **No speculative infrastructure.** Don't add a queue, a cache, a
  microservice, or a new database until there's a concrete problem that
  requires it.
- **New features extend existing layers.** A new feature should mean a new
  route, a new query, and maybe a new prompt — not a new architectural
  pattern.
- **The database holds facts; the AI layer holds reasoning; the frontend
  holds presentation.** Keep that separation so any one piece can be
  changed without rewriting the others.
