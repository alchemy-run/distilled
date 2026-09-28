import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS } from "@distilled.cloud/core/errors";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type * as Layer from "effect/Layer";
import * as Predicate from "effect/Predicate";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import { Endpoint, endpoint } from "./endpoint.ts";
import { UnknownCelldError } from "./errors.ts";

export type CelldOpContext = Endpoint | HttpClient.HttpClient;
export type CelldOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownCelldError
  | HttpClientError.HttpClientError;

/** Standard REST encoding; signed runtime headers are explicit modeled inputs. */
export const CelldProtocol: Layer.Layer<API.Protocol> = makeRestProtocol({
  credentials: endpoint,
  baseUrl: (url) => url,
  headers: () => ({}),
  errorEnvelope: (body) => {
    if (!Predicate.isObject(body)) return undefined;
    if (
      body.ok === false &&
      Predicate.isObject(body.error) &&
      typeof body.error.kind === "string" &&
      typeof body.error.reason === "string"
    ) {
      return { message: `${body.error.kind}: ${body.error.reason}` };
    }
    return {
      code:
        typeof body.code === "string" || typeof body.code === "number"
          ? body.code
          : undefined,
      message:
        typeof body.message === "string"
          ? body.message
          : typeof body.error === "string"
            ? body.error
            : undefined,
    };
  },
  unknownError: ({ status, message }) =>
    new UnknownCelldError({ status, message }),
});
