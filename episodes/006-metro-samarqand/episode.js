// Episode 006 — Agar Toshkent metrosi Samarqandgacha bo‘lsa
const HDR_SUB='agar metro samarqandgacha';
const CH=[[-1,'SAVOL'],[7.39,'MASOFA'],[21.11,'2030'],[27.18,'NARX'],[37.4,'YO‘LOVCHI'],[47.8,'VAQT'],[52.8,'QAYNONA'],[57.32,'SIZ-CHI?'],[62.11,'']];
const CL=[];
function track(t){const x0=110,W=860,y=1000;ctx.fillStyle='#262c34';rrect(x0,y,W*eo(P(t,10.4,1.2)),70,12);ctx.fill();
  const n=t<16.8?1:Math.min(4,1+Math.floor((t-16.8)/0.9)+1);for(let i=0;i<n;i++){const e=i==0?eo(P(t,7.5,.8)):eo(P(t,16.8+(i-1)*.9,.6));ctx.fillStyle=i==0?GB:[GB,C.yellow,GD,C.red][i];ctx.globalAlpha=e;rrect(x0+i*W/4+4,y+6,(W/4-8)*e,58,10);ctx.fill();ctx.globalAlpha=1;txt(String(i+1),x0+i*W/4+W/8,y+52,{size:44,font:'Osw',color:'#05070a',alpha:e});}
  mono('TOSHKENT',x0,y-30,{size:24,align:'left',color:'#cfd6df',weight:700});if(t>10.4)mono('SAMARQAND',x0+W,y-30,{size:24,align:'right',color:'#cfd6df',weight:700,alpha:eo(P(t,11,.5))});
  mono('70,5 KM',x0+W/8,y+120,{size:26,color:GB,weight:700});if(t>14.7)mono('282 KM',x0+W*.75,y+120,{size:26,color:C.yellow,weight:700,alpha:eo(P(t,14.8,.4))});}
