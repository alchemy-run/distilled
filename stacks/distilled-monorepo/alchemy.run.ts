import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as GitHub from "alchemy/GitHub";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/**
 * The monorepo itself: `alchemy-run/distilled` and the credentials its CI
 * runs on.
 *
 * This is the "GitHub stack" from
 * https://alchemy.run/environments/ci/#the-github-stack — the stack you
 * deploy by hand, once, with an admin profile, so that everything else can
 * deploy itself. It owns two things:
 *
 *   - **The repository.** Settings that are otherwise clicked into the GitHub
 *     UI and forgotten — merge strategy, topics, homepage — live here as
 *     code, and are converged on every deploy.
 *   - **The credentials.** A Cloudflare API token scoped to the state store
 *     is minted as code and written straight into this repo's Actions
 *     secrets, alongside the org PAT the mirrors need. No credential is ever
 *     pasted by hand, and the raw token value never appears in a terminal.
 *
 * What that buys: `.github/workflows/deploy-submodules-stack.yml` can deploy
 * `stacks/distilled-submodules` on every commit to `main`.
 *
 * NEVER deployed from CI. It mints credentials, so it needs privileges no CI
 * run should hold — see the admin-profile warning in the docs above. Deploy
 * it manually:
 *
 * ```sh
 * cd stacks/distilled-monorepo
 * DISTILLED_REPOS_PAT=<org fine-grained PAT> \
 *   pnpm exec alchemy deploy --stage prod --profile <admin profile>
 * ```
 *
 * The org PAT is the one credential that cannot be minted through an API —
 * GitHub has no endpoint for creating PATs. It is read from
 * `DISTILLED_REPOS_PAT` when set, otherwise the deploying profile's own
 * signed-in GitHub token is stored.
 */

/** The repository this stack manages, and where the secrets are written. */
const OWNER = "alchemy-run";
const NAME = "distilled";

/**
 * The GitHub org the spec mirrors live in, published to Actions so
 * `stacks/distilled-submodules` can be retargeted without a code change.
 */
const ReposOwner = Config.string("DISTILLED_REPOS_OWNER").pipe(
  Config.withDefault("distilled-mirror"),
);

/**
 * Fine-grained PAT owned by the mirror org: All repositories, with
 * Administration / Contents / Workflows read-write. Optional — falls back to
 * the deploying profile's own token, which is correct when that profile was
 * signed in as the org.
 */
const ReposPat = Config.redacted("DISTILLED_REPOS_PAT").pipe(Config.option);

export default Alchemy.Stack(
  "distilled-monorepo",
  {
    providers: Layer.mergeAll(Cloudflare.providers(), GitHub.providers()),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    // `GitHub.Repository` observes the live repository before it creates
    // anything, so an existing repository is adopted and converged rather
    // than duplicated. Every value below therefore mirrors what
    // `alchemy-run/distilled` is set to today: this resource is a
    // description of the status quo, and its first deploy should be a no-op.
    // Change a setting HERE to change it on GitHub — not the other way round.
    const repository = yield* GitHub.Repository("distilled", {
      owner: OWNER,
      name: NAME,
      description: "Effect-native SDKs for cloud providers",
      homepage: "https://distilled.cloud",
      visibility: "public",
      defaultBranch: "main",
      hasIssues: true,
      hasProjects: true,
      hasWiki: true,
      hasDiscussions: true,
      isTemplate: false,
      archived: false,
      // Squash-only, and prune the branch afterwards.
      allowSquashMerge: true,
      allowMergeCommit: false,
      allowRebaseMerge: false,
      allowAutoMerge: false,
      deleteBranchOnMerge: true,
      topics: ["aws", "aws-sdk", "cloudflare", "effect", "effect-ts"],
      // No `autoInit`: it only applies at create time, and this repository
      // has ten thousand commits of history.
    });

    const { accountId } = yield* yield* Cloudflare.CloudflareEnvironment;

    // Minted by `POST /accounts/{id}/tokens`, which returns the value exactly
    // once; alchemy captures it and pipes it into `GitHub.Secret` directly,
    // so it never reaches a terminal or a CI log.
    //
    // Scoped to what `Cloudflare.state()` needs and nothing more:
    //   - Workers Scripts Write   deploy/upgrade the state-store worker
    //   - Account Settings Write  read account metadata during that deploy
    //   - Secrets Store Write     state() keeps the worker's bearer token in
    //                             the account Secrets Store, and reading it
    //                             back means BINDING it to a short-lived
    //                             edge-preview worker. Binding is a write, so
    //                             `Secrets Store Read` is not enough — with
    //                             Read alone the edge-preview call is
    //                             rejected and every CI deploy fails.
    const stateToken = yield* Cloudflare.ApiToken.AccountApiToken(
      "state-store-token",
      {
        name: "distilled-stacks-ci",
        accountId,
        policies: [
          {
            effect: "allow",
            permissionGroups: [
              "Workers Scripts Write",
              "Account Settings Write",
              "Secrets Store Write",
            ],
            resources: { [`com.cloudflare.api.account.${accountId}`]: "*" },
          },
        ],
      },
    );

    // Deliberately NOT `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`.
    // Those already exist on this repository as long-lived, broadly-scoped
    // credentials shared with other tooling, and writing them here would
    // silently replace them with a token that can only touch the state store.
    // The `STACKS_` prefix follows the `WEBSITE_CLOUDFLARE_*` convention this
    // repository already uses for a second, separately-scoped credential set.
    yield* GitHub.Secret("cf-api-token", {
      owner: OWNER,
      repository: NAME,
      name: "STACKS_CLOUDFLARE_API_TOKEN",
      value: stateToken.value,
    });

    yield* GitHub.Secret("cf-account-id", {
      owner: OWNER,
      repository: NAME,
      name: "STACKS_CLOUDFLARE_ACCOUNT_ID",
      value: Redacted.make(accountId),
    });

    const patOverride = yield* ReposPat;
    const reposPat = Option.isSome(patOverride)
      ? patOverride.value
      : // The deploying profile's own signed-in GitHub token. The cast erases
        // the `GitHubCredentials` requirement: it is provided at runtime by
        // `GitHub.providers()`, but `Stack` constrains its requirement union
        // to provider services and this is not one.
        (yield* yield* GitHub.GitHubCredentials as unknown as Effect.Effect<
          Effect.Effect<{ readonly token: Redacted.Redacted<string> }>
        >).token;

    yield* GitHub.Secret("repos-pat", {
      owner: OWNER,
      repository: NAME,
      name: "ALCHEMY_GITHUB_TOKEN",
      value: reposPat,
    });

    yield* GitHub.Variable("repos-owner", {
      owner: OWNER,
      repository: NAME,
      name: "DISTILLED_REPOS_OWNER",
      value: yield* ReposOwner,
    });

    return {
      repository: repository.htmlUrl,
      accountId,
      stateTokenName: stateToken.name,
    };
  }),
);
