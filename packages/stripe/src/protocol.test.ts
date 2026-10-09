import { inspect } from "node:util";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "./credentials.ts";
import {
  ApiError,
  CardError,
  ExternalDependencyFailed,
  IdempotencyError,
  InternalServerError,
  InvalidRequestError,
  NotFound,
  PaymentError,
  StripeParseError,
  TooManyRequests,
  UnknownStripeError,
} from "./errors.ts";
import { type StripeOpContext, withRequestOptions } from "./protocol.ts";
import * as Retry from "./retry.ts";
import {
  CreateBillingMeterEvent2,
  CreateCustomer,
  CreateEphemeralKey,
  CreateFile,
  DeleteProduct,
  GetCustomer,
  GetCustomers,
  ProductHasPrices,
} from "./services/stripe.ts";

const BASE_URL = "https://stripe.test";
const API_KEY = "sk_test_123";
const SECRET = "sentinel-secret-7f3a";

interface Recorded {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: HttpClientRequest.HttpClientRequest["body"];
}

const decoder = new TextDecoder();

const textOf = (request: Recorded): string | undefined =>
  request.body._tag === "Uint8Array" ? decoder.decode(request.body.body) : undefined;

/** Decoded `key=value` pairs, in wire order. */
const formPairs = (request: Recorded): Array<[string, string]> => [
  ...new URLSearchParams(textOf(request)).entries(),
];

const run = <A, E>(
  operation: Effect.Effect<A, E, StripeOpContext>,
  respond: (request: Recorded) => Response = () => json({}),
) => {
  const requests: Recorded[] = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const recorded: Recorded = {
        method: request.method,
        url: new URL(request.url),
        headers: { ...request.headers },
        body: request.body,
      };
      requests.push(recorded);
      return HttpClientResponse.fromWeb(request, respond(recorded));
    }),
  );
  const result = Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          credentials({ apiKey: Redacted.make(API_KEY), apiBaseUrl: BASE_URL }),
        ),
      ),
    ),
  );
  return { result, requests };
};

const runError = <A, E>(
  operation: Effect.Effect<A, E, StripeOpContext>,
  respond: (request: Recorded) => Response,
) => run(Effect.flip(operation), respond).result;

