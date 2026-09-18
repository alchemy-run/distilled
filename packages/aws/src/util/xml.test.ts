import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as Effect from "effect/Effect";
import { ParseError } from "../errors.ts";
import { parseXml } from "./xml.ts";

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
