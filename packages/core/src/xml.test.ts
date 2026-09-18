import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as Effect from "effect/Effect";
import fixtures from "./fixtures/xml/upstream-validator.json" with { type: "json" };
import { escapeXml, parseXml, parseXmlSync, XmlParseError } from "./xml.ts";

function parse(xml: string) {
  // Compare the wire values independently of the null prototypes used for safety.
  return JSON.parse(JSON.stringify(parseXmlSync(xml)));
}

describe("upstream fast-xml-parser validation corpus", () => {
  for (const [index, fixture] of fixtures.entries()) {
    it(`${index}: ${fixture.name}`, () => {
      if (fixture.parserValid ?? fixture.valid) {
        assert.doesNotThrow(() => parseXmlSync(fixture.xml));
      } else {
        assert.throws(() => parseXmlSync(fixture.xml), XmlParseError);
      }
    });
  }
});

describe("XML object format", () => {
  it("keeps primitives as strings and groups repeated children", () => {
    assert.deepEqual(
      parse("<R><x>001</x><x>false</x><x>1e3</x><empty/><empty></empty></R>"),
      { R: { x: ["001", "false", "1e3"], empty: ["", ""] } },
    );
  });

  it("preserves namespace names, attributes, and text with attributes", () => {
    assert.deepEqual(
      parse(
        '<ns:R xmlns:ns="urn:r"><ns:x ns:id="01">value</ns:x><empty a=""/></ns:R>',
      ),
      {
        "ns:R": {
          "@_xmlns:ns": "urn:r",
          "ns:x": { "@_ns:id": "01", "#text": "value" },
          empty: { "@_a": "" },
        },
      },
    );
  });

  it("preserves string whitespace, including attribute and CDATA values", () => {
    assert.deepEqual(
      parse(
        '<R><Key> key </Key><blank> \t </blank><x a=" b "> text </x><c><![CDATA[ c ]]></c></R>',
      ),
      {
        R: {
          Key: " key ",
          blank: " \t ",
          x: { "@_a": " b ", "#text": " text " },
          c: " c ",
        },
      },
    );
  });

  it("discards layout-only container text but preserves mixed content", () => {
    assert.deepEqual(parse("<R>\n  <x/>\n  <y/>\n</R>"), {
      R: { x: "", y: "" },
    });
    assert.deepEqual(parse("<R>Hello <b>world</b> !</R>"), {
      R: { b: "world", "#text": "Hello  !" },
    });
    assert.deepEqual(parse("<R><![CDATA[ ]]><b/></R>"), {
      R: { b: "", "#text": " " },
    });
  });

  it("decodes predefined and numeric entities exactly once", () => {
    assert.deepEqual(
      parse('<R a="&quot;&apos;&#9;">&amp;&lt;&gt;&#65;&#x1F600;&amp;lt;</R>'),
      { R: { "@_a": "\"'\t", "#text": "&<>A😀&lt;" } },
    );
  });

  it("normalizes literal line endings and attribute whitespace, not character references", () => {
    assert.deepEqual(
      parse('<R a="x\r\ny\tz\r&#13;&#10;&#9;">a\r\nb\rc&#13;</R>'),
      { R: { "@_a": "x y z \r\n\t", "#text": "a\nb\nc\r" } },
    );
  });

  it("joins CDATA and text without decoding CDATA entities", () => {
    assert.deepEqual(parse("<R>a<![CDATA[<b>&amp;]]><![CDATA[c]]>d&amp;</R>"), {
      R: "a<b>&amp;cd&",
    });
    assert.deepEqual(parse("<R><![CDATA[]]></R>"), { R: "" });
  });

  it("ignores declarations, comments and processing instructions", () => {
    assert.deepEqual(
      parse(
        '\uFEFF<?xml version="1.0" encoding="UTF-8" standalone="yes"?><!--before--><?before a?><R>a<!--ignored--><?in x?>b</R><?after?><!--after-->',
      ),
      { R: "ab" },
    );
  });

  it("supports XML Unicode names", () => {
    assert.deepEqual(parse('<根 é="oui"><𐀀>😀</𐀀><á/></根>'), {
      根: { "@_é": "oui", 𐀀: "😀", á: "" },
    });
  });

  it("accepts empty HTTP bodies", () => {
    for (const xml of ["", " \r\n\t", "\uFEFF"])
      assert.deepEqual(parse(xml), {});
  });

  it("stores prototype-related names as own data properties", () => {
    const result = parseXmlSync(
      "<__proto__><constructor>one</constructor><constructor>two</constructor><__proto__>safe</__proto__><toString/></__proto__>",
    );
    const root = result.__proto__;
    assert.equal(Object.getPrototypeOf(result), null);
    assert.equal(Object.getPrototypeOf(root), null);
    assert.deepEqual(
      JSON.parse(JSON.stringify(root)),
      JSON.parse(
        '{"constructor":["one","two"],"__proto__":"safe","toString":""}',
      ),
    );
    assert.equal(Object.hasOwn(Object.prototype, "safe"), false);
  });

  it("round trips escaped strings", () => {
    for (const text of [
      ' <tag a="x">&\'😀 ',
      "",
      "false",
      "001",
      "&#13;",
      "\t\n",
    ]) {
      assert.deepEqual(parse(`<R>${escapeXml(text)}</R>`), { R: text });
    }
  });

  it("handles large lists without recursion", () => {
    const result = parse(`<R>${'<item a="1">value</item>'.repeat(10_000)}</R>`);
    assert.equal(result.R.item.length, 10_000);
    assert.deepEqual(result.R.item[9_999], { "@_a": "1", "#text": "value" });
  });
});

