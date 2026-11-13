import {
  GqlTransport,
  GraphQLTransportError,
  type CompiledOperation,
  type RawGraphQLError,
} from "@distilled.cloud/core/graphql";
import * as Telemetry from "@distilled.cloud/core/telemetry";
import type * as Context from "effect/Context";
/**
 * Fly {@link GqlTransport}: POST https://api.fly.io/graphql with the same
 * {@link Credentials} (`FLY_API_TOKEN`) the REST services use, as
 * `Authorization: Bearer`.
 *
 * The GraphQL endpoint is always api.fly.io; `FLY_API_HOSTNAME` points the
 * Machines REST API elsewhere and does not apply here. Returns the parsed
 * `data` and raw `errors`; `Query.fn` classifies the errors (by
 * `extensions.code`) into the typed tags declared in `patches/graphql/`.
 * Failures that never produce a GraphQL body are {@link GraphQLTransportError}.
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, DEFAULT_FLY_API_BASE_URL } from "./credentials.ts";
import { TELEMETRY } from "./graphql-telemetry.ts";

export type GraphQLRequirements = Credentials | HttpClient.HttpClient;

/** The Fly GraphQL endpoint. */
export const GRAPHQL_URL = `${DEFAULT_FLY_API_BASE_URL}/graphql`;

const retryAfterSeconds = (header: string | undefined): number | undefined =>
  header && /^\d+(\.\d+)?$/.test(header) ? Number(header) : undefined;

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
        HttpClientRequest.post(GRAPHQL_URL).pipe(
          HttpClientRequest.setHeaders({
            Authorization: `Bearer ${Redacted.value(credentials.apiKey)}`,
            Accept: "application/json",
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
              message: "Fly GraphQL HTTP request failed",
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
              message: "Could not read Fly GraphQL response",
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
                ? `Fly HTTP ${status} returned a non-GraphQL response`
                : "Fly GraphQL response is not JSON",
            status,
            retryAfter,
            cause,
          }),
      });
      const envelope =
        typeof body === "object" && body !== null
          ? (body as { data?: unknown; errors?: unknown; message?: unknown; error?: unknown })
          : {};
      const errors = Array.isArray(envelope.errors) ? (envelope.errors as RawGraphQLError[]) : [];
      if (status >= 400 && errors.length === 0) {
        const detail = [envelope.message, envelope.error].find(
          (value): value is string => typeof value === "string",
        );
        return yield* new GraphQLTransportError({
          message:
            detail !== undefined
              ? `Fly HTTP ${status}: ${detail}`
              : `Fly HTTP ${status} returned no GraphQL errors`,
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
