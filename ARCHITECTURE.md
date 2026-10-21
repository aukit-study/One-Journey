# One Journey: architecture draft

## Product direction

One Journey is the shared education-services workspace for CAMT. The first implementation keeps the orange/cream Figma visual language and organizes the work around a small set of shared records. The Figma and local system-topic documents are treated as draft requirements until CAMT confirms them.

## Shared record model

- **Product / program**: the stable course or product definition; may have many activity offerings.
- **Activity / offering**: a dated instance of a product, owned by a CAMT unit, with registration and check-in rules.
- **Member**: one person record reused across activities and audiences.
- **Registration**: joins one member to one activity; duplicate registration is prevented by member + activity.
- **Journey event**: dated milestone linked to one student-history record, preserving the source of the event.
- **Partner organization**: classified as a potential partner, school network, or university/international relation.
- **Agreement**: MOU/MOA with dates and owner; actual programs and delivered work are recorded separately.
- **Budget entry**: one dated allocation, revenue, or expense with year, unit, category, source, and amount.
- **Applicant / joint course / alumni / student history**: separate domain records that can later link to the shared member, program, activity, partner, and agreement identifiers.

## Navigation domains

1. Overview dashboard.
2. Budget and revenue.
3. MOU/MOA.
4. Group A: A0 activities and participants, A1 program applicants, A2 joint courses.
5. Group B: potential partners, school networks, university international relations.
6. Group C: alumni.
7. Group D: student history from initial interest through graduation.

## Interaction rules in the local prototype

- A0 supports a self-registration form and a staff-added participant flow.
- The same email reuses the existing local member record; a person cannot be registered twice for one activity.
- Check-in is idempotent: a second check-in does not add another attendance.
- Student history stores chronological milestones and their stated source.
- MOU/MOA status can be shown as ending soon or ended based on the end date. This display rule must be confirmed with the agreement owner.
- CSV export and JSON backup are available for the current browser-local dataset.

## Data and deployment boundary

The current files under `data/` describe system topics and the education organization/program structure; they do not contain operational student, budget, activity, or partner records. The UI therefore uses clearly labelled synthetic records. Current persistence is `localStorage` in one browser only. It is suitable for reviewing flows and screen structure, not for concurrent users, secure email/password authentication, or official records.

For production, the frontend should call a shared API backed by an approved database, real authentication and role/department authorization, audit history, backup/retention rules, and controlled imports from source systems. Sensitive personal records should be permissioned separately. Source system ownership, identifiers, and approved integrations remain requirements to confirm with CAMT.

## Frontend stack and migration boundary

- React owns the application shell and reusable layout components.
- Vite provides the development server and production build.
- Tailwind CSS is integrated through its Vite plugin and defines the shared visual tokens.
- Existing module screens currently run through `src/legacy-app.js` so the established local data flows remain available during the React migration. Move module views and actions into React components as they are redesigned; avoid adding new screens to the legacy renderer.
- `src/legacy.css` preserves the existing responsive visual system while styles are moved into Tailwind utilities and component styles incrementally.

## Source layout

- `index.html`: Vite entry document.
- `src/main.jsx`: React root and shared CSS imports.
- `src/App.jsx`: React app shell, sidebar, top bar, and record dialog.
- `src/index.css`: Tailwind entry and One Journey theme tokens.
- `src/legacy-app.js`: existing local routing, schemas, local store, CRUD, registration/check-in, exports, and dashboard/module rendering.
- `src/legacy.css`: existing responsive Figma-aligned styles.
- `dist/`: generated production build output; use `npm run build` rather than editing generated files directly.

## Local development

- `npm install` installs the locked dependencies.
- `npm run dev` starts the Vite preview on port 4173.
- `npm run build` writes the production bundle to `dist/`.
- `npm run preview` serves the production bundle locally on port 4173.
