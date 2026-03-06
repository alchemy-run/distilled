// ==========================================================================
// Chrome Verified Access API (verifiedaccess v1)
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
  name: "verifiedaccess",
  version: "v1",
  rootUrl: "https://verifiedaccess.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SignedData {
  /** The data to be signed. */
  data?: string;
  /** The signature of the data field. */
  signature?: string;
}

export const SignedData: Schema.Schema<SignedData> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
})).annotate({ identifier: "SignedData" }) as any as Schema.Schema<SignedData>;

export interface Challenge {
  /** Generated challenge */
  challenge?: SignedData;
  /** Challenge generated with the old signing key (this will only be present during key rotation) */
  alternativeChallenge?: SignedData;
}

export const Challenge: Schema.Schema<Challenge> = Schema.suspend(() => Schema.Struct({
  challenge: Schema.optional(SignedData),
  alternativeChallenge: Schema.optional(SignedData),
})).annotate({ identifier: "Challenge" }) as any as Schema.Schema<Challenge>;

export interface VerifyChallengeResponseRequest {
  /** The generated response to the challenge */
  challengeResponse?: SignedData;
  /** Service can optionally provide identity information about the device or user associated with the key. For an EMK, this value is the enrolled domain. For an EUK, this value is the user's email address. If present, this value will be checked against contents of the response, and verification will fail if there is no match. */
  expectedIdentity?: string;
}

export const VerifyChallengeResponseRequest: Schema.Schema<VerifyChallengeResponseRequest> = Schema.suspend(() => Schema.Struct({
  challengeResponse: Schema.optional(SignedData),
  expectedIdentity: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyChallengeResponseRequest" }) as any as Schema.Schema<VerifyChallengeResponseRequest>;

export interface VerifyChallengeResponseResult {
  /** For EMCert check, device permanent id is returned here. For EUCert check, signed_public_key_and_challenge [base64 encoded] is returned if present, otherwise empty string is returned. This field is deprecated, please use device_permanent_id or signed_public_key_and_challenge fields. */
  verificationOutput?: string;
  /** Device permanent id is returned in this field (for the machine response only). */
  devicePermanentId?: string;
  /** Certificate Signing Request (in the SPKAC format, base64 encoded) is returned in this field. This field will be set only if device has included CSR in its challenge response. (the option to include CSR is now available for both user and machine responses) */
  signedPublicKeyAndChallenge?: string;
  /** Device enrollment id is returned in this field (for the machine response only). */
  deviceEnrollmentId?: string;
  /** Attested device id (ADID) of the device, read from the verified data. */
  attestedDeviceId?: string;
}

export const VerifyChallengeResponseResult: Schema.Schema<VerifyChallengeResponseResult> = Schema.suspend(() => Schema.Struct({
  verificationOutput: Schema.optional(Schema.String),
  devicePermanentId: Schema.optional(Schema.String),
  signedPublicKeyAndChallenge: Schema.optional(Schema.String),
  deviceEnrollmentId: Schema.optional(Schema.String),
  attestedDeviceId: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyChallengeResponseResult" }) as any as Schema.Schema<VerifyChallengeResponseResult>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateChallengeRequest {
  /** Request body */
  body?: Empty;
}

export const CreateChallengeRequest = Schema.Struct({
  body: Schema.optional(Empty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/challenge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateChallengeRequest>;

export type CreateChallengeResponse = Challenge;
export const CreateChallengeResponse = Challenge;

export type CreateChallengeError = CommonErrors;

/** CreateChallenge API */
export const createChallenge: API.OperationMethod<CreateChallengeRequest, CreateChallengeResponse, CreateChallengeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateChallengeRequest,
  output: CreateChallengeResponse,
  errors: [],
}));

export interface VerifyChallengeRequest {
  /** Request body */
  body?: VerifyChallengeResponseRequest;
}

export const VerifyChallengeRequest = Schema.Struct({
  body: Schema.optional(VerifyChallengeResponseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/challenge:verify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyChallengeRequest>;

export type VerifyChallengeResponse = VerifyChallengeResponseResult;
export const VerifyChallengeResponse = VerifyChallengeResponseResult;

export type VerifyChallengeError = CommonErrors;

/** VerifyChallengeResponse API */
export const verifyChallenge: API.OperationMethod<VerifyChallengeRequest, VerifyChallengeResponse, VerifyChallengeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyChallengeRequest,
  output: VerifyChallengeResponse,
  errors: [],
}));

