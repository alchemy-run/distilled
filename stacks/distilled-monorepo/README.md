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
| `NPM_TOKEN` | secret | `NPM_TOKEN` | release (dist-tags only) |
| `DISCORD_WEBHOOK_URL` | secret | `DISCORD_WEBHOOK_URL` | release |
| `DISTILLED_REPOS_OWNER` | variable | `DISTILLED_REPOS_OWNER`, default `distilled-mirror` | submodules stack |

The four sourced from the environment cannot be minted through any API, and
GitHub never hands an existing secret's value back, so the stack treats each as
optional: a value present in the environment is written, an absent one leaves
whatever the repository already holds and is listed under
`secretsLeftUnchanged` in the deploy's output. Those four resources are also
`retain`-on-removal, so skipping one deletes nothing. Deploying with none of
them set is therefore safe, and still converges the repository, the Cloudflare
token, the app id and the variable.

A value you no longer hold has to be rotated at its source — the app's private
key under Settings → Developer settings → GitHub Apps, the npm token on
npmjs.com, the webhook in Discord — and passed in fresh.

### What the two publish tokens actually do

Neither is an npm publishing credential.

`NPM_TOKEN` moves dist-tags. Publishing is npm trusted publishing:
`release.yml` grants `id-token: write`, and `scripts/release/publish.sh` runs
`pnpm publish` with no credential at all. OIDC does not cover `pnpm dist-tag
add`, so the token is read only by that path — a `--force-latest` run without
it still publishes, then warns that the tag has to be moved by hand.

`PR_PACKAGE_TOKEN` is the bearer token the `alchemy-run/actions` `pr-package`
action uploads preview tarballs to **pkg.ing** with — not npm, and not
available over OIDC either, since `pr-package.yml` grants no `id-token: write`.

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
DISCORD_WEBHOOK_URL=<#releases webhook> \
NPM_TOKEN=<npm token, dist-tag moves only> \
PR_PACKAGE_TOKEN=<pkg.ing upload token> \
ALCHEMY_VERSION_BOT_PRIVATE_KEY="$(cat alchemy-version-bot.pem)" \
DISTILLED_REPOS_PAT=<org fine-grained PAT> \
  pnpm exec alchemy deploy --stage prod --profile <admin profile>
```

Every line above is optional, so a bare deploy is safe and is enough to fix a
missing `ALCHEMY_VERSION_BOT_ID` — that one is a public app id with a default
in `alchemy.run.ts`, not something you supply. Without it the `Generate bot
token` step of `release.yml`, `pr-package.yml` and `website.yml` fails with
*the 'client-id' (or deprecated 'app-id') input must be set to a non-empty
string*.

### Where the values go

Either exported in the shell, as above, or written to a **gitignored `.env` in
this directory**, which the alchemy CLI loads by default when the command runs
here (`--env-file <path>` selects another file). The process environment wins
over `.env` unless `--env-file` is given, in which case the file wins.

```bash
# stacks/distilled-monorepo/.env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/…
NPM_TOKEN=npm_…
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
