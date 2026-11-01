import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import type { ForgejoAuth } from "../src/credentials.ts";
import { ForgejoCredentials, forgejoApiUrl, forgejoCredentialsOf } from "../src/forgejo.ts";
import * as forgejo from "../src/services/git_forgejo.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly body: string | undefined;
}

const TOKEN = "s3cret-token";
const PASSWORD = "s3cret-password";

/** Answers every request with `answer`, and records it. */
const fakeInstance = (
  auth: ForgejoAuth,
  answer: { readonly status: number; readonly body?: unknown },
) => {
  const calls: Captured[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const requestBody = request.body;
        calls.push({
          method: request.method,
          url: url.toString(),
          authorization: request.headers.authorization,
          body:
            requestBody._tag === "Uint8Array"
              ? new TextDecoder().decode(requestBody.body)
              : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(answer.body === undefined ? null : JSON.stringify(answer.body), {
            status: answer.status,
          }),
        );
      }),
    ),
  );
  const credentials = Layer.succeed(
    ForgejoCredentials,
    forgejoCredentialsOf({ instanceUrl: "https://acme.git.onstackit.cloud/", auth }),
  );
  return { calls, layer: Layer.mergeAll(http, credentials) };
};

describe("forgejoApiUrl", () => {
  test("appends the API path, without a user, a password or a trailing slash", () => {
    expect(forgejoApiUrl("https://user:pw@acme.git.onstackit.cloud/")).toEqual(
      "https://acme.git.onstackit.cloud/api/v1",
    );
  });
  test("a bare host gets https", () => {
    expect(forgejoApiUrl("acme.git.onstackit.cloud")).toEqual(
      "https://acme.git.onstackit.cloud/api/v1",
    );
  });
  test("something that isn't a URL gives nothing", () => {
    expect(forgejoApiUrl("https://")).toBeUndefined();
  });
});

describe("forgejoCredentialsOf", () => {
  test("a bad URL fails without quoting it", async () => {
    const error = await Effect.runPromise(
      forgejoCredentialsOf({
        instanceUrl: "https://",
        auth: { token: Redacted.make(TOKEN) },
      }).pipe(Effect.flip),
    );
    expect(error._tag).toEqual("ConfigError");
    expect(error.message).not.toContain("https://");
  });
});

describe("git_forgejo operations", () => {
  test("a token is sent as Forgejo's token scheme, on a route under the API root", async () => {
    const { calls, layer } = fakeInstance(
      { token: Redacted.make(TOKEN) },
      { status: 200, body: { id: 7, name: "app", empty: true } },
    );
    const repository = await Effect.runPromise(
      forgejo.getRepository({ owner: "acme", repo: "app" }).pipe(Effect.provide(layer)),
    );
    expect(repository).toMatchObject({ id: 7, name: "app", empty: true });
    expect(calls).toMatchObject([
      {
        method: "GET",
        url: "https://acme.git.onstackit.cloud/api/v1/repos/acme/app",
        authorization: `token ${TOKEN}`,
      },
    ]);
  });

  test("a user is sent as HTTP Basic, and a body as the wire's snake_case", async () => {
    const { calls, layer } = fakeInstance(
      { username: "ci", password: Redacted.make(PASSWORD) },
      { status: 201, body: { id: 8, name: "app" } },
    );
    await Effect.runPromise(
      forgejo
        .createOrgRepository({ org: "acme", name: "app", auto_init: true, private: true })
        .pipe(Effect.provide(layer)),
    );
    expect(calls[0]?.method).toEqual("POST");
    expect(calls[0]?.url).toEqual("https://acme.git.onstackit.cloud/api/v1/orgs/acme/repos");
    expect(calls[0]?.authorization).toEqual(`Basic ${btoa(`ci:${PASSWORD}`)}`);
    expect(JSON.parse(calls[0]?.body ?? "{}")).toEqual({
      name: "app",
      auto_init: true,
      private: true,
    });
  });

  test("a password outside Latin-1 goes as its UTF-8 bytes", async () => {
    const { calls, layer } = fakeInstance(
      { username: "bot", password: Redacted.make("pä€") },
      { status: 200, body: { login: "bot", id: 1 } },
    );
    await Effect.runPromise(forgejo.getCurrentUser({}).pipe(Effect.provide(layer)));
    expect(calls[0]!.authorization).toEqual(
      `Basic ${Buffer.from("bot:pä€", "utf8").toString("base64")}`,
    );
  });

  test("a missing repository is the typed NotFound, with Forgejo's message", async () => {
    const { layer } = fakeInstance(
      { token: Redacted.make(TOKEN) },
      { status: 404, body: { message: "not found", url: "https://example.test/swagger" } },
    );
    const error = await Effect.runPromise(
      forgejo
        .getRepository({ owner: "acme", repo: "gone" })
        .pipe(Effect.flip, Effect.provide(layer)),
    );
    expect(error).toMatchObject({ _tag: "NotFound", message: "not found" });
  });

  test("a taken name on an organization is the typed Conflict", async () => {
    const { layer } = fakeInstance(
      { token: Redacted.make(TOKEN) },
      {
        status: 409,
        body: { message: "The repository with the same name already exists.", url: "" },
      },
    );
    const error = await Effect.runPromise(
      forgejo
        .createOrgRepository({ org: "acme", name: "app" })
        .pipe(Effect.flip, Effect.provide(layer)),
    );
    expect(error._tag).toEqual("Conflict");
  });

  test("an unknown organization is the typed UnprocessableEntity", async () => {
    const { layer } = fakeInstance(
      { token: Redacted.make(TOKEN) },
      { status: 422, body: { message: "organization does not exist", url: "" } },
    );
    const error = await Effect.runPromise(
      forgejo
        .createOrgRepository({ org: "nobody", name: "app" })
        .pipe(Effect.flip, Effect.provide(layer)),
    );
    expect(error._tag).toEqual("UnprocessableEntity");
  });

  test("an empty 204 from a delete succeeds", async () => {
    const { calls, layer } = fakeInstance({ token: Redacted.make(TOKEN) }, { status: 204 });
    await Effect.runPromise(
      forgejo.deleteRepository({ owner: "acme", repo: "app" }).pipe(Effect.provide(layer)),
    );
    expect(calls[0]?.method).toEqual("DELETE");
  });
});
