/**
 * What every provider in this directory produces — an
 * `Effect<AwsCredentialIdentity, CredentialSourceError>` that needs nothing
 * from the environment it runs in — and how several of them are combined
 * into a chain.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";

/**
 * A single credential source could not produce credentials.
 *
 * `tryNextLink` is what a chain looks at: `false` means the failure is
 * final (e.g. a malformed URL, an MFA prompt that cannot be answered) and
 * the chain stops there instead of trying the next source.
 */
export class CredentialSourceError extends Data.TaggedError(
  "AWS::CredentialSourceError",
)<{
  message: string;
  tryNextLink?: boolean;
  cause?: unknown;
}> {}

export type CredentialSource = Effect.Effect<
  AwsCredentialIdentity,
  CredentialSourceError,
  never
>;

/** `process.env[name]`, or `undefined` where there is no `process`. */
export const env = (name: string): string | undefined =>
  typeof process !== "undefined" ? process.env?.[name] : undefined;

/** Re-run `effect` up to `maxRetries` more times after a failure. */
export const retry = <A, E>(
  effect: Effect.Effect<A, E>,
  maxRetries: number,
): Effect.Effect<A, E> =>
  maxRetries > 0 ? Effect.retry(effect, { times: maxRetries }) : effect;

/**
 * Try each source in order. A source failing with `tryNextLink: false` stops
 * the chain; otherwise the next one runs. When every source fails, the last
 * failure is the chain's failure.
 */
export const chain = (
  sources: ReadonlyArray<CredentialSource>,
): CredentialSource =>
  Effect.suspend(() => {
    const step = (
      index: number,
      last: CredentialSourceError | undefined,
    ): CredentialSource => {
      if (index >= sources.length) {
        return Effect.fail(
          last ??
            new CredentialSourceError({
              message: "No credential sources configured.",
              tryNextLink: false,
            }),
        );
      }
      return sources[index].pipe(
        Effect.catch((error) =>
          error.tryNextLink === false
            ? Effect.fail(error)
            : step(index + 1, error),
        ),
      );
    };
    return step(0, undefined);
  });
