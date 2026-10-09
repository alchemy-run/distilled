import { readFile } from "node:fs/promises";
/**
 * Application Default Credentials (AIP-4110), the lookup every Google
 * library performs:
 *
 * 1. the file `GOOGLE_APPLICATION_CREDENTIALS` names;
 * 2. gcloud's file, written by `gcloud auth application-default login`
 *    (`$CLOUDSDK_CONFIG`, else `~/.config/gcloud`, else `%APPDATA%\gcloud`
 *    on Windows, then `/application_default_credentials.json`);
 * 3. the metadata server, on Google Cloud.
 *
 * A file can hold user credentials (`authorized_user`), a service account
 * key (`service_account`), workload identity federation
 * (`external_account`), or another credential impersonating a service
 * account (`impersonated_service_account`, from
 * `gcloud auth application-default login --impersonate-service-account`).
 *
 * Node only: it reads files.
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  type Credentials,
  createRefreshingProvider,
  type ProviderOverrides,
  type Token,
  type TokenSource,
} from "../credentials-service.ts";
import { GCPCredentialsError } from "../errors.ts";
import { authorizedUserSource } from "./from-authorized-user.ts";
import { isOnGcp, metadataServerSource } from "./from-metadata-server.ts";
import { serviceAccountKeySource } from "./from-service-account-key.ts";
import { impersonateServiceAccount, workloadIdentitySource } from "./from-workload-identity.ts";
import { CLOUD_PLATFORM_SCOPE, requestText } from "./oauth.ts";

export interface ApplicationDefaultConfig extends ProviderOverrides {
  /**
   * Scopes to request. User credentials default to the scopes granted at
   * login; every other kind defaults to `cloud-platform`.
   */
  readonly scopes?: ReadonlyArray<string>;
}

type Json = Record<string, unknown>;

const env = (name: string): string | undefined =>
  typeof process !== "undefined" ? process.env[name] || undefined : undefined;

const str = (json: Json, key: string): string | undefined =>
  typeof json[key] === "string" && json[key] !== "" ? (json[key] as string) : undefined;

/** gcloud's application default credentials file. */
export const wellKnownCredentialsPath = (): string | undefined => {
  const config =
    env("CLOUDSDK_CONFIG") ??
    (process.platform === "win32"
      ? env("APPDATA") && `${env("APPDATA")}\\gcloud`
      : env("HOME") && `${env("HOME")}/.config/gcloud`);
  return config && `${config}/application_default_credentials.json`;
};

const fail = (message: string) => Effect.fail(new GCPCredentialsError({ message }));

/** Read and parse a credentials file; `undefined` when it does not exist. */
const readCredentialsFile = (path: string): Effect.Effect<Json | undefined, GCPCredentialsError> =>
  Effect.tryPromise({
    try: () => readFile(path, "utf8"),
    catch: (cause) => cause,
  }).pipe(
    Effect.map((text): string | undefined => text),
    Effect.catch((cause) =>
      (cause as { code?: unknown }).code === "ENOENT"
        ? Effect.succeed(undefined)
        : fail(`Could not read the credentials file ${path}.`),
    ),
    Effect.flatMap((text) => {
      if (text === undefined) return Effect.succeed(undefined);
      try {
        const json: unknown = JSON.parse(text);
        if (typeof json === "object" && json !== null) return Effect.succeed(json as Json);
      } catch {}
      return fail(`The credentials file ${path} is not a JSON object.`);
    }),
  );

const requireFields = (json: Json, keys: ReadonlyArray<string>, what: string, path: string) => {
  const missing = keys.filter((key) => str(json, key) === undefined);
  return missing.length === 0
    ? Effect.void
    : fail(`The ${what} in ${path} is missing ${missing.join(", ")}.`);
};

const authorizedUser = (json: Json, path: string, scopes?: ReadonlyArray<string>): TokenSource =>
  requireFields(
    json,
    ["client_id", "client_secret", "refresh_token"],
    "user credentials",
    path,
  ).pipe(
    Effect.andThen(
      authorizedUserSource({
        clientId: str(json, "client_id")!,
        clientSecret: Redacted.make(str(json, "client_secret")!),
        refreshToken: Redacted.make(str(json, "refresh_token")!),
        tokenUrl: str(json, "token_uri"),
        scopes,
      }),
    ),
  );

