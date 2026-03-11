import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const App_CertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/apps/{app_name}/certificates/{hostname}",
    }),
  );
export type App_CertificatesDeleteInput =
  typeof App_CertificatesDeleteInput.Type;

// Output Schema
export const App_CertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type App_CertificatesDeleteOutput =
  typeof App_CertificatesDeleteOutput.Type;

// The operation
/**
 * Remove certificate
 */
export const App_CertificatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: App_CertificatesDeleteInput,
    outputSchema: App_CertificatesDeleteOutput,
  }),
);
