import assert from "node:assert/strict";
import * as Effect from "effect/Effect";
import { describe, it } from "vitest";
import { ParseError } from "../../src/errors.ts";
import { parseXml } from "../../src/util/xml.ts";

describe("AWS XML error adapter", () => {
  it("exposes parser failures through Effect's typed channel", () => {
    const result = Effect.runSync(Effect.flip(parseXml("<R>")));
    assert.ok(result instanceof ParseError);
    assert.match(result.message, /Unclosed element/);
  });

  it("can execute the same lazy Effect repeatedly", () => {
    const effect = parseXml("<R>ok</R>");
    assert.equal(Effect.runSync(effect).R, "ok");
    assert.equal(Effect.runSync(effect).R, "ok");
  });
});
