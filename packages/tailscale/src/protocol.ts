import * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import {
  getAnn,
  getProps,
  hasPropAnn,
  nameOf,
  resolveNode,
} from "@distilled.cloud/core/protocol-http";
import {
  hasSensitiveMember,
  makeRestProtocol,
  rawResponseRootSymbol,
  rawResponseSymbol,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import { validateResponse, withholdActual } from "@distilled.cloud/core/response-validation";
import { headerSymbol } from "@distilled.cloud/core/trait";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import { Credentials, type Config } from "./credentials.ts";
import { API_ERRORS } from "./errors.ts";
import { TailscaleParseError, UnknownTailscaleError } from "./errors.ts";

export type TailscaleOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownTailscaleError
  | ConfigError
  | HttpClientError.HttpClientError
  | TailscaleParseError;

export type TailscaleOpContext = Credentials | HttpClient.HttpClient;

const isStringAst = (ast: AST.AST): boolean => resolveNode(ast)._tag === "String";

const hasRawStringBody = (outputAst: AST.AST): boolean => {
  if (getAnn(outputAst, rawResponseRootSymbol) !== undefined && isStringAst(outputAst)) {
    return true;
  }
  return getProps(outputAst).some(
    (prop) => hasPropAnn(prop, rawResponseSymbol) && isStringAst(prop.type),
  );
};

const isRawArrayRoot = (outputAst: AST.AST): boolean =>
  getAnn(outputAst, rawResponseRootSymbol) !== undefined &&
  resolveNode(outputAst)._tag === "Arrays";

const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

/** Reads a 2xx body as text; a body read that fails mid-stream is a retryable `TransportError`. */
const readText = (response: HttpClientResponse.HttpClientResponse): Effect.Effect<string> =>
  Effect.matchEffect(response.text, {
    onFailure: (error) =>
      fail(
        new HttpClientError.HttpClientError({
          reason: new HttpClientError.TransportError({
            request: response.request,
            cause: error.reason.cause ?? error,
            description: "connection dropped while reading the response body",
          }),
        }),
      ),
    onSuccess: (text) => Effect.succeed(text ?? ""),
  });

const decodeRawString = (args: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    const text = yield* readText(args.response);
    const withhold = hasSensitiveMember(args.outputAst);
    const validate = (value: unknown) =>
      validateResponse(
        args.outputAst,
        value,
        (cause) =>
          new TailscaleParseError({
            body: withhold ? "[REDACTED]" : text,
            cause: withhold ? withholdActual(cause) : cause,
          }),
      ).pipe(
        Effect.catch(fail),
        Effect.map((valid) => wrapSensitive(args.outputAst, valid)),
      );
    if (
      getAnn(args.outputAst, rawResponseRootSymbol) !== undefined &&
      isStringAst(args.outputAst)
    ) {
      return yield* validate(text);
    }
    const out: Record<string, string> = {};
    for (const prop of getProps(args.outputAst)) {
      if (hasPropAnn(prop, headerSymbol)) {
        const value = args.response.headers[nameOf(prop, headerSymbol).toLowerCase()];
        if (value !== undefined) out[String(prop.name)] = value;
      } else if (hasPropAnn(prop, rawResponseSymbol)) {
        out[String(prop.name)] = text;
      }
    }
    return yield* validate(out);
  });

const TailscaleProtocolRest: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  credentials: Effect.gen(function* () {
    const resolve = yield* Credentials;
    return yield* resolve;
  }),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  unknownError: ({ code, message, body }) =>
    new UnknownTailscaleError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new TailscaleParseError({ body, cause }),
});

export const TailscaleProtocol: Layer.Layer<API.Protocol> = Layer.effect(
  API.Protocol,
  Effect.gen(function* () {
    const rest = yield* API.Protocol;
    return API.Protocol.of({
      encode: rest.encode,
      decode: (args) =>
        args.response.status >= 400
          ? rest.decode(args)
          : hasRawStringBody(args.outputAst)
            ? decodeRawString(args)
            : isRawArrayRoot(args.outputAst)
              ? Effect.flatMap(readText(args.response), (text) =>
                  text.trim() === "null" ? Effect.succeed([]) : rest.decode(args),
                )
              : rest.decode(args),
    });
  }),
).pipe(Layer.provide(TailscaleProtocolRest));
