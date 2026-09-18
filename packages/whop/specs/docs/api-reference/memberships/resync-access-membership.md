> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Resync access membership

> Re-run access fulfillment for a membership. Recomputes the member's content access on Whop, re-validates their Discord link (re-adding them to the server and re-assigning roles if needed), and re-fulfills TradingView indicator access. Telegram access is invite-based and cannot be resynced here. The outcome is written to the membership's logs.

Required permissions:
 - `membership:resync_access`
 - `member:email:read`
 - `member:basic:read`



## OpenAPI

<!-- OpenAPI source: `post /memberships/{id}/resync_access` in specs/api-v1-stable.json (inlined by docs.whop.com; stripped on download) -->