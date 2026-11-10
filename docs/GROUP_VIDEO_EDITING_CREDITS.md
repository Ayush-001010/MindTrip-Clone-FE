# Group Video Editing: Project Credits

## Status and recommendation

Proposed product rules for implementation, not an existing billing system or
verified provider pricing. Use **100 shared credits per project** as the initial
example budget. Validate the rates below against actual processing costs and user
tests before launch; 100 credits is not a promise of unlimited media or edits.

The goal is a good result with little effort and short waits, not encouraging
users to spend more credits. Show a simple price for each action rather than
exposing tokens or charging for every chat message.

## How the shared limit works

- All members share the project's balance; inviting a friend does not add credits.
- Only the owner can authorize credit-consuming jobs in the MVP. Friends can
  upload, comment, and suggest changes without accidentally spending the budget.
- Creating a project, inviting friends, uploading within published limits,
  organizing media, commenting, manual text edits, and replaying or downloading
  existing results consume no processing credits.
- Uploading does not automatically start paid analysis. Show the quote first.
- At zero available credits, keep existing media, previews, and exports accessible
  under the published retention policy. Block new paid jobs, not access to work.
- No automatic top-ups or spending beyond the project limit. Top-ups are outside
  the initial MVP unless explicitly added later.
- Publish file-size, duration, storage, and retention limits separately. Free
  uploads do not mean unlimited storage.

## Illustrative rate card

All rates are proposed, fixed user-facing prices for bounded actions. Media
analysis includes the applicable transcription or visual-understanding work;
do not charge audio twice when it is already included in video analysis.

| Action | Proposed credits | Billing unit |
| --- | ---: | --- |
| Analyze photos | 1 | Each started batch of 10 new photos in one request. |
| Analyze video, including its audio | 4 | Each started minute of total new video duration in one request. |
| Transcribe separate voice notes | 2 | Each started minute of total new voice-note duration in one request. |
| Generate a story/edit plan | 10 | One draft using analyzed media, targeting at most 60 seconds of output. |
| AI story revision | 5 | One confirmed, grouped revision request for that draft. |
| Render a 720p preview | 5 | Each started 30 seconds of output for one new composition version. |
| Render a 1080p final export | 20 | Each started 30 seconds of output for one new composition version. |

Use the sum of durations within the request before rounding, not a separate
round-up for every short clip. Only selected, authorized media enters a quote.
Unchanged media with a valid project analysis cache is excluded from new analysis.
A new upload is not automatically a new story or render.

For these rates:

```text
analysis = ceil(new_photos / 10)
         + 4 * ceil(new_video_seconds / 60)
         + 2 * ceil(new_voice_note_seconds / 60)

preview = 5 * ceil(output_seconds / 30)
export  = 20 * ceil(output_seconds / 30)

job_quote = sum of requested actions that are not already reusable
available = allocated - consumed - reserved
```

Zero media in a category costs zero. Reject invalid or unsupported durations
before quoting. Reopening an existing preview, redownloading an export, and
reusing an identical valid render cost zero. Manually changing a caption is free,
but rendering a new version can cost credits; state that distinction clearly.

Blog generation and additional output formats are deferred and are not included
in this rate card. Price them explicitly before enabling them.

## Worked example: a 100-credit project

Trip inputs: 20 photos, five 10-second video clips, and two 30-second voice notes.
Output: one 30-second reel.

| Work | Calculation | Credits |
| --- | --- | ---: |
| Analyze photos | ceil(20 / 10) | 2 |
| Analyze video | 4 x ceil(50 / 60) | 4 |
| Transcribe voice notes | 2 x ceil(60 / 60) | 2 |
| Generate first story | 1 x 10 | 10 |
| First preview | 5 x ceil(30 / 30) | 5 |
| Two grouped AI revisions | 2 x 5 | 10 |
| One preview after both revisions | 5 x ceil(30 / 30) | 5 |
| Final 1080p export | 20 x ceil(30 / 30) | 20 |
| **Total consumed** | | **58** |
| **Remaining** | 100 - 58 | **42** |

