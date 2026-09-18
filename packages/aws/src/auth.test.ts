import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as PlatformError from "effect/PlatformError";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  makeAuthService,
  ssoRoleCredentialsCacheName,
  ssoTokenCacheName,
} from "./auth.ts";

const sha1 = (input: string) => createHash("sha1").update(input).digest("hex");

const SESSION = "my-sso";
const START_URL = "https://d-1234567890.awsapps.com/start";
const SSO_REGION = "us-east-1";

// The smithy ini loader reads `$HOME/.aws/config` from the real disk and
// memoises the file contents per path, so each test gets a fresh HOME.
const config = `
[sso-session ${SESSION}]
sso_start_url = ${START_URL}
sso_region = ${SSO_REGION}
sso_registration_scopes = sso:account:access

[profile dev]
sso_session = ${SESSION}
sso_account_id = 111111111111
sso_role_name = AdministratorAccess
region = us-west-2

[profile prod]
sso_session = ${SESSION}
sso_account_id = 222222222222
sso_role_name = AdministratorAccess
region = us-west-2

[profile prod-readonly]
sso_session = ${SESSION}
sso_account_id = 222222222222
sso_role_name = ReadOnlyAccess
region = us-west-2
`;

const inOneHour = () => new Date(Date.now() + 60 * 60 * 1000);

type Harness = ReturnType<typeof harness>;

/**
 * In-memory `~/.aws/sso/cache` plus a fake SSO portal. `portalCalls` records
 * every `GetRoleCredentials` request as `account_id/role_name`.
 */
const harness = (home: string) => {
  const cacheDir = join(home, ".aws", "sso", "cache");
  const files = new Map<string, string>();
  const portalCalls: string[] = [];

  // `loadProfile` re-reads the config through the Effect FileSystem to
  // resolve the `[sso-session]` section; the smithy loader reads the real
  // file written in `beforeEach`.
  files.set(join(home, ".aws", "config"), config);
  files.set(
    join(cacheDir, `${ssoTokenCacheName(SESSION)}.json`),
    JSON.stringify({
      accessToken: "token-for-session",
      expiresAt: inOneHour().toISOString(),
      region: SSO_REGION,
      startUrl: START_URL,
    }),
  );

  const notFound = (method: string, path: string) =>
    PlatformError.systemError({
      _tag: "NotFound",
      module: "FileSystem",
      method,
      pathOrDescriptor: path,
    });

  const fs = FileSystem.layerNoop({
    readFileString: (path) =>
      files.has(path)
        ? Effect.succeed(files.get(path)!)
        : Effect.fail(notFound("readFileString", path)),
    writeFileString: (path, data) =>
      Effect.sync(() => {
        files.set(path, data);
      }),
  });

  const http = Layer.succeed(HttpClient.HttpClient)(
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        expect(url.hostname).toBe(`portal.sso.${SSO_REGION}.amazonaws.com`);
        expect(url.pathname).toBe("/federation/credentials");
        expect(request.headers["x-amz-sso_bearer_token"]).toBe(
          "token-for-session",
        );
        const accountId = url.searchParams.get("account_id")!;
        const roleName = url.searchParams.get("role_name")!;
        portalCalls.push(`${accountId}/${roleName}`);
        return HttpClientResponse.fromWeb(
          request,
          Response.json({
            roleCredentials: {
              accessKeyId: `AKIA-${accountId}-${roleName}`,
              secretAccessKey: `secret-${accountId}-${roleName}`,
              sessionToken: `session-${accountId}-${roleName}`,
              expiration: inOneHour().getTime(),
            },
          }),
        );
      }),
    ),
  );

  const layer = Layer.mergeAll(fs, http, Path.layer);

  const load = (profile: string) =>
    Effect.runPromise(
      Effect.flatMap(makeAuthService(), (auth) =>
        auth.loadProfileCredentials(profile),
      ).pipe(Effect.provide(layer)),
    );

  const credsPath = (profile: {
    sso_account_id: string;
    sso_role_name: string;
  }) =>
    join(
      cacheDir,
      `${ssoRoleCredentialsCacheName({ sso_session: SESSION, ...profile })}.credentials.json`,
    );

  return { cacheDir, files, portalCalls, load, credsPath };
};

