> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Account Preferences

> Updates the account's preferences. Each top-level key present in the body is replaced as a whole; omitted keys are left untouched. `ads_triple_whale_integration` takes the Data-In API key to connect with, or `null` to disconnect. `ads_payment_methods` always requires a `primary` entry. `backup` is optional and any pairing is allowed — two cards, `card`+`platform_balance`, or a single method — so a card-only advertiser can fund ads without a platform balance. The `primary` and `backup` must be different sources. A `platform_balance` entry may omit `id` to use the account's default Whop balance. Configuring a `card` requires a user token; account API keys can set up platform-balance billing only.



## OpenAPI

<!-- OpenAPI source: `patch /accounts/{account_id}/preferences` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->