#!/bin/bash
# render.sh EP — full render of the current bundle + mux EP/mix.wav -> EP/final.mp4, EP/cover.jpg, EP/final_sheet.jpg (run in background, ~25 min on 2 cores)
set -e; R=$(cd "$(dirname "$0")/.." && pwd); EP=$(cd "$1" && pwd); CH=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell | head -1)
cd $R && npx remotion still build Cover $EP/cover.png --browser-executable=$CH --log=error >/dev/null && ffmpeg -y -v error -i $EP/cover.png -q:v 2 $EP/cover.jpg
npx remotion render build Pay $EP/noaudio.mp4 --codec=h264 --crf=17 --muted --browser-executable=$CH --concurrency=$(nproc) --log=error
ffmpeg -y -v error -i $EP/noaudio.mp4 -i $EP/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart $EP/final.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $EP/final.mp4)
ffmpeg -y -v error -i $EP/final.mp4 -vf "fps=24/$D,scale=240:-1,tile=8x3" -frames:v 1 $EP/final_sheet.jpg
echo "RENDER DONE $D s, $(ffmpeg -i $EP/final.mp4 -af ebur128 -f null - 2>&1 | grep -E '^\s+I:' | tail -1)"
