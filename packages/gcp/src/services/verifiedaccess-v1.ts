// ==========================================================================
// Chrome Verified Access API (verifiedaccess v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "verifiedaccess",
  version: "v1",
  rootUrl: "https://verifiedaccess.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SignedData {
  /** The signature of the data field. */
  signature?: string;
  /** The data to be signed. */
  data?: string;
}

export const SignedData: Schema.Schema<SignedData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signature: Schema.optional(Schema.String),
      data: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SignedData" }) as any as Schema.Schema<SignedData>;

export interface VerifyChallengeResponseResult {
  /** Device enrollment id is returned in this field (for the machine response only). */
  deviceEnrollmentId?: string;
  /** Device permanent id is returned in this field (for the machine response only). */
  devicePermanentId?: string;
  /** Certificate Signing Request (in the SPKAC format, base64 encoded) is returned in this field. This field will be set only if device has included CSR in its challenge response. (the option to include CSR is now available for both user and machine responses) */
  signedPublicKeyAndChallenge?: string;
  /** For EMCert check, device permanent id is returned here. For EUCert check, signed_public_key_and_challenge [base64 encoded] is returned if present, otherwise empty string is returned. This field is deprecated, please use device_permanent_id or signed_public_key_and_challenge fields. */
  verificationOutput?: string;
  /** Attested device id (ADID) of the device, read from the verified data. */
  attestedDeviceId?: string;
}

export const VerifyChallengeResponseResult: Schema.Schema<VerifyChallengeResponseResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deviceEnrollmentId: Schema.optional(Schema.String),
      devicePermanentId: Schema.optional(Schema.String),
      signedPublicKeyAndChallenge: Schema.optional(Schema.String),
      verificationOutput: Schema.optional(Schema.String),
      attestedDeviceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerifyChallengeResponseResult",
  }) as any as Schema.Schema<VerifyChallengeResponseResult>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface Challenge {
  /** Challenge generated with the old signing key (this will only be present during key rotation) */
  alternativeChallenge?: SignedData;
  /** Generated challenge */
  challenge?: SignedData;
}

export const Challenge: Schema.Schema<Challenge> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      alternativeChallenge: Schema.optional(SignedData),
      challenge: Schema.optional(SignedData),
    }),
  ).annotate({ identifier: "Challenge" }) as any as Schema.Schema<Challenge>;

export interface VerifyChallengeResponseRequest {
  /** The generated response to the challenge */
  challengeResponse?: SignedData;
  /** Service can optionally provide identity information about the device or user associated with the key. For an EMK, this value is the enrolled domain. For an EUK, this value is the user's email address. If present, this value will be checked against contents of the response, and verification will fail if there is no match. */
  expectedIdentity?: string;
}

export const VerifyChallengeResponseRequest: Schema.Schema<VerifyChallengeResponseRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      challengeResponse: Schema.optional(SignedData),
      expectedIdentity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerifyChallengeResponseRequest",
  }) as any as Schema.Schema<VerifyChallengeResponseRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateChallengeRequest {
  /** Request body */
  body?: Empty;
}

export const CreateChallengeRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    body: Schema.optional(Empty).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({ method: "POST", path: "v1/challenge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateChallengeRequest>;

export type CreateChallengeResponse = Challenge;
export const CreateChallengeResponse = /*@__PURE__*/ /*#__PURE__*/ Challenge;

export type CreateChallengeError = DefaultErrors;

/** CreateChallenge API */
export const createChallenge: API.OperationMethod<
  CreateChallengeRequest,
  CreateChallengeResponse,
  CreateChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateChallengeRequest,
  output: CreateChallengeResponse,
  errors: [],
}));

export interface VerifyChallengeRequest {
  /** Request body */
  body?: VerifyChallengeResponseRequest;
}

export const VerifyChallengeRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    body: Schema.optional(VerifyChallengeResponseRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({ method: "POST", path: "v1/challenge:verify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyChallengeRequest>;

export type VerifyChallengeResponse = VerifyChallengeResponseResult;
export const VerifyChallengeResponse =
  /*@__PURE__*/ /*#__PURE__*/ VerifyChallengeResponseResult;

export type VerifyChallengeError = DefaultErrors;

/** VerifyChallengeResponse API */
export const verifyChallenge: API.OperationMethod<
  VerifyChallengeRequest,
  VerifyChallengeResponse,
  VerifyChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: VerifyChallengeRequest,
  output: VerifyChallengeResponse,
  errors: [],
}));
