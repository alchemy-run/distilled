import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteTerminalReadersReaderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/terminal/readers/{reader}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteTerminalReadersReaderInput =
  typeof DeleteTerminalReadersReaderInput.Type;

// Output Schema
export const DeleteTerminalReadersReaderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    device_type: Schema.Literals([
      "bbpos_chipper2x",
      "bbpos_wisepad3",
      "bbpos_wisepos_e",
      "mobile_phone_reader",
      "simulated_stripe_s700",
      "simulated_stripe_s710",
      "simulated_wisepos_e",
      "stripe_m2",
      "stripe_s700",
      "stripe_s710",
      "verifone_P400",
    ]),
    id: Schema.String,
    object: Schema.Literals(["terminal.reader"]),
    serial_number: Schema.String,
  });
export type DeleteTerminalReadersReaderOutput =
  typeof DeleteTerminalReadersReaderOutput.Type;

// The operation
/**
 * Delete a Reader
 *
 * <p>Deletes a <code>Reader</code> object.</p>
 */
export const DeleteTerminalReadersReader = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteTerminalReadersReaderInput,
    outputSchema: DeleteTerminalReadersReaderOutput,
  }),
);
