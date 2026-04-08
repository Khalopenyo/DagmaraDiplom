# Architecture Research

**Domain:** Frontend-only desktop SPA for cross-border CBDC transfer demonstration
**Researched:** 2026-04-08
**Confidence:** HIGH

## Recommended Architecture

Use a route-based client-only SPA with one shared demo state, feature modules per screen, and a very small domain layer for pure calculations and transaction simulation. For this MVP, the architecture should optimize for live-demo clarity, not enterprise flexibility: one app shell, one reducer-backed store, JSON seed data, and pure selectors that derive quotes, balances, tracker steps, and receipts.

The key architectural decision is that the transfer form is the only writable source of truth for a draft transfer. Dashboard, rates, converter, tracker, and receipt should all read from the same state tree or from derived selectors. Do not let each widget keep its own copy of amount, rate, or status data.

Routing should separate presentation concerns cleanly:
- `/dashboard` for account overview, quick actions, and recent activity
- `/rates` for reference rates and pair exploration
- `/transfer` for the editable draft workflow
- `/tracker/:transactionId` for simulated central-bank routing and status timeline
- `/receipt/:transactionId` for the immutable result snapshot

### System Overview

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Presentation Layer                                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ AppShell                                                                     │
│  ├── SidebarNav                                                              │
│  ├── HeaderBar                                                               │
│  └── Route Content                                                           │
│      ├── DashboardPage                                                       │
│      ├── RatesPage                                                           │
│      ├── TransferPage                                                        │
│      ├── TrackerPage                                                         │
│      └── ReceiptPage                                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Feature Layer                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ Balance widgets | Rates table | Converter card | Transfer form              │
│ Tracker timeline | Receipt card | Notification center                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ Domain Layer                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ Quote selectors | Draft validation | Transfer simulator | Receipt builder    │
├──────────────────────────────────────────────────────────────────────────────┤
│ State + Data Layer                                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ DemoStateProvider + reducer | typed actions | local JSON seed data           │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With | Typical Implementation |
|-----------|----------------|-------------------|------------------------|
| `AppShell` | Own desktop layout only: sidebar, header, max-width content area, route outlet | Router, shared UI | Layout route with `Outlet` |
| `DemoStateProvider` | Own global demo state and typed actions | All route modules | `useReducer` + separate state/dispatch contexts |
| `DashboardPage` | Read-only overview of account, quick actions, recent transfers | Selectors, router navigation | Route component composed from widgets |
| `RatesPage` | Show reference FX/CBDC rates and let user inspect supported pairs | Rates selectors, transfer draft actions | Route component plus filters/table |
| `ConverterCard` | Show derived receive amount, rate, and fee summary for current draft | Transfer draft selector | Pure presentational component |
| `TransferForm` | Own writable transfer draft inputs: source account, recipient, send amount, method | Dispatch actions, validation, quote selector | Controlled form hooked to store |
| `TrackerPage` | Read active transaction timeline and surface step-by-step status | Transaction selector, simulator side effects, notifications | Route component with timeline/status cards |
| `ReceiptPage` | Render immutable completed transaction snapshot | Receipt selector, dashboard history | Read-only route component |
| `NotificationCenter` | Surface toast or inline alerts for submit, step completion, final receipt | Notification queue in state | Shared overlay/widget |
| `TransferSimulator` | Advance mock transaction through predefined steps and completion times | Dispatch only | Pure service or hook using `setTimeout` |
| `MockRepository` | Load seed balances, rates, recipients, tracker steps, and notification text | Initial state factory | Static JSON imports with TypeScript types |

## Recommended Project Structure

