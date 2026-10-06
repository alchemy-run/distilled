import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import { describe, expect, test } from "vitest";
import { type Credentials, credentials } from "./credentials.ts";
import {
  GatewayTimeout,
  InternalServerError,
  NotFound,
  ServiceUnavailable,
  SlackError,
  SlackHttpError,
  SlackParseError,
  SlackRateLimited,
  Unauthorized,
} from "./errors.ts";
import type { SlackOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { bulkArchive, getFile } from "./services/admin.ts";
import { postMessage } from "./services/chat.ts";
import { addRemote } from "./services/files.ts";
import { migrationExchange } from "./services/migration.ts";
import { v2Exchange } from "./services/oauth.ts";

interface Reply {
  readonly status?: number;
  readonly body?: string | Uint8Array<ArrayBuffer>;
  readonly headers?: Record<string, string>;
}

const bot = credentials({ token: Redacted.make("xoxb-test") });

/** A fake HttpClient that records each request (as a web Request) and answers with `reply`. */
const fakeHttp = (reply: Reply) => {
  const requests: Array<Request> = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(Result.getOrThrow(HttpClientRequest.toWebResult(request)));
        return HttpClientResponse.fromWeb(
          request,
          new Response(reply.body ?? "", {
            status: reply.status ?? 200,
            headers: reply.headers,
          }),
        );
      }),
    ),
  );
  return { requests, layer };
};

const run = <A, E>(
  operation: Effect.Effect<A, E, SlackOpContext>,
  reply: Reply,
  creds: Layer.Layer<Credentials> = bot,
) => {
  const http = fakeHttp(reply);
  const promise = Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(Layer.mergeAll(http.layer, creds))),
  );
  return { requests: http.requests, promise };
};

const succeed = <A, E>(operation: Effect.Effect<A, E, SlackOpContext>, reply: Reply) =>
  run(operation, reply).promise;

const failWith = <A, E>(operation: Effect.Effect<A, E, SlackOpContext>, reply: Reply) =>
  run(Effect.flip(operation), reply).promise;

const ok = (payload: Record<string, unknown>) => JSON.stringify({ ok: true, ...payload });
const notOk = (error: string, extra: Record<string, unknown> = {}) =>
  JSON.stringify({ ok: false, error, ...extra });

const posted = { channel: "C1", ts: "1.0" };
const exchanged = {
  app_id: "A1",
  token_type: "bot",
  scope: "chat:write",
  access_token: "xoxe.xoxb-new",
  expires_in: 43200,
  refresh_token: "xoxe-1-refresh",
};

describe("request encoding", () => {
  test("a JSON method POSTs to <base>/<method> with a Bearer token and a JSON body", async () => {
    const blocks = [{ type: "section", text: { type: "mrkdwn", text: "hi" } }];
    const { requests, promise } = run(postMessage({ channel: "C1", text: "hi", blocks }), {
      body: ok(posted),
    });
    await promise;
    expect(requests).toHaveLength(1);
    const request = requests[0]!;
    expect(request.method).toBe("POST");
    expect(request.url).toBe("https://slack.com/api/chat.postMessage");
    expect(request.headers.get("authorization")).toBe("Bearer xoxb-test");
    expect(request.headers.get("content-type")).toContain("application/json");
    // JSON methods keep structured values structured.
    expect(await request.json()).toEqual({ channel: "C1", text: "hi", blocks });
  });

  test("a custom apiBaseUrl replaces the default host", async () => {
    const { requests, promise } = run(
      postMessage({ channel: "C1" }),
      { body: ok(posted) },
      credentials({ token: Redacted.make("xoxb-test"), apiBaseUrl: "https://slack.test/api" }),
    );
    await promise;
    expect(requests[0]!.url).toBe("https://slack.test/api/chat.postMessage");
  });

  test("form methods comma-join ID lists", async () => {
    const { requests, promise } = run(bulkArchive({ channel_ids: ["C1", "C2"] }), {
      body: ok({ bulk_action_id: "B1", not_added: [] }),
    });
    await promise;
    const request = requests[0]!;
    expect(request.headers.get("content-type")).toContain("application/x-www-form-urlencoded");
    const form = new URLSearchParams(await request.text());
    expect([...form.entries()]).toEqual([["channel_ids", "C1,C2"]]);
  });

  test("form methods JSON-encode lists of rich values", async () => {
    const indexable_file_contents = [{ text: "hello" }];
    const { requests, promise } = run(
      addRemote({
        external_id: "X1",
        external_url: "https://x.test",
        title: "T",
        indexable_file_contents,
      }),
      { body: ok({ file: { id: "F1" } }) },
    );
    await promise;
    const form = new URLSearchParams(await requests[0]!.text());
    expect(form.get("external_id")).toBe("X1");
    expect(JSON.parse(form.get("indexable_file_contents")!)).toEqual(indexable_file_contents);
  });

  test("array query args are comma-joined, not repeated", async () => {
    const { requests, promise } = run(migrationExchange({ users: ["U1", "U2"], to_old: true }), {
      body: ok({ team_id: "T1", enterprise_id: "E1", user_id_map: {} }),
    });
    await promise;
    const request = requests[0]!;
    expect(request.method).toBe("GET");
    const url = new URL(request.url);
    expect(url.pathname).toBe("/api/migration.exchange");
    expect(url.searchParams.getAll("users")).toEqual(["U1,U2"]);
    expect(url.searchParams.get("to_old")).toBe("true");
  });

  test("an empty token omits Authorization; Redacted inputs are sent unwrapped", async () => {
    const { requests, promise } = run(
      v2Exchange({ client_id: "cid", client_secret: Redacted.make("shh") }),
      { body: ok(exchanged) },
      credentials({ token: Redacted.make("") }),
    );
    await promise;
    const request = requests[0]!;
    expect(request.headers.get("authorization")).toBeNull();
    const form = new URLSearchParams(await request.text());
    expect(form.get("client_id")).toBe("cid");
    expect(form.get("client_secret")).toBe("shh");
  });
});

