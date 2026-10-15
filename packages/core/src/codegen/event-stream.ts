/**
 * The `com.distilled#eventStream` operation trait — dialect-agnostic.
 *
 * An operation carrying it streams its success response as
 * `text/event-stream`; its output shape describes ONE event's `data`
 * payload. The generator emits such operations with `API.makeStream`
 * instead of `API.make`, typed `API.StreamOperationMethod`.
 *
 * Trait value (mirrors core `API.EventStreamTrait`):
 *
 *   {
 *     "requestFlag"?: string, // body member forced to `true` (`stream`)
 *     "done"?: string         // `data` payload that ends the stream (`[DONE]`)
 *   }
 *
 * Converters stamp it from whatever their dialect says (OpenAPI: a
 * `text/event-stream` success response); patches can add or adjust it like
 * any other trait.
 */
export const EVENT_STREAM_TRAIT = "com.distilled#eventStream";

export interface EventStreamTraitValue {
  readonly requestFlag?: string;
  readonly done?: string;
}
