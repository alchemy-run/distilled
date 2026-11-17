/**
 * Newline-delimited JSON (`application/x-ndjson`) framing for REST
 * server-streaming operations: the `framing` config of an
 * `API.makeStreaming` operation (see `StreamFraming` in core/protocol-rest).
 *
 * Each non-empty line is one frame. `.stream(input)` emits each line as the
 * server writes it, decoded as one element of the output's `items`; a plain
 * call reads the whole body and collects the lines. A line that is not JSON
 * fails with the SDK's parse error. Only programs that call such an
 * operation bundle this module and `effect/Stream`.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import type { StreamFraming } from "./protocol-rest.ts";

const nonEmpty = (line: string): boolean => line.trim().length > 0;

/** The line as JSON, or `undefined` when it is not JSON. */
const parse = (line: string): { readonly json: unknown } | undefined => {
  try {
    return { json: JSON.parse(line) };
  } catch {
    return undefined;
  }
};

export const ndjson: StreamFraming = {
  collect: (text, contentType) => {
    if (contentType?.split(";")[0]!.trim().toLowerCase() !== "application/x-ndjson") {
      return undefined;
    }
    const items: unknown[] = [];
    for (const line of text.split(/\r?\n/)) {
      if (!nonEmpty(line)) continue;
      const parsed = parse(line);
      if (parsed === undefined) return { json: undefined, nonJson: true };
      items.push(parsed.json);
    }
    return { json: { items }, nonJson: false };
  },
  stream: (open) =>
    Stream.unwrap(
      Effect.map(open, ({ body, item, invalid }) =>
        body.pipe(
          Stream.decodeText(),
          Stream.splitLines,
          Stream.filter(nonEmpty),
          Stream.mapEffect((line) => {
            const parsed = parse(line);
            return parsed === undefined ? Effect.fail(invalid(line)) : item(parsed.json, line);
          }),
        ),
      ),
    ),
};
