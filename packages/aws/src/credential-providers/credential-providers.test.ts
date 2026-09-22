import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { createHash, generateKeyPairSync, verify } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import * as Auth from "../auth.ts";
import * as Credentials from "../credentials.ts";
import { chain, CredentialSourceError } from "./credential-source.ts";
import { fromCognitoIdentityPool } from "./from-cognito-identity-pool.ts";
import { fromCognitoIdentity } from "./from-cognito-identity.ts";
import { fromContainerMetadata } from "./from-container-metadata.ts";
import { fromEnv } from "./from-env.ts";
import { fromHttp } from "./from-http.node.ts";
import { fromIni } from "./from-ini.ts";
import { fromInstanceMetadata } from "./from-instance-metadata.node.ts";
import { fromLoginCredentials } from "./from-login-credentials.ts";
import { fromNodeProviderChain } from "./from-node-provider-chain.ts";
import { fromProcess } from "./from-process.ts";
import { fromTemporaryCredentials } from "./from-temporary-credentials.node.ts";
import { fromTokenFile } from "./from-token-file.ts";
import { fromWebToken } from "./from-web-token.ts";
import { withHttpClient } from "./http-client.ts";
import { nodeFileSystem } from "./node-file-system.ts";

const ENV_KEYS = [
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_SESSION_TOKEN",
  "AWS_CREDENTIAL_EXPIRATION",
  "AWS_ACCOUNT_ID",
  "AWS_PROFILE",
  "AWS_REGION",
  "AWS_DEFAULT_REGION",
  "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
  "AWS_CONTAINER_CREDENTIALS_FULL_URI",
  "AWS_CONTAINER_AUTHORIZATION_TOKEN",
  "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",
  "AWS_WEB_IDENTITY_TOKEN_FILE",
  "AWS_ROLE_ARN",
  "AWS_ROLE_SESSION_NAME",
  "AWS_EC2_METADATA_DISABLED",
  "AWS_EC2_METADATA_V1_DISABLED",
  "AWS_EC2_METADATA_SERVICE_ENDPOINT",
  "AWS_CONFIG_FILE",
  "AWS_SHARED_CREDENTIALS_FILE",
  "AWS_LOGIN_CACHE_DIRECTORY",
] as const;

const inOneHour = () => new Date(Date.now() + 60 * 60 * 1000);

// The default `ConfigProvider` snapshots `process.env` once per process;
// each run gets a fresh one so `AWS_REGION` set by the test is what
// `Region.fromEnvironment` reads.
const run = <A, E>(effect: Effect.Effect<A, E>) =>
  Effect.runPromise(
    Effect.provideService(
      effect,
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromEnv(),
    ),
  );
/** Run an effect that is expected to fail and return its typed error. */
const runFail = <A, E>(effect: Effect.Effect<A, E>) => run(Effect.flip(effect));

/** The resolved credentials a `Credentials` layer produces. */
const resolveLayer = (layer: Layer.Layer<Credentials.Credentials>) =>
  Effect.flatMap(Credentials.Credentials, (creds) => creds).pipe(
    Effect.provide(layer),
  );

/** A fake HTTP client keyed on `${method} ${url}`. */
const fakeHttp = (
  handler: (
    method: string,
    url: URL,
    headers: Record<string, string>,
  ) => Response | undefined,
) =>
  Layer.succeed(HttpClient.HttpClient)(
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const response = handler(request.method, url, request.headers);
        if (!response) throw new Error(`unexpected request ${url}`);
        return HttpClientResponse.fromWeb(request, response);
      }),
    ),
  );

const imdsCreds = (accessKeyId: string) =>
  Response.json({
    AccessKeyId: accessKeyId,
    SecretAccessKey: `secret-${accessKeyId}`,
    Token: `token-${accessKeyId}`,
    Expiration: inOneHour().toISOString(),
  });

interface RecordedCall {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string;
}

/** An HTTP client that records every request it answers. */
const recordingHttp = (handler: (call: RecordedCall) => Response) => {
  const calls: RecordedCall[] = [];
  const layer = Layer.succeed(HttpClient.HttpClient)(
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const call: RecordedCall = {
          method: request.method,
          url,
          headers: request.headers,
          body:
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : "",
        };
        calls.push(call);
        return HttpClientResponse.fromWeb(request, handler(call));
      }),
    ),
  );
  return { layer, calls };
};

const assumeRoleXml = (
  operation: "AssumeRole" | "AssumeRoleWithWebIdentity",
  accessKeyId: string,
) =>
  new Response(
    `<${operation}Response xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <${operation}Result>
    <AssumedRoleUser>
      <Arn>arn:aws:sts::123456789012:assumed-role/Role/s</Arn>
      <AssumedRoleId>AROA:s</AssumedRoleId>
    </AssumedRoleUser>
    <Credentials>
      <AccessKeyId>${accessKeyId}</AccessKeyId>
      <SecretAccessKey>secret-${accessKeyId}</SecretAccessKey>
      <SessionToken>session-${accessKeyId}</SessionToken>
      <Expiration>${inOneHour().toISOString()}</Expiration>
    </Credentials>
  </${operation}Result>
</${operation}Response>`,
    { status: 200, headers: { "content-type": "text/xml" } },
  );

const cognitoCredentials = (accessKeyId: string) =>
  new Response(
    JSON.stringify({
      IdentityId: "us-east-1:identity",
      Credentials: {
        AccessKeyId: accessKeyId,
        SecretKey: `secret-${accessKeyId}`,
        SessionToken: `session-${accessKeyId}`,
        Expiration: Math.floor(inOneHour().getTime() / 1000),
      },
    }),
    { status: 200, headers: { "content-type": "application/x-amz-json-1.1" } },
  );

