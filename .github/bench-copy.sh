#!/usr/bin/env bash
# Copy the current benchmark code into another checkout of distilled ($1), so
# an older commit is measured by the same programs as this one.
set -euo pipefail
dest="$1"
mkdir -p "$dest/benches/sdks" "$dest/benches/bundle" "$dest/benches/dashboard/src" "$dest/benches/repo-size"
cp -r benches/sdks/ci.ts benches/sdks/ci.json benches/sdks/targets.json benches/sdks/src "$dest/benches/sdks/"
cp -r benches/bundle/src "$dest/benches/bundle/"
cp benches/dashboard/src/charts.js "$dest/benches/dashboard/src/"
cp benches/repo-size/tree.ts "$dest/benches/repo-size/"
