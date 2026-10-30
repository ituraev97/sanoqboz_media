// ===== video 8: obogrevatel qancha svet yeydi? =====
PANEL.length=0;
const ENV=__ENV__, CAPS=__CAPS__;
const envAt=t=>ENV[Math.max(0,Math.min(ENV.length-1,Math.floor(t*30)))]||0;
const CUT0=999,CUT1=999;
const MARK=new Image();MARK.src='mark.svg';
__FRAMEWORK__
__BUBBLE__
const HOT='255,110,40';
function heater(cx,base,s,k,t){// oil radiator, k=0..1 glow
  const n=9,fw=36*s,gap=8*s,w=n*fw+(n-1)*gap,h=330*s,x0=cx-w/2;
  if(k>0)glow(cx,base-h/2,0,w*.9,HOT,.28*k*(.85+.15*Math.sin(t*3)));
  for(let i=0;i<n;i++){const x=x0+i*(fw+gap);const g=ctx.createLinearGradient(x,0,x+fw,0);const c1=`rgb(${Math.round(lerp(205,255,k))},${Math.round(lerp(212,140,k))},${Math.round(lerp(220,90,k))})`;g.addColorStop(0,'#8b929c');g.addColorStop(.45,c1);g.addColorStop(1,'#6f7782');ctx.fillStyle=g;rrect(x,base-h,fw,h-30*s,fw/2);ctx.fill();}
  ctx.fillStyle='#4a515b';ctx.fillRect(x0-6*s,base-h+40*s,w+12*s,10*s);ctx.fillRect(x0-6*s,base-70*s,w+12*s,10*s);
  ctx.fillStyle='#2a3038';rrect(x0+w-70*s,base-h-34*s,64*s,40*s,6*s);ctx.fill();circle(x0+w-38*s,base-h-14*s,10*s,k>0?C.red:'#4a515b');
  for(const dx of[-w*.35,w*.35]){ctx.fillStyle='#4a515b';ctx.fillRect(cx+dx-40*s,base-32*s,80*s,10*s);circle(cx+dx-34*s,base-12*s,12*s,'#222');circle(cx+dx+34*s,base-12*s,12*s,'#222');}
  ctx.strokeStyle='#2a3038';ctx.lineWidth=5*s;ctx.beginPath();ctx.moveTo(x0+w,base-60*s);ctx.bezierCurveTo(x0+w+80*s,base-40*s,x0+w+60*s,base+10*s,x0+w+140*s,base);ctx.stroke();
  if(k>0){for(let i=0;i<6;i++){const u=((t*.6+i/6)%1);const x=x0+w*(.15+i*.14);ctx.strokeStyle=`rgba(${HOT},${.5*k*(1-u)})`;ctx.lineWidth=4*s;ctx.beginPath();ctx.moveTo(x,base-h-20*s-u*120*s);ctx.quadraticCurveTo(x+14*s,base-h-50*s-u*120*s,x,base-h-80*s-u*120*s);ctx.stroke();}}}
function meter(cx,cy,s,val,t,spin=1){ctx.fillStyle='#d9dee5';rrect(cx-150*s,cy-120*s,300*s,240*s,18*s);ctx.fill();ctx.fillStyle='#1b2431';rrect(cx-120*s,cy-90*s,240*s,70*s,8*s);ctx.fill();
  const st=String(Math.floor(val)).padStart(6,'0');for(let i=0;i<6;i++){ctx.fillStyle=i==5?'#3a1414':'#05070a';ctx.fillRect(cx-110*s+i*37*s,cy-82*s,32*s,54*s);txt(st[i],cx-94*s+i*37*s,cy-40*s,{size:40*s,color:i==5?'#ff8a7a':C.white,font:'JBM'});}
  mono('kVt·soat',cx,cy+12*s,{size:20*s,color:'#2a3038',weight:700});ctx.fillStyle='#9aa1ab';ctx.fillRect(cx-90*s,cy+40*s,180*s,26*s);const ph=(t*spin*3)%1;ctx.fillStyle=C.red;ctx.fillRect(cx-90*s+ph*170*s,cy+40*s,10*s,26*s);
  circle(cx-120*s,cy+95*s,7*s,'#6f7782');circle(cx+120*s,cy+95*s,7*s,'#6f7782');}
