#!/bin/bash
# clip.sh NAME SRC.mp4 START DUR full|card [cropX]  -> pipeline/clips/NAME/%04d.jpg (30fps)
D=$(dirname $(realpath $0)); mkdir -p $D/clips/$1; rm -f $D/clips/$1/*.jpg
if [ "$5" = full ]; then
  if [ -n "$6" ]; then VF="crop=ih*9/16:ih:$6:0,scale=1080:1920:flags=lanczos,fps=30"; else VF="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30"; fi
else VF="scale=960:540:force_original_aspect_ratio=increase,crop=960:540,fps=30"; fi
ffmpeg -v error -ss $3 -t $4 -i $2 -vf "$VF" -q:v 3 $D/clips/$1/%04d.jpg; ls $D/clips/$1 | wc -l
