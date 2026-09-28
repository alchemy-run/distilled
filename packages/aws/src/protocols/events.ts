/**
 * Event-stream members, located and decoded from the operation descriptor.
 */
import {
  decodeJson,
  Events,
  membersOf,
  shapeOf,
  specOf,
  type Struct,
} from "@distilled.cloud/core/shape";
import type { ParsedEvent } from "../eventstream/parser.ts";

export interface EventStreamMember {
  readonly name: string;
  readonly events: Events;
}

/** The streaming member of a struct: a streaming blob or an event stream. */
export const findStreamingMember = (
  struct: Struct | undefined,
):
  | { name: string; events: Events | undefined; payload: boolean }
  | undefined => {
  if (struct === undefined) return undefined;
  for (const [name, member] of membersOf(struct)) {
    const shape = shapeOf(member);
    if (shape === "stream" || shape instanceof Events) {
      return {
        name,
        events: shape instanceof Events ? shape : undefined,
        payload: specOf(member)?.payload === true,
      };
    }
  }
  return undefined;
};

/** Decode one `{ EventType: payload }` event through its event shape. */
export const eventDecoder =
  (events: Events) =>
  (event: ParsedEvent): ParsedEvent => {
    for (const key in event) {
      const shape = events.events[key];
      if (shape !== undefined) event[key] = decodeJson(event[key], shape);
    }
    return event;
  };