function receipt(cx,cy,w,lines,total,col,t,t0){const e=eo(P(t,t0,.4));if(e<=0)return;const h=lines.length*56+230;ctx.save();ctx.globalAlpha*=e;ctx.translate(cx,cy+(1-e)*80);ctx.rotate(-.02);
  ctx.fillStyle='#f3f5f8';ctx.beginPath();ctx.moveTo(-w/2,-h/2);ctx.lineTo(w/2,-h/2);ctx.lineTo(w/2,h/2);for(let x=w/2;x>-w/2;x-=30){ctx.lineTo(x-15,h/2-14);ctx.lineTo(x-30,h/2);}ctx.closePath();ctx.fill();
  txt('GAZ HISOBI',0,-h/2+64,{size:44,color:'#05070a',font:'Osw'});ctx.fillStyle='#c6ccd4';ctx.fillRect(-w/2+30,-h/2+90,w-60,3);
  lines.forEach((l,i)=>{mono(l[0],-w/2+34,-h/2+148+i*56,{size:26,align:'left',color:'#2a3038',weight:700,spacing:0});mono(l[1],w/2-34,-h/2+148+i*56,{size:26,align:'right',color:'#2a3038',weight:700,spacing:0});});
  ctx.fillStyle='#05070a';ctx.fillRect(-w/2+30,h/2-108,w-60,3);mono('JAMI',-w/2+34,h/2-50,{size:28,align:'left',color:'#05070a',weight:700});txt(total,w/2-34,h/2-46,{size:56,align:'right',color:col||'#05070a',font:'Osw'});ctx.restore();}
function clock(cx,cy,r,h0,h1,k){ctx.fillStyle='#11151b';circle(cx,cy,r,'#11151b');ctx.strokeStyle='#cfd6df';ctx.lineWidth=6;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();
  const ang=h=>(h%12)/12*Math.PI*2-Math.PI/2;ctx.fillStyle=`rgba(${HOT},.35)`;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r-10,ang(h0),ang(h0)+(h1-h0)/12*Math.PI*2*k);ctx.closePath();ctx.fill();
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ctx.fillStyle='#8b929c';ctx.fillRect(cx+Math.cos(a)*(r-22)-3,cy+Math.sin(a)*(r-22)-3,6,6);}
  const hh=h0+(h1-h0)*k;const a=ang(hh);ctx.strokeStyle=C.white;ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*r*.5,cy+Math.sin(a)*r*.5);ctx.stroke();const m=(hh%1)*Math.PI*2-Math.PI/2;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(m)*r*.75,cy+Math.sin(m)*r*.75);ctx.stroke();ctx.lineCap='butt';circle(cx,cy,10,C.red);
  const H=Math.floor(hh)%24;mono(String(H).padStart(2,'0')+':00',cx,cy+r+56,{size:40,color:C.white,weight:700});}
function stairs3(t,t0s,sel){const st=[['0–200','650'],['201–500','900'],['501–1000','1 100']];st.forEach((s,i)=>{const e=eo(P(t,t0s[i],.5));if(e<=0)return;const x=150+i*270,w=240,h=(160+i*130)*e,base=1230;const on=i===sel;
  ctx.fillStyle=on?C.yellow:'#2f3742';ctx.fillRect(x,base-h,w,h);txt(s[1],x+w/2,base-h-24,{size:64,color:on?C.yellow:C.white,font:'Osw',alpha:e});mono(s[0],x+w/2,base+40,{size:22,color:'#aab2bd',weight:700});mono('so‘m',x+w/2,base-h+44,{size:22,color:on?'#05070a':'#8b929c',weight:700,alpha:e});});
  mono('KVT·SOAT / OY',540,1310,{size:18,color:'#6f7782',weight:700});}
