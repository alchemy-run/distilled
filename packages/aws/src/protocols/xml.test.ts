import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import { encodeMessage, stringHeader } from "../eventstream/codec.ts";
import type { Response } from "../client/response.ts";
import { ParseError } from "../errors.ts";
import * as T from "../traits.ts";
import { awsQueryProtocol } from "./aws-query.ts";
import { ec2QueryProtocol } from "./ec2-query.ts";
import { restXmlProtocol } from "./rest-xml.ts";

const response = (body: string, status = 200): Response => ({
  body,
  status,
  statusText: "",
  headers: {},
});
const input = S.Any.annotate({ identifier: "ListRequest" });
const output = S.Struct({
  name: S.String,
  count: S.Number,
  enabled: S.Boolean,
  items: S.Array(S.String),
}).annotate({ identifier: "ListResponse" });
const operation = { input, output, errors: [] };

for (const [name, protocol] of Object.entries({
  awsQueryProtocol,
  ec2QueryProtocol,
  restXmlProtocol,
})) {
  describe(name, () => {
    const handler = protocol(operation);
    const members =
      "<name> a&amp;b&#x1F600; </name><count> 02 </count><enabled> true </enabled><items><member>x</member><member>y</member></items>";
    const body =
      name === "awsQueryProtocol"
        ? `<ListResponse xmlns="urn:test"><ListResult>${members}</ListResult></ListResponse>`
        : `<ListResponse xmlns="urn:test">${members}</ListResponse>`;

    it("decodes response wrappers and schema-directed primitives/lists", () => {
      assert.deepEqual(
        Effect.runSync(handler.deserializeResponse(response(body))),
        {
          name: " a&b😀 ",
          count: 2,
          enabled: true,
          items: ["x", "y"],
        },
      );
    });

    it("reads UTF-8 XML split across HTTP chunks", async () => {
      const bytes = new TextEncoder().encode(body.replace("&#x1F600;", "😀"));
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          // One byte per chunk includes splits inside the emoji's UTF-8 sequence.
          for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
          controller.close();
        },
      });
      assert.deepEqual(
        await Effect.runPromise(
          handler.deserializeResponse({ ...response(""), body: stream }),
        ),
        {
          name: " a&b😀 ",
          count: 2,
          enabled: true,
          items: ["x", "y"],
        },
      );
    });

    it("accepts empty successful response bodies", () => {
      assert.deepEqual(
        Effect.runSync(handler.deserializeResponse(response(""))),
        {},
      );
    });

    for (const method of ["deserializeResponse", "deserializeError"] as const) {
      it(`${method} reports malformed XML as ParseError, not a defect`, () => {
        const result = Effect.runSync(
          Effect.flip(
            handler[method](
              response(
                "<ListResponse><bad></ListResponse>",
                method === "deserializeError" ? 400 : 200,
              ),
            ),
          ),
        );
        assert.ok(result instanceof ParseError);
      });
    }

    it("decodes the protocol's error envelope", () => {
      const error =
        "<Error><Code>Denied</Code><Message>A &amp; B &#65;</Message></Error>";
      const body =
        name === "ec2QueryProtocol"
          ? `<Response><Errors>${error}</Errors><RequestID>req</RequestID></Response>`
          : name === "awsQueryProtocol"
            ? `<ErrorResponse>${error}<RequestId>req</RequestId></ErrorResponse>`
            : error;
      assert.deepEqual(
        Effect.runSync(handler.deserializeError(response(body, 400))),
        {
          errorCode: "Denied",
          data: {
            Message: "A & B A",
            ...(name === "ec2QueryProtocol"
              ? { RequestID: "req" }
              : name === "awsQueryProtocol"
                ? { RequestId: "req" }
                : {}),
          },
        },
      );
    });
  });
}

