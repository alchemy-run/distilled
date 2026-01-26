import type { AnyPart } from "@effect/ai/Response";
import type { Fiber } from "effect/Fiber";
import type * as PubSub from "effect/PubSub";

import type { StateStoreError } from "./state-store.ts";

export type Thread = {
  pubsub: PubSub.PubSub<MessagePart>;
  daemon: Fiber<void, StateStoreError>;
};

/**
 * Represents a user input message in the thread stream.
 * This allows user messages to be part of the unified stream alongside AI responses.
 */
export interface UserInputPart {
  readonly type: "user-input";
  readonly content: string;
  readonly timestamp: number;
}

/**
 * Union type representing all parts that can appear in a thread stream.
 * Includes both user input and AI response stream parts.
 */
export type MessagePart = UserInputPart | AnyPart;
