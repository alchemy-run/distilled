import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteAccountsAccountPersonsPersonInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    person: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/accounts/{account}/persons/{person}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteAccountsAccountPersonsPersonInput =
  typeof DeleteAccountsAccountPersonsPersonInput.Type;

// Output Schema
export const DeleteAccountsAccountPersonsPersonOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["person"]),
  });
export type DeleteAccountsAccountPersonsPersonOutput =
  typeof DeleteAccountsAccountPersonsPersonOutput.Type;

// The operation
/**
 * Delete a person
 *
 * <p>Deletes an existing person’s relationship to the account’s legal entity. Any person with a relationship for an account can be deleted through the API, except if the person is the <code>account_opener</code>. If your integration is using the <code>executive</code> parameter, you cannot delete the only verified <code>executive</code> on file.</p>
 */
export const DeleteAccountsAccountPersonsPerson =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAccountsAccountPersonsPersonInput,
    outputSchema: DeleteAccountsAccountPersonsPersonOutput,
  }));
