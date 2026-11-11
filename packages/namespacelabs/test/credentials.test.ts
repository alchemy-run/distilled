import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as PlatformError from "effect/PlatformError";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  Credentials,
  CredentialsFromEnv,
  CredentialsFromTokenFile,
  fromTokenFile,
} from "../src/credentials.ts";

const resolveWith = <R>(layer: Layer.Layer<Credentials, never, R>, env: Record<string, string>) =>
  Effect.flatten(Credentials).pipe(
    Effect.provide(layer),
    Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromEnv({ env })),
  );

const run = <A, E>(effect: Effect.Effect<A, E>) => Effect.runPromise(Effect.result(effect));

describe("CredentialsFromEnv", () => {
  test("NSC_TOKEN is required", async () => {
    const result = await run(resolveWith(CredentialsFromEnv, {}));
    expect(result).toMatchObject({
      _tag: "Failure",
      failure: { _tag: "ConfigError", message: "NSC_TOKEN environment variable is required" },
    });
  });

  test("NSC_REGION selects the compute and storage hosts", async () => {
    const result = await run(resolveWith(CredentialsFromEnv, { NSC_TOKEN: "t", NSC_REGION: "eu" }));
    expect(result).toMatchObject({
      _tag: "Success",
      success: {
        region: "eu",
        computeBaseUrl: "https://eu.compute.namespaceapis.com",
        storageBaseUrl: "https://eu.storage.namespaceapis.com",
        globalBaseUrl: "https://global.namespaceapis.com",
        privateApiBaseUrl: "https://private-api.global.namespaceapis.com",
      },
    });
  });

  test("NSC_ENDPOINT is the compute host unless NSC_COMPUTE_URL is set", async () => {
    const fromEndpoint = await run(
      resolveWith(CredentialsFromEnv, {
        NSC_TOKEN: "t",
        NSC_ENDPOINT: "https://iad4.compute.test",
      }),
    );
    expect(fromEndpoint).toMatchObject({
      _tag: "Success",
      success: { computeBaseUrl: "https://iad4.compute.test" },
    });
    const explicit = await run(
      resolveWith(CredentialsFromEnv, {
        NSC_TOKEN: "t",
        NSC_ENDPOINT: "https://iad4.compute.test",
        NSC_COMPUTE_URL: "http://localhost:8080",
      }),
    );
    expect(explicit).toMatchObject({
      _tag: "Success",
      success: { computeBaseUrl: "http://localhost:8080" },
    });
  });
});

describe("CredentialsFromTokenFile", () => {
  const files = new Map<string, string>();
  const reads: string[] = [];
  const fs = FileSystem.layerNoop({
    readFileString: (path) =>
      Effect.suspend(() => {
        reads.push(path);
        const content = files.get(path);
        return content === undefined
          ? Effect.fail(
              PlatformError.systemError({
                _tag: "NotFound",
                module: "FileSystem",
                method: "readFileString",
                pathOrDescriptor: path,
              }),
            )
          : Effect.succeed(content);
      }),
  });
  const withFs = <A, E>(effect: Effect.Effect<A, E, FileSystem.FileSystem>) =>
    run(Effect.provide(effect, fs));

  test("reads bearer_token from /var/run/nsc/token.json and re-reads on every resolution", async () => {
    reads.length = 0;
    files.set("/var/run/nsc/token.json", JSON.stringify({ bearer_token: "first" }));
    const resolve = Effect.flatten(Credentials).pipe(
      Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromEnv({ env: {} })),
    );
    const result = await withFs(
      Effect.gen(function* () {
        const a = yield* resolve;
        files.set("/var/run/nsc/token.json", JSON.stringify({ bearer_token: "second" }));
        const b = yield* resolve;
        return [Redacted.value(a.token), Redacted.value(b.token)];
      }).pipe(Effect.provide(CredentialsFromTokenFile)),
    );
    expect(result).toMatchObject({ _tag: "Success", success: ["first", "second"] });
    expect(reads).toEqual(["/var/run/nsc/token.json", "/var/run/nsc/token.json"]);
  });

  test("NSC_TOKEN_FILE overrides the path and the host variables still apply", async () => {
    files.set("/tmp/token.json", JSON.stringify({ bearer_token: "t" }));
    const result = await withFs(
      resolveWith(CredentialsFromTokenFile, {
        NSC_TOKEN_FILE: "/tmp/token.json",
        NSC_REGION: "eu",
      }),
    );
    expect(result).toMatchObject({
      _tag: "Success",
      success: { region: "eu", computeBaseUrl: "https://eu.compute.namespaceapis.com" },
    });
  });

  test("a missing file and a file without bearer_token are ConfigErrors", async () => {
    const missing = await withFs(
      resolveWith(CredentialsFromTokenFile, { NSC_TOKEN_FILE: "/nowhere/token.json" }),
    );
    expect(missing).toMatchObject({
      _tag: "Failure",
      failure: {
        _tag: "ConfigError",
        message: "Namespace token file /nowhere/token.json could not be read",
      },
    });
    files.set("/tmp/session.json", JSON.stringify({ session_token: "s" }));
    const session = await withFs(
      resolveWith(CredentialsFromTokenFile, { NSC_TOKEN_FILE: "/tmp/session.json" }),
    );
    expect(session).toMatchObject({
      _tag: "Failure",
      failure: { _tag: "ConfigError", message: expect.stringContaining("has no bearer_token") },
    });
  });

  test("fromTokenFile takes the path and hosts in code", async () => {
    files.set("/tmp/explicit.json", JSON.stringify({ bearer_token: "t" }));
    const result = await withFs(
      Effect.flatten(Credentials).pipe(
        Effect.provide(fromTokenFile("/tmp/explicit.json", { region: "eu" })),
      ),
    );
    expect(result).toMatchObject({
      _tag: "Success",
      success: { storageBaseUrl: "https://eu.storage.namespaceapis.com" },
    });
  });
});
