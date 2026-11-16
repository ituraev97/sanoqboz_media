#!/bin/bash
# one-time per container: deps, fonts, brand, SFX library
set -e; R=$(cd "$(dirname "$0")/.." && pwd)
cd $R && npm i --no-audit --no-fund >/dev/null 2>&1
mkdir -p public && F=node_modules/@fontsource
cp $F/oswald/files/oswald-latin-{600,700}-normal.woff2 $F/inter/files/inter-latin-{500,700,800}-normal.woff2 $F/jetbrains-mono/files/jetbrains-mono-latin-{500,700}-normal.woff2 public/
cp $R/../pipeline/mark.svg $R/../pipeline/lockup.svg public/
[ -d /home/claude/soundcn ] || git clone -q --depth 1 https://github.com/kapishdima/soundcn /home/claude/soundcn
pip install --break-system-packages -q scipy numpy >/dev/null 2>&1 || true
echo "setup ok"
# 3D models (not in git): Khronos CarConcept, CC BY 4.0 — credit "3D: Eric Chadwick / Khronos (CC BY 4.0)" in the caption when used
mkdir -p $R/public/models && [ -s $R/public/models/carconcept.glb ] || curl -sSL -o $R/public/models/carconcept.glb https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb
