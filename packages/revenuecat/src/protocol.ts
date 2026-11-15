import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { RevenueCatParseError, UnknownRevenueCatError } from "./errors.ts";

export type RevenueCatOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownRevenueCatError
  | ConfigError
  | HttpClientError.HttpClientError
  | RevenueCatParseError
  | InvalidInput
  | SdkError;

export type RevenueCatOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve);

export const RevenueCatProtocol: API.ProtocolLayer<RevenueCatOpError, RevenueCatOpContext> =
  /*@__PURE__*/ makeRestProtocol({
    credentials: resolveCredentials,
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope: (body) => {
      if (body === null || typeof body !== "object") return undefined;
      const { type, message } = body as Record<string, unknown>;
      return {
        code: typeof type === "string" ? type : undefined,
        message: typeof message === "string" ? message : undefined,
      };
    },
    unknownError: (info) => new UnknownRevenueCatError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new RevenueCatParseError({ body, cause }),
  });