```text
src/
├── app/                       # Bootstrap, router, providers, shell layout
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── SidebarNav.tsx
│   │   └── HeaderBar.tsx
│   ├── providers/
│   │   └── DemoStateProvider.tsx
│   ├── router/
│   │   └── index.tsx
│   └── App.tsx
├── data/                      # Mock JSON used as the demo source of truth
│   ├── accounts.json
│   ├── balances.json
│   ├── rates.json
│   ├── recipients.json
│   ├── tracker-steps.json
│   ├── notifications.json
│   └── receipts.json
├── state/                     # Shared app state contract
│   ├── types.ts
│   ├── initial-state.ts
│   ├── demo-actions.ts
│   ├── demo-reducer.ts
│   └── demo-selectors.ts
├── modules/                   # Route-owned feature slices
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   └── components/
│   ├── rates/
│   │   ├── RatesPage.tsx
│   │   └── components/
│   ├── transfer/
│   │   ├── TransferPage.tsx
│   │   ├── components/
│   │   └── model/
│   ├── tracker/
│   │   ├── TrackerPage.tsx
│   │   └── components/
│   └── receipt/
│       ├── ReceiptPage.tsx
│       └── components/
├── domain/                    # Pure business logic, no JSX
│   ├── quote/
│   │   └── select-quote.ts
│   ├── validation/
│   │   └── validate-transfer.ts
│   ├── simulation/
│   │   └── run-transfer-simulation.ts
│   └── receipt/
│       └── build-receipt.ts
└── shared/
    ├── ui/                    # Buttons, cards, badges, form controls
    ├── lib/                   # Formatters, ids, date helpers
    └── types/                 # Reusable domain types
```

### Structure Rationale

- **`app/`:** Keeps shell, routing, and providers out of feature code. This makes route modules easier to reason about in isolation.
- **`data/`:** Makes the demo script inspectable and editable by hand. For a live defense, changing JSON is faster and safer than changing reducers.
- **`state/`:** Centralizes the source of truth for transfer draft, active transactions, receipts, and notifications.
- **`modules/`:** Keeps each demo screen self-contained without forcing a heavy enterprise folder strategy.
- **`domain/`:** Prevents business rules from leaking into JSX. Quote math, validation, simulation, and receipt creation stay testable and readable.
- **`shared/`:** Limits reuse to actual primitives. Avoid building a huge generic component library for this MVP.

## Suggested Build Order

1. **App shell + routing + seed state**
   - Build `AppShell`, desktop layout, router, typed mock data, and `DemoStateProvider` first.
   - Everything else depends on this contract.

2. **Read-only dashboard + rates**
   - Build `DashboardPage` and `RatesPage` as selector-driven views over seed data.
   - This validates layout, typography, cards, tables, and formatting before form logic exists.

3. **Transfer draft + converter**
   - Add `TransferForm`, `ConverterCard`, validation, and draft actions.
   - This is the first writable workflow and establishes the single source of truth for amounts and pair selection.

4. **Simulation engine + tracker**
   - Add submit flow, transaction creation, step scheduler, tracker timeline, and notifications.
   - Tracker depends on the transfer draft already being stable.

5. **Receipt + recent activity loop**
   - Freeze completed transaction data into a receipt model, then surface it in `ReceiptPage` and back on `DashboardPage`.
   - This closes the demo story and makes the dashboard feel connected to the workflow.

**Build-order implication:** Dashboard and rates can be implemented with static selectors first, but tracker and receipt should not be built before the draft-transfer contract exists. Otherwise the project will invent fake structures twice and then rewrite them.

## Architectural Patterns

### Pattern 1: Single Source of Truth for Transfer Draft

**What:** Keep only the editable transfer inputs in state. Derive quote, receive amount, fees, and rate summary from selectors.
**When to use:** Any time the same numbers appear in the transfer form, converter, tracker summary, and receipt.
**Trade-offs:** Prevents contradictory UI, but requires discipline: display components must not start storing their own copies of derived values.

**Example:**
```typescript
export function selectQuote(state: DemoState) {
  const pair = `${state.transferDraft.fromCurrency}:${state.transferDraft.toCurrency}`;
  const rate = state.rates.byPair[pair];
  const sendAmount = Number(state.transferDraft.sendAmount || 0);

  return {
    pair,
    rateValue: rate.value,
    receiveAmount: round(sendAmount * rate.value),
    updatedAt: rate.updatedAt,
  };
}
```

### Pattern 2: Reducer + Context for Cross-Screen Workflow State

