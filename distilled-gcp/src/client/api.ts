/**
 * API client factory for GCP operations.
 *
 * Creates Effect-returning functions from operation definitions.
 * Handles request building, authentication, response parsing, and retries.
 */

import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Ref from "effect/Ref";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import * as HttpBody from "effect/unstable/http/HttpBody";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";

import { pipeArguments } from "effect/Pipeable";
import { SingleShotGen } from "effect/Utils";
import { type AuthError, GCPAuth } from "../auth.ts";
import {
  GCPHttpError,
  GCPNetworkError,
  UnknownGCPError,
} from "../errors.ts";
import { Retry, makeDefault } from "../retry.ts";
import * as T from "../traits.ts";
import { buildRequest } from "./request-builder.ts";
import { parseResponse, extractTagFromAst } from "./response-parser.ts";

/**
 * Operation definition.
 */
export interface Operation<
  I extends Schema.Top = Schema.Top,
  O extends Schema.Top = Schema.Top,
> {
  input: I;
  output: O;
  errors: Schema.Top[];
  pagination?: T.PaginationTrait;
}

export type OperationMethod<I, A, E, R> = Effect.Effect<
  (input: I) => Effect.Effect<A, E, never>,
  never,
  R
> &
  ((input: I) => Effect.Effect<A, E, R>);

/**
 * Create an Effect-returning API function from an operation definition.
 */
export const make = <I extends Schema.Top, O extends Schema.Top>(
  initOperation: () => {
    input: I;
    output: O;
    errors: Schema.Top[];
    pagination?: T.PaginationTrait;
  },
): any => {
  type Input = Schema.Schema.Type<I>;
  type Output = Schema.Schema.Type<O>;

  const op = initOperation();

  // Build error schema map
  const errorSchemas = new Map<string, Schema.Top>();
  for (const errorSchema of op.errors) {
    const identifier = extractTagFromAst(errorSchema.ast);
    if (identifier) {
      errorSchemas.set(identifier, errorSchema);
    }
  }

  const fn = (
    payload: Input,
  ): Effect.Effect<
    Output,
    AuthError | UnknownGCPError | GCPNetworkError | GCPHttpError,
    GCPAuth | HttpClient.HttpClient | O["DecodingServices"]
  > =>
    Effect.gen(function* () {
      const lastErrorRef = yield* Ref.make<unknown>(null);

      const retryPolicyOption = yield* Effect.serviceOption(Retry);
      const retryPolicy = Option.match(retryPolicyOption, {
        onNone: () => makeDefault(lastErrorRef),
        onSome: (policy) =>
          typeof policy === "function" ? policy(lastErrorRef) : policy,
      });

      const operation = Effect.gen(function* () {
        // Build the request
        const request = buildRequest(op.input, payload);

        // Get service metadata from input schema
        const service = T.getService(op.input.ast);

        // Get auth token
        const auth = yield* GCPAuth;
        const accessToken = yield* auth.getAccessToken;

        // Build full URL
        const baseUrl = service
          ? `${service.rootUrl}${service.servicePath}`
          : "https://www.googleapis.com/";

        const queryString = Object.entries(request.query)
          .filter(([_, v]) => v !== undefined)
          .flatMap(([k, v]) => {
            if (Array.isArray(v)) {
              return v.map(
                (item) =>
                  `${encodeURIComponent(k)}=${encodeURIComponent(item)}`,
              );
            }
            return `${encodeURIComponent(k)}=${encodeURIComponent(v!)}`;
          })
          .join("&");

        const fullUrl = queryString
          ? `${baseUrl}${request.path}?${queryString}`
          : `${baseUrl}${request.path}`;

        // Build headers
        const headers: Record<string, string> = {
          ...request.headers,
          Authorization: `Bearer ${Redacted.value(accessToken.token)}`,
        };

        if (request.body !== undefined) {
          headers["Content-Type"] = "application/json";
        }

        // Build HTTP request
        let httpRequest = HttpClientRequest.make(
          request.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        )(fullUrl);
        httpRequest = HttpClientRequest.setHeaders(headers)(httpRequest);

        if (request.body !== undefined) {
          const bodyText = JSON.stringify(request.body);
          httpRequest = HttpClientRequest.setBody(
            HttpBody.text(bodyText, "application/json"),
          )(httpRequest);
        }

        yield* Effect.logDebug(httpRequest);

        // Execute request
        const client = yield* HttpClient.HttpClient;
        const rawResponse = yield* client.execute(httpRequest).pipe(
          Effect.mapError(
            (error) =>
              new GCPNetworkError({
                message: String(error),
                cause: error,
              }),
          ),
        );

        yield* Effect.logDebug({
          status: rawResponse.status,
          headers: rawResponse.headers,
        });

        // Convert response
        const responseHeaders = rawResponse.headers as Record<string, string>;
        const contentLength = responseHeaders["content-length"];
        const isEmptyBody =
          request.method === "HEAD" ||
          contentLength === "0" ||
          rawResponse.status === 204;

        const responseBody = isEmptyBody
          ? new ReadableStream<Uint8Array>({ start: (c) => c.close() })
          : yield* Stream.toReadableStreamEffect(rawResponse.stream);

        const result = yield* parseResponse(
          {
            status: rawResponse.status,
            statusText: "OK",
            headers: responseHeaders,
            body: responseBody,
          },
          op.output,
          errorSchemas,
        );

        return result as Output;
      });

      // Apply retry policy
      if (retryPolicy.while && retryPolicy.schedule) {
        return yield* operation.pipe(
          Effect.tapError((error) => Ref.set(lastErrorRef, error)),
          Effect.retry({
            while: retryPolicy.while,
            schedule: retryPolicy.schedule,
          }),
        );
      }

      return yield* operation;
    });

  const Proto = {
    [Symbol.iterator]() {
      return new SingleShotGen(this);
    },
    pipe() {
      return pipeArguments(this.asEffect(), arguments);
    },
    asEffect() {
      return Effect.map(
        Effect.services(),
        (sm) => (input: Input) => fn(input).pipe(Effect.provide(sm)),
      );
    },
  };

  return Object.assign(fn, Proto);
};

