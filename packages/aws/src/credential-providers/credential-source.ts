import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
/**
 * What every provider in this directory produces — an
 * `Effect<AwsCredentialIdentity, CredentialSourceError>` that needs nothing
 * from the environment it runs in — and how several of them are combined
 * into a chain.
 */
import type { AwsCredentialIdentity } from "../credentials-service.ts";

/**
 * A single credential source could not produce credentials.
 *
 * `tryNextLink` is what a chain looks at: `false` means the failure is
 * final (e.g. a malformed URL, an MFA prompt that cannot be answered) and
 * the chain stops there instead of trying the next source.
 */
export class CredentialSourceError extends Data.TaggedError("AWS::CredentialSourceError")<{
  message: string;
  tryNextLink?: boolean;
  cause?: unknown;
}> {}

export type CredentialSource = Effect.Effect<AwsCredentialIdentity, CredentialSourceError, never>;

/**
 * A secret a provider takes from the caller — a token, for instance. An
 * `Effect` is re-run on every credential resolution, for a secret that has
 * to be refreshed or that lives in a secret store.
 */
export type Secret = Redacted.Redacted<string> | Effect.Effect<Redacted.Redacted<string>, unknown>;

/**
 * Resolve a {@link Secret}. A failing `Effect` is a final failure: the chain
 * does not move on to another source.
 */
export const resolveSecret = (
  secret: Secret,
  message: string,
): Effect.Effect<Redacted.Redacted<string>, CredentialSourceError> =>
  Redacted.isRedacted(secret)
    ? Effect.succeed(secret)
    : Effect.mapError(
        secret,
        (cause) => new CredentialSourceError({ message, cause, tryNextLink: false }),
      );

/** `process.env[name]`, or `undefined` where there is no `process`. */
export const env = (name: string): string | undefined =>
  typeof process !== "undefined" ? process.env?.[name] : undefined;

/** Re-run `effect` up to `maxRetries` more times after a failure. */
export const retry = <A, E>(
  effect: Effect.Effect<A, E>,
  maxRetries: number,
): Effect.Effect<A, E> => (maxRetries > 0 ? Effect.retry(effect, { times: maxRetries }) : effect);

/**
 * Try each source in order. A source failing with `tryNextLink: false` stops
 * the chain; otherwise the next one runs. When every source fails, the last
 * failure is the chain's failure.
 */
export const chain = (sources: ReadonlyArray<CredentialSource>): CredentialSource =>
  Effect.suspend(() => {
    const step = (index: number, last: CredentialSourceError | undefined): CredentialSource => {
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
          error.tryNextLink === false ? Effect.fail(error) : step(index + 1, error),
        ),
      );
    };
    return step(0, undefined);
  });