**What:** Keep demo-wide workflow state in one reducer and expose it through state and dispatch contexts. Keep purely local UI details, like table sorting or dialog visibility, inside each component.
**When to use:** This transfer flow spans multiple routes and needs stable shared data, but it is still small enough that a separate state library would add noise.
**Trade-offs:** Much simpler than Redux or XState for a student MVP, but less suitable once real async orchestration and multiple data sources arrive.

**Example:**
```typescript
const DemoStateContext = createContext<DemoState | null>(null);
const DemoDispatchContext = createContext<Dispatch<DemoAction> | null>(null);

export function DemoStateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    demoReducer,
    undefined,
    createInitialState,
  );

  return (
    <DemoStateContext value={state}>
      <DemoDispatchContext value={dispatch}>
        {children}
      </DemoDispatchContext>
    </DemoStateContext>
  );
}
```

### Pattern 3: Centralized Simulation Service

**What:** All fake async status transitions live in one simulator function or hook. Pages dispatch one submit action; the simulator owns timed step progression and completion.
**When to use:** The tracker must feel alive during a demo, but there is no backend and no streaming API.
**Trade-offs:** Keeps async behavior predictable and easy to demo, but it is intentionally fake and should be easy to replace later.

**Example:**
```typescript
export function runTransferSimulation(
  transactionId: string,
  dispatch: DemoDispatch,
  steps: SimulatedStep[],
) {
  let elapsed = 0;

  for (const step of steps) {
    elapsed += step.delayMs;

    window.setTimeout(() => {
      dispatch({
        type: "transaction/stepAdvanced",
        transactionId,
        stepId: step.id,
      });
    }, elapsed);
  }
}
```

## Data Flow

### Application Flow

```text
[Local JSON seeds]
    ↓ bootstrapped once
[createInitialState()]
    ↓
[DemoStateProvider]
    ↓ selectors
[Dashboard] [Rates] [Transfer] [Tracker] [Receipt]
    ↓ dispatch actions
[demoReducer]
    ↓
[Updated state]
```

### State Management

```text
[DemoState]
    ↓ useDemoSelector
[Pages and feature components]
    ↓ useDemoDispatch
[Typed actions]
    ↓
[demoReducer + pure domain helpers]
    ↓
[DemoState]
```

### Key Data Flows

1. **Dashboard -> Transfer draft**
   - `DashboardPage` reads seeded balances and recent receipts through selectors.
   - Clicking "New transfer" dispatches `draft/reset` with the selected account and default currency pair, then navigates to `/transfer`.
   - The dashboard does not own transfer logic; it only seeds the next screen.

2. **Rates -> Converter**
   - `RatesPage` reads rate rows from state and can dispatch `draft/pairSelected`.
   - `ConverterCard` reads the currently selected pair and the current send amount from selectors.
   - Rates data is read-only; choosing a pair updates the transfer draft, not the rates dataset.

3. **Transfer form -> Converter**
   - `TransferForm` is the only component allowed to mutate draft fields like sender account, recipient, send amount, and transfer method.
   - `ConverterCard` derives receive amount and rate summary from the draft plus rates.
   - For this MVP, keep only the send amount editable. The receive amount should be derived and read-only to avoid contradictory state.

4. **Transfer form -> Tracker**
   - On submit, the app validates the draft and clones it into a new `transaction` object with an id, timestamp, initial step, and quoted values.
   - `runTransferSimulation()` schedules mock status changes such as validation, FX synchronization, destination credit, and completion.
   - The router navigates to `/tracker/:transactionId`, where `TrackerPage` reads the active transaction by id.

5. **Tracker -> Receipt**
   - As steps advance, `TrackerPage` re-renders from state and `NotificationCenter` surfaces user-facing updates.
   - On the final step, the app dispatches `transaction/completed` and builds an immutable receipt snapshot.
   - `ReceiptPage` reads only the frozen receipt model, never the mutable draft.

6. **Receipt -> Dashboard**
   - Completed receipts are added to recent activity in state.
   - Returning to `DashboardPage` shows the new receipt in recent transactions, which closes the demo loop and makes the SPA feel coherent.

### Recommended Transfer Timeline Model

For the MVP, simulate a small number of domain-credible steps rather than dozens of technical micro-events:

