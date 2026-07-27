# PLAN.md — Helix Desk (ITSM)

## APP
- Name: Helix Desk
- Summary: An IT Service Management (ITSM) workspace where an internal support team
  triages, works, and resolves incidents and service requests against SLAs, backed by
  a service catalog, an asset (CI) inventory, and a knowledge base.
- Target users: IT support agents / service-desk technicians (primary); IT team lead
  monitoring SLA health and queue load (secondary).
- Primary device: Desktop-first, dense operational UI. Responsive down to tablet;
  mobile is a read-and-triage fallback (queue + ticket detail remain usable).

## FEATURES

1. **Ticket / Incident Queue & Triage**
   The core working list of all tickets (incidents + service requests) in a dense,
   sortable table. Agents filter by status, priority, type, assignee, category, and
   SLA state, and full-text search by title / ID / requester. A left rail of saved
   views ("My open", "Unassigned", "Breaching soon", "All open", "Recently resolved")
   scopes the list; each view shows a live count. Rows show ID, title, requester,
   priority, status, assignee (avatar), category, and a live SLA countdown chip.
   - Acceptance: Selecting a saved view filters the table and updates the header
     count. Combining a saved view + a status filter + a search term narrows results
     correctly (AND semantics). Sorting by priority, updated time, or SLA remaining
     reorders rows. Clicking a row opens Ticket Detail. Empty filter results show a
     real empty state with a "Clear filters" action.

2. **Ticket Detail, Activity Timeline & Workflow**
   A two-column work surface: left = description + threaded activity timeline; right =
   properties panel. Agents post two kinds of entries — **internal notes** (agent-only,
   distinct styling) and **replies to requester** — via a composer with a segmented
   toggle. The properties panel edits status, priority, assignee, and category; each
   change appends a timestamped system event with the acting agent. A status workflow
   (New → In Progress → On Hold → Resolved → Closed) is enforced via quick-action
   buttons that only offer valid transitions.
   - Acceptance: Changing status/priority/assignee/category updates the ticket,
     appends a timestamped system event, and persists. Posting a note or reply
     prepends it to the timeline with author + relative time and clears the composer.
     Resolving requires a resolution note (optionally a linked KB article); the SLA
     timer stops. Invalid transitions are not offered (e.g. can't Close from New).

3. **SLA Tracking & Timers**
   Every ticket gets a response-target and a resolution-target derived from its
   priority at creation. The app computes remaining time live and classifies each
   ticket as On track / Due soon (<25% remaining) / Breaching / Met / Missed.
   Countdown chips appear in the queue and on ticket detail, and drive dashboard KPIs.
   Timers pause while a ticket is On hold, and stop when Resolved/Closed.
   - Acceptance: A Critical ticket shows a tighter target than a Low ticket. A ticket
     with <25% time left renders amber "Due soon"; past target renders red
     "Breaching". Putting a ticket On hold freezes its countdown; resuming continues
     it. Resolved/Closed tickets show a final "Met"/"Missed", not a running clock.

4. **Dashboard (Team Pulse)**
   The lead's overview: KPI stat row (Open tickets, Unassigned, Breaching / at-risk
   SLA, Resolved today, Avg resolution time, SLA compliance %), plus charts — tickets
   by status (bar), tickets by priority (donut), tickets by category (bar), a 14-day
   created-vs-resolved trend (area), and an SLA compliance gauge — plus an aging
   buckets list and a recent-activity feed. Everything derives from live ticket data.
   - Acceptance: Creating, reassigning, or resolving tickets updates the KPIs and
     charts on next view. The "Breaching" KPI matches the queue's breaching view.
     Avg resolution time computes from resolved tickets' created→resolved spans.
     Clicking a KPI or chart segment deep-links to the queue pre-filtered.

