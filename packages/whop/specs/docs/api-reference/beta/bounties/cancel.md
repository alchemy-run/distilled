> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel

> Cancels a bounty. With no in-flight work, it cancels immediately and refunds the funder. Otherwise it stops new submissions and cancels once the in-flight work resolves and pays out. Repeating the request is a no-op. A bounty that already paid out every slot returns `400`.



## OpenAPI

<!-- OpenAPI source: `post /bounties/{id}/cancel` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->