describe("REST XML bindings", () => {
  it("decodes attributes, renamed elements, flattened lists, and empty strings", () => {
    const output = S.Struct({
      id: S.String.pipe(T.XmlAttribute()),
      key: S.String.pipe(T.XmlName("Key")),
      values: S.Array(S.String).pipe(T.XmlFlattened(), T.XmlName("item")),
      empty: S.String,
    }).annotate({ identifier: "R" });
    const handler = restXmlProtocol({ input, output, errors: [] });
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeResponse(
          response(
            '<R id="001"><Key> key </Key><item>a</item><item>b</item><empty/></R>',
          ),
        ),
      ),
      {
        id: "001",
        key: " key ",
        values: ["a", "b"],
        empty: "",
      },
    );
  });

  it("decodes structured HTTP payloads", () => {
    const output = S.Struct({
      payload: S.Struct({ Key: S.String })
        .annotate({ identifier: "Data" })
        .pipe(T.HttpPayload()),
    });
    const handler = restXmlProtocol({ input, output, errors: [] });
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeResponse(
          response("<Data><Key>a&amp;b</Key></Data>"),
        ),
      ),
      { payload: { Key: "a&b" } },
    );
  });

  it("decodes S3 unwrapped text with a namespace attribute", () => {
    const output = S.Struct({ LocationConstraint: S.String })
      .annotate({ identifier: "LocationConstraint" })
      .pipe(T.S3UnwrappedXmlOutput());
    const handler = restXmlProtocol({ input, output, errors: [] });
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeResponse(
          response(
            '<LocationConstraint xmlns="urn:s3">eu-west-1</LocationConstraint>',
          ),
        ),
      ),
      { LocationConstraint: "eu-west-1" },
    );
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeResponse(
          response('<LocationConstraint xmlns="urn:s3"/>'),
        ),
      ),
      {},
    );
  });

  it("retains S3 empty-body and HTML error handling", () => {
    const handler = restXmlProtocol(operation);
    assert.deepEqual(
      Effect.runSync(handler.deserializeError(response("", 404))),
      { errorCode: "NotFound", data: {} },
    );
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeError(
          response(
            "<html><li>Code: SlowDown</li><li>Message: retry</li></html>",
            503,
          ),
        ),
      ),
      { errorCode: "SlowDown", data: { Message: "retry" } },
    );
  });
});

it("AWS Query decodes maps and empty list wrappers", () => {
  const output = S.Struct({
    tags: S.Record(S.String, S.String),
    items: S.Array(S.String),
  });
  const handler = awsQueryProtocol({ input, output, errors: [] });
  assert.deepEqual(
    Effect.runSync(
      handler.deserializeResponse(
        response(
          "<R><ListResult><tags><entry><key>a</key><value> x </value></entry><entry><key>b</key><value/></entry></tags><items/></ListResult></R>",
        ),
      ),
    ),
    { tags: { a: " x ", b: "" }, items: [] },
  );
});

it("REST XML event payloads retain the synchronous raw-text fallback", async () => {
  const output = S.Struct({
    events: T.EventStream(S.Unknown).pipe(T.HttpPayload()),
  });
  const handler = restXmlProtocol({ input, output, errors: [] });
  const frames = await Promise.all(
    ["<R>a&amp;b</R>", "<R>", ""].map((xml) =>
      Effect.runPromise(
        encodeMessage({
          headers: {
            ":message-type": stringHeader("event"),
            ":event-type": stringHeader("Record"),
          },
          payload: new TextEncoder().encode(xml),
        }),
      ),
    ),
  );
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(frame);
      controller.close();
    },
  });
  const result = Effect.runSync(
    handler.deserializeResponse({ ...response(""), body }),
  ) as {
    events: Stream.Stream<unknown, Error>;
  };
  const events = await Effect.runPromise(Stream.runCollect(result.events));
  assert.deepEqual(JSON.parse(JSON.stringify(events)), [
    { Record: { R: "a&b" } },
    { Record: { payload: "<R>" } },
    { Record: {} },
  ]);
});
