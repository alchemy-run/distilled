import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV2CoreAccountsAccountIdPersonsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account_id: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v2/core/accounts/{account_id}/persons/{id}",
    }),
  );
export type DeleteV2CoreAccountsAccountIdPersonsIdInput =
  typeof DeleteV2CoreAccountsAccountIdPersonsIdInput.Type;

// Output Schema
export const DeleteV2CoreAccountsAccountIdPersonsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    object: Schema.optional(Schema.String),
  });
export type DeleteV2CoreAccountsAccountIdPersonsIdOutput =
  typeof DeleteV2CoreAccountsAccountIdPersonsIdOutput.Type;

// The operation
/**
 * Delete a Person
 *
 * Delete a Person associated with an Account.
 *
 * @param account_id - The Account the Person is associated with.
 * @param id - The ID of the Person to delete.
 */
export const DeleteV2CoreAccountsAccountIdPersonsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteV2CoreAccountsAccountIdPersonsIdInput,
    outputSchema: DeleteV2CoreAccountsAccountIdPersonsIdOutput,
  }));
