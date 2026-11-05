import {
  GqlTransport,
  GraphQLTransportError,
  type CompiledOperation,
  type RawGraphQLError,
} from "@distilled.cloud/core/graphql";
import * as Telemetry from "@distilled.cloud/core/telemetry";
import type * as Context from "effect/Context";
/**
 * GitHub {@link GqlTransport}: POST /graphql with the REST SDK's Credentials.
 *
 * GitHub Enterprise Server serves REST from `<host>/api/v3` and GraphQL from
 * `<host>/api/graphql`; github.com and data residency hosts serve both from
 * the same root.
 *
 * GitHub puts an error's code in a top-level `type` (`NOT_FOUND`,
 * `FORBIDDEN`, ...) instead of `extensions.code`; the transport moves it there
 * so `Query.fn` classifies the errors into the typed tags declared in
 * `patches/graphql/`. Failures that never produce a GraphQL body are
 * {@link GraphQLTransportError}.
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { TELEMETRY } from "./graphql-telemetry.ts";

export type GraphQLRequirements = Credentials | HttpClient.HttpClient;

/** The GraphQL endpoint for a REST API root. */
export const graphqlUrl = (apiBaseUrl: string): string =>
  `${apiBaseUrl.replace(/\/$/, "").replace(/\/v3$/, "")}/graphql`;

const retryAfterSeconds = (header: string | undefined): number | undefined =>
  header && /^\d+(\.\d+)?$/.test(header) ? Number(header) : undefined;

/** Move GitHub's top-level `type` into `extensions.code`. */
const normalizeError = (error: RawGraphQLError): RawGraphQLError =>
  typeof error.type === "string" &&
  (error.extensions === undefined || typeof error.extensions.code !== "string")
    ? { ...error, extensions: { ...error.extensions, code: error.type } }
    : error;

export const GraphQLLive = /*@__PURE__*/ Layer.succeed(GqlTransport, {
  execute: (request: CompiledOperation) =>
    Effect.gen(function* () {
      const resolve = yield* Credentials;
      const credentials = yield* resolve.pipe(
        Effect.mapError((cause) => new GraphQLTransportError({ message: cause.message, cause })),
      );
      const http = yield* HttpClient.HttpClient;
      const context = yield* Effect.withFiber((fiber) =>
        Effect.succeed(fiber.context as Context.Context<any>),
      );
      const response = yield* Telemetry.execute(
        context,
        http,
        HttpClientRequest.post(graphqlUrl(credentials.apiBaseUrl)).pipe(
          HttpClientRequest.setHeaders({
            Authorization: `Bearer ${Redacted.value(credentials.token)}`,
            Accept: "application/json",
            "User-Agent": credentials.userAgent,
          }),
          HttpClientRequest.bodyJsonUnsafe({
            query: request.document,
            variables: request.variables,
            operationName: request.operationName,
          }),
        ),
      ).pipe(
        Effect.mapError(
          (cause) =>
            new GraphQLTransportError({
              message: "GitHub GraphQL HTTP request failed",
              cause,
            }),
        ),
      );
      const status = response.status;
      const retryAfter = retryAfterSeconds(response.headers["retry-after"]);
      const text = yield* response.text.pipe(
        Effect.mapError(
          (cause) =>
            new GraphQLTransportError({
              message: "Could not read GitHub GraphQL response",
              status,
              retryAfter,
              cause,
            }),
        ),
      );
      const body = yield* Effect.try({
        try: () => JSON.parse(text) as unknown,
        catch: (cause) =>
          new GraphQLTransportError({
            message:
              status >= 400
                ? `GitHub HTTP ${status} returned a non-GraphQL response`
                : "GitHub GraphQL response is not JSON",
            status,
            retryAfter,
            cause,
          }),
      });
      const envelope =
        typeof body === "object" && body !== null
          ? (body as { data?: unknown; errors?: unknown; message?: unknown })
          : {};
      const errors = Array.isArray(envelope.errors)
        ? (envelope.errors as RawGraphQLError[]).map(normalizeError)
        : [];
      if (status >= 400 && errors.length === 0) {
        // Authentication and secondary rate limits answer with a REST-style
        // `{ message }` body.
        return yield* new GraphQLTransportError({
          message:
            typeof envelope.message === "string"
              ? `GitHub HTTP ${status}: ${envelope.message}`
              : `GitHub HTTP ${status} returned no GraphQL errors`,
          status,
          retryAfter,
        });
      }
      return {
        data: envelope.data,
        errors,
        status,
        headers: response.headers,
      };
    }),
  telemetry: TELEMETRY,
});
