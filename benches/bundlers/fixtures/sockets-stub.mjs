// Stands in for workerd's `cloudflare:sockets` (see sockets-hooks.mjs).
export const connect = () => {
  throw new Error("stub socket opened");
};
