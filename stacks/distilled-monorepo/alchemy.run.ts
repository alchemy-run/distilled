import * as AWS from "@alchemy.run/aws";
import * as Cloudflare from "@alchemy.run/cloudflare";
import * as GitHub from "@alchemy.run/github";
import * as Alchemy from "alchemy";
import { adopt } from "alchemy/AdoptPolicy";
import * as Output from "alchemy/Output";
import * as RemovalPolicy from "alchemy/RemovalPolicy";
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
 *   - **The credentials.** Every Actions secret and variable the workflows in
 *     `.github/workflows` read. The Cloudflare token is minted as code and
 *     written straight into this repo's Actions secrets; the values no API
 *     can mint (a GitHub App private key, a Discord webhook) come from the
 *     environment at deploy time — either exported in the shell, or in a
 *     gitignored `.env` beside this file, which the CLI reads by default
 *     (`--env-file` points at another).
 *
 * What that buys: `.github/workflows/deploy-submodules-stack.yml` can deploy
 * `stacks/distilled-submodules` on every commit to `main`, and
 * `.github/workflows/website.yml` can deploy the site on the same account.
 *
 * One credential goes to a mirror rather than to this repository:
 * `spec-mirror-aws` reads the EventBridge schema registry, an AWS API, so the
 * stack mints an AWS access key that can only read schemas and writes it into
 * that mirror's Actions secrets. The deploying profile therefore needs AWS
 * credentials too.
 *
 * NEVER deployed from CI. It mints credentials, so it needs privileges no CI
 * run should hold — see the admin-profile warning in the docs above. Deploy
 * it manually, with whichever externally-sourced credentials you hold in the
 * environment:
 *
 * ```sh
 * cd stacks/distilled-monorepo
 * DISCORD_WEBHOOK_URL=<#releases webhook> \
 * ALCHEMY_VERSION_BOT_PRIVATE_KEY="$(cat alchemy-version-bot.pem)" \
 * DISTILLED_REPOS_PAT=<org fine-grained PAT> \
 *   pnpm exec alchemy deploy --stage prod --profile <admin profile>
 * ```
 *
 * A bare deploy with none of them set still converges everything else, and
 * lists the secrets it left alone. That matters because GitHub hands an
 * existing secret's value back to nobody: requiring all of them would make
 * every deploy wait on re-fetching credentials that are already in place. A
 * value you no longer hold has to be rotated at its source and passed in
 * fresh.
 *
 * The org PAT behind `ALCHEMY_GITHUB_TOKEN` follows the same rule: it is
 * written only when `DISTILLED_REPOS_PAT` is set, so a deploy for an
 * unrelated change never replaces the token CI uses.
 */

/** The repository this stack manages, and where the secrets are written. */
const OWNER = "alchemy-run";
const NAME = "distilled";

/**
 * The GitHub org the spec mirrors live in, published to Actions so
 * `stacks/distilled-submodules` can be retargeted without a code change.
 */
const ReposOwner = Config.String("DISTILLED_REPOS_OWNER").pipe(
  Config.withDefault("distilled-mirror"),
);

/**
 * The mirror whose fetch script reads the EventBridge `aws.events` schema
 * registry (`stacks/distilled-submodules/spec-repos/aws/fetch-specs.ts`).
 */
const AWS_MIRROR = "spec-mirror-aws";

/**
 * Fine-grained PAT owned by the mirror org: All repositories, with
 * Administration / Contents / Workflows read-write. Optional: without it the
 * repository keeps the `ALCHEMY_GITHUB_TOKEN` it already has.
 */
const ReposPat = Config.Redacted("DISTILLED_REPOS_PAT").pipe(Config.option);

/**
 * Numeric id of the `alchemy-version-bot` GitHub App, whose installation
 * token the release and website workflows mint at runtime. Public information
 * (`GET /apps/alchemy-version-bot`), and a secret only because
 * `actions/create-github-app-token` reads it next to the private key.
 */
const BotAppId = Config.String("ALCHEMY_VERSION_BOT_ID").pipe(Config.withDefault("3107227"));

/** The GitHub Actions app, the only app allowed to report a required check. */
const GITHUB_ACTIONS_APP_ID = 15368;

/**
 * The checks a pull request must pass before it can enter main's merge
 * queue, and again on the queue's merge commit before it lands: every job of
 * `ci.yml`, plus the benchmark. Preview packages (`pkg.yml`) and the website
 * preview deploy are not required. Each name is a job's `name:` in its
 * workflow; rename a job there and here together, or the queue waits for a
 * check that never reports.
 */
const REQUIRED_CHECKS = [
  "Typecheck (all packages, generated code included)",
  "Test",
  "Bundlers",
  "Lint",
  "Conformance (gRPC and protobuf)",
  "Typecheck (deployment stacks)",
  "Website (typecheck & static build)",
  "Check formatting",
  "Benchmarks (PR vs main)",
] as const;

