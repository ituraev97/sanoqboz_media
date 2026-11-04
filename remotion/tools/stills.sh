#!/bin/bash
# stills.sh OUTDIR t1 t2 ... — render stills (seconds) from the current bundle + contact sheet OUTDIR/sheet*.jpg with safe-zone overlay
R=$(cd "$(dirname "$0")/.." && pwd); mkdir -p $1; O=$(cd "$1" && pwd); shift; CH=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1)
cd $R; n=0; for s in "$@"; do f=$(python3 -c "print(round($s*30))"); printf -v nm "%05d" $f
  npx remotion still ${BUILD:-build} Pay $O/f$nm.jpg --frame=$f --image-format=jpeg --browser-executable=$CH --log=error >/dev/null & n=$((n+1)); [ $((n % 6)) -eq 0 ] && wait; done; wait
ffmpeg -y -v error -pattern_type glob -i "$O/f*.jpg" -vf "drawbox=x=0:y=0:w=1080:h=190:color=red@0.22:t=fill,drawbox=x=930:y=1000:w=150:h=700:color=red@0.22:t=fill,drawbox=x=0:y=1500:w=1080:h=420:color=red@0.22:t=fill,scale=360:640,tile=8x2" $O/sheet%d.jpg && ls $O/sheet*.jpg
