#!/usr/bin/env bash
# Run the conformance suites against core's gRPC protocol and protobuf codec
# (see README.md): `run.sh [protobuf|grpc|all]`.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
build="$here/.build"
suite="${1:-all}"

# connectconformance release, verified against its published checksums.
CONNECT_VERSION="1.0.7"

need_submodule() {
  if [ ! -e "$here/$1/.git" ]; then
    echo "missing submodule packages/core/conformance/$1; run:" >&2
    echo "  git submodule update --init --depth 1 -- packages/core/conformance/$1" >&2
    exit 1
  fi
}

run_protobuf() {
  need_submodule protobuf
  local runner="$build/protobuf/conformance_test_runner"
  if [ ! -x "$runner" ]; then
    local generator=()
    if command -v ninja >/dev/null; then generator=(-G Ninja); fi
    cmake "${generator[@]}" -S "$here/protobuf" -B "$build/protobuf" \
      -DCMAKE_BUILD_TYPE=Release -Dprotobuf_BUILD_CONFORMANCE=ON \
      -Dprotobuf_BUILD_TESTS=OFF -Dprotobuf_INSTALL=OFF
    cmake --build "$build/protobuf" --target conformance_test_runner --parallel
  fi
  "$runner" --failure_list "$here/protobuf-failures.txt" --output_dir "$build" \
    "$here/protobuf-testee.sh"
}

run_grpc() {
  need_submodule connect
  local os arch
  case "$(uname -s)" in
    Darwin) os=Darwin ;;
    Linux) os=Linux ;;
    *) echo "unsupported OS $(uname -s)" >&2 && exit 1 ;;
  esac
  case "$(uname -m)" in
    arm64 | aarch64) arch=$([ "$os" = Darwin ] && echo arm64 || echo aarch64) ;;
    x86_64 | amd64) arch=x86_64 ;;
    *) echo "unsupported architecture $(uname -m)" >&2 && exit 1 ;;
  esac
  local dir="$build/connect-$CONNECT_VERSION"
  local bin="$dir/connectconformance"
  if [ ! -x "$bin" ]; then
    mkdir -p "$dir"
    local tarball="connectconformance-v$CONNECT_VERSION-$os-$arch.tar.gz"
    local base="https://github.com/connectrpc/conformance/releases/download/v$CONNECT_VERSION"
    curl -fsSL -o "$dir/$tarball" "$base/$tarball"
    curl -fsSL -o "$dir/checksums.txt" "$base/connectconformance_${CONNECT_VERSION}_checksums.txt"
    (cd "$dir" && grep " $tarball\$" checksums.txt | (sha256sum -c - 2>/dev/null || shasum -a 256 -c -))
    tar -xzf "$dir/$tarball" -C "$dir" connectconformance
  fi
  "$bin" --mode client --conf "$here/grpc-client.yaml" -- "$here/grpc-client.sh"
}

case "$suite" in
  protobuf) run_protobuf ;;
  grpc) run_grpc ;;
  all) run_protobuf && run_grpc ;;
  *) echo "usage: run.sh [protobuf|grpc|all]" >&2 && exit 2 ;;
esac
