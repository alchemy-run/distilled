/**
 * Streaming payload info for an operation's input schema.
 *
 * A streaming body is sent as it is read and is never buffered: with a
 * `Content-Length` member set it goes out with that length, and without one
 * the HttpClient sends it as it sends any stream of unknown length.
 *
 * @see https://smithy.io/2.0/spec/streaming.html
 */

import type * as AST from "effect/SchemaAST";
import {
  hasHttpPayload,
  hasRequiresLength,
  isInputEventStream,
  isStreamingType,
} from "../traits.ts";

/** Info about the streaming payload in a schema. */
interface StreamingPayloadInfo {
  hasStreamingPayload: boolean;
  isEventStream: boolean;
  requiresLength: boolean;
}

/**
 * Check if an AST is an event stream, handling Union wrappers (from S.optional).
 */
const checkIsEventStream = (ast: AST.AST): boolean => {
  if (isInputEventStream(ast)) return true;

  // Handle S.optional() wrapping - check union members
  if (ast._tag === "Union") {
    for (const member of (ast as AST.Union).types) {
      if (member._tag === "Undefined") continue;
      if (isInputEventStream(member)) return true;
    }
  }

  return false;
};

/**
 * Get streaming payload info from an AST.
 * Returns whether the schema has a streaming payload, if it's an event stream,
 * and if it requires length.
 */
export const getStreamingPayloadInfo = (ast: AST.AST): StreamingPayloadInfo => {
  // For Suspend (S.suspend), unwrap and recurse
  if (ast._tag === "Suspend") {
    return getStreamingPayloadInfo(ast.thunk());
  }

  // For Objects (struct), check property signatures
  if (ast._tag === "Objects") {
    for (const prop of ast.propertySignatures) {
      if (hasHttpPayload(prop) && isStreamingType(prop.type)) {
        return {
          hasStreamingPayload: true,
          isEventStream: checkIsEventStream(prop.type),
          requiresLength: hasRequiresLength(prop.type),
        };
      }
    }
  }

  // For Declaration (S.Class), check via encoding chain
  if (ast._tag === "Declaration" && ast.encoding?.length) {
    return getStreamingPayloadInfo(ast.encoding[0].to);
  }

  // Follow encoding chain for other transformed types
  if (ast.encoding && ast.encoding.length > 0) {
    return getStreamingPayloadInfo(ast.encoding[0].to);
  }

  return {
    hasStreamingPayload: false,
    isEventStream: false,
    requiresLength: false,
  };
};
