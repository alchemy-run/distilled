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

**The credentials.** A Cloudflare API token is minted as code and written
straight into this repo's Actions secrets. Cloudflare returns a freshly minted
token's value exactly once; alchemy captures it and pipes it into
`GitHub.Secret` without it ever reaching a terminal or a CI log.

| name | kind | source |
|---|---|---|
| `STACKS_CLOUDFLARE_API_TOKEN` | secret | minted here, scoped to the state store |
| `STACKS_CLOUDFLARE_ACCOUNT_ID` | secret | resolved from the deploying profile |
| `ALCHEMY_GITHUB_TOKEN` | secret | the `distilled-mirror` org PAT |
| `DISTILLED_REPOS_OWNER` | variable | which org the mirrors live in |

### Why `STACKS_` and not `CLOUDFLARE_API_TOKEN`

`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` already exist on this
repository as long-lived, broadly-scoped credentials belonging to other
tooling, next to `CLOUDFLARE_EMAIL`, `CLOUDFLARE_ZONE_ID` and a `WEBSITE_*`
set. Writing those names here would silently replace them with a token that can
only touch the state-store worker. The `STACKS_` prefix follows the existing
`WEBSITE_CLOUDFLARE_*` convention for a separately-scoped credential set.

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
