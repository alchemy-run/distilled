- unlisted properties
- readme.md
- requested sdks (name — source of the request)
  - better-auth — distilled#372
- upload converted specs on release to our own infra (R2), not GitHub
  - once #933 stops committing `packages/*/.generated-specs/`, the few people
    who read the converted models need another place to get them
  - the release fetches the spec mirrors, runs each package's `convert`, and
    uploads the result to R2 keyed by version; a small script downloads one
    package's models into `packages/<pkg>/.generated-specs/`
  - not GitHub Actions artifacts or a mirror repo; `pnpm convert <pkg>` stays
    the local fallback
  - we should also release builds on our own; that way in alchemy post install
    can just pull down those pre-builts instead of having to build everything
    again (especially since distilled-lazy is slow to build and alchemy uses that)
  - extract OpenWhisk into `@distilled.cloud/openwhisk`, the way S3 left aws
    - DigitalOcean Functions is the generic Apache OpenWhisk API at each
      namespace's `api_host` with basic auth; `@distilled.cloud/digitalocean/Functions`
      generates it from Apache's `apiv1swagger.json` in the DigitalOcean mirror
    - the package would own the generated client and its protocol, and take
      `{ apiHost, user, secret }` through a layer; DigitalOcean keeps a layer
      that fills it from a namespace (`uuid` + `key`), like `R2.layerS3()`
    - other OpenWhisk hosts (self-hosted OpenWhisk, Adobe I/O Runtime) could
      use it; the spec then moves to its own `spec-mirror-openwhisk`
- rethink github webhooks
  - #936 generates `@distilled.cloud/github/webhooks`: one type per payload
    in the spec's `x-webhooks` plus a `WebhookEvents` map. It is types only,
    about 1.8 MB of generated source, and it grew the github tarball 25%.
  - it has no signature check (HMAC-SHA256 of `X-Hub-Signature-256`), no
    runtime payload schemas and no event-name constants; draft #583 has all
    three
  - decide the shape: a separate subpath or package, runtime decoding or
    types only, and whether other providers' webhooks follow the same pattern
- go over the gRPC client
  - core/src: protocol-grpc.ts, protobuf.ts, grpc-transport.ts and the two
    transports (grpc-transport-node-http2.ts, grpc-transport-cloudflare-sockets.ts);
    modal is the only SDK on it
  - webpack breaks the Workers transport: `import(SOCKETS_MODULE)` becomes an
    empty context that always rejects ("Cannot find module"), so every call
    fails with a transport error. esbuild, rolldown, Vite and wrangler keep
    the import. benches/bundlers marks the webpack case `it.fails`; a
    `/* webpackIgnore: true */` comment on the import is the likely fix
  - protobuf.ts throws its encode/decode errors (43 throws) and
    protocol-grpc.ts catches them; decide if that stays or becomes typed