const cognitoError = (type: string) =>
  new Response(JSON.stringify({ __type: type, message: type }), {
    status: 400,
    headers: { "content-type": "application/x-amz-json-1.1" },
  });

/** The `x-amz-target` operation name of an aws-json request. */
const target = (call: RecordedCall) =>
  (call.headers["x-amz-target"] ?? "").split(".")[1];

/** An identity-id cache that lives only for one test. */
const testCache = () => {
  const store = new Map<string, string>();
  return {
    store,
    cache: {
      get: (key: string) => Effect.sync(() => store.get(key)),
      set: (key: string, value: string) =>
        Effect.sync(() => void store.set(key, value)),
      remove: (key: string) => Effect.sync(() => void store.delete(key)),
    },
  };
};

let saved: Record<string, string | undefined>;
let home: string;

beforeEach(() => {
  saved = {};
  for (const key of ENV_KEYS) {
    saved[key] = process.env[key];
    delete process.env[key];
  }
  home = mkdtempSync(join(tmpdir(), "distilled-aws-creds-"));
  mkdirSync(join(home, ".aws"), { recursive: true });
  saved.HOME = process.env.HOME;
  process.env.HOME = home;
  // The smithy loader memoises file contents per path; unique paths per
  // test keep tests from seeing each other's config.
  process.env.AWS_CONFIG_FILE = join(home, ".aws", "config");
  process.env.AWS_SHARED_CREDENTIALS_FILE = join(home, ".aws", "credentials");
});

afterEach(() => {
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  rmSync(home, { recursive: true, force: true });
});

const writeConfig = (config: string) =>
  writeFileSync(join(home, ".aws", "config"), config);
const writeCredentials = (credentials: string) =>
  writeFileSync(join(home, ".aws", "credentials"), credentials);

describe("fromEnv", () => {
  test("reads the key pair, token, expiration and account id", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA";
    process.env.AWS_SECRET_ACCESS_KEY = "secret";
    process.env.AWS_SESSION_TOKEN = "session";
    process.env.AWS_CREDENTIAL_EXPIRATION = "2030-01-01T00:00:00Z";
    process.env.AWS_ACCOUNT_ID = "123456789012";
    const creds = await run(fromEnv);
    expect(creds).toEqual({
      accessKeyId: "AKIA",
      secretAccessKey: "secret",
      sessionToken: "session",
      expiration: new Date("2030-01-01T00:00:00Z"),
      accountId: "123456789012",
    });
  });

  test("fails, and lets a chain continue, when the pair is missing", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA";
    const error = await runFail(fromEnv);
    expect(error).toBeInstanceOf(CredentialSourceError);
    expect(error.tryNextLink).toBeUndefined();
  });

  test("the Credentials layer carries the region from the environment", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA";
    process.env.AWS_SECRET_ACCESS_KEY = "secret";
    process.env.AWS_REGION = "eu-west-1";
    const resolved = await run(resolveLayer(Credentials.fromEnv()));
    expect(Redacted.value(resolved.accessKeyId)).toBe("AKIA");
    expect(resolved.region).toBe("eu-west-1");
  });

  test("the Credentials layer reports a typed provider error with hints", async () => {
    const error = await runFail(resolveLayer(Credentials.fromEnv()));
    expect(error._tag).toBe("AWS::CredentialProviderError");
    if (error._tag === "AWS::CredentialProviderError") {
      expect(error.provider).toBe("env");
      expect(error.hints?.[0]).toContain("AWS_ACCESS_KEY_ID");
    }
  });
});

describe("chain", () => {
  const fail = (message: string, tryNextLink?: boolean) =>
    Effect.fail(new CredentialSourceError({ message, tryNextLink }));
  const ok = Effect.succeed({ accessKeyId: "a", secretAccessKey: "b" });

  test("returns the first source that succeeds", async () => {
    expect(await run(chain([fail("one"), ok]))).toEqual({
      accessKeyId: "a",
      secretAccessKey: "b",
    });
  });

  test("stops at a source that says the failure is final", async () => {
    const error = await runFail(chain([fail("final", false), ok]));
    expect(error.message).toBe("final");
  });

  test("fails with the last error when every source fails", async () => {
    const error = await runFail(chain([fail("one"), fail("two")]));
    expect(error.message).toBe("two");
  });
});

