> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Identityprofile updated

> Sent whenever an identity profile changes state — a verification is approved, needs action, or is rejected, or a Whop review opens or clears. Every other identity_profile event is also delivered as an identity_profile.updated, so you can subscribe to this single event and re-fetch the verification to read its current status.

Required permissions:
 - `identity:read`
 - `webhook_receive:identity_profiles`



## OpenAPI

<!-- OpenAPI source: `webhook identity_profile.updated` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->