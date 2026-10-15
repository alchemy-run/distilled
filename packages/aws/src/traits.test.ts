import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as S from "effect/Schema";
import { Blob } from "./traits.ts";

describe("Blob", () => {
  it("round-trips payloads larger than the engine's argument limit", () => {
    const bytes = Uint8Array.from({ length: 1_000_000 }, (_, i) => i % 256);
    const encoded = S.encodeSync(Blob)(bytes);
    assert.equal(encoded, Buffer.from(bytes).toString("base64"));
    assert.deepEqual(S.decodeSync(Blob)(encoded), bytes);
  });
});
