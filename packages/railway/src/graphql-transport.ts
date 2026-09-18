/** Railway authentication and Effect HTTP transport for the native GraphQL client. */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as G from "@distilled.cloud/core/graphql";
import { Credentials } from "./credentials.ts";

export type GraphQLRequirements = Credentials | HttpClient.HttpClient;

/** Resolve credentials for each execution, so token rotation and fiber scopes work. */
export const transport: G.Transport<GraphQLRequirements> = (request) =>
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
    const url = `${credentials.apiBaseUrl.replace(/\/$/, "")}/graphql/v2?source=alchemy`;
    const response = yield* http
      .execute(
        HttpClientRequest.post(url).pipe(
          HttpClientRequest.setHeaders({
            ...auth,
            Accept: "application/graphql-response+json, application/json",
          }),
          HttpClientRequest.bodyJsonUnsafe({
            query: request.query,
            variables: request.variables,
            operationName: request.operationName,
          }),
        ),
      )
      .pipe(
        Effect.mapError(
          (cause) =>
            new G.GraphQLTransportError({
              message: "Railway GraphQL HTTP request failed",
              cause,
            }),
        ),
      );
    const text = yield* response.text.pipe(
      Effect.mapError(
        (cause) =>
          new G.GraphQLTransportError({
            message: "Could not read Railway GraphQL response",
            status: response.status,
            cause,
          }),
      ),
    );
    const body = yield* Effect.try({
      try: () => JSON.parse(text),
      catch: (cause) =>
        response.status >= 400
          ? new G.GraphQLTransportError({
              message: `Railway HTTP ${response.status} returned a non-GraphQL response`,
              status: response.status,
              cause,
            })
          : new G.GraphQLDecodeError({
              message: "Railway GraphQL response is not JSON",
              cause,
            }),
    });
    return { body, status: response.status, headers: response.headers };
  });
