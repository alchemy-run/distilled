import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TokensRequest_KmsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "POST", path: "/tokens/kms" }));
export type TokensRequest_KmsInput = typeof TokensRequest_KmsInput.Type;

// Output Schema
export const TokensRequest_KmsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type TokensRequest_KmsOutput = typeof TokensRequest_KmsOutput.Type;

// The operation
/**
 * Request a Petsem token for accessing KMS
 *
 * This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.
 */
export const TokensRequest_Kms = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TokensRequest_KmsInput,
  outputSchema: TokensRequest_KmsOutput,
}));
