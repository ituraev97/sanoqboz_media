#!/bin/bash
# mix.sh EP — voice (EP/nar_f.wav) + EP/music.wav + EP/sfx.wav -> EP/mix.wav at -14 LUFS
EP=$1; D=$(grep -oP 'END = \K[\d.]+' $EP/rv/ep.ts)
ffmpeg -y -v error -i $EP/nar_f.wav -i $EP/music.wav -i $EP/sfx.wav -filter_complex "[0:a]aresample=44100,loudnorm=I=-16:TP=-2:LRA=9,pan=stereo|c0=c0|c1=c0,apad=whole_dur=$D,asplit=2[v][vsc];[1:a]volume=-13dB[m];[m][vsc]sidechaincompress=threshold=0.05:ratio=4:attack=30:release=400[md];[2:a]volume=-6dB[s];[v][md][s]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.92,loudnorm=I=-14:TP=-1.5:LRA=11[a]" -map "[a]" -ar 44100 -c:a pcm_s16le $EP/mix.wav && echo "mix ok $D"