function acIndoor(cx,cy,s,on,t){ctx.fillStyle='#eef1f5';rrect(cx-200*s,cy-60*s,400*s,120*s,30*s);ctx.fill();ctx.fillStyle='#c6ccd4';ctx.fillRect(cx-180*s,cy+30*s,360*s,10*s);circle(cx+160*s,cy-30*s,6*s,on?C.ok:'#8b929c');
  if(on){for(let i=0;i<5;i++){const u=((t*.8+i/5)%1);ctx.strokeStyle=`rgba(${HOT},${.6*(1-u)})`;ctx.lineWidth=5*s;ctx.beginPath();ctx.moveTo(cx-140*s+i*70*s,cy+60*s+u*140*s);ctx.quadraticCurveTo(cx-120*s+i*70*s,cy+90*s+u*140*s,cx-140*s+i*70*s,cy+120*s+u*140*s);ctx.stroke();}}}
function acOutdoor(cx,cy,s,t){ctx.fillStyle='#cfd6df';rrect(cx-150*s,cy-110*s,300*s,220*s,14*s);ctx.fill();ctx.fillStyle='#2a3038';circle(cx-30*s,cy,80*s,'#2a3038');ctx.save();ctx.translate(cx-30*s,cy);ctx.rotate(t*8);ctx.fillStyle='#8b929c';for(let i=0;i<3;i++){ctx.rotate(2.094);ctx.beginPath();ctx.ellipse(0,-38*s,18*s,36*s,0,0,7);ctx.fill();}ctx.restore();ctx.fillStyle='#8b929c';for(let i=0;i<6;i++)ctx.fillRect(cx+70*s,cy-80*s+i*28*s,60*s,8*s);}
function wall(x,y0,y1){ctx.fillStyle='#3a4049';ctx.fillRect(x-10,y0,20,y1-y0);mono('UY',x-60,y0+30,{size:22,color:'#8b929c',weight:700});mono('KO‘CHA',x+80,y0+30,{size:22,color:'#8b929c',weight:700});}
function hbar(y,label,v,max,col,val,t,t0){const e=eo(P(t,t0,.6));mono(label,150,y-16,{size:26,align:'left',color:'#cfd6df',weight:700});ctx.fillStyle='#262c34';ctx.fillRect(150,y,780,60);ctx.fillStyle=col;ctx.fillRect(150,y,780*v/max*e,60);mono(val,150+780*v/max*e-14,y+42,{size:28,align:'right',color:'#05070a',weight:700,alpha:e});}
function days30(t,t0){const n=Math.round(30*eo(P(t,t0,1.4)));for(let i=0;i<30;i++){const c=i%6,r=Math.floor(i/6);const on=i<n;ctx.fillStyle=on?`rgba(${HOT},.9)`:'#262c34';rrect(220+c*110,770+r*100,90,80,10);ctx.fill();mono(on?'16':String(i+1),265+c*110,820+r*100,{size:24,color:on?'#05070a':'#6f7782',weight:700});}mono('1 KATAK = 1 KUN = 16 KVT·SOAT',540,1290,{size:20,color:'#8b929c',weight:700});}