function endCard(t,t0,q){if(t<t0+3.2){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+3.2,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:7.39,d(t){ctx.save();ctx.translate(540,1040);ctx.scale(.9,.9);metroCar(0,0,t);ctx.restore();txt('M',540,860,{size:90,font:'Osw',color:C.red});},
   heads:[{t:-1,y:HY,lines:[{s:'METRO →',size:130},{s:'SAMARQANDGACHA?',size:130,color:C.yellow}]},{t:3.83,y:HY,lines:[{s:'CHILONZOR →',size:120},{s:'REGISTON',size:150,color:C.yellow}]}]},
 {t0:7.39,t1:21.11,d(t){track(t);if(t>19.6)stamp('4 TA METRO',540,1260,t,19.66,C.yellow);},
   heads:[{t:7.39,y:HY,lines:[{s:'70,5 KM',size:160,color:GB}],sub:'HOZIRGI METRO'},{t:10.36,y:HY,lines:[{s:'TEZYURAR YO‘L',size:130}],sub:'ENG QISQA VARIANT'},{t:14.79,y:HY,lines:[{s:'282 KM',size:170,color:C.yellow}]},{t:16.8,y:HY,lines:[{s:'+3 TA METRO',size:150,color:C.yellow}]},{t:19.66,y:HY,lines:[{s:'JAMI — 4 TA!',size:150,color:C.yellow}]}]},
 {t0:21.11,t1:27.18,d(t){hbar(860,'HOZIR',70.5,282,GB,'70,5',t,21.2);hbar(1010,'2030 REJA',103,282,GD,'103',t,23.0);hbar(1160,'SAMARQANDGACHA',282,282,C.yellow,'282',t,21.4);mono('KM',540,1290,{size:22,color:'#8b929c',weight:700});if(t>25.9)stamp('YETMAYDI',700,1040,t,25.95,C.red);},
   heads:[{t:21.11,y:HY,lines:[{s:'2030-YILGACHA',size:140}],sub:'REJA'},{t:23.02,y:HY,lines:[{s:'103 KM',size:170,color:GD}]},{t:25.95,y:HY,lines:[{s:'BU HAM',size:120},{s:'YETMAYDI',size:150,color:C.red}]}]},
 {t0:27.18,t1:37.4,d(t){pairBars(t,28.3,['METRO',2500,'2 500','KARTADA'],['AFROSIYOB',311000,'311 000','EKONOM']);if(t>34.6)stamp('×124',360,950,t,35.3,C.yellow);},
   heads:[{t:27.18,y:HY,lines:[{s:'ENDI PUL',size:150}]},{t:28.32,y:HY,lines:[{s:'311 000 SO‘M',size:140,color:C.red}],sub:'AFROSIYOB · EKONOM'},{t:31.51,y:HY,lines:[{s:'2 500 SO‘M',size:150,color:GB}],sub:'METRO · KARTADAN'},{t:34.59,y:HY,lines:[{s:'FARQ ×124',size:160,color:C.yellow}]}]},
 {t0:37.4,t1:47.8,d(t){const n=Math.round(260*eo(P(t,37.5,2.5)));for(let i=0;i<260;i++){const c=i%20,r=Math.floor(i/20);if(i<n)circle(200+c*36,820+r*36,11,i%13?'rgba(255,220,180,.9)':C.red);}
   if(t>43.6){const e=eo(P(t,43.7,.5));card8(260,1150,560,130,C.yellow);txt('REGISTON',540,1235,{size:60,font:'Osw',color:C.yellow,alpha:e});}},
   heads:[{t:37.4,y:HY,lines:[{s:'286,8 MLN',size:160,color:C.yellow}],sub:'YO‘LOVCHI · 2025-YIL'},{t:41.44,y:HY,lines:[{s:'785 600',size:160,color:C.yellow}],sub:'KUNIGA'},{t:43.67,y:HY,lines:[{s:'REGISTONDA',size:120},{s:'TIRBANDLIK',size:140,color:C.red}]}]},
 {t0:47.8,t1:52.8,d(t){card8(160,800,760,200,C.red);mono('AFROSIYOB',540,860,{size:26,color:'#aab2bd',weight:700});txt('2 S 13 DAQ',540,960,{size:96,font:'Osw',color:C.red});
   if(t>51.3){card8(160,1060,760,200,GB);mono('METRO',540,1120,{size:26,color:'#aab2bd',weight:700});txt('SEKINROQ…',540,1220,{size:96,font:'Osw',color:GB,alpha:eo(P(t,51.4,.4))});}},
   heads:[{t:47.8,y:HY,lines:[{s:'2 SOAT 13 DAQIQA',size:130,color:C.red}],sub:'AFROSIYOB'},{t:51.4,y:HY,lines:[{s:'METRO',size:120},{s:'SEKINROQ',size:150,color:GB}]}]},
 {t0:52.8,t1:57.32,d(t){person(360,1080,120,'',C.mag);bubble(660,880,'Yakshanba keldim!',t,53.4,false);if(t>55.6){card8(600,1100,320,150,C.yellow);txt('2 500',760,1200,{size:80,font:'Osw',color:C.yellow,alpha:eo(P(t,55.7,.3))});}},
   heads:[{t:52.8,y:HY,lines:[{s:'QAYNONA',size:120},{s:'HAR YAKSHANBA',size:130,color:C.mag}]},{t:55.65,y:HY,lines:[{s:'2 500 SO‘MGA!',size:150,color:C.yellow}]}]},
 {t0:57.32,t1:999,d(t){endCard(t,57.32,'Ha, borardim...');},
   heads:[{t:57.32,y:HY,lines:[{s:'SIZ',size:120},{s:'BORARMIDINGIZ?',size:130,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[7.39,14.7,'MANBA: SPOT.UZ 05.12.2025',null],[14.79,21.0,'MANBA: ADVICE.UZ · 282 ÷ 70,5 = 4',C.yellow],[21.11,27.1,'MANBA: SPOT.UZ · 2030 REJA',null],[28.32,34.5,'MANBA: SPOT.UZ · AFISHA.UZ',null],[34.59,37.3,'311 000 ÷ 2 500 ≈ 124',C.yellow],[37.4,43.6,'MANBA: STAT.UZ · 2025',null],[47.8,51.3,'MANBA: ADVICE.UZ',null]];
