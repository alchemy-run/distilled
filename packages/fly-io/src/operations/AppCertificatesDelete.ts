import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    hostname: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apps/{app_name}/certificates/{hostname}",
    }),
  );
export type AppCertificatesDeleteInput = typeof AppCertificatesDeleteInput.Type;

// Output Schema
export const AppCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppCertificatesDeleteOutput =
  typeof AppCertificatesDeleteOutput.Type;

// The operation
/**
 * Remove certificate
 *
 * @param app_name - Fly App Name
 * @param hostname - Certificate Hostname
 */
export const AppCertificatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppCertificatesDeleteInput,
    outputSchema: AppCertificatesDeleteOutput,
  }),
);
