/**
 * Whether the call running on this fiber logs its requests and responses to
 * stderr (`[distilled] -> GET /zones/{zone_id}`, `[distilled] <- 200 ...`):
 * `TelemetryDebug.layerWith({ logRequests: true })` from
 * `./telemetry-debug.ts`. Protocols check it on every request; outside a
 * fiber, or without that layer, it is false.
 */
import * as Fiber from "effect/Fiber";
import { Debug } from "./telemetry.ts";

export const debugHttp = (): boolean => Fiber.getCurrent()?.getRef(Debug)?.logRequests === true;
