import { generateKeyPairSync, verify } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { GCPCredentialsError } from "../errors.ts";
import * as Retry from "../retry.ts";
import { getProjects } from "../services/cloudresourcemanager_v3.ts";
import {
  type ApplicationDefaultConfig,
  fromApplicationDefault,
} from "./from-application-default.ts";

const ENV = [
  "GOOGLE_APPLICATION_CREDENTIALS",
  "CLOUDSDK_CONFIG",
  "GOOGLE_CLOUD_PROJECT",
  "GCLOUD_PROJECT",
  "GOOGLE_PROJECT_ID",
  "GOOGLE_CLOUD_QUOTA_PROJECT",
  "GCE_METADATA_HOST",
] as const;

let dir: string;
let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = Object.fromEntries(ENV.map((name) => [name, process.env[name]]));
  for (const name of ENV) delete process.env[name];
  dir = mkdtempSync(join(tmpdir(), "gcp-adc-"));
  // Never fall back to the real ~/.config/gcloud.
  process.env.CLOUDSDK_CONFIG = dir;
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
  for (const name of ENV) {
    if (saved[name] === undefined) delete process.env[name];
    else process.env[name] = saved[name];
  }
});

const writeJson = (name: string, json: unknown) => {
  const path = join(dir, name);
  writeFileSync(path, JSON.stringify(json));
  return path;
};

const gcloudLogin = (extra: Record<string, unknown> = {}) =>
  writeJson("application_default_credentials.json", {
    type: "authorized_user",
    client_id: "764086051850.apps.googleusercontent.com",
    client_secret: "client-secret-value",
    refresh_token: "refresh-token-value",
    quota_project_id: "acme-dev",
    ...extra,
  });

interface Call {
  readonly method: string;
  readonly url: URL;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
}

type Handler = (call: Call) => Response | undefined;

/** Fake Google endpoints; `handlers` answer first, then sensible defaults. */
const google = (handlers: Partial<Record<string, Handler>> = {}) => {
  const calls: Call[] = [];
  let minted = 0;
  const defaults: Record<string, Handler> = {
    "oauth2.googleapis.com": () =>
      Response.json({ access_token: `oauth-${++minted}`, expires_in: 3599, token_type: "Bearer" }),
    "sts.googleapis.com": () =>
      Response.json({ access_token: `federated-${++minted}`, expires_in: 3600 }),
    "iamcredentials.googleapis.com": () =>
      Response.json({
        accessToken: `impersonated-${minted}`,
        expireTime: new Date(Date.now() + 3_600_000).toISOString(),
      }),
    "metadata.google.internal": () => new Response("not on GCP", { status: 404 }),
    "cloudresourcemanager.googleapis.com": () =>
      Response.json({ name: "projects/1", projectId: "acme" }),
  };
  const layer = Layer.succeed(HttpClient.HttpClient)(
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const call: Call = {
          method: request.method,
          url,
          headers: request.headers,
          body:
            request.body._tag === "Uint8Array" ? new TextDecoder().decode(request.body.body) : "",
        };
        calls.push(call);
        const response = handlers[url.host]?.(call) ?? defaults[url.host]?.(call);
        if (!response) throw new Error(`unexpected request ${url}`);
        return HttpClientResponse.fromWeb(request, response);
      }),
    ),
  );
  return { calls, layer, hosts: () => calls.map((c) => c.url.host) };
};

const call = getProjects({ name: "projects/1" }).pipe(Retry.none);

const run = <A, E>(
  effect: Effect.Effect<A, E, any>,
  layer: Layer.Layer<HttpClient.HttpClient>,
  config?: ApplicationDefaultConfig,
) =>
  Effect.runPromise(
    effect.pipe(
      Effect.provide(fromApplicationDefault(config)),
      Effect.provide(layer),
    ) as Effect.Effect<A, E>,
  );

const runFail = (layer: Layer.Layer<HttpClient.HttpClient>, config?: ApplicationDefaultConfig) =>
  run(Effect.flip(call), layer, config) as Promise<unknown>;