const serviceAccountKey = (json: Json, path: string, scopes?: ReadonlyArray<string>): TokenSource =>
  requireFields(json, ["client_email", "private_key"], "service account key", path).pipe(
    Effect.andThen(
      serviceAccountKeySource({
        clientEmail: str(json, "client_email")!,
        privateKey: Redacted.make(str(json, "private_key")!),
        privateKeyId: str(json, "private_key_id"),
        tokenUrl: str(json, "token_uri"),
        scopes,
      }),
    ),
  );

/** `…/serviceAccounts/<email>:generateAccessToken` → `<email>`. */
const impersonatedEmail = (url: string): string | undefined => {
  const match = /\/serviceAccounts\/([^/:]+):generateAccessToken$/.exec(url);
  return match ? decodeURIComponent(match[1]) : undefined;
};

/** The subject token an `external_account` file's `credential_source` points at. */
const subjectToken = (
  source: Json,
  path: string,
): Effect.Effect<Redacted.Redacted<string>, GCPCredentialsError, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const format = (source.format ?? {}) as Json;
    const field = str(format, "subject_token_field_name");
    let text: string;
    if (str(source, "file")) {
      const file = str(source, "file")!;
      text = yield* Effect.tryPromise({
        try: () => readFile(file, "utf8"),
        catch: () =>
          new GCPCredentialsError({ message: `Could not read the subject token file ${file}.` }),
      });
    } else if (str(source, "url")) {
      const headers = (source.headers ?? {}) as Record<string, string>;
      text = (yield* requestText(
        "Fetching the workload identity subject token",
        HttpClientRequest.get(str(source, "url")!).pipe(HttpClientRequest.setHeaders(headers)),
      )).text;
    } else {
      return yield* fail(
        `The external account in ${path} uses a credential_source this SDK does not read (only "file" and "url"). Use fromWorkloadIdentity and pass the subject token yourself.`,
      );
    }
    if (str(format, "type") !== "json") return Redacted.make(text.trim());
    let token: unknown;
    try {
      token = field ? (JSON.parse(text) as Json)[field] : undefined;
    } catch {}
    return typeof token === "string"
      ? Redacted.make(token)
      : yield* fail(`The subject token for ${path} has no string field ${field ?? "(unnamed)"}.`);
  });

const externalAccount = (json: Json, path: string, scopes?: ReadonlyArray<string>): TokenSource =>
  Effect.gen(function* () {
    yield* requireFields(json, ["audience", "subject_token_type"], "external account", path);
    const source = (json.credential_source ?? {}) as Json;
    if (str(source, "environment_id") !== undefined || source.executable !== undefined) {
      return yield* fail(
        `The external account in ${path} uses an AWS or executable credential_source, which this SDK does not support. Use fromWorkloadIdentity and pass the subject token yourself.`,
      );
    }
    const impersonationUrl = str(json, "service_account_impersonation_url");
    const serviceAccountEmail = impersonationUrl && impersonatedEmail(impersonationUrl);
    if (impersonationUrl && !serviceAccountEmail) {
      return yield* fail(`Could not read a service account from ${impersonationUrl}.`);
    }
    const impersonation = (json.service_account_impersonation ?? {}) as Json;
    // A subject token Effect has no requirements, so a URL-sourced one gets
    // the client this exchange runs with.
    const client = yield* HttpClient.HttpClient;
    return yield* workloadIdentitySource({
      audience: str(json, "audience")!,
      subjectTokenType: str(json, "subject_token_type"),
      tokenUrl: str(json, "token_url"),
      serviceAccountEmail: serviceAccountEmail || undefined,
      tokenLifetimeSeconds:
        typeof impersonation.token_lifetime_seconds === "number"
          ? impersonation.token_lifetime_seconds
          : undefined,
      scopes,
      subjectToken: subjectToken(source, path).pipe(
        Effect.provideService(HttpClient.HttpClient, client),
      ),
    });
  });

