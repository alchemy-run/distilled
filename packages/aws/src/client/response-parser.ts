/**
 * Response Parser - wraps Protocol to parse responses.
 *
 * This layer:
 * 1. Uses the Protocol to deserialize the response
 * 2. Applies schema decoding/validation
 * 3. Handles error responses
 * 4. Delegates event stream parsing to stream-parser.ts
 *
 * This is independently testable without making HTTP requests.
 */

import {
  checkResponse,
  ResponseValidation,
  withholdActual,
} from "@distilled.cloud/core/response-validation";
import { restoreStack, suppressStack } from "@distilled.cloud/core/telemetry";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import type * as SchemaIssue from "effect/SchemaIssue";
import { COMMON_ERRORS, InternalError, ParseError, UnknownAwsError } from "../errors.ts";
import {
  getAwsQueryError,
  getHttpError,
  getHttpHeader,
  getProtocol,
  getSyntheticError,
  hasErrorMessage,
  type SyntheticErrorTrait,
} from "../traits.ts";
import { getIdentifier, getPropertySignatures, isBooleanAST, isNumberAST } from "../util/ast.ts";
import { decode, decodeFailure, errorBody, holdsSensitive } from "../util/codec.ts";
import type { Operation } from "./operation.ts";
import { loadHandler, readResponse, Unreadable, type Protocol } from "./protocol.ts";
import type { Response } from "./response.ts";
import { makeStreamParser } from "./stream-parser.ts";

export interface ResponseParserOptions {
  /** Override the protocol (otherwise discovered from schema annotations) */
  protocol?: Protocol;
  /** Skip schema validation - returns raw deserialized response */
  skipValidation?: boolean;
  /** AWS service SDK ID for error context (e.g., "S3", "DynamoDB") */
  service?: string;
  /** Operation name for error context (e.g., "createBucket", "putObject") */
  operation?: string;
}

/** A generated error class: constructible from its members, with a lite `ast`. */
type ErrorClass = (new (props: Record<string, unknown>) => unknown) & { readonly ast: any };

export type ResponseParser<A, R> = (response: Response) => Effect.Effect<A, SchemaIssue.Issue, R>;

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
 * -- reject it.
 */
const matchesMessage = (matcher: SyntheticErrorTrait["message"], message: string): boolean => {
  if (typeof matcher === "string") return matcher === message;
  const { includes, matches } = matcher;
  if (includes === undefined && matches === undefined) return false;
  if (includes !== undefined && !message.includes(includes)) return false;
  if (matches !== undefined && !new RegExp(matches).test(message)) return false;
  return true;
};

/** The outcome of decoding a 2xx response: the value, or the error the call fails with. */
export type Decoded =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly error: unknown };

/**
 * The success path of {@link makeResponseParser} without effects, for an
 * operation whose output never streams: converts what the protocol's
 * `deserializeText` read and, unless lenient, validates it. `context` is
 * the calling fiber's (it carries the validation mode).
 *
 * Lenient mode returns a mismatched response converted as far as it fits,
 * so sensitive members are still `Redacted`. For an output that can hold a
 * secret, a body the protocol could not read fails in every mode, and no
 * error message quotes the response.
 */
export const makeSuccessDecoder = (
  operation: Operation<any, any, any>,
  options?: ResponseParserOptions,
) => {
  const outputAst = operation.output.ast;
  const what = `${options?.service ?? "AWS"}.${options?.operation ?? "operation"}`;
  return (context: Context.Context<any>, read: unknown): Decoded => {
    const mode = Context.get(context, ResponseValidation);
    const strict = mode !== "lenient";
    if (read instanceof Unreadable) {
      // The protocol's error already withholds the body of such an output.
      return strict || holdsSensitive(outputAst)
        ? { ok: false, error: read.error }
        : { ok: true, value: read.asRead };
    }
    let decoded: unknown;
    try {
      // Decoding keeps only modeled members, so strict mode rejects the
      // others here; the check below sees the decoded value.
      decoded = decode(outputAst, read, mode === "strict" ? "closed" : true);
    } catch (error) {
      return strict
        ? {
            ok: false,
            error: new ParseError({
              message: `${what} response does not match its output schema: ${decodeFailure(error, holdsSensitive(outputAst))}`,
            }),
          }
        : { ok: true, value: decode(outputAst, read) };
    }
    const invalid = strict ? checkResponse(context, outputAst as any, decoded) : undefined;
    return invalid === undefined
      ? { ok: true, value: decoded }
      : {
          ok: false,
          error: new ParseError({
            message: `${what} response does not match its output schema: ${(holdsSensitive(outputAst) ? withholdActual(invalid) : invalid).message}`,
          }),
        };
  };
};

/**
 * Create a response parser for a given operation.
 *
 * Expensive work (protocol discovery, preprocessing) is done once at creation time.
 *
 * @param operation - The operation (with input/output schemas and protocol annotations)
 * @param options - Optional overrides
 * @returns A function that parses responses
 */
