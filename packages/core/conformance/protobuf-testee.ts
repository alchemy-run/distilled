/**
 * The protobuf conformance testee for `@distilled.cloud/core/protobuf`.
 *
 * `conformance_test_runner` (built from the `protobuf` submodule, see
 * README.md) starts this process and sends it `ConformanceRequest`s on
 * stdin, each a little-endian u32 length and the message; this answers each
 * with a `ConformanceResponse` the same way. Both are encoded and decoded by
 * the codec under test, with descriptors the proto converter builds from the
 * suite's own `.proto` files.
 *
 * The codec transcodes proto3 JSON values and binary, so:
 * - binary in -> `decodeMessage` -> binary out (`encodeMessage`) or JSON out
 *   (`JSON.stringify`);
 * - JSON in -> `JSON.parse` -> `encodeMessage` -> binary out, or the decoded
 *   value back to JSON.
 * Proto2, editions, JSPB and text format are skipped: the converter reads
 * proto3 only, and SDKs speak only binary and JSON.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseProto, protoDescriptors } from "../../dev/src/codegen/proto.ts";
import {
  decodeMessage,
  encodeMessage,
  ProtobufJsonRangeError,
  type ProtoDescriptors,
} from "../src/protobuf.ts";

const PROTOBUF = join(import.meta.dirname, "protobuf");
const WKT = ["any", "duration", "empty", "field_mask", "struct", "timestamp", "wrappers"];
const files = [
  join(PROTOBUF, "conformance/conformance.proto"),
  join(PROTOBUF, "src/google/protobuf/test_messages_proto3.proto"),
  ...WKT.map((name) => join(PROTOBUF, `src/google/protobuf/${name}.proto`)),
].map((path) => parseProto(readFileSync(path, "utf8"), path));

const d = protoDescriptors(files) as unknown as ProtoDescriptors;

const PROTO3 = "protobuf_test_messages.proto3.TestAllTypesProto3";

interface Request {
  readonly protobufPayload?: string;
  readonly jsonPayload?: string;
  readonly jspbPayload?: string;
  readonly textPayload?: string;
  readonly requestedOutputFormat: string;
  readonly messageType: string;
  readonly testCategory: string;
}

/** Print a decoded value as proto3 JSON text: non-finite numbers are strings. */
const proto3Json = (_key: string, value: unknown) =>
  typeof value === "number" && !Number.isFinite(value) ? String(value) : value;

const messageOf = (error: unknown) => (error instanceof Error ? error.message : String(error));

const handle = (request: Request): Record<string, unknown> => {
  if (request.messageType === "conformance.FailureSet") {
    // The runner asks for the testee's own failure list; ours is a file.
    return { protobufPayload: "" };
  }
  if (request.messageType !== PROTO3) {
    return { skipped: `${request.messageType}: proto3 only` };
  }
  if (request.jspbPayload !== undefined || request.textPayload !== undefined) {
    return { skipped: "JSPB and text format are not supported" };
  }
  if (request.requestedOutputFormat !== "PROTOBUF" && request.requestedOutputFormat !== "JSON") {
    return { skipped: `output ${request.requestedOutputFormat} is not supported` };
  }
  let value: unknown;
  try {
    value =
      request.protobufPayload !== undefined
        ? decodeMessage(d, PROTO3, Buffer.from(request.protobufPayload, "base64"))
        : JSON.parse(request.jsonPayload ?? "{}");
    if (request.protobufPayload === undefined) {
      // Validate the JSON by encoding it, as a parser would.
      value = decodeMessage(d, PROTO3, encodeMessage(d, PROTO3, value));
    }
  } catch (error) {
    // Decoding is also where binary becomes proto3 JSON: a value JSON can't
    // hold fails there, after the bytes themselves parsed.
    return error instanceof ProtobufJsonRangeError && request.protobufPayload !== undefined
      ? { serializeError: messageOf(error) }
      : { parseError: messageOf(error) };
  }
  try {
    return request.requestedOutputFormat === "PROTOBUF"
      ? { protobufPayload: Buffer.from(encodeMessage(d, PROTO3, value)).toString("base64") }
      : { jsonPayload: JSON.stringify(value, proto3Json) };
  } catch (error) {
    return { serializeError: messageOf(error) };
  }
};

let buffer = Buffer.alloc(0);
process.stdin.on("data", (chunk: Buffer) => {
  buffer = Buffer.concat([buffer, chunk]);
  while (buffer.length >= 4) {
    const length = buffer.readUInt32LE(0);
    if (buffer.length < 4 + length) break;
    const payload = buffer.subarray(4, 4 + length);
    buffer = buffer.subarray(4 + length);
    let response: Record<string, unknown>;
    try {
      response = handle(decodeMessage(d, "conformance.ConformanceRequest", payload) as Request);
    } catch (error) {
      response = { runtimeError: messageOf(error) };
    }
    const out = encodeMessage(d, "conformance.ConformanceResponse", response);
    const header = Buffer.alloc(4);
    header.writeUInt32LE(out.length, 0);
    process.stdout.write(Buffer.concat([header, out]));
  }
});
