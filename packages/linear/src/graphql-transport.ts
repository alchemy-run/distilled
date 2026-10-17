import {
  GqlTransport,
  GraphQLTransportError,
  type CompiledOperation,
  type RawGraphQLError,
} from "@distilled.cloud/core/graphql";
/**
 * Linear {@link GqlTransport}: POST /graphql with an API key or OAuth token.
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

export type GraphQLRequirements = Credentials | HttpClient.HttpClient;

const retryAfterSeconds = (header: string | undefined): number | undefined =>
  header && /^\d+(\.\d+)?$/.test(header) ? Number(header) : undefined;

export const GraphQLLive = Layer.succeed(GqlTransport, {
  execute: (request: CompiledOperation) =>
    Effect.gen(function* () {
      const resolve = yield* Credentials;
      const credentials = yield* resolve;
      const token = Redacted.value(credentials.token).trim();
      const auth =
        token.length === 0
          ? {}
          : credentials.tokenKind === "oauth"
            ? { Authorization: `Bearer ${token}` }
            : { Authorization: token };
      const http = yield* HttpClient.HttpClient;
      const url = `${credentials.apiBaseUrl.replace(/\/$/, "")}/graphql`;
      const response = yield* http
        .execute(
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
        )
        .pipe(
          Effect.mapError(
            (cause) =>
              new GraphQLTransportError({
                message: "Linear GraphQL HTTP request failed",
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
              message: "Could not read Linear GraphQL response",
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
                ? `Linear HTTP ${status} returned a non-GraphQL response`
                : "Linear GraphQL response is not JSON",
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
          message: `Linear HTTP ${status} returned no GraphQL errors`,
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
});
