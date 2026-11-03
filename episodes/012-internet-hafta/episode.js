// Episode 012 — Agar internet bir hafta o‘chsa
const HDR_SUB='agar internet o‘chsa';
const CH=[[-1,'SAVOL'],[5.63,'RAQAMLAR'],[13.5,'1-KUN'],[21.15,'2-KUN'],[33.03,'3-4-KUN'],[44.67,'5-KUN'],[50.31,'7-KUN'],[56.75,'XULOSA'],[62.77,'SIZ-CHI?'],[67.47,'']];
const CL=[];
function wifi(cx,cy,s,col,crossed,t){ctx.save();ctx.lineCap='round';ctx.lineWidth=s*.14;ctx.strokeStyle=col;for(let i=1;i<=3;i++){ctx.beginPath();ctx.arc(cx,cy,s*.33*i,-Math.PI*.75,-Math.PI*.25);ctx.stroke();}circle(cx,cy,s*.1,col);
  if(crossed){ctx.strokeStyle=C.red;ctx.lineWidth=s*.12;ctx.beginPath();ctx.moveTo(cx-s*.8,cy-s*1.1);ctx.lineTo(cx+s*.8,cy+s*.2);ctx.stroke();}ctx.restore();}
function phoneF(cx,cy,w,inner){const h=w*1.9,x=cx-w/2,y=cy-h/2;ctx.fillStyle='#1a1f27';rrect(x-10,y-10,w+20,h+20,44);ctx.fill();ctx.fillStyle='#0e1a2c';rrect(x,y,w,h,36);ctx.fill();ctx.fillStyle='#000';rrect(cx-36,y+14,72,18,9);ctx.fill();if(inner)inner(x,y,w,h);}
function spinner(cx,cy,r,t){ctx.save();ctx.lineWidth=10;ctx.lineCap='round';ctx.strokeStyle=C.blue;ctx.beginPath();ctx.arc(cx,cy,r,t*5,t*5+4.2);ctx.stroke();ctx.restore();}
function pct97(t,t0){const k=Math.round(97*eo(P(t,t0,1.2)));for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);circle(270+c*60,800+r*52,18,i<k?GB:'#3a4049');}}
function payFail(t,t0){const e=eo(P(t,t0,.4));ctx.save();ctx.globalAlpha*=e;const g=ctx.createLinearGradient(280,820,800,1140);g.addColorStop(0,'#2b6cb0');g.addColorStop(1,'#123b6b');ctx.fillStyle=g;rrect(280,820,520,320,30);ctx.fill();
  ctx.fillStyle='#e9c46a';rrect(340,890,80,60,10);ctx.fill();mono('8600 •••• •••• 4417',540,1060,{size:32,color:C.white,weight:700});ctx.restore();
  if(t>t0+.6){const k=eo(P(t,t0+.6,.3));ctx.save();ctx.globalAlpha*=k;card8(240,1180,600,110,C.red);txt('TO‘LOV O‘TMADI',540,1255,{size:56,font:'Osw',color:C.red});ctx.restore();}}
function neighbors(t){house(330,1200,260);house(750,1200,260);if(t>37.9){person(450,1000,60,'',C.yellow);person(630,1000,60,'',C.mag);bubble(540,860,'Assalomu alaykum!',t,38,false);}
  if(t>39.8){for(let i=0;i<3;i++){const x=380+i*160+Math.sin(t*6+i)*20;circle(x,1280,22,[C.blue,C.ok,C.yellow][i]);}}}
function dasturxon(t){ctx.fillStyle='#7a2b2b';rrect(180,1030,720,200,30);ctx.fill();ctx.fillStyle='#a63d3d';rrect(200,1050,680,160,24);ctx.fill();teapot(400,1110,1.1,t);piyola(560,1130,1.2);piyola(660,1130,1.2);
  for(let i=0;i<5;i++)person(220+i*160,900,52,'',i==2?C.mag:'#5a616b');mono('ONA',540,820,{size:26,color:C.mag,weight:700});}
