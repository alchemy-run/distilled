import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as Credentials from "../credentials.ts";
import * as Providers from "./node.ts";
import { chain, CredentialSourceError } from "./shared.ts";

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
    const creds = await run(Providers.fromEnv);
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
    const error = await runFail(Providers.fromEnv);
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
    expect(await run(Providers.fromIni())).toEqual({
      accessKeyId: "AKIA-default",
      secretAccessKey: "secret-default",
      sessionToken: undefined,
    });
    process.env.AWS_PROFILE = "other";
    expect(await run(Providers.fromIni())).toEqual({
      accessKeyId: "AKIA-other",
      secretAccessKey: "secret-other",
      sessionToken: "session-other",
      accountId: "999999999999",
    });
  });

  test("a profile that is not there", async () => {
    writeCredentials("");
    const error = await runFail(Providers.fromIni({ profile: "nope" }));
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
      Providers.fromIni({ profile: "admin" }).pipe(Effect.provide(http)),
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
    const error = await runFail(Providers.fromIni({ profile: "mfa" }));
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
    const error = await runFail(Providers.fromIni({ profile: "a" }));
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
    const error = await runFail(Providers.fromIni({ profile: "env" }));
    expect(error.message).toContain("[env]");
  });

  test("credential_process runs the command", async () => {
    writeConfig(`
[profile proc]
credential_process = echo '{"Version":1,"AccessKeyId":"AKIA-proc","SecretAccessKey":"secret-proc","SessionToken":"session-proc","AccountId":"111111111111"}'
`);
    expect(await run(Providers.fromIni({ profile: "proc" }))).toEqual({
      accessKeyId: "AKIA-proc",
      secretAccessKey: "secret-proc",
      sessionToken: "session-proc",
      accountId: "111111111111",
    });
    expect(await run(Providers.fromProcess({ profile: "proc" }))).toMatchObject(
      { accessKeyId: "AKIA-proc" },
    );
  });

  test("credential_process output is validated", async () => {
    writeConfig(`
[profile v2]
credential_process = echo '{"Version":2,"AccessKeyId":"a","SecretAccessKey":"b"}'

[profile junk]
credential_process = echo nope
`);
    expect(
      (await runFail(Providers.fromProcess({ profile: "v2" }))).message,
    ).toContain("did not return Version 1");
    expect(
      (await runFail(Providers.fromProcess({ profile: "junk" }))).message,
    ).toContain("invalid JSON");
    expect(
      (await runFail(Providers.fromProcess({ profile: "missing" }))).message,
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
    const creds = await run(
      Providers.fromTokenFile().pipe(Effect.provide(http)),
    );
    expect(creds.accessKeyId).toBe("ASIA-pod");
    expect(calls[0].url.hostname).toBe("sts.ap-southeast-2.amazonaws.com");
    expect(calls[0].body).toContain("Action=AssumeRoleWithWebIdentity");
    expect(calls[0].body).toContain("WebIdentityToken=jwt-token");
    expect(calls[0].body).toContain("RoleSessionName=pod");
  });

  test("fails when not configured", async () => {
    const error = await runFail(Providers.fromTokenFile());
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
    const viaHttp = await run(Providers.fromHttp().pipe(Effect.provide(http)));
    const viaContainer = await run(
      Providers.fromContainerMetadata().pipe(Effect.provide(http)),
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
    const error = await runFail(Providers.fromHttp());
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
    await run(Providers.fromHttp().pipe(Effect.provide(http)));
    expect(seen).toEqual(["http://localhost:8080/creds from-file"]);
  });

  test("a 4xx surfaces the endpoint's error code", async () => {
    process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI = "http://127.0.0.1/creds";
    const http = fakeHttp(() =>
      Response.json({ Code: "AccessDenied", Message: "nope" }, { status: 403 }),
    );
    const error = await runFail(
      Providers.fromHttp({ maxRetries: 0 }).pipe(Effect.provide(http)),
    );
    expect(error.message).toBe(
      "Server responded with status: 403 AccessDenied nope",
    );
  });

  test("nothing configured", async () => {
    expect((await runFail(Providers.fromHttp())).message).toContain(
      "No HTTP credential provider host",
    );
    const container = await runFail(Providers.fromContainerMetadata());
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
      Providers.fromInstanceMetadata().pipe(
        Effect.provide(imds({ recordTo: calls })),
      ),
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
      Providers.fromInstanceMetadata().pipe(
        Effect.provide(imds({ tokenStatus: 404, recordTo: calls })),
      ),
    );
    expect(creds.accessKeyId).toBe("AKIA-imds");
    expect(calls[1]).toBe("GET /latest/meta-data/iam/security-credentials/ -");
  });

  test("IMDSv1 fallback can be blocked", async () => {
    process.env.AWS_EC2_METADATA_V1_DISABLED = "true";
    const error = await runFail(
      Providers.fromInstanceMetadata().pipe(
        Effect.provide(imds({ tokenStatus: 404 })),
      ),
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
    await run(Providers.fromInstanceMetadata().pipe(Effect.provide(http)));
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
    expect((await run(Providers.fromNodeProviderChain())).accessKeyId).toBe(
      "AKIA-env",
    );
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
    expect((await run(Providers.fromNodeProviderChain())).accessKeyId).toBe(
      "AKIA-file",
    );
  });

  test("falls through to the container endpoint", async () => {
    writeCredentials("");
    process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI = "/creds";
    const http = fakeHttp(() => imdsCreds("AKIA-ecs"));
    expect(
      (await run(Providers.fromNodeProviderChain().pipe(Effect.provide(http))))
        .accessKeyId,
    ).toBe("AKIA-ecs");
  });

  test("with IMDS disabled and nothing else, fails with the final message", async () => {
    writeCredentials("");
    process.env.AWS_EC2_METADATA_DISABLED = "true";
    const error = await runFail(Providers.fromNodeProviderChain());
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
