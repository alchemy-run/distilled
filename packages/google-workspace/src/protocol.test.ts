import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials, fromAccessToken } from "./credentials.ts";
import {
  GoogleWorkspaceParseError,
  InternalServerError,
  TooManyRequests,
  UnknownGoogleWorkspaceError,
} from "./errors.ts";
import * as Retry from "./retry.ts";
import { getFiles, NotFound } from "./services/drive_v3.ts";
import { listUsersMessages } from "./services/gmail_v1.ts";
import { getPeople } from "./services/people_v1.ts";
import { deleteTasks, Forbidden, insertTasklists } from "./services/tasks_v1.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const fakeGoogle = (
  status = 200,
  body: string | null = "{}",
  headers: Record<string, string> = {},
) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          method: request.method,
          url,
          headers: { ...request.headers },
          body:
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : undefined,
        });
        return HttpClientResponse.fromWeb(request, new Response(body, { status, headers }));
      }),
    ),
  );
  return { calls, layer };
};

const token = fromAccessToken({ accessToken: Redacted.make("ya29.workspace") });

const run = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) => Effect.runPromise(operation.pipe(Retry.none, Effect.provide(token), Effect.provide(http)));

const runFlip = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(token), Effect.provide(http), Effect.flip),
  );

describe("request encoding", () => {
  test("sends the access token as a Bearer Authorization header", async () => {
    const { calls, layer } = fakeGoogle();
    await run(getFiles({ fileId: "f" }), layer);
    expect(calls[0].headers.authorization).toBe("Bearer ya29.workspace");
  });

  test("resolves credentials per request", async () => {
    const { calls, layer } = fakeGoogle();
    let n = 0;
    const rotating = Layer.succeed(
      Credentials,
      Effect.sync(() => ({ accessToken: Redacted.make(`t${++n}`) })),
    );
    const op = getFiles({ fileId: "f" }).pipe(
      Retry.none,
      Effect.provide(rotating),
      Effect.provide(layer),
    );
    await Effect.runPromise(op);
    await Effect.runPromise(op);
    expect(calls.map((c) => c.headers.authorization)).toEqual(["Bearer t1", "Bearer t2"]);
  });

  test("uses each API's own base URL (host-only and host+service-path)", async () => {
    const drive = fakeGoogle();
    await run(getFiles({ fileId: "f" }), drive.layer);
    expect(drive.calls[0].url.href).toBe("https://www.googleapis.com/drive/v3/files/f");

    const gmail = fakeGoogle();
    await run(listUsersMessages({ userId: "me" }), gmail.layer);
    expect(gmail.calls[0].url.href).toBe("https://gmail.googleapis.com/gmail/v1/users/me/messages");
  });

  test("plain {param} labels are fully percent-encoded", async () => {
    const { calls, layer } = fakeGoogle();
    await run(deleteTasks({ tasklist: "list/1", task: "a b" }), layer);
    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].url.pathname).toBe("/tasks/v1/lists/list%2F1/tasks/a%20b");
  });

  test("{+param} reserved expansion keeps '/'", async () => {
    const { calls, layer } = fakeGoogle();
    await run(getPeople({ resourceName: "people/c 1", personFields: "names" }), layer);
    expect(calls[0].url.href).toBe(
      "https://people.googleapis.com/v1/people/c%201?personFields=names",
    );
  });

  test("query members: booleans/numbers stringified, arrays repeated, dotted names kept", async () => {
    const gmail = fakeGoogle();
    await run(
      listUsersMessages({
        userId: "me",
        labelIds: ["INBOX", "UNREAD"],
        includeSpamTrash: false,
        maxResults: 5,
      }),
      gmail.layer,
    );
    expect(gmail.calls[0].url.search).toBe(
      "?labelIds=INBOX&labelIds=UNREAD&includeSpamTrash=false&maxResults=5",
    );

    const people = fakeGoogle();
    await run(
      getPeople({ resourceName: "people/me", "requestMask.includeField": "person.names" }),
      people.layer,
    );
    expect(people.calls[0].url.searchParams.get("requestMask.includeField")).toBe("person.names");
  });

  test("the HttpBody member is the whole JSON body; GET sends none", async () => {
    const insert = fakeGoogle();
    await run(insertTasklists({ body: { title: "Groceries" } }), insert.layer);
    expect(insert.calls[0].method).toBe("POST");
    expect(insert.calls[0].url.href).toBe("https://tasks.googleapis.com/tasks/v1/users/@me/lists");
    expect(insert.calls[0].headers["content-type"]).toBe("application/json");
    expect(JSON.parse(insert.calls[0].body!)).toEqual({ title: "Groceries" });

    const get = fakeGoogle();
    await run(getFiles({ fileId: "f" }), get.layer);
    expect(get.calls[0].body).toBeUndefined();
  });
});

