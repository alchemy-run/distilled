/**
 * MailchimpProtocol — hand-written.
 *
 * Plain JSON REST with no response envelope. Failures are RFC 7807 problem
 * documents:
 *
 *     { "type": "https://mailchimp.com/developer/marketing/docs/errors/",
 *       "title": "Resource Not Found", "status": 404,
 *       "detail": "The requested resource could not be found.",
 *       "instance": "995c5cb0-3280-4a6e-808b-3b096d0bb219" }
 *
 * A 400 from a write adds `errors: [{ field, message }]`, which is folded into
 * the message because the core status classes carry nothing else.
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import type * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { MailchimpApiError, UnknownMailchimpError } from "./errors.ts";

export type MailchimpOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | MailchimpApiError
  | UnknownMailchimpError
  | ConfigError
  | HttpClientError.HttpClientError;

export type MailchimpOpContext = Credentials | HttpClient.HttpClient;

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const str = (v: unknown): string | undefined =>
  typeof v === "string" && v !== "" ? v : undefined;

const fieldErrors = (body: Record<string, unknown>): string[] =>
  Array.isArray(body.errors)
    ? body.errors.flatMap((e) =>
        isRecord(e) && str(e.message)
          ? [str(e.field) ? `${e.field}: ${e.message}` : String(e.message)]
          : [],
      )
    : [];

const problemMessage = (body: unknown): string | undefined => {
  if (!isRecord(body)) return undefined;
  const head = str(body.detail) ?? str(body.title);
  if (head === undefined) return undefined;
  const fields = fieldErrors(body);
  return fields.length ? `${head} (${fields.join("; ")})` : head;
};

export const MailchimpProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    // Basic auth: Mailchimp ignores the username.
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`anystring:${Redacted.value(creds.apiKey)}`)}`,
    }),
    errorEnvelope: (body) => {
      const message = problemMessage(body);
      return message === undefined ? undefined : { message };
    },
    unknownError: ({ status, message, body }) => {
      const problem = isRecord(body) ? body : undefined;
      const fields = {
        status,
        type: str(problem?.type),
        title: str(problem?.title),
        message,
        instance: str(problem?.instance),
        body,
      };
      return problemMessage(body) !== undefined
        ? new MailchimpApiError(fields)
        : new UnknownMailchimpError(fields);
    },
  });
