#!/bin/sh
# Runs a JS file with Node if you have it, otherwise falls back to macOS's JavaScriptCore.
# Usage: ./run.sh objects-playground.js
DIR=$(cd "$(dirname "$0")" && pwd)
if command -v node >/dev/null 2>&1; then
  exec node "$@"
fi
JSC=/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc
exec "$JSC" "$DIR/_jsc-shim.js" "$@"