function voiceMsgs(t,t0){const n=Math.min(6,Math.floor((t-t0)*2.2)+1);for(let i=0;i<n;i++){const y=790+i*92;ctx.fillStyle='#1f4f8a';rrect(220,y,640,74,26);ctx.fill();circle(266,y+37,22,C.white);
  ctx.fillStyle='#1f4f8a';ctx.beginPath();ctx.moveTo(259,y+25);ctx.lineTo(277,y+37);ctx.lineTo(259,y+49);ctx.fill();waveBars(540,y+37,380,40,t+i,C.blue,30,.8);mono('0:'+(20+i*7),820,y+46,{size:22,color:'#cfd6df',weight:700});}
  mono('ONAM',540,1360,{size:26,color:C.mag,weight:700});}
function need3(t,t0){[['SVET',0],['SUV',1],['INTERNET',2]].forEach(([l,i])=>{const e=eo(P(t,t0+i*.4,.35));if(e<=0)return;ctx.save();ctx.globalAlpha*=e;const x=250+i*290;card8(x-120,850,240,320,i==2?GB:'#3a4049');
  if(i==0)bulb(x,980,70,1);if(i==1)drop(x,990,50);if(i==2)wifi(x,1030,110,GB,false,t);mono(l,x,1130,{size:26,color:C.white,weight:700});ctx.restore();});}
