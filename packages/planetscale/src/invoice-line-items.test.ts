import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromOAuth } from "./credentials.ts";
import { PlanetScaleParseError } from "./errors.ts";
import * as Retry from "./retry.ts";
import { getInvoiceLineItems } from "./services/planetscale.ts";

// The live API returns line-item `subtotal` as a stringified decimal, not the
// number the upstream spec declares (patches/line-item-subtotal.patch.json).
// All values here are synthetic; only their JSON types mirror the live API.
const run = (body: unknown) =>
  runValidationModes(
    getInvoiceLineItems({ organization: "org", id: "inv1" }).pipe(
      Retry.none,
      Effect.provide(fromOAuth({ accessToken: "test", organization: "org" })),
    ),
    { body: JSON.stringify(body) },
  );

const lineItem = (subtotal: unknown) => ({
  id: "li1",
  subtotal,
  description: "Example line item",
  metric_name: "cluster",
  cloudflare_billed: false,
  database_id: "db1",
  database_name: "db",
  resource: {
    id: "r1",
    name: "main",
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
    deleted_at: null,
  },
});

const page = (...data: unknown[]) => ({
  type: "list",
  current_page: 1,
  per_page: 25,
  next_page: null,
  next_page_url: null,
  prev_page: null,
  prev_page_url: null,
  data,
});

describe("PlanetScale getInvoiceLineItems", () => {
  test("a stringified-decimal subtotal decodes in strict mode", async () => {
    const body = page(lineItem("10.0"), lineItem("2.5"));
    const { lenient, strict } = await run(body);
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a numeric subtotal fails strict decode", async () => {
    const { strict } = await run(page(lineItem(10)));
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(PlanetScaleParseError);
  });
});
