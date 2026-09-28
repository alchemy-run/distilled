/**
 * AWS Query Protocol Implementation
 *
 * https://smithy.io/2.0/aws/protocols/aws-query-protocol.html
 *
 * Key differences from EC2 Query:
 * - Query key uses xmlName directly (not capitalized like EC2)
 * - Lists use .member.N format by default (not flattened)
 * - Maps use .entry.N.key and .entry.N.value format
 * - Response has {Op}Result wrapper inside {Op}Response
 * - Errors wrapped in <ErrorResponse><Error>...</Error><RequestId>...</RequestId></ErrorResponse>
 */

import * as Effect from "effect/Effect";
import type { Operation } from "../client/operation.ts";
import type { Protocol, ProtocolHandler } from "../client/protocol.ts";
import type { Request } from "../client/request.ts";
import type { Response } from "../client/response.ts";
import { ParseError } from "../errors.ts";
import { sanitizeErrorCode } from "../util/error.ts";
import { readStreamAsText } from "../util/stream.ts";
import { parseXml } from "../util/xml.ts";
import { serializeQueryMembers } from "./query-codec.ts";
import { decodeXmlStruct, queryNaming, xmlRoot } from "./xml-codec.ts";

export const awsQueryProtocol: Protocol = (
  operation: Operation,
): ProtocolHandler => {
  const { descriptor, operationName } = operation;
  const version = descriptor.service.version;

  return {
    serializeRequest: Effect.fn(function* (input: unknown) {
      const request: Request = {
        method: "POST",
        path: "/",
        query: {},
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      const params: string[] = [
        `Action=${encodeURIComponent(operationName)}`,
        `Version=${encodeURIComponent(version)}`,
      ];
      serializeQueryMembers(
        "awsQuery",
        (input ?? {}) as Record<string, unknown>,
        descriptor.input,
        "",
        params,
      );
      request.body = params.join("&");
      return request;
    }),

    deserializeResponse: Effect.fn(function* (response: Response) {
      const bodyText = yield* readStreamAsText(response.body);
      if (!bodyText) return {};
      const parsed = yield* parseXml(bodyText);
      // <{Op}Response><{Op}Result>…</{Op}Result><ResponseMetadata/></{Op}Response>
      let content = xmlRoot(parsed).content;
      if (content && typeof content === "object") {
        const resultKey = Object.keys(content).find((k) =>
          k.endsWith("Result"),
        );
        if (resultKey)
          content = (content as Record<string, unknown>)[resultKey];
      }
      if (!content || typeof content !== "object") return {};
      return decodeXmlStruct(
        content as Record<string, unknown>,
        descriptor.output,
        queryNaming,
      );
    }),

    deserializeError: Effect.fn(function* (response: Response) {
      // Read body as text
      const bodyText = yield* readStreamAsText(response.body);

      if (!bodyText) {
        return yield* new ParseError({ message: "Empty error response body" });
      }

      // Parse XML body
      const parsed = yield* parseXml(bodyText);

      // AWS Query error structure:
      // <ErrorResponse>
      //   <Error>
      //     <Type>Sender</Type>
      //     <Code>InvalidGreeting</Code>
      //     <Message>Hi</Message>
      //     ...other members...
      //   </Error>
      //   <RequestId>xxx</RequestId>
      // </ErrorResponse>

      let errorContent: Record<string, unknown> | undefined;
      let requestId: string | undefined;

      if (parsed.ErrorResponse && typeof parsed.ErrorResponse === "object") {
        const errorResponse = parsed.ErrorResponse as Record<string, unknown>;
        if (errorResponse.Error && typeof errorResponse.Error === "object") {
          errorContent = errorResponse.Error as Record<string, unknown>;
        }
        if (typeof errorResponse.RequestId === "string") {
          requestId = errorResponse.RequestId;
        }
      }

      // Legacy query services (SimpleDB) wrap errors EC2-style:
      // <Response><Errors><Error><Code>..</Code><Message>..</Message></Error></Errors><RequestID>..</RequestID></Response>
      if (
        !errorContent &&
        parsed.Response &&
        typeof parsed.Response === "object"
      ) {
        const responseObj = parsed.Response as Record<string, unknown>;
        if (typeof responseObj.RequestID === "string") {
          requestId = responseObj.RequestID;
        }
        if (responseObj.Errors && typeof responseObj.Errors === "object") {
          const errors = responseObj.Errors as Record<string, unknown>;
          if (errors.Error && typeof errors.Error === "object") {
            errorContent = (
              Array.isArray(errors.Error) ? errors.Error[0] : errors.Error
            ) as Record<string, unknown>;
          }
        }
      }

      if (!errorContent) {
        return yield* new ParseError({
          message: `Could not find Error element in XML response: ${bodyText}`,
        });
      }

      // Extract error code from <Code> element
      const rawErrorCode = errorContent.Code;
      if (typeof rawErrorCode !== "string") {
        return yield* new ParseError({
          message: `No Code element found in error response: ${bodyText}`,
        });
      }

      const errorCode = sanitizeErrorCode(rawErrorCode);

      // Extract remaining data (remove Code, keep Message, Type, etc.)
      const { Code: _code, ...data } = errorContent;

      // Include RequestId if present
      if (requestId) {
        data.RequestId = requestId;
      }

      return { errorCode, data };
    }),
  };
};