5. **Service Catalog & New Ticket**
   A catalog of request types (e.g. New laptop, Software install, VPN access,
   Password reset, Onboarding, Report an outage) grouped by category, each with an
   icon, description, default priority, and target SLA. Agents (or a requester on
   their behalf) pick a catalog item to start a pre-filled request, or create a
   free-form incident. The create form captures type, title, description, requester,
   category, priority, and optional linked asset; on submit it computes SLA targets,
   sets status New, and opens the ticket.
   - Acceptance: The catalog grid renders all items grouped by category with search.
     Choosing an item opens New Ticket pre-filled with its category/priority/title
     seed. Required fields (title, requester, category, priority) validate;
     description ≥ 10 chars. Submitting generates an ID (INC-#### / REQ-####), sets
     correct SLA targets and a "created" activity event, then navigates to detail.

6. **Assets / Configuration Items (CIs)**
   An inventory of hardware, software, and services with owner, status, location,
   purchase/warranty dates, and linked tickets. Filterable, searchable table + an
   asset detail drawer showing specs and its ticket history. A ticket can link one CI.
   - Acceptance: Filtering assets by type/status narrows the list. Opening an asset
     shows details and every ticket linked to it. Linking a CI from a ticket makes
     that ticket appear on the asset's history. Empty state when an asset has no
     linked tickets.

7. **Knowledge Base**
   A searchable library of articles grouped by category (How-to, Troubleshooting,
   Policy, Known Error). Article list with search + category filter, and a reader view
   with body, tags, author, updated date, and view/helpful counts. Articles are
   linkable from a ticket resolution.
   - Acceptance: Searching filters articles by title/body/tag. Opening an article
     shows the full reader. From a ticket's resolve flow, an agent can attach a KB
     article, which then appears on the ticket. No-results search shows an empty state.

8. **Team / Agents**
   A roster of the support team showing each agent's name, title, role, and current
   load (active tickets, breaching count). Used for assignment and as a lightweight
   workload view for the lead.
   - Acceptance: The roster lists all agents with a live active-ticket count derived
     from open tickets. Assignment dropdowns across the app draw from this roster.

9. **Command / Global Search & Theme**
   A top-bar global search + command palette (⌘K) to jump to a ticket by ID/title, an
   asset, or a KB article, and to trigger New Ticket. A light/dark toggle (defaults to
   dark) persists. A reset-to-seed action restores the demo dataset.
   - Acceptance: ⌘K opens the palette; typing filters across tickets/assets/articles;
     Enter navigates. Theme toggle switches `.dark` and persists across reloads.

## SCREENS

- **App Shell** — Persistent left sidebar (wordmark; nav: Dashboard, Queue, Catalog,
  Assets, Knowledge Base, Team; a "New ticket" primary button; agent profile at
  bottom) + top bar (global search, ⌘K hint, theme toggle, notifications bell).
  Sidebar collapses to icons on narrow widths.
- **Dashboard** — KPI stat row, charts grid, aging buckets, recent-activity feed.
  Empty state (fresh, no tickets): "Create your first ticket". Loading: skeleton stat
  cards + chart placeholders.
- **Ticket Queue** — Saved-views rail + filter bar (status/priority/type/assignee/
  category + search) + dense table with SLA countdown chips + row selection. Empty:
  "No tickets match these filters" + Clear filters. Loading: row skeletons. Error:
  retry panel.
- **Ticket Detail** — Header (ID, title, type badge, status, priority, SLA chip,
  quick actions) + two columns (description & activity timeline with note/reply
  composer | properties panel: status, priority, assignee, category, linked asset,
  requester, timestamps, SLA breakdown). Empty activity: "No activity yet".
  Not-found: "Ticket not found" + back-to-queue.
- **Service Catalog** — Search + category groups of request-type cards (icon, name,
  description, default priority, SLA). Empty search: "No request types found".
- **New Ticket** — Form (modal + `/tickets/new` route): type toggle, title,
  description, requester, category, priority, linked asset. Inline validation.
- **Assets / CIs** — Filter bar + table (name, type, status, owner, location, open
  tickets). Asset detail drawer: specs, lifecycle dates, linked tickets. Empty:
  "No assets yet"; empty linked tickets state.
- **Knowledge Base** — Category filter + search + article cards. Article reader:
  title, meta, body, tags, helpful/view counts, related tickets. Empty search state.
- **Team** — Agent roster cards/table with load metrics. Empty: (seeded, so N/A) but
  handled.
- **Login** — Sign-in page (AUTH: login): wordmark, credential fields, submit.
- **Command Palette** — Overlay (⌘K) with grouped results (Tickets / Assets /
  Articles / Actions).

## DATA MODEL & STATE

- **PERSISTENCE: local** — All data lives in the browser via localStorage, managed by
  a zustand store (with persist). No backend. On first run, seed the store with rich,
  realistic data; expose reset-to-seed in the profile menu.
- **AUTH: login** — The app has agent accounts, per-agent assignment, and a "current
  agent" identity, so the builder builds the login page (template `/login` route + the
  authentication skill's surfaces). Single-tenant; all seeded agents share the same
  workspace data (login selects the acting agent identity).

### Entities

**Ticket**
- `id` string (e.g. `INC-1042`, `REQ-0231`), `type` `"incident" | "request"`,
  `title`, `description`,
  `status` `"new" | "in_progress" | "on_hold" | "resolved" | "closed"`,
  `priority` `"critical" | "high" | "medium" | "low"`,
  `categoryId`, `requesterId`, `assigneeId` string | null, `assetId` string | null,
  `catalogItemId` string | null,
  `createdAt` ISO, `updatedAt` ISO, `resolvedAt` ISO | null,
  `slaResponseDueAt` ISO, `slaResolutionDueAt` ISO,
  `firstRespondedAt` ISO | null, `onHoldMs` number (accumulated paused time),
  `resolution` { note: string, kbArticleId: string | null } | null,
  `activity` ActivityEntry[].
- **ActivityEntry**: `id`, `kind` `"note" | "reply" | "system"`, `actorId`, `body`,
  `createdAt` ISO, plus for system: `field` / `from` / `to`.

**Agent** (`id`, `name`, `email`, `avatarColor`, `role` `"agent" | "lead"`, `title`;
`activeTicketCount` + `breachingCount` derived).

**Requester** (`id`, `name`, `email`, `department`, `avatarColor`).

**Category** (`id`, `name`, `defaultPriority`).

**CatalogItem** (`id`, `name`, `description`, `icon`, `categoryId`,
`type` `"incident" | "request"`, `defaultPriority`, `slaResolutionMins`).

**Asset / CI** (`id` e.g. `CI-2041`, `name`, `type`
`"laptop" | "desktop" | "server" | "network" | "software" | "service" | "peripheral"`,
`status` `"in_use" | "in_stock" | "in_repair" | "retired"`, `ownerId`, `location`,
`serialNo`, `purchasedAt` ISO, `warrantyEndsAt` ISO, `notes`).

**KbArticle** (`id`, `title`, `body`, `category`
`"howto" | "troubleshooting" | "policy" | "known_error"`, `tags` string[],
`authorId`, `updatedAt` ISO, `views` number, `helpful` number).

**SLA policy** (derived constant): per priority → responseMins + resolutionMins
(Critical 15/240, High 30/480, Medium 120/1440, Low 240/2880).

### Seed data (realistic, plentiful)
- **~40 tickets** spanning all statuses, priorities, and both types, dated across the
  last ~14 days; several deliberately "Due soon" and a few "Breaching" so the
  dashboard and SLA chips look alive; each with 2–6 activity entries (mix of
  system/note/reply). Include resolved/closed tickets with resolution notes so avg
  resolution time and compliance compute.
- **8 agents** (1 lead) with varied loads; **~20 requesters** across departments
  (Finance, Sales, Engineering, HR, Ops, Support, Legal, Marketing).
- **~10 categories** (Hardware, Software, Network, Access/Account, Email, VPN,
  Printing, Onboarding, Password Reset, Outage).
- **~12 catalog items** across categories.
- **~30 assets/CIs** across all types & statuses, many linked to tickets.
- **~12 KB articles** across the four categories with realistic bodies/tags/counts.

### UI state (zustand, non-persisted slice)
Selected saved view, active filters, search query, selected rows, open dialogs (new
ticket, command palette, resolve), theme. Data slice is persisted; UI slice is not.

## COMPONENTS (shadcn/ui → screens)
- **Table** + **DropdownMenu** + **Checkbox** — Queue, Assets.
- **Badge** — status/priority/type/SLA chips (semantic colors), KB categories.
- **Card** — dashboard KPIs & chart containers, catalog items, KB cards, asset detail,
  team roster.
- **Tabs** / **ToggleGroup** — ticket detail (activity vs details on mobile), note/
  reply composer toggle, ticket type toggle.
- **Dialog** — New Ticket modal, resolve-ticket flow, reset-data confirm.
- **Command** — ⌘K palette + global search.
- **Sheet** — asset detail drawer, mobile filters, mobile sidebar.
- **Select** — status/priority/assignee/category editors and filters.
- **Avatar** — agents/requesters (color-initials).
- **Textarea** / **Input** / **Label** / **Form** — composer, new ticket, filters.
- **Tooltip** — SLA breakdown, truncated cells, icon buttons.
- **Skeleton** — all loading states. **Separator**, **ScrollArea**, **Popover**,
  **Progress** (SLA/compliance), **Sonner** toasts on mutations.
- **recharts** — bar (by status, by category), donut/pie (by priority), area (14-day
  trend), radial (SLA compliance gauge); colors via `var(--chart-1..5)`.

## DESIGN SYSTEM

### Design spec (prose)
- **Color mode: DARK (default).** Usage scene: a service-desk agent works this panel
  for hours in a dim ops area, late shifts included, scanning a wall of live SLA
  timers where a single breaching-red must jump out instantly. A dark, low-glare
  control-room surface makes semantic status colors pop and reduces fatigue — the tool
  is an instrument, not a document. Light mode is fully supported via `.dark` token
  swap for daytime/open-plan preference.
- **Color strategy: Restrained (dark canvas).** Near-neutral dark surfaces do ~60% of
  the work; one disciplined **amber signal** carries brand + primary actions + current
  selection (~10%); a full **semantic status set** does the categorical coloring.
  Amber is deliberately NOT red — red is reserved for breach/critical, so the brand
  signal and the danger signal never collide.
- **Brand hue:** amber/gold, hue ≈ 82 (an instrument-panel backlight). Neutrals are
  tinted a hair toward it (chroma 0.006–0.012) for cohesion — near-achromatic, never a
  cream/beige surface (this is dark mode; no L 0.84–0.97 warm near-white anywhere).
- **Palette (dark, primary mode)** — OKLCH:
  - `background` `oklch(0.171 0.006 90)` (near-black, faint warm tint)
  - `card` / `popover` `oklch(0.208 0.007 90)`
  - `secondary` / `muted` surface `oklch(0.248 0.008 90)`
  - `foreground` `oklch(0.945 0.004 90)` (soft warm-white, not #fff)
  - `muted-foreground` `oklch(0.712 0.007 90)` (AA on card ≥ 4.5:1)
  - `border` / `input` `oklch(0.285 0.008 90)`
  - `primary` (amber) `oklch(0.815 0.145 82)`, `primary-foreground`
    `oklch(0.205 0.03 82)` (dark text on gold — high legibility per H-K effect)
  - `accent` (cool cyan-teal, for links/info highlights, distinct from amber in hue
    AND lightness) `oklch(0.72 0.10 215)`; `accent-foreground` `oklch(0.16 0.02 215)`
  - `ring` amber `oklch(0.815 0.145 82)`
  - `sidebar` `oklch(0.150 0.006 90)` (a touch deeper than bg); `sidebar-primary` =
    amber.
- **Palette (light mode)** — pure-ish neutral, faintly warm-tinted:
  - `background` `oklch(0.992 0.002 90)`, `card`/`popover` `oklch(1 0 0)`,
    `foreground` `oklch(0.205 0.008 90)`, `muted-foreground` `oklch(0.505 0.01 90)`,
    `border`/`input` `oklch(0.906 0.006 90)`, `secondary`/`muted`
    `oklch(0.965 0.004 90)`, `primary` `oklch(0.72 0.15 78)` with `primary-foreground`
    `oklch(0.20 0.03 78)`, `accent` `oklch(0.55 0.12 220)`, `ring` amber. Sidebar
    `oklch(0.972 0.004 90)`.
- **Semantic colors** (same meaning everywhere, both modes):
  - Critical / Breaching / destructive → **red** `oklch(0.62 0.21 22)`
  - High / Due-soon / warning → **amber-orange** `oklch(0.70 0.16 55)`
  - Medium / In progress / info → **blue** `oklch(0.62 0.14 235)`
  - Low / Resolved / On-track / success → **green** `oklch(0.68 0.15 150)`
  - New → violet `oklch(0.64 0.14 285)`; On hold → muted grey.
  - Status & priority badges use tinted-bg + saturated-text (dark) / saturated-bg +
    white-text (filled) — never colored side-stripes.
- **Chart ramp (deliberate multi-hue sequence, not tints of one):**
  chart-1 amber `oklch(0.80 0.15 82)`, chart-2 teal `oklch(0.70 0.11 200)`,
  chart-3 violet `oklch(0.66 0.14 290)`, chart-4 rose `oklch(0.66 0.18 15)`,
  chart-5 green `oklch(0.72 0.14 150)`.
- **Contrast (WCAG AA):** foreground on bg/card ≥ 12:1; muted-foreground on card
  ≥ 4.6:1; dark `primary-foreground` on amber ≥ 6:1; white text on filled saturated
  status chips, dark text only on pale/neutral chips. Verify each pair.
- **Font:** Body/UI **Hanken Grotesk** (humanist grotesque — warm, highly legible at
  dense UI sizes, distinct from the Inter/Geist reflex) across weights 400/500/600/700
  for headings, labels, and body. **Spline Sans Mono** used ONLY for tabular numerics
  — SLA countdowns, ticket/CI IDs, table metrics — a true contrast-axis pairing
  (proportional humanist vs monospaced) that gives timers a precise instrument feel.
  Enable `font-variant-numeric: tabular-nums` on all data. No display/serif face.
- **Layout:** Persistent left **sidebar** (collapsible to icons) + top bar; dense
  content zones (high row density, compact padding, 8px base rhythm). Dark is default;
  both themes ship via `.dark` token swap (no per-component color overrides). Depth in
  dark mode from surface-lightness steps (sidebar deepest, bg, card/popover lighter),
  not heavy shadows.
- **Corner radius: `0.375rem`** — crisp, slightly-softened rectangles suit a dense
  instrument panel: precise/technical, not consumer-round. Pills only for badges/chips.

### theme.json
Written at workspace root; values mirror the palette above. Both `light` and `dark`
token sets included; `mode` = `dark`.

## NOTES
- **Resolved ambiguity (no-preference brief):** chose the agent-facing service-desk
  interpretation with the full recommended capability set (tickets, SLA, service
  catalog, assets, KB, dashboard, team), the standard 5-state lifecycle (New →
  In Progress → On Hold → Resolved → Closed), and local persistence — the
  higher-ceiling, most useful complete product.
- Non-goals (v1): change/approval workflows, multi-tenant orgs, email ingestion, real
  notifications, per-role permission enforcement (roles are labels, not gates), and a
  separate end-user self-service portal — this is the agent cockpit only.
- SLA math is client-side and wall-clock based (paused time tracked via `onHoldMs`);
  business-hours calendars are out of scope for v1.
- Ticket IDs are generated per type with zero-padded counters seeded above the
  existing max.
- Reset-to-seed restores the rich demo dataset at any time.
