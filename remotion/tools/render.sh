#!/bin/bash
# render.sh EP — full render of the current bundle + mux EP/mix.wav -> EP/final.mp4, EP/cover.jpg, EP/final_sheet.jpg (run in background, ~25 min on 2 cores)
set -e; R=$(cd "$(dirname "$0")/.." && pwd); EP=$(cd "$1" && pwd); CH=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1)
cd $R && npx remotion still build Cover $EP/cover.png --browser-executable=$CH --log=error >/dev/null && ffmpeg -y -v error -i $EP/cover.png -q:v 2 $EP/cover.jpg
npx remotion render build Pay $EP/noaudio.mp4 --codec=h264 --crf=17 --muted --browser-executable=$CH --concurrency=$(nproc) --log=error
ffmpeg -y -v error -i $EP/noaudio.mp4 -i $EP/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart $EP/final.mp4
# YUZ promo (~6 s) appended to every reel — pipeline/assets/yuz_promo.mp4 (1080x1920, 30 fps, 44.1 kHz, -14 LUFS). Set NO_PROMO=1 to skip.
PROMO=$R/../pipeline/assets/yuz_promo.mp4
if [ -f "$PROMO" ] && [ -z "$NO_PROMO" ]; then
  mv $EP/final.mp4 $EP/final_main.mp4
  ffmpeg -y -v error -i $EP/final_main.mp4 -i $PROMO -filter_complex "[0:v]fps=30,format=yuv420p,setsar=1[v0];[1:v]fps=30,format=yuv420p,setsar=1[v1];[0:a]aresample=44100,aformat=channel_layouts=stereo[a0];[1:a]aresample=44100,aformat=channel_layouts=stereo[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -c:a aac -b:a 256k -movflags +faststart $EP/final.mp4
fi
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $EP/final.mp4)
ffmpeg -y -v error -i $EP/final.mp4 -vf "fps=24/$D,scale=240:-1,tile=8x3" -frames:v 1 $EP/final_sheet.jpg
echo "RENDER DONE $D s, $(ffmpeg -i $EP/final.mp4 -af ebur128 -f null - 2>&1 | grep -E '^\s+I:' | tail -1)"
