import { InternalServerError, NotFound } from "@distilled.cloud/core/errors";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { beforeEach, describe, expect, test } from "vitest";
import { layer as credentialsLayer, type Config } from "./credentials.ts";
import { AcmeParseError, UnknownAcmeError } from "./errors.ts";
import { base64url, base64urlDecode, generateAccountKey, type Jwk } from "./jose.ts";
import { resetProtocolCaches, type AcmeOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import {
  AcmeBadNonce,
  AcmeMalformed,
  AcmeRateLimited,
  downloadCertificate,
  getDirectory,
  getOrder,
  newAccount,
  newNonce,
  newOrder,
  revokeCertificate,
} from "./services/acme.ts";

interface Recorded {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
  readonly contentType: string | undefined;
}

interface Jws {
  readonly protected: string;
  readonly payload: string;
  readonly signature: string;
}

interface ProtectedHeader {
  readonly alg: string;
  readonly nonce?: string;
  readonly url: string;
  readonly kid?: string;
  readonly jwk?: Record<string, unknown>;
}

type Handler = (request: Recorded) => Response;

const decoder = new TextDecoder();

const bodyOf = (request: HttpClientRequest.HttpClientRequest) => {
  const body = request.body;
  if (body._tag === "Uint8Array") {
    return { text: decoder.decode(body.body), contentType: body.contentType };
  }
  return { text: undefined, contentType: undefined };
};

let ca = 0;

/** A scripted CA: each test gets its own directory URL so process-wide caches never leak. */
const makeCa = () => {
  const base = `https://ca${++ca}.test`;
  const urls = {
    directory: `${base}/directory`,
    newNonce: `${base}/acme/new-nonce`,
    newAccount: `${base}/acme/new-acct`,
    newOrder: `${base}/acme/new-order`,
    revokeCert: `${base}/acme/revoke-cert`,
    account: `${base}/acme/acct/1`,
    order: `${base}/acme/order/1`,
    cert: `${base}/acme/cert/1`,
  };
  const directory = {
    newNonce: urls.newNonce,
    newAccount: urls.newAccount,
    newOrder: urls.newOrder,
    revokeCert: urls.revokeCert,
    meta: { termsOfService: `${base}/tos` },
  };
  const requests: Recorded[] = [];
  let nonceCounter = 0;
  const handlers = new Map<string, Handler>();
  handlers.set(`GET ${urls.directory}`, () => Response.json(directory));
  handlers.set(
    `HEAD ${urls.newNonce}`,
    () =>
      new Response(null, { status: 200, headers: { "Replay-Nonce": `head-${++nonceCounter}` } }),
  );
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const { text, contentType } = bodyOf(request);
      const recorded: Recorded = {
        method: request.method,
        url: request.url,
        headers: { ...request.headers },
        body: text,
        contentType,
      };
      requests.push(recorded);
      const handler = handlers.get(`${request.method} ${request.url}`);
      const response = handler ? handler(recorded) : new Response("no route", { status: 599 });
      return HttpClientResponse.fromWeb(request, response);
    }),
  );
  return { urls, directory, requests, handlers, client };
};

type Ca = ReturnType<typeof makeCa>;

const run = <A, E>(
  ca: Ca,
  config: Omit<Config, "directoryUrl">,
  operation: Effect.Effect<A, E, AcmeOpContext>,
) =>
  Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, ca.client),
          credentialsLayer({ ...config, directoryUrl: ca.urls.directory }),
        ),
      ),
    ),
  );

const runError = <A, E>(
  ca: Ca,
  config: Omit<Config, "directoryUrl">,
  operation: Effect.Effect<A, E, AcmeOpContext>,
) => run(ca, config, Effect.flip(operation));

const json = (value: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(value), {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  });

const problem = (value: Record<string, unknown>, init: ResponseInit = {}) =>
  new Response(JSON.stringify(value), {
    ...init,
    headers: { "Content-Type": "application/problem+json", ...init.headers },
  });

const parseJws = (request: Recorded) => {
  expect(request.method).toBe("POST");
  expect(request.contentType).toBe("application/jose+json");
  const jws = JSON.parse(request.body!) as Jws;
  expect(Object.keys(jws).sort()).toEqual(["payload", "protected", "signature"]);
  const header = JSON.parse(decoder.decode(base64urlDecode(jws.protected))) as ProtectedHeader;
  const payload =
    jws.payload === "" ? undefined : JSON.parse(decoder.decode(base64urlDecode(jws.payload)));
  return { jws, header, payload };
};

