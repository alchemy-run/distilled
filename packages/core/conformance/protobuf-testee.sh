#!/bin/sh
exec node --conditions=bun --experimental-transform-types --no-warnings "$(dirname "$0")/protobuf-testee.ts"
