import type {
  Agent,
  Asset,
  Category,
  CatalogItem,
  KbArticle,
  Requester,
  Ticket,
  Priority,
  TicketStatus,
  TicketType,
  ActivityEntry,
} from "@/lib/types"
import { slaTargetsFor } from "@/lib/sla"

const MIN = 60 * 1000
const HOUR = 60 * MIN
const DAY = 24 * HOUR

// A fixed anchor keeps generated relative dates deterministic per session load.
const NOW = Date.now()
const iso = (ms: number) => new Date(ms).toISOString()

export const AGENTS: Agent[] = [
  { id: "ag-1", name: "Priya Nair", email: "priya.nair@helix.co", avatarColor: "oklch(0.7 0.15 82)", role: "lead", title: "Service Desk Lead" },
  { id: "ag-2", name: "Marcus Bell", email: "marcus.bell@helix.co", avatarColor: "oklch(0.65 0.13 235)", role: "agent", title: "Senior IT Technician" },
  { id: "ag-3", name: "Sofia Ramos", email: "sofia.ramos@helix.co", avatarColor: "oklch(0.66 0.15 150)", role: "agent", title: "IT Support Specialist" },
  { id: "ag-4", name: "Dmitri Volkov", email: "dmitri.volkov@helix.co", avatarColor: "oklch(0.64 0.16 290)", role: "agent", title: "Systems Administrator" },
  { id: "ag-5", name: "Aisha Khan", email: "aisha.khan@helix.co", avatarColor: "oklch(0.66 0.18 15)", role: "agent", title: "IT Support Specialist" },
  { id: "ag-6", name: "Leo Whitfield", email: "leo.whitfield@helix.co", avatarColor: "oklch(0.68 0.12 200)", role: "agent", title: "Network Engineer" },
  { id: "ag-7", name: "Hana Sato", email: "hana.sato@helix.co", avatarColor: "oklch(0.7 0.14 60)", role: "agent", title: "Desktop Support" },
  { id: "ag-8", name: "Owen Clarke", email: "owen.clarke@helix.co", avatarColor: "oklch(0.62 0.13 265)", role: "agent", title: "IT Support Specialist" },
]

const DEPARTMENTS = ["Finance", "Sales", "Engineering", "HR", "Operations", "Support", "Legal", "Marketing"]
const REQ_NAMES = [
  "Elena Fischer", "Tom Bradley", "Rani Desai", "Chris Nolan", "Mei Lin", "Jacob Stein",
  "Nadia Ali", "Paul Grover", "Sara Okafor", "Ivan Petrov", "Grace Hall", "Derek Wu",
  "Lena Vogt", "Omar Farah", "Bea Costa", "Ravi Menon", "Tanya Reid", "Felix Brand",
  "Zoe Park", "Andre Silva",
]
export const REQUESTERS: Requester[] = REQ_NAMES.map((name, i) => ({
  id: `rq-${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(/[^a-z]/g, ".")}@corp.com`,
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  avatarColor: `oklch(0.68 0.12 ${(i * 37) % 360})`,
}))

export const CATEGORIES: Category[] = [
  { id: "cat-hw", name: "Hardware", defaultPriority: "medium" },
  { id: "cat-sw", name: "Software", defaultPriority: "medium" },
  { id: "cat-net", name: "Network", defaultPriority: "high" },
  { id: "cat-acc", name: "Access / Account", defaultPriority: "high" },
  { id: "cat-email", name: "Email", defaultPriority: "medium" },
  { id: "cat-vpn", name: "VPN", defaultPriority: "high" },
  { id: "cat-print", name: "Printing", defaultPriority: "low" },
  { id: "cat-onboard", name: "Onboarding", defaultPriority: "medium" },
  { id: "cat-pwd", name: "Password Reset", defaultPriority: "medium" },
  { id: "cat-outage", name: "Outage", defaultPriority: "critical" },
]