describe("ok:true responses", () => {
  test("the payload shares the envelope level and `ok` rides along", async () => {
    const result = await succeed(postMessage({ channel: "C1" }), { body: ok(posted) });
    expect(result).toEqual({ ok: true, channel: "C1", ts: "1.0" });
  });

  test("sensitive output members are wrapped in Redacted", async () => {
    const result = await succeed(v2Exchange({ client_id: "cid", client_secret: "s" }), {
      body: ok(exchanged),
    });
    expect(Redacted.isRedacted(result.access_token)).toBe(true);
    expect(Redacted.value(result.access_token as Redacted.Redacted<string>)).toBe("xoxe.xoxb-new");
    expect(Redacted.value(result.refresh_token as Redacted.Redacted<string>)).toBe(
      "xoxe-1-refresh",
    );
    expect(result.app_id).toBe("A1");
  });

  test("a non-JSON success body is returned as raw bytes", async () => {
    const bytes = new Uint8Array([0x1f, 0x8b, 0x08, 0x00, 0xff]);
    const result = await succeed(getFile({ type: "member", date: "2026-01-01" }), { body: bytes });
    expect(result).toBeInstanceOf(Uint8Array);
    expect([...(result as Uint8Array)]).toEqual([...bytes]);
    // A raw document output passes strict validation too.
    const strictResult = await succeed(
      getFile({ type: "member" }).pipe(Effect.provide(ResponseValidation.strict)),
      { body: bytes },
    );
    expect([...(strictResult as Uint8Array)]).toEqual([...bytes]);
  });
});

describe("ok:false envelopes", () => {
  test("an unrecognised slug inside HTTP 200 is SlackError carrying the slug", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      body: notOk("channel_not_found"),
    });
    expect(error).toBeInstanceOf(SlackError);
    expect(error).toMatchObject({ code: "channel_not_found" });
    // The message is omitted when it would only repeat the slug.
    expect((error as SlackError).message).toBe("");
  });

  test("missing_scope keeps needed/provided", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      body: notOk("missing_scope", { needed: "chat:write", provided: "channels:read" }),
    });
    expect(error).toBeInstanceOf(SlackError);
    expect(error).toMatchObject({
      code: "missing_scope",
      needed: "chat:write",
      provided: "channels:read",
    });
  });

  test("response_metadata.messages become the message and the messages list", async () => {
    const messages = ["[ERROR] missing required field: channel", "[ERROR] bad text"];
    const error = await failWith(postMessage({ channel: "" }), {
      body: notOk("invalid_arguments", { response_metadata: { messages } }),
    });
    expect(error).toBeInstanceOf(SlackError);
    expect(error).toMatchObject({ code: "invalid_arguments", message: messages[0], messages });
  });

  test("a bare `errors` list is used as detail too", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      body: notOk("invalid_blocks", { errors: ["invalid block at index 0"] }),
    });
    expect(error).toMatchObject({
      code: "invalid_blocks",
      message: "invalid block at index 0",
      messages: ["invalid block at index 0"],
    });
  });

  test("a slug under a non-2xx status still maps by slug", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      status: 400,
      body: notOk("invalid_arguments"),
    });
    expect(error).toBeInstanceOf(SlackError);
    expect(error).toMatchObject({ code: "invalid_arguments" });
  });

  for (const slug of [
    "not_authed",
    "invalid_auth",
    "account_inactive",
    "token_revoked",
    "token_expired",
  ]) {
    test(`${slug} is Unauthorized`, async () => {
      const error = await failWith(postMessage({ channel: "C1" }), { body: notOk(slug) });
      expect(error).toBeInstanceOf(Unauthorized);
      expect(error).toMatchObject({ message: slug });
    });
  }

  const serverSlugs = [
    ["internal_error", InternalServerError],
    ["fatal_error", InternalServerError],
    ["service_unavailable", ServiceUnavailable],
    ["request_timeout", GatewayTimeout],
  ] as const;
  for (const [slug, ErrorClass] of serverSlugs) {
    test(`${slug} is ${ErrorClass.name}`, async () => {
      const error = await failWith(postMessage({ channel: "C1" }), { body: notOk(slug) });
      expect(error).toBeInstanceOf(ErrorClass);
      expect(error).toMatchObject({ message: slug });
    });
  }
});

