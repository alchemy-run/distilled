import { describe, expect, test } from "bun:test";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import {
  type TransactionalCredentials,
  TransactionalCredentialsFromEnv,
  fromTransactionalApiKey,
} from "./credentials.ts";
import * as Retry from "./retry.ts";
import {
  getTemplate,
  listSubaccounts,
  ping,
  sendMessage,
} from "./services/transactional.ts";

const API_KEY = "md-test-key";

interface Call {
  readonly url: URL;
  readonly method: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: unknown;
}

const bodyOf = (request: HttpClientRequest.HttpClientRequest): unknown =>
  request.body._tag === "Uint8Array"
    ? JSON.parse(new TextDecoder().decode(request.body.body))
    : undefined;

const fake = (
  respond: (call: Call, index: number) => Response,
  credentials: Layer.Layer<TransactionalCredentials> = fromTransactionalApiKey({
    apiKey: API_KEY,
  }),
) => {
  const calls: Call[] = [];
  const layer = Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          const call: Call = {
            url: new URL(request.url),
            method: request.method,
            headers: request.headers,
            body: bodyOf(request),
          };
          calls.push(call);
          return HttpClientResponse.fromWeb(
            request,
            respond(call, calls.length - 1),
          );
        }),
      ),
    ),
    credentials,
  );
  return { calls, layer };
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const failure = (status: number, name: string, message: string) =>
  json({ status: "error", code: status, name, message }, status);

describe("Mailchimp Transactional protocol", () => {
  test("posts to mandrillapp.com with the key in the body", async () => {
    const { calls, layer } = fake(() => json("PONG!"));

    const pong = await Effect.runPromise(ping({}).pipe(Effect.provide(layer)));

    expect(pong).toBe("PONG!");
    expect(calls[0]!.method).toBe("POST");
    expect(calls[0]!.url.href).toBe(
      "https://mandrillapp.com/api/1.0/users/ping",
    );
    expect(calls[0]!.body).toEqual({ key: API_KEY });
    expect(calls[0]!.headers["authorization"]).toBeUndefined();
  });

  test("passes the message through beside the key", async () => {
    const { calls, layer } = fake(() =>
      json([{ email: "ada@example.com", status: "sent", _id: "abc" }]),
    );

    const results = await Effect.runPromise(
      sendMessage({
        message: {
          from_email: "hello@example.com",
          to: [{ email: "ada@example.com" }],
          subject: "Welcome",
          text: "Hi Ada",
        },
        async: true,
      }).pipe(Effect.provide(layer)),
    );

    expect(results[0]!.status).toBe("sent");
    expect(calls[0]!.url.pathname).toBe("/api/1.0/messages/send");
    expect(calls[0]!.body).toEqual({
      key: API_KEY,
      async: true,
      message: {
        from_email: "hello@example.com",
        to: [{ email: "ada@example.com" }],
        subject: "Welcome",
        text: "Hi Ada",
      },
    });
  });

  test("lets apiBaseUrl override the host", async () => {
    const { calls, layer } = fake(
      () => json([]),
      fromTransactionalApiKey({
        apiKey: API_KEY,
        apiBaseUrl: "https://mandrillapp.com/api/1.4/",
      }),
    );

    await Effect.runPromise(listSubaccounts({}).pipe(Effect.provide(layer)));

    expect(calls[0]!.url.href).toBe(
      "https://mandrillapp.com/api/1.4/subaccounts/list",
    );
  });

  test("reads TransactionalCredentialsFromEnv, with MANDRILL_API_KEY as fallback", async () => {
    const { calls, layer } = fake(
      () => json("PONG!"),
      TransactionalCredentialsFromEnv,
    );

    await Effect.runPromise(
      ping({}).pipe(
        Effect.provide(layer),
        Effect.provide(
          ConfigProvider.layer(
            ConfigProvider.fromUnknown({ MANDRILL_API_KEY: "md-legacy" }),
          ),
        ),
      ),
    );

    expect(calls[0]!.body).toEqual({ key: "md-legacy" });
  });

  test("maps Invalid_Key to Unauthorized and keeps the name", async () => {
    const { layer } = fake(() =>
      failure(401, "Invalid_Key", "Invalid API key"),
    );

    const error = await Effect.runPromise(
      ping({}).pipe(Effect.provide(layer), Effect.flip),
    );

    expect(error._tag).toBe("Unauthorized");
    expect(error.message).toBe("Invalid_Key: Invalid API key");
  });

  test("maps a ValidationError 400 and an Unknown_Template 404", async () => {
    const { layer } = fake((call) =>
      call.url.pathname.endsWith("/templates/info")
        ? failure(404, "Unknown_Template", "No template named welcome")
        : failure(400, "ValidationError", "You must specify a message"),
    );

    const notFound = await Effect.runPromise(
      getTemplate({ name: "welcome" }).pipe(Effect.provide(layer), Effect.flip),
    );
    expect(notFound._tag).toBe("NotFound");
    expect(notFound.message).toBe(
      "Unknown_Template: No template named welcome",
    );

    const bad = await Effect.runPromise(
      sendMessage({ message: {} }).pipe(Effect.provide(layer), Effect.flip),
    );
    expect(bad._tag).toBe("BadRequest");
  });

  test("surfaces an unmapped status as MailchimpTransactionalError", async () => {
    const { layer } = fake(() =>
      failure(402, "PaymentRequired", "Your account is past due"),
    );

    const error = await Effect.runPromise(
      ping({}).pipe(Effect.provide(layer), Effect.flip),
    );

    expect(error._tag).toBe("MailchimpTransactionalError");
    if (error._tag === "MailchimpTransactionalError") {
      expect(error.status).toBe(402);
      expect(error.name).toBe("PaymentRequired");
      expect(error.code).toBe(402);
      expect(error.message).toBe("PaymentRequired: Your account is past due");
    }
  });

  test("a non-envelope failure is UnknownMailchimpError", async () => {
    const { layer } = fake(
      () => new Response("<html>gateway</html>", { status: 418 }),
    );

    const error = await Effect.runPromise(
      ping({}).pipe(Retry.none, Effect.provide(layer), Effect.flip),
    );

    expect(error._tag).toBe("UnknownMailchimpError");
  });

  test("retries a 503 GeneralError under the transient policy", async () => {
    const { calls, layer } = fake((_, i) =>
      i === 0 ? failure(503, "GeneralError", "Try again") : json("PONG!"),
    );

    const pong = await Effect.runPromise(
      ping({}).pipe(Retry.transient, Effect.provide(layer)),
    );

    expect(pong).toBe("PONG!");
    expect(calls.length).toBe(2);
  });
});