describe("fromIni", () => {
  test("static credentials from the credentials file", async () => {
    writeCredentials(`
[default]
aws_access_key_id = AKIA-default
aws_secret_access_key = secret-default

[other]
aws_access_key_id = AKIA-other
aws_secret_access_key = secret-other
aws_session_token = session-other
aws_account_id = 999999999999
`);
    expect(await run(fromIni())).toEqual({
      accessKeyId: "AKIA-default",
      secretAccessKey: "secret-default",
      sessionToken: undefined,
    });
    process.env.AWS_PROFILE = "other";
    expect(await run(fromIni())).toEqual({
      accessKeyId: "AKIA-other",
      secretAccessKey: "secret-other",
      sessionToken: "session-other",
      accountId: "999999999999",
    });
  });

  test("a profile that is not there", async () => {
    writeCredentials("");
    const error = await runFail(fromIni({ profile: "nope" }));
    expect(error.message).toContain("[nope]");
  });

  test("role_arn + source_profile assumes the role through STS", async () => {
    writeCredentials(`
[base]
aws_access_key_id = AKIA-base
aws_secret_access_key = secret-base
`);
    writeConfig(`
[profile admin]
role_arn = arn:aws:iam::123456789012:role/Admin
source_profile = base
region = us-west-2
external_id = ext
duration_seconds = 900
`);
    const calls: Array<{
      url: URL;
      headers: Record<string, string>;
      body: string;
    }> = [];
    const http = Layer.succeed(HttpClient.HttpClient)(
      HttpClient.make((request, url) =>
        Effect.gen(function* () {
          const body =
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : "";
          calls.push({ url, headers: request.headers, body });
          return HttpClientResponse.fromWeb(
            request,
            new Response(
              `<AssumeRoleResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <AssumeRoleResult>
    <AssumedRoleUser>
      <Arn>arn:aws:sts::123456789012:assumed-role/Admin/s</Arn>
      <AssumedRoleId>AROA:s</AssumedRoleId>
    </AssumedRoleUser>
    <Credentials>
      <AccessKeyId>ASIA-admin</AccessKeyId>
      <SecretAccessKey>secret-admin</SecretAccessKey>
      <SessionToken>session-admin</SessionToken>
      <Expiration>${inOneHour().toISOString()}</Expiration>
    </Credentials>
  </AssumeRoleResult>
</AssumeRoleResponse>`,
              { status: 200, headers: { "content-type": "text/xml" } },
            ),
          );
        }),
      ),
    );
    const creds = await run(
      fromIni({ profile: "admin" }).pipe(Effect.provide(http)),
    );
    expect(creds.accessKeyId).toBe("ASIA-admin");
    expect(creds.secretAccessKey).toBe("secret-admin");
    expect(creds.sessionToken).toBe("session-admin");
    expect(creds.accountId).toBe("123456789012");
    expect(creds.expiration).toBeInstanceOf(Date);

    expect(calls).toHaveLength(1);
    const call = calls[0];
    expect(call.url.hostname).toBe("sts.us-west-2.amazonaws.com");
    expect(call.headers.authorization).toContain("AKIA-base/");
    expect(call.headers.authorization).toContain("/us-west-2/sts/");
    expect(call.body).toContain("Action=AssumeRole");
    expect(call.body).toContain(
      "RoleArn=arn%3Aaws%3Aiam%3A%3A123456789012%3Arole%2FAdmin",
    );
    expect(call.body).toContain("ExternalId=ext");
    expect(call.body).toContain("DurationSeconds=900");
  });

  test("mfa_serial without a code provider is a final failure", async () => {
    writeCredentials(`
[base]
aws_access_key_id = AKIA-base
aws_secret_access_key = secret-base
`);
    writeConfig(`
[profile mfa]
role_arn = arn:aws:iam::123456789012:role/Admin
source_profile = base
mfa_serial = arn:aws:iam::123456789012:mfa/me
`);
    const error = await runFail(fromIni({ profile: "mfa" }));
    expect(error.message).toContain("multi-factor authentication");
    expect(error.tryNextLink).toBe(false);
  });

  test("a source_profile cycle is reported", async () => {
    writeConfig(`
[profile a]
role_arn = arn:aws:iam::123456789012:role/A
source_profile = b

[profile b]
role_arn = arn:aws:iam::123456789012:role/B
source_profile = a
`);
    const error = await runFail(fromIni({ profile: "a" }));
    expect(error.message).toContain("cycle");
  });

  test("credential_source = Environment without role_arn is the environment", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA-env";
    process.env.AWS_SECRET_ACCESS_KEY = "secret-env";
    writeConfig(`
[profile env]
credential_source = Environment
`);
    // Without role_arn this is not an assume-role profile at all; the SDK
    // reports it as unresolvable, and so do we.
    const error = await runFail(fromIni({ profile: "env" }));
    expect(error.message).toContain("[env]");
  });

  test("credential_process runs the command", async () => {
    writeConfig(`
[profile proc]
credential_process = echo '{"Version":1,"AccessKeyId":"AKIA-proc","SecretAccessKey":"secret-proc","SessionToken":"session-proc","AccountId":"111111111111"}'
`);
    expect(await run(fromIni({ profile: "proc" }))).toEqual({
      accessKeyId: "AKIA-proc",
      secretAccessKey: "secret-proc",
      sessionToken: "session-proc",
      accountId: "111111111111",
    });
    expect(await run(fromProcess({ profile: "proc" }))).toMatchObject({
      accessKeyId: "AKIA-proc",
    });
  });

  test("credential_process output is validated", async () => {
    writeConfig(`
[profile v2]
credential_process = echo '{"Version":2,"AccessKeyId":"a","SecretAccessKey":"b"}'

[profile junk]
credential_process = echo nope
`);
    expect((await runFail(fromProcess({ profile: "v2" }))).message).toContain(
      "did not return Version 1",
    );
    expect((await runFail(fromProcess({ profile: "junk" }))).message).toContain(
      "invalid JSON",
    );
    expect(
      (await runFail(fromProcess({ profile: "missing" }))).message,
    ).toContain("could not be found");
  });
});

