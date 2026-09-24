/**
 * The credentials document the container, HTTP and instance metadata
 * endpoints all return, and the GET that fetches it.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import {
  type CredentialSource,
  CredentialSourceError,
} from "./credential-source.ts";
import { requestText } from "./http-client.ts";

export const DEFAULT_TIMEOUT_MS = 1000;

interface ImdsCredentials {
  AccessKeyId: string;
  SecretAccessKey: string;
  Token: string;
  Expiration: string;
  AccountId?: string;
}

const isImdsCredentials = (arg: unknown): arg is ImdsCredentials =>
  typeof arg === "object" &&
  arg !== null &&
  typeof (arg as ImdsCredentials).AccessKeyId === "string" &&
  typeof (arg as ImdsCredentials).SecretAccessKey === "string" &&
  typeof (arg as ImdsCredentials).Token === "string" &&
  typeof (arg as ImdsCredentials).Expiration === "string";

const fromImdsCredentials = (
  creds: ImdsCredentials,
): AwsCredentialIdentity => ({
  accessKeyId: creds.AccessKeyId,
  secretAccessKey: creds.SecretAccessKey,
  sessionToken: creds.Token,
  expiration: new Date(creds.Expiration),
  ...(creds.AccountId && { accountId: creds.AccountId }),
});

export const parseImdsCredentials = (
  text: string,
): Effect.Effect<AwsCredentialIdentity, CredentialSourceError> =>
  Effect.try({
    try: () => JSON.parse(text) as unknown,
    catch: (cause) =>
      new CredentialSourceError({
        message: "Invalid response received from instance metadata service.",
        cause,
      }),
  }).pipe(
    Effect.flatMap((parsed) =>
      isImdsCredentials(parsed)
        ? Effect.succeed(fromImdsCredentials(parsed))
        : Effect.fail(
            new CredentialSourceError({
              message:
                "Invalid response received from instance metadata service.",
            }),
          ),
    ),
  );

/** One GET against a credential endpoint, with the response parsed. */
export const getHttpCredentials = (
  url: URL,
  authorization: string | undefined,
  timeoutMs: number,
): CredentialSource =>
  requestText(
    HttpClientRequest.get(url, {
      headers: authorization ? { Authorization: authorization } : undefined,
    }),
    timeoutMs,
  ).pipe(
    Effect.flatMap(({ status, text }) => {
      if (status === 200) {
        return parseImdsCredentials(text).pipe(
          Effect.mapError(
            () =>
              new CredentialSourceError({
                message:
                  "HTTP credential provider response not of the required format, an object matching: " +
                  "{ AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }",
              }),
          ),
        );
      }
      let detail = "";
      if (status >= 400 && status < 500) {
        try {
          const body = JSON.parse(text) as { Code?: string; Message?: string };
          if (body.Code || body.Message)
            detail = ` ${body.Code ?? ""} ${body.Message ?? ""}`.trimEnd();
        } catch {
          // The body is optional and need not be JSON.
        }
      }
      return Effect.fail(
        new CredentialSourceError({
          message: `Server responded with status: ${status}${detail}`,
        }),
      );
    }),
  );