export const CATALOG_ITEMS: CatalogItem[] = [
  { id: "svc-laptop", name: "New laptop", description: "Request a company laptop for a new or existing employee.", icon: "Laptop", categoryId: "cat-hw", type: "request", defaultPriority: "medium", slaResolutionMins: 1440 },
  { id: "svc-install", name: "Software install", description: "Install approved software on your workstation.", icon: "Download", categoryId: "cat-sw", type: "request", defaultPriority: "low", slaResolutionMins: 2880 },
  { id: "svc-vpn", name: "VPN access", description: "Request remote VPN access to internal systems.", icon: "ShieldCheck", categoryId: "cat-vpn", type: "request", defaultPriority: "high", slaResolutionMins: 480 },
  { id: "svc-pwd", name: "Password reset", description: "Reset a forgotten or expired account password.", icon: "KeyRound", categoryId: "cat-pwd", type: "request", defaultPriority: "medium", slaResolutionMins: 1440 },
  { id: "svc-onboard", name: "Employee onboarding", description: "Provision accounts and equipment for a new hire.", icon: "UserPlus", categoryId: "cat-onboard", type: "request", defaultPriority: "medium", slaResolutionMins: 1440 },
  { id: "svc-outage", name: "Report an outage", description: "Report a service or system that is down.", icon: "TriangleAlert", categoryId: "cat-outage", type: "incident", defaultPriority: "critical", slaResolutionMins: 240 },
  { id: "svc-email", name: "Email issue", description: "Report problems sending or receiving email.", icon: "Mail", categoryId: "cat-email", type: "incident", defaultPriority: "medium", slaResolutionMins: 1440 },
  { id: "svc-printer", name: "Printer problem", description: "Report a printer that is jammed, offline, or out of supplies.", icon: "Printer", categoryId: "cat-print", type: "incident", defaultPriority: "low", slaResolutionMins: 2880 },
  { id: "svc-access", name: "Access request", description: "Request access to an application, folder, or system.", icon: "LockKeyhole", categoryId: "cat-acc", type: "request", defaultPriority: "high", slaResolutionMins: 480 },
  { id: "svc-monitor", name: "Peripheral request", description: "Request a monitor, keyboard, mouse, or dock.", icon: "Monitor", categoryId: "cat-hw", type: "request", defaultPriority: "low", slaResolutionMins: 2880 },
  { id: "svc-wifi", name: "Wi-Fi / network issue", description: "Report slow or dropping network connectivity.", icon: "Wifi", categoryId: "cat-net", type: "incident", defaultPriority: "high", slaResolutionMins: 480 },
  { id: "svc-mobile", name: "Mobile device setup", description: "Configure company email and MDM on a mobile device.", icon: "Smartphone", categoryId: "cat-sw", type: "request", defaultPriority: "low", slaResolutionMins: 2880 },
]

const ASSET_MODELS: { name: string; type: Asset["type"] }[] = [
  { name: "MacBook Pro 14\"", type: "laptop" },
  { name: "Dell Latitude 7440", type: "laptop" },
  { name: "ThinkPad X1 Carbon", type: "laptop" },
  { name: "Dell OptiPlex 7010", type: "desktop" },
  { name: "HPE ProLiant DL380", type: "server" },
  { name: "Cisco Catalyst 9300", type: "network" },
  { name: "Ubiquiti UDM Pro", type: "network" },
  { name: "Adobe Creative Cloud", type: "software" },
  { name: "Microsoft 365 E5", type: "software" },
  { name: "Salesforce Platform", type: "service" },
  { name: "Dell U2723QE Monitor", type: "peripheral" },
  { name: "Logitech MX Dock", type: "peripheral" },
]
const LOCATIONS = ["HQ – Floor 3", "HQ – Floor 5", "Remote", "Datacenter A", "Branch – Austin", "Branch – Berlin"]
const ASSET_STATUSES: Asset["status"][] = ["in_use", "in_use", "in_use", "in_stock", "in_repair", "retired"]

