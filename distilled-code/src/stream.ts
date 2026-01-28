import * as Chunk from "effect/Chunk";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

export type TextMode = "last-message" | "all-messages";

/**
 * Collect all elements from a stream into an array.
 *
 * @example
 * // Pipeable form
 * const parts = yield* agent.send(prompt).pipe(collect);
 *
 * @example
 * // Direct call form
 * const parts = yield* collect(stream);
 */
export const collect = <A, E, R>(
  stream: Stream.Stream<A, E, R>,
): Effect.Effect<A[], E, R> =>
  Stream.runCollect(stream).pipe(Effect.map(Chunk.toArray));

type StreamPartLike = {
  readonly type: string;
  readonly delta?: string;
};

/**
 * Extract text from a stream of thread parts.
 *
 * @example
 * // Curried form for .pipe() usage
 * const text = yield* agent.send(prompt).pipe(toText("last-message"));
 *
 * @example
 * // Direct call form
 * const text = yield* toText("last-message", stream);
 */
export function toText<E, R>(
  mode: TextMode,
  stream: Stream.Stream<unknown, E, R>,
): Effect.Effect<string, E, R>;
export function toText(
  mode: TextMode,
): <E, R>(stream: Stream.Stream<unknown, E, R>) => Effect.Effect<string, E, R>;
export function toText<E, R>(
  mode: TextMode,
  stream?: Stream.Stream<unknown, E, R>,
):
  | Effect.Effect<string, E, R>
  | (<E2, R2>(
      stream: Stream.Stream<unknown, E2, R2>,
    ) => Effect.Effect<string, E2, R2>) {
  const extractText = <E3, R3>(
    s: Stream.Stream<unknown, E3, R3>,
  ): Effect.Effect<string, E3, R3> =>
    Effect.gen(function* () {
      let last = "";
      let all = "";
      yield* Stream.runForEach(s, (part) =>
        Effect.sync(() => {
          const typed = part as StreamPartLike;
          // Skip user-input parts for text extraction
          if (typed.type === "user-input") return;

          if (typed.type === "text-start") {
            if (mode === "last-message") {
              last = "";
            }
          } else if (typed.type === "text-delta") {
            const delta = typed.delta ?? "";
            if (mode === "last-message") {
              last += delta;
            }
            all += delta;
          }
        }),
      );
      return mode === "last-message" ? last : all;
    });

  // Curried form for .pipe() usage
  if (stream === undefined) {
    return extractText;
  }

  // Direct call form
  return extractText(stream);
}
