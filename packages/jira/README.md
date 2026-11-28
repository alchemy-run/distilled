# @distilled.cloud/jira

Effect-native [Jira Cloud](https://www.atlassian.com/software/jira) SDK, generated from Atlassian's
[OpenAPI description](https://dac-static.atlassian.com/cloud/jira/platform/swagger-v3.v3.json) of
the [Jira Cloud platform REST API v3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/).

## Installation

```bash
npm install @distilled.cloud/jira effect
```

## Quick start

Read a project's open bugs for an agent: find them with JQL, then pull each bug's latest comment.

```ts
import { Effect, Layer, Stream } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Jira from "@distilled.cloud/jira";

const program = Effect.gen(function* () {
  const project = yield* Jira.getProject({ projectIdOrKey: "ACME" });

  // Every open bug, highest priority first. `.items` follows `nextPageToken` across pages.
  const bugs = yield* Jira.searchAndReconsileIssuesUsingJql
    .items({
      jql: `project = ${project.key} AND issuetype = Bug AND statusCategory != Done ORDER BY priority DESC`,
      fields: ["summary", "priority", "assignee"],
    })
    .pipe(Stream.take(20), Stream.runCollect);

  return yield* Effect.forEach(
    bugs,
    (bug) =>
      Effect.map(
        Jira.getComments({ issueIdOrKey: bug.key!, orderBy: "-created", maxResults: 1 }),
        (page) => ({
          key: bug.key,
          summary: bug.fields?.summary,
          latestComment: page.comments[0]?.created,
        }),
      ),
    { concurrency: 4 },
  );
});

const Live = Jira.CredentialsFromEnv.pipe(Layer.provideMerge(FetchHttpClient.layer));

program.pipe(Effect.provide(Live), Effect.runPromise).then(console.table);
```

## Auth

Jira Cloud takes three kinds of credential, and calls go to one of two base URLs.

- An **API token** is sent as HTTP Basic with your Atlassian account email as the username
  ([docs](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/)). Set
  `JIRA_EMAIL` and `JIRA_API_TOKEN`, or use
  `Jira.fromApiToken({ email, apiToken: Redacted.make(token), baseUrl: "https://acme.atlassian.net" })`.
- An **OAuth 2.0 (3LO) access token** is sent as `Authorization: Bearer <token>`
  ([docs](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/)). Set
  `JIRA_ACCESS_TOKEN`, or use `Jira.fromAccessToken({ accessToken: Redacted.make(token), cloudId })`.
- An **OAuth 2.0 (3LO) refresh token** (your app asked for the `offline_access` scope) is exchanged
  at `https://auth.atlassian.com/oauth/token` on first use and again before each access token
  expires. Set `JIRA_CLIENT_ID`, `JIRA_CLIENT_SECRET` and `JIRA_REFRESH_TOKEN`, or use
  `Jira.fromRefreshToken({ clientId, clientSecret, refreshToken, cloudId, onRefresh })`.
  Atlassian rotates refresh tokens: each exchange returns a new one and disables the old one, so
  store the one `onRefresh` gives you. `CredentialsFromEnv` keeps it in memory only.

The base URL is the site URL (`JIRA_BASE_URL`, `baseUrl: "https://acme.atlassian.net"`) for an
unscoped API token, or the API gateway `https://api.atlassian.com/ex/jira/<cloudId>` (`JIRA_CLOUD_ID`,
`cloudId`) for OAuth tokens and scoped API tokens. Find a site's cloud ID with
`GET https://api.atlassian.com/oauth/token/accessible-resources` and the access token, or at
`https://<site>.atlassian.net/_edge/tenant_info`.

`CredentialsFromEnv` uses `JIRA_ACCESS_TOKEN` first, then `JIRA_EMAIL` + `JIRA_API_TOKEN`, then the
refresh token. Every layer checks its configuration when it is built and fails with `ConfigError`;
a refresh token exchange that fails at run time fails the call with `TokenRequestFailed`.

## Coverage

Every operation in the spec that is not marked deprecated (601): issues, comments, worklogs,
attachments, links, watchers and votes, JQL search and Jira expressions, projects, components and
versions, filters and dashboards, fields and custom field contexts, screens, workflows and
statuses, schemes (issue type, permission, notification, priority, security), users and groups,
plans, webhooks, app properties and the Atlassian Connect routes.

The Jira Software (agile: boards, sprints) and Jira Service Management APIs have their own specs
and are not in this package.

Atlassian marks 126 of these operations experimental (`x-experimental: true`), for example
`createDashboard`, `getPlans` and `getSecurityLevels`. They import from `unstable/jira`; the
package root exports the other 475:

```ts
import * as JiraUnstable from "@distilled.cloud/jira/unstable/jira";

const plans = yield* JiraUnstable.getPlans({});
```

## Pagination

List operations are plain calls (one page) and also expose streams that walk the pages as you
consume them. 81 lists page this way: most by `startAt` (stopping on `isLast` or `total`), and JQL
search, bulk changelogs, workflow and status usages, plans and policies by `nextPageToken` or
`cursor`.

```ts
const projects = Jira.searchProjects.items({ maxResults: 50 }).pipe(Stream.runCollect);
```

User searches return a bare array with no page information, so they are plain calls; pass
`startAt` yourself.

## Errors

Each operation's declared statuses are typed errors (`BadRequest`, `Forbidden`, `NotFound`,
`Conflict`, `UnprocessableEntity`); `message` joins Jira's `errorMessages` and each
`errors` field message (`summary: You must specify a summary of the issue.`). Throttling (429)
and 5xx responses are retried by the default policy; `Jira.Retry.none` turns retries off.
