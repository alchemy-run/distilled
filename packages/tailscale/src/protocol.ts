import * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import {
  getAnn,
  getProps,
  hasPropAnn,
  resolveNode,
  responseHeaderMembers,
  withResponseHeaders,
} from "@distilled.cloud/core/protocol-http";
import {
  makeRestProtocol,
  rawResponseRootSymbol,
  rawResponseSymbol,
  validateSuccess,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials } from "./credentials.ts";
import { API_ERRORS } from "./errors.ts";
import { TailscaleParseError, UnknownTailscaleError } from "./errors.ts";

export type TailscaleOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownTailscaleError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError
  | TailscaleParseError;

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
): Effect.Effect<unknown, HttpClientError.HttpClientError | TailscaleParseError> =>
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

const resolveCredentials = /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve);

const TailscaleProtocolRest: API.ProtocolLayer<TailscaleOpError, TailscaleOpContext> =
  /*@__PURE__*/ makeRestProtocol({
    credentials: resolveCredentials,
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
export const TailscaleProtocol: API.ProtocolLayer<TailscaleOpError, TailscaleOpContext> =
  /*@__PURE__*/ API.extendProtocol(TailscaleProtocolRest, (rest) => ({
    encode: rest.encode,
    decode: (args: API.ProtocolDecodeArgs) => {
      if (args.response.status < 200 || args.response.status >= 300) return rest.decode(args);
      const { outputAst } = args;
      if (isRawRoot(outputAst) && isStringAst(outputAst)) {
        return decodeRawString(args.response, outputAst, undefined);
      }
      const member = rawStringMember(outputAst);
      if (member !== undefined) return decodeRawString(args.response, outputAst, member);
      if (isRawRoot(outputAst) && resolveNode(outputAst)._tag === "Arrays") {
        return Effect.flatMap(args.response.text, (text) =>
          text.trim() === "null" ? Effect.succeed([]) : rest.decode(args),
        );
      }
      return rest.decode(args);
    },
  }));