export const ASSETS: Asset[] = Array.from({ length: 30 }, (_, i) => {
  const model = ASSET_MODELS[i % ASSET_MODELS.length]
  const status = ASSET_STATUSES[i % ASSET_STATUSES.length]
  return {
    id: `CI-${2001 + i}`,
    name: `${model.name}`,
    type: model.type,
    status,
    ownerId: status === "in_use" ? REQUESTERS[i % REQUESTERS.length].id : null,
    location: LOCATIONS[i % LOCATIONS.length],
    serialNo: `SN-${(918273 + i * 137).toString(36).toUpperCase()}`,
    purchasedAt: iso(NOW - (400 + i * 20) * DAY),
    warrantyEndsAt: iso(NOW + (300 - i * 15) * DAY),
    notes: model.type === "software" || model.type === "service" ? "License seat / subscription." : "Standard-issue asset under lifecycle management.",
  }
})

export const KB_ARTICLES: KbArticle[] = [
  { id: "kb-1", title: "How to reset your corporate password", category: "howto", authorId: "ag-3", tags: ["password", "account", "self-service"], views: 1284, helpful: 342, updatedAt: iso(NOW - 6 * DAY), body: "You can reset your own password from the self-service portal in under two minutes.\n\n1. Go to portal.helix.co and select 'Forgot password'.\n2. Enter your corporate email and complete the MFA challenge.\n3. Choose a new password that meets the complexity policy (12+ characters, mixed case, a number, and a symbol).\n4. Sign out of all devices and sign back in.\n\nIf you are locked out after five failed attempts, wait 15 minutes or raise a Password Reset request and an agent will unlock the account." },
  { id: "kb-2", title: "Connecting to the VPN from a personal device", category: "howto", authorId: "ag-6", tags: ["vpn", "remote", "network"], views: 942, helpful: 210, updatedAt: iso(NOW - 12 * DAY), body: "Remote access uses the GlobalConnect VPN client with certificate-based MFA.\n\nInstall the client from the software portal, sign in with your corporate credentials, and approve the push notification. If the tunnel fails to establish, confirm your device clock is accurate and that you are not on a captive-portal network." },
  { id: "kb-3", title: "Outlook won't send or receive mail", category: "troubleshooting", authorId: "ag-5", tags: ["email", "outlook", "office365"], views: 771, helpful: 168, updatedAt: iso(NOW - 3 * DAY), body: "Most send/receive failures come from a stale credential or an oversized mailbox.\n\nFirst, check the status bar for 'Working Offline' and toggle it off. Then verify your mailbox is under quota. If issues persist, remove and re-add the account, or run the Support and Recovery Assistant." },
  { id: "kb-4", title: "Printer shows offline on Windows", category: "troubleshooting", authorId: "ag-7", tags: ["printer", "windows", "hardware"], views: 610, helpful: 132, updatedAt: iso(NOW - 20 * DAY), body: "An offline printer is usually a spooler or driver problem.\n\nRestart the Print Spooler service, clear the queue, and confirm the printer's IP is reachable. If the printer is on a different subnet, connect to the office network or VPN first." },
  { id: "kb-5", title: "Acceptable use of company assets", category: "policy", authorId: "ag-1", tags: ["policy", "compliance", "assets"], views: 455, helpful: 88, updatedAt: iso(NOW - 40 * DAY), body: "Company-issued devices are provided for business use. Personal use should be incidental and must not compromise security. All devices are enrolled in mobile device management and may be remotely wiped if lost or on termination." },
  { id: "kb-6", title: "Data classification and handling policy", category: "policy", authorId: "ag-1", tags: ["policy", "security", "data"], views: 398, helpful: 76, updatedAt: iso(NOW - 55 * DAY), body: "Data is classified as Public, Internal, Confidential, or Restricted. Confidential and Restricted data must be encrypted at rest and in transit and may never be stored on personal devices or unapproved cloud services." },
  { id: "kb-7", title: "Known error: Salesforce SSO loop after password change", category: "known_error", authorId: "ag-4", tags: ["salesforce", "sso", "known-error"], views: 289, helpful: 61, updatedAt: iso(NOW - 2 * DAY), body: "After a password change, some users hit an infinite SSO redirect on Salesforce.\n\nWorkaround: clear cookies for the identity provider domain and re-authenticate. A permanent fix is tracked with the IdP vendor under ticket CHG-2041." },
  { id: "kb-8", title: "Known error: VPN drops on macOS Sonoma sleep/wake", category: "known_error", authorId: "ag-6", tags: ["vpn", "macos", "known-error"], views: 244, helpful: 53, updatedAt: iso(NOW - 8 * DAY), body: "On macOS Sonoma the VPN tunnel does not always re-establish after wake.\n\nWorkaround: toggle Wi-Fi off and on, or quit and relaunch the VPN client. A patched client is in pilot." },
  { id: "kb-9", title: "Setting up a new monitor and dock", category: "howto", authorId: "ag-7", tags: ["hardware", "monitor", "dock"], views: 512, helpful: 119, updatedAt: iso(NOW - 15 * DAY), body: "Connect the dock to power and to your laptop via the single USB-C cable. Daisy-chain displays via DisplayPort. If a display is not detected, update the dock firmware from the vendor utility." },
  { id: "kb-10", title: "Requesting software: the approval flow", category: "howto", authorId: "ag-2", tags: ["software", "approval", "procurement"], views: 367, helpful: 71, updatedAt: iso(NOW - 25 * DAY), body: "Submit a Software install request from the catalog. Non-standard titles route to your manager and then IT security for approval. Approved installs are pushed automatically within one business day." },
  { id: "kb-11", title: "Wi-Fi is slow in the office", category: "troubleshooting", authorId: "ag-6", tags: ["network", "wifi", "performance"], views: 433, helpful: 94, updatedAt: iso(NOW - 5 * DAY), body: "Confirm you are on the 'Corp-5G' SSID rather than 'Corp-Guest'. Forget and rejoin the network. If throughput is still poor, note your floor and nearest access point so networking can check for congestion." },
  { id: "kb-12", title: "Onboarding checklist for new hires", category: "policy", authorId: "ag-1", tags: ["onboarding", "checklist", "hr"], views: 528, helpful: 140, updatedAt: iso(NOW - 30 * DAY), body: "On day one a new hire should have: an active account, MFA enrolled, a provisioned laptop, email and calendar access, and membership in their team's distribution lists. IT completes provisioning within 24 hours of the HR trigger." },
]