1. `draft_submitted`
2. `payer_bank_validated`
3. `fx_quote_locked`
4. `central_bank_settlement_sync`
5. `recipient_bank_credited`
6. `receipt_issued`

This is a UI-facing simplification, but it matches recent BIS work that emphasizes off-platform compliance, synchronized FX settlement, and clearer cross-jurisdiction handoff rather than long correspondent-bank chains.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Demo / defense session | In-memory reducer state and static JSON are enough. |
| Portfolio deployment | Optionally persist latest transfer and receipt history to `localStorage` so refresh does not reset the narrative. |
| Real pilot / multi-user product | Replace JSON loader with APIs, replace simulator with server events, add auth, audit logs, and a real transaction backend. Keep the same UI/module boundaries. |

### Scaling Priorities

1. **First bottleneck:** Refresh resets the demo state. Fix with optional `localStorage` hydration if needed for presentations.
2. **Second bottleneck:** Fake async logic becomes hard to evolve once there are multiple transfer scenarios. Fix by keeping simulator logic isolated behind one module from day one.

## Anti-Patterns

### Anti-Pattern 1: Duplicating Amounts Across Form, Converter, and Receipt

**What people do:** Store `sendAmount`, `receiveAmount`, `rate`, and `fee` separately in multiple components.
**Why it's wrong:** The UI drifts into impossible states where the converter shows one number, the tracker summary shows another, and the receipt freezes a third.
**Do this instead:** Store only draft inputs and derive the rest through selectors or receipt builders.

### Anti-Pattern 2: Putting Business Logic in Route Components

**What people do:** Build quote math, validation, and simulated status logic directly inside page components with `useEffect`.
**Why it's wrong:** Routes become hard to read, effects start fighting each other, and derived values are recomputed through cascading renders.
**Do this instead:** Keep route components mostly declarative and move quote, validation, and simulation logic into `domain/` modules.

### Anti-Pattern 3: Overengineering the State Layer

**What people do:** Introduce Redux Toolkit, XState, multiple stores, or backend-like service layers before the first stable demo exists.
**Why it's wrong:** The project becomes harder to explain and slower to finish, while the MVP still has only one user, one scenario, and local JSON data.
**Do this instead:** Use one reducer-backed provider, then upgrade only if real external integrations arrive later.

## Integration Points

### Runtime Dependencies

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Mock data repository | Static JSON import during app bootstrap | Current source of truth for balances, rates, recipients, steps, and copy |
| Browser timer | `setTimeout` in simulation module | Only async dependency needed for tracker animation |
| `localStorage` (optional) | Hydrate and persist selected slices | Useful for demo resilience, but not required for MVP |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `DashboardPage` <-> `state/selectors` | Read-only selector access | Dashboard should not edit transactions directly |
| `RatesPage` <-> `TransferForm` | Typed action: `draft/pairSelected` | Rates page can prefill the transfer flow without owning transfer state |
| `TransferForm` <-> `ConverterCard` | Shared draft selector | Converter is derived output, not an editor |
| `Transfer submit` <-> `TransferSimulator` | Service call with transaction id and steps | Side effects stay outside JSX |
| `TrackerPage` <-> `ReceiptPage` | Route param + immutable receipt id | Receipt must read completed snapshot, not live draft |

## Sources

- React docs, "Choosing the State Structure" (HIGH): https://react.dev/learn/choosing-the-state-structure
- React docs, "Sharing State Between Components" (HIGH): https://react.dev/learn/sharing-state-between-components
- React docs, "Scaling Up with Reducer and Context" (HIGH): https://react.dev/learn/scaling-up-with-reducer-and-context
- React docs, "You Might Not Need an Effect" (HIGH): https://react.dev/learn/you-might-not-need-an-effect
- React Router docs, "Routing" (HIGH): https://reactrouter.com/start/framework/routing
- BIS Innovation Hub, "Project mBridge Update" (HIGH): https://www.bis.org/innovation_hub/projects/mbridge_brochure_2311.pdf
- BIS press release, "Project Meridian FX" (HIGH): https://www.bis.org/press/p250424.htm

---
*Architecture research for: frontend-only desktop SPA for CBDC transfer demonstration*
*Researched: 2026-04-08*