const form = (body: string) => Object.fromEntries(new URLSearchParams(body));
const api = (calls: ReadonlyArray<Call>) =>
  calls.filter((c) => c.url.host === "cloudresourcemanager.googleapis.com");

describe("fromApplicationDefault", () => {
  test("uses the gcloud login: refresh-token grant, bearer token, quota project header", async () => {
    gcloudLogin();
    const { calls, layer, hosts } = google();
    await run(call, layer);
    expect(hosts()).toEqual(["oauth2.googleapis.com", "cloudresourcemanager.googleapis.com"]);
    expect(calls[0].url.pathname).toBe("/token");
    // No scope: the token keeps the scopes granted at login.
    expect(form(calls[0].body)).toEqual({
      grant_type: "refresh_token",
      client_id: "764086051850.apps.googleusercontent.com",
      client_secret: "client-secret-value",
      refresh_token: "refresh-token-value",
    });
    expect(calls[1].headers.authorization).toBe("Bearer oauth-1");
    expect(calls[1].headers["x-goog-user-project"]).toBe("acme-dev");
  });

  test("resolves the project and quota project: options, then env, then the file", async () => {
    gcloudLogin();
    const { layer } = google();
    const project = Effect.gen(function* () {
      const { Credentials } = yield* Effect.promise(() => import("../credentials-service.ts"));
      return yield* yield* Credentials;
    });
    expect(await run(project, layer)).toMatchObject({
      project: "acme-dev",
      quotaProject: "acme-dev",
    });
    process.env.GOOGLE_CLOUD_PROJECT = "env-project";
    process.env.GOOGLE_CLOUD_QUOTA_PROJECT = "env-quota";
    expect(await run(project, layer)).toMatchObject({
      project: "env-project",
      quotaProject: "env-quota",
    });
    expect(
      await run(project, layer, { project: "option-project", quotaProject: "option-quota" }),
    ).toMatchObject({ project: "option-project", quotaProject: "option-quota" });
  });

  test("refreshes once for many requests, including concurrent ones", async () => {
    gcloudLogin();
    const { calls, layer } = google();
    await run(
      Effect.gen(function* () {
        yield* Effect.all([call, call, call], { concurrency: "unbounded" });
        yield* call;
      }),
      layer,
    );
    expect(calls.filter((c) => c.url.host === "oauth2.googleapis.com")).toHaveLength(1);
    expect(api(calls)).toHaveLength(4);
  });

  test("a revoked login fails with GCPCredentialsError that names the fix and no secret", async () => {
    gcloudLogin();
    const { layer } = google({
      "oauth2.googleapis.com": () =>
        Response.json(
          { error: "invalid_grant", error_description: "Token has been expired or revoked." },
          { status: 400 },
        ),
    });
    const error = (await runFail(layer)) as GCPCredentialsError;
    expect(error).toBeInstanceOf(GCPCredentialsError);
    expect(error.status).toBe(400);
    expect(error.message).toContain("Token has been expired or revoked.");
    expect(error.message).toContain("gcloud auth application-default login");
    expect(error.message).not.toContain("refresh-token-value");
    expect(error.message).not.toContain("client-secret-value");
  });

  test("GOOGLE_APPLICATION_CREDENTIALS wins over the gcloud login and signs a service account JWT", async () => {
    gcloudLogin();
    const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    process.env.GOOGLE_APPLICATION_CREDENTIALS = writeJson("key.json", {
      type: "service_account",
      project_id: "acme-prod",
      private_key_id: "key-1",
      private_key: privateKey.export({ type: "pkcs8", format: "pem" }),
      client_email: "deployer@acme-prod.iam.gserviceaccount.com",
      token_uri: "https://oauth2.googleapis.com/token",
    });
    const { calls, layer } = google();
    const config = await run(
      Effect.gen(function* () {
        yield* call;
        const { Credentials } = yield* Effect.promise(() => import("../credentials-service.ts"));
        return yield* yield* Credentials;
      }),
      layer,
    );
    expect(config.project).toBe("acme-prod");
    expect(config.quotaProject).toBeUndefined();
    const body = form(calls[0].body);
    expect(body.grant_type).toBe("urn:ietf:params:oauth:grant-type:jwt-bearer");
    const [header, claims, signature] = body.assertion.split(".");
    const decode = (part: string) => JSON.parse(Buffer.from(part, "base64url").toString());
    expect(decode(header)).toEqual({ alg: "RS256", typ: "JWT", kid: "key-1" });
    expect(decode(claims)).toMatchObject({
      iss: "deployer@acme-prod.iam.gserviceaccount.com",
      aud: "https://oauth2.googleapis.com/token",
      scope: "https://www.googleapis.com/auth/cloud-platform",
    });
    expect(decode(claims).exp - decode(claims).iat).toBe(3600);
    expect(
      verify(
        "RSA-SHA256",
        Buffer.from(`${header}.${claims}`),
        publicKey,
        Buffer.from(signature, "base64url"),
      ),
    ).toBe(true);
    expect(api(calls)[0].headers["x-goog-user-project"]).toBeUndefined();
  });

  test("GOOGLE_APPLICATION_CREDENTIALS naming a missing file is an error, not a fallback", async () => {
    gcloudLogin();
    process.env.GOOGLE_APPLICATION_CREDENTIALS = join(dir, "missing.json");
    const { hosts, layer } = google();
    const error = (await runFail(layer)) as GCPCredentialsError;
    expect(error.message).toContain("missing.json, which does not exist");
    expect(hosts()).toEqual([]);
  });

  test("an impersonated_service_account file refreshes the user, then impersonates", async () => {
    writeJson("application_default_credentials.json", {
      type: "impersonated_service_account",
      service_account_impersonation_url:
        "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/deployer@acme.iam.gserviceaccount.com:generateAccessToken",
      delegates: ["projects/-/serviceAccounts/middle@acme.iam.gserviceaccount.com"],
      source_credentials: {
        type: "authorized_user",
        client_id: "id",
        client_secret: "secret",
        refresh_token: "refresh",
      },
      quota_project_id: "acme-dev",
    });
    const { calls, hosts, layer } = google();
    await run(call, layer);
    expect(hosts()).toEqual([
      "oauth2.googleapis.com",
      "iamcredentials.googleapis.com",
      "cloudresourcemanager.googleapis.com",
    ]);
    expect(calls[1].url.pathname).toBe(
      "/v1/projects/-/serviceAccounts/deployer%40acme.iam.gserviceaccount.com:generateAccessToken",
    );
    expect(calls[1].headers.authorization).toBe("Bearer oauth-1");
    expect(JSON.parse(calls[1].body)).toEqual({
      scope: ["https://www.googleapis.com/auth/cloud-platform"],
      lifetime: "3600s",
      delegates: ["projects/-/serviceAccounts/middle@acme.iam.gserviceaccount.com"],
    });
    expect(calls[2].headers.authorization).toBe("Bearer impersonated-1");
    expect(calls[2].headers["x-goog-user-project"]).toBe("acme-dev");
  });

  test("an external_account file reads its subject token and exchanges it at STS", async () => {
    const tokenFile = writeJson("oidc.json", { id_token: "oidc-from-file" });
    process.env.GOOGLE_APPLICATION_CREDENTIALS = writeJson("wif.json", {
      type: "external_account",
      audience:
        "//iam.googleapis.com/projects/123/locations/global/workloadIdentityPools/p/providers/q",
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      token_url: "https://sts.googleapis.com/v1/token",
      service_account_impersonation_url:
        "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/ci@acme.iam.gserviceaccount.com:generateAccessToken",
      service_account_impersonation: { token_lifetime_seconds: 900 },
      credential_source: {
        file: tokenFile,
        format: { type: "json", subject_token_field_name: "id_token" },
      },
    });
    const { calls, hosts, layer } = google();
    await run(call, layer);
    expect(hosts()).toEqual([
      "sts.googleapis.com",
      "iamcredentials.googleapis.com",
      "cloudresourcemanager.googleapis.com",
    ]);
    expect(form(calls[0].body).subject_token).toBe("oidc-from-file");
    expect(JSON.parse(calls[1].body).lifetime).toBe("900s");
    expect(calls[2].headers.authorization).toBe("Bearer impersonated-1");
  });

  test("an external_account with a URL credential_source fetches the token with its headers", async () => {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = writeJson("wif.json", {
      type: "external_account",
      audience:
        "//iam.googleapis.com/projects/123/locations/global/workloadIdentityPools/p/providers/q",
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      credential_source: { url: "http://localhost:5000/token", headers: { Metadata: "True" } },
    });
    const { calls, hosts, layer } = google({
      "localhost:5000": () => new Response("oidc-from-url\n"),
    });
    await run(call, layer);
    expect(hosts()).toEqual([
      "localhost:5000",
      "sts.googleapis.com",
      "cloudresourcemanager.googleapis.com",
    ]);
    expect(calls[0].headers.metadata).toBe("True");
    expect(form(calls[1].body).subject_token).toBe("oidc-from-url");
  });

  test("an external_account with an AWS credential_source says it is unsupported", async () => {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = writeJson("aws.json", {
      type: "external_account",
      audience:
        "//iam.googleapis.com/projects/123/locations/global/workloadIdentityPools/p/providers/q",
      subject_token_type: "urn:ietf:params:aws:token-type:aws4_request",
      credential_source: { environment_id: "aws1" },
    });
    const { hosts, layer } = google();
    const error = (await runFail(layer)) as GCPCredentialsError;
    expect(error.message).toContain("AWS or executable credential_source");
    expect(hosts()).toEqual([]);
  });

  test("with no file, the metadata server supplies the token and project", async () => {
    const { calls, hosts, layer } = google({
      "metadata.google.internal": ({ url }) => {
        const headers = { "metadata-flavor": "Google" };
        if (url.pathname.endsWith("/token")) {
          return Response.json({ access_token: "metadata-token", expires_in: 3599 }, { headers });
        }
        if (url.pathname.endsWith("/project/project-id")) {
          return new Response("acme-runtime", { headers });
        }
        return new Response("", { headers });
      },
    });
    const config = await run(
      Effect.gen(function* () {
        yield* call;
        const { Credentials } = yield* Effect.promise(() => import("../credentials-service.ts"));
        return yield* yield* Credentials;
      }),
      layer,
    );
    expect(hosts().slice(0, 3)).toEqual([
      "metadata.google.internal",
      "metadata.google.internal",
      "metadata.google.internal",
    ]);
    expect(
      calls.every(
        (c) =>
          c.url.host !== "metadata.google.internal" || c.headers["metadata-flavor"] === "Google",
      ),
    ).toBe(true);
    expect(calls[1].url.pathname).toBe(
      "/computeMetadata/v1/instance/service-accounts/default/token",
    );
    expect(api(calls)[0].headers.authorization).toBe("Bearer metadata-token");
    expect(config.project).toBe("acme-runtime");
  });

  test("with no file and no metadata server, the error says how to log in", async () => {
    const { layer } = google();
    const error = (await runFail(layer)) as GCPCredentialsError;
    expect(error).toBeInstanceOf(GCPCredentialsError);
    expect(error.message).toContain("gcloud auth application-default login");
  });

  test("a server at the metadata address without Metadata-Flavor: Google is not Google Cloud", async () => {
    const { hosts, layer } = google({
      "metadata.google.internal": () => Response.json({ access_token: "not-google" }),
    });
    const error = (await runFail(layer)) as GCPCredentialsError;
    expect(error.message).toContain("Could not find Application Default Credentials");
    expect(hosts()).toEqual(["metadata.google.internal"]);
  });

  test("an unknown file type is an error that names the supported types", async () => {
    writeJson("application_default_credentials.json", { type: "external_account_authorized_user" });
    const { layer } = google();
    const error = (await runFail(layer)) as GCPCredentialsError;
    expect(error.message).toContain('type "external_account_authorized_user"');
  });
});
