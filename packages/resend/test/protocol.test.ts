import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "../src/credentials.ts";
import { USER_AGENT, type ResendOpContext } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import {
  cancelEmail,
  createApiKey,
  createEmail,
  createEmailBatch,
  deleteBroadcast,
  deleteContactSegment,
  getEmail,
  getEmailReceiving,
  listContacts,
  listDomains,
  updateContactTopics,
  updateEmail,
} from "../src/services/resend.ts";

// Response bodies below are from a live run against the Resend API
// (2026-10-29), ids kept, secrets replaced.

const API_KEY = "re_test_key";

interface Recorded {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: HttpClientRequest.HttpClientRequest["body"];
}

const json = (value: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });

const resendError = (status: number, name: string, message: string) =>
  json({ statusCode: status, message, name }, status);

const run = <A, E>(
  operation: Effect.Effect<A, E, ResendOpContext>,
  respond: (request: Recorded, attempt: number) => Response,
  { retry = false }: { retry?: boolean } = {},
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
      return HttpClientResponse.fromWeb(request, respond(recorded, requests.length));
    }),
  );
  const layers = Layer.mergeAll(
    Layer.succeed(HttpClient.HttpClient, client),
    fromApiKey({ apiKey: Redacted.make(API_KEY) }),
  );
  const result = Effect.runPromise(
    Effect.result(
      (retry ? operation : operation.pipe(Retry.none)).pipe(
        Effect.provide(ResponseValidation.strict),
        Effect.provide(layers),
      ),
    ),
  );
  return { result, requests };
};

const bodyJson = (request: Recorded): unknown => {
  const body = request.body as { _tag: string; body?: Uint8Array };
  return JSON.parse(new TextDecoder().decode(body.body));
};

const failureTag = async (result: Promise<any>) => {
  const r = await result;
  expect(r._tag).toBe("Failure");
  return r.failure._tag as string;
};

describe("requests", () => {
  test("every request carries the bearer key and a User-Agent", async () => {
    const { result, requests } = run(listDomains({}), () =>
      json({ object: "list", has_more: false, data: [] }),
    );
    expect((await result)._tag).toBe("Success");
    expect(requests[0]!.headers.authorization).toBe(`Bearer ${API_KEY}`);
    expect(requests[0]!.headers["user-agent"]).toBe(USER_AGENT);
  });

  test("createEmail sends Idempotency-Key as a header, not in the body", async () => {
    const { result, requests } = run(
      createEmail({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "Hello",
        text: "Hi",
        idempotencyKey: "order-42",
      }),
      () => json({ id: "01a185a9-f053-7ec0-b4a8-88987cc2330d" }),
    );
    expect((await result)._tag).toBe("Success");
    expect(requests[0]!.headers["idempotency-key"]).toBe("order-42");
    expect(bodyJson(requests[0]!)).not.toHaveProperty("idempotencyKey");
  });

  test("createEmailBatch sends x-batch-validation and returns permissive errors", async () => {
    const { result, requests } = run(
      createEmailBatch({
        batchValidation: "permissive",
        body: [
          {
            from: "onboarding@resend.dev",
            to: ["delivered@resend.dev"],
            subject: "ok",
            text: "ok",
          },
          { from: "onboarding@resend.dev", to: ["not-an-email"], subject: "bad", text: "bad" },
        ],
      }),
      () =>
        json(
          {
            data: [{ id: "01a185aa-29be-71ef-94df-cb64677b6d31" }],
            errors: [{ index: 1, message: "Invalid `to` field." }],
          },
          202,
        ),
    );
    const r = await result;
    expect(r._tag).toBe("Success");
    expect(requests[0]!.headers["x-batch-validation"]).toBe("permissive");
    expect(Array.isArray(bodyJson(requests[0]!))).toBe(true);
    if (r._tag === "Success") expect(r.success.errors?.[0]?.index).toBe(1);
  });

  test("updateEmail sends scheduled_at in the body", async () => {
    const { result, requests } = run(
      updateEmail({ email_id: "01a185aa-112c-7981-a9bc-1757b0752483", scheduled_at: "in 3 hours" }),
      () => json({ object: "email", id: "01a185aa-112c-7981-a9bc-1757b0752483" }),
    );
    expect((await result)._tag).toBe("Success");
    expect(requests[0]!.method).toBe("PATCH");
    expect(bodyJson(requests[0]!)).toEqual({ scheduled_at: "in 3 hours" });
  });

  test("updateContactTopics sends the topic list as the bare body", async () => {
    const { result, requests } = run(
      updateContactTopics({
        contact_id: "ac29ff76-044b-4df9-b5ef-1c23981090a9",
        topics: [{ id: "b3c97066-1211-48e7-ad25-2a3edbeccc18", subscription: "opt_out" }],
      }),
      () => json({ object: "contact_topics", id: "ac29ff76-044b-4df9-b5ef-1c23981090a9" }),
    );
    expect((await result)._tag).toBe("Success");
    expect(requests[0]!.url.pathname).toBe("/contacts/ac29ff76-044b-4df9-b5ef-1c23981090a9/topics");
    expect(bodyJson(requests[0]!)).toEqual([
      { id: "b3c97066-1211-48e7-ad25-2a3edbeccc18", subscription: "opt_out" },
    ]);
  });
});