const verify = async (jws: Jws, publicKey: JsonWebKey, alg: "ES256" | "RS256" | "HS256") => {
  const data = new TextEncoder().encode(`${jws.protected}.${jws.payload}`);
  const signature = base64urlDecode(jws.signature) as Uint8Array<ArrayBuffer>;
  if (alg === "HS256") {
    const key = await crypto.subtle.importKey(
      "raw",
      base64urlDecode(publicKey.k!) as Uint8Array<ArrayBuffer>,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    return crypto.subtle.verify("HMAC", key, signature, data);
  }
  const key = await crypto.subtle.importKey(
    "jwk",
    publicKey,
    alg === "ES256"
      ? { name: "ECDSA", namedCurve: "P-256" }
      : { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );
  return crypto.subtle.verify(
    alg === "ES256" ? { name: "ECDSA", hash: "SHA-256" } : { name: "RSASSA-PKCS1-v1_5" },
    key,
    signature,
    data,
  );
};

const publicOf = (jwk: Jwk): JsonWebKey =>
  jwk.kty === "RSA"
    ? { kty: "RSA", n: jwk.n, e: jwk.e }
    : { kty: "EC", crv: jwk.crv, x: jwk.x, y: jwk.y };

const posts = (ca: Ca) => ca.requests.filter((r) => r.method === "POST");
const heads = (ca: Ca) => ca.requests.filter((r) => r.method === "HEAD");
const directoryGets = (ca: Ca) =>
  ca.requests.filter((r) => r.method === "GET" && r.url === ca.urls.directory);

const order = (ca: Ca) => ({
  status: "pending",
  identifiers: [{ type: "dns", value: "example.test" }],
  authorizations: [`${ca.urls.order}/authz`],
  finalize: `${ca.urls.order}/finalize`,
});

let ecKey: Redacted.Redacted<string>;
let ecJwk: Jwk;

beforeEach(async () => {
  resetProtocolCaches();
  ecKey ??= await Effect.runPromise(generateAccountKey("ES256"));
  ecJwk ??= JSON.parse(Redacted.value(ecKey)) as Jwk;
});

describe("JWS request signing", () => {
  test("newAccount is a flattened JWS embedding the public JWK, signed by the account key", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () =>
      json({ status: "valid" }, { status: 201, headers: { Location: ca.urls.account } }),
    );
    const result = await run(
      ca,
      { accountKey: ecKey },
      newAccount({ contact: ["mailto:ops@example.test"], termsOfServiceAgreed: true }),
    );
    expect(result).toEqual({ status: "valid", location: ca.urls.account });

    expect(ca.requests.map((r) => `${r.method} ${r.url}`)).toEqual([
      `GET ${ca.urls.directory}`,
      `HEAD ${ca.urls.newNonce}`,
      `POST ${ca.urls.newAccount}`,
    ]);
    const post = posts(ca)[0]!;
    expect(post.headers["accept"]).toBe("application/json, application/pem-certificate-chain");
    const { jws, header, payload } = parseJws(post);
    expect(header).toEqual({
      alg: "ES256",
      nonce: "head-1",
      url: ca.urls.newAccount,
      jwk: { crv: "P-256", kty: "EC", x: ecJwk.x, y: ecJwk.y },
    });
    expect(header.jwk).not.toHaveProperty("d");
    expect(payload).toEqual({
      contact: ["mailto:ops@example.test"],
      termsOfServiceAgreed: true,
    });
    expect(await verify(jws, publicOf(ecJwk), "ES256")).toBe(true);
  });

  test("the signature does not verify under a different key or a tampered payload", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () => json({ status: "valid" }));
    await run(ca, { accountKey: ecKey }, newAccount({ termsOfServiceAgreed: true }));
    const { jws } = parseJws(posts(ca)[0]!);
    const other = JSON.parse(
      Redacted.value(await Effect.runPromise(generateAccountKey("ES256"))),
    ) as Jwk;
    expect(await verify(jws, publicOf(other), "ES256")).toBe(false);
    const tampered = {
      ...jws,
      payload: base64url(new TextEncoder().encode(JSON.stringify({ termsOfServiceAgreed: false }))),
    };
    expect(await verify(tampered, publicOf(ecJwk), "ES256")).toBe(false);
  });

  test("with a known account URL, later requests carry `kid` and no `jwk`", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newOrder}`, () =>
      json(order(ca), { status: 201, headers: { Location: ca.urls.order } }),
    );
    const result = await run(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      newOrder({ identifiers: [{ type: "dns", value: "example.test" }] }),
    );
    expect(result.location).toBe(ca.urls.order);
    expect(result.status).toBe("pending");
    const { jws, header, payload } = parseJws(posts(ca)[0]!);
    expect(header).toEqual({
      alg: "ES256",
      nonce: "head-1",
      url: ca.urls.newOrder,
      kid: ca.urls.account,
    });
    expect(payload).toEqual({ identifiers: [{ type: "dns", value: "example.test" }] });
    expect(await verify(jws, publicOf(ecJwk), "ES256")).toBe(true);
  });

  test("newAccount embeds the JWK even when an account URL is configured", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () => json({ status: "valid" }));
    await run(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      newAccount({ onlyReturnExisting: true }),
    );
    const { header } = parseJws(posts(ca)[0]!);
    expect(header.kid).toBeUndefined();
    expect(header.jwk).toEqual({ crv: "P-256", kty: "EC", x: ecJwk.x, y: ecJwk.y });
  });

  test("without an account URL, non-newAccount requests embed the JWK", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.revokeCert}`, () => new Response(null, { status: 200 }));
    await run(ca, { accountKey: ecKey }, revokeCertificate({ certificate: "MIIB", reason: 4 }));
    const { header, payload } = parseJws(posts(ca)[0]!);
    expect(header.url).toBe(ca.urls.revokeCert);
    expect(header.kid).toBeUndefined();
    expect(header.jwk).toBeDefined();
    expect(payload).toEqual({ certificate: "MIIB", reason: 4 });
  });

  test("POST-as-GET reads sign an empty payload to the label URL", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.order}`, () => json(order(ca)));
    const result = await run(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      getOrder({ url: ca.urls.order }),
    );
    expect(result.finalize).toBe(`${ca.urls.order}/finalize`);
    const { jws, header, payload } = parseJws(posts(ca)[0]!);
    expect(jws.payload).toBe("");
    expect(payload).toBeUndefined();
    expect(header.url).toBe(ca.urls.order);
    expect(header.kid).toBe(ca.urls.account);
    expect(await verify(jws, publicOf(ecJwk), "ES256")).toBe(true);
  });

  test("an RSA account key signs with RS256", async () => {
    const rsaKey = await Effect.runPromise(generateAccountKey("RS256"));
    const rsaJwk = JSON.parse(Redacted.value(rsaKey)) as Jwk;
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () => json({ status: "valid" }));
    await run(ca, { accountKey: rsaKey }, newAccount({ termsOfServiceAgreed: true }));
    const { jws, header } = parseJws(posts(ca)[0]!);
    expect(header.alg).toBe("RS256");
    expect(header.jwk).toEqual({ e: rsaJwk.e, kty: "RSA", n: rsaJwk.n });
    expect(await verify(jws, publicOf(rsaJwk), "RS256")).toBe(true);
  });

  test("an External Account Binding from the credentials is attached to newAccount", async () => {
    const hmacKey = base64url(crypto.getRandomValues(new Uint8Array(32)));
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () => json({ status: "valid" }));
    await run(
      ca,
      {
        accountKey: ecKey,
        externalAccountBinding: { keyId: "eab-kid", hmacKey: Redacted.make(hmacKey) },
      },
      newAccount({ termsOfServiceAgreed: true }),
    );
    const { jws, payload } = parseJws(posts(ca)[0]!);
    expect(await verify(jws, publicOf(ecJwk), "ES256")).toBe(true);
    const eab = payload.externalAccountBinding as Jws;
    const eabHeader = JSON.parse(decoder.decode(base64urlDecode(eab.protected)));
    expect(eabHeader).toEqual({ alg: "HS256", kid: "eab-kid", url: ca.urls.newAccount });
    expect(JSON.parse(decoder.decode(base64urlDecode(eab.payload)))).toEqual({
      crv: "P-256",
      kty: "EC",
      x: ecJwk.x,
      y: ecJwk.y,
    });
    expect(await verify(eab, { kty: "oct", k: hmacKey }, "HS256")).toBe(true);
  });

  test("a caller-built External Account Binding is not replaced", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () => json({ status: "valid" }));
    const own = { protected: "p", payload: "q", signature: "s" };
    await run(
      ca,
      {
        accountKey: ecKey,
        externalAccountBinding: { keyId: "eab-kid", hmacKey: Redacted.make("AAAA") },
      },
      newAccount({ externalAccountBinding: own }),
    );
    expect(parseJws(posts(ca)[0]!).payload.externalAccountBinding).toEqual(own);
  });

  test("an account key that is not a JWK fails with JoseError before any POST", async () => {
    const ca = makeCa();
    const error = await runError(
      ca,
      { accountKey: Redacted.make("not json") },
      newAccount({ termsOfServiceAgreed: true }),
    );
    expect(error).toMatchObject({ _tag: "JoseError" });
    expect(posts(ca)).toHaveLength(0);
  });
});

describe("Directory and nonce management", () => {
  test("the directory is fetched once per CA and reused", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.order}`, () => json(order(ca)));
    const config = { accountKey: ecKey, accountUrl: ca.urls.account };
    await run(ca, config, getOrder({ url: ca.urls.order }));
    await run(ca, config, getOrder({ url: ca.urls.order }));
    expect(directoryGets(ca)).toHaveLength(1);
  });

  test("Replay-Nonce from a response is used for the next request instead of HEAD newNonce", async () => {
    const ca = makeCa();
    let n = 0;
    ca.handlers.set(`POST ${ca.urls.order}`, () =>
      json(order(ca), { headers: { "Replay-Nonce": `reply-${++n}` } }),
    );
    const config = { accountKey: ecKey, accountUrl: ca.urls.account };
    await run(ca, config, getOrder({ url: ca.urls.order }));
    await run(ca, config, getOrder({ url: ca.urls.order }));
    await run(ca, config, getOrder({ url: ca.urls.order }));
    expect(heads(ca)).toHaveLength(1);
    expect(posts(ca).map((r) => parseJws(r).header.nonce)).toEqual([
      "head-1",
      "reply-1",
      "reply-2",
    ]);
  });

  test("a nonce is single-use: without a Replay-Nonce the next request fetches a fresh one", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.order}`, () => json(order(ca)));
    const config = { accountKey: ecKey, accountUrl: ca.urls.account };
    await run(ca, config, getOrder({ url: ca.urls.order }));
    await run(ca, config, getOrder({ url: ca.urls.order }));
    expect(heads(ca)).toHaveLength(2);
    expect(posts(ca).map((r) => parseJws(r).header.nonce)).toEqual(["head-1", "head-2"]);
  });

  test("a Replay-Nonce on the directory response seeds the cache", async () => {
    const ca = makeCa();
    ca.handlers.set(`GET ${ca.urls.directory}`, () =>
      json(ca.directory, { headers: { "Replay-Nonce": "from-directory" } }),
    );
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () => json({ status: "valid" }));
    await run(ca, { accountKey: ecKey }, newAccount({ termsOfServiceAgreed: true }));
    expect(heads(ca)).toHaveLength(0);
    expect(parseJws(posts(ca)[0]!).header.nonce).toBe("from-directory");
  });

  test("a Replay-Nonce on an error response is still cached", async () => {
    const ca = makeCa();
    let first = true;
    ca.handlers.set(`POST ${ca.urls.order}`, () => {
      if (first) {
        first = false;
        return problem(
          { type: "urn:ietf:params:acme:error:malformed", detail: "bad" },
          { status: 400, headers: { "Replay-Nonce": "after-error" } },
        );
      }
      return json(order(ca));
    });
    const config = { accountKey: ecKey, accountUrl: ca.urls.account };
    await runError(ca, config, getOrder({ url: ca.urls.order }));
    await run(ca, config, getOrder({ url: ca.urls.order }));
    expect(heads(ca)).toHaveLength(1);
    expect(parseJws(posts(ca)[1]!).header.nonce).toBe("after-error");
  });

  test("HEAD newNonce without a Replay-Nonce header fails with UnknownAcmeError", async () => {
    const ca = makeCa();
    ca.handlers.set(`HEAD ${ca.urls.newNonce}`, () => new Response(null, { status: 200 }));
    const error = await runError(
      ca,
      { accountKey: ecKey },
      newAccount({ termsOfServiceAgreed: true }),
    );
    expect(error).toBeInstanceOf(UnknownAcmeError);
    expect(posts(ca)).toHaveLength(0);
  });

  test("newNonce issues HEAD to the directory's newNonce URL and returns the header", async () => {
    const ca = makeCa();
    const result = await run(ca, { accountKey: ecKey }, newNonce({}));
    expect(result).toEqual({ replayNonce: "head-1" });
    expect(ca.requests.map((r) => `${r.method} ${r.url}`)).toEqual([
      `GET ${ca.urls.directory}`,
      `HEAD ${ca.urls.newNonce}`,
    ]);
  });

  test("getDirectory is an unsigned GET of the directory URL", async () => {
    const ca = makeCa();
    const result = await run(ca, { accountKey: ecKey }, getDirectory({}));
    expect(result).toEqual(ca.directory);
    expect(ca.requests).toHaveLength(1);
    expect(ca.requests[0]).toMatchObject({
      method: "GET",
      url: ca.urls.directory,
      body: undefined,
    });
    expect(ca.requests[0]!.headers["accept"]).toBe("application/json");
  });

  test("a directory missing required URLs fails with AcmeParseError", async () => {
    const ca = makeCa();
    ca.handlers.set(`GET ${ca.urls.directory}`, () => json({ newNonce: ca.urls.newNonce }));
    const error = await runError(
      ca,
      { accountKey: ecKey },
      newAccount({ termsOfServiceAgreed: true }),
    );
    expect(error).toBeInstanceOf(AcmeParseError);
  });

  test("a failing directory fetch surfaces UnknownAcmeError with its status", async () => {
    const ca = makeCa();
    ca.handlers.set(`GET ${ca.urls.directory}`, () => new Response("down", { status: 503 }));
    const error = await runError(
      ca,
      { accountKey: ecKey },
      newAccount({ termsOfServiceAgreed: true }),
    );
    expect(error).toBeInstanceOf(UnknownAcmeError);
    expect(error).toMatchObject({ status: 503 });
  });
});

describe("badNonce retry", () => {
  const badNonce = (nonce: string) =>
    problem(
      {
        type: "urn:ietf:params:acme:error:badNonce",
        detail: "JWS has an invalid anti-replay nonce",
      },
      { status: 400, headers: { "Replay-Nonce": nonce } },
    );

  test("re-signs with the rejection's Replay-Nonce and succeeds", async () => {
    const ca = makeCa();
    let n = 0;
    ca.handlers.set(`POST ${ca.urls.newOrder}`, () =>
      ++n === 1 ? badNonce("retry-1") : json(order(ca), { status: 201 }),
    );
    const result = await run(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      newOrder({ identifiers: [{ type: "dns", value: "example.test" }] }),
    );
    expect(result.status).toBe("pending");
    const signed = posts(ca).map(parseJws);
    expect(signed.map((s) => s.header.nonce)).toEqual(["head-1", "retry-1"]);
    expect(signed[1]!.header.url).toBe(ca.urls.newOrder);
    expect(signed[1]!.payload).toEqual(signed[0]!.payload);
    expect(await verify(signed[1]!.jws, publicOf(ecJwk), "ES256")).toBe(true);
  });

  test("gives up after two retries with AcmeBadNonce", async () => {
    const ca = makeCa();
    let n = 0;
    ca.handlers.set(`POST ${ca.urls.newOrder}`, () => badNonce(`retry-${++n}`));
    const error = await runError(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      newOrder({ identifiers: [{ type: "dns", value: "example.test" }] }),
    );
    expect(error).toBeInstanceOf(AcmeBadNonce);
    expect(error).toMatchObject({
      code: 400,
      type: "urn:ietf:params:acme:error:badNonce",
      detail: "JWS has an invalid anti-replay nonce",
    });
    expect(posts(ca).map((r) => parseJws(r).header.nonce)).toEqual([
      "head-1",
      "retry-1",
      "retry-2",
    ]);
  });

  test("the final rejection nonce is not cached for the next request", async () => {
    const ca = makeCa();
    let n = 0;
    ca.handlers.set(`POST ${ca.urls.newOrder}`, () => badNonce(`retry-${++n}`));
    ca.handlers.set(`POST ${ca.urls.order}`, () => json(order(ca)));
    const config = { accountKey: ecKey, accountUrl: ca.urls.account };
    await runError(ca, config, newOrder({ identifiers: [{ type: "dns", value: "x.test" }] }));
    await run(ca, config, getOrder({ url: ca.urls.order }));
    expect(heads(ca)).toHaveLength(2);
    expect(parseJws(posts(ca).at(-1)!).header.nonce).toBe("head-2");
  });

  test("a badNonce without a Replay-Nonce is surfaced immediately", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newOrder}`, () =>
      problem({ type: "urn:ietf:params:acme:error:badNonce", detail: "stale" }, { status: 400 }),
    );
    const error = await runError(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      newOrder({ identifiers: [{ type: "dns", value: "example.test" }] }),
    );
    expect(error).toBeInstanceOf(AcmeBadNonce);
    expect(posts(ca)).toHaveLength(1);
  });
});