describe("fromTokenFile", () => {
  test("posts the token to AssumeRoleWithWebIdentity unsigned", async () => {
    const tokenFile = join(home, "token");
    writeFileSync(tokenFile, "jwt-token\n");
    process.env.AWS_WEB_IDENTITY_TOKEN_FILE = tokenFile;
    process.env.AWS_ROLE_ARN = "arn:aws:iam::123456789012:role/Pod";
    process.env.AWS_ROLE_SESSION_NAME = "pod";
    process.env.AWS_REGION = "ap-southeast-2";
    const calls: Array<{
      url: URL;
      headers: Record<string, string>;
      body: string;
    }> = [];
    const http = Layer.succeed(HttpClient.HttpClient)(
      HttpClient.make((request, url) =>
        Effect.sync(() => {
          const body =
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : "";
          calls.push({ url, headers: request.headers, body });
          return HttpClientResponse.fromWeb(
            request,
            new Response(
              `<AssumeRoleWithWebIdentityResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <AssumeRoleWithWebIdentityResult>
    <Credentials>
      <AccessKeyId>ASIA-pod</AccessKeyId>
      <SecretAccessKey>secret-pod</SecretAccessKey>
      <SessionToken>session-pod</SessionToken>
      <Expiration>${inOneHour().toISOString()}</Expiration>
    </Credentials>
  </AssumeRoleWithWebIdentityResult>
</AssumeRoleWithWebIdentityResponse>`,
              { status: 200, headers: { "content-type": "text/xml" } },
            ),
          );
        }),
      ),
    );
    const creds = await run(fromTokenFile().pipe(Effect.provide(http)));
    expect(creds.accessKeyId).toBe("ASIA-pod");
    expect(calls[0].url.hostname).toBe("sts.ap-southeast-2.amazonaws.com");
    expect(calls[0].body).toContain("Action=AssumeRoleWithWebIdentity");
    expect(calls[0].body).toContain("WebIdentityToken=jwt-token");
    expect(calls[0].body).toContain("RoleSessionName=pod");
  });

  test("fails when not configured", async () => {
    const error = await runFail(fromTokenFile());
    expect(error.message).toBe("Web identity configuration not specified");
  });
});

describe("fromHttp / fromContainerMetadata", () => {
  test("relative URI resolves against the ECS host with the auth token", async () => {
    process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI = "/v2/credentials/abc";
    process.env.AWS_CONTAINER_AUTHORIZATION_TOKEN = "Bearer x";
    const seen: string[] = [];
    const http = fakeHttp((method, url, headers) => {
      seen.push(`${method} ${url} ${headers.authorization}`);
      return imdsCreds("AKIA-ecs");
    });
    const viaHttp = await run(fromHttp().pipe(Effect.provide(http)));
    const viaContainer = await run(
      fromContainerMetadata().pipe(Effect.provide(http)),
    );
    expect(viaHttp.accessKeyId).toBe("AKIA-ecs");
    expect(viaHttp.sessionToken).toBe("token-AKIA-ecs");
    expect(viaContainer.accessKeyId).toBe("AKIA-ecs");
    expect(seen).toEqual([
      "GET http://169.254.170.2/v2/credentials/abc Bearer x",
      "GET http://169.254.170.2/v2/credentials/abc Bearer x",
    ]);
  });

  test("full URI must be https, loopback, or a container host", async () => {
    process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI = "http://example.com/creds";
    const error = await runFail(fromHttp());
    expect(error.message).toContain("URL not accepted");
  });

  test("token file is read from disk", async () => {
    const tokenFile = join(home, "auth-token");
    writeFileSync(tokenFile, "from-file");
    process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI =
      "http://localhost:8080/creds";
    process.env.AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE = tokenFile;
    const seen: string[] = [];
    const http = fakeHttp((_, url, headers) => {
      seen.push(`${url} ${headers.authorization}`);
      return imdsCreds("AKIA-local");
    });
    await run(fromHttp().pipe(Effect.provide(http)));
    expect(seen).toEqual(["http://localhost:8080/creds from-file"]);
  });

  test("a 4xx surfaces the endpoint's error code", async () => {
    process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI = "http://127.0.0.1/creds";
    const http = fakeHttp(() =>
      Response.json({ Code: "AccessDenied", Message: "nope" }, { status: 403 }),
    );
    const error = await runFail(
      fromHttp({ maxRetries: 0 }).pipe(Effect.provide(http)),
    );
    expect(error.message).toBe(
      "Server responded with status: 403 AccessDenied nope",
    );
  });

  test("nothing configured", async () => {
    expect((await runFail(fromHttp())).message).toContain(
      "No HTTP credential provider host",
    );
    const container = await runFail(fromContainerMetadata());
    expect(container.tryNextLink).toBe(false);
  });
});

describe("fromInstanceMetadata", () => {
  const imds = (options: { tokenStatus?: number; recordTo?: string[] } = {}) =>
    fakeHttp((method, url, headers) => {
      options.recordTo?.push(
        `${method} ${url.pathname} ${headers["x-aws-ec2-metadata-token"] ?? "-"}`,
      );
      if (url.hostname !== "169.254.169.254") return;
      if (method === "PUT" && url.pathname === "/latest/api/token") {
        return options.tokenStatus
          ? new Response("", { status: options.tokenStatus })
          : new Response("imds-token");
      }
      if (url.pathname === "/latest/meta-data/iam/security-credentials/") {
        return new Response("my-role\n");
      }
      if (
        url.pathname === "/latest/meta-data/iam/security-credentials/my-role"
      ) {
        return imdsCreds("AKIA-imds");
      }
    });

  test("IMDSv2: token, role name, then credentials", async () => {
    const calls: string[] = [];
    const creds = await run(
      fromInstanceMetadata().pipe(Effect.provide(imds({ recordTo: calls }))),
    );
    expect(creds.accessKeyId).toBe("AKIA-imds");
    expect(calls).toEqual([
      "PUT /latest/api/token -",
      "GET /latest/meta-data/iam/security-credentials/ imds-token",
      "GET /latest/meta-data/iam/security-credentials/my-role imds-token",
    ]);
  });

  test("falls back to IMDSv1 when the token endpoint is 404", async () => {
    const calls: string[] = [];
    const creds = await run(
      fromInstanceMetadata().pipe(
        Effect.provide(imds({ tokenStatus: 404, recordTo: calls })),
      ),
    );
    expect(creds.accessKeyId).toBe("AKIA-imds");
    expect(calls[1]).toBe("GET /latest/meta-data/iam/security-credentials/ -");
  });

  test("IMDSv1 fallback can be blocked", async () => {
    process.env.AWS_EC2_METADATA_V1_DISABLED = "true";
    const error = await runFail(
      fromInstanceMetadata().pipe(Effect.provide(imds({ tokenStatus: 404 }))),
    );
    expect(error.message).toContain("v1 fallback has been blocked");
    expect(error.tryNextLink).toBe(false);
  });

  test("custom endpoint", async () => {
    process.env.AWS_EC2_METADATA_SERVICE_ENDPOINT = "http://localhost:1338";
    const calls: string[] = [];
    const http = fakeHttp((method, url) => {
      calls.push(`${method} ${url.host}${url.pathname}`);
      if (url.pathname === "/latest/api/token") return new Response("t");
      if (url.pathname.endsWith("/security-credentials/"))
        return new Response("r");
      return imdsCreds("AKIA-custom");
    });
    await run(fromInstanceMetadata().pipe(Effect.provide(http)));
    expect(calls[0]).toBe("PUT localhost:1338/latest/api/token");
  });
});

