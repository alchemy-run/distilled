> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Bounty Submission

> Creates a submission on a workforce bounty. Include a `deliverable` payload — any combination of links and uploaded files, with at least one of the two — and the submission goes straight to review; create is the only step. For `data_capture` bounties, omit the deliverable: this starts a claimed attempt whose proof accumulates server-side, and the separate submit endpoint sends it to review once complete. Requires a user credential — account API keys cannot author submissions.



## OpenAPI

<!-- OpenAPI source: `post /bounty_submissions` in specs/api-v1-native.json (inlined by docs.whop.com; stripped on download) -->