describe("responses", () => {
  test("getEmail decodes strictly, nulls included", async () => {
    const { result } = run(getEmail({ email_id: "01a185a9-f053-7ec0-b4a8-88987cc2330d" }), () =>
      json({
        object: "email",
        id: "01a185a9-f053-7ec0-b4a8-88987cc2330d",
        to: ["delivered@resend.dev"],
        from: "Probe <onboarding@resend.dev>",
        created_at: "2026-10-29 03:17:49.418000+00",
        subject: "Probe",
        bcc: null,
        cc: null,
        reply_to: null,
        last_event: "delivered",
        scheduled_at: null,
        message_id: "<010001a185a9f1b3-452a95fa@email.amazonses.com>",
        html: "<p>probe</p>",
        text: "probe",
        tags: [{ name: "run", value: "probe" }],
      }),
    );
    const r = await result;
    expect(r._tag).toBe("Success");
    if (r._tag === "Success") expect(r.success.tags?.[0]?.name).toBe("run");
  });

  test("getEmailReceiving decodes authentication results and the raw download link", async () => {
    const { result } = run(
      getEmailReceiving({ email_id: "5124d7ff-eac2-498c-90d1-358896479bab" }),
      () =>
        json({
          object: "email",
          id: "5124d7ff-eac2-498c-90d1-358896479bab",
          to: ["inbox@example.com"],
          from: "probe@example.com",
          created_at: "2026-10-29T04:34:39.244Z",
          subject: "Probe inbound",
          message_id: "<010001a185f042af-027bf610@email.amazonses.com>",
          bcc: [],
          cc: [],
          reply_to: [],
          html: null,
          html_format: "data_uri",
          text: "inbound probe",
          headers: { subject: "Probe inbound" },
          received_for: ["inbox@example.com"],
          authentication: { spf: "pass", dkim: "pass", dmarc: "pass" },
          raw: {
            download_url: "https://cdn.resend.app/receiving/raw/0cf76d68d35211f1a9f412ffccdbde17",
            expires_at: "2026-10-29T05:34:44.774Z",
          },
          attachments: [
            {
              id: "5ae20ca9-8abc-4a76-9a18-2a92a34c0e6d",
              filename: "probe.txt",
              content_type: "text/plain",
              content_id: null,
              content_disposition: "attachment",
              size: 17,
            },
          ],
        }),
    );
    const r = await result;
    expect(r._tag).toBe("Success");
    if (r._tag === "Success") {
      expect(r.success.authentication?.dmarc).toBe("pass");
      expect(r.success.raw?.expires_at).toBe("2026-10-29T05:34:44.774Z");
    }
  });

  test("createApiKey delivers the token as Redacted", async () => {
    const { result } = run(createApiKey({ name: "probe", permission: "sending_access" }), () =>
      json(
        { id: "f00a3339-abd4-4db4-8aca-3b444c894f5d", object: "api_key", token: "re_secret_value" },
        201,
      ),
    );
    const r = await result;
    expect(r._tag).toBe("Success");
    if (r._tag === "Success") {
      expect(Redacted.isRedacted(r.success.token)).toBe(true);
      expect(String(r.success.token)).not.toContain("re_secret_value");
    }
  });
});

