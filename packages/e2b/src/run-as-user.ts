/**
 * The Linux user envd runs a call as, as a layer (like AWS's `Region`).
 *
 * An optional service: no operation lists it in its requirements. envd calls
 * that take a `username` (`process.startProcess`, the `filesystem` calls,
 * `envd.readFile` / `writeFiles` / `composeFiles`) use it when the call sets
 * no `username` of its own. Without either, envd uses the template's default
 * user.
 *
 * @example
 * ```ts
 * // Every call in the scope:
 * program.pipe(Effect.provide(E2B.RunAsUser.of("root")));
 * // One call:
 * Process.startProcess({ process: { cmd: "whoami" }, username: "root" });
 * ```
 */
import { getProps } from "@distilled.cloud/core/annotations";
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
import type * as AST from "effect/SchemaAST";

export class RunAsUser
  extends /*@__PURE__*/ Context.Service<RunAsUser, string>()("@distilled.cloud/e2b/RunAsUser") {}

/** Run envd calls in a scope as one user, e.g. `RunAsUser.of("root")`. */
export const of = (username: string) => Layer.succeed(RunAsUser, username);

/**
 * envd's run-as header value, as E2B's SDK sends it: `Basic` with the
 * base64 of `<user>:` (no password). The user's UTF-8 bytes are encoded, so
 * no name makes `btoa` throw.
 */
export const basicAuthorization = (username: string): string =>
  `Basic ${btoa(String.fromCharCode(...new TextEncoder().encode(`${username}:`)))}`;

const takesUsername = /*@__PURE__*/ new WeakMap<AST.AST, boolean>();

/**
 * `input` with the layer's user as its `username`, when the operation has a
 * `username` member and the call left it unset. Otherwise `input` itself.
 */
export const withRunAsUser = (
  inputAst: AST.AST,
  input: unknown,
  username: string | undefined,
): unknown => {
  if (username === undefined || input === null || typeof input !== "object") return input;
  if ((input as { username?: unknown }).username !== undefined) return input;
  let takes = takesUsername.get(inputAst);
  if (takes === undefined) {
    takes = getProps(inputAst).some((prop) => prop.name === "username");
    takesUsername.set(inputAst, takes);
  }
  return takes ? { ...input, username } : input;
};
