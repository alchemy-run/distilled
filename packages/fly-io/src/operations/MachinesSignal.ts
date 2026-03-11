import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesSignalInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
  signal: Schema.optional(
    Schema.Literals([
      "SIGABRT",
      "SIGALRM",
      "SIGFPE",
      "SIGHUP",
      "SIGILL",
      "SIGINT",
      "SIGKILL",
      "SIGPIPE",
      "SIGQUIT",
      "SIGSEGV",
      "SIGTERM",
      "SIGTRAP",
      "SIGUSR1",
    ]),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/machines/{machine_id}/signal",
  }),
);
export type MachinesSignalInput = typeof MachinesSignalInput.Type;

// Output Schema
export const MachinesSignalOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesSignalOutput = typeof MachinesSignalOutput.Type;

// The operation
/**
 * Signal Machine
 *
 * Send a signal to a specific Machine within an app using the details provided in the request body.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesSignal = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesSignalInput,
  outputSchema: MachinesSignalOutput,
}));