export const makeResponseParser = <A>(
  operation: Operation<any, any, any>,
  options?: ResponseParserOptions,
): ((response: Response) => Effect.Effect<any, never, never>) => {
  const inputAst = operation.input.ast;
  const outputAst = operation.output.ast;

  // Discover protocol factory from annotations or use override (done once)
  const protocolFactory = options?.protocol ?? getProtocol(inputAst);
  if (!protocolFactory) {
    throw new Error("No protocol found on input schema");
  }

  // Create the protocol handler (preprocessing done once)
  const handler = loadHandler(protocolFactory(operation as Operation));

  const skipValidation = options?.skipValidation === true;

  const decodeSuccess = makeSuccessDecoder(operation, options);

  // Create stream parser if output has event stream member (done once)
  const streamParser = makeStreamParser(outputAst);

  // Build error schema map: errorCode -> Schema (done once)
  // We register errors by multiple keys to handle AWS wire format variations:
  // 1. Schema identifier (e.g., "EntityAlreadyExistsException")
  // 2. awsQueryError code if present (e.g., "EntityAlreadyExists")
  // 3. Short form without Exception/Error suffix (for services that return short codes)
  const errorSchemas = new Map<string, ErrorClass>();

  const registerError = (err: ErrorClass) => {
    const tag = getIdentifier(err.ast);
    if (tag) {
      errorSchemas.set(tag, err);
      // Also register short form (strip Exception/Error suffix)
      for (const suffix of ["Exception", "Error"]) {
        if (tag.endsWith(suffix)) {
          errorSchemas.set(tag.slice(0, -suffix.length), err);
          break;
        }
      }
    }
    // Also register by awsQueryError code if present (for aws-query/ec2-query protocols)
    const queryError = getAwsQueryError(err.ast);
    if (queryError?.code) errorSchemas.set(queryError.code, err);
  };

  // Register common errors first, then operation-specific errors so that a
  // service-specific schema (e.g. scheduler's `ValidationException` with a
  // `Message` field) takes precedence over the field-less common error of the
  // same name. Otherwise the common error would clobber the specific one in
  // the map and the decoded error would drop its message/data.
  // Synthetic errors (from spec patches) carve a new tag out of an existing
  // wire error using a message predicate. They are matched BEFORE the plain
  // wire-code lookup so the synthetic tag specializes the base error, and
  // are intentionally NOT registered by wire code (the wire never returns
  // the synthetic tag).
  const syntheticErrors: Array<{
    schema: ErrorClass;
    trait: SyntheticErrorTrait;
  }> = [];

  // Filled on the first error response: a successful call never needs it, and
  // registering reads every error class's AST (24 common + the operation's).
  let errorsRegistered = false;
  const registerErrors = () => {
    if (errorsRegistered) return;
    errorsRegistered = true;
    for (const err of COMMON_ERRORS) {
      registerError(err);
    }
    for (const err of operation.errors ?? []) {
      const synthetic = getSyntheticError(err.ast);
      if (synthetic) {
        syntheticErrors.push({ schema: err, trait: synthetic });
      } else {
        registerError(err);
      }
    }
  };

  // Return a function that parses responses
  // @ts-expect-error
  return Effect.fnUntraced(function* (response: Response) {
    const protocol = yield* handler;
    // Success path
    if (response.status >= 200 && response.status < 300) {
      const deserialized = (yield* readResponse(protocol, response)) as
        | Record<string, unknown>
        | Unreadable
        | undefined;

      // If the output has an event stream member, parse and decode it
      const stream = deserialized instanceof Unreadable ? null : streamParser?.(deserialized);
      if (stream) {
        return stream as A;
      }

      // Skip validation if requested - return raw deserialized response
      if (skipValidation) {
        return (deserialized instanceof Unreadable ? deserialized.asRead : deserialized) as A;
      }

      // Convert wire values to the declared types (timestamp -> Date,
      // sensitive -> Redacted, blob -> Uint8Array, wire keys -> type keys);
      // see makeSuccessDecoder.
      const decoded = yield* Effect.withFiber((fiber) =>
        Effect.succeed(decodeSuccess(fiber.context as Context.Context<any>, deserialized)),
      );
      if (!decoded.ok) return yield* Effect.fail(decoded.error);
      return decoded.value as A;
    }

    // Error path
    registerErrors();
    const { errorCode, data } = yield* protocol.deserializeError(response);

    // Fold the XML-style `Message` wire key onto `message`. AWS XML protocols
    // send <Message> while JS expects .message, and the generator names every
    // error class's canonical message member `message` regardless of which
    // spelling the service model used -- so this is what lets a `Message` wire
    // key reach the renamed member during decode.
    if (
      data &&
      typeof (data as Record<string, unknown>).Message === "string" &&
      (data as Record<string, unknown>).message === undefined
    ) {
      (data as Record<string, unknown>).message = (data as Record<string, unknown>).Message;
    }

    // Synthetic errors specialize the base wire error. An exact-message
    // matcher outranks a predicate matcher; ties resolve to declaration
    // order (first registered wins).
    const errorMessage =
      data && typeof (data as Record<string, unknown>).message === "string"
        ? ((data as Record<string, unknown>).message as string)
        : "";
    let errorSchema: ErrorClass | undefined;
    let bestScore = 0;
    for (const { schema, trait } of syntheticErrors) {
      if (!wireCodeMatches(trait.from, errorCode)) continue;
      if (!matchesMessage(trait.message, errorMessage)) continue;
      const score = typeof trait.message === "string" ? 2 : 1;
      if (score > bestScore) {
        bestScore = score;
        errorSchema = schema;
      }
    }
    errorSchema ??= errorSchemas.get(errorCode);

    // Status-based fallback: rest-json returns an empty error code when the
    // response carries none (no X-Amzn-Errortype header, no __type/code body
    // field -- e.g. IoT Managed Integrations). Match the operation's declared
    // errors by their smithy.api#httpError status, but only when exactly one
    // declared error carries the response status.
    if (errorSchema === undefined && errorCode === "") {
      const statusMatches = (operation.errors ?? []).filter(
        (err) => getHttpError(err.ast) === response.status,
      );
      if (statusMatches.length === 1) {
        errorSchema = statusMatches[0];
      } else if (response.status >= 500) {
        // A code-less 5xx (e.g. a raw "502 Bad Gateway" HTML page from an
        // AWS front-end proxy) is a transient server fault, not a client
        // parse bug. Surface it as the ServerError-categorized
        // InternalError so the default retry policy treats it as transient
        // instead of failing fast with an unretryable ParseError.
        return yield* new InternalError();
      } else {
        return yield* new ParseError({
          message: `No error code found in response and ${statusMatches.length} declared errors match status ${response.status}. Data: ${errorBody(operation, JSON.stringify(data))}`,
        });
      }
    }

    if (errorSchema) {
      // Extract headers for error members with HttpHeader traits
      // This handles error fields not in the body (e.g., x-amz-bucket-region)
      const errorProps = getPropertySignatures(errorSchema.ast);
      for (const prop of errorProps) {
        const headerName = getHttpHeader(prop);
        if (headerName) {
          const headerValue = response.headers[headerName.toLowerCase()];
          if (headerValue !== undefined) {
            // Coerce string header values to the member's declared type --
            // e.g. ThrottlingException.retryAfterSeconds (S.Number) bound to
            // the Retry-After header. Without coercion the decode fails and
            // the error degrades to a plain object, losing its error class
            // and retry/throttling categorization.
            (data as Record<string, unknown>)[String(prop.name)] = isNumberAST(prop.type)
              ? Number(headerValue)
              : isBooleanAST(prop.type)
                ? headerValue === "true"
                : headerValue;
          }
        }
      }

      // REST-JSON services with jsonName-renamed error members (e.g.
      // MediaLive) send camelCase wire keys ("message", "validationErrors")
      // while the generated error class declares the Smithy member names
      // ("Message", "ValidationErrors") without a key mapping. Backfill the
      // schema-cased key from its camelCase wire twin so the decode keeps
      // the payload instead of silently dropping every field.
      for (const prop of errorProps) {
        const name = String(prop.name);
        const record = data as Record<string, unknown>;
        if (record[name] === undefined) {
          const wireName = name.charAt(0).toLowerCase() + name.slice(1);
          if (wireName !== name && record[wireName] !== undefined) {
            record[name] = record[wireName];
          }
        }
      }

      // The error class built from its members, converted from the wire.
      // Its _tag is the class identifier, which may differ from the wire
      // errorCode ("EntityAlreadyExists" -> "EntityAlreadyExistsException").
      // Data that does not match the class stays a plain tagged object of
      // its members, converted as far as they fit (sensitive ones
      // `Redacted`), like the class would hold them.
      const schemaTag = getIdentifier(errorSchema.ast) ?? errorCode;
      let decoded: unknown;
      try {
        const saved = suppressStack();
        try {
          decoded = new errorSchema(decode(errorSchema.ast, data, true) as Record<string, unknown>);
        } finally {
          restoreStack(saved);
        }
      } catch {
        decoded = {
          _tag: schemaTag,
          ...(decode(errorSchema.ast, data) as Record<string, unknown>),
        };
      }
      // Ensure the JS `Error.message` carries the service's message. The
      // generator tags exactly one member per error class as the canonical
      // message (T.ErrorMessage) and normalizes its name to `message`, so
      // this reads the tag rather than guessing by spelling the way the old
      // `Message`-only fallback did. Without it an error whose class carries
      // the text in a field the Error constructor didn't pick up stringifies
      // as a bare tag, which is what made a typed error less useful than the
      // UnknownAwsError it replaced (distilled #160).
      if (decoded instanceof Error && !decoded.message) {
        const record = decoded as unknown as Record<string, unknown>;
        const canonical = errorProps.find(hasErrorMessage);
        const value = canonical ? record[String(canonical.name)] : undefined;
        if (typeof value === "string" && value !== "") {
          decoded.message = value;
        }
      }
      return yield* Effect.fail(decoded);
    }

    return yield* new UnknownAwsError({
      errorTag: errorCode,
      errorData: data,
      service: options?.service,
      operation: options?.operation,
      message: typeof data?.message === "string" ? data.message : errorCode,
    });
  });
};