const IMC={};
function clipAt(t){return CL.find(c=>t>=c.t0&&t<c.t1);}
function frameSrc(c,t){const lt=t-Math.max(0,c.t0);const i=Math.min(c.n,Math.max(1,1+Math.floor(lt*30)));return 'clips/'+c.k+'/'+String(i).padStart(4,'0')+'.jpg';}
async function prep(t){const c=clipAt(t);for(const k in IMC)delete IMC[k];if(!c)return;const src=frameSrc(c,t);const im=new Image();im.src=src;await im.decode().catch(()=>0);IMC[src]=im;}
function drawFull(c,t){const im=IMC[frameSrc(c,t)];if(im)ctx.drawImage(im,0,0,W,H);let g=ctx.createLinearGradient(0,0,0,980);g.addColorStop(0,'rgba(5,7,10,.88)');g.addColorStop(.75,'rgba(5,7,10,.55)');g.addColorStop(1,'rgba(5,7,10,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,980);
  g=ctx.createLinearGradient(0,1450,0,H);g.addColorStop(0,'rgba(5,7,10,0)');g.addColorStop(1,'rgba(5,7,10,.7)');ctx.fillStyle=g;ctx.fillRect(0,1450,W,H-1450);mono('VIDEO: PEXELS',540,1500,{size:16,align:'center',color:'rgba(255,255,255,.55)',weight:700});}
function drawCard(c,t){const im=IMC[frameSrc(c,t)];const e=eo(P(t,c.t0,.3));ctx.save();ctx.globalAlpha*=e;ctx.translate(0,(1-e)*40);ctx.save();rrect(60,770,960,540,28);ctx.clip();if(im)ctx.drawImage(im,60,770,960,540);ctx.restore();ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=3;rrect(60,770,960,540,28);ctx.stroke();
  mono('VIDEO: PEXELS · '+c.cr.toUpperCase(),990,1290,{size:15,align:'right',color:'rgba(255,255,255,.75)',weight:700});ctx.restore();}
function card8(x,y,w,h,col){ctx.fillStyle='rgba(17,21,27,.95)';rrect(x,y,w,h,26);ctx.fill();ctx.strokeStyle=col||'#3a4049';ctx.lineWidth=3;ctx.stroke();}
function snowI(cx,cy,r){ctx.strokeStyle='#cfe8ff';ctx.lineWidth=r*.14;ctx.lineCap='round';for(let i=0;i<3;i++){const a=i*Math.PI/3;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.lineTo(cx-Math.cos(a)*r,cy-Math.sin(a)*r);ctx.stroke();}ctx.lineCap='butt';}
function mp8(cx,cy,w,lo,la){const sx=w/17.5,sy=sx*1.25;return[cx+(lo-64.5)*sx,cy-(la-41.4)*sy];}
const GB='#4f8dff';
function gasMeter(cx,cy,s,val,t){ctx.fillStyle='#d9c27a';rrect(cx-170*s,cy-130*s,340*s,260*s,24*s);ctx.fill();ctx.fillStyle='#b89f55';rrect(cx-150*s,cy-110*s,300*s,220*s,16*s);ctx.fill();
  ctx.fillStyle='#1b2431';rrect(cx-120*s,cy-70*s,240*s,70*s,8*s);ctx.fill();const st=String(Math.floor(val)).padStart(5,'0');for(let i=0;i<5;i++){ctx.fillStyle=i==4?'#3a1414':'#05070a';ctx.fillRect(cx-112*s+i*45*s,cy-62*s,40*s,54*s);txt(st[i],cx-92*s+i*45*s,cy-20*s,{size:40*s,color:i==4?'#ff8a7a':C.white,font:'JBM'});}
  mono('m³',cx,cy+40*s,{size:26*s,color:'#2a3038',weight:700});ctx.fillStyle='#8b929c';ctx.fillRect(cx-200*s,cy+60*s,40*s,20*s);ctx.fillRect(cx+160*s,cy+60*s,40*s,20*s);}
function pairBars(t,t0,a,b){[[a,GB],[b,C.red]].forEach(([r,col],i)=>{const e=eo(P(t,t0+i*.6,.7));const x=230+i*360,base=1190,hmax=380,h=hmax*r[1]/b[1]*e;ctx.fillStyle=col;rrect(x,base-h,260,h,10);ctx.fill();
  txt(r[2],x+130,base-h-24,{size:56,color:col,font:'Osw',alpha:e});mono(r[0],x+130,base+40,{size:22,color:'#cfd6df',weight:700});if(r[3])mono(r[3],x+130,base+70,{size:17,color:'#8b929c',weight:700});});}
const GD='#2fb866';
function cash(cx,base,n,t,t0,col=GD){for(let i=0;i<n;i++){const e=eo(P(t,t0+i*.04,.25));if(e<=0)continue;const y=base-i*14-(1-e)*60;ctx.save();ctx.globalAlpha*=e;ctx.fillStyle=col;rrect(cx-130,y-12,260,14,4);ctx.fill();ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(cx-130,y-12,260,3);ctx.restore();}}
function person(cx,cy,r,ini,col){circle(cx,cy,r,'#1b2431');ctx.strokeStyle=col;ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();ctx.save();ctx.beginPath();ctx.arc(cx,cy,r-6,0,7);ctx.clip();circle(cx,cy-r*.18,r*.34,'#3a4656');ctx.beginPath();ctx.ellipse(cx,cy+r*.75,r*.62,r*.5,0,0,7);ctx.fillStyle='#3a4656';ctx.fill();ctx.restore();txt(ini,cx+r*.62,cy+r*.78,{size:r*.36,color:col,font:'Osw'});}
function profile(name,src,col,t,t0){const e=eo(P(t,t0,.4));ctx.save();ctx.globalAlpha=e;ctx.translate(0,(1-e)*50);card8(160,780,760,260,col);person(300,910,95,name.split(' ').map(w=>w[0]).join(''),col);txt(name,430,900,{size:62,align:'left',font:'Osw'});mono(src,432,950,{size:20,align:'left',color:'#aab2bd',weight:700});ctx.restore();}
function bigNum(s,sub,col,t,t0,y=1200){const e=eo(P(t,t0,.4));txt(s,540,y,{size:130,color:col,font:'Osw',alpha:e,scale:1+.15*(1-e)});if(sub)mono(sub,540,y+56,{size:22,color:'#aab2bd',weight:700,alpha:e});}
function flow(t){const t0=23.8;cash(540,920,16,t,t0);const k=eo(P(t,26.0,1.2));
  [['STUDIYA',260,C.red,22],['SAYT',540,C.red,22],['AKTRISA',820,C.yellow,4]].forEach(([l,x,c,w],i)=>{const y=1180;ctx.strokeStyle=c;ctx.lineWidth=w*k+1;ctx.beginPath();ctx.moveTo(540,960);ctx.quadraticCurveTo(x,1000,x,lerp(960,y-60,k));ctx.stroke();if(k>.9){card8(x-120,y-50,240,90,c);txt(l,x,y+8,{size:38,color:c,font:'Osw'});}});
  mono('SXEMA · ULUSHLAR TAXMINIY',540,1320,{size:20,color:'#8b929c',weight:700});}
function poolDots(t){const n=Math.round(400*eo(P(t,34.7,1.4)));for(let i=0;i<400;i++){const c=i%25,r=Math.floor(i/25);ctx.fillStyle=i<n?'rgba(0,175,240,.85)':'#262c34';ctx.fillRect(190+c*28,800+r*28,18,18);}mono('1 NUQTA ≈ 11 600 AKKAUNT',540,1290,{size:20,color:'#8b929c',weight:700});}
function infinity(cx,cy,s,t){ctx.strokeStyle=C.red;ctx.lineWidth=s*.12;ctx.beginPath();for(let i=0;i<=200;i++){const a=i/200*Math.PI*2;const x=cx+s*Math.cos(a)/(1+Math.sin(a)**2),y=cy+s*Math.sin(a)*Math.cos(a)/(1+Math.sin(a)**2);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();const a=t*2;circle(cx+s*Math.cos(a)/(1+Math.sin(a)**2),cy+s*Math.sin(a)*Math.cos(a)/(1+Math.sin(a)**2),s*.09,C.white);}
const HY=620;

// ===== EPISODE =====
__EPISODE__
// ===== /EPISODE =====
function render(t){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.filter='none';bg(t);grid();
  const sc=S.find(s=>t>=s.t0&&t<s.t1)||S[S.length-1];const a=sc.t0<0?1:eo(P(t,sc.t0,.14));const c=clipAt(t);
  if(c&&c.full){drawFull(c,t);if(c.ov)c.ov(t);}
  else{ctx.save();ctx.globalAlpha=a;ctx.translate(540,1110);ctx.scale(.78,.78);ctx.translate(-540,-1000);if(c&&c.card){drawCard(c,t);if(c.over)sc.d(t);}else sc.d(t);ctx.restore();}
  ctx.save();ctx.globalAlpha=a;if(sc.heads)head(t,sc.heads);ctx.restore();
  for(const ch of CHIPS)if(t>=ch[0]&&t<ch[1])chip(t,ch[0],ch[2],{col:ch[3]||'#3a4049'});
  header(Math.max(0,t));captions(t);
}
window.ready=Promise.all([document.fonts.load('700 40px Osw'),document.fonts.load('600 40px Osw'),document.fonts.load('500 20px JBM'),document.fonts.load('700 20px JBM'),MARK.decode().catch(()=>0),LOGO.decode().catch(()=>0)]);
const mapT=T=>T<CUT0?T:T+(CUT1-CUT0);
window.grab=async(t,q)=>{await prep(t);render(t);return cv.toDataURL('image/jpeg',q||0.9);};
window.grabV=async(T,q)=>grab(mapT(T),q);
