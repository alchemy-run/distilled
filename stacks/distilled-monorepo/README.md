# stacks/distilled-monorepo

The [Alchemy](https://alchemy.run) stack that owns **this repository** —
`alchemy-run/distilled` — and the credentials its CI runs on.

This is the ["GitHub stack"](https://alchemy.run/environments/ci/#the-github-stack)
pattern: the one stack you deploy by hand, with an admin profile, so that
everything else can deploy itself. Concretely, it is what makes
[`stacks/distilled-submodules`](../distilled-submodules) deployable on every
commit to `main`.

## What it owns

**The repository.** Settings that are otherwise clicked into the GitHub UI and
forgotten — merge strategy, topics, homepage, which tabs are enabled — are
declared in `alchemy.run.ts` and converged on every deploy. `GitHub.Repository`
observes the live repository before creating anything, so the existing
repository is adopted rather than duplicated, and it defaults to `retain` on
removal: destroying this stack cannot delete the repository.

Every value in the resource mirrors what the repository is set to today, so the
first deploy is a no-op. From then on, change the setting **here**.

**The credentials.** Every Actions secret and variable that a workflow in
`.github/workflows` reads is declared here — the inventory is meant to be
complete, so a workflow that needs a new credential gets it from this file.
The Cloudflare token is minted as code: Cloudflare returns a freshly minted
token's value exactly once, and alchemy pipes it into `GitHub.Secret` without
it ever reaching a terminal or a CI log.

| name | kind | source | read by |
|---|---|---|---|
| `STACKS_CLOUDFLARE_API_TOKEN` | secret | minted here | submodules stack, website |
| `STACKS_CLOUDFLARE_ACCOUNT_ID` | secret | the deploying profile | submodules stack, website |
| `ALCHEMY_GITHUB_TOKEN` | secret | `DISTILLED_REPOS_PAT`, else the deploying profile | submodules stack |
| `ALCHEMY_VERSION_BOT_ID` | secret | public app id, default `3107227` | release, PR package, website |
| `ALCHEMY_VERSION_BOT_PRIVATE_KEY` | secret | `ALCHEMY_VERSION_BOT_PRIVATE_KEY` | release, PR package, website |
| `PR_PACKAGE_TOKEN` | secret | `PR_PACKAGE_TOKEN` | PR package |
| `NPM_TOKEN` | secret | `NPM_TOKEN` | release |
| `DISCORD_WEBHOOK_URL` | secret | `DISCORD_WEBHOOK_URL` | release |
| `DISTILLED_REPOS_OWNER` | variable | `DISTILLED_REPOS_OWNER`, default `distilled-mirror` | submodules stack |

The four sourced from the environment cannot be minted through any API, and
GitHub never hands an existing secret's value back, so a deploy needs the
originals in hand. One that is missing any of them stops before it touches
anything and names all of them at once. A value you no longer hold has to be
rotated at its source — the app's private key under Settings → Developer
settings → GitHub Apps, the npm tokens on npmjs.com, the webhook in Discord —
and passed in fresh.

### Why `STACKS_` and not `CLOUDFLARE_API_TOKEN`

`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` already exist on this
repository as long-lived, broadly-scoped credentials belonging to other
tooling, next to `CLOUDFLARE_EMAIL` and `CLOUDFLARE_ZONE_ID`. Writing those
names here would silently replace them with a token scoped to this
repository's CI.

### One token, one state store

`stacks/distilled-submodules` and `website` both run on this single token, and
that is the point: they share a Cloudflare account, so `Cloudflare.state()`
resolves to the same state-store worker for both. The token therefore carries
the website's needs as well — `Workers Scripts Write` covers its worker and
static assets, and a second policy grants `Zone Read`, `Workers Routes Write`
and `DNS Write` across the account's zones for the `distilled.cloud` and
`main.distilled.cloud` custom domains. No zone id is configured anywhere:
alchemy resolves the zone by name, which is what `Zone Read` is for.

### Why the token needs `Secrets Store Write`

`Cloudflare.state()` keeps the state-store worker's bearer token in the
account-wide Secrets Store. Reading it back means *binding* it to a short-lived
edge-preview worker, and binding is a write — so `Secrets Store Read` is not
enough. With `Read` alone the `edge-preview` call is rejected and every CI
deploy fails.

## Deploying

**Never from CI.** It mints credentials, so it needs privileges no CI run
should hold. Deploy it by hand with an admin profile, and only when rotating
credentials or changing repository settings:

```bash
cd stacks/distilled-monorepo
ALCHEMY_VERSION_BOT_PRIVATE_KEY="$(cat alchemy-version-bot.pem)" \
PR_PACKAGE_TOKEN=<npm automation token for PR previews> \
NPM_TOKEN=<npm publish token> \
DISCORD_WEBHOOK_URL=<#releases webhook> \
DISTILLED_REPOS_PAT=<org fine-grained PAT> \
  pnpm exec alchemy deploy --stage prod --profile <admin profile>
```

`DISTILLED_REPOS_PAT` is optional — without it the deploying profile's own
signed-in GitHub token is stored, which is correct when that profile was signed
in as the org. It is the one credential that cannot be minted through an API,
because GitHub has no endpoint for creating PATs.

The admin profile needs Cloudflare permission to *create API tokens* — the
Global API Key, or a token with `User > API Tokens > Write` and
`Account > API Tokens > Write`. A standard "Edit Cloudflare Workers" token
cannot mint other tokens. It also needs admin on `alchemy-run/distilled`, to
converge the repository settings.
