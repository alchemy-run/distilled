import { createHmac } from "node:crypto";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { constructEvent, verifySignature, type WebhookEvent } from "../src/webhooks.ts";

// The example delivery in Resend's docs (webhooks/verify-webhooks-requests),
// signed with the Standard Webhooks reference secret.
const SECRET = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";
const ID = "msg_p5jXN8AQM9LWM0D4loKWxJek";
const TIMESTAMP = "1614265330";
const PAYLOAD = '{"test": 2432232314}';
const SIGNATURE = "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=";

const headers = { id: ID, timestamp: TIMESTAMP, signature: SIGNATURE };

const sign = (id: string, timestamp: string, payload: string) =>
  `v1,${createHmac("sha256", Buffer.from(SECRET.slice("whsec_".length), "base64"))
    .update(`${id}.${timestamp}.${payload}`)
    .digest("base64")}`;

const failure = <A, E>(effect: Effect.Effect<A, E>) =>
  Effect.runPromise(Effect.flip(effect)) as Promise<E & { _tag: string; message: string }>;

describe("verifySignature", () => {
  test("accepts the docs example delivery", async () => {
    await Effect.runPromise(
      verifySignature({ payload: PAYLOAD, headers, secret: SECRET, toleranceSeconds: 0 }),
    );
  });

  test("accepts a Redacted secret, a secret without whsec_, and byte payloads", async () => {
    await Effect.runPromise(
      verifySignature({
        payload: new TextEncoder().encode(PAYLOAD),
        headers,
        secret: Redacted.make(SECRET.slice("whsec_".length)),
        toleranceSeconds: 0,
      }),
    );
  });

  test("reads svix-* and webhook-* names from Headers and plain records", async () => {
    const fetchHeaders = new Headers({
      "Svix-Id": ID,
      "Svix-Timestamp": TIMESTAMP,
      "Svix-Signature": SIGNATURE,
    });
    await Effect.runPromise(
      verifySignature({
        payload: PAYLOAD,
        headers: fetchHeaders,
        secret: SECRET,
        toleranceSeconds: 0,
      }),
    );
    await Effect.runPromise(
      verifySignature({
        payload: PAYLOAD,
        headers: {
          "webhook-id": ID,
          "webhook-timestamp": TIMESTAMP,
          "webhook-signature": SIGNATURE,
        },
        secret: SECRET,
        toleranceSeconds: 0,
      }),
    );
  });

  test("accepts a header carrying several signatures when one matches", async () => {
    await Effect.runPromise(
      verifySignature({
        payload: PAYLOAD,
        headers: { ...headers, signature: `v1,bm90IGl0 v2,abc ${SIGNATURE}` },
        secret: SECRET,
        toleranceSeconds: 0,
      }),
    );
  });

  test("rejects a tampered payload", async () => {
    const error = await failure(
      verifySignature({ payload: '{"test": 1}', headers, secret: SECRET, toleranceSeconds: 0 }),
    );
    expect(error._tag).toBe("ResendWebhookSignatureError");
    expect(error.message).toContain("No v1 signature matches");
  });

  test("rejects another endpoint's secret", async () => {
    const error = await failure(
      verifySignature({
        payload: PAYLOAD,
        headers,
        secret: "whsec_" + Buffer.from("another-endpoint-secret").toString("base64"),
        toleranceSeconds: 0,
      }),
    );
    expect(error._tag).toBe("ResendWebhookSignatureError");
  });

  test("rejects missing headers and headers without a v1 signature", async () => {
    const missing = await failure(
      verifySignature({ payload: PAYLOAD, headers: new Headers(), secret: SECRET }),
    );
    expect(missing.message).toContain("headers are required");
    const noV1 = await failure(
      verifySignature({
        payload: PAYLOAD,
        headers: { ...headers, signature: "v2,abc" },
        secret: SECRET,
        toleranceSeconds: 0,
      }),
    );
    expect(noV1.message).toContain("no v1 signature");
  });

  test("rejects a delivery outside the tolerance window, in either direction", async () => {
    const old = await failure(verifySignature({ payload: PAYLOAD, headers, secret: SECRET }));
    expect(old.message).toContain("tolerance window");
    const future = String(Math.floor(Date.now() / 1000) + 600);
    const early = await failure(
      verifySignature({
        payload: PAYLOAD,
        headers: { id: ID, timestamp: future, signature: sign(ID, future, PAYLOAD) },
        secret: SECRET,
      }),
    );
    expect(early.message).toContain("tolerance window");
  });

  test("accepts a fresh delivery under the default tolerance", async () => {
    const now = String(Math.floor(Date.now() / 1000));
    await Effect.runPromise(
      verifySignature({
        payload: PAYLOAD,
        headers: { id: ID, timestamp: now, signature: sign(ID, now, PAYLOAD) },
        secret: SECRET,
      }),
    );
  });

  test("rejects a malformed timestamp and a secret that is not base64", async () => {
    const timestamp = await failure(
      verifySignature({
        payload: PAYLOAD,
        headers: { ...headers, timestamp: "1614265330.5" },
        secret: SECRET,
      }),
    );
    expect(timestamp.message).toContain("svix-timestamp header is invalid");
    const secret = await failure(
      verifySignature({ payload: PAYLOAD, headers, secret: "whsec_%%%", toleranceSeconds: 0 }),
    );
    expect(secret.message).toContain("not a whsec_ base64 secret");
  });
});

describe("constructEvent", () => {
  test("returns the payload, narrowed on type", async () => {
    const payload = JSON.stringify({
      type: "email.bounced",
      created_at: "2026-10-29T00:00:00.000Z",
      data: {
        email_id: "4ef9a417-02e9-4d39-ad75-9611e0fcc33c",
        created_at: "2026-10-29T00:00:00.000Z",
        from: "Acme <onboarding@resend.dev>",
        to: ["bounced@resend.dev"],
        subject: "Hello",
        bounce: {
          diagnosticCode: ["smtp; 550 5.1.1 user unknown"],
          message: "The recipient's mail server permanently rejected the email.",
          subType: "General",
          type: "Permanent",
        },
      },
    });
    const event: WebhookEvent = await Effect.runPromise(
      constructEvent({
        payload,
        headers: { id: ID, timestamp: TIMESTAMP, signature: sign(ID, TIMESTAMP, payload) },
        secret: SECRET,
        toleranceSeconds: 0,
      }),
    );
    expect(event.type).toBe("email.bounced");
    if (event.type === "email.bounced") expect(event.data.bounce.type).toBe("Permanent");
  });

  test("fails with a parse error on a signed body that is not an event", async () => {
    const error = await failure(
      constructEvent({ payload: PAYLOAD, headers, secret: SECRET, toleranceSeconds: 0 }),
    );
    expect(error._tag).toBe("ResendWebhookPayloadParseError");
  });

  test("checks the signature before parsing", async () => {
    const error = await failure(
      constructEvent({ payload: "not json", headers, secret: SECRET, toleranceSeconds: 0 }),
    );
    expect(error._tag).toBe("ResendWebhookSignatureError");
  });
});
