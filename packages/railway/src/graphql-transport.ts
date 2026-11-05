import {
  GqlTransport,
  GraphQLTransportError,
  type CompiledOperation,
  type RawGraphQLError,
} from "@distilled.cloud/core/graphql";
import * as Telemetry from "@distilled.cloud/core/telemetry";
import type * as Context from "effect/Context";
/**
 * Railway {@link GqlTransport}: POST /graphql/v2 with account or project tokens.
 *
 * Returns the parsed `data` and raw `errors`; `Query.fn` classifies the
 * errors into the typed tags declared in `patches/graphql/`. Failures that
 * never produce a GraphQL body are {@link GraphQLTransportError}.
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { TELEMETRY } from "./graphql-telemetry.ts";

export type GraphQLRequirements = Credentials | HttpClient.HttpClient;

const retryAfterSeconds = (header: string | undefined): number | undefined =>
  header && /^\d+(\.\d+)?$/.test(header) ? Number(header) : undefined;

export const GraphQLLive = /*@__PURE__*/ Layer.succeed(GqlTransport, {
  execute: (request: CompiledOperation) =>
    Effect.gen(function* () {
      const resolve = yield* Credentials;
      const credentials = yield* resolve.pipe(
        Effect.mapError((cause) => new GraphQLTransportError({ message: cause.message, cause })),
      );
      const token = Redacted.value(credentials.token).trim();
      const auth =
        token.length === 0
          ? {}
          : credentials.tokenKind === "project"
            ? { "Project-Access-Token": token }
            : { Authorization: `Bearer ${token}` };
      const http = yield* HttpClient.HttpClient;
      const context = yield* Effect.withFiber((fiber) =>
        Effect.succeed(fiber.context as Context.Context<any>),
      );
      const url = `${credentials.apiBaseUrl.replace(/\/$/, "")}/graphql/v2`;
      const response = yield* Telemetry.execute(
        context,
        http,
        HttpClientRequest.post(url).pipe(
          HttpClientRequest.setHeaders({
            ...auth,
            Accept: "application/graphql-response+json, application/json",
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
              message: "Railway GraphQL HTTP request failed",
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
              message: "Could not read Railway GraphQL response",
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
                ? `Railway HTTP ${status} returned a non-GraphQL response`
                : "Railway GraphQL response is not JSON",
            status,
            retryAfter,
            cause,
          }),
      });
      const envelope =
        typeof body === "object" && body !== null
          ? (body as { data?: unknown; errors?: unknown })
          : {};
      const errors = Array.isArray(envelope.errors) ? (envelope.errors as RawGraphQLError[]) : [];
      if (status >= 400 && errors.length === 0) {
        return yield* new GraphQLTransportError({
          message: `Railway HTTP ${status} returned no GraphQL errors`,
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
