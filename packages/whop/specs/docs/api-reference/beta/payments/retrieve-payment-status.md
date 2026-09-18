> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve payment status

> Retrieves how far a payment has got and what the buyer must do next, if anything. A payment is collected in the background, so poll this rather than reading the create response. Accepts either a secret key or the payment's own `client_secret`, so the surface collecting the payment can poll it directly.



## OpenAPI

<!-- OpenAPI source: `get /payments/{payment_id}/status` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->