describe("fromNodeProviderChain", () => {
  test("the environment wins when AWS_PROFILE is unset", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA-env";
    process.env.AWS_SECRET_ACCESS_KEY = "secret-env";
    writeCredentials(`
[default]
aws_access_key_id = AKIA-file
aws_secret_access_key = secret-file
`);
    expect((await run(fromNodeProviderChain())).accessKeyId).toBe("AKIA-env");
  });

  test("AWS_PROFILE sends the chain to the profile before the environment", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA-env";
    process.env.AWS_SECRET_ACCESS_KEY = "secret-env";
    process.env.AWS_PROFILE = "file";
    writeCredentials(`
[file]
aws_access_key_id = AKIA-file
aws_secret_access_key = secret-file
`);
    expect((await run(fromNodeProviderChain())).accessKeyId).toBe("AKIA-file");
  });

  test("falls through to the container endpoint", async () => {
    writeCredentials("");
    process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI = "/creds";
    const http = fakeHttp(() => imdsCreds("AKIA-ecs"));
    expect(
      (await run(fromNodeProviderChain().pipe(Effect.provide(http))))
        .accessKeyId,
    ).toBe("AKIA-ecs");
  });

  test("with IMDS disabled and nothing else, fails with the final message", async () => {
    writeCredentials("");
    process.env.AWS_EC2_METADATA_DISABLED = "true";
    const error = await runFail(fromNodeProviderChain());
    expect(error.message).toBe("Could not load credentials from any providers");
    expect(error.tryNextLink).toBe(false);
  });

  test("Credentials.fromChain reads the region from the profile", async () => {
    process.env.AWS_PROFILE = "file";
    writeCredentials(`
[file]
aws_access_key_id = AKIA-file
aws_secret_access_key = secret-file
`);
    writeConfig(`
[profile file]
region = ca-central-1
`);
    const resolved = await run(resolveLayer(Credentials.fromChain()));
    expect(Redacted.value(resolved.accessKeyId)).toBe("AKIA-file");
    expect(resolved.region).toBe("ca-central-1");
  });
});

describe("fromWebToken", () => {
  test("exchanges the token for a role, in the region it is given", async () => {
    process.env.AWS_REGION = "us-east-1";
    const { layer, calls } = recordingHttp(() =>
      assumeRoleXml("AssumeRoleWithWebIdentity", "ASIA-web"),
    );
    const creds = await run(
      fromWebToken({
        roleArn: "arn:aws:iam::123456789012:role/Web",
        webIdentityToken: "jwt-token",
        roleSessionName: "web",
        providerId: "graph.facebook.com",
        durationSeconds: 900,
        region: "eu-west-1",
      }).pipe(Effect.provide(layer)),
    );
    expect(creds.accessKeyId).toBe("ASIA-web");
    expect(creds.accountId).toBe("123456789012");
    expect(calls[0].url.hostname).toBe("sts.eu-west-1.amazonaws.com");
    expect(calls[0].body).toContain("Action=AssumeRoleWithWebIdentity");
    expect(calls[0].body).toContain("WebIdentityToken=jwt-token");
    expect(calls[0].body).toContain("ProviderId=graph.facebook.com");
    expect(calls[0].body).toContain("DurationSeconds=900");
  });

  test("the Credentials layer carries the region the role was assumed in", async () => {
    const { layer } = recordingHttp(() =>
      assumeRoleXml("AssumeRoleWithWebIdentity", "ASIA-web"),
    );
    const resolved = await run(
      resolveLayer(
        Credentials.fromWebToken({
          roleArn: "arn:aws:iam::123456789012:role/Web",
          webIdentityToken: "jwt-token",
          region: "ap-south-1",
        }),
      ).pipe(Effect.provide(layer)),
    );
    expect(Redacted.value(resolved.accessKeyId)).toBe("ASIA-web");
    expect(resolved.region).toBe("ap-south-1");
  });

  test("an STS failure does not fall through to another source", async () => {
    const { layer } = recordingHttp(
      () =>
        new Response(
          `<ErrorResponse><Error><Code>InvalidIdentityToken</Code><Message>bad token</Message></Error></ErrorResponse>`,
          { status: 400, headers: { "content-type": "text/xml" } },
        ),
    );
    const error = await runFail(
      fromWebToken({
        roleArn: "arn:aws:iam::123456789012:role/Web",
        webIdentityToken: "bad",
        region: "us-east-1",
      }).pipe(Effect.provide(layer)),
    );
    expect(error.tryNextLink).toBe(false);
  });
});

