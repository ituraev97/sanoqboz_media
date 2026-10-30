"""mix.py EP DURATION -> EP/mix.wav. meta.json: whoosh[], ding[], boom[], pause_at"""
import sys,os,json,subprocess
EP=sys.argv[1];T=float(sys.argv[2]);M=json.load(open(f'{EP}/meta.json'));A=os.path.dirname(os.path.abspath(__file__))+'/assets/'
ins=['-i',f'{EP}/nar_f.wav','-i',A+'pad6.wav'];f=[];n=2;labs=[]
for k,vol,off in [('whoosh',.35,-.18),('ding',.22,0),('boom',.4,0)]:
    for t in M.get(k,[]):
        ms=max(0,int((t+off)*1000));ins+=['-i',A+k+'.wav'];f.append(f'[{n}]volume={vol},adelay={ms}|{ms}[a{n}]');labs.append(f'[a{n}]');n+=1
f.append('[0]aformat=channel_layouts=stereo[v]')
pa=M.get('pause_at');vol=f"'if(between(t,{pa-0.05},{pa+0.6}),0,0.28)':eval=frame" if pa else '0.28'
f.append(f"[1]atrim=0:{T},volume={vol},afade=t=out:st={T-1.4}:d=1.4[p]")
f.append('[v][p]'+''.join(labs)+f'amix=inputs={2+len(labs)}:normalize=0,alimiter=limit=0.95[o]')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(f),'-map','[o]','-t',str(T),'-ar','44100',f'{EP}/mix.wav'],check=True);print('mix ok')
