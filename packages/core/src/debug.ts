/**
 * `DISTILLED_DEBUG_HTTP`, read once. Protocols check it on every request,
 * and a `process.env` read is a C++ getter call: about 1 us each.
 */
let flag: boolean | undefined;
export const debugHttp = (): boolean =>
  (flag ??= !!(globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env?.DISTILLED_DEBUG_HTTP);
