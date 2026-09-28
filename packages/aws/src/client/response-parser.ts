/**
 * Response Parser - wraps Protocol to parse responses.
 *
 * This layer:
 * 1. Uses the Protocol to deserialize (and decode) successful responses
 * 2. Maps error responses onto the operation's typed error classes
 *
 * This is independently testable without making HTTP requests.
 */

import * as Effect from "effect/Effect";
import { metaOf, type AnyErrorClass } from "@distilled.cloud/core/error-class";
import {
  COMMON_ERRORS,
  InternalError,
  ParseError,
  UnknownAwsError,
} from "../errors.ts";
import type { Operation } from "./operation.ts";
import type { Protocol, ProtocolHandler } from "./protocol.ts";
import type { Response } from "./response.ts";

/** AWS wire facts stamped on generated error classes. */
export interface AwsErrorMeta {
  /** awsQueryError code, when it differs from the tag. */
  readonly code?: string;
  /** smithy.api#httpError status. */
  readonly status?: number;
  /** Synthetic error: specializes wire error `from` when the message matches. */
  readonly synthetic?: SyntheticErrorTrait;
  /** Members bound to response headers: member → header (optionally typed). */
  readonly headers?: Readonly<
    Record<string, string | readonly [string, "num" | "bool"]>
  >;
  /** Members whose wire name differs (restJson `jsonName`): member → wire. */
  readonly renames?: Readonly<Record<string, string>>;
}

export interface SyntheticErrorTrait {
  readonly from: string;
  readonly message:
    | string
    | { readonly includes?: string; readonly matches?: string };
}

export interface ResponseParserOptions {
  /** Override the service's protocol. */
  protocol?: Protocol;
  /** AWS service SDK ID for error context (e.g., "S3", "DynamoDB") */
  service?: string;
  /** Operation name for error context (e.g., "createBucket", "putObject") */
  operation?: string;
}

/**
 * Strip the conventional Exception/Error suffix from a wire error code so
 * synthetic `from` codes match both the full shape name and the short form.
 */
const stripErrorSuffix = (code: string): string => {
  for (const suffix of ["Exception", "Error"]) {
    if (code.endsWith(suffix)) return code.slice(0, -suffix.length);
  }
  return code;
};

const wireCodeMatches = (from: string, errorCode: string): boolean =>
  from === errorCode || stripErrorSuffix(from) === stripErrorSuffix(errorCode);

/**
 * Evaluate a synthetic error's message predicate. A plain string is an exact
 * match; the object form supports substring (`includes`) and regex
 * (`matches`) predicates. An empty object predicate would match every error
 * — reject it.
 */
const matchesMessage = (
  matcher: SyntheticErrorTrait["message"],
  message: string,
): boolean => {
  if (typeof matcher === "string") return matcher === message;
  const { includes, matches } = matcher;
  if (includes === undefined && matches === undefined) return false;
  if (includes !== undefined && !message.includes(includes)) return false;
  if (matches !== undefined && !new RegExp(matches).test(message)) return false;
  return true;
};

const awsMeta = (cls: AnyErrorClass) => metaOf<AwsErrorMeta>(cls);

/**
 * Create a response parser for a given operation. Per-operation
 * preprocessing (protocol handler, error maps) runs once.
 */
