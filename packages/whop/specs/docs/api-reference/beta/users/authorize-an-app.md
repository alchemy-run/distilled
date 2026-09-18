> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authorize an App

> Completes the OAuth authorization step for the authenticated user: records their consent for the scopes an app asked for and mints the authorization code to hand back to it. Returns the grant, plus a `redirect_url` carrying that code — the one and only time it is returned. Exchange the code at `POST /oauth/token` with the verifier for `code_challenge`. Requires a user session, because consent has to come from the account holder: an API key or an OAuth token is refused, so an app can never authorize itself. Send an `Idempotency-Key` to make a retry safe — a replay returns the original `redirect_url` and its code rather than issuing a second one.



## OpenAPI

<!-- OpenAPI source: `post /users/me/oauth_grants` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->