import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  SdkCredentials,
  SdkCredentialsFromEnv,
  sdkServiceAccountCredentials,
} from "../src/credentials.ts";
import {
  AuthExpired,
  DesktopSessionExpired,
  OnepasswordSdkError,
  RateLimitExceeded,
} from "../src/errors.ts";
import * as ItemCategories from "../src/item-categories.ts";
import * as Retry from "../src/retry.ts";
import {
  type SdkTransport,
  type SdkTransportError,
  decodeCoreError,
  sdkClientLayer,
} from "../src/sdk-client.ts";
import { SDK_BUILD_NUMBER } from "../src/sdk-version.ts";
import * as SdkLocal from "../src/services/sdk-local.ts";
import * as Sdk from "../src/services/sdk.ts";

/** A transport that records what the client sends the core. */
const fakeTransport = (
  invoke: (request: string, clientId: number) => Effect.Effect<string, SdkTransportError>,
) => {
  const log = { init: [] as string[], invoke: [] as string[], release: [] as string[] };
  let nextId = 7;
  const transport: SdkTransport = {
    initClient: (config) =>
      Effect.sync(() => {
        log.init.push(config);
        return String(nextId++);
      }),
    invoke: (request) => {
      log.invoke.push(request);
      const clientId = (JSON.parse(request) as { invocation: { clientId: number } }).invocation
        .clientId;
      return invoke(request, clientId);
    },
    releaseClient: (id) =>
      Effect.sync(() => {
        log.release.push(id);
      }),
  };
  const layer = sdkClientLayer(() => Effect.succeed(transport)).pipe(
    Layer.provide(sdkServiceAccountCredentials({ token: Redacted.make("ops_x") })),
  );
  return { log, layer };
};

const run = <A, E, R>(effect: Effect.Effect<A, E, R>, layer: Layer.Layer<any, any>) =>
  Effect.runPromise(effect.pipe(Retry.none, Effect.provide(layer)) as Effect.Effect<A, any, never>);

const item = {
  id: "i",
  title: "t",
  category: "Login",
  vaultId: "v",
  fields: [
    { id: "username", title: "username", fieldType: "Text", value: "u" },
    { id: "password", title: "password", fieldType: "Concealed", value: "pw" },
  ],
  sections: [],
  notes: "",
  tags: [],
  websites: [],
  version: 1,
  files: [],
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("SdkClient", () => {
  test("getItem sends the invocation and returns secret field values Redacted", async () => {
    const { log, layer } = fakeTransport(() => Effect.succeed(JSON.stringify(item)));
    const result = await run(Sdk.getItem({ vault_id: "v", item_id: "i" }), layer);

    const init = JSON.parse(log.init[0]!);
    expect(init.serviceAccountToken).toBe("ops_x");
    expect(init.sdkVersion).toBe(SDK_BUILD_NUMBER);
    expect(init.programmingLanguage).toBe("JS");
    expect(log.invoke[0]).toBe(
      '{"invocation":{"clientId":7,"parameters":{"name":"ItemsGet","parameters":{"vault_id":"v","item_id":"i"}}}}',
    );
    const password = result.fields.find((f) => f.id === "password")!;
    expect(Redacted.isRedacted(password.value)).toBe(true);
    expect(Redacted.value(password.value as Redacted.Redacted<string>)).toBe("pw");
  });

  test("resolveSecret returns the secret Redacted", async () => {
    const { layer } = fakeTransport(() => Effect.succeed('"s3cr3t"'));
    const secret = await run(Sdk.resolveSecret({ secret_reference: "op://a/b/c" }), layer);
    expect(Redacted.isRedacted(secret)).toBe(true);
    expect(Redacted.value(secret as Redacted.Redacted<string>)).toBe("s3cr3t");
  });

  test("core errors surface typed", async () => {
    const limited = fakeTransport(() => Effect.fail(new RateLimitExceeded({ message: "slow" })));
    const error = await Effect.runPromise(
      Sdk.listVaults({}).pipe(
        Retry.none,
        Effect.flip,
        Effect.provide(limited.layer),
      ) as Effect.Effect<unknown, never, never>,
    );
    expect(error).toBeInstanceOf(RateLimitExceeded);
  });

  test("decodeCoreError maps the core's error JSON and plain text", () => {
    expect(decodeCoreError('{"name":"RateLimitExceeded","message":"slow"}')).toBeInstanceOf(
      RateLimitExceeded,
    );
    expect(decodeCoreError('{"name":"AuthExpired","message":"x"}')).toBeInstanceOf(AuthExpired);
    expect(decodeCoreError('{"name":"DesktopSessionExpired","message":"x"}')).toBeInstanceOf(
      DesktopSessionExpired,
    );
    const other = decodeCoreError('{"name":"Weird","message":"m"}');
    expect(other).toBeInstanceOf(OnepasswordSdkError);
    expect(other).toMatchObject({ kind: "Weird", message: "m" });
    const text = decodeCoreError("boom");
    expect(text).toBeInstanceOf(OnepasswordSdkError);
    expect(text.message).toBe("boom");
  });

  test("an expired desktop session re-initialises the client and retries once", async () => {
    const { log, layer } = fakeTransport((_request, clientId) =>
      clientId === 7
        ? Effect.fail(new DesktopSessionExpired({ message: "expired" }))
        : Effect.succeed("[]"),
    );
    await run(Sdk.listVaults({}), layer);
    expect(log.init).toHaveLength(2);
    expect(log.invoke).toHaveLength(2);
    expect(JSON.parse(log.invoke[1]!).invocation.clientId).toBe(8);
    // The scope closing releases the current client, not the first one.
    expect(log.release).toEqual(["8"]);
  });

  test("concurrent calls on an expired session share one re-initialisation", async () => {
    const { log, layer } = fakeTransport((_request, clientId) =>
      clientId === 7
        ? Effect.fail(new DesktopSessionExpired({ message: "expired" }))
        : Effect.succeed("[]"),
    );
    await run(
      Effect.all(
        Array.from({ length: 5 }, () => Sdk.listVaults({})),
        { concurrency: "unbounded" },
      ),
      layer,
    );
    expect(log.init).toHaveLength(2);
  });

  test("a Redacted field value goes on the wire as a plain string", async () => {
    const { log, layer } = fakeTransport(() => Effect.succeed(JSON.stringify(item)));
    await run(
      Sdk.putItem({
        item: {
          ...item,
          category: "Login",
          fields: [
            {
              id: "password",
              title: "password",
              fieldType: "Concealed",
              value: Redacted.make("new-pw"),
            },
          ],
        } as Sdk.PutItemRequest["item"],
      }),
      layer,
    );
    expect(log.invoke[0]).toContain('"value":"new-pw"');
    expect(log.invoke[0]).not.toContain("Redacted");
  });
});

describe("SdkCredentialsFromEnv", () => {
  const read = (env: Record<string, string>) =>
    Effect.runPromise(
      Effect.flatMap(SdkCredentials, (credentials) => credentials).pipe(
        Effect.provide(SdkCredentialsFromEnv),
        Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(env))),
      ),
    );

  test("a service account token wins over OP_ACCOUNT", async () => {
    const config = await read({ OP_SERVICE_ACCOUNT_TOKEN: "ops_t", OP_ACCOUNT: "me" });
    expect(config.auth._tag).toBe("ServiceAccount");
  });

  test("OP_ACCOUNT alone selects the desktop app", async () => {
    const config = await read({ OP_ACCOUNT: "my.1password.com" });
    expect(config.auth).toEqual({ _tag: "DesktopApp", accountName: "my.1password.com" });
  });

  test("neither fails with a ConfigError", async () => {
    await expect(read({})).rejects.toMatchObject({ _tag: "ConfigError" });
  });
});

