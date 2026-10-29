/**
 * The typed refusal of a path label that would address another resource.
 *
 * Its own module (re-exported from `errors.ts` and `protocol-http.ts`) so a
 * protocol can fail with it without bundling every common error class:
 * `errors.ts` keeps all of its classes once any one is imported.
 */
import * as Category from "./category.ts";
import * as Schema from "./schema-lite-typed.ts";

/**
 * The input cannot be sent: a path label whose value would address another
 * resource (`.` or `..`, which the URL parser resolves to the parent path).
 * Raised before anything is sent.
 */
export class InvalidInput
  extends /*@__PURE__*/ Schema.TaggedError<InvalidInput>()("InvalidInput", {
    member: Schema.String,
    message: Schema.String,
  }).pipe(Category.withBadRequestError) {}

/**
 * The refusal for a path label value that would address another resource,
 * or `undefined`. The URL parser resolves a `.` or `..` segment,
 * percent-encoded or not, so no encoding can carry one
 * (`/projects/p1/branches/..` -> `/projects/p1/`). A greedy label keeps its
 * `/`, so each of its segments counts.
 */
export const invalidLabel = (
  member: string,
  value: unknown,
  greedy?: boolean,
): InvalidInput | undefined => {
  const text = String(value);
  return (greedy ? text.split("/") : [text]).some((s) => s === "." || s === "..")
    ? new InvalidInput({
        member,
        message: `Input member ${member} cannot be ${JSON.stringify(text)}: as a path label it would address another resource`,
      })
    : undefined;
};