// ---- Ticket generation --------------------------------------------------------------

const TICKET_TEMPLATES: {
  type: TicketType
  title: string
  description: string
  categoryId: string
  priority: Priority
}[] = [
  { type: "incident", title: "Cannot connect to VPN from home", description: "The VPN client fails with a certificate error every time I try to connect from my home network this morning.", categoryId: "cat-vpn", priority: "high" },
  { type: "incident", title: "Payroll system is down", description: "The entire payroll application returns a 503 for the whole Finance team. Payroll run is due today.", categoryId: "cat-outage", priority: "critical" },
  { type: "request", title: "New laptop for incoming analyst", description: "Please provision a standard laptop for our new analyst starting next Monday in the Sales team.", categoryId: "cat-hw", priority: "medium" },
  { type: "incident", title: "Outlook keeps asking for password", description: "Outlook prompts for my password on a loop and never accepts it. I have restarted twice.", categoryId: "cat-email", priority: "medium" },
  { type: "request", title: "Install Adobe Photoshop", description: "I need Photoshop installed for an upcoming marketing campaign. It has been approved by my manager.", categoryId: "cat-sw", priority: "low" },
  { type: "incident", title: "Office Wi-Fi extremely slow on floor 5", description: "Multiple people on floor 5 report the Wi-Fi is unusable since about 9am. Wired connections seem fine.", categoryId: "cat-net", priority: "high" },
  { type: "request", title: "VPN access for contractor", description: "Please grant time-limited VPN access to our external contractor for the next six weeks.", categoryId: "cat-vpn", priority: "high" },
  { type: "incident", title: "Printer on 3rd floor jammed and offline", description: "The large printer near the kitchen shows offline and has a paper jam we cannot clear.", categoryId: "cat-print", priority: "low" },
  { type: "request", title: "Reset password for locked account", description: "I entered my password wrong too many times and I'm now locked out. Please reset and unlock.", categoryId: "cat-pwd", priority: "medium" },
  { type: "request", title: "Onboard new HR coordinator", description: "New HR coordinator starts in two weeks. Needs full account, laptop, and HRIS access.", categoryId: "cat-onboard", priority: "medium" },
  { type: "incident", title: "Shared drive not accessible", description: "The Finance shared drive throws 'access denied' for the whole team since this morning.", categoryId: "cat-acc", priority: "high" },
  { type: "incident", title: "Laptop won't power on", description: "My laptop is completely dead — no lights, no charging indicator. I have an important demo tomorrow.", categoryId: "cat-hw", priority: "high" },
  { type: "request", title: "Second monitor for home office", description: "Requesting an additional monitor and a dock for my permanent home-working setup.", categoryId: "cat-hw", priority: "low" },
  { type: "incident", title: "CRM extremely slow for Sales", description: "The CRM is taking 20+ seconds to load records for the whole Sales team since the last release.", categoryId: "cat-sw", priority: "high" },
  { type: "request", title: "Access to the analytics dashboard", description: "Please grant me read access to the executive analytics dashboard for quarterly reporting.", categoryId: "cat-acc", priority: "medium" },
  { type: "incident", title: "Emails going to spam externally", description: "Clients report our emails land in their spam folder since yesterday. Possibly a DMARC issue.", categoryId: "cat-email", priority: "high" },
  { type: "request", title: "Set up company email on my phone", description: "I just got a new phone and need help configuring corporate email and the MDM profile.", categoryId: "cat-sw", priority: "low" },
  { type: "incident", title: "Meeting room display not detected", description: "The screen in the Aspen meeting room does not detect any laptop over the USB-C cable.", categoryId: "cat-hw", priority: "medium" },
  { type: "request", title: "New software license for design team", description: "The design team needs three additional Creative Cloud seats for new joiners.", categoryId: "cat-sw", priority: "medium" },
  { type: "incident", title: "MFA app not sending codes", description: "My authenticator app stopped receiving push notifications so I cannot sign in to anything.", categoryId: "cat-acc", priority: "critical" },
]

