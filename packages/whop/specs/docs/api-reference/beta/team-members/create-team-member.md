> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Team Member

> Adds a member to an account's team with a system role. Identify them by exactly one of `user_id` or `email`. If the person has not yet accepted — or the email does not belong to a Whop account yet — an invitation is sent instead and the response is `202` with `{ "object": "team_member_invite", "invitation_sent": true }`. If they already have a pending invite, the request fails with a `400`. Custom roles cannot be granted via the API. Granting the `workforce` role is also allowed with the `bounty:create` scope.



## OpenAPI

<!-- OpenAPI source: `post /team_members` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->