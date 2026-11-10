# Group Video Editing: Feature Rating

## Verdict

**Concept rating: 8.4/10. Worth building as a focused MVP.**

The strongest idea is not a shared video editor: it is turning everyone's trip
photos, clips, and spoken memories into a shared story with very little work.

This is a product judgment, not a measured rating of the current implementation.
No usability study, rendering benchmark, or implementation audit supports these
scores yet. Good user experience and low time consumption are the primary
criteria, accounting for 65% of the weighted score.

## Weighted assessment

| Criterion | Weight | Concept score | Reason and condition |
| --- | --- | --- | --- |
| User experience | 35% | 9/10 | A guided upload-to-story flow is approachable if users do not need a timeline editor or mandatory voice recordings. |
| Time saved and speed | 30% | 8/10 | Automatic selection, captions, and templates can save editing effort; uploads, analysis, queues, and rendering still introduce waiting. |
| Storytelling value | 15% | 9/10 | Friends' own memories can make the result more personal than a slideshow, provided the story stays faithful to their contributions. |
| Collaboration | 10% | 8/10 | Shared contributions are useful, but requiring everyone to upload or approve before generation would create delays. |
| Delivery feasibility | 10% | 7/10 | Template-based rendering is practical; reliable media processing, permissions, retries, and predictable costs need careful engineering. |

Weighted score: `(9 x 0.35) + (8 x 0.30) + (9 x 0.15) + (8 x 0.10) + (7 x 0.10) = 8.4`.

## Recommended first experience

1. Create a trip project with only a title required.
2. Share an invite link; let friends contribute asynchronously.
3. Bulk-upload photos and clips. Offer optional voice prompts such as
   "What was your favorite moment?"
4. Choose Cinematic, Fun, or Nostalgic, with a default already selected.
5. Generate one 30-60-second vertical reel from currently available contributions.
6. Review a lightweight preview, request a simple change, and export.

The project owner controls the final export. Contributors control whether their
media may be used. Do not block a draft on absent friends; exclude unapproved media.
Keep projects private by default and distinguish an upload invitation from public
viewing access.

## UX and time-consumption requirements

- Mobile-friendly bulk upload, clear per-file progress, and recoverable failures.
- Save project progress automatically; returning users should not repeat setup.
- Show processing stages and allow users to leave and return while work continues.
- Explain upload limits and unsupported media before a long upload begins.
- Use a small set of good defaults instead of a long configuration form.
- Preview before full-quality rendering; do not require a paid export to review.
- Preserve successful uploads when another file fails; retry only failed work.
- New uploads should not silently change a draft already being reviewed.
- Let users correct names, captions, and story details before export.
- Keep original voices optional; do not invent memories or clone voices by default.

## Proposed acceptance targets

These are goals to validate, not speed guarantees. Agree on representative devices,
network conditions, and render infrastructure before treating them as commitments.

| Measure | Initial target |
| --- | --- |
| Create a project and reach the upload screen | At most 60 seconds for at least 90% of first-time test users. |
| Active effort to request a first draft | At most 3 minutes for at least 90% of test users, excluding upload and processing waits; record those waits separately. |
| First playable preview | p95 at most 2 minutes after required uploads finish, including queueing and analysis, for the benchmark below. |
| Final export | p95 at most 3 minutes from export request to downloadable file, including queueing, for the benchmark below. |
| Independent task completion | At least 90% of test users can create, contribute, preview, and export without assistance. |
| Failure recovery | A failed upload or render can be retried without losing successful contributions or project edits. |

Initial benchmark: 20 photos, five 10-second 1080p video clips, and two 30-second
voice notes producing a 30-second reel, with a 720p preview and 1080p final export.
Record media sizes/codecs, test device, network, worker resources, and concurrent
jobs with every benchmark run. Measure upload-inclusive time to first preview too;
fast rendering alone does not establish a fast user experience.

If these targets are missed, investigate the bottleneck and simplify the workflow
or processing before expanding scope. Never mask failures with fake progress or
success messages.

## Technical direction

- Use the Copilot SDK-powered agent to coordinate tools and produce a validated,
  structured edit plan, not arbitrary executable rendering code.
- Use suitable media-analysis tools for transcription and media understanding.
- Use predefined Remotion compositions for predictable previews and exports.
- Use backend storage, access controls, and queued processing for shared projects.
- Reuse analysis of unchanged media and avoid unnecessary full-quality renders.

## Project credit budget

Use the proposed [project credit model](GROUP_VIDEO_EDITING_CREDITS.md) when
building this feature. It describes a shared 100-credit example budget, action
pricing, a worked example, backend enforcement, and cost calibration.

Credit clarity is part of the UX rating: quote before spending, keep existing
preview playback free, avoid duplicate charges, and warn when edits would leave
too little for the final export. Rates are illustrative until validated against
real costs; credit limits must not conceal long waits or failed processing.

## Scope boundary

**Build first:** shared project, invitations, contributions, optional voice notes,
one reel format, three moods, preview, simple revisions, and owner-controlled export.

**Defer:** simultaneous timeline editing, long films, separate blog generation,
multiple output formats, advanced effects, and voice cloning. These can increase
complexity and waiting before the core experience is proven.

## What would change the rating?

The concept could earn a higher rating after users consistently finish quickly,
prefer the result to a basic slideshow, and need few revisions. Mandatory manual
editing, confusing permissions, repeated uploads, or long unexplained waits would
lower it substantially.

**Decision:** proceed with the small MVP, but judge success by measured user effort,
end-to-end waiting time, and story quality, not the number of generated outputs.
