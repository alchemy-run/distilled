import { buildRequest } from "@distilled.cloud/core/protocol-http";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import { describe, expect, test } from "vitest";
import { Credentials, DEFAULT_API_BASE_URL } from "./credentials.ts";
import type { CloudflareOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import * as Workers from "./services/workers.ts";
import * as Platforms from "./services/workers_for_platforms.ts";

const identity = { accountId: "account", scriptName: "issues-worker" };
const observability = (enabled: boolean) => ({ enabled: true, issues: { enabled } });
const metadata = (enabled: boolean): Workers.PutScriptMetadata => ({
  mainModule: "worker.js",
  observability: observability(enabled),
});
const request = (inputAst: AST.AST, input: unknown) =>
  buildRequest({ inputAst, input, baseUrl: "https://api.cloudflare.com/client/v4" });
const multipartMetadata = (inputAst: AST.AST, input: unknown) => {
  const body = request(inputAst, input).body as { readonly formData?: FormData };
  const part = body.formData?.get("metadata");
  if (typeof part !== "string") throw new Error("Expected a JSON metadata form part");
  return JSON.parse(part);
};
const run = <A, E>(operation: Effect.Effect<A, E, CloudflareOpContext>, result: unknown) =>
  runValidationModes(
    operation.pipe(
      Retry.none,
      Effect.provideService(
        Credentials,
        Effect.succeed({
          type: "apiToken",
          apiToken: Redacted.make("offline-fixture"),
          apiBaseUrl: DEFAULT_API_BASE_URL,
        }),
      ),
    ),
    { body: JSON.stringify({ success: true, errors: [], messages: [], result }) },
  );

for (const enabled of [true, false]) {
  describe(`Workers Issues enabled=${enabled}`, () => {
    test("issues-only upload omits top-level enabled", () => {
      const input = {
        ...identity,
        metadata: { observability: { issues: { enabled } } },
      } satisfies Workers.PutScriptRequest;
      expect(
        Schema.decodeUnknownSync(Schema.toType(Workers.PutScriptMetadata))(input.metadata),
      ).toEqual(input.metadata);
      expect(multipartMetadata(Workers.PutScriptRequest.ast, input)).toEqual(input.metadata);
      expect(multipartMetadata(Workers.CreateScriptVersionRequest.ast, input)).toEqual(
        input.metadata,
      );
    });

    test("Workers for Platforms accepts issues-only upload metadata for schema parity", () => {
      const input = {
        ...identity,
        dispatchNamespace: "namespace",
        metadata: { observability: { issues: { enabled } } },
      } satisfies Platforms.PutDispatchNamespaceScriptRequest;
      expect(
        Schema.decodeUnknownSync(Schema.toType(Platforms.PutDispatchNamespaceScriptMetadata))(
          input.metadata,
        ),
      ).toEqual(input.metadata);
      expect(multipartMetadata(Platforms.PutDispatchNamespaceScriptRequest.ast, input)).toEqual(
        input.metadata,
      );
    });

    test("script upload preserves the boolean in multipart metadata", () => {
      const input = { ...identity, metadata: metadata(enabled) } satisfies Workers.PutScriptRequest;
      expect(multipartMetadata(Workers.PutScriptRequest.ast, input)).toEqual({
        main_module: "worker.js",
        observability: observability(enabled),
      });
    });

    test("version upload preserves shared metadata without asserting endpoint support", () => {
      const input = {
        ...identity,
        metadata: metadata(enabled),
      } satisfies Workers.CreateScriptVersionRequest;
      expect(multipartMetadata(Workers.CreateScriptVersionRequest.ast, input)).toEqual({
        main_module: "worker.js",
        observability: observability(enabled),
      });
    });

    test("Workers for Platforms preserves upload schema parity without asserting endpoint support", () => {
      const input = {
        ...identity,
        dispatchNamespace: "namespace",
        metadata: {
          mainModule: "worker.js",
          observability: observability(enabled),
        },
      } satisfies Platforms.PutDispatchNamespaceScriptRequest;
      expect(multipartMetadata(Platforms.PutDispatchNamespaceScriptRequest.ast, input)).toEqual({
        main_module: "worker.js",
        observability: observability(enabled),
      });
    });

    test("issues-only script-settings PATCH omits top-level enabled", () => {
      const input = {
        ...identity,
        observability: { issues: { enabled } },
      } satisfies Workers.PatchScriptSettingRequest;
      expect(
        Schema.decodeUnknownSync(Schema.toType(Workers.PatchScriptSettingRequest))(input),
      ).toEqual(input);
      const built = request(Workers.PatchScriptSettingRequest.ast, input);
      expect(built.method).toBe("PATCH");
      expect(built.url.endsWith("/scripts/issues-worker/script-settings")).toBe(true);
      if (built.body._tag !== "Uint8Array") throw new Error("Expected a JSON body");
      expect(JSON.parse(new TextDecoder().decode(built.body.body))).toEqual({
        observability: { issues: { enabled } },
      });
    });

    test("script-settings PATCH sends the boolean in JSON and decodes its response", async () => {
      const input = {
        ...identity,
        observability: observability(enabled),
      } satisfies Workers.PatchScriptSettingRequest;
      const built = request(Workers.PatchScriptSettingRequest.ast, input);
      expect(built.method).toBe("PATCH");
      expect(built.url.endsWith("/scripts/issues-worker/script-settings")).toBe(true);
      if (built.body._tag !== "Uint8Array") throw new Error("Expected a JSON body");
      expect(JSON.parse(new TextDecoder().decode(built.body.body))).toEqual({
        observability: observability(enabled),
      });
      const result = { observability: observability(enabled) };
      const { lenient, strict } = await run(Workers.patchScriptSetting(input), result);
      expect(lenient).toMatchObject({ _tag: "Success", success: result });
      expect(strict).toMatchObject({ _tag: "Success", success: result });
    });

    test("script-settings GET decodes the boolean", async () => {
      const result = { observability: observability(enabled) };
      const { lenient, strict } = await run(Workers.getScriptSetting(identity), result);
      expect(lenient).toMatchObject({ _tag: "Success", success: result });
      expect(strict).toMatchObject({ _tag: "Success", success: result });
    });

    test("combined settings GET decodes the boolean", async () => {
      const result = { observability: observability(enabled) };
      const { lenient, strict } = await run(
        Workers.getScriptScriptAndVersionSetting(identity),
        result,
      );
      expect(lenient).toMatchObject({ _tag: "Success", success: result });
      expect(strict).toMatchObject({ _tag: "Success", success: result });
    });

    test("combined settings PATCH decodes the boolean", async () => {
      const result = { observability: observability(enabled) };
      const { lenient, strict } = await run(
        Workers.patchScriptScriptAndVersionSetting({ ...identity, settings: result }),
        result,
      );
      expect(lenient).toMatchObject({ _tag: "Success", success: result });
      expect(strict).toMatchObject({ _tag: "Success", success: result });
    });

    test("script upload decodes the boolean", async () => {
      const { lenient, strict } = await run(
        Workers.putScript({ ...identity, metadata: metadata(enabled) }),
        { startup_time_ms: 1, observability: observability(enabled) },
      );
      const result = { startupTimeMs: 1, observability: observability(enabled) };
      expect(lenient).toMatchObject({ _tag: "Success", success: result });
      expect(strict).toMatchObject({ _tag: "Success", success: result });
    });
  });
}

describe("Workers Issues schema constraints", () => {
  test("omitting Issues does not synthesize an enabled setting", async () => {
    const input = {
      ...identity,
      metadata: { observability: { enabled: true } },
    } satisfies Workers.PutScriptRequest;
    expect(multipartMetadata(Workers.PutScriptRequest.ast, input)).toEqual({
      observability: { enabled: true },
    });
    const result = { observability: { enabled: true } };
    const { lenient, strict } = await run(Workers.getScriptSetting(identity), result);
    expect(lenient).toMatchObject({ _tag: "Success", success: result });
    expect(strict).toMatchObject({ _tag: "Success", success: result });
  });

  test("response observability still requires top-level enabled", () => {
    for (const schema of [
      Workers.ScriptsSettingsEditResponseObservability,
      Workers.ScriptsSettingsGetResponseObservability,
      Workers.ScriptsScriptAndVersionSettingsEditResponseObservability,
      Workers.ScriptsScriptAndVersionSettingsGetResponseObservability,
      Workers.ScriptsUpdateResponseObservability,
    ]) {
      expect(() =>
        Schema.decodeUnknownSync(Schema.toType(schema))({ issues: { enabled: true } }),
      ).toThrow();
    }
  });

  test("Issues requires a boolean enabled member when present", () => {
    for (const schema of [
      Workers.PutScriptObservabilityIssues,
      Platforms.PutDispatchNamespaceScriptObservabilityIssues,
    ]) {
      const decode = Schema.decodeUnknownSync(Schema.toType(schema));
      expect(decode({ enabled: true })).toEqual({ enabled: true });
      expect(decode({ enabled: false })).toEqual({ enabled: false });
      expect(() => decode({})).toThrow();
      expect(() => decode({ enabled: "false" })).toThrow();
    }
  });
});