const json = (value: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

describe("Form encoding (POST /v1)", () => {
  test("nested objects, indexed arrays, booleans, numbers and metadata use bracket notation", async () => {
    const { result, requests } = run(
      CreateCustomer({
        name: "Jenny Rosen",
        balance: -500,
        validate: false,
        metadata: { order_id: "6735", "note with space": "a&b=c" },
        shipping: {
          name: "Jenny",
          address: { city: "San Francisco", line1: "510 Townsend St" },
        },
        preferred_locales: ["en", "fr"],
        expand: ["default_source"],
        tax_id_data: [
          { type: "eu_vat", value: "DE123" },
          { type: "us_ein", value: "12-345" },
        ],
      }),
      () => json({ id: "cus_1", object: "customer" }),
    );
    expect(await result).toMatchObject({ id: "cus_1" });

    const [request] = requests;
    expect(request!.method).toBe("POST");
    expect(request!.url.href).toBe(`${BASE_URL}/v1/customers`);
    expect(request!.url.search).toBe("");
    expect(request!.body).toMatchObject({ contentType: "application/x-www-form-urlencoded" });
    // Members follow the schema's declaration order.
    expect(formPairs(request!)).toEqual([
      ["balance", "-500"],
      ["expand[0]", "default_source"],
      ["metadata[order_id]", "6735"],
      ["metadata[note with space]", "a&b=c"],
      ["name", "Jenny Rosen"],
      ["preferred_locales[0]", "en"],
      ["preferred_locales[1]", "fr"],
      ["shipping[name]", "Jenny"],
      ["shipping[address][city]", "San Francisco"],
      ["shipping[address][line1]", "510 Townsend St"],
      ["tax_id_data[0][type]", "eu_vat"],
      ["tax_id_data[0][value]", "DE123"],
      ["tax_id_data[1][type]", "us_ein"],
      ["tax_id_data[1][value]", "12-345"],
      ["validate", "false"],
    ]);
    // Brackets are percent-encoded on the wire.
    expect(textOf(request!)).toContain("metadata%5Border_id%5D=6735");
  });

  test("true encodes as `true`; null and undefined members are omitted", async () => {
    const { result, requests } = run(
      CreateCustomer({
        validate: true,
        email: undefined,
        metadata: { kept: "1", dropped: null as unknown as string },
      }),
    );
    await result;
    expect(formPairs(requests[0]!)).toEqual([
      ["metadata[kept]", "1"],
      ["validate", "true"],
    ]);
  });

  test("an empty string is sent (Stripe's way to unset a field)", async () => {
    const { result, requests } = run(CreateCustomer({ description: "", metadata: "" }));
    await result;
    expect(formPairs(requests[0]!)).toEqual([
      ["description", ""],
      ["metadata", ""],
    ]);
  });

  test("input keys unknown to the schema pass through as body fields", async () => {
    const { result, requests } = run(
      CreateCustomer({ name: "x", future_param: { a: 1 } } as Parameters<typeof CreateCustomer>[0]),
    );
    await result;
    expect(formPairs(requests[0]!)).toEqual([
      ["name", "x"],
      ["future_param[a]", "1"],
    ]);
  });

  test("an empty input sends no body", async () => {
    const { result, requests } = run(CreateCustomer({}));
    await result;
    expect(requests[0]!.body._tag).toBe("Empty");
  });

  test("labels are substituted and percent-encoded", async () => {
    const { result, requests } = run(DeleteProduct({ id: "prod/1 2" }), () =>
      json({ id: "prod/1 2", deleted: true, object: "product" }),
    );
    await result;
    expect(requests[0]!.method).toBe("DELETE");
    expect(requests[0]!.url.pathname).toBe("/v1/products/prod%2F1%202");
    expect(requests[0]!.body._tag).toBe("Empty");
  });
});

describe("Query encoding (GET /v1)", () => {
  test("nested query objects use brackets and arrays repeat `key[]`", async () => {
    const { result, requests } = run(
      GetCustomers({
        created: { gte: 1700000000, lt: 1800000000 },
        expand: ["data.default_source", "data.tax"],
        limit: 3,
        email: "a+b@example.test",
      }),
      () => json({ object: "list", data: [], has_more: false, url: "/v1/customers" }),
    );
    expect(await result).toMatchObject({ object: "list", data: [], has_more: false });

    const [request] = requests;
    expect(request!.method).toBe("GET");
    expect(request!.url.pathname).toBe("/v1/customers");
    expect([...request!.url.searchParams.entries()]).toEqual([
      ["created[gte]", "1700000000"],
      ["created[lt]", "1800000000"],
      ["email", "a+b@example.test"],
      ["expand[]", "data.default_source"],
      ["expand[]", "data.tax"],
      ["limit", "3"],
    ]);
    expect(request!.body._tag).toBe("Empty");
  });

  test("a label plus query on a single-resource GET", async () => {
    const { result, requests } = run(
      GetCustomer({ customer: "cus_123", expand: ["sources"] }),
      () => json({ id: "cus_123", object: "customer" }),
    );
    await result;
    expect(requests[0]!.url.pathname).toBe("/v1/customers/cus_123");
    expect([...requests[0]!.url.searchParams.entries()]).toEqual([["expand[]", "sources"]]);
  });

  test("GET inputs never carry a body: unknown keys flatten into the query", async () => {
    const { result, requests } = run(
      GetCustomers({ limit: 1, extra: { nested: true }, tags: ["a"] } as Parameters<
        typeof GetCustomers
      >[0]),
      () => json({ object: "list", data: [], has_more: false, url: "/v1/customers" }),
    );
    await result;
    expect([...requests[0]!.url.searchParams.entries()]).toEqual([
      ["limit", "1"],
      ["extra[nested]", "true"],
      ["tags[]", "a"],
    ]);
    expect(requests[0]!.body._tag).toBe("Empty");
  });
});

describe("JSON (/v2) and multipart bodies", () => {
  test("/v2 operations send a JSON body", async () => {
    const { result, requests } = run(
      CreateBillingMeterEvent2({
        event_name: "api_calls",
        payload: { stripe_customer_id: "cus_1", value: "25" },
      }),
      () => json({ object: "v2.billing.meter_event", event_name: "api_calls" }),
    );
    await result;
    const [request] = requests;
    expect(request!.url.pathname).toBe("/v2/billing/meter_events");
    expect(request!.body).toMatchObject({ contentType: "application/json" });
    expect(JSON.parse(textOf(request!)!)).toEqual({
      event_name: "api_calls",
      payload: { stripe_customer_id: "cus_1", value: "25" },
    });
    expect(request!.headers["authorization"]).toBe(`Bearer ${API_KEY}`);
  });

  test("POST /v1/files is multipart form-data with the file part", async () => {
    const file = new File(["%PDF-1.4"], "evidence.pdf", { type: "application/pdf" });
    const { result, requests } = run(
      CreateFile({ file: file as unknown as string, purpose: "dispute_evidence" }),
      () => json({ id: "file_1", object: "file" }),
    );
    await result;
    const [request] = requests;
    expect(request!.method).toBe("POST");
    expect(request!.url.href).toBe(`${BASE_URL}/v1/files`);
    expect(request!.headers["authorization"]).toBe(`Bearer ${API_KEY}`);
    expect(request!.headers["accept"]).toBe("application/json");
    if (request!.body._tag !== "FormData") throw new Error("expected multipart");
    const form = request!.body.formData;
    expect(form.get("purpose")).toBe("dispute_evidence");
    const part = form.get("file") as File;
    expect(part.name).toBe("evidence.pdf");
    expect(await part.text()).toBe("%PDF-1.4");
  });
});

describe("Request headers", () => {
  test("Authorization is the bearer API key and Accept is JSON", async () => {
    const { result, requests } = run(GetCustomer({ customer: "cus_1" }));
    await result;
    expect(requests[0]!.headers["authorization"]).toBe(`Bearer ${API_KEY}`);
    expect(requests[0]!.headers["accept"]).toBe("application/json");
    expect(requests[0]!.headers["idempotency-key"]).toBeUndefined();
    expect(requests[0]!.headers["stripe-version"]).toBeUndefined();
    expect(requests[0]!.headers["stripe-account"]).toBeUndefined();
  });

  test("withRequestOptions sets Idempotency-Key, Stripe-Version and Stripe-Account", async () => {
    const { result, requests } = run(
      CreateCustomer({ name: "x" }).pipe(
        withRequestOptions({
          idempotencyKey: "idem-1",
          apiVersion: "2025-01-27.acacia",
          stripeAccount: "acct_123",
        }),
      ),
    );
    await result;
    expect(requests[0]!.headers).toMatchObject({
      "idempotency-key": "idem-1",
      "stripe-version": "2025-01-27.acacia",
      "stripe-account": "acct_123",
    });
    expect(requests[0]!.headers["stripe-context"]).toBeUndefined();
  });

  test("withRequestOptions sets Stripe-Context", async () => {
    const { result, requests } = run(
      GetCustomer({ customer: "cus_1" }).pipe(withRequestOptions({ stripeContext: "ctx_1" })),
    );
    await result;
    expect(requests[0]!.headers["stripe-context"]).toBe("ctx_1");
    expect(requests[0]!.headers["stripe-account"]).toBeUndefined();
  });

  test("multipart requests carry the request options too", async () => {
    const { result, requests } = run(
      CreateFile({
        file: new File(["x"], "x.txt") as unknown as string,
        purpose: "dispute_evidence",
      }).pipe(withRequestOptions({ idempotencyKey: "idem-file" })),
    );
    await result;
    expect(requests[0]!.headers["idempotency-key"]).toBe("idem-file");
  });
});

describe("Error envelope decoding", () => {
  const envelope = (error: Record<string, unknown>) => ({ error });
  const call = () => GetCustomer({ customer: "cus_1" });

  test("card_error maps to CardError with the card fields", async () => {
    const error = await runError(call(), () =>
      json(
        envelope({
          type: "card_error",
          code: "card_declined",
          decline_code: "insufficient_funds",
          message: "Your card has insufficient funds.",
          charge: "ch_1",
          param: "card",
          doc_url: "https://stripe.com/docs/error-codes/card-declined",
          advice_code: "try_again_later",
          payment_method_type: "card",
          request_log_url: "https://dashboard.stripe.com/logs/req_1",
        }),
        402,
      ),
    );
    expect(error).toBeInstanceOf(CardError);
    expect(error).toMatchObject({
      code: "card_declined",
      decline_code: "insufficient_funds",
      message: "Your card has insufficient funds.",
      charge: "ch_1",
      param: "card",
      advice_code: "try_again_later",
      payment_method_type: "card",
      request_log_url: "https://dashboard.stripe.com/logs/req_1",
    });
  });

  test("idempotency_error, invalid_request_error and api_error map by type", async () => {
    const idempotency = await runError(call(), () =>
      json(envelope({ type: "idempotency_error", message: "Keys reused." }), 400),
    );
    expect(idempotency).toBeInstanceOf(IdempotencyError);
    expect(idempotency).toMatchObject({ message: "Keys reused." });

    const invalid = await runError(call(), () =>
      json(
        envelope({
          type: "invalid_request_error",
          code: "resource_missing",
          message: "No such customer: 'cus_1'",
          param: "id",
        }),
        404,
      ),
    );
    expect(invalid).toBeInstanceOf(InvalidRequestError);
    expect(invalid).toMatchObject({
      code: "resource_missing",
      message: "No such customer: 'cus_1'",
      param: "id",
    });

    const api = await runError(call(), () =>
      json(envelope({ type: "api_error", message: "Something went wrong." }), 500),
    );
    expect(api).toBeInstanceOf(ApiError);
  });

  test("an unrecognised type falls back to 402 / 424 Stripe statuses", async () => {
    const payment = await runError(call(), () =>
      json(
        envelope({ type: "other_error", code: "c", message: "m", decline_code: "d", param: "p" }),
        402,
      ),
    );
    expect(payment).toBeInstanceOf(PaymentError);
    expect(payment).toMatchObject({ code: "c", message: "m", decline_code: "d", param: "p" });

    const dependency = await runError(call(), () =>
      json(envelope({ type: "other_error", message: "upstream" }), 424),
    );
    expect(dependency).toBeInstanceOf(ExternalDependencyFailed);
  });

  test("an unrecognised type falls back to core status classes with Retry-After", async () => {
    const throttled = await runError(call(), () =>
      json(envelope({ type: "rate_limit", message: "Too many." }), 429, { "Retry-After": "4" }),
    );
    expect(throttled).toBeInstanceOf(TooManyRequests);
    expect(throttled).toMatchObject({ message: "Too many." });
    expect(Duration.toSeconds((throttled as TooManyRequests).retryAfter!)).toBe(4);

    const notFound = await runError(call(), () =>
      json(envelope({ type: "other_error", message: "gone" }), 404),
    );
    expect(notFound).toBeInstanceOf(NotFound);
  });

  test("an unmapped 5xx is InternalServerError", async () => {
    const error = await runError(call(), () =>
      json(envelope({ type: "other_error", message: "proxy" }), 520),
    );
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error).toMatchObject({ message: "proxy" });
  });

  test("an unrecognised type at an unmapped 4xx is UnknownStripeError with the fields", async () => {
    const body = envelope({ type: "other_error", code: "c", message: "m", param: "p" });
    const error = await runError(call(), () => json(body, 418));
    expect(error).toBeInstanceOf(UnknownStripeError);
    expect(error).toMatchObject({ type: "other_error", code: "c", message: "m", param: "p", body });
  });

  test("a body without the envelope is UnknownStripeError with the raw body", async () => {
    const html = await runError(
      call(),
      () => new Response("<html>bad gateway</html>", { status: 502 }),
    );
    expect(html).toBeInstanceOf(UnknownStripeError);
    expect(html).toMatchObject({ body: "<html>bad gateway</html>" });

    const other = await runError(call(), () => json({ message: "nope" }, 400));
    expect(other).toBeInstanceOf(UnknownStripeError);
    expect(other).toMatchObject({ body: { message: "nope" } });
  });

  test("per-operation matchers win over the envelope type", async () => {
    const message =
      "This product cannot be deleted because it has one or more user-created prices.";
    const error = await runError(DeleteProduct({ id: "prod_1" }), () =>
      json(envelope({ type: "invalid_request_error", message }), 400),
    );
    expect(error).toBeInstanceOf(ProductHasPrices);
    expect(error).toMatchObject({ message });
  });

  test("per-operation matchers need their status and message", async () => {
    const otherMessage = await runError(DeleteProduct({ id: "prod_1" }), () =>
      json(envelope({ type: "invalid_request_error", message: "No such product" }), 400),
    );
    expect(otherMessage).toBeInstanceOf(InvalidRequestError);

    const otherStatus = await runError(DeleteProduct({ id: "prod_1" }), () =>
      json(envelope({ type: "invalid_request_error", message: "has user-created prices" }), 409),
    );
    expect(otherStatus).toBeInstanceOf(InvalidRequestError);
  });
});

