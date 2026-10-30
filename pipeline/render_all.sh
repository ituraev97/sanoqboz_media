#!/bin/bash
# render_all.sh EP DURATION  -> EP/final.mp4  (4 parallel workers + loudnorm -14 LUFS)
set -e; EP=$(realpath $1); T=$2; D=$(dirname $(realpath $0)); N=$(python3 -c "print(int($T*30))"); Q=$(( (N+3)/4 ))
cd $D; for i in 0 1 2 3; do a=$((i*Q)); b=$(( (i+1)*Q )); [ $b -gt $N ] && b=$N; node render.js $a $b $EP/seg$i.mp4 > $EP/r$i.log 2>&1 & done; wait
grep -h ERR $EP/r?.log && exit 1 || true
printf "file seg0.mp4\nfile seg1.mp4\nfile seg2.mp4\nfile seg3.mp4\n" > $EP/list.txt
ffmpeg -v error -y -f concat -safe 0 -i $EP/list.txt -i $EP/mix.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-14:TP=-1.2:LRA=11 -c:a aac -b:a 192k -ar 44100 -shortest -movflags +faststart $EP/final.mp4
rm -f $EP/seg?.mp4 $EP/list.txt; ffprobe -v error -show_entries format=duration,size -of csv=p=0 $EP/final.mp4
