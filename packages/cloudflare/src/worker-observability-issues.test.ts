import { describe, expect, test } from "bun:test";
import { buildRequest } from "@distilled.cloud/core/protocol-http";
import type * as AST from "effect/SchemaAST";
import {
  type PutScriptMetadata,
  PutScriptRequest,
} from "./services/workers.ts";
import { PutDispatchNamespaceScriptRequest } from "./services/workers_for_platforms.ts";

/**
 * A Worker upload's `observability.issues.enabled` turns on real-time
 * Issues; it reaches the multipart `metadata` part instead of being dropped
 * as an unknown member.
 */
const metadataOf = (inputAst: AST.AST, input: unknown) => {
  const body = buildRequest({
    input,
    inputAst,
    baseUrl: "https://api.cloudflare.com/client/v4",
  }).body as { readonly formData?: FormData };
  if (!body.formData) throw new Error("request body is not multipart");
  const part = body.formData.get("metadata");
  if (part === null) throw new Error("no metadata part");
  return part instanceof Blob ? part.text() : Promise.resolve(String(part));
};

const metadata: PutScriptMetadata = {
  mainModule: "index.js",
  observability: { enabled: true, issues: { enabled: true } },
};

describe("Worker observability issues", () => {
  test("putScript sends observability.issues.enabled", async () => {
    const json = JSON.parse(
      await metadataOf(PutScriptRequest.ast, {
        accountId: "account",
        scriptName: "worker",
        metadata,
      }),
    );
    expect(json.observability).toEqual({
      enabled: true,
      issues: { enabled: true },
    });
  });

  test("putDispatchNamespaceScript sends observability.issues.enabled", async () => {
    const json = JSON.parse(
      await metadataOf(PutDispatchNamespaceScriptRequest.ast, {
        accountId: "account",
        dispatchNamespace: "namespace",
        scriptName: "worker",
        metadata,
      }),
    );
    expect(json.observability).toEqual({
      enabled: true,
      issues: { enabled: true },
    });
  });
});