describe("Success decoding", () => {
  test("the 2xx body is the payload, with no envelope", async () => {
    const customer = { id: "cus_1", object: "customer", email: "a@example.test" };
    const { result } = run(GetCustomer({ customer: "cus_1" }), () => json(customer));
    expect(await result).toEqual(customer);
  });

  // GetCustomer's output is a Customer | DeletedCustomer union, so strict
  // checks use CreateCustomer (output: Customer).
  test("strict mode fails a mismatched payload with StripeParseError", async () => {
    const { result } = run(
      CreateCustomer({}).pipe(Effect.provide(ResponseValidation.strict), Effect.flip),
      () => json({ id: 42 }),
    );
    expect(await result).toBeInstanceOf(StripeParseError);
  });

  test("a non-JSON 2xx: lenient returns the text, strict fails", async () => {
    const lenient = run(CreateCustomer({}), () => new Response("ok"));
    expect((await lenient.result) as unknown).toBe("ok");
    const strict = run(
      CreateCustomer({}).pipe(Effect.provide(ResponseValidation.strict), Effect.flip),
      () => new Response("ok"),
    );
    expect(await strict.result).toBeInstanceOf(StripeParseError);
  });

  test("a body cut off mid-secret fails in both modes without exposing it", async () => {
    for (const mode of [ResponseValidation.lenient, ResponseValidation.strict]) {
      const { result } = run(
        CreateEphemeralKey({}).pipe(Effect.provide(mode), Effect.flip),
        () => new Response(`{"secret":"${SECRET}`),
      );
      const error = await result;
      expect(error).toBeInstanceOf(StripeParseError);
      expect(error).toMatchObject({ body: "[REDACTED]" });
      expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
    }
  });

  test("a strict mismatch with a sensitive output fails without exposing the body", async () => {
    const { result } = run(
      CreateEphemeralKey({}).pipe(Effect.provide(ResponseValidation.strict), Effect.flip),
      () => json({ secret: SECRET }),
    );
    const error = await result;
    expect(error).toBeInstanceOf(StripeParseError);
    expect(error).toMatchObject({ body: "[REDACTED]" });
    expect(inspect(error, { depth: Infinity })).not.toContain(SECRET);
  });
});
