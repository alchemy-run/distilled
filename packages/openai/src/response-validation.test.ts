/**
 * Tests for the hand-written OpenAI glue (protocol.ts, credentials.ts,
 * pagination.ts, errors.ts): response validation modes, per-operation key
 * selection, the error envelope, the body-matched common errors, the
 * event-stream terminator and `after` pagination — all against a mock
 * HttpClient.
 */
import { mockHttpClient, runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { type Credentials, credentials } from "./credentials.ts";
import {
  InsufficientQuota,
  InvalidApiKey,
  MissingCredentials,
  ModelNotFound,
  OpenAIParseError,
  RateLimitExceeded,
  UnknownOpenAIError,
} from "./errors.ts";
import type { OpenAIOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { ContextLengthExceeded, createChatCompletionStream } from "./services/chat.ts";
import { listFiles } from "./services/files.ts";
import { getModel, listModels } from "./services/models.ts";
import { listProjects } from "./services/projects.ts";

const keys = credentials({
  apiKey: Redacted.make("sk-proj-test"),
  adminKey: Redacted.make("sk-admin-test"),
  organization: "org-123",
  project: "proj-456",
});

const run = <A, E>(
  effect: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  response: Parameters<typeof mockHttpClient>[0],
  creds = keys,
) =>
  effect.pipe(
    Retry.none,
    Effect.provide(creds),
    Effect.provide(mockHttpClient(response)),
    Effect.result,
    Effect.runPromise,
  );

const model = { id: "gpt-5-nano", object: "model", created: 1, owned_by: "openai" };

describe("OpenAI response validation", () => {
  const validate = (body: string) =>
    runValidationModes(getModel({ model: "gpt-5-nano" }).pipe(Retry.none, Effect.provide(keys)), {
      body,
    });

  test("a matching body succeeds unchanged in both modes", async () => {
    const { lenient, strict } = await validate(JSON.stringify(model));
    expect(lenient).toMatchObject({ _tag: "Success", success: model });
    expect(strict).toMatchObject({ _tag: "Success", success: model });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { id: "gpt-5-nano" };
    const { lenient, strict } = await validate(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect((strict as any).failure).toBeInstanceOf(OpenAIParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await validate("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(OpenAIParseError);
  });
});

describe("OpenAI auth", () => {
  const capture = () => {
    const seen: HttpClientRequest.HttpClientRequest[] = [];
    const respond = (request: HttpClientRequest.HttpClientRequest) => {
      seen.push(request);
      return { body: JSON.stringify({ object: "list", data: [], has_more: false }) };
    };
    return { seen, respond };
  };

  test("inference operations send the API key plus scoping headers", async () => {
    const { seen, respond } = capture();
    const result = await run(listModels({}), respond);
    expect(result._tag).toBe("Success");
    expect(seen[0]!.url).toBe("https://api.openai.com/v1/models");
    expect(seen[0]!.headers.authorization).toBe("Bearer sk-proj-test");
    expect(seen[0]!.headers["openai-organization"]).toBe("org-123");
    expect(seen[0]!.headers["openai-project"]).toBe("proj-456");
  });

  test("Admin-API operations send the admin key", async () => {
    const { seen, respond } = capture();
    const result = await run(listProjects({}), respond);
    expect(result._tag).toBe("Success");
    expect(seen[0]!.url).toBe("https://api.openai.com/v1/organization/projects");
    expect(seen[0]!.headers.authorization).toBe("Bearer sk-admin-test");
  });

  test("an Admin-API operation without an admin key fails before sending", async () => {
    const { seen, respond } = capture();
    const result = await run(
      listProjects({}),
      respond,
      credentials({ apiKey: Redacted.make("sk-proj-test") }),
    );
    expect(seen).toHaveLength(0);
    expect(result._tag).toBe("Failure");
    const failure = (result as any).failure;
    expect(failure).toBeInstanceOf(MissingCredentials);
    expect(failure.credential).toBe("OPENAI_ADMIN_KEY");
  });

  test("an inference operation without an API key fails before sending", async () => {
    const { seen, respond } = capture();
    const result = await run(
      listModels({}),
      respond,
      credentials({ adminKey: Redacted.make("sk-admin-test") }),
    );
    expect(seen).toHaveLength(0);
    expect((result as any).failure).toBeInstanceOf(MissingCredentials);
    expect((result as any).failure.credential).toBe("OPENAI_API_KEY");
  });
});

describe("OpenAI errors", () => {
  const fail = async (status: number, error: unknown) => {
    const result = await run(getModel({ model: "x" }), {
      status,
      body: JSON.stringify({ error }),
    });
    expect(result._tag).toBe("Failure");
    return (result as any).failure;
  };

  test("401 invalid_api_key → InvalidApiKey", async () => {
    const e = await fail(401, {
      message: "Incorrect API key provided",
      type: "invalid_request_error",
      param: null,
      code: "invalid_api_key",
    });
    expect(e).toBeInstanceOf(InvalidApiKey);
    expect(e.message).toBe("Incorrect API key provided");
  });

  test("429 insufficient_quota (any code) → InsufficientQuota", async () => {
    const e = await fail(429, {
      message: "You have no credits remaining.",
      type: "insufficient_quota",
      param: null,
      code: "credit_balance_exhausted",
    });
    expect(e).toBeInstanceOf(InsufficientQuota);
  });

  test("429 rate_limit_exceeded → RateLimitExceeded", async () => {
    const e = await fail(429, {
      message: "Rate limit reached",
      type: "requests",
      param: null,
      code: "rate_limit_exceeded",
    });
    expect(e).toBeInstanceOf(RateLimitExceeded);
  });

  test("404 model_not_found beats the operation's NotFound", async () => {
    const e = await fail(404, {
      message: "The model 'x' does not exist",
      type: "invalid_request_error",
      param: "model",
      code: "model_not_found",
    });
    expect(e).toBeInstanceOf(ModelNotFound);
  });

  test("a string `error` (Admin API) still yields its message", async () => {
    const result = await run(listProjects({}), {
      status: 418,
      body: JSON.stringify({ error: "Missing scopes: api.management.read" }),
    });
    const e = (result as any).failure;
    expect(e).toBeInstanceOf(UnknownOpenAIError);
    expect(e.message).toBe("Missing scopes: api.management.read");
  });
});

describe("OpenAI streaming", () => {
  const sse = (events: string[]) => ({
    headers: { "content-type": "text/event-stream" },
    body: events.map((data) => `data: ${data}\n\n`).join(""),
  });

  test("chat completion streams stop at data: [DONE]", async () => {
    const chunk = (content: string) =>
      JSON.stringify({
        id: "c1",
        object: "chat.completion.chunk",
        created: 1,
        model: "m",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      });
    let sent: unknown;
    const events = await Effect.runPromise(
      Stream.runCollect(
        createChatCompletionStream({
          model: "m",
          messages: [{ role: "user", content: "hi" }],
        } as any),
      ).pipe(
        Effect.provide(keys),
        Effect.provide(
          mockHttpClient((request) => {
            sent = request;
            return sse([chunk("He"), chunk("llo"), "[DONE]"]);
          }),
        ),
      ),
    );
    expect(events.map((e: any) => e.choices[0].delta.content)).toEqual(["He", "llo"]);
    // The stream sibling forces `stream: true` on the request body.
    const body = (sent as any).body.body as Uint8Array;
    expect(JSON.parse(new TextDecoder().decode(body)).stream).toBe(true);
  });

  test("context_length_exceeded on a stream op → ContextLengthExceeded", async () => {
    const result = await Effect.runPromise(
      Stream.runCollect(createChatCompletionStream({ model: "m", messages: [] } as any)).pipe(
        Retry.none,
        Effect.provide(keys),
        Effect.provide(
          mockHttpClient({
            status: 400,
            body: JSON.stringify({
              error: {
                message: "Your input exceeds the context window of this model.",
                type: "invalid_request_error",
                param: "input",
                code: "context_length_exceeded",
              },
            }),
          }),
        ),
        Effect.result,
      ),
    );
    expect((result as any).failure).toBeInstanceOf(ContextLengthExceeded);
  });
});

describe("OpenAI pagination", () => {
  test("`after` lists follow last_id until has_more is false", async () => {
    const afters: (string | null)[] = [];
    const pages = [
      { object: "list", data: [{ id: "f1" }], first_id: "f1", last_id: "f1", has_more: true },
      { object: "list", data: [{ id: "f2" }], first_id: "f2", last_id: "f2", has_more: false },
    ];
    const items = await Effect.runPromise(
      Stream.runCollect(listFiles.items({})).pipe(
        Effect.provide(keys),
        Effect.provide(
          mockHttpClient((request) => {
            const after = new URL(request.url).searchParams.get("after");
            afters.push(after);
            return { body: JSON.stringify(pages[afters.length - 1]) };
          }),
        ),
      ),
    );
    expect(afters).toEqual([null, "f1"]);
    expect(items.map((f: any) => f.id)).toEqual(["f1", "f2"]);
  });
});

// The common errors and the parse error are part of every operation's
// declared error type.
export const commonErrorsAreDeclared: [
  OpenAIParseError | MissingCredentials | InvalidApiKey | InsufficientQuota,
] extends [OpenAIOpError]
  ? true
  : false = true;
