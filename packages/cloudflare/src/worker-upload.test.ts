import { describe, expect, test } from "bun:test";
import { buildRequest } from "@distilled.cloud/core/protocol-http";
import {
  CreateScriptVersionRequest,
  PutScriptRequest,
  type PutScriptMetadata,
} from "./services/workers.ts";
import {
  PutDispatchNamespaceScriptRequest,
  type PutDispatchNamespaceScriptMetadata,
} from "./services/workers_for_platforms.ts";
import { dispatchUploadPatch } from "../scripts/sync-worker-upload-patches.ts";
import workerPatch from "../patches/workers/putScript.manual.json";
import platformPatch from "../patches/workers_for_platforms/putDispatchNamespaceScript.manual.json";
import type { PatchFile } from "@distilled.cloud/core/json-patch";

test("the dispatch upload patch stays in sync with the canonical metadata", () => {
  expect(platformPatch as PatchFile).toEqual(
    dispatchUploadPatch(workerPatch as PatchFile),
  );
});

for (const [name, schema] of [
  ["Worker upload", PutScriptRequest],
  ["Worker version upload", CreateScriptVersionRequest],
  ["dispatch namespace upload", PutDispatchNamespaceScriptRequest],
] as const) {
  describe(name, () => {
    for (const runWorkerFirst of [false, true, ["/api/*", "!/api/public/*"]]) {
      test(`serializes asset config with runWorkerFirst=${JSON.stringify(runWorkerFirst)}`, () => {
        const headers = "/*\n  Cache-Control: public, max-age=3600\n";
        const redirects = "/old /new 301\n";
        const metadata = {
          mainModule: "index.js",
          compatibilityDate: "2026-09-23",
          annotations: { workersTag: "release-1" },
          limits: { cpuMs: 50 },
          cacheOptions: { enabled: true, crossVersionCache: true },
          assets: {
            jwt: "asset-upload-token",
            config: {
              headers,
              redirects,
              htmlHandling: "auto-trailing-slash",
              notFoundHandling: "single-page-application",
              runWorkerFirst,
            },
          },
        } satisfies PutScriptMetadata & PutDispatchNamespaceScriptMetadata;
        const file = new File(["export default {}"], "index.js", {
          type: "application/javascript+module",
        });
        const request = buildRequest({
          inputAst: schema.ast,
          baseUrl: "https://api.cloudflare.com/client/v4",
          input: {
            accountId: "account",
            dispatchNamespace: "namespace",
            scriptName: "script",
            metadata,
            files: [file],
          },
        });
        const form = (request.body as { formData: FormData }).formData;
        expect(form.get("index.js")).toBeInstanceOf(File);
        expect(JSON.parse(form.get("metadata") as string)).toEqual({
          main_module: "index.js",
          compatibility_date: "2026-09-23",
          annotations: { "workers/tag": "release-1" },
          limits: { cpu_ms: 50 },
          cache_options: { enabled: true, cross_version_cache: true },
          assets: {
            jwt: "asset-upload-token",
            config: {
              _headers: headers,
              _redirects: redirects,
              html_handling: "auto-trailing-slash",
              not_found_handling: "single-page-application",
              run_worker_first: runWorkerFirst,
            },
          },
        });
      });
    }

    test("supports retaining assets without an upload token", () => {
      const request = buildRequest({
        inputAst: schema.ast,
        baseUrl: "https://api.cloudflare.com/client/v4",
        input: {
          accountId: "account",
          dispatchNamespace: "namespace",
          scriptName: "script",
          metadata: { mainModule: "index.js", keepAssets: true },
        },
      });
      const form = (request.body as { formData: FormData }).formData;
      expect(JSON.parse(form.get("metadata") as string)).toEqual({
        main_module: "index.js",
        keep_assets: true,
      });
    });
  });
}
