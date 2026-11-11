// Stand-in for `node-fetch` in official-probe.ts: every request goes to the benchmark's mock.
const f = (...args: unknown[]) => (globalThis as any).__benchFetch(...args);
export default f;
export const Headers = globalThis.Headers;
export const Request = globalThis.Request;
export const Response = globalThis.Response;
export class FetchError extends Error {}
export class AbortError extends Error {}
export const isRedirect = (code: number) => [301, 302, 303, 307, 308].includes(code);