describe("fromTemporaryCredentials", () => {
  const role = "arn:aws:iam::123456789012:role/Admin";

  test("assumes the role with the environment credentials by default", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA-env";
    process.env.AWS_SECRET_ACCESS_KEY = "secret-env";
    process.env.AWS_REGION = "us-west-2";
    const { layer, calls } = recordingHttp(() =>
      assumeRoleXml("AssumeRole", "ASIA-temp"),
    );
    const creds = await run(
      fromTemporaryCredentials({
        params: { RoleArn: role },
        masterCredentials: fromEnv,
      }).pipe(Effect.provide(layer)),
    );
    expect(creds.accessKeyId).toBe("ASIA-temp");
    expect(calls[0].url.hostname).toBe("sts.us-west-2.amazonaws.com");
    expect(calls[0].headers.authorization).toContain("AKIA-env/");
    expect(calls[0].body).toContain("Action=AssumeRole");
    expect(calls[0].body).toContain("RoleSessionName=aws-sdk-js-");
  });

  test("the Node default source is the provider chain, so a profile works", async () => {
    process.env.AWS_PROFILE = "file";
    process.env.AWS_REGION = "us-west-2";
    writeCredentials(`
[file]
aws_access_key_id = AKIA-file
aws_secret_access_key = secret-file
`);
    const { layer, calls } = recordingHttp(() =>
      assumeRoleXml("AssumeRole", "ASIA-temp"),
    );
    const creds = await run(
      fromTemporaryCredentials({
        params: { RoleArn: role, RoleSessionName: "s" },
      }).pipe(Effect.provide(layer)),
    );
    expect(creds.accessKeyId).toBe("ASIA-temp");
    expect(calls[0].headers.authorization).toContain("AKIA-file/");
  });

  test("a role that needs MFA asks the code provider", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA-env";
    process.env.AWS_SECRET_ACCESS_KEY = "secret-env";
    process.env.AWS_REGION = "us-east-1";
    const { layer, calls } = recordingHttp(() =>
      assumeRoleXml("AssumeRole", "ASIA-mfa"),
    );
    const params = {
      RoleArn: role,
      SerialNumber: "arn:aws:iam::123456789012:mfa/me",
    };
    const creds = await run(
      fromTemporaryCredentials({
        params,
        masterCredentials: fromEnv,
        mfaCodeProvider: () => Effect.succeed("123456"),
      }).pipe(Effect.provide(layer)),
    );
    expect(creds.accessKeyId).toBe("ASIA-mfa");
    expect(calls[0].body).toContain("TokenCode=123456");

    const error = await runFail(
      fromTemporaryCredentials({
        params,
        masterCredentials: fromEnv,
      }).pipe(Effect.provide(layer)),
    );
    expect(error.message).toContain("multi-factor authentication");
    expect(error.tryNextLink).toBe(false);
  });
});

describe("fromCognitoIdentity", () => {
  const identityId = "us-east-1:00000000-0000-0000-0000-000000000000";

  test("calls GetCredentialsForIdentity in the identity's own region", async () => {
    const { layer, calls } = recordingHttp(() =>
      cognitoCredentials("ASIA-cog"),
    );
    const creds = await run(
      fromCognitoIdentity({
        identityId,
        logins: {
          "accounts.google.com": "static-token",
          "graph.facebook.com": Effect.succeed("effect-token"),
        },
      }).pipe(Effect.provide(layer)),
    );
    expect(creds.accessKeyId).toBe("ASIA-cog");
    expect(creds.secretAccessKey).toBe("secret-ASIA-cog");
    expect(creds.sessionToken).toBe("session-ASIA-cog");
    expect(creds.expiration).toBeInstanceOf(Date);
    expect(calls[0].url.hostname).toBe(
      "cognito-identity.us-east-1.amazonaws.com",
    );
    expect(target(calls[0])).toBe("GetCredentialsForIdentity");
    const body = JSON.parse(calls[0].body);
    expect(body.IdentityId).toBe(identityId);
    expect(body.Logins).toEqual({
      "accounts.google.com": "static-token",
      "graph.facebook.com": "effect-token",
    });
  });

  test("a response without credentials is a final failure", async () => {
    const { layer } = recordingHttp(
      () =>
        new Response(JSON.stringify({ IdentityId: identityId }), {
          status: 200,
          headers: { "content-type": "application/x-amz-json-1.1" },
        }),
    );
    const error = await runFail(
      fromCognitoIdentity({ identityId, region: "us-east-2" }).pipe(
        Effect.provide(layer),
      ),
    );
    expect(error.message).toContain("no credentials");
    expect(error.tryNextLink).toBe(false);
  });

  test("the Credentials layer carries the identity's region", async () => {
    const { layer } = recordingHttp(() => cognitoCredentials("ASIA-cog"));
    const resolved = await run(
      resolveLayer(Credentials.fromCognitoIdentity({ identityId })).pipe(
        Effect.provide(layer),
      ),
    );
    expect(Redacted.value(resolved.accessKeyId)).toBe("ASIA-cog");
    expect(resolved.region).toBe("us-east-1");
  });
});

