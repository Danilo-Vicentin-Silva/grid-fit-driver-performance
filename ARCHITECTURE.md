# Architecture - GridFit

## Folder Structure

- `app/` - Next.js App Router pages and layouts (server components by default). Server-side fetching and routing live here.
- `components/` - Presentational UI components, small and composable (cards, buttons, widgets).
- `hooks/` - Custom React hooks that encapsulate logic (e.g. `use-dashboard`, `use-workout-player`).
- `lib/` - Utilities and shared context (e.g. `supabase` client wrappers, language and theme contexts).
- `lib/services/` - Encapsulated API/service functions that interact with external systems (e.g. `workoutService`).
- `styles/` and `public/` - Static assets and global styles.

This separation aims to keep **UI**, **logic**, and **integration code** decoupled for readability and testability.

---

## Design Decisions

- **Next.js App Router**: Server components are used for data fetching to take advantage of streaming, better SEO, and simplified server-side logic.

- **Tailwind CSS**: Utility-first CSS for rapid UI composition, small bundle size and consistent design tokens. It makes it easy to ship a clean, responsive UI without heavy component libraries.

- **Supabase**: Fast to set up relational data (Postgres) + Auth. Good for showcasing a full-stack project without heavy infra.

- **Custom Hooks + Services**: Hooks keep UI components focused on rendering; services centralize API interactions so they can be unit-tested and replaced (for example, swapping Supabase for another backend).

- **TypeScript**: Enforces contracts and reduces runtime errors; important for a showcase project.

---

## Data Flow

1. A page (e.g., `app/dashboard/page.tsx`) uses server-side code to create a Supabase client and fetch domain data (workouts, profile, completed workouts).
2. Fetched data is passed to presentational components (`DashboardContent`) as props.
3. Client-side interactions (e.g., starting a workout) use custom hooks (e.g., `useWorkoutPlayer`) and call functions from `lib/services/*` which encapsulate Supabase writes (`completed_workouts`, `completed_exercises`).
4. Updates are persisted in Postgres; the UI re-renders based on local state or subsequent server fetches.

This pattern separates the read path (server components) from write actions (client hooks/services).

---

## Scalability & Future Work

- **Telemetry & Metrics**: Integrate analytics (Sentry, PostHog) for crash and usage data.
- **Realtime Telemetry (IoT)**: Provide endpoints to ingest telemetry from kart hardware (RPM, GPS). Could use Supabase Realtime or an event pipeline (e.g., MQTT -> Ingest microservice -> Postgres/Timescale).
- **Modular API Layer**: Introduce an API abstraction (e.g., repository pattern) to support multiple backends.
- **CI/CD & Tests**: Add E2E tests (Playwright) and visual regression tests for UI parity. Add linting and pre-commit hooks.
- **Internationalization**: Extract translations to files and integrate a full i18n solution for scaling locales.

---

If you'd like, I can add sequence diagrams or a simple architecture diagram SVG for the README to illustrate the flow visually.
