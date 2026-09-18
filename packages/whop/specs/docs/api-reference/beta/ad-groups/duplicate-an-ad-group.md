> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Duplicate an Ad Group

> Creates copies of the ad group in `duplicating` status and returns them — into its own campaign, or into target_ad_campaign_id (which must belong to the same account and be compatible with the ad group's targeting and goals); each copy transitions to its final status (matching the source's active/paused state) once duplication completes. Poll each returned ad group until it leaves `duplicating` — a copy that could not be completed is deleted and returns 404.



## OpenAPI

<!-- OpenAPI source: `post /ad_groups/{id}/duplicate` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->