The first playable preview costs 23 credits in this example. The revision quote
must say whether a new preview is included; the example renders only once after
both revisions. A 60-second export costs 40 credits, not 20.

## Keep the credit experience fast and clear

- Show "100 total / 58 used / 0 reserved / 42 available" with a short activity log.
- Quote the whole requested workflow once, with an itemized breakdown available.
  Example: "Analyze media, create story, and preview: 23 credits."
- Show the balance after the action and the expected final-export cost before
  confirmation. Warn when spending would leave too little for that export.
- Keep review playback free and bundle requested changes before rendering again.
- An AI conversation is not permission to spend: require explicit confirmation
  for its quoted actions. Never hide a render or analysis charge inside a reply.
- After input, duration, quality, or rate changes, issue a new quote and require
  confirmation; never silently increase a previously accepted charge.
- When funds are insufficient, offer a shorter output or fewer new inputs.
  Do not lower quality or remove memories without approval.

## Backend enforcement requirements

Credits must be enforced by the backend, not a frontend counter or agent prompt.

1. Validate membership, owner authorization, selected inputs, output limits, and
   the applicable rate version. Calculate an itemized quote on the server.
2. On confirmation, atomically reserve the quoted credits only if enough are
   available. Record a unique job/idempotency key before enqueueing work.
3. Keep `consumed + reserved <= allocated` even when requests arrive together.
   The same confirmed request, queue retry, or completion callback must not create
   a second reservation or charge.
4. Settle each quoted action once its valid result is durably saved and accessible.
   Convert that action's reservation to consumption and release unused amounts.
   For partial failure, charge only successful reusable actions, identify them to
   the user, and release failed or unstarted actions' reservations.
5. Do not charge for failed actions or infrastructure retries. Retrying failed
   rendering must reuse successful analysis rather than charging for it again.
   Cancellation releases unstarted work; already completed reusable actions remain
   charged. Disclose that policy before confirmation.
6. Store an auditable ledger with project, actor, job, action, quote/rate version,
   units, reserved/settled/released amounts, timestamps, and result references.
   Recover stranded reservations by checking job state, not by blindly expiring
   reservations while workers might still be running.

## How to calculate sustainable real rates

The example credits are not provider currency. Copilot SDK usage does not imply
free inference, and Remotion is not a universal per-render pricing service.
Verify applicable provider billing and licensing for the chosen deployment.

Measure each action's expected cost:

```text
action_cost = model input/output cost
            + media-analysis/transcription cost
            + render compute cost
            + allocated storage and delivery cost
            + expected retry overhead

net_budget_per_credit = net_project_revenue * (1 - target_gross_margin) / 100
cost_based_credits = ceil(action_cost / net_budget_per_credit)
```

Net project revenue means revenue after relevant payment fees, discounts, and
tax treatment. These formulas require positive net revenue and a margin below
100%. For a free project, use an explicitly funded subsidy budget per credit
instead; credits alone do not pay infrastructure bills.

Use measured costs to calibrate a simple fixed rate card with safety headroom,
not unpredictable post-job token invoices. Account for uncharged uploads, retries,
free interactions, and idle storage in the overall project economics. Bound input
size, model context, execution time, and tool calls per action so a fixed user
price does not create unlimited backend costs.

Pin rates to the accepted quote. If execution hits its internal budget, stop
safely, explain the failure, and release the unsuccessful action's reservation;
never overcharge or return an incomplete result as a success.

## Acceptance checks before launch

- Confirm the worked example totals 58 credits and leaves 42.
- Verify 0/1/10/11-photo and 0/1/60/61-second analysis boundaries; verify
  30/31/60-second render boundaries.
- Test insufficient funds, a balance exactly equal to a quote, concurrent jobs,
  duplicate confirmations/callbacks, unauthorized spending, and changed quotes.
- Test partial failures, cancellation, worker crashes, reservation recovery, and
  successful-result reuse without duplicate charges.
- Verify the owner sees the quote, export warning, balance changes, and actionable
  errors; contributors cannot bypass authorization with direct API calls.
- Benchmark time to first preview and active user effort alongside costs. A
  cheaper credit model that makes the experience slow or confusing is not success.
