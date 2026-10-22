# Group Hub — Permission Model

Defines who can create/post vs. respond for each Group Hub feature.

| Feature | Who can create/post | Who can respond |
|---|---|---|
| **Announcement** | Admin only | Members can react, but not post their own announcement |
| **Poll** | Admin only (creates options) | All members can vote |
| **User Opinion** | Anyone (admin or member) | Anyone can comment/reply — this is the open channel |
| **Medical Support** | N/A — not a "post" type at all | Everyone has access always, no admin gate |

## Notes

| Feature | Create gate | Respond gate | Part of post/feed system? |
|---|---|---|---|
| **Announcement** | `role === "admin" \| "co_admin"` | Open to all members (react only) | Yes |
| **Poll** | `role === "admin" \| "co_admin"` | Open to all members (vote only) | Yes |
| **User Opinion** | No gate — any member | No gate — any member | Yes |
| **Medical Support** | Not applicable | No gate — always available | No |
| **Check-in** | Not applicable | No gate — always available | No |

```ts
// Example gating logic (PostComposer)
const canCreate = (type: "announcement" | "poll" | "opinion", role: Role) => {
  if (type === "opinion") return true;
  return role === "admin" || role === "co_admin";
};
```
