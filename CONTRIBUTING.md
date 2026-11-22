# Contributing to distilled

The rules and the setup live in [AGENTS.md](./AGENTS.md). People and coding
agents read the same file, so this page only points into it.

## Before you open a pull request

Read the numbered rules in
[External contributors](./AGENTS.md#external-contributors). Reviewers cite them
by number. The ones that most often send a pull request back:

- A wrong or missing type, error, nullable field or secret in an SDK is a
  patch in `packages/<provider>/patches/`, followed by
  `pnpm generate <provider>`. Do not edit `packages/*/src/services/` by hand.
- Shipped SDK code fails only with typed Effect errors. Run `pnpm lint`
  before you push.
- The pull request body names the operation, the request and the real
  response that show the bug.
- One change per pull request. A breaking change has `!` in its
  conventional-commit title, for example `fix(axiom)!: redact API tokens`.
- Keep "Allow edits by maintainers" ticked.
- If a coding agent writes your pull request body, a review or a comment, it
  ends that text with the signed note in
  [rule 17](./AGENTS.md#external-contributors), word for word apart from the
  username, model and harness.

## Set up the repo

```bash
git clone --depth=1 https://github.com/alchemy-run/distilled.git
cd distilled
pnpm install
pnpm typecheck
```

You need Node 24 and pnpm (the version in `packageManager`). Do not clone with
`--recursive`. You need the spec submodules only to regenerate an SDK.
[Getting the repo](./AGENTS.md#getting-the-repo) and
[Everyday commands](./AGENTS.md#everyday-commands) have the details.

## Guides for common changes

| Change | Guide |
|---|---|
| Fix a spec with a patch | [`distilled-sdk-patch`](./.agents/skills/distilled-sdk-patch/SKILL.md) |
| Move an SDK to its latest spec | [`distilled-sdk-update`](./.agents/skills/distilled-sdk-update/SKILL.md) |
| Add a provider | [`distilled-sdk`](./.agents/skills/distilled-sdk/SKILL.md) |

To ask for a new provider without writing it, open an
[SDK request](https://github.com/alchemy-run/distilled/issues/new?template=sdk-request.yml).

## Security

Do not report a vulnerability in a public issue. Follow
[SECURITY.md](./SECURITY.md).
