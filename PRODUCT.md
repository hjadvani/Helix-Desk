# Product

## Register
product

## Overview — Helix Desk
Helix Desk is an IT Service Management (ITSM) workspace for an internal support team —
the cockpit a service-desk agent lives in all day. It brings together a queue of
incidents and service requests, a focused ticket workspace with an activity timeline
and status workflow, live SLA timers, a service catalog of request types, an asset /
configuration-item (CI) inventory, a knowledge base, and a pulse dashboard for the
team lead. It is the internal tool for the people who *resolve* tickets — not a public
help portal. The full specification (features, screens, data model, components, design
system) lives in **`PLAN.md`** at the workspace root, which is the source of truth.

## Who it's for
IT support agents / service-desk technicians (primary) and the IT team lead who
watches SLA health and queue load (secondary). Single-tenant, internal, authenticated.
Data persists locally in the browser (localStorage), seeded richly so the app opens
fully populated.

## Core screens
Dashboard · Ticket Queue · Ticket Detail · Service Catalog · Assets/CIs ·
Knowledge Base · Team.

## Tone & identity
Calm, competent, control-room. A dense operational instrument used for hours — it
should feel like a panel an experienced technician trusts, not a consumer app.
Confident dark surface, one disciplined amber signal color for brand + primary
actions, and semantic status colors (red = breach/critical, blue = in progress,
green = resolved) that mean the same thing on every screen. The data is the star;
chrome recedes.
Follow the **DESIGN SYSTEM** section of `PLAN.md` for palette, typography, and layout.
Compose from the shadcn components in `app/src/components/ui`, use recharts for the
dashboard visualizations, and apply impeccable's color / typography / layout / motion
rules.

## Notes
- Do not stop to "initialize project context" — the context is already set up here.
- Never scaffold, install dependencies, or run a dev server; the platform owns the
  build and preview.
