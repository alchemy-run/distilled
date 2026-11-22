#!/usr/bin/env bash
# Rebuild model.json from the Smithy AWS protocol tests (see README.md).
# Bump SMITHY_VERSION here and the artifact version in smithy-build.json
# together, run this, and commit model.json.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
build="$here/.build"

# Smithy CLI release, verified against its published checksum. It bundles
# its own Java runtime.
SMITHY_VERSION="1.75.0"

case "$(uname -s)-$(uname -m)" in
  Linux-x86_64 | Linux-amd64) platform=linux-x86_64 ;;
  Linux-aarch64 | Linux-arm64) platform=linux-aarch64 ;;
  Darwin-arm64) platform=darwin-aarch64 ;;
  Darwin-x86_64) platform=darwin-x86_64 ;;
  *) echo "unsupported platform $(uname -s) $(uname -m)" >&2 && exit 1 ;;
esac

dir="$build/smithy-cli-$SMITHY_VERSION"
smithy="$dir/smithy-cli-$platform/bin/smithy"
if [ ! -x "$smithy" ]; then
  mkdir -p "$dir"
  zip="smithy-cli-$platform.zip"
  base="https://github.com/smithy-lang/smithy/releases/download/$SMITHY_VERSION"
  curl -fsSL -o "$dir/$zip" "$base/$zip"
  expected="$(curl -fsSL "$base/$zip.sha256" | cut -d' ' -f1)"
  actual="$( (sha256sum "$dir/$zip" 2>/dev/null || shasum -a 256 "$dir/$zip") | cut -d' ' -f1)"
  if [ "$expected" != "$actual" ]; then
    echo "checksum mismatch for $zip: expected $expected, got $actual" >&2
    exit 1
  fi
  (cd "$dir" && unzip -q "$zip")
fi

# The CLI resolves the two protocol test packages and the trait packages they
# depend on from Maven Central, then flattens mixins: the generator reads
# flattened models, like the ones AWS publishes.
"$smithy" build --quiet -c "$here/smithy-build.json" --projection flat --output "$build/out"
cp "$build/out/flat/model/model.json" "$here/model.json"
echo "wrote $here/model.json"