function endCard(t,t0,q){if(t<t0+2.4){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+2.4,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:5.63,d(t){phoneF(540,1060,300,(x,y,w,h)=>{wifi(540,1080,170,'#5a616b',true,t);mono('INTERNET YO‘Q',540,1200,{size:24,color:C.red,weight:700});});},
   heads:[{t:-1,y:HY,lines:[{s:'INTERNET',size:140},{s:'1 HAFTA O‘CHSA?',size:130,color:C.red}]},{t:4.4,y:HY,lines:[{s:'TASAVVUR',size:130},{s:'QILAMIZ',size:130,color:C.yellow}]}]},
 {t0:5.63,t1:13.5,d(t){if(t<10.39){pct97(t,6.9);return;}wifi(540,1020,260,GB,false,t);bigNum('33,3 MLN','MOBIL INTERNET ABONENTI',C.yellow,t,12.05,1290);},
   heads:[{t:5.63,y:HY,lines:[{s:'10 YOSHDAN',size:120},{s:'KATTALAR',size:120,color:'#aab2bd'}]},{t:6.97,y:HY,lines:[{s:'97%',size:180,color:GB}],sub:'INTERNETDAN FOYDALANADI'},{t:10.39,y:HY,lines:[{s:'MOBIL INTERNET',size:120}]},{t:12.05,y:HY,lines:[{s:'33 MLN',size:170,color:C.yellow}],sub:'ABONENT'}]},
 {t0:13.5,t1:21.15,d(t){phoneF(540,1060,300,(x,y,w,h)=>{mono('LENTA',540,y+80,{size:22,color:'#aab2bd',weight:700});spinner(540,1060,60,t);mono('Yuklanmoqda...',540,1170,{size:22,color:'#8b929c',weight:700});});if(t>20.07)stamp('FOYDASI YO‘Q',540,1250,t,20.1,C.red);},
   heads:[{t:13.5,y:HY,lines:[{s:'1-KUN',size:170,color:C.yellow}]},{t:15.55,y:HY,lines:[{s:'LENTA',size:130},{s:'YANGILANMAYDI',size:130,color:C.red}]},{t:17.5,y:HY,lines:[{s:'O‘CHIRIB-YOQISH',size:130,color:C.yellow}]},{t:20.07,y:HY,lines:[{s:'FOYDASI YO‘Q',size:150,color:C.red}]}]},
 {t0:21.15,t1:33.03,d(t){if(t<23.91){payFail(t,21.3);return;}if(t<29.08){const v=Math.round(387*eo(P(t,24,1.6)));bigNum(v+' TRLN','SO‘M · TERMINALLAR · 2026 · 7 OY',GD,t,24,1100);return;}
   calc7(t);},
   heads:[{t:21.15,y:HY,lines:[{s:'2-KUN',size:170,color:C.yellow}]},{t:22.22,y:HY,lines:[{s:'KARTA TO‘LOVI',size:130},{s:'TO‘XTAYDI',size:140,color:C.red}]},{t:23.91,y:HY,lines:[{s:'7 OYDA',size:130},{s:'387 TRLN SO‘M',size:130,color:GD}]},{t:29.08,y:HY,lines:[{s:'1 HAFTADA',size:120},{s:'≈ 13 TRLN',size:160,color:C.red}],sub:'TO‘LOV KUTIB QOLADI'}]},
 {t0:33.03,t1:44.67,d(t){if(t<36.82){cash(540,1300,20,t,33.8);txt('NAQD?',540,880,{size:120,font:'Osw',color:C.yellow,alpha:eo(P(t,34,.4))});return;}if(t<41.22){neighbors(t);return;}dasturxon(t);},
   heads:[{t:33.03,y:HY,lines:[{s:'3-KUN',size:170,color:C.yellow}]},{t:33.99,y:HY,lines:[{s:'ESKI NAQD',size:130},{s:'PUL QIDIRUVI',size:130,color:C.yellow}]},{t:36.82,y:HY,lines:[{s:'4-KUN',size:170,color:C.yellow}]},{t:37.83,y:HY,lines:[{s:'QO‘SHNILAR',size:130},{s:'TANISHADI',size:130,color:GD}]},{t:39.73,y:HY,lines:[{s:'BOLALAR',size:130},{s:'HOVLIDA',size:130,color:GD}]},{t:41.22,y:HY,lines:[{s:'ONA XURSAND',size:140,color:C.mag}],sub:'HAMMA DASTURXONDA'}]},
 {t0:44.67,t1:50.31,d(t){damas(560,1150,t);if(t>46.8){person(260,960,70,'',C.yellow);ctx.strokeStyle=C.yellow;ctx.lineWidth=14;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(310,930);ctx.lineTo(370,820);ctx.stroke();}},
   heads:[{t:44.67,y:HY,lines:[{s:'5-KUN',size:170,color:C.yellow}]},{t:45.73,y:HY,lines:[{s:'TAKSI?',size:150}]},{t:46.81,y:HY,lines:[{s:'QO‘L',size:130},{s:'KO‘TARASIZ',size:140,color:C.yellow}],sub:'ESKI ZAMONDAGIDEK'}]},
 {t0:50.31,t1:56.75,d(t){if(t<52.82){wifi(540,1100,300,GD,false,t);return;}voiceMsgs(t,52.9);},
   heads:[{t:50.31,y:HY,lines:[{s:'7-KUN',size:170,color:C.yellow}]},{t:51.43,y:HY,lines:[{s:'INTERNET',size:130},{s:'QAYTDI!',size:150,color:GD}]},{t:52.82,y:HY,lines:[{s:'ONAMNING',size:120,color:C.mag},{s:'OVOZLI XABARLARI',size:120}]}]},
 {t0:56.75,t1:62.77,d(t){need3(t,57.2);},
   heads:[{t:56.75,y:HY,lines:[{s:'XULOSA',size:150,color:C.yellow}]},{t:58.11,y:HY,lines:[{s:'QULAYLIK',size:130},{s:'EMAS',size:150,color:C.red}]},{t:60.53,y:HY,lines:[{s:'SVET VA SUV',size:130},{s:'KABI ZARUR',size:130,color:GB}]}]},
 {t0:62.77,t1:999,d(t){endCard(t,62.77,'Ikki kun, keyin...');},
   heads:[{t:62.77,y:HY,lines:[{s:'NECHA KUN',size:130},{s:'CHIDAYSIZ?',size:140,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
function calc7(t){const e=eo(P(t,29.2,.4));card8(140,800,800,360,'#3a4049');mono('387 TRLN ÷ 212 KUN × 7',540,880,{size:30,color:'#aab2bd',weight:700,alpha:e});txt('≈ 13 TRLN',540,1040,{size:130,font:'Osw',color:C.red,alpha:e});mono('BIR HAFTALIK TO‘LOV',540,1110,{size:24,color:'#cfd6df',weight:700,alpha:e});}
const CHIPS=[[5.63,10.3,'MANBA: STATISTIKA QO‘MITASI · 2026, 8 OY',null],[10.39,13.4,'MANBA: STAT.UZ · 01.01.2026',null],[23.91,28.9,'MANBA: MARKAZIY BANK · UZA 23.08.2026',null],[29.08,32.9,'TAXMINIY HISOB · 387 ÷ 212 × 7',C.yellow]];
