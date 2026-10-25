import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { getOrganizationAuditLogs } from "../src/services/audit.ts";

// The query string getOrganizationAuditLogs sends, decoded.
const queryOf = async (filters: Record<string, unknown>) => {
  let url = "";
  const layer = Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) => {
        url = request.url;
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify({ items: [], total: 0, page: 1, totalPages: 0 }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
          ),
        );
      }),
    ),
    credentials({ apiKey: Redacted.make("dtn_test"), apiBaseUrl: "https://daytona.test/api" }),
  );
  await Effect.runPromise(
    getOrganizationAuditLogs({ organizationId: "org-1", ...filters }).pipe(
      Retry.none,
      Effect.provide(layer),
    ),
  );
  return decodeURIComponent(new URL(url).search);
};

describe("getOrganizationAuditLogs filters", () => {
  test("each filter's operators go in brackets under its own name", async () => {
    expect(
      await queryOf({
        actorId: { eq: "user-1" },
        targetId: { notIn: ["sb-1", "sb-2"] },
        limit: 5,
      }),
    ).toBe("?limit=5&actorId[eq]=user-1&targetId[notIn]=sb-1&targetId[notIn]=sb-2");
  });
});