describe("rate limiting", () => {
  for (const slug of ["rate_limited", "ratelimited"]) {
    test(`the ${slug} slug inside HTTP 200 is SlackRateLimited`, async () => {
      const error = await failWith(postMessage({ channel: "C1" }), {
        body: notOk(slug),
        headers: { "retry-after": "12" },
      });
      expect(error).toBeInstanceOf(SlackRateLimited);
      expect(error).toMatchObject({ code: slug });
      expect(Duration.toSeconds((error as SlackRateLimited).retryAfter!)).toBe(12);
    });
  }

  test("a bare 429 is SlackRateLimited with the default slug and Retry-After", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      status: 429,
      headers: { "retry-after": "30" },
    });
    expect(error).toBeInstanceOf(SlackRateLimited);
    expect(error).toMatchObject({ code: "rate_limited", message: "HTTP 429" });
    expect(Duration.toSeconds((error as SlackRateLimited).retryAfter!)).toBe(30);
  });
});

describe("non-envelope failures", () => {
  test("a mapped status with a text body uses the status class and the text", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      status: 404,
      body: "no such method",
    });
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "no such method" });
  });

  test("an HTML 503 is ServiceUnavailable", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      status: 503,
      body: "<html>down</html>",
    });
    expect(error).toBeInstanceOf(ServiceUnavailable);
  });

  test("an unmapped 5xx is InternalServerError", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), { status: 520, body: "" });
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error).toMatchObject({ message: "HTTP 520" });
  });

  test("an unmapped 4xx is SlackHttpError with the status and body", async () => {
    const error = await failWith(postMessage({ channel: "C1" }), {
      status: 418,
      body: "teapot",
    });
    expect(error).toBeInstanceOf(SlackHttpError);
    expect(error).toMatchObject({ status: 418, message: "teapot", body: "teapot" });
  });
});

describe("response validation", () => {
  const strict = <A, E>(operation: Effect.Effect<A, E, SlackOpContext>) =>
    operation.pipe(Effect.provide(ResponseValidation.strict));
  const mismatched = ok({ channel: 1, ts: "1.0" });

  test("lenient mode returns a mismatched payload as read", async () => {
    const result = await succeed(postMessage({ channel: "C1" }), { body: mismatched });
    expect(result as unknown).toEqual({ ok: true, channel: 1, ts: "1.0" });
  });

  test("strict mode fails a mismatched payload with SlackParseError", async () => {
    const error = await failWith(strict(postMessage({ channel: "C1" })), { body: mismatched });
    expect(error).toBeInstanceOf(SlackParseError);
  });

  test("strict mode passes a matching payload", async () => {
    const result = await succeed(strict(postMessage({ channel: "C1" })), { body: ok(posted) });
    expect(result).toEqual({ ok: true, ...posted });
  });

  test("a non-JSON body for a struct output: lenient returns bytes, strict fails", async () => {
    const result = await succeed(postMessage({ channel: "C1" }), { body: "not json" });
    expect(new TextDecoder().decode(result as unknown as Uint8Array)).toBe("not json");
    const error = await failWith(strict(postMessage({ channel: "C1" })), { body: "not json" });
    expect(error).toBeInstanceOf(SlackParseError);
  });
});
