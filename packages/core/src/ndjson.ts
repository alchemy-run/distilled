/**
 * Newline-delimited JSON (`application/x-ndjson`) framing for REST
 * server-streaming operations: pass {@link ndjson} as `makeRestProtocol`'s
 * `stream` option.
 *
 * Each non-empty line is one frame. `.stream(input)` emits each line as the
 * server writes it, decoded as one element of the output's `items`; a plain
 * call reads the whole body and collects the lines.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import type { StreamFraming } from "./protocol-rest.ts";

const nonEmpty = (line: string): boolean => line.trim().length > 0;

export const ndjson: StreamFraming = {
  mediaType: "application/x-ndjson",
  split: (text) => text.split(/\r?\n/).filter(nonEmpty),
  stream: (open) =>
    Stream.unwrap(
      Effect.map(open, ({ body, frame }) =>
        body.pipe(
          Stream.decodeText(),
          Stream.splitLines,
          Stream.filter(nonEmpty),
          Stream.mapEffect(frame),
        ),
      ),
    ),
};