describe("errors", () => {
  test("a sending-only key surfaces as RestrictedApiKey", async () => {
    const { result } = run(listDomains({}), () =>
      resendError(401, "restricted_api_key", "This API key is restricted to only send emails"),
    );
    expect(await failureTag(result)).toBe("RestrictedApiKey");
  });

  test("an unknown key surfaces as InvalidApiKey", async () => {
    const { result } = run(listDomains({}), () =>
      resendError(400, "validation_error", "API key is invalid"),
    );
    expect(await failureTag(result)).toBe("InvalidApiKey");
  });

  test("a not-found names the resource the message names", async () => {
    const input = {
      contact_id: "ac29ff76-044b-4df9-b5ef-1c23981090a9",
      segment_id: "e72c8dc2-66f1-41c3-8106-e4d64d4d15de",
    };
    const contact = run(deleteContactSegment(input), () =>
      resendError(404, "not_found", "Contact not found"),
    );
    expect(await failureTag(contact.result)).toBe("ContactNotFound");
    const segment = run(deleteContactSegment(input), () =>
      resendError(404, "not_found", "Audience not found"),
    );
    expect(await failureTag(segment.result)).toBe("SegmentNotFound");
  });

  test("an unknown pagination cursor is PaginationCursorNotFound", async () => {
    const { result } = run(listContacts({ after: "00000000-0000-4000-8000-000000000000" }), () =>
      resendError(
        404,
        "not_found",
        "The pagination cursor references an object that does not exist.",
      ),
    );
    expect(await failureTag(result)).toBe("PaginationCursorNotFound");
  });

  test("sender and recipient refusals without a verified domain", async () => {
    const send = createEmail({
      from: "probe@example.com",
      to: ["a@example.com"],
      subject: "x",
      text: "x",
    });
    const sender = run(send, () =>
      resendError(
        403,
        "validation_error",
        "The example.com domain is not verified. Please, add and verify your domain on https://resend.com/domains",
      ),
    );
    expect(await failureTag(sender.result)).toBe("UnverifiedSender");
    const recipient = run(send, () =>
      resendError(
        422,
        "validation_error",
        "Invalid `to` field. Please use our testing email address instead of domains like `example.com`.",
      ),
    );
    expect(await failureTag(recipient.result)).toBe("TestingRecipientOnly");
  });

  test("a sent broadcast can't be deleted, and an unscheduled email can't be canceled", async () => {
    const broadcast = run(deleteBroadcast({ id: "260b02dc-0000-4000-8000-000000000000" }), () =>
      resendError(403, "validation_error", "Only draft or scheduled broadcasts can be deleted"),
    );
    expect(await failureTag(broadcast.result)).toBe("BroadcastNotDeletable");
    const email = run(cancelEmail({ email_id: "01a185aa-112c-7981-a9bc-1757b0752483" }), () =>
      resendError(422, "validation_error", "Email is not scheduled"),
    );
    expect(await failureTag(email.result)).toBe("EmailNotScheduled");
  });

  test("a reused idempotency key is IdempotencyKeyReused", async () => {
    const { result } = run(
      createEmail({
        from: "onboarding@resend.dev",
        to: ["delivered@resend.dev"],
        subject: "x",
        text: "x",
        idempotencyKey: "k",
      }),
      () =>
        resendError(
          409,
          "invalid_idempotent_request",
          "This idempotency key has been used with this HTTP method and endpoint within the last 24 hours, but the request body was modified and doesn't match the original request.",
        ),
    );
    expect(await failureTag(result)).toBe("IdempotencyKeyReused");
  });

  test("a spent daily quota fails at once under the default retry policy", async () => {
    const { result, requests } = run(
      createEmail({
        from: "onboarding@resend.dev",
        to: ["delivered@resend.dev"],
        subject: "x",
        text: "x",
      }),
      () =>
        resendError(
          429,
          "daily_quota_exceeded",
          "You have exceeded your daily email sending quota.",
        ),
      { retry: true },
    );
    expect(await failureTag(result)).toBe("DailyQuotaExceeded");
    expect(requests).toHaveLength(1);
  });

  test("a rate limit is retried", async () => {
    const { result, requests } = run(
      listDomains({}),
      (_, attempt) =>
        attempt === 1
          ? json(
              { statusCode: 429, message: "Too many requests.", name: "rate_limit_exceeded" },
              429,
              { "retry-after": "0" },
            )
          : json({ object: "list", has_more: false, data: [] }),
      { retry: true },
    );
    expect((await result)._tag).toBe("Success");
    expect(requests).toHaveLength(2);
  });
});
