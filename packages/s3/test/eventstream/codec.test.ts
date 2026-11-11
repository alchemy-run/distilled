import { crc32 } from "node:zlib";
import * as Effect from "effect/Effect";
import { describe, expect, test } from "vitest";
import {
  decodeMessage,
  encodeMessage,
  EventStreamDecodeError,
  HeaderType,
  stringHeader,
} from "../../src/eventstream/codec.ts";

/**
 * A frame with valid prelude and message CRCs around `headers` (raw header
 * block bytes) and `payload`. `headersLength` overrides the declared length.
 */
const frame = (
  headers: ArrayLike<number>,
  payload: ArrayLike<number> = [],
  headersLength = headers.length,
) => {
  const total = 12 + headers.length + payload.length + 4;
  const data = new Uint8Array(total);
  const view = new DataView(data.buffer);
  view.setUint32(0, total);
  view.setUint32(4, headersLength);
  view.setUint32(8, crc32(data.subarray(0, 8)));
  data.set(headers, 12);
  data.set(payload, 12 + headers.length);
  view.setUint32(total - 4, crc32(data.subarray(0, total - 4)));
  return data;
};

const decodeError = (data: Uint8Array) => Effect.runPromise(Effect.flip(decodeMessage(data)));

/** One header named "a" whose value is `type` followed by `value`. */
const header = (type: number, ...value: number[]) => [1, 0x61, type, ...value];

describe("decodeMessage on a CRC-valid frame with malformed headers", () => {
  test("still decodes a well-formed frame", async () => {
    const data = await Effect.runPromise(
      encodeMessage({ headers: { ":event-type": stringHeader("x") }, payload: Uint8Array.of(1) }),
    );
    const [message, length] = await Effect.runPromise(decodeMessage(data));
    expect(length).toBe(data.length);
    expect(message.headers[":event-type"]).toEqual({ type: HeaderType.String, value: "x" });
    expect([...message.payload]).toEqual([1]);
  });

  test.each([
    ["Long", HeaderType.Long],
    ["Timestamp", HeaderType.Timestamp],
    ["Uuid", HeaderType.Uuid],
  ])("a %s value cut off by the end of the frame fails typed", async (_, type) => {
    const error = await decodeError(frame(header(type, 0)));
    expect(error).toBeInstanceOf(EventStreamDecodeError);
    expect(error.message).toContain("header block has 2");
  });

  test("a value cut off by the end of the header block does not read the payload", async () => {
    const error = await decodeError(frame(header(HeaderType.Int, 0), [1, 2, 3, 4, 5, 6, 7, 8]));
    expect(error).toBeInstanceOf(EventStreamDecodeError);
    expect(error.message).toContain("needs 5 bytes");
  });

  test("a string longer than the header block fails typed", async () => {
    const error = await decodeError(frame(header(HeaderType.String, 0xff, 0xff, 0x61)));
    expect(error).toBeInstanceOf(EventStreamDecodeError);
    expect(error.message).toContain(`needs ${3 + 0xffff} bytes`);
  });

  test("a header name longer than the header block fails typed", async () => {
    const error = await decodeError(frame([200, 0x61, 0x62], [1, 2, 3, 4]));
    expect(error).toBeInstanceOf(EventStreamDecodeError);
    expect(error.message).toContain("Header name of 200 bytes");
  });

  test("a headers length past the message fails typed", async () => {
    const error = await decodeError(frame(header(HeaderType.BoolTrue), [], 64));
    expect(error).toBeInstanceOf(EventStreamDecodeError);
    expect(error.message).toBe("Headers length 64 exceeds the 19-byte message");
  });
});
