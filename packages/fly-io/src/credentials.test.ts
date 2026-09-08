import { describe, expect, test } from "bun:test";
import { DEFAULT_API_BASE_URL, normalizeApiBaseUrl } from "./credentials.ts";

describe("normalizeApiBaseUrl", () => {
  // The generated Machines routes are `/v1/apps/...`, so the base URL must
  // stop at the host — `<base>/v1/apps` doubling the prefix 404s upstream.
  test.each([
    [undefined, DEFAULT_API_BASE_URL],
    ["", DEFAULT_API_BASE_URL],
    ["  ", DEFAULT_API_BASE_URL],
    ["https://api.machines.dev", "https://api.machines.dev"],
    ["https://api.machines.dev/", "https://api.machines.dev"],
    ["https://api.machines.dev/v1", "https://api.machines.dev"],
    ["https://api.machines.dev/v1/", "https://api.machines.dev"],
    ["http://_api.internal:4280", "http://_api.internal:4280"],
    ["http://_api.internal:4280/v1", "http://_api.internal:4280"],
    ["http://localhost/v1", "http://localhost"],
  ])("%p → %p", (input, expected) => {
    expect(normalizeApiBaseUrl(input)).toBe(expected);
  });

  test("default has no version segment", () => {
    expect(DEFAULT_API_BASE_URL).toBe("https://api.machines.dev");
  });
});
