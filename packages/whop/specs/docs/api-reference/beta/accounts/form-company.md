> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Form Company

> Starts an LLC or C-Corp formation for a business account. Defaults to an LLC; set `entity_type` to `c_corp` to form a C-Corp, which additionally requires `share_structure` and officer `roles` on every founder. On submission, the application is validated and the response returns a hosted checkout URL. Once paid, the filing is submitted. Track progress through the account's [`company_formation`](/api-reference/beta/accounts/retrieve-account) field on Retrieve Account.



## OpenAPI

<!-- OpenAPI source: `post /accounts/{id}/form_company` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->