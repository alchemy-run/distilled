import type * as API from "@distilled.cloud/core/api";
import { ConfigError, type InvalidInput } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorInfo,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * E2B protocols -- the shared REST protocol instantiated once per E2B host.
 *
 * E2B speaks plain JSON with no success envelope; failures carry
 * `{ code, message }` (Connect errors use a string `code` such as
 * `not_found`), which core's default envelope reads. Each generated module is
 * compiled against the protocol for the host it talks to (see
 * `scripts/generate.ts`):
 *
 *   * {@link E2BProtocol} -- the control plane, with the team API key and,
 *     when configured, the access token and team id.
 *   * {@link EnvdProtocol} -- envd inside one sandbox, addressed and
 *     authenticated by the {@link SandboxConnection} on the calling fiber.
 *     The Connect services (`process`, `filesystem`) are unary Connect-JSON
 *     POSTs, which this protocol sends as plain JSON.
 *   * {@link VolumeContentProtocol} -- one volume's files, authenticated by
 *     the {@link VolumeConnection} on the calling fiber.
 *
 * Neither data-plane protocol sends the team API key.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import {
  apiBaseUrlFor,
  Credentials,
  DEFAULT_DOMAIN,
  ENVD_PORT,
  envdBaseUrlFor,
  SandboxConnection,
  type Config,
  type SandboxConnectionConfig,
  VolumeConnection,
  type VolumeConnectionConfig,
} from "./credentials.ts";
import { E2BParseError, UnknownE2BError, type DefaultErrors } from "./errors.ts";

/** Error channel shared by every generated E2B operation. */
export type E2BOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) of a control-plane operation. */
export type E2BOpContext = Credentials | HttpClient.HttpClient;

/** Context (requirements) of an envd operation: the sandbox, not the team key. */
export type EnvdOpContext = SandboxConnection | HttpClient.HttpClient;

/** Context (requirements) of a volume-content operation: the volume token, not the team key. */
export type VolumeContentOpContext = VolumeConnection | HttpClient.HttpClient;

const unknownError = (info: RestErrorInfo) => new UnknownE2BError(unknownErrorProps(info));

const parseError = ({ body, cause }: { body: unknown; cause: unknown }) =>
  new E2BParseError({ body, cause });

export const E2BProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<Config>({
  // Resolved on the CALLING fiber per request, so a key rotated between
  // calls is picked up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => {
    const headers: Record<string, string> = {};
    if (creds.apiKey !== undefined) headers["X-API-Key"] = Redacted.value(creds.apiKey);
    if (creds.accessToken !== undefined) {
      headers.Authorization = `Bearer ${Redacted.value(creds.accessToken)}`;
    }
    if (creds.teamId !== undefined && creds.teamId !== "") headers["X-Team-ID"] = creds.teamId;
    return headers;
  },
  unknownError,
  parseError,
});

const missingSandbox = /*@__PURE__*/ Effect.fail(
  new ConfigError({
    message:
      "E2B envd operations address one sandbox -- provide E2B.sandboxConnection({ sandboxId, accessToken })",
  }),
);

export const EnvdProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<SandboxConnectionConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(Effect.serviceOption(SandboxConnection), (option) =>
      option._tag === "Some" ? Effect.succeed(option.value) : missingSandbox,
    ),
    baseUrl: (sandbox) => envdBaseUrlFor(sandbox),
    headers: (sandbox) => {
      const headers: Record<string, string> = {
        // The shared sandbox host routes by these two headers.
        "E2b-Sandbox-Id": sandbox.sandboxId,
        "E2b-Sandbox-Port": String(sandbox.port ?? ENVD_PORT),
        // Unary Connect calls over JSON.
        "Connect-Protocol-Version": "1",
      };
      if (sandbox.accessToken !== undefined) {
        headers["X-Access-Token"] = Redacted.value(sandbox.accessToken);
      }
      return headers;
    },
    // Connect unary calls POST a JSON body even when the message is empty
    // (`process.List`); envd answers a bodyless one with 415.
    emptyJsonBody: true,
    unknownError,
    parseError,
  });

const missingVolume = /*@__PURE__*/ Effect.fail(
  new ConfigError({
    message:
      "E2B volume content operations authenticate with the volume's token -- provide E2B.volumeConnection({ token })",
  }),
);

export const VolumeContentProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<VolumeConnectionConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(Effect.serviceOption(VolumeConnection), (option) =>
      option._tag === "Some" ? Effect.succeed(option.value) : missingVolume,
    ),
    baseUrl: (volume) => apiBaseUrlFor(volume.domain ?? DEFAULT_DOMAIN),
    headers: (volume) => ({ Authorization: `Bearer ${Redacted.value(volume.token)}` }),
    unknownError,
    parseError,
  });
