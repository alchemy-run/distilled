/**
 * GitHub {@link GqlTransport}: POST /graphql with the same {@link Credentials}
 * the REST services use.
 *
 * The endpoint sits beside the REST base: `https://api.github.com/graphql`
 * for github.com, `https://<host>/api/graphql` for a GHES `.../api/v3` base.
 *
 * GitHub names an error's kind in a top-level `type` (`NOT_FOUND`,
 * `FORBIDDEN`, `RATE_LIMITED`, …) rather than `extensions.code`, which is what
 * `Query.fn` matches the declarations in `patches/graphql/` against, so the
 * transport copies it across. Failures that never produce a GraphQL body are
 * {@link GraphQLTransportError}.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import {
  GqlTransport,
  GraphQLTransportError,
  type CompiledOperation,
  type RawGraphQLError,
} from "@distilled.cloud/core/graphql";
import { Credentials } from "./credentials.ts";
import { API_VERSION } from "./protocol.ts";

export type GraphQLRequirements = Credentials | HttpClient.HttpClient;

export const graphqlUrl = (apiBaseUrl: string): string => {
  const base = apiBaseUrl.replace(/\/$/, "");
  return base.endsWith("/api/v3")
    ? `${base.slice(0, -"/v3".length)}/graphql`
    : `${base}/graphql`;
};

const retryAfterSeconds = (header: string | undefined): number | undefined =>
  header && /^\d+(\.\d+)?$/.test(header) ? Number(header) : undefined;

const withCode = (error: RawGraphQLError): RawGraphQLError =>
  typeof error.type === "string" && typeof error.extensions?.code !== "string"
    ? { ...error, extensions: { ...error.extensions, code: error.type } }
    : error;

export const GraphQLLive = Layer.succeed(GqlTransport, {
  execute: (request: CompiledOperation) =>
    Effect.gen(function* () {
      const resolve = yield* Credentials;
      const credentials = yield* resolve;
      const http = yield* HttpClient.HttpClient;
      const response = yield* http
        .execute(
          HttpClientRequest.post(graphqlUrl(credentials.apiBaseUrl)).pipe(
            HttpClientRequest.setHeaders({
              Authorization: `Bearer ${Redacted.value(credentials.token)}`,
              Accept: "application/json",
              "User-Agent": credentials.userAgent,
              "X-GitHub-Api-Version": API_VERSION,
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
        ? (envelope.errors as RawGraphQLError[]).map(withCode)
        : [];
      if (status >= 400 && errors.length === 0) {
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
});
