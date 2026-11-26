import type { ErrorOf, Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorInfo,
  unknownErrorProps,
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
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import type * as Fiber from "effect/Fiber";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import * as Stream from "effect/Stream";
import {
  apiBaseUrlFor,
  Credentials,
  DEFAULT_DOMAIN,
  ENVD_PORT,
  envdBaseUrlFor,
  resolveSandboxConnection,
  resolveVolumeConnection,
  type SandboxConnection,
  type VolumeConnection,
  type VolumeConnectionConfig,
} from "./credentials.ts";
import { E2BParseError, UnknownE2BError, type E2BServiceError } from "./errors.ts";
import { basicAuthorization, RunAsUser, withRunAsUser } from "./run-as-user.ts";

/**
 * What every generated E2B operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, E2BOpError, E2BOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type E2BOpError =
  | E2BServiceError
  | ErrorOf<typeof E2BProtocol | typeof EnvdProtocol | typeof VolumeContentProtocol>;

/** Context (requirements) of a control-plane operation. */
export type E2BOpContext = Credentials | HttpClient.HttpClient;

/** Context (requirements) of an envd operation: the sandbox, not the team key. */
export type EnvdOpContext = SandboxConnection | HttpClient.HttpClient;

/** Context (requirements) of a volume-content operation: the volume token, not the team key. */
export type VolumeContentOpContext = VolumeConnection | HttpClient.HttpClient;

const unknownError = (info: RestErrorInfo) => new UnknownE2BError(unknownErrorProps(info));

const parseError = ({ body, cause }: { body: unknown; cause: unknown }) =>
  new E2BParseError({ body, cause });

export const E2BProtocol = /*@__PURE__*/ restProtocol({
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

/**
 * `base` with the {@link RunAsUser} layer's user filled in as the
 * `username` of every call that takes one and sets none (see
 * {@link withRunAsUser}). The layer is read from the calling fiber.
 */
const withLayerUser = <E, R>(base: Protocol<E, R>): Protocol<E, R> => {
  const fill = <A>(
    fiber: Fiber.Fiber<unknown, unknown>,
    inputAst: AST.AST,
    input: unknown,
    f: (input: unknown) => A,
  ) => f(withRunAsUser(inputAst, input, Context.getOrUndefined(fiber.context, RunAsUser)));
  const { call, stream } = base;
  return {
    ...base,
    encode: (args) =>
      Effect.withFiber((fiber) =>
        fill(fiber, args.inputAst, args.input, (input) => base.encode({ ...args, input })),
      ),
    ...(call && {
      call: (op, input) =>
        Effect.withFiber((fiber) => fill(fiber, op.inputAst, input, (filled) => call(op, filled))),
    }),
    ...(stream && {
      stream: (op, input) =>
        Stream.unwrap(
          Effect.withFiber((fiber) =>
            Effect.succeed(fill(fiber, op.inputAst, input, (filled) => stream(op, filled))),
          ),
        ),
    }),
  };
};

const envdRest = /*@__PURE__*/ restProtocol({
  // The sandbox is read as an option, so the protocol's type requires nothing.
  credentials: resolveSandboxConnection,
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
  // A `username` member (patched onto the filesystem calls) is the run-as
  // user, sent as E2B's SDK sends it: `Authorization: Basic base64(user:)`.
  mapMemberHeader: (name, value) => (name === "authorization" ? basicAuthorization(value) : value),
  unknownError,
  parseError,
});

export const EnvdProtocol = /*@__PURE__*/ withLayerUser(envdRest);

export const VolumeContentProtocol = /*@__PURE__*/ restProtocol({
  // The volume is read as an option, so the protocol's type requires nothing.
  credentials: resolveVolumeConnection,
  baseUrl: (volume) => apiBaseUrlFor(volume.domain ?? DEFAULT_DOMAIN),
  headers: (volume) => ({ Authorization: `Bearer ${Redacted.value(volume.token)}` }),
  unknownError,
  parseError,
});
