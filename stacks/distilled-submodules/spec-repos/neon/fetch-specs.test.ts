import { expect, test } from "bun:test";
import { serializeSpec } from "./fetch-specs.ts";

test("rejects error envelopes, HTML and empty or malformed OpenAPI paths", () => {
  for (const body of [
    null,
    "<html>login</html>",
    { message: "rate limited" },
    { openapi: "3.0.3" },
    { openapi: "3.0.3", paths: null },
    { openapi: "3.0.3", paths: [] },
    { openapi: "3.0.3", paths: {} },
  ]) {
    expect(() => serializeSpec(body)).toThrow("nonempty OpenAPI document");
  }
});

test("writes deterministic indented JSON with a trailing newline", () => {
  const spec = { openapi: "3.0.3", paths: { "/projects": {} } };
  const text = serializeSpec(spec);
  expect(text).toBe(JSON.stringify(spec, null, 2) + "\n");
  expect(serializeSpec(JSON.parse(text))).toBe(text);
});
