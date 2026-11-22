/**
 * Smithy RPC v2 CBOR Protocol Implementation
 *
 * https://smithy.io/2.0/additional-specs/protocols/smithy-rpc-v2.html
 *
 * Key characteristics:
 * - All requests are POST to /service/{ServiceName}/operation/{OperationName}
 * - Bodies are CBOR (RFC 8949); HTTP binding traits are ignored
 * - `smithy-protocol: rpc-v2-cbor` on every request and response
 * - An operation with no input sends no body and no Content-Type
 * - Timestamps are tag 1 (epoch seconds); `timestampFormat` is ignored
 * - Blobs are byte strings; NaN and the infinities are floats
 * - Errors carry their shape id in the body's `__type`
 */

import type { Operation } from "@distilled.cloud/s3/client/operation";
import {
  Unreadable,
  type ProtocolHandler,
  type ProtocolImpl,
  type TextResponse,
} from "@distilled.cloud/s3/client/protocol";
import type { Request } from "@distilled.cloud/s3/client/request";
import type { Response } from "@distilled.cloud/s3/client/response";
import { getIdentifier } from "@distilled.cloud/s3/util/ast";
import { errorBody, inputEncoderSync, outputBody } from "@distilled.cloud/s3/util/codec";
import { sanitizeErrorCode } from "@distilled.cloud/s3/util/error";
import { readStreamAsBytes } from "@distilled.cloud/s3/util/stream";
import * as Effect from "effect/Effect";
import { ParseError } from "../errors.ts";
import { hasUnitInput } from "../protocol-traits.ts";
import { getAnnotationUnwrap, getAwsApiService, protocolSymbol } from "../traits.ts";
import { decodeCbor, encodeCbor } from "./cbor.ts";

const CONTENT_TYPE = "application/cbor";

/** A body to quote in an error message, as hex (CBOR is binary). */
const hex = (bytes: Uint8Array): string =>
  Array.from(bytes.subarray(0, 512), (b) => b.toString(16).padStart(2, "0")).join("") +
  (bytes.length > 512 ? "..." : "");

/** The CBOR map a body holds: `{}` for an empty body; throws for anything else. */
const readMap = (bytes: Uint8Array): Record<string, unknown> => {
  if (bytes.length === 0) return {};
  const value = decodeCbor(bytes);
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("the body is not a CBOR map");
  }
  return value as Record<string, unknown>;
};

const message = (e: unknown) => (e instanceof Error ? e.message : String(e));

/** Smithy RPC v2 CBOR Protocol */
export const rpcv2CborProtocol: ProtocolImpl = (operation: Operation): ProtocolHandler => {
  const inputAst = operation.input.ast;
  // Blobs stay bytes and timestamps `Date`s: CBOR has a type for each.
  const encodeInput = inputEncoderSync(inputAst as any, true);
  const operationName =
    operation.operationName ??
    (getIdentifier(inputAst) ?? "").replace(/(?:Request|Input|Message)$/, "");
  const serviceName = getAwsApiService(inputAst)?.serviceShapeName ?? "";
  const path = `/service/${serviceName}/operation/${operationName}`;
  const unitInput = hasUnitInput(inputAst);
  const queryCompatible =
    getAnnotationUnwrap<{ awsQueryCompatible?: boolean }>(inputAst, protocolSymbol)
      ?.awsQueryCompatible === true;

  const serialize = (input: unknown): Request => {
    const headers: Record<string, string> = {
      "smithy-protocol": "rpc-v2-cbor",
      Accept: CONTENT_TYPE,
    };
    if (queryCompatible) headers["x-amzn-query-mode"] = "true";
    const request: Request = { method: "POST", path, query: {}, headers };
    if (!unitInput) {
      headers["Content-Type"] = CONTENT_TYPE;
      request.body = encodeCbor(encodeInput(input) ?? {});
    }
    return request;
  };

  // Every body is read as bytes (`deserializeStream`): the operation's
  // protocol annotation sets `binaryBody`, so no response is read as text.
  const deserializeText = (response: TextResponse): unknown =>
    new Unreadable(
      new ParseError({
        message: `rpcv2Cbor read a body as text: ${outputBody(operation, response.body)}`,
      }),
      response.body,
    );

  return {
    serialize,
    deserializeText,

    deserializeStream: (response: Response) =>
      Effect.map(readStreamAsBytes(response.body), (bytes) => {
        try {
          return readMap(bytes);
        } catch (e) {
          // Lenient mode returns the body as read.
          return new Unreadable(
            new ParseError({
              message: `Failed to parse CBOR body (${message(e)}): ${outputBody(operation, hex(bytes))}`,
            }),
            bytes,
          );
        }
      }),

    deserializeError: Effect.fnUntraced(function* (response: Response) {
      const bytes = yield* readStreamAsBytes(response.body);
      let body: Record<string, unknown>;
      try {
        body = readMap(bytes);
      } catch (e) {
        return yield* new ParseError({
          message: `Failed to parse error CBOR body (${message(e)}): ${errorBody(operation, hex(bytes))}`,
        });
      }
      const rawErrorCode =
        typeof body.__type === "string"
          ? body.__type
          : (response.headers["x-amzn-query-error"]?.split(";")[0] ?? undefined);
      if (!rawErrorCode) {
        return yield* new ParseError({
          message: `No error code found in response. Headers: ${JSON.stringify(response.headers)}, Body: ${errorBody(operation, hex(bytes))}`,
        });
      }
      const { __type: _, ...data } = body;
      return { errorCode: sanitizeErrorCode(rawErrorCode), data };
    }),
  };
};
