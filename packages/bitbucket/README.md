# @distilled.cloud/bitbucket

Effect-native [Bitbucket Cloud](https://bitbucket.org) SDK, generated from Atlassian's
[OpenAPI description](https://dac-static.atlassian.com/cloud/bitbucket/swagger.v3.json) of the
[Bitbucket Cloud REST API](https://developer.atlassian.com/cloud/bitbucket/rest/).

## Installation

```bash
npm install @distilled.cloud/bitbucket effect
```

## Quick start

Ship a change: branch off `main`, open a pull request, wait for its builds to pass, and merge it.

```ts
import { Effect, Layer, Schedule, Stream } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Bitbucket from "@distilled.cloud/bitbucket";

const repo = { workspace: "acme", repo_slug: "api" };

const program = Effect.gen(function* () {
  // 1. Branch off main.
  yield* Bitbucket.createBranch({ ...repo, name: "fix/timeouts", target: { hash: "main" } });

  // (push commits to the branch, for example with `git push`)

  // 2. Open a pull request into the repository's main branch.
  const pr = yield* Bitbucket.createPullRequest({
    ...repo,
    title: "Raise request timeouts",
    source: { branch: { name: "fix/timeouts" } },
    close_source_branch: true,
  });
  const pull_request_id = pr.id!;

  // 3. Wait until every build status on the pull request has finished.
  const statuses = Bitbucket.listPullRequestStatuses.items({ ...repo, pull_request_id }).pipe(
    Stream.runCollect,
  );
  const builds = yield* statuses.pipe(
    Effect.repeat({
      schedule: Schedule.spaced("15 seconds"),
      until: (all) => all.length > 0 && all.every((s) => s.state !== "INPROGRESS"),
    }),
  );
  if (!builds.every((s) => s.state === "SUCCESSFUL")) {
    return yield* Bitbucket.declinePullRequest({ ...repo, pull_request_id });
  }

  // 4. Approve and merge.
  yield* Bitbucket.approvePullRequest({ ...repo, pull_request_id });
  return yield* Bitbucket.mergePullRequest({ ...repo, pull_request_id, merge_strategy: "squash" });
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Bitbucket.CredentialsFromEnv);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

Bitbucket Cloud takes two kinds of credential
([docs](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#authentication)):

- An **API token**, a personal token, is sent as HTTP Basic with your Atlassian account email as the
  username. Set `BITBUCKET_EMAIL` and `BITBUCKET_API_TOKEN`, or use
  `Bitbucket.fromApiToken({ email, apiToken: Redacted.make(token) })`.
- An **access token** (a repository, project or workspace access token, or an OAuth 2.0 access
  token) is sent as `Authorization: Bearer <token>`. Set `BITBUCKET_ACCESS_TOKEN`, or use
  `Bitbucket.fromAccessToken({ accessToken: Redacted.make(token) })`.

`CredentialsFromEnv` uses `BITBUCKET_ACCESS_TOKEN` when it is set. `BITBUCKET_BASE_URL` is optional
and defaults to `https://api.bitbucket.org/2.0`. App passwords are deprecated and have no layer; an
API token replaces one.

## Coverage

Every operation in the spec that is not marked deprecated (274): repositories, branches and tags,
commits, commit statuses, reports and annotations, diffs, pull requests (comments, tasks,
approvals, merges, merge queues), Pipelines (runs, steps, logs, caches, schedules, variables,
runners, SSH keys, OIDC), deployments and environments, webhooks, deploy keys, branch restrictions,
branching models, default reviewers, permissions, projects, workspaces, users, GPG and SSH keys,
snippets and downloads.

Atlassian's spec has no issue tracker or wiki routes, so this SDK has none. Upload operations that
take a multipart body (`uploadDownload`, `createCommitFromFiles`) are generated without that body.

## Pagination

List operations are plain calls (one page) and also expose streams that follow the response's
`next` URL as you consume them:

```ts
const repos = Bitbucket.listRepositories
  .items({ workspace: "acme", pagelen: 100 })
  .pipe(Stream.runCollect);
```

## Errors

Each operation's declared statuses are typed errors (`BadRequest`, `Forbidden`, `NotFound`,
`Conflict`, `Gone`); `message` is Bitbucket's `error.message`, followed by `error.detail` when it
sends one. Throttling (429) and 5xx responses are retried by the default policy;
`Bitbucket.Retry.none` turns retries off.

Pipelines and deployment variable values, webhook secrets, the Pipelines SSH private key and runner
OAuth secrets come back as `Redacted` values, so they print as `<redacted>` in logs and errors;
`Redacted.value` unwraps one where you need it.