/**
 * Create a paginated API function.
 */
export const makePaginated = <I extends Schema.Top, O extends Schema.Top>(
  initOperation: () => {
    input: I;
    output: O;
    errors: Schema.Top[];
    pagination: T.PaginationTrait;
  },
) => {
  type Input = Schema.Schema.Type<I>;
  type Output = Schema.Schema.Type<O>;

  const op = initOperation();
  const baseFn = make(initOperation);
  const pagination = op.pagination;

  const pages = (payload: Input) =>
    Effect.gen(function* () {
      const results: Output[] = [];
      let token: unknown = undefined;
      let done = false;

      while (!done) {
        const requestPayload =
          token !== undefined
            ? { ...(payload as object), [pagination.inputToken]: token }
            : payload;

        const response = yield* baseFn(requestPayload as Input);
        results.push(response);

        const nextToken = getPath(response, pagination.outputToken);
        if (nextToken === undefined || nextToken === null) {
          done = true;
        } else {
          token = nextToken;
        }
      }

      return results;
    });

  const items = (payload: Input) =>
    Effect.gen(function* () {
      if (!pagination.items) return [];

      const allPages = yield* pages(payload);
      const allItems: unknown[] = [];

      for (const page of allPages) {
        const pageItems = getPath(page, pagination.items) as
          | unknown[]
          | undefined;
        if (pageItems) {
          allItems.push(...pageItems);
        }
      }

      return allItems;
    });

  return Object.assign(baseFn, {
    pages,
    items,
    input: op.input,
    output: op.output,
    errors: op.errors,
    pagination: op.pagination,
  });
};

function getPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}