export const makeResponseParser = (
  operation: Operation,
  options?: ResponseParserOptions,
): ((response: Response) => Effect.Effect<any, never, never>) => {
  const protocolFactory =
    options?.protocol ?? operation.descriptor.service.protocol;
  const protocol: ProtocolHandler = protocolFactory(operation);

  // Wire code → error class. Registered by tag, by tag without the
  // Exception/Error suffix, and by awsQueryError code. Common errors first
  // so a service-specific class of the same name takes precedence.
  const errorClasses = new Map<string, AnyErrorClass>();
  const registerError = (cls: AnyErrorClass) => {
    const tag = cls._tag;
    errorClasses.set(tag, cls);
    for (const suffix of ["Exception", "Error"]) {
      if (tag.endsWith(suffix)) {
        errorClasses.set(tag.slice(0, -suffix.length), cls);
        break;
      }
    }
    const code = awsMeta(cls)?.code;
    if (code) errorClasses.set(code, cls);
  };

  // Synthetic errors carve a new tag out of an existing wire error using a
  // message predicate; matched BEFORE the plain wire-code lookup and never
  // registered by wire code (the wire never returns the synthetic tag).
  const syntheticErrors: Array<{
    cls: AnyErrorClass;
    trait: SyntheticErrorTrait;
  }> = [];

  for (const cls of COMMON_ERRORS) registerError(cls);
  for (const cls of operation.errors) {
    const synthetic = awsMeta(cls)?.synthetic;
    if (synthetic) syntheticErrors.push({ cls, trait: synthetic });
    else registerError(cls);
  }

  // @ts-expect-error — error channel is erased at the protocol boundary
  return Effect.fn(function* (response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return yield* protocol.deserializeResponse(response);
    }

    const { errorCode, data } = yield* protocol.deserializeError(response);

    // XML protocols send <Message>; every error class names its canonical
    // message member `message`.
    if (typeof data.Message === "string" && data.message === undefined) {
      data.message = data.Message;
      delete data.Message;
    }

    // Synthetic errors specialize the base wire error. An exact-message
    // matcher outranks a predicate matcher; ties resolve to declaration order.
    const errorMessage = typeof data.message === "string" ? data.message : "";
    let errorClass: AnyErrorClass | undefined;
    let bestScore = 0;
    for (const { cls, trait } of syntheticErrors) {
      if (!wireCodeMatches(trait.from, errorCode)) continue;
      if (!matchesMessage(trait.message, errorMessage)) continue;
      const score = typeof trait.message === "string" ? 2 : 1;
      if (score > bestScore) {
        bestScore = score;
        errorClass = cls;
      }
    }
    errorClass ??= errorClasses.get(errorCode);

    // Status-based fallback: responses with no error code at all match the
    // declared error carrying that status, when exactly one does.
    if (errorClass === undefined && errorCode === "") {
      const statusMatches = operation.errors.filter(
        (cls) => awsMeta(cls)?.status === response.status,
      );
      if (statusMatches.length === 1) {
        errorClass = statusMatches[0];
      } else if (response.status >= 500) {
        // A code-less 5xx (e.g. an HTML 502 from a front-end proxy) is a
        // transient server fault; the default retry policy retries it.
        return yield* new InternalError({});
      } else {
        return yield* new ParseError({
          message: `No error code found in response and ${statusMatches.length} declared errors match status ${response.status}. Data: ${JSON.stringify(data)}`,
        });
      }
    }

    if (errorClass !== undefined) {
      // Error members bound to response headers (e.g. x-amz-bucket-region,
      // Retry-After), coerced to their declared type.
      const meta = awsMeta(errorClass);
      for (const [member, wire] of Object.entries(meta?.renames ?? {})) {
        if (data[member] === undefined && data[wire] !== undefined) {
          data[member] = data[wire];
          delete data[wire];
        }
      }
      const headers = meta?.headers;
      if (headers !== undefined) {
        for (const [member, binding] of Object.entries(headers)) {
          const [header, kind] =
            typeof binding === "string" ? [binding, undefined] : binding;
          const value = response.headers[header.toLowerCase()];
          if (value === undefined) continue;
          data[member] =
            kind === "num"
              ? Number(value)
              : kind === "bool"
                ? value === "true"
                : value;
        }
      }
      delete data._tag;
      return yield* Effect.fail(new errorClass(data));
    }

    return yield* new UnknownAwsError({
      errorTag: errorCode,
      errorData: data,
      service: options?.service,
      operation: options?.operation,
      message: typeof data.message === "string" ? data.message : errorCode,
    });
  });
};
