import re,json,subprocess,sys
T=float(open('T').read())
sil=[tuple(map(float,l.split())) for l in open('sil.txt')]
ch=[];t=0
for a,b in sil: ch.append((t,a));t=b
ch.append((t,T))
words=open('script.txt').read().split()
L=[len(re.sub(r'[^\w]','',w))+1.2 for w in words]
pun=[bool(re.search(r'[.,:?!—"]$',w)) or w=='—' for w in words]
N=len(words);M=len(ch)
rate=sum(b-a for a,b in ch)/sum(L)
pre=[0]
for l in L: pre.append(pre[-1]+l)
INF=1e18
dp=[[INF]*(N+1) for _ in range(M+1)];bk=[[0]*(N+1) for _ in range(M+1)]
dp[0][0]=0
for m in range(1,M+1):
  d=ch[m-1][1]-ch[m-1][0]
  for j in range(1,N+1):
    best=INF;bi=0
    for i in range(max(0,j-40),j):
      if dp[m-1][i]>=INF: continue
      c=dp[m-1][i]+(d-rate*(pre[j]-pre[i]))**2/max(d,.3)+(0 if pun[j-1] else 0.6)
      if c<best: best=c;bi=i
    dp[m][j]=best;bk[m][j]=bi
j=N;seg=[]
for m in range(M,0,-1):
  i=bk[m][j];seg.append((i,j));j=i
seg.reverse()
out=[]
for (i,j),(a,b) in zip(seg,ch):
  tot=pre[j]-pre[i];t=a
  for k in range(i,j):
    dd=(b-a)*L[k]/tot;out.append([words[k],round(t,3),round(t+dd,3)]);t+=dd
json.dump(out,open('words.json','w'),ensure_ascii=False)
for (i,j),(a,b) in zip(seg,ch): print(f'{a:6.2f} {" ".join(words[i:j])}')
