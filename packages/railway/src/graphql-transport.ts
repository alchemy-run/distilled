/**
 * Railway {@link GqlTransport}: POST /graphql/v2 with account or project tokens.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import {
  GqlError,
  GqlTransport,
  type CompiledOperation,
} from "@distilled.cloud/core/graphql";
import { Credentials } from "./credentials.ts";

export type GraphQLRequirements = Credentials | HttpClient.HttpClient;

export const GraphQLLive = Layer.succeed(GqlTransport, {
  execute: (request: CompiledOperation) =>
    Effect.gen(function* () {
      const resolve = yield* Credentials;
      const credentials = yield* resolve;
      const token = Redacted.value(credentials.token).trim();
      const auth =
        token.length === 0
          ? {}
          : credentials.tokenKind === "project"
            ? { "Project-Access-Token": token }
            : { Authorization: `Bearer ${token}` };
      const http = yield* HttpClient.HttpClient;
      const url = `${credentials.apiBaseUrl.replace(/\/$/, "")}/graphql/v2`;
      const response = yield* http.execute(
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
      );
      const text = yield* response.text.pipe(
        Effect.mapError(
          (cause) =>
            new GqlError(
              `Could not read Railway GraphQL response: ${String(cause)}`,
            ),
        ),
      );
      const json = yield* Effect.try({
        try: () =>
          JSON.parse(text) as {
            data?: unknown;
            errors?: Array<{ message: string }>;
          },
        catch: (cause) =>
          new GqlError(
            `Railway GraphQL response is not JSON: ${String(cause)}`,
          ),
      });
      if (json.errors && json.errors.length > 0) {
        return yield* Effect.fail(
          new GqlError(json.errors.map((error) => error.message).join("; ")),
        );
      }
      return { data: json.data };
    }),
});
