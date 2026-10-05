import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { GCPCredentialsError } from "../errors.ts";
import * as Retry from "../retry.ts";
import { getProjects } from "../services/cloudresourcemanager_v3.ts";
import { fromWorkloadIdentity, type WorkloadIdentityConfig } from "./from-workload-identity.ts";

const audience =
  "//iam.googleapis.com/projects/123456789/locations/global/workloadIdentityPools/vercel/providers/vercel";
const serviceAccount = "deployer@acme.iam.gserviceaccount.com";

interface Call {
  readonly host: string;
  readonly path: string;
  readonly authorization: string | undefined;
  readonly body: string;
}

/**
 * Answers STS, IAM Credentials and Resource Manager the way Google does,
 * and records every request.
 */
const google = (
  options: {
    readonly stsStatus?: number;
    readonly stsExpiresIn?: number;
    readonly impersonatedExpiresInMs?: number;
  } = {},
) => {
  const calls: Call[] = [];
  let minted = 0;
  const layer = Layer.succeed(HttpClient.HttpClient)(
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const body =
          request.body._tag === "Uint8Array" ? new TextDecoder().decode(request.body.body) : "";
        calls.push({
          host: url.host,
          path: url.pathname,
          authorization: request.headers.authorization,
          body,
        });
        const respond = (json: unknown, status = 200) =>
          HttpClientResponse.fromWeb(request, Response.json(json, { status }));
        if (url.host === "sts.googleapis.com") {
          if (options.stsStatus) {
            return respond(
              {
                error: "invalid_grant",
                error_description: "The audience in ID Token does not match.",
              },
              options.stsStatus,
            );
          }
          return respond({
            access_token: `federated-${++minted}`,
            issued_token_type: "urn:ietf:params:oauth:token-type:access_token",
            token_type: "Bearer",
            expires_in: options.stsExpiresIn ?? 3600,
          });
        }
        if (url.host === "iamcredentials.googleapis.com") {
          return respond({
            accessToken: `impersonated-${minted}`,
            expireTime: new Date(
              Date.now() + (options.impersonatedExpiresInMs ?? 3_600_000),
            ).toISOString(),
          });
        }
        return respond({ name: "projects/1", projectId: "acme" });
      }),
    ),
  );
  return { calls, layer };
};

const callApi = (config: WorkloadIdentityConfig, layer: Layer.Layer<HttpClient.HttpClient>) =>
  getProjects({ name: "projects/1" }).pipe(
    Retry.none,
    Effect.provide(fromWorkloadIdentity(config)),
    Effect.provide(layer),
  );

const form = (body: string) => Object.fromEntries(new URLSearchParams(body));

