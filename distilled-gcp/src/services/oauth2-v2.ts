// ==========================================================================
// Google OAuth2 API (oauth2 v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "oauth2",
  version: "v2",
  rootUrl: "https://www.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Tokeninfo {
  /** Who is the intended audience for this token. In general the same as issued_to. */
  audience?: string;
  /** The email address of the user. Present only if the email scope is present in the request. */
  email?: string;
  /** The expiry time of the token, as number of seconds left until expiry. */
  expires_in?: number;
  /** To whom was the token issued to. In general the same as audience. */
  issued_to?: string;
  /** The space separated list of scopes granted to this token. */
  scope?: string;
  /** The obfuscated user id. */
  user_id?: string;
  /** Boolean flag which is true if the email address is verified. Present only if the email scope is present in the request. */
  verified_email?: boolean;
}

export const Tokeninfo: Schema.Schema<Tokeninfo> = Schema.suspend(() => Schema.Struct({
  audience: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  expires_in: Schema.optional(Schema.Number),
  issued_to: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  user_id: Schema.optional(Schema.String),
  verified_email: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Tokeninfo" }) as any as Schema.Schema<Tokeninfo>;

export interface Userinfo {
  /** The user's email address. */
  email?: string;
  /** The user's last name. */
  family_name?: string;
  /** The user's gender. */
  gender?: string;
  /** The user's first name. */
  given_name?: string;
  /** The hosted domain e.g. example.com if the user is Google apps user. */
  hd?: string;
  /** The obfuscated ID of the user. */
  id?: string;
  /** URL of the profile page. */
  link?: string;
  /** The user's preferred locale. */
  locale?: string;
  /** The user's full name. */
  name?: string;
  /** URL of the user's picture image. */
  picture?: string;
  /** Boolean flag which is true if the email address is verified. Always verified because we only return the user's primary email address. */
  verified_email?: boolean;
}

export const Userinfo: Schema.Schema<Userinfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  family_name: Schema.optional(Schema.String),
  gender: Schema.optional(Schema.String),
  given_name: Schema.optional(Schema.String),
  hd: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  link: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  picture: Schema.optional(Schema.String),
  verified_email: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Userinfo" }) as any as Schema.Schema<Userinfo>;

// ==========================================================================
// Operations
// ==========================================================================

export interface TokeninfoRequest {
  id_token?: string;
}

export const TokeninfoRequest = Schema.Struct({
  id_token: Schema.optional(Schema.String).pipe(T.HttpQuery("id_token")),
}).pipe(
  T.Http({ method: "POST", path: "oauth2/v2/tokeninfo", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TokeninfoRequest>;

export type TokeninfoResponse = Tokeninfo;
export const TokeninfoResponse = Tokeninfo;

export type TokeninfoError = CommonErrors;

export const tokeninfo: API.OperationMethod<TokeninfoRequest, TokeninfoResponse, TokeninfoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TokeninfoRequest,
  output: TokeninfoResponse,
  errors: [],
}));

export interface GetUserinfoRequest {
}

export const GetUserinfoRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "oauth2/v2/userinfo" }),
  svc,
) as unknown as Schema.Schema<GetUserinfoRequest>;

export type GetUserinfoResponse = Userinfo;
export const GetUserinfoResponse = Userinfo;

export type GetUserinfoError = CommonErrors;

export const getUserinfo: API.OperationMethod<GetUserinfoRequest, GetUserinfoResponse, GetUserinfoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserinfoRequest,
  output: GetUserinfoResponse,
  errors: [],
}));

export interface GetUserinfoV2MeRequest {
}

export const GetUserinfoV2MeRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "userinfo/v2/me" }),
  svc,
) as unknown as Schema.Schema<GetUserinfoV2MeRequest>;

export type GetUserinfoV2MeResponse = Userinfo;
export const GetUserinfoV2MeResponse = Userinfo;

export type GetUserinfoV2MeError = CommonErrors;

export const getUserinfoV2Me: API.OperationMethod<GetUserinfoV2MeRequest, GetUserinfoV2MeResponse, GetUserinfoV2MeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserinfoV2MeRequest,
  output: GetUserinfoV2MeResponse,
  errors: [],
}));

