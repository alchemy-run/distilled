import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

/** Trusted internal Celld listener. Never expose this endpoint to untrusted clients. */
export class Endpoint extends Context.Service<Endpoint, string>()(
  "Celld/Endpoint",
) {}

export const of = (url: string) => Layer.succeed(Endpoint, url);
export const endpoint = Effect.gen(function* () {
  return yield* Endpoint;
});
