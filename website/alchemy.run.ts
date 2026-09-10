import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as GitHub from "alchemy/GitHub";
import * as Output from "alchemy/Output";
import * as RemovalPolicy from "alchemy/RemovalPolicy";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export type WorkerEnv = Cloudflare.InferEnv<typeof Website>;

/** Physical name of the `preview-base` Worker. PR stages upload versions of it. */
const PREVIEW_WORKER = "distilled-website-preview";

const Website = Cloudflare.Website.StaticSite(
  "Website",
  Effect.gen(function* () {
    const stack = yield* Alchemy.Stack;
    // alchemy 2.0.0-beta.74 documents `Cloudflare.Worker.ref(...)` but its
    // public types omit `ref` (`ResourceClassLike` has no such method). The
    // version API accepts a literal script name; that is the preview-base
    // worker we name explicitly below.
    const previewParent = stack.stage.startsWith("pr-")
      ? PREVIEW_WORKER
      : undefined;
    const name =
      stack.stage === "preview-base"
        ? PREVIEW_WORKER
        : stack.stage === "main"
          ? "distilled-website-main"
          : stack.stage === "prod"
            ? "distilled-website-prod"
            : undefined;

    return {
      name,
      command: "bun run build",
      main: "./src/worker.ts",
      outdir: "dist",
      version: previewParent
        ? {
            parent: previewParent,
            alias: stack.stage,
            message: process.env.PULL_REQUEST
              ? `PR #${process.env.PULL_REQUEST}`
              : undefined,
          }
        : undefined,
      workersDev: stack.stage === "prod" ? false : undefined,
      domain:
        stack.stage === "prod"
          ? { name: "distilled.cloud" }
          : stack.stage === "main"
            ? { name: "main.distilled.cloud" }
            : undefined,
      // Everything build.ts reads: a change to any of these must rebuild,
      // since the package list, patch stats and bench numbers are all
      // computed at build time.
      memo: {
        include: [
          "src/**",
          "public/**",
          "scripts/**",
          "data/**",
          "assets/**",
          "package.json",
          "../pnpm-lock.yaml",
          "../packages/*/package.json",
          "../packages/*/patches/**",
          "../packages/*/src/services/**",
          "../benches/*/results/latest.json",
        ],
      },
      compatibility: {
        date: "2026-04-02",
      },
      assets: {
        runWorkerFirst: true,
      },
      dev: {
        command: "bun run preview",
        url: "http://localhost:4173",
      },
    } satisfies Cloudflare.Website.StaticSiteProps<{}>;
  }),
).pipe(
  RemovalPolicy.retain(
    Alchemy.Stack.pipe(Effect.map(({ stage }) => !stage.startsWith("pr-"))),
  ),
);

export default Alchemy.Stack(
  "DistilledWebsite",
  {
    providers: Layer.mergeAll(Cloudflare.providers(), GitHub.providers()),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const { stage } = yield* Alchemy.Stack;
    const website = yield* Website;

    if (stage.startsWith("pr-")) {
      yield* GitHub.Comment("preview-comment", {
        owner: "alchemy-run",
        repository: "distilled",
        issueNumber: Number(process.env.PULL_REQUEST),
        body: Output.interpolate`
          ## Website Preview Deployed

          **URL:** ${website.url}

          Built from commit ${
            // `BUILD_SHA` is set by .github/workflows/website.yml to the
            // PR head SHA (or `github.sha` for push deploys). The
            // ambient `GITHUB_SHA` would point at the synthetic merge
            // commit on `pull_request` events, which is not what
            // anyone wants to see in the comment.
            process.env.BUILD_SHA
              ? `[\`${process.env.BUILD_SHA.slice(0, 7)}\`](https://github.com/alchemy-run/distilled/commit/${process.env.BUILD_SHA})`
              : "unknown"
          }.

          ---
          _This comment updates automatically with each push._
        `,
      });
    }

    return {
      url: website.url,
    };
  }),
);
