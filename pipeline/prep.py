"""prep.py EP — audio -> nar_f.wav, sil.txt, words.json, caps.json, env.json
EP/meta.json: {"speed":1.06, "pause_at":null|sec (insert 0.5s silence before twist, in nar_f time), "num_words":[...]}"""
import sys,os,json,re,math,subprocess,numpy as np
EP=sys.argv[1];M=json.load(open(f'{EP}/meta.json'));D=os.path.dirname(os.path.abspath(__file__))
def run(*a):subprocess.run(a,check=True)
sp=M.get('speed',1.06)
run('ffmpeg','-y','-v','error','-i',f'{EP}/raw.mp3','-af',f'silenceremove=start_periods=1:start_threshold=-45dB:stop_periods=-1:stop_duration=0.5:stop_threshold=-45dB:stop_silence=0.35,atempo={sp}','-ar','44100','-ac','1',f'{EP}/nar_f.wav')
def sil():
    o=subprocess.run(['ffmpeg','-v','info','-i',f'{EP}/nar_f.wav','-af','silencedetect=n=-40dB:d=0.16','-f','null','-'],capture_output=True,text=True).stderr
    s=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',o)];e=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',o)]
    return list(zip(s,e))
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{EP}/nar_f.wav'],capture_output=True,text=True).stdout)
S=sil()
if S and S[-1][1]>=dur-0.05: T=S[-1][0];S=S[:-1]
else: T=dur
open(f'{EP}/sil.txt','w').write('\n'.join(f'{a} {b}' for a,b in S));open(f'{EP}/T','w').write(str(T))
cwd=os.getcwd();os.chdir(EP);run('python3',f'{D}/align.py');os.chdir(cwd)
W=json.load(open(f'{EP}/words.json'))
pa=M.get('pause_at')
if pa:
    run('ffmpeg','-y','-v','error','-i',f'{EP}/nar_f.wav','-filter_complex',f'[0]atrim=0:{pa},asetpts=N/SR/TB[a];aevalsrc=0:d=0.5:s=44100[s];[0]atrim={pa},asetpts=N/SR/TB[b];[a][s][b]concat=n=3:v=0:a=1[o]','-map','[o]','-ar','44100','-ac','1',f'{EP}/tmp.wav')
    os.replace(f'{EP}/tmp.wav',f'{EP}/nar_f.wav')
    for x in W:
        if x[1]>=pa: x[1]=round(x[1]+.5,3);x[2]=round(x[2]+.5,3)
    json.dump(W,open(f'{EP}/words.json','w'),ensure_ascii=False)
NUM=set(M.get('num_words',[]))
phr=[];cur=[]
for w,s,e in W:
    if w=='—':
        tgt=cur if cur else phr[-1];tgt[-1][0]+=' —'
        if cur: phr.append(cur);cur=[]
        continue
    base=re.sub(r'[^\w‘’]','',w.lower())
    cur.append([w.strip('“”'),s,e,'b' if base in NUM else ''])
    if re.search(r'[.?!:,;…]["”]?$|\.\.\.$',w): phr.append(cur);cur=[]
if cur: phr.append(cur)
L=lambda q:len(' '.join(x[0] for x in q))
m=[]
for p in phr:
    if m and L(m[-1])+L(p)+1<=22 and (p[0][1]-m[-1][-1][2])<0.35: m[-1]=m[-1]+p
    else: m.append(p)
caps=[]
for p in m:
    s=' '.join(x[0] for x in p);k=math.ceil(len(s)/26)
    if k<=1: caps.append(p);continue
    tg=[len(s)*j/k for j in range(1,k)];c=[];acc=0
    for x in p:
        c.append(x);acc+=len(x[0])+1
        if tg and acc>=tg[0]-3 and x is not p[-1]: caps.append(c);c=[];tg.pop(0)
    if c: caps.append(c)
json.dump([{'m':False,'w':c} for c in caps],open(f'{EP}/caps.json','w'),ensure_ascii=False)
raw=subprocess.run(['ffmpeg','-v','error','-i',f'{EP}/nar_f.wav','-f','s16le','-ac','1','-ar','48000','-'],capture_output=True).stdout
a=np.frombuffer(raw,np.int16).astype(float)/32768;hop=1600
r=np.array([np.sqrt(np.mean(a[i:i+hop]**2)) for i in range(0,len(a),hop)]);r=np.clip(r/np.percentile(r,95),0,1)
json.dump([round(float(x),3) for x in r],open(f'{EP}/env.json','w'))
d2=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{EP}/nar_f.wav'],capture_output=True,text=True).stdout)
print('DURATION',round(d2+0.4,2))
for c in caps: print(round(c[0][1],2),' '.join(x[0] for x in c))