describe("fromCognitoIdentityPool", () => {
  const identityPoolId = "eu-west-1:pool";

  test("mints an identity id, then caches it for the next resolution", async () => {
    const { cache, store } = testCache();
    const { layer, calls } = recordingHttp((call) =>
      target(call) === "GetId"
        ? new Response(JSON.stringify({ IdentityId: "eu-west-1:minted" }), {
            status: 200,
            headers: { "content-type": "application/x-amz-json-1.1" },
          })
        : cognitoCredentials("ASIA-pool"),
    );
    const provider = fromCognitoIdentityPool({
      identityPoolId,
      accountId: "123456789012",
      cache,
    });
    const first = await run(provider.pipe(Effect.provide(layer)));
    expect(first.accessKeyId).toBe("ASIA-pool");
    expect(calls.map(target)).toEqual(["GetId", "GetCredentialsForIdentity"]);
    expect(calls[0].url.hostname).toBe(
      "cognito-identity.eu-west-1.amazonaws.com",
    );
    expect(JSON.parse(calls[0].body)).toEqual({
      IdentityPoolId: identityPoolId,
      AccountId: "123456789012",
    });
    expect([...store.values()]).toEqual(["eu-west-1:minted"]);

    await run(provider.pipe(Effect.provide(layer)));
    expect(calls.map(target)).toEqual([
      "GetId",
      "GetCredentialsForIdentity",
      "GetCredentialsForIdentity",
    ]);
  });

  test("a cached identity id the pool rejects is discarded and re-minted", async () => {
    const { cache, store } = testCache();
    const key = `aws:cognito-identity-ids:${identityPoolId}:ANONYMOUS`;
    store.set(key, "eu-west-1:stale");
    const { layer, calls } = recordingHttp((call) => {
      if (target(call) === "GetId") {
        return new Response(JSON.stringify({ IdentityId: "eu-west-1:fresh" }), {
          status: 200,
          headers: { "content-type": "application/x-amz-json-1.1" },
        });
      }
      return JSON.parse(call.body).IdentityId === "eu-west-1:stale"
        ? cognitoError("ResourceNotFoundException")
        : cognitoCredentials("ASIA-fresh");
    });
    const creds = await run(
      fromCognitoIdentityPool({ identityPoolId, cache }).pipe(
        Effect.provide(layer),
      ),
    );
    expect(creds.accessKeyId).toBe("ASIA-fresh");
    expect(calls.map(target)).toEqual([
      "GetCredentialsForIdentity",
      "GetId",
      "GetCredentialsForIdentity",
    ]);
    expect(store.get(key)).toBe("eu-west-1:fresh");
  });

  test("the Credentials layer carries the pool's region", async () => {
    const { cache } = testCache();
    const { layer } = recordingHttp((call) =>
      target(call) === "GetId"
        ? new Response(JSON.stringify({ IdentityId: "eu-west-1:minted" }), {
            status: 200,
            headers: { "content-type": "application/x-amz-json-1.1" },
          })
        : cognitoCredentials("ASIA-pool"),
    );
    const resolved = await run(
      resolveLayer(
        Credentials.fromCognitoIdentityPool({ identityPoolId, cache }),
      ).pipe(Effect.provide(layer)),
    );
    expect(Redacted.value(resolved.accessKeyId)).toBe("ASIA-pool");
    expect(resolved.region).toBe("eu-west-1");
  });
});

