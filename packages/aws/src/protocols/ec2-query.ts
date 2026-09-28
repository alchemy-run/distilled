/**
 * AWS EC2 Query Protocol Implementation
 *
 * https://smithy.io/2.0/aws/protocols/aws-ec2-query-protocol.html
 *
 * Key differences from awsQuery:
 * - All lists are flattened (no wrapper elements)
 * - Uses aws.protocols#ec2QueryName trait for custom query key names
 * - Response root is {OperationName}Response (no result wrapper)
 * - Errors wrapped in <Response><Errors><Error>...</Error></Errors><RequestID>...</RequestID></Response>
 * - HTTP binding traits are ignored
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
import { decodeXmlStruct, ec2Naming, xmlRoot } from "./xml-codec.ts";

export const ec2QueryProtocol: Protocol = (
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
        "ec2Query",
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
      // <{Op}Response>…</{Op}Response> (no result wrapper)
      const content = xmlRoot(parsed).content;
      if (!content || typeof content !== "object") return {};
      return decodeXmlStruct(
        content as Record<string, unknown>,
        descriptor.output,
        ec2Naming,
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

      // EC2 Query error structure:
      // <Response>
      //   <Errors>
      //     <Error>
      //       <Code>InvalidParameterValue</Code>
      //       <Message>...</Message>
      //     </Error>
      //   </Errors>
      //   <RequestID>xxx</RequestID>
      // </Response>

      let errorContent: Record<string, unknown> | undefined;
      let requestId: string | undefined;

      if (parsed.Response && typeof parsed.Response === "object") {
        const responseObj = parsed.Response as Record<string, unknown>;

        // Extract RequestID
        if (typeof responseObj.RequestID === "string") {
          requestId = responseObj.RequestID;
        }

        // Navigate to Errors.Error
        if (responseObj.Errors && typeof responseObj.Errors === "object") {
          const errors = responseObj.Errors as Record<string, unknown>;
          if (errors.Error && typeof errors.Error === "object") {
            // Could be a single error or an array - take the first one
            if (Array.isArray(errors.Error)) {
              errorContent = errors.Error[0] as Record<string, unknown>;
            } else {
              errorContent = errors.Error as Record<string, unknown>;
            }
          }
        }
      }

      if (!errorContent) {
        return yield* new ParseError({
          message: `Could not find Error element in EC2 XML response: ${bodyText}`,
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

      // Extract remaining data (remove Code, keep Message, etc.)
      const { Code: _Code, ...data } = errorContent;

      // Include RequestID if present
      if (requestId) {
        data.RequestID = requestId;
      }

      return { errorCode, data };
    }),
  };
};