const NOTE_BODIES = [
  "Reached out to the requester for more detail on when this started.",
  "Reproduced the issue on a test account. Investigating the root cause.",
  "Escalated to the networking team for input.",
  "Confirmed this is related to the recent change window last night.",
  "Applied a temporary workaround; monitoring before closing.",
]
const REPLY_BODIES = [
  "Thanks for reaching out — we're looking into this now and will update you shortly.",
  "Could you confirm whether this happens on the office network as well?",
  "We've applied a fix on our side. Could you try again and let us know?",
  "This should now be resolved. Please reopen if you see it again.",
]

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]
}

function buildActivity(ticket: Omit<Ticket, "activity">, seedIndex: number): ActivityEntry[] {
  const created = new Date(ticket.createdAt).getTime()
  const entries: ActivityEntry[] = [
    {
      id: `${ticket.id}-a0`,
      kind: "system",
      actorId: ticket.requesterId,
      body: "Ticket created",
      createdAt: ticket.createdAt,
      field: "status",
      to: "new",
    },
  ]
  const steps = 2 + (seedIndex % 4)
  for (let s = 0; s < steps; s++) {
    const at = created + (s + 1) * (HOUR * (2 + (s % 5)))
    if (at > NOW) break
    const kind = s % 3 === 0 ? "note" : s % 3 === 1 ? "reply" : "system"
    if (kind === "note") {
      entries.push({ id: `${ticket.id}-a${s + 1}`, kind: "note", actorId: ticket.assigneeId ?? "ag-2", body: pick(NOTE_BODIES, seedIndex + s), createdAt: iso(at) })
    } else if (kind === "reply") {
      entries.push({ id: `${ticket.id}-a${s + 1}`, kind: "reply", actorId: ticket.assigneeId ?? "ag-2", body: pick(REPLY_BODIES, seedIndex + s), createdAt: iso(at) })
    } else {
      entries.push({ id: `${ticket.id}-a${s + 1}`, kind: "system", actorId: ticket.assigneeId ?? "ag-2", body: "Status changed", createdAt: iso(at), field: "status", from: "new", to: "in_progress" })
    }
  }
  if (ticket.resolution) {
    entries.push({
      id: `${ticket.id}-resolve`,
      kind: "system",
      actorId: ticket.assigneeId ?? "ag-2",
      body: `Resolved: ${ticket.resolution.note}`,
      createdAt: ticket.resolvedAt ?? ticket.updatedAt,
      field: "status",
      from: "in_progress",
      to: "resolved",
    })
  }
  return entries
}

