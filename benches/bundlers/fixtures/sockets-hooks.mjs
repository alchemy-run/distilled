// `node --import` hooks: resolve workerd's `cloudflare:sockets` to a stub.
import { registerHooks } from "node:module";

const stub = new URL("./sockets-stub.mjs", import.meta.url).href;

registerHooks({
  resolve: (specifier, context, next) =>
    specifier === "cloudflare:sockets"
      ? { url: stub, shortCircuit: true }
      : next(specifier, context),
});
