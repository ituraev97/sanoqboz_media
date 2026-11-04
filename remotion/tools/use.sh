#!/bin/bash
# use.sh EP — load episode EP/rv/{ep.ts,caps.ts,scenes.tsx} into the template and bundle
set -e; R=$(cd "$(dirname "$0")/.." && pwd); EP=$(cd "$1" && pwd)
mkdir -p $R/src/ep && cp $EP/rv/ep.ts $EP/rv/caps.ts $EP/rv/scenes.tsx $R/src/ep/
cd $R && npx tsc --noEmit -p . && npx remotion bundle src/index.ts --out-dir ${BUILD:-build} --log=error >/dev/null && echo "bundle ok: $EP"
