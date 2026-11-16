import { ConfigError } from "@distilled.cloud/core/errors";
import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorInfo,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
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
import * as Redacted from "effect/Redacted";
import {
  apiBaseUrlFor,
  Credentials,
  DEFAULT_DOMAIN,
  ENVD_PORT,
  envdBaseUrlFor,
  SandboxConnection,
  VolumeConnection,
  type CredentialsError,
  type SandboxConnectionConfig,
  type VolumeConnectionConfig,
} from "./credentials.ts";
import { E2BParseError, UnknownE2BError, type E2BServiceError } from "./errors.ts";

/**
 * The errors declared on E2B's protocols: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link E2BParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownE2BError}), an envd or volume-content
 * call with no sandbox or volume in scope (`ConfigError`), and core's REST
 * errors (a bad path label, a request that can't be built, the transport).
 */
export type E2BProtocolError = RestProtocolError | E2BParseError | UnknownE2BError | ConfigError;

/**
 * What every generated E2B operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, E2BOpError, E2BOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type E2BOpError = E2BServiceError | E2BProtocolError | CredentialsError;

/** Context (requirements) of a control-plane operation. */
export type E2BOpContext = Credentials | HttpClient.HttpClient;

/** Context (requirements) of an envd operation: the sandbox, not the team key. */
export type EnvdOpContext = SandboxConnection | HttpClient.HttpClient;

/** Context (requirements) of a volume-content operation: the volume token, not the team key. */
export type VolumeContentOpContext = VolumeConnection | HttpClient.HttpClient;

const unknownError = (info: RestErrorInfo) => new UnknownE2BError(unknownErrorProps(info));

const parseError = ({ body, cause }: { body: unknown; cause: unknown }) =>
  new E2BParseError({ body, cause });

// The annotations are the check: everything a protocol fails with, besides
// the errors an operation and the service declare, must be listed there.
export const E2BProtocol: Protocol<E2BProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request, so a key rotated between calls
    // is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
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

// The sandbox is read as an option, so the protocol's type requires nothing.
const resolveSandbox: Effect.Effect<SandboxConnectionConfig, ConfigError> =
  /*@__PURE__*/ Effect.flatMap(Effect.serviceOption(SandboxConnection), (option) =>
    option._tag === "Some" ? Effect.succeed(option.value) : missingSandbox,
  );

export const EnvdProtocol: Protocol<E2BProtocolError> = /*@__PURE__*/ restProtocol({
  credentials: resolveSandbox,
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

// The volume is read as an option, so the protocol's type requires nothing.
const resolveVolume: Effect.Effect<VolumeConnectionConfig, ConfigError> =
  /*@__PURE__*/ Effect.flatMap(Effect.serviceOption(VolumeConnection), (option) =>
    option._tag === "Some" ? Effect.succeed(option.value) : missingVolume,
  );

export const VolumeContentProtocol: Protocol<E2BProtocolError> = /*@__PURE__*/ restProtocol({
  credentials: resolveVolume,
  baseUrl: (volume) => apiBaseUrlFor(volume.domain ?? DEFAULT_DOMAIN),
  headers: (volume) => ({ Authorization: `Bearer ${Redacted.value(volume.token)}` }),
  unknownError,
  parseError,
});
