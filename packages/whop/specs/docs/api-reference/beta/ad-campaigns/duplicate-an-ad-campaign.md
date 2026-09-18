> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Duplicate an Ad Campaign

> Creates copies of the campaign in `duplicating` status and returns them; each copy transitions to `draft` once duplication completes. Poll each returned campaign until it leaves `duplicating` — a copy that could not be completed is deleted and returns 404.



## OpenAPI

<!-- OpenAPI source: `post /ad_campaigns/{id}/duplicate` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->