describe("malformed and unsupported XML", () => {
  const invalid = [
    '<R a="1"a="2"/>',
    '<R a="<"/>',
    '<R a="&bad;"/>',
    "<R a=1/>",
    '<R a="1" a="2"/>',
    "<R/ >",
    "< R/>",
    "<R></ R>",
    "<R></R x>",
    "<R>]]></R>",
    "<R>&</R>",
    "<R>&amp</R>",
    "<R>&nope;</R>",
    "<R>&#0;</R>",
    "<R>&#xD800;</R>",
    "<R>&#x110000;</R>",
    "<R>&#xFFFE;</R>",
    "<R>&#-1;</R>",
    "<R>&#X41;</R>",
    "<R>&#x;</R>",
    "<R>&#;</R>",
    "<R>\u0000</R>",
    "<R>\u000B</R>",
    "<R>\uD800</R>",
    "<R>\uDC00</R>",
    "<R>\uFFFE</R>",
    "<R>\uFFFF</R>",
    "<R><!--a--b--></R>",
    "<R><!--a---></R>",
    "<R><!--",
    "<R><![CDATA[",
    "<![CDATA[x]]><R/>",
    "<R/><![CDATA[x]]>",
    "<R><?pi",
    "<R><?1bad?></R>",
    "<R><?pi!?></R>",
    '<?XML version="1.0"?><R/>',
    "<?xml?><R/>",
    '<?xml version="1.1"?><R/>',
    '<?xml encoding="UTF-8"?><R/>',
    '<?xml version="1.0" junk="x"?><R/>',
    '<R><?xml version="1.0"?></R>',
    '<!--x--><?xml version="1.0"?><R/>',
    '<?xml version="1.0"?>',
    "<!--only-->",
    "<!DOCTYPE R><R/>",
    '<!DOCTYPE R SYSTEM "file:///etc/passwd"><R/>',
    '<!DOCTYPE R [<!ENTITY a "&a;">]><R>&a;</R>',
    "<R/><R/>",
    "before<R/>",
    "<R/>after",
    "<R><x></R>",
    "<R>",
    "<",
    '<R a="',
    "<R a",
    "<R a=",
    "<R ",
    "</R>",
    "<1bad/>",
    '<R\u00A0a="x"/>',
  ];
  for (const xml of invalid) {
    it(`rejects ${JSON.stringify(xml)}`, () => {
      assert.throws(
        () => parseXmlSync(xml),
        (error) => {
          assert.ok(error instanceof XmlParseError);
          assert.ok(error.offset >= 0 && error.offset <= xml.length);
          return true;
        },
      );
    });
  }

  it("reports original input offsets and CRLF-aware line numbers", () => {
    const xml = "<R>\r\n&bad;</R>";
    assert.throws(
      () => parseXmlSync(xml),
      (error) => {
        assert.ok(error instanceof XmlParseError);
        assert.equal(error.offset, 5);
        assert.equal(error.line, 2);
        assert.equal(error.column, 1);
        return true;
      },
    );
  });

  it("enforces depth and input length limits", () => {
    assert.doesNotThrow(() => parseXmlSync("<a><b/></a>", { maxDepth: 2 }));
    assert.throws(
      () => parseXmlSync("<a><b/></a>", { maxDepth: 1 }),
      XmlParseError,
    );
    assert.doesNotThrow(() => parseXmlSync("<a/>", { maxLength: 4 }));
    assert.throws(() => parseXmlSync("<a/>", { maxLength: 3 }), XmlParseError);
    assert.throws(() => parseXmlSync("<a/>", { maxDepth: NaN }), XmlParseError);
    assert.throws(() => parseXmlSync("<a/>", { maxLength: -1 }), XmlParseError);
    const nested = "<a>".repeat(2_000) + "</a>".repeat(2_000);
    assert.throws(() => parseXmlSync(nested), XmlParseError);
    assert.doesNotThrow(() => parseXmlSync(nested, { maxDepth: 2_000 }));
  });

  it("exposes parser failures through Effect's typed channel", () => {
    const result = Effect.runSync(Effect.flip(parseXml("<R>")));
    assert.ok(result instanceof XmlParseError);
    assert.match(result.message, /Unclosed element/);
  });

  it("can execute the same lazy Effect repeatedly", () => {
    const effect = parseXml("<R>ok</R>");
    assert.equal(Effect.runSync(effect).R, "ok");
    assert.equal(Effect.runSync(effect).R, "ok");
  });
});