describe("ItemCategories.Login", () => {
  test("create builds the login fields and adds the totp section once", () => {
    const params = ItemCategories.Login.create({
      vaultId: "v",
      title: "site",
      values: {
        username: "u",
        password: Redacted.make("p"),
        totp: "otpauth://totp/x?secret=ABC",
      },
    });
    expect(params.category).toBe("Login");
    expect(params.fields?.map((f) => f.id)).toEqual(["username", "password", "onetimepassword"]);
    expect(params.sections?.filter((s) => s.id === "totp")).toHaveLength(1);
  });

  test("read returns plain strings and Redacted secrets", () => {
    const values = ItemCategories.Login.read({
      ...item,
      fields: [
        { id: "username", title: "username", fieldType: "Text", value: Redacted.make("u") },
        { id: "password", title: "password", fieldType: "Concealed", value: Redacted.make("pw") },
      ],
    } as never);
    expect(values.username).toBe("u");
    expect(Redacted.value(values.password!)).toBe("pw");
    expect(values.totp).toBeUndefined();
  });

  test("read finds a totp field the app named differently", () => {
    const values = ItemCategories.Login.read({
      ...item,
      fields: [{ id: "TOTP_x", title: "otp", fieldType: "Totp", value: "otpauth://x" }],
    } as never);
    expect(Redacted.value(values.totp!)).toBe("otpauth://x");
  });

  test("update replaces the password value", () => {
    const updated = ItemCategories.Login.update(item as never, { password: "new" });
    const field = updated.fields.find((f) => f.id === "password")!;
    expect(Redacted.isRedacted(field.value) ? Redacted.value(field.value) : field.value).toBe(
      "new",
    );
  });
});

describe("SdkLocal (the real WASM core)", () => {
  test("generatePassword returns a Redacted PIN", async () => {
    const result = await Effect.runPromise(
      SdkLocal.generatePassword({ recipe: { type: "Pin", parameters: { length: 8 } } }).pipe(
        Retry.none,
      ) as Effect.Effect<{ password: Redacted.Redacted<string> | string }, never, never>,
    );
    expect(Redacted.isRedacted(result.password)).toBe(true);
    expect(Redacted.value(result.password as Redacted.Redacted<string>)).toMatch(/^\d{8}$/);
  });

  test("validateSecretReference rejects a malformed reference", async () => {
    const error = await Effect.runPromise(
      SdkLocal.validateSecretReference({ secret_reference: "not a ref" }).pipe(
        Retry.none,
        Effect.flip,
      ) as Effect.Effect<unknown, never, never>,
    );
    expect(error).toBeInstanceOf(OnepasswordSdkError);
  });
});
