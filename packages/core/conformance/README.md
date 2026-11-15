# Conformance

Core's gRPC protocol (`src/protocol-grpc.ts`, `src/grpc-transport*.ts`) and protobuf codec (`src/protobuf.ts`) are checked against the official conformance suites. Both are submodules here, shallow and pinned to a release:

| Submodule | Upstream | Tests |
| --- | --- | --- |
| `protobuf/` | [`protocolbuffers/protobuf`](https://github.com/protocolbuffers/protobuf) @ v36.2 | the binary and proto3 JSON encoding of `TestAllTypesProto3` |
| `connect/` | [`connectrpc/conformance`](https://github.com/connectrpc/conformance) @ v1.0.7 | a gRPC client against reference servers: status, trailers, metadata, deadlines, cancellation, streaming, error details and malformed replies |

```sh
git submodule update --init --depth 1 -- packages/core/conformance/connect packages/core/conformance/protobuf
packages/core/conformance/run.sh            # both suites
packages/core/conformance/run.sh protobuf   # or one
packages/core/conformance/run.sh grpc
```

The first protobuf run builds `conformance_test_runner` from the submodule with CMake into the gitignored `.build/`. That takes a few minutes, and CMake fetches abseil and jsoncpp itself. The gRPC suite downloads the `connectconformance` release binary and checks it against the release's checksums.

## What runs

`protobuf-testee.ts` answers the protobuf runner over stdin and stdout with `decodeMessage` and `encodeMessage`. Its descriptors are what the proto converter (`dev/src/codegen/proto.ts`) builds from the suite's own `.proto` files. Proto2, editions and text format are skipped: the converter reads proto3, and SDKs only speak binary and JSON.

`grpc-client.ts` is the client under test. Each request becomes an `API.make` or `API.makeStreaming` operation over `makeGrpcProtocol`, sent with the `node:http2` transport. It reports statuses by gRPC code through the protocol's `statusError` option. `grpc-client.yaml` lists what the client supports: gRPC over HTTP/2 cleartext, the proto codec, no compression, and unary and server-streaming calls.

## Expected failures

`protobuf-failures.txt` lists the protobuf cases the codec fails on purpose, with the reasons. The runner fails on any case missing from the list, and on any case in it that passes. The gRPC suite has no expected failures.