const impersonatedServiceAccount = (
  json: Json,
  path: string,
  scopes?: ReadonlyArray<string>,
): TokenSource =>
  Effect.gen(function* () {
    const url = str(json, "service_account_impersonation_url");
    const email = url && impersonatedEmail(url);
    if (!email) {
      return yield* fail(
        `The impersonated service account in ${path} has no valid service_account_impersonation_url.`,
      );
    }
    const sourceJson = (json.source_credentials ?? {}) as Json;
    // The source token needs cloud-platform to call IAM Credentials; user
    // credentials already carry it from gcloud.
    const sourceToken =
      sourceJson.type === "authorized_user"
        ? yield* authorizedUser(sourceJson, path)
        : sourceJson.type === "service_account"
          ? yield* serviceAccountKey(sourceJson, path, [CLOUD_PLATFORM_SCOPE])
          : yield* fail(
              `The impersonated service account in ${path} has source_credentials of type ${String(sourceJson.type)}; only authorized_user and service_account are supported.`,
            );
    const delegates = Array.isArray(json.delegates)
      ? json.delegates.filter((d): d is string => typeof d === "string")
      : undefined;
    return yield* impersonateServiceAccount(email, sourceToken, {
      scopes: scopes ?? [CLOUD_PLATFORM_SCOPE],
      delegates,
    });
  });

/** The token source a credentials file describes, plus the project it names. */
const fileSource = (json: Json, path: string, scopes?: ReadonlyArray<string>): TokenSource =>
  Effect.gen(function* () {
    let token: Token;
    switch (json.type) {
      case "authorized_user":
        token = yield* authorizedUser(json, path, scopes);
        break;
      case "service_account":
        token = yield* serviceAccountKey(json, path, scopes);
        break;
      case "external_account":
        token = yield* externalAccount(json, path, scopes);
        break;
      case "impersonated_service_account":
        token = yield* impersonatedServiceAccount(json, path, scopes);
        break;
      default:
        return yield* fail(
          `The credentials file ${path} has type ${JSON.stringify(json.type)}; expected authorized_user, service_account, external_account or impersonated_service_account.`,
        );
    }
    const quotaProject = str(json, "quota_project_id");
    // gcloud stores its active project as quota_project_id, so for user
    // credentials it is the best guess at the project too.
    return { ...token, project: str(json, "project_id") ?? quotaProject, quotaProject };
  });

/** The token source behind {@link fromApplicationDefault}. */
export const applicationDefaultSource = (config: ApplicationDefaultConfig = {}): TokenSource => {
  let onGcp = false;
  return Effect.gen(function* () {
    let token: Token | undefined;
    const explicit = env("GOOGLE_APPLICATION_CREDENTIALS");
    if (explicit !== undefined) {
      const json = yield* readCredentialsFile(explicit);
      if (json === undefined) {
        return yield* fail(
          `GOOGLE_APPLICATION_CREDENTIALS is set to ${explicit}, which does not exist.`,
        );
      }
      token = yield* fileSource(json, explicit, config.scopes);
    } else {
      const path = wellKnownCredentialsPath();
      const json = path === undefined ? undefined : yield* readCredentialsFile(path);
      if (json !== undefined) {
        token = yield* fileSource(json, path!, config.scopes);
      } else {
        onGcp ||= yield* isOnGcp();
        if (!onGcp) {
          return yield* fail(
            "Could not find Application Default Credentials. Run `gcloud auth application-default login`, set GOOGLE_APPLICATION_CREDENTIALS to a credentials file, or run on Google Cloud.",
          );
        }
        token = yield* metadataServerSource({ scopes: config.scopes, project: config.project });
      }
    }
    return {
      ...token,
      project:
        env("GOOGLE_CLOUD_PROJECT") ??
        env("GCLOUD_PROJECT") ??
        env("GOOGLE_PROJECT_ID") ??
        token.project,
      quotaProject: env("GOOGLE_CLOUD_QUOTA_PROJECT") ?? token.quotaProject,
    };
  });
};

/**
 * Application Default Credentials: locally, the login from
 * `gcloud auth application-default login`; on Google Cloud, the attached
 * service account. Tokens are cached and refreshed five minutes before
 * they expire. `project` and `quotaProject` set here win over
 * `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_QUOTA_PROJECT` and the file.
 */
export const fromApplicationDefault = (
  config: ApplicationDefaultConfig = {},
): Layer.Layer<Credentials> => createRefreshingProvider(applicationDefaultSource(config), config);
