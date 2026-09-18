> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel Payout

> Cancels a payout that is still in review and returns the funds, fees included, to the balance. A payout can be canceled while its status is `in_review`. A `requested` payout is still being prepared (its funds may be converting) and answers 409 until it reaches review; from `processing` on, the money is on its way and the answer is 409 with error type `not_cancelable`. Canceling a payout that is already canceled succeeds and returns it unchanged.



## OpenAPI

<!-- OpenAPI source: `post /payouts/{id}/cancel` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->