describe("Google error envelope decoding", () => {
  test("dispatches by HTTP status and tacks on envelope status and details", async () => {
    const details = [{ "@type": "type.googleapis.com/google.rpc.ErrorInfo", reason: "notFound" }];
    const { layer } = fakeGoogle(
      404,
      JSON.stringify({
        error: { code: 404, status: "NOT_FOUND", message: "File not found: f.", details },
      }),
    );
    const error = await runFlip(getFiles({ fileId: "f" }), layer);
    // Core's status class shares its tag with the per-service class.
    expect((error as { _tag: string })._tag).toBe(NotFound.name);
    expect(error).toMatchObject({
      _tag: "NotFound",
      message: "File not found: f.",
      status: "NOT_FOUND",
      details,
    });
  });

  test("403 surfaces as Forbidden", async () => {
    const { layer } = fakeGoogle(
      403,
      JSON.stringify({
        error: { code: 403, status: "PERMISSION_DENIED", message: "Insufficient Permission" },
      }),
    );
    const error = await runFlip(deleteTasks({ tasklist: "l", task: "t" }), layer);
    expect(error).toMatchObject({
      _tag: Forbidden.name,
      message: "Insufficient Permission",
      status: "PERMISSION_DENIED",
    });
  });

  test("retryable statuses carry Retry-After", async () => {
    const { layer } = fakeGoogle(
      429,
      JSON.stringify({ error: { code: 429, status: "RESOURCE_EXHAUSTED", message: "slow down" } }),
      { "retry-after": "3" },
    );
    const error = await runFlip(getFiles({ fileId: "f" }), layer);
    expect(error).toBeInstanceOf(TooManyRequests);
    expect((error as TooManyRequests).retryAfter).toBeDefined();
    expect(error).toMatchObject({ message: "slow down", status: "RESOURCE_EXHAUSTED" });
  });

  test("a non-JSON error body becomes the message", async () => {
    const { layer } = fakeGoogle(500, "Internal Error");
    const error = await runFlip(getFiles({ fileId: "f" }), layer);
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error).toMatchObject({ message: "Internal Error" });
  });

  test("an empty error body uses the HTTP status as message", async () => {
    const { layer } = fakeGoogle(404, "");
    const error = await runFlip(getFiles({ fileId: "f" }), layer);
    expect(error).toMatchObject({ _tag: "NotFound", message: "404" });
  });

  test("unmapped statuses become UnknownGoogleWorkspaceError", async () => {
    const body = { error: { code: 418, status: "UNKNOWN", message: "teapot" } };
    const { layer } = fakeGoogle(418, JSON.stringify(body));
    const error = await runFlip(getFiles({ fileId: "f" }), layer);
    expect(error).toBeInstanceOf(UnknownGoogleWorkspaceError);
    expect(error).toMatchObject({ code: 418, message: "teapot", status: "UNKNOWN", body });
  });

  test("UnknownGoogleWorkspaceError falls back to the HTTP status as code and text as body", async () => {
    const { layer } = fakeGoogle(418, "teapot");
    const error = await runFlip(getFiles({ fileId: "f" }), layer);
    expect(error).toBeInstanceOf(UnknownGoogleWorkspaceError);
    expect(error).toMatchObject({ code: 418, message: "teapot", body: "teapot" });
  });
});

describe("success decoding", () => {
  test("a JSON body is returned verbatim", async () => {
    const file = { id: "f", name: "doc.txt", mimeType: "text/plain" };
    const { layer } = fakeGoogle(200, JSON.stringify(file));
    expect(await run(getFiles({ fileId: "f" }), layer)).toEqual(file);
  });

  test("empty 200 and 204 bodies decode to {}", async () => {
    for (const [status, body] of [
      [200, ""],
      [204, null],
    ] as const) {
      const { layer } = fakeGoogle(status, body);
      expect(await run(deleteTasks({ tasklist: "l", task: "t" }), layer)).toEqual({});
    }
  });

  test("strict validation fails a mismatched payload with GoogleWorkspaceParseError", async () => {
    const { layer } = fakeGoogle(200, JSON.stringify({ id: 42 }));
    const error = await Effect.runPromise(
      getFiles({ fileId: "f" }).pipe(
        Retry.none,
        Effect.provide(token),
        Effect.provide(layer),
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(GoogleWorkspaceParseError);
  });
});
