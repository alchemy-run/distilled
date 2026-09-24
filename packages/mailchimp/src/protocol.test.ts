import { describe, expect, test } from "bun:test";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import {
  type Credentials,
  CredentialsFromEnv,
  fromApiKey,
} from "./credentials.ts";
import * as Retry from "./retry.ts";
import {
  getList,
  getListMember,
  getListMembersInfo,
  setListMember,
  updateListMemberTags,
} from "./services/marketing.ts";
import { subscriberHash } from "./subscriber-hash.ts";

const API_KEY = "test-api-key-us21";

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

/** A fake HttpClient answering from `respond` and recording each request. */
const fake = (
  respond: (call: Call, index: number) => Response,
  credentials: Layer.Layer<Credentials> = fromApiKey({ apiKey: API_KEY }),
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
    headers: {
      "content-type":
        status >= 400 ? "application/problem+json" : "application/json",
    },
  });

const problem = (status: number, title: string, detail: string) =>
  json(
    {
      type: "https://mailchimp.com/developer/marketing/docs/errors/",
      title,
      status,
      detail,
      instance: "8c2d6c5e-8b1b-4c55-9a53-2ff1d3a6c0a1",
    },
    status,
  );

describe("Mailchimp protocol", () => {
  test("derives the data centre from the key and sends basic auth", async () => {
    const { calls, layer } = fake(() => json({ id: "a1b2c3" }));

    await Effect.runPromise(
      getList({ list_id: "a1b2c3" }).pipe(Effect.provide(layer)),
    );

    expect(calls[0]!.url.href).toBe(
      "https://us21.api.mailchimp.com/3.0/lists/a1b2c3",
    );
    const auth = calls[0]!.headers["authorization"]!;
    expect(auth.startsWith("Basic ")).toBe(true);
    expect(atob(auth.slice("Basic ".length)).split(":")[1]).toBe(API_KEY);
  });

  test("lets serverPrefix override the key's suffix", async () => {
    const { calls, layer } = fake(
      () => json({ id: "a1b2c3" }),
      fromApiKey({ apiKey: "no-suffix-here", serverPrefix: "us6" }),
    );

    await Effect.runPromise(
      getList({ list_id: "a1b2c3" }).pipe(Effect.provide(layer)),
    );

    expect(calls[0]!.url.host).toBe("us6.api.mailchimp.com");
  });

  test("reads CredentialsFromEnv from the installed ConfigProvider", async () => {
    const { calls, layer } = fake(
      () => json({ id: "a1b2c3" }),
      CredentialsFromEnv,
    );

    await Effect.runPromise(
      getList({ list_id: "a1b2c3" }).pipe(
        Effect.provide(layer),
        Effect.provide(
          ConfigProvider.layer(
            ConfigProvider.fromUnknown({ MAILCHIMP_API_KEY: "k-us14" }),
          ),
        ),
      ),
    );

    expect(calls[0]!.url.host).toBe("us14.api.mailchimp.com");
  });

  test("fails with ConfigError when the key names no data centre", async () => {
    const { calls, layer } = fake(
      () => json({}),
      fromApiKey({ apiKey: "0123456789abcdef" }),
    );

    const error = await Effect.runPromise(
      getList({ list_id: "a1b2c3" }).pipe(Effect.provide(layer), Effect.flip),
    );

    expect(error._tag).toBe("ConfigError");
    expect(calls).toHaveLength(0);
  });

  test("upserts a member with PUT on the subscriber hash, merge tags verbatim", async () => {
    const email = "Ada.Lovelace@Example.com";
    const hash = subscriberHash(email);
    const { calls, layer } = fake(() =>
      json({
        id: hash,
        email_address: email.toLowerCase(),
        status: "subscribed",
        merge_fields: { FNAME: "Ada", PHONE: "" },
        unsubscribe_reason: null,
        last_note: null,
      }),
    );

    const member = await Effect.runPromise(
      setListMember({
        list_id: "a1b2c3",
        subscriber_hash: hash,
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: { FNAME: "Ada" },
      }).pipe(Effect.provide(layer)),
    );

    expect(calls[0]!.method).toBe("PUT");
    expect(calls[0]!.url.pathname).toBe(`/3.0/lists/a1b2c3/members/${hash}`);
    expect(calls[0]!.body).toEqual({
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: { FNAME: "Ada" },
    });
    expect(member.merge_fields).toEqual({ FNAME: "Ada", PHONE: "" });
  });

  test("posts tags and accepts the empty 204", async () => {
    const { calls, layer } = fake(() => new Response(null, { status: 204 }));

    await Effect.runPromise(
      updateListMemberTags({
        list_id: "a1b2c3",
        subscriber_hash: subscriberHash("ada@example.com"),
        tags: [
          { name: "buyer", status: "active" },
          { name: "renter", status: "inactive" },
        ],
      }).pipe(Effect.provide(layer)),
    );

    expect(calls[0]!.method).toBe("POST");
    expect(calls[0]!.url.pathname).toMatch(
      /^\/3\.0\/lists\/a1b2c3\/members\/[0-9a-f]{32}\/tags$/,
    );
    expect(calls[0]!.body).toEqual({
      tags: [
        { name: "buyer", status: "active" },
        { name: "renter", status: "inactive" },
      ],
    });
  });

  test("maps a 404 problem document to NotFound", async () => {
    const { layer } = fake(() =>
      problem(
        404,
        "Resource Not Found",
        "The requested resource could not be found.",
      ),
    );

    const error = await Effect.runPromise(
      getListMember({
        list_id: "a1b2c3",
        subscriber_hash: subscriberHash("nobody@example.com"),
      }).pipe(Effect.provide(layer), Effect.flip),
    );

    expect(error._tag).toBe("NotFound");
    expect(error.message).toBe("The requested resource could not be found.");
  });

  test("folds field errors into a 400's message", async () => {
    const { layer } = fake(() =>
      json(
        {
          type: "https://mailchimp.com/developer/marketing/docs/errors/",
          title: "Invalid Resource",
          status: 400,
          detail: "The resource submitted could not be validated.",
          instance: "0f1b",
          errors: [
            {
              field: "email_address",
              message: "This value should not be blank.",
            },
          ],
        },
        400,
      ),
    );

    const error = await Effect.runPromise(
      setListMember({
        list_id: "a1b2c3",
        subscriber_hash: "x",
        email_address: "",
        status_if_new: "subscribed",
      }).pipe(Effect.provide(layer), Effect.flip),
    );

    expect(error._tag).toBe("BadRequest");
    expect(error.message).toContain(
      "email_address: This value should not be blank.",
    );
  });

  for (const [status, tag] of [
    [401, "Unauthorized"],
    [403, "Forbidden"],
    [429, "TooManyRequests"],
    [503, "ServiceUnavailable"],
  ] as const) {
    test(`maps ${status} to ${tag}`, async () => {
      const { calls, layer } = fake(() =>
        problem(status, "Nope", `status ${status}`),
      );

      const error = await Effect.runPromise(
        getList({ list_id: "a1b2c3" }).pipe(
          Retry.none,
          Effect.provide(layer),
          Effect.flip,
        ),
      );

      expect(error._tag).toBe(tag);
      expect(calls).toHaveLength(1);
    });
  }

  test("retries a 429 under the throttling policy", async () => {
    const { calls, layer } = fake((_, i) =>
      i === 0
        ? new Response(
            JSON.stringify({ status: 429, title: "Too Many Requests" }),
            { status: 429, headers: { "retry-after": "0" } },
          )
        : json({ id: "a1b2c3" }),
    );

    const list = await Effect.runPromise(
      getList({ list_id: "a1b2c3" }).pipe(
        Retry.throttling,
        Effect.provide(layer),
      ),
    );

    expect(list.id).toBe("a1b2c3");
    expect(calls).toHaveLength(2);
  });

  test("walks members with count/offset until total_items", async () => {
    const { calls, layer } = fake((call) => {
      const offset = Number(call.url.searchParams.get("offset"));
      const members = [offset, offset + 1]
        .filter((i) => i < 5)
        .map((i) => ({ id: `m${i}`, email_address: `m${i}@example.com` }));
      return json({ members, list_id: "a1b2c3", total_items: 5 });
    });

    const members = await Effect.runPromise(
      Stream.runCollect(
        getListMembersInfo.items({ list_id: "a1b2c3", count: 2 }),
      ).pipe(Effect.provide(layer)),
    );

    expect([...members].map((m) => m.id)).toEqual([
      "m0",
      "m1",
      "m2",
      "m3",
      "m4",
    ]);
    expect(calls.map((c) => c.url.searchParams.get("offset"))).toEqual([
      "0",
      "2",
      "4",
    ]);
  });
});