describe("SSO role credentials cache (#565)", () => {
  let home: string;
  let originalHome: string | undefined;
  let h: Harness;

  beforeEach(() => {
    home = mkdtempSync(join(tmpdir(), "distilled-aws-auth-"));
    mkdirSync(join(home, ".aws"), { recursive: true });
    writeFileSync(join(home, ".aws", "config"), config);
    originalHome = process.env.HOME;
    process.env.HOME = home;
    h = harness(home);
  });

  afterEach(() => {
    process.env.HOME = originalHome;
    rmSync(home, { recursive: true, force: true });
  });

  test("two profiles sharing one sso_session each get their own account's keys", async () => {
    const dev = await h.load("dev");
    expect(Redacted.value(dev.accessKeyId)).toBe(
      "AKIA-111111111111-AdministratorAccess",
    );

    const prod = await h.load("prod");
    expect(Redacted.value(prod.accessKeyId)).toBe(
      "AKIA-222222222222-AdministratorAccess",
    );
    expect(Redacted.value(prod.secretAccessKey)).toBe(
      "secret-222222222222-AdministratorAccess",
    );

    expect(h.portalCalls).toEqual([
      "111111111111/AdministratorAccess",
      "222222222222/AdministratorAccess",
    ]);

    // One file per account+role, and neither is the session-only key.
    const devPath = h.credsPath({
      sso_account_id: "111111111111",
      sso_role_name: "AdministratorAccess",
    });
    const prodPath = h.credsPath({
      sso_account_id: "222222222222",
      sso_role_name: "AdministratorAccess",
    });
    expect(devPath).not.toBe(prodPath);
    expect(h.files.has(devPath)).toBe(true);
    expect(h.files.has(prodPath)).toBe(true);
    expect(
      h.files.has(
        join(h.cacheDir, `${ssoTokenCacheName(SESSION)}.credentials.json`),
      ),
    ).toBe(false);

    expect(JSON.parse(h.files.get(prodPath)!)).toMatchObject({
      accessKeyId: "AKIA-222222222222-AdministratorAccess",
      sso_account_id: "222222222222",
      sso_role_name: "AdministratorAccess",
    });
  });

  test("same account, different role is a different cache entry", async () => {
    await h.load("prod");
    const readonly = await h.load("prod-readonly");
    expect(Redacted.value(readonly.accessKeyId)).toBe(
      "AKIA-222222222222-ReadOnlyAccess",
    );
    expect(h.portalCalls).toEqual([
      "222222222222/AdministratorAccess",
      "222222222222/ReadOnlyAccess",
    ]);
  });

  test("cache hit for the same account+role makes no portal call", async () => {
    const first = await h.load("dev");
    const second = await h.load("dev");
    expect(h.portalCalls).toEqual(["111111111111/AdministratorAccess"]);
    expect(Redacted.value(second.accessKeyId)).toBe(
      Redacted.value(first.accessKeyId),
    );
    expect(second.region).toBe("us-west-2");
  });

  test("expired cache entry is refetched", async () => {
    await h.load("dev");
    const path = h.credsPath({
      sso_account_id: "111111111111",
      sso_role_name: "AdministratorAccess",
    });
    const cached = JSON.parse(h.files.get(path)!);
    h.files.set(
      path,
      JSON.stringify({
        ...cached,
        accessKeyId: "AKIA-stale",
        expiry: Date.now() - 1000,
      }),
    );

    const fresh = await h.load("dev");
    expect(Redacted.value(fresh.accessKeyId)).toBe(
      "AKIA-111111111111-AdministratorAccess",
    );
    expect(h.portalCalls).toEqual([
      "111111111111/AdministratorAccess",
      "111111111111/AdministratorAccess",
    ]);
    expect(JSON.parse(h.files.get(path)!).accessKeyId).toBe(
      "AKIA-111111111111-AdministratorAccess",
    );
  });

  test("a cached file naming a different account or role is not a hit", async () => {
    const path = h.credsPath({
      sso_account_id: "222222222222",
      sso_role_name: "AdministratorAccess",
    });
    // Same filename, but the contents claim to be another account's keys.
    h.files.set(
      path,
      JSON.stringify({
        accessKeyId: "AKIA-wrong-account",
        secretAccessKey: "secret-wrong-account",
        sessionToken: "session-wrong-account",
        expiry: inOneHour().getTime(),
        sso_account_id: "111111111111",
        sso_role_name: "AdministratorAccess",
      }),
    );

    const prod = await h.load("prod");
    expect(Redacted.value(prod.accessKeyId)).toBe(
      "AKIA-222222222222-AdministratorAccess",
    );
    expect(h.portalCalls).toEqual(["222222222222/AdministratorAccess"]);
    expect(JSON.parse(h.files.get(path)!).sso_account_id).toBe("222222222222");
  });

  test("a legacy session-keyed .credentials.json is never reused", async () => {
    // The pre-#565 layout: role creds under the token's session-only key,
    // without account/role fields. It must be ignored even if it were to
    // land under the new filename.
    const legacy = JSON.stringify({
      accessKeyId: "AKIA-legacy",
      secretAccessKey: "secret-legacy",
      sessionToken: "session-legacy",
      expiry: inOneHour().getTime(),
    });
    h.files.set(
      join(h.cacheDir, `${ssoTokenCacheName(SESSION)}.credentials.json`),
      legacy,
    );
    h.files.set(
      h.credsPath({
        sso_account_id: "222222222222",
        sso_role_name: "AdministratorAccess",
      }),
      legacy,
    );

    const prod = await h.load("prod");
    expect(Redacted.value(prod.accessKeyId)).toBe(
      "AKIA-222222222222-AdministratorAccess",
    );
    expect(h.portalCalls).toEqual(["222222222222/AdministratorAccess"]);
  });

  test("token file stays keyed by session only", async () => {
    expect(ssoTokenCacheName(SESSION)).toBe(sha1(SESSION));
    expect(ssoTokenCacheName(START_URL)).toBe(sha1(START_URL));

    // Both profiles read the same token file; no other token path is read.
    const reads: string[] = [];
    const inner = h.files;
    const fs = FileSystem.layerNoop({
      readFileString: (path) => {
        reads.push(path);
        return inner.has(path)
          ? Effect.succeed(inner.get(path)!)
          : Effect.fail(
              PlatformError.systemError({
                _tag: "NotFound",
                module: "FileSystem",
                method: "readFileString",
                pathOrDescriptor: path,
              }),
            );
      },
      writeFileString: (path, data) =>
        Effect.sync(() => {
          inner.set(path, data);
        }),
    });
    const http = Layer.succeed(HttpClient.HttpClient)(
      HttpClient.make((request, url) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            Response.json({
              roleCredentials: {
                accessKeyId: `AKIA-${url.searchParams.get("account_id")}`,
                secretAccessKey: "s",
                sessionToken: "t",
                expiration: inOneHour().getTime(),
              },
            }),
          ),
        ),
      ),
    );
    const layer = Layer.mergeAll(fs, http, Path.layer);
    for (const profile of ["dev", "prod"]) {
      await Effect.runPromise(
        Effect.flatMap(makeAuthService(), (auth) =>
          auth.loadProfileCredentials(profile),
        ).pipe(Effect.provide(layer)),
      );
    }

    const tokenPath = join(h.cacheDir, `${ssoTokenCacheName(SESSION)}.json`);
    const tokenReads = reads.filter(
      (p) => p.startsWith(h.cacheDir) && !p.endsWith(".credentials.json"),
    );
    expect(tokenReads).toEqual([tokenPath, tokenPath]);
  });

  test("role cache key formula covers session, account and role", () => {
    const base = {
      sso_session: SESSION,
      sso_account_id: "111111111111",
      sso_role_name: "AdministratorAccess",
    };
    expect(ssoRoleCredentialsCacheName(base)).toBe(
      sha1(`${SESSION}\n111111111111\nAdministratorAccess`),
    );
    expect(ssoRoleCredentialsCacheName(base)).not.toBe(
      ssoRoleCredentialsCacheName({ ...base, sso_account_id: "222222222222" }),
    );
    expect(ssoRoleCredentialsCacheName(base)).not.toBe(
      ssoRoleCredentialsCacheName({ ...base, sso_role_name: "ReadOnlyAccess" }),
    );
    expect(ssoRoleCredentialsCacheName(base)).not.toBe(
      ssoTokenCacheName(SESSION),
    );
    // Legacy inline profiles key on the start URL, like the token does.
    expect(
      ssoRoleCredentialsCacheName({
        ...base,
        sso_session: undefined,
        sso_start_url: START_URL,
      }),
    ).toBe(sha1(`${START_URL}\n111111111111\nAdministratorAccess`));
  });
});
