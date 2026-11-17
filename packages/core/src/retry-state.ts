/**
 * What the retry layer learns from the wire, kept outside the error values:
 *
 * - the host of the last request each fiber sent, which keys the retry
 *   budget ({@link Budget}), and the bounded server hint its response
 *   carried (`x-amz-retry-after` / `x-distilled-retry-after`);
 * - a count of successful responses per host, which refills the budget.
 *
 * `send` (`./send.ts`) writes both for every protocol that sends through it.
 * The module imports nothing heavy: every bundle that sends a request loads
 * it.
 */
import * as Fiber from "effect/Fiber";

interface LastRequest {
  readonly host: string;
  /** Bounded server hint of the response, in milliseconds. */
  hintMs: number | undefined;
}

const lastByFiber = /*@__PURE__*/ new WeakMap<object, LastRequest>();
const successesByHost = /*@__PURE__*/ new Map<string, number>();

/** The host of `url` (no port); `""` when it has none. */
export const hostOf = (url: string): string => {
  const schemeEnd = url.indexOf("://");
  if (schemeEnd === -1) return "";
  const start = schemeEnd + 3;
  let end = start;
  while (end < url.length && !"/?#".includes(url[end]!)) end++;
  const authority = url.slice(url.lastIndexOf("@", end) + 1 || start, end);
  const colon = authority.lastIndexOf(":");
  return colon !== -1 && !authority.endsWith("]") ? authority.slice(0, colon) : authority;
};

/** A whole, non-negative number of milliseconds; anything else is no hint. */
const parseMs = (value: string | undefined): number | undefined => {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return undefined;
  const ms = Number(trimmed);
  return Number.isSafeInteger(ms) ? ms : undefined;
};

/**
 * The bounded server hint of a response: `x-amz-retry-after` or
 * `x-distilled-retry-after` in milliseconds, the larger when both are set.
 */
export const boundedHintOf = (
  headers: Readonly<Record<string, string | undefined>>,
): number | undefined => {
  const amz = parseMs(headers["x-amz-retry-after"]);
  const distilled = parseMs(headers["x-distilled-retry-after"]);
  if (amz === undefined) return distilled;
  return distilled === undefined ? amz : Math.max(amz, distilled);
};

/** Record that the current fiber is sending a request to `url`. */
export const recordRequest = (url: string): void => {
  const fiber = Fiber.getCurrent();
  if (fiber !== undefined) lastByFiber.set(fiber, { host: hostOf(url), hintMs: undefined });
};

/** Record the response to the current fiber's last request. */
export const recordResponse = (
  status: number,
  headers: Readonly<Record<string, string | undefined>>,
): void => {
  const fiber = Fiber.getCurrent();
  const last = fiber === undefined ? undefined : lastByFiber.get(fiber);
  if (last === undefined) return;
  if (status < 300) {
    successesByHost.set(last.host, (successesByHost.get(last.host) ?? 0) + 1);
  } else {
    last.hintMs = boundedHintOf(headers);
  }
};

/**
 * The current fiber's last request, removed so that a later failure that
 * sent nothing cannot reuse its hint.
 */
export const takeLastRequest = (): { readonly host: string; readonly hintMs?: number } => {
  const fiber = Fiber.getCurrent();
  const last = fiber === undefined ? undefined : lastByFiber.get(fiber);
  if (last === undefined) return { host: "" };
  lastByFiber.delete(fiber!);
  return last.hintMs === undefined ? { host: last.host } : last;
};

/** Successful responses from `host` so far in this process. */
export const successesOf = (host: string): number => successesByHost.get(host) ?? 0;
