# @distilled.cloud/modal

Effect-native Modal SDK, generated from Modal's public proto3 gRPC API.

## Spec source

Modal does not publish OpenAPI. The machine-readable description is the
protobufs in [modal-labs/modal-client](https://github.com/modal-labs/modal-client):

- `modal_proto/api.proto` — `service ModalClient`
- `modal_proto/task_command_router.proto` — `service TaskCommandRouter`

Those two files are mirrored (not the whole client repo). Convert maps each
unary RPC to `POST /<package>.<Service>/<Method>` with proto3 JSON field
names. Streaming RPCs are skipped.

Modal's production control plane speaks binary gRPC; this SDK describes the
JSON encoding of that surface. Direct use of the gRPC API is unsupported by
Modal and may change without notice.

## Auth

Set `MODAL_TOKEN_ID` and `MODAL_TOKEN_SECRET` (the same variables the official
clients use). Optionally `MODAL_SERVER_URL` to override
`https://api.modal.com`.
