<!--
Read the External contributors rules before you open this PR:
https://github.com/alchemy-run/distilled/blob/main/AGENTS.md#external-contributors
Reviewers cite them by number.
-->

## What this changes

<!-- One change per PR (rule 10). -->

## The failing call

<!--
Rule 7: name the operation, the request and the real response.
Give evidence for each patch: a live response, the provider's docs, or its
official client. Delete this section if the change is not about an API call.
-->

Operation:

Request:

Response:

## Checklist

- [ ] One change, with no commits from another open PR (rule 10)
- [ ] A breaking change has `!` in the title, for example `fix(axiom)!: redact API tokens` (rule 11)
- [ ] A spec or patch change commits the `pnpm generate <pkg>` output and its `distilled.generatedAt` stamp (rule 12)
- [ ] `pnpm lint` passes, and any lint-disable comment has its reason in this body (rule 4)
- [ ] If this breaks a type alchemy-run/alchemy uses, the Alchemy PR is linked here (rule 13):
- [ ] "Allow edits by maintainers" is ticked (rule 14)