/**
 * The credentials no API can mint for us. Each is read as an option: a value
 * in the environment is written to Actions, an absent one leaves whatever the
 * repository already holds untouched and is listed in the deploy's output.
 *
 *   - `ALCHEMY_VERSION_BOT_PRIVATE_KEY` — PEM of the app above. Regenerate it
 *     under Settings → Developer settings → GitHub Apps if it is lost;
 *     generating a new key does not invalidate the old one until you delete it.
 *   - `DISCORD_WEBHOOK_URL` — webhook `scripts/release/discord-notify.ts` posts
 *     release announcements to.
 */
const EXTERNAL_SECRETS = ["ALCHEMY_VERSION_BOT_PRIVATE_KEY", "DISCORD_WEBHOOK_URL"] as const;

type ExternalSecretName = (typeof EXTERNAL_SECRETS)[number];

const ExternalSecrets = Effect.forEach(EXTERNAL_SECRETS, (name) =>
  Config.Redacted(name).pipe(
    Config.option,
    Effect.map((value) => [name, value] as const),
  ),
);

export default Alchemy.Stack(
  "distilled-monorepo",
  {
    providers: Layer.mergeAll(Cloudflare.providers(), GitHub.providers(), AWS.providers()),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const external = yield* ExternalSecrets;
    const unchanged: string[] = [];

    /**
     * Writes one externally-sourced secret when its value is in the
     * environment, and records it as untouched when it is not.
     *
     * `RemovalPolicy.retain` is what makes skipping safe: a resource that
     * disappears from the graph is normally deleted, so without it the first
     * deploy run without (say) `DISCORD_WEBHOOK_URL` in the environment would
     * delete the repository's `DISCORD_WEBHOOK_URL`. With it, alchemy drops
     * the state row and leaves the secret standing.
     */
    const externalSecret = (id: string, name: ExternalSecretName) =>
      Effect.gen(function* () {
        const value = external.find(([n]) => n === name)![1];
        if (Option.isNone(value)) {
          unchanged.push(name);
          return;
        }
        yield* GitHub.Secret(id, {
          owner: OWNER,
          repository: NAME,
          name,
          value: value.value,
        }).pipe(RemovalPolicy.retain());
      });

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

    // main's merge queue. Adopted: the ruleset was created in the GitHub UI,
    // and every value except `requiredStatusChecks` and `maxEntriesToBuild`
    // mirrors it as it was.
    // Without required checks the queue merged a PR about a minute after it
    // was queued, whatever its CI said: on 2026-11-13 it merged #1167 while
    // its Test job still ran, and Test then failed on main.
    yield* GitHub.Ruleset("merge-queue", {
      owner: OWNER,
      repository: NAME,
      name: "Merge Queue",
      target: "branch",
      enforcement: "active",
      conditions: { include: ["~DEFAULT_BRANCH"], exclude: [] },
      bypassActors: [
        { actorType: "OrganizationAdmin", bypassMode: "always" },
        { actorType: "RepositoryRole", actorId: 5, bypassMode: "always" }, // admin
        { actorType: "Integration", actorId: Number(yield* BotAppId), bypassMode: "always" },
      ],
      deletion: true,
      nonFastForward: true,
      mergeQueue: {
        mergeMethod: "SQUASH",
        groupingStrategy: "ALLGREEN",
        // At 1 the queue built a stack's bottom PR alone. Its squash commit
        // then conflicted with the next PR, and the queue ejected the rest of
        // the stack (stack 1155, 2026-11-14). A stack must fit in one build.
        maxEntriesToBuild: 20,
        minEntriesToMerge: 1,
        maxEntriesToMerge: 8,
        minEntriesToMergeWaitMinutes: 5,
        checkResponseTimeoutMinutes: 119,
      },
      requiredStatusChecks: {
        checks: REQUIRED_CHECKS.map((context) => ({
          context,
          integrationId: GITHUB_ACTIONS_APP_ID,
        })),
        // The queue tests each PR on top of main already.
        strictRequiredStatusChecksPolicy: false,
      },
    }).pipe(adopt(true));

    const { accountId } = yield* yield* Cloudflare.CloudflareEnvironment;

    // Minted by `POST /accounts/{id}/tokens`, which returns the value exactly
    // once; alchemy captures it and pipes it into `GitHub.Secret` directly,
    // so it never reaches a terminal or a CI log.
    //
    // One token for every stack CI deploys, because they share one Cloudflare
    // account and therefore one `Cloudflare.state()` store: the submodules
    // stack and the website both read their state through it.
    //
    // Account-wide:
    //   - Workers Scripts Write   deploy/upgrade the state-store worker, and
    //                             the website worker with its static assets
    //   - Account Settings Write  read account metadata during that deploy
    //   - Secrets Store Write     state() keeps the worker's bearer token in
    //                             the account Secrets Store, and reading it
    //                             back means BINDING it to a short-lived
    //                             edge-preview worker. Binding is a write, so
    //                             `Secrets Store Read` is not enough — with
    //                             Read alone the edge-preview call is
    //                             rejected and every CI deploy fails.
    //
    // Every zone in the account, nested under the account resource as
    // account-owned tokens require, for the website's custom domains:
    //   - Zone Read               alchemy resolves `distilled.cloud` by name
    //                             (Cloudflare/Zone/lookup.ts); there is no
    //                             zone-id input to pass instead
    //   - Workers Routes Write    attach distilled.cloud and
    //                             main.distilled.cloud to their worker
    //   - DNS Write               the proxied record a custom domain needs
    const stateToken = yield* Cloudflare.ApiToken.AccountApiToken("state-store-token", {
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
        {
          effect: "allow",
          permissionGroups: ["Zone Read", "Workers Routes Write", "DNS Write"],
          resources: {
            [`com.cloudflare.api.account.${accountId}`]: {
              "com.cloudflare.api.account.zone.*": "*",
            },
          },
        },
      ],
    });

    // Deliberately NOT `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`.
    // Those already exist on this repository as long-lived, broadly-scoped
    // credentials shared with other tooling, and writing them here would
    // silently replace them with a token scoped to this repository's CI.
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

    // Retained like the external secrets above, so a deploy without the PAT
    // drops only the state row and the repository keeps its token.
    const reposPat = yield* ReposPat;
    if (Option.isSome(reposPat)) {
      yield* GitHub.Secret("repos-pat", {
        owner: OWNER,
        repository: NAME,
        name: "ALCHEMY_GITHUB_TOKEN",
        value: reposPat.value,
      }).pipe(RemovalPolicy.retain());
    } else {
      unchanged.push("ALCHEMY_GITHUB_TOKEN");
    }

    const reposOwner = yield* ReposOwner;

    yield* GitHub.Variable("repos-owner", {
      owner: OWNER,
      repository: NAME,
      name: "DISTILLED_REPOS_OWNER",
      value: reposOwner,
    });

    // The EventBridge schema registry signs every request, so the AWS
    // mirror's nightly workflow needs AWS credentials to refresh the event
    // schemas (an SES bounce or complaint, for example). This user can list
    // and read the AWS-managed `aws.events` registry and nothing else.
    const schemaReader = yield* AWS.IAM.User("spec-mirror-aws-reader", {
      userName: "distilled-spec-mirror-aws",
      inlinePolicies: {
        ReadAwsEventSchemas: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: ["schemas:ListSchemas", "schemas:DescribeSchema"],
              Resource: [
                "arn:aws:schemas:*:*:registry/aws.events",
                "arn:aws:schemas:*:*:schema/aws.events/*",
              ],
            },
          ],
        },
      },
      tags: { "managed-by": "alchemy-run/distilled stacks/distilled-monorepo" },
    });

    const schemaReaderKey = yield* AWS.IAM.AccessKey("spec-mirror-aws-key", {
      userName: schemaReader.userName,
    });

    yield* GitHub.Secret("spec-mirror-aws-key-id", {
      owner: reposOwner,
      repository: AWS_MIRROR,
      name: "AWS_ACCESS_KEY_ID",
      value: Output.map(schemaReaderKey.accessKeyId, (id) => Redacted.make(id)),
    });

    // AWS returns the secret only when the key is created, and this stack
    // created it, so a missing value is a corrupt state row, not a condition
    // to handle.
    yield* GitHub.Secret("spec-mirror-aws-secret", {
      owner: reposOwner,
      repository: AWS_MIRROR,
      name: "AWS_SECRET_ACCESS_KEY",
      value: schemaReaderKey.secretAccessKey.pipe(
        Output.mapEffect((secret) =>
          secret === undefined
            ? Effect.die(
                new Error(
                  "AWS.IAM.AccessKey spec-mirror-aws-key has no secret in state; replace the key",
                ),
              )
            : Effect.succeed(secret),
        ),
      ),
    });

    // `actions/create-github-app-token` in release.yml and website.yml reads
    // both halves of the app's identity from Actions secrets, so the public
    // app id is stored as one too.
    yield* GitHub.Secret("bot-app-id", {
      owner: OWNER,
      repository: NAME,
      name: "ALCHEMY_VERSION_BOT_ID",
      value: Redacted.make(yield* BotAppId),
    });

    yield* externalSecret("bot-private-key", "ALCHEMY_VERSION_BOT_PRIVATE_KEY");
    yield* externalSecret("discord-webhook", "DISCORD_WEBHOOK_URL");

    if (unchanged.length > 0) {
      yield* Effect.logWarning(
        `Left these Actions secrets as the repository already had them, because no value was in the environment: ${unchanged.join(", ")}`,
      );
    }

    return {
      repository: repository.htmlUrl,
      accountId,
      stateTokenName: stateToken.name,
      secretsLeftUnchanged: unchanged,
    };
  }),
);
