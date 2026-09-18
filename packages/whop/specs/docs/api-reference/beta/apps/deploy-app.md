> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy App

> Builds the app's current source and ships it. Returns the run it started, so the caller can render progress from this response and then follow it on the app's `deployment` field. Only one deployment runs per app at a time — calling this while one is in flight reports that run rather than starting a second, and calling it with nothing to publish reports that instead of starting one.



## OpenAPI

<!-- OpenAPI source: `post /apps/{id}/deploy` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->