const STATUS_PLAN: TicketStatus[] = [
  "new", "in_progress", "on_hold", "resolved", "closed",
  "in_progress", "new", "resolved", "in_progress", "on_hold",
  "closed", "in_progress", "resolved", "new", "in_progress",
  "resolved", "on_hold", "in_progress", "closed", "new",
]

function makeTicket(index: number): Ticket {
  const tpl = TICKET_TEMPLATES[index % TICKET_TEMPLATES.length]
  const status = STATUS_PLAN[index % STATUS_PLAN.length]
  const isSettled = status === "resolved" || status === "closed"
  // Ages chosen so some open tickets breach / are due soon.
  const ageHours = [2, 6, 30, 90, 200, 4, 1, 260, 10, 48, 300, 5, 120, 3, 8, 150, 40, 7, 280, 0.5][index % 20]
  const createdMs = NOW - ageHours * HOUR
  const createdAt = iso(createdMs)
  const priority = tpl.priority
  const targets = slaTargetsFor(priority, createdAt)
  const assigneeId = status === "new" && index % 3 === 0 ? null : AGENTS[(index % (AGENTS.length - 1)) + 1].id
  const requesterId = REQUESTERS[index % REQUESTERS.length].id
  const num = 1000 + index * 7
  const id = tpl.type === "incident" ? `INC-${num}` : `REQ-${num}`
  const resolvedAt = isSettled ? iso(createdMs + Math.max(ageHours * 0.6, 2) * HOUR) : null
  const updatedAt = isSettled ? (resolvedAt as string) : iso(createdMs + Math.min(ageHours, 12) * HOUR)

  const base: Omit<Ticket, "activity"> = {
    id,
    type: tpl.type,
    title: tpl.title,
    description: tpl.description,
    status,
    priority,
    categoryId: tpl.categoryId,
    requesterId,
    assigneeId,
    assetId: index % 4 === 0 ? ASSETS[index % ASSETS.length].id : null,
    catalogItemId: null,
    createdAt,
    updatedAt,
    resolvedAt,
    slaResponseDueAt: targets.slaResponseDueAt,
    slaResolutionDueAt: targets.slaResolutionDueAt,
    firstRespondedAt: status === "new" ? null : iso(createdMs + 0.5 * HOUR),
    onHoldMs: status === "on_hold" ? 3 * HOUR : 0,
    onHoldSince: status === "on_hold" ? iso(NOW - 1 * HOUR) : null,
    resolution: isSettled
      ? { note: "Applied the standard fix and confirmed with the requester that the issue is resolved.", kbArticleId: index % 2 === 0 ? "kb-1" : null }
      : null,
  }
  return { ...base, activity: buildActivity(base, index) }
}

export const TICKETS: Ticket[] = Array.from({ length: 40 }, (_, i) => makeTicket(i))
