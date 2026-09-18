> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve ad report

> Performance report for a company, ad campaigns, ad groups, or ads. Always returns aggregate `summary` totals summed across the scope. Set `granularity` to additionally get a time series, or set `breakdown` (`campaign`/`ad_group`/`ad`) to additionally get per-entity rows inside the requested scope. Exactly one of `companyId`, `adCampaignIds`, `adGroupIds`, or `adIds` must be provided.

Required permissions:
 - `ad_campaign:stats:read`



## OpenAPI

<!-- OpenAPI source: `get /ad_reports` in specs/api-v1-stable.json (inlined by docs.whop.com; stripped on download) -->