describe("Problem document errors", () => {
  const getOrderFails = async (response: () => Response) => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.order}`, response);
    return runError(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      getOrder({ url: ca.urls.order }),
    );
  };

  test("a known URN maps to its typed class with code, type and detail", async () => {
    const error = await getOrderFails(() =>
      problem(
        { type: "urn:ietf:params:acme:error:malformed", detail: "Request body was invalid" },
        { status: 400 },
      ),
    );
    expect(error).toBeInstanceOf(AcmeMalformed);
    expect(error).toMatchObject({
      code: 400,
      message: "Request body was invalid",
      type: "urn:ietf:params:acme:error:malformed",
      detail: "Request body was invalid",
    });
  });

  test("rateLimited carries the Retry-After hint", async () => {
    const error = await getOrderFails(() =>
      problem(
        { type: "urn:ietf:params:acme:error:rateLimited", detail: "too many" },
        { status: 429, headers: { "Retry-After": "30" } },
      ),
    );
    expect(error).toBeInstanceOf(AcmeRateLimited);
    expect(Duration.toSeconds((error as AcmeRateLimited).retryAfter!)).toBe(30);
  });

  test("an unknown URN is UnknownAcmeError with the problem fields", async () => {
    const subproblems = [
      { type: "urn:ietf:params:acme:error:dns", identifier: { type: "dns", value: "a.test" } },
    ];
    const error = await getOrderFails(() =>
      problem(
        { type: "urn:example:custom", detail: "custom failure", subproblems },
        { status: 403 },
      ),
    );
    expect(error).toBeInstanceOf(UnknownAcmeError);
    expect(error).toMatchObject({
      type: "urn:example:custom",
      detail: "custom failure",
      message: "custom failure",
      status: 403,
      subproblems,
    });
    expect(Redacted.isRedacted((error as UnknownAcmeError).body)).toBe(true);
  });

  test("a URN typed on a different operation does not match here", async () => {
    // badCSR is only declared on finalizeOrder.
    const error = await getOrderFails(() =>
      problem({ type: "urn:ietf:params:acme:error:badCSR" }, { status: 400 }),
    );
    expect(error).toBeInstanceOf(UnknownAcmeError);
    expect(error).toMatchObject({ type: "urn:ietf:params:acme:error:badCSR" });
  });

  test("a non-problem 404 maps to the core NotFound", async () => {
    const error = await getOrderFails(() => new Response("missing", { status: 404 }));
    expect(error).toBeInstanceOf(NotFound);
  });

  test("a non-problem 5xx maps to the core status class", async () => {
    const error = await getOrderFails(() => new Response("boom", { status: 500 }));
    expect(error).toBeInstanceOf(InternalServerError);
  });
});

describe("Response decoding", () => {
  test("a PEM chain is returned as text with Link alternates", async () => {
    const ca = makeCa();
    const pem = "-----BEGIN CERTIFICATE-----\nMIIB\n-----END CERTIFICATE-----\n";
    ca.handlers.set(
      `POST ${ca.urls.cert}`,
      () =>
        new Response(pem, {
          headers: {
            "Content-Type": "application/pem-certificate-chain",
            Link: `<${ca.urls.cert}/1>;rel="alternate", <${ca.urls.directory}>;rel="index", <${ca.urls.cert}/2>; rel=alternate`,
          },
        }),
    );
    const result = await run(
      ca,
      { accountKey: ecKey, accountUrl: ca.urls.account },
      downloadCertificate({ url: ca.urls.cert }),
    );
    expect(result).toEqual({
      chain: pem,
      alternates: [`${ca.urls.cert}/1`, `${ca.urls.cert}/2`],
    });
    expect(parseJws(posts(ca)[0]!).jws.payload).toBe("");
  });

  test("the Location header is folded into the output", async () => {
    const ca = makeCa();
    ca.handlers.set(`POST ${ca.urls.newAccount}`, () =>
      json(
        { status: "valid", orders: `${ca.urls.account}/orders` },
        {
          headers: { Location: ca.urls.account },
        },
      ),
    );
    const result = await run(ca, { accountKey: ecKey }, newAccount({ onlyReturnExisting: true }));
    expect(result).toEqual({
      status: "valid",
      orders: `${ca.urls.account}/orders`,
      location: ca.urls.account,
    });
  });
});
