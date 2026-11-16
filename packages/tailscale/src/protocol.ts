import type { DecodeArgs, Protocol } from "@distilled.cloud/core/protocol";
import {
  getAnn,
  getProps,
  hasPropAnn,
  resolveNode,
  responseHeaderMembers,
  withResponseHeaders,
} from "@distilled.cloud/core/protocol-http";
import {
  restProtocol,
  rawResponseRootSymbol,
  rawResponseSymbol,
  validateSuccess,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  TailscaleParseError,
  UnknownTailscaleError,
  type TailscaleServiceError,
} from "./errors.ts";

/**
 * The errors declared on Tailscale's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match
 * its schema ({@link TailscaleParseError}), a failed response that neither
 * the operation nor the service declares ({@link UnknownTailscaleError}),
 * and core's REST errors (a bad path label, a request that can't be built,
 * the transport).
 */
export type TailscaleProtocolError =
  | RestProtocolError
  | TailscaleParseError
  | UnknownTailscaleError;

/**
 * What every generated Tailscale operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with.
 */
export type TailscaleOpError = TailscaleServiceError | TailscaleProtocolError | CredentialsError;

export type TailscaleOpContext = Credentials | HttpClient.HttpClient;

const isStringAst = (ast: AST.AST): boolean => resolveNode(ast)._tag === "String";

const isRawRoot = (outputAst: AST.AST): boolean =>
  getAnn(outputAst, rawResponseRootSymbol) !== undefined;

/** The output member that receives the whole body as text (a policy file's HuJSON). */
const rawStringMember = (outputAst: AST.AST): AST.PropertySignature | undefined =>
  getProps(outputAst).find((prop) => hasPropAnn(prop, rawResponseSymbol) && isStringAst(prop.type));

/**
 * A policy file is HuJSON text. It stays text even when it happens to be
 * valid JSON, so the core REST decode, which parses JSON bodies, can't read it.
 */
const decodeRawString = (
  response: HttpClientResponse.HttpClientResponse,
  outputAst: AST.AST,
  member: AST.PropertySignature | undefined,
): Effect.Effect<unknown, TailscaleParseError | HttpClientError.HttpClientError> =>
  Effect.flatMap(response.text, (text) =>
    validateSuccess(
      outputAst,
      {
        value:
          member === undefined
            ? text
            : withResponseHeaders(
                responseHeaderMembers(outputAst),
                { [member.name]: text },
                response.headers as Record<string, string | undefined>,
              ),
        body: text,
        nonJson: false,
      },
      (info) => new TailscaleParseError(info),
    ),
  );

const TailscaleProtocolRest = /*@__PURE__*/ restProtocol({
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  unknownError: (info) => new UnknownTailscaleError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new TailscaleParseError({ body, cause }),
});

/**
 * Core's REST protocol, plus two things the Tailscale API does differently on
 * a 2xx: policy files are HuJSON text, and an empty list can arrive as the
 * JSON `null` (a Go nil slice), which decodes as `[]`.
 */
// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const TailscaleProtocol: Protocol<TailscaleProtocolError | CredentialsError, Credentials> = {
  encode: TailscaleProtocolRest.encode,
  decode: (args: DecodeArgs) => {
    if (args.response.status < 200 || args.response.status >= 300) {
      return TailscaleProtocolRest.decode(args);
    }
    const { outputAst } = args;
    if (isRawRoot(outputAst) && isStringAst(outputAst)) {
      return decodeRawString(args.response, outputAst, undefined);
    }
    const member = rawStringMember(outputAst);
    if (member !== undefined) return decodeRawString(args.response, outputAst, member);
    if (isRawRoot(outputAst) && resolveNode(outputAst)._tag === "Arrays") {
      return Effect.flatMap(args.response.text, (text) =>
        text.trim() === "null" ? Effect.succeed([]) : TailscaleProtocolRest.decode(args),
      );
    }
    return TailscaleProtocolRest.decode(args);
  },
};
