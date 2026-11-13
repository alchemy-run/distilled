// The hand-written protocol: request encoding, the response envelope, errors and secrets.
import { inspect } from "node:util";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import type { HttpClientRequest } from "effect/http/HttpClientRequest";
import * as Response from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, it } from "vitest";
import { fromApiToken } from "../src/credentials.ts";
import { readEnvelope } from "../src/protocol.ts";
import { createApiToken } from "../src/services/user.ts";
import { addRecord, getRecords } from "../src/services/zones.ts";

const TOKEN = "test-token-0123456789";

const server = (
  execute: (request: HttpClientRequest) => ReturnType<HttpClient.HttpClient["execute"]>,
) =>
  Layer.mergeAll(
    fromApiToken({ apiToken: Redacted.make(TOKEN), apiUrl: "https://dns.example.invalid:53443" }),
    Layer.succeed(HttpClient.HttpClient, HttpClient.make(execute)),
  );

/** A server that records each request and answers with `body` as JSON. */
function replying(body: unknown, status = 200) {
  const requests: { method: string; url: string; headers: Record<string, string>; body: string }[] =
    [];
  const layer = server((request) => {
    const sent =
      request.body._tag === "Uint8Array" ? new TextDecoder().decode(request.body.body) : "";
    requests.push({
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: sent,
    });
    return Effect.succeed(
      Response.fromWeb(request, new globalThis.Response(JSON.stringify(body), { status })),
    );
  });
  return { requests, layer };
}

// Node prints crashes without Effect's inspect hooks, which are what normally redact headers.
const crashOutput = (value: unknown) => inspect(value, { depth: null, customInspect: false });

describe("requests", () => {
  it("POSTs a form body with the token in the Authorization header only", async () => {
    const { requests, layer } = replying({ status: "ok", response: { records: [] } });
    await Effect.runPromise(
      getRecords({ domain: "www.example.com", zone: "example.com", listZone: false }).pipe(
        Effect.provide(layer),
      ),
    );
    expect(requests).toHaveLength(1);
    const [request] = requests;
    expect(request?.method).toBe("POST");
    expect(request?.url).toBe("https://dns.example.invalid:53443/api/zones/records/get");
    expect(request?.headers.authorization).toBe(`Bearer ${TOKEN}`);
    expect(Object.fromEntries(new URLSearchParams(request?.body))).toEqual({
      domain: "www.example.com",
      zone: "example.com",
      listZone: "false",
    });
    expect(request?.body).not.toContain(TOKEN);
  });

  it("encodes numbers and booleans as the server parses them", async () => {
    const { requests, layer } = replying({ status: "ok", response: {} });
    await Effect.runPromise(
      addRecord({
        domain: "www.example.com",
        zone: "example.com",
        type: "A",
        ipAddress: "192.0.2.1",
        ttl: 300,
        overwrite: false,
      }).pipe(Effect.provide(layer)),
    );
    expect(Object.fromEntries(new URLSearchParams(requests[0]?.body))).toMatchObject({
      type: "A",
      ttl: "300",
      overwrite: "false",
    });
  });

  it("accepts a Redacted password and returns the new token as Redacted", async () => {
    const { requests, layer } = replying({ status: "ok", username: "admin", token: "new-token" });
    const result = await Effect.runPromise(
      createApiToken({
        user: "admin",
        pass: Redacted.make("secret-password"),
        tokenName: "ci",
      }).pipe(Effect.provide(layer)),
    );
    expect(new URLSearchParams(requests[0]?.body).get("pass")).toBe("secret-password");
    expect(Redacted.isRedacted(result.token)).toBe(true);
    expect(result.token && Redacted.value(result.token)).toBe("new-token");
    expect(crashOutput(result)).not.toContain("new-token");
  });
});