describe("fromLoginCredentials", () => {
  const loginSession = "my-session";
  const sessionFile = () =>
    join(
      home,
      "login-cache",
      `${createHash("sha256").update(loginSession).digest("hex")}.json`,
    );

  let keyPair: { privateKey: string; publicKey: string };

  const writeToken = (expiresAt: Date, overrides: object = {}) => {
    const path = sessionFile();
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(
      path,
      JSON.stringify({
        accessToken: {
          accessKeyId: "ASIA-cached",
          secretAccessKey: "secret-cached",
          sessionToken: "session-cached",
          accountId: "123456789012",
          expiresAt: expiresAt.toISOString(),
        },
        tokenType: "Bearer",
        clientId: "client-id",
        refreshToken: "refresh-token",
        idToken: "id-token",
        dpopKey: keyPair.privateKey,
        ...overrides,
      }),
    );
    return path;
  };

  const oauthToken = (accessKeyId: string) =>
    Response.json({
      accessToken: {
        accessKeyId,
        secretAccessKey: `secret-${accessKeyId}`,
        sessionToken: `session-${accessKeyId}`,
      },
      tokenType: "Bearer",
      expiresIn: 3600,
      refreshToken: "refresh-token-2",
    });

  beforeEach(() => {
    keyPair = generateKeyPairSync("ec", {
      namedCurve: "prime256v1",
      privateKeyEncoding: { type: "sec1", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "pem" },
    });
    process.env.AWS_LOGIN_CACHE_DIRECTORY = join(home, "login-cache");
    writeConfig(`
[default]
region = eu-west-1
login_session = ${loginSession}
`);
  });

  test("returns the cached credentials while they are not near expiry", async () => {
    writeToken(inOneHour());
    expect(await run(fromLoginCredentials())).toEqual({
      accessKeyId: "ASIA-cached",
      secretAccessKey: "secret-cached",
      sessionToken: "session-cached",
      expiration: expect.any(Date),
      accountId: "123456789012",
    });
  });

  test("refreshes through the signin endpoint with a DPoP proof", async () => {
    const path = writeToken(new Date(Date.now() + 60 * 1000));
    const { layer, calls } = recordingHttp(() => oauthToken("ASIA-refreshed"));
    const creds = await run(fromLoginCredentials().pipe(Effect.provide(layer)));
    expect(creds.accessKeyId).toBe("ASIA-refreshed");
    expect(creds.accountId).toBe("123456789012");

    expect(calls).toHaveLength(1);
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url.href).toBe(
      "https://eu-west-1.signin.aws.amazon.com/v1/token",
    );
    expect(JSON.parse(calls[0].body)).toEqual({
      clientId: "client-id",
      grantType: "refresh_token",
      refreshToken: "refresh-token",
    });

    const [header, payload, signature] = (calls[0].headers.dpop ?? "").split(
      ".",
    );
    expect(JSON.parse(Buffer.from(header, "base64url").toString())).toEqual({
      alg: "ES256",
      typ: "dpop+jwt",
      jwk: {
        kty: "EC",
        crv: "P-256",
        x: expect.any(String),
        y: expect.any(String),
      },
    });
    expect(JSON.parse(Buffer.from(payload, "base64url").toString())).toEqual({
      jti: expect.any(String),
      htm: "POST",
      htu: "https://eu-west-1.signin.aws.amazon.com/v1/token",
      iat: expect.any(Number),
    });
    // The proof has to verify against the cached key, as raw `r || s`.
    expect(Buffer.from(signature, "base64url")).toHaveLength(64);
    expect(
      verify(
        "sha256",
        Buffer.from(`${header}.${payload}`),
        { key: keyPair.publicKey, dsaEncoding: "ieee-p1363" },
        Buffer.from(signature, "base64url"),
      ),
    ).toBe(true);

    const saved = JSON.parse(readFileSync(path, "utf8"));
    expect(saved.accessToken.accessKeyId).toBe("ASIA-refreshed");
    expect(saved.refreshToken).toBe("refresh-token-2");
    expect(new Date(saved.accessToken.expiresAt).getTime()).toBeGreaterThan(
      Date.now(),
    );
  });

  test("keeps a still-valid token when the refresh call fails", async () => {
    writeToken(new Date(Date.now() + 60 * 1000));
    const { layer } = recordingHttp(
      () => new Response("boom", { status: 500 }),
    );
    const creds = await run(fromLoginCredentials().pipe(Effect.provide(layer)));
    expect(creds.accessKeyId).toBe("ASIA-cached");
  });

  test("an expired session is a final failure", async () => {
    writeToken(new Date(Date.now() - 60 * 1000));
    const { layer } = recordingHttp(
      () =>
        new Response(
          JSON.stringify({ error: "TOKEN_EXPIRED", message: "expired" }),
          {
            status: 403,
            headers: {
              "content-type": "application/json",
              "x-amzn-errortype": "AccessDeniedException",
            },
          },
        ),
    );
    const error = await runFail(
      fromLoginCredentials().pipe(Effect.provide(layer)),
    );
    expect(error.message).toContain("Your session has expired");
    expect(error.tryNextLink).toBe(false);
  });

  test("a profile without login_session lets a chain continue", async () => {
    writeConfig(`
[default]
region = eu-west-1
`);
    const error = await runFail(fromLoginCredentials());
    expect(error.message).toContain("does not contain login_session");
    expect(error.tryNextLink).toBeUndefined();
  });

  test("a missing cache file is a final failure", async () => {
    const error = await runFail(fromLoginCredentials());
    expect(error.message).toContain("Failed to load the login token");
    expect(error.tryNextLink).toBe(false);
  });

  test("the Credentials layer carries the profile's region", async () => {
    writeToken(inOneHour());
    const resolved = await run(
      resolveLayer(Credentials.fromLoginCredentials()),
    );
    expect(Redacted.value(resolved.accessKeyId)).toBe("ASIA-cached");
    expect(resolved.region).toBe("eu-west-1");
  });

  test("a login_session profile resolves through fromIni", async () => {
    writeToken(inOneHour());
    writeConfig(`
[profile console]
login_session = ${loginSession}
region = us-west-2
`);
    expect(await run(fromIni({ profile: "console" }))).toEqual({
      accessKeyId: "ASIA-cached",
      secretAccessKey: "secret-cached",
      sessionToken: "session-cached",
      expiration: expect.any(Date),
      accountId: "123456789012",
    });
  });

  test("a login_session profile resolves through the default chain", async () => {
    writeToken(inOneHour());
    expect(await run(fromNodeProviderChain())).toEqual({
      accessKeyId: "ASIA-cached",
      secretAccessKey: "secret-cached",
      sessionToken: "session-cached",
      expiration: expect.any(Date),
      accountId: "123456789012",
    });
  });

  test("a login_session profile resolves through Auth.loadProfileCredentials", async () => {
    writeToken(inOneHour());
    writeConfig(`
[profile console]
login_session = ${loginSession}
region = us-west-2
`);
    const resolved = await run(
      Auth.loadProfileCredentials("console").pipe(
        Effect.provideService(FileSystem.FileSystem, nodeFileSystem),
        Effect.provide(Path.layer),
        withHttpClient,
      ),
    );
    expect(Redacted.value(resolved.accessKeyId)).toBe("ASIA-cached");
    expect(resolved.region).toBe("us-west-2");
  });
});

describe("Credentials layers", () => {
  test("fromInstanceMetadata resolves through IMDS", async () => {
    process.env.AWS_REGION = "us-east-1";
    const http = fakeHttp((method, url) => {
      if (method === "PUT" && url.pathname === "/latest/api/token")
        return new Response("imds-token");
      if (url.pathname === "/latest/meta-data/iam/security-credentials/")
        return new Response("my-role");
      return imdsCreds("AKIA-imds");
    });
    const resolved = await run(
      resolveLayer(Credentials.fromInstanceMetadata()).pipe(
        Effect.provide(http),
      ),
    );
    expect(Redacted.value(resolved.accessKeyId)).toBe("AKIA-imds");
    expect(resolved.region).toBe("us-east-1");
  });

  test("createCredentialChain takes the first source that resolves", async () => {
    process.env.AWS_ACCESS_KEY_ID = "AKIA-env";
    process.env.AWS_SECRET_ACCESS_KEY = "secret-env";
    process.env.AWS_REGION = "us-east-1";
    const resolved = await run(
      resolveLayer(
        Credentials.createCredentialChain(
          Effect.fail(new CredentialSourceError({ message: "no" })),
          fromEnv,
        ),
      ),
    );
    expect(Redacted.value(resolved.accessKeyId)).toBe("AKIA-env");
  });

  test("createCredentialChain reports the last failure with chain hints", async () => {
    const error = await runFail(
      resolveLayer(
        Credentials.createCredentialChain(
          Effect.fail(new CredentialSourceError({ message: "no" })),
        ),
      ),
    );
    expect(error._tag).toBe("AWS::CredentialProviderError");
    if (error._tag === "AWS::CredentialProviderError") {
      expect(error.provider).toBe("chain");
    }
  });
});