describe("fromWorkloadIdentity", () => {
  test("exchanges the OIDC token at STS and calls the API with the federated token", async () => {
    const { calls, layer } = google();
    await Effect.runPromise(
      callApi({ audience, subjectToken: Redacted.make("vercel-oidc") }, layer),
    );
    expect(calls.map((c) => c.host)).toEqual([
      "sts.googleapis.com",
      "cloudresourcemanager.googleapis.com",
    ]);
    expect(calls[0].path).toBe("/v1/token");
    expect(form(calls[0].body)).toEqual({
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      audience,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
      subject_token: "vercel-oidc",
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    });
    expect(calls[1].authorization).toBe("Bearer federated-1");
  });

  test("impersonates the service account with the caller's scopes and lifetime", async () => {
    const { calls, layer } = google();
    await Effect.runPromise(
      callApi(
        {
          audience,
          subjectToken: Redacted.make("vercel-oidc"),
          serviceAccountEmail: serviceAccount,
          scopes: ["https://www.googleapis.com/auth/devstorage.read_only"],
          tokenLifetimeSeconds: 900,
        },
        layer,
      ),
    );
    expect(calls.map((c) => c.host)).toEqual([
      "sts.googleapis.com",
      "iamcredentials.googleapis.com",
      "cloudresourcemanager.googleapis.com",
    ]);
    // STS gets cloud-platform so the federated token may call IAM Credentials.
    expect(form(calls[0].body).scope).toBe("https://www.googleapis.com/auth/cloud-platform");
    expect(calls[1].path).toBe(
      "/v1/projects/-/serviceAccounts/deployer%40acme.iam.gserviceaccount.com:generateAccessToken",
    );
    expect(calls[1].authorization).toBe("Bearer federated-1");
    expect(JSON.parse(calls[1].body)).toEqual({
      scope: ["https://www.googleapis.com/auth/devstorage.read_only"],
      lifetime: "900s",
    });
    expect(calls[2].authorization).toBe("Bearer impersonated-1");
  });

  test("reuses the token until it nears expiry, and concurrent requests share one exchange", async () => {
    let subjectTokens = 0;
    const { calls, layer } = google();
    const credentials = fromWorkloadIdentity({
      audience,
      serviceAccountEmail: serviceAccount,
      subjectToken: Effect.sync(() => Redacted.make(`oidc-${++subjectTokens}`)),
    });
    const call = getProjects({ name: "projects/1" }).pipe(Retry.none);
    await Effect.runPromise(
      Effect.gen(function* () {
        yield* Effect.all([call, call, call, call], { concurrency: "unbounded" });
        yield* call;
      }).pipe(Effect.provide(credentials), Effect.provide(layer)),
    );
    expect(subjectTokens).toBe(1);
    expect(calls.filter((c) => c.host === "sts.googleapis.com")).toHaveLength(1);
    expect(calls.filter((c) => c.host === "iamcredentials.googleapis.com")).toHaveLength(1);
  });

  test("exchanges a fresh subject token once the access token is within five minutes of expiry", async () => {
    let subjectTokens = 0;
    // Every impersonated token is already inside the refresh window.
    const { calls, layer } = google({ impersonatedExpiresInMs: 60_000 });
    const credentials = fromWorkloadIdentity({
      audience,
      serviceAccountEmail: serviceAccount,
      subjectToken: Effect.sync(() => Redacted.make(`oidc-${++subjectTokens}`)),
    });
    const call = getProjects({ name: "projects/1" }).pipe(Retry.none);
    await Effect.runPromise(
      Effect.gen(function* () {
        yield* call;
        yield* call;
      }).pipe(Effect.provide(credentials), Effect.provide(layer)),
    );
    expect(subjectTokens).toBe(2);
    const sts = calls.filter((c) => c.host === "sts.googleapis.com");
    expect(sts.map((c) => form(c.body).subject_token)).toEqual(["oidc-1", "oidc-2"]);
    const api = calls.filter((c) => c.host === "cloudresourcemanager.googleapis.com");
    expect(api.map((c) => c.authorization)).toEqual([
      "Bearer impersonated-1",
      "Bearer impersonated-2",
    ]);
  });

  test("a rejected exchange fails the operation with GCPCredentialsError, without the token", async () => {
    const { calls, layer } = google({ stsStatus: 400 });
    const exit = await Effect.runPromiseExit(
      callApi({ audience, subjectToken: Redacted.make("secret-oidc") }, layer),
    );
    expect(calls.map((c) => c.host)).toEqual(["sts.googleapis.com"]);
    expect(Exit.isFailure(exit)).toBe(true);
    const error = Exit.isFailure(exit) ? exit.cause.reasons[0] : undefined;
    const failure = error?._tag === "Fail" ? error.error : undefined;
    expect(failure).toBeInstanceOf(GCPCredentialsError);
    const credentialsError = failure as GCPCredentialsError;
    expect(credentialsError.status).toBe(400);
    expect(credentialsError.message).toContain("The audience in ID Token does not match.");
    expect(credentialsError.message).not.toContain("secret-oidc");
  });

  test("a subject token Effect that fails is a GCPCredentialsError", async () => {
    const { calls, layer } = google();
    const error = await Effect.runPromise(
      callApi(
        { audience, subjectToken: Effect.fail("no OIDC token in this environment") },
        layer,
      ).pipe(Effect.flip),
    );
    expect(calls).toHaveLength(0);
    expect(error).toBeInstanceOf(GCPCredentialsError);
    expect((error as GCPCredentialsError).cause).toBe("no OIDC token in this environment");
  });
});
