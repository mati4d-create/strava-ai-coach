# Enduro Coach

This document is the source of truth for the project. Read it before writing any code, designing any feature, or making any product decision. When in doubt, this document wins.

## 1. Vision

A world where every endurance athlete — not just those who can afford a professional coach — has access to a coach who genuinely knows them: their history, their body, their goals, and how they've responded to training over time.

## 2. Mission

Build an AI coach that gets to know an athlete over months and years, the way a great human coach does, and helps that athlete train smarter through conversation.

## 3. Core Principles

- **A relationship, not a report.** The product exists to build understanding of one athlete over time, not to produce one-off outputs.
- **Conversation is the product.** Chat is not a feature bolted onto a dashboard. It is the entire interface.
- **Judgment over automation.** The coach advises. The athlete decides. We never take that decision away from them.
- **Memory is the moat.** What the coach remembers about the athlete matters more than any single piece of advice it gives.
- **Minimal by default.** Every screen, button, and feature must justify its existence. When unsure, leave it out.

## 4. Target Users

Serious amateur and competitive endurance athletes (running, cycling, triathlon) who:

- Already track their training (typically via Strava).
- Want more than raw numbers — they want interpretation and guidance.
- Cannot afford, or don't want, a full-time human coach.
- Value an ongoing relationship over a one-time plan.

This is not built for beginners looking for a canned training plan, nor for elite athletes with a full support team.

## 5. MVP

The smallest version of Enduro Coach that delivers the core value:

- Athlete connects Strava and their workout history syncs in.
- Athlete chats with the coach about their training, goals, and how they're feeling.
- The coach references past workouts and past conversations naturally, the way a human coach would recall "how last week's long run went."
- The coach gives grounded, contextual advice in response to what the athlete brings up — not a generated plan dumped on day one.

If a feature isn't required for the coach to hold a genuinely informed conversation with the athlete, it is not part of the MVP.

## 6. Features NOT Included in V1

Explicitly out of scope, to keep the product minimal and the team honest:

- Dashboards, charts, or data visualizations of any kind.
- Automated training plan generation or calendars.
- Multi-sport periodization tools, TSS/CTL/ATL modeling, or other advanced sports-science UI.
- Social features (feeds, following, kudos, leaderboards).
- Notifications or nudges designed to drive engagement.
- Complex settings screens or configuration panels.
- Any navigation beyond what's needed to reach the chat and connect Strava.

If a future need arises for any of these, it must be re-argued against this document — not assumed.

## 7. Product Philosophy

Enduro Coach is not a training plan generator. It does not exist to output a spreadsheet of workouts. It exists to help an athlete think more clearly about their own training, using a coach who has actual context on their life and their body.

The value is cumulative: the coach becomes more useful the longer the athlete uses it, because it remembers more. A brand-new user and a two-year user should not get the same generic experience — the two-year user should feel like they're talking to someone who has been there the whole time.

## 8. Coach Personality

The coach should feel like an experienced human coach — not a chatbot, not a sports-science textbook, and not a hype machine.

- **Direct, not vague.** Give real opinions, not hedged non-answers.
- **Calm, not alarmist.** Bad workouts and bad weeks are normal; the coach treats them that way.
- **Curious, not interrogative.** Asks questions to understand, not to fill out a form.
- **Encouraging, not cheerleading.** Confidence comes from competence, not exclamation marks.
- **Honest, not people-pleasing.** Willing to push back or say "I wouldn't do that" when warranted.

The coach should never sound like it's reciting a knowledge base. It should sound like it remembers the athlete.

## 9. Athlete Memory

Memory is the core technical and product asset of Enduro Coach.

- The coach continuously builds understanding from uploaded/synced workouts and from the content of conversations — not just numbers, but stated goals, injuries, life context, preferences, and how the athlete tends to respond to different kinds of training.
- Memory should accumulate and refine over time, not reset per session or per conversation.
- The coach should surface memory naturally in conversation (referencing a past race, a recurring niggle, a stated goal) rather than presenting it as structured data to the athlete.
- When in doubt about whether to store something, prefer remembering — the coach's usefulness scales with what it knows about this specific athlete.

## 10. Design Philosophy

- **Extremely minimal.** The interface should recede; the conversation should be the focus.
- **Chat-first, ChatGPT-inspired.** A single, simple conversation surface is the primary — ideally only — interface.
- **No dashboards.** Athletes get insight through what the coach says, not through charts they have to interpret themselves.
- **No unnecessary navigation.** If a feature requires its own screen, question whether it belongs in the product at all.
- **Restraint is a feature.** Saying no to a screen, a setting, or a widget is usually the right call.

## 11. Technical Philosophy

- Build the simplest system that can hold a coherent, well-informed conversation with the athlete — resist the urge to build data infrastructure ahead of need.
- Athlete memory (structured facts, summaries, embeddings — whatever form it takes) is a first-class concern, on par with the chat interface itself. It deserves real design attention, not an afterthought bolted onto a chat log.
- Prefer integrating existing data sources (starting with Strava) over building custom tracking, manual entry, or duplicate data-collection UI.
- Every new dependency, abstraction, or piece of infrastructure should be justified by the MVP as defined in this document, not by anticipated future scale.
- Code, like the product, should stay minimal: no speculative configuration, no unused flexibility, no premature generalization.

## 12. Long-term Vision

Over time, Enduro Coach becomes the athlete's longest-standing relationship with any coaching input they've ever had — one that knows their full training history, has seen them through injuries and breakthroughs, and gives advice that reflects years of accumulated context rather than a single snapshot of recent data.

The product may eventually support more sports, richer data sources, and deeper physiological understanding. But it should never stop being, at its core, a conversation with a coach who knows you — not a dashboard, not a plan generator, and not a tool that makes decisions for the athlete instead of with them.
