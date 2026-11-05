/**
 * Rows carry user-defined attributes and query metadata (`$dist`) beyond
 * `id` and `vector` (issue #706). They survive the wire in both directions,
 * pass strict response validation, and type as `unknown` on `Row`.
 */
import { mockHttpClient, runValidationModes } from "@distilled.cloud/dev/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, expectTypeOf, test } from "vitest";
import { fromApiKey } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import {
  createNamespaceQuery,
  updateNamespace,
  type Columns,
  type CreateNamespaceQueryResponse,
  type Row,
} from "../src/services/turbopuffer.ts";

const credentials = fromApiKey({ apiKey: Redacted.make("test-key") });

const row = {
  id: "doc-1",
  title: "Example",
  active: true,
  count: 3,
  missing: null,
  tags: ["example"],
  $dist: 0.12,
};

const queryResponse = (rows: ReadonlyArray<unknown>) =>
  JSON.stringify({
    rows,
    performance: {
      cache_hit_ratio: 1,
      cache_temperature: "hot",
      server_total_ms: 1,
      query_execution_ms: 1,
      exhaustive_search_count: 0,
      approx_namespace_size: 1,
    },
    billing: { billable_logical_bytes_queried: 1, billable_logical_bytes_returned: 1 },
  });

const query = createNamespaceQuery({ namespace: "docs" }).pipe(
  Retry.none,
  Effect.provide(credentials),
);

describe("turbopuffer rows (#706)", () => {
  test("query rows keep custom attributes and $dist in every validation mode", async () => {
    // `Row` is open, so even strict mode, which rejects unmodeled keys,
    // accepts the attributes.
    const results = await runValidationModes(query, { body: queryResponse([row]) });
    for (const result of Object.values(results)) {
      expect(result._tag).toBe("Success");
      if (result._tag === "Success") expect(result.success.rows).toEqual([row]);
    }
  });

  test("the validating modes still reject a row without id", async () => {
    const { lenient, additionalProperties, strict } = await runValidationModes(query, {
      body: queryResponse([{ title: "no id" }]),
    });
    expect(lenient._tag).toBe("Success");
    expect(additionalProperties._tag).toBe("Failure");
    expect(strict._tag).toBe("Failure");
  });

  test("upsert_rows and upsert_columns send custom attributes", async () => {
    const bodies: unknown[] = [];
    await Effect.runPromise(
      updateNamespace({
        namespace: "docs",
        upsert_rows: [row],
        upsert_columns: { id: ["doc-1"], title: ["Example"] },
      }).pipe(
        Retry.none,
        Effect.provide(credentials),
        Effect.provide(
          mockHttpClient((request) => {
            bodies.push(JSON.parse(new TextDecoder().decode((request.body as any).body)));
            return { body: JSON.stringify({ rows_affected: 1, billing: {} }) };
          }),
        ),
      ),
    );
    expect(bodies).toEqual([
      { upsert_rows: [row], upsert_columns: { id: ["doc-1"], title: ["Example"] } },
    ]);
  });

  test("Row and Columns type extra keys as unknown", () => {
    expectTypeOf<Row["title"]>().toEqualTypeOf<unknown>();
    expectTypeOf<Row["$dist"]>().toEqualTypeOf<unknown>();
    expectTypeOf<Columns["title"]>().toEqualTypeOf<unknown>();
    expectTypeOf<NonNullable<CreateNamespaceQueryResponse["rows"]>[number]>().toEqualTypeOf<Row>();
    // Declared members keep their types.
    expectTypeOf<Row["id"]>().toEqualTypeOf<string | number>();
    // A row literal with attributes is a valid Row.
    const literal: Row = { id: "a", title: "x", $dist: 0.5 };
    expect(literal.title).toBe("x");
  });
});
