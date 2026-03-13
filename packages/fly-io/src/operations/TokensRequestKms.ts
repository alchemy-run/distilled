import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TokensRequestKmsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "POST", path: "/tokens/kms" }));
export type TokensRequestKmsInput = typeof TokensRequestKmsInput.Type;

// Output Schema
export const TokensRequestKmsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type TokensRequestKmsOutput = typeof TokensRequestKmsOutput.Type;

// The operation
/**
 * Request a Petsem token for accessing KMS
 *
 * This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.
 */
export const TokensRequestKms = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TokensRequestKmsInput,
  outputSchema: TokensRequestKmsOutput,
}));