describe("readEnvelope", () => {
  const read = (body: unknown, status = 200) => readEnvelope(status, JSON.stringify(body));

  it("unwraps the response member", () => {
    expect(read({ status: "ok", server: "dns1", response: { domain: "example.com" } })).toEqual({
      ok: true,
      payload: { domain: "example.com" },
    });
  });

  it("returns the envelope without status and server for calls without a response member", () => {
    expect(read({ status: "ok", server: "dns1", username: "admin" })).toEqual({
      ok: true,
      payload: { username: "admin" },
    });
  });

  it("maps the failure statuses that arrive with HTTP 200", () => {
    const error = (body: unknown) => {
      const envelope = read(body);
      return envelope.ok ? undefined : envelope.error;
    };
    expect(
      error({ status: "error", errorMessage: "No such zone", innerErrorMessage: "x" }),
    ).toMatchObject({
      _tag: "TechnitiumError",
      message: "No such zone",
      innerMessage: "x",
    });
    expect(error({ status: "error", errorMessage: "Access was denied." })).toMatchObject({
      _tag: "Forbidden",
    });
    expect(error({ status: "invalid-token", errorMessage: "Invalid token" })).toMatchObject({
      _tag: "Unauthorized",
    });
    expect(error({ status: "2fa-required", errorMessage: "OTP" })).toMatchObject({
      _tag: "TwoFactorAuthRequired",
    });
    expect(error({ status: "maybe" })).toMatchObject({ _tag: "UnknownTechnitiumError" });
  });

  it("maps HTTP errors and bodies that are not JSON", () => {
    const status = readEnvelope(502, "<html>Bad gateway</html>");
    expect(status.ok ? undefined : status.error).toMatchObject({ _tag: "BadGateway" });
    const text = readEnvelope(200, "<html>login</html>");
    expect(text.ok ? undefined : text.error).toMatchObject({
      _tag: "UnknownTechnitiumError",
      httpStatus: 200,
      body: "<html>login</html>",
    });
    const withheld = readEnvelope(200, '{"status":"weird","token":"t"}', true);
    expect(withheld.ok ? undefined : withheld.error).toMatchObject({ body: "[REDACTED]" });
  });

  it("fails an operation with the typed error", async () => {
    const { layer } = replying({ status: "error", errorMessage: "No such zone was found: x" });
    const error = await Effect.runPromise(
      getRecords({ domain: "x" }).pipe(Effect.flip, Effect.provide(layer)),
    );
    expect(error).toMatchObject({ _tag: "TechnitiumError", message: "No such zone was found: x" });
  });
});

describe("credentials in failures", () => {
  const password = "secret-password-42";
  const login = createApiToken({ user: "admin", pass: Redacted.make(password), tokenName: "ci" });

  it("drops the token and the form body from transport errors", async () => {
    const error = await Effect.runPromise(
      login.pipe(
        Effect.flip,
        Effect.provide(
          server((request) =>
            Effect.fail(
              new HttpClientError.HttpClientError({
                reason: new HttpClientError.TransportError({
                  request,
                  cause: new Error("refused"),
                }),
              }),
            ),
          ),
        ),
      ),
    );
    expect(HttpClientError.isHttpClientError(error)).toBe(true);
    if (!HttpClientError.isHttpClientError(error)) return;
    expect(error.reason.request.url).toBe("https://dns.example.invalid:53443/api/user/createToken");
    expect(crashOutput(error)).not.toContain(TOKEN);
    expect(crashOutput(error)).not.toContain(password);
  });

  it("drops them from a failed response body read", async () => {
    const exit = await Effect.runPromiseExit(
      login.pipe(
        Effect.provide(
          server((request) =>
            Effect.succeed(
              Response.fromWeb(
                request,
                new globalThis.Response(
                  new ReadableStream({
                    start: (controller) => controller.error(new Error("reset")),
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    );
    expect(Exit.isFailure(exit)).toBe(true);
    if (!Exit.isFailure(exit)) return;
    const defect = Cause.squash(exit.cause);
    expect(HttpClientError.isHttpClientError(defect)).toBe(true);
    expect(crashOutput(defect)).not.toContain(TOKEN);
    expect(crashOutput(defect)).not.toContain(password);
  });
});
