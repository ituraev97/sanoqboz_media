// Episode 009 — Agar butun O‘zbekiston uchun bitta qozonda osh pishirilsa
const HDR_SUB='agar bitta qozonda osh';
const CH=[[-1,'SAVOL'],[5.35,'ODAM'],[14.04,'REKORD'],[22.64,'BAROBAR'],[26.42,'RETSEPT'],[32.52,'QOZON'],[44.41,'MAHALLA'],[53.18,'SIZ-CHI?'],[57.66,'']];
const CL=[];
function people(t,t0,n,col){const k=Math.round(n*eo(P(t,t0,1.6)));for(let i=0;i<n;i++){const c=i%20,r=Math.floor(i/20);if(i<k)circle(200+c*36,800+r*36,12,col(i));}}
function plate(cx,cy,r,t,t0){const e=eo(P(t,t0,.4));if(e<=0)return;ctx.save();ctx.globalAlpha*=e;circle(cx,cy,r,'#e8edf3');circle(cx,cy,r*.78,'#cfd6df');
  ctx.fillStyle='#e9c46a';ctx.beginPath();ctx.ellipse(cx,cy,r*.62,r*.45,0,0,7);ctx.fill();const q=rng(5);for(let i=0;i<40;i++){ctx.fillStyle=i%4?'#f4e3b0':'#d9792b';ctx.fillRect(cx-r*.5+q()*r,cy-r*.35+q()*r*.7,9,5);}
  circle(cx+r*.1,cy-r*.05,r*.16,'#7a4a2a');ctx.restore();}
function pots(t,t0,n){const k=eo(P(t,t0,2.2));for(let i=0;i<n;i++){const c=i%16,r=Math.floor(i/16);const on=i/n<k;if(!on)continue;const x=150+c*52,y=820+r*42;ctx.fillStyle='#5a616b';ctx.beginPath();ctx.arc(x,y,18,0,Math.PI);ctx.fill();ctx.fillStyle='#e9c46a';ctx.fillRect(x-18,y-4,36,6);}}
function row(t){const k=eo(P(t,36,3));const n=Math.floor(40*k);for(let i=0;i<n;i++){const x=110+i*21;ctx.fillStyle='#6a717b';ctx.beginPath();ctx.arc(x,1060,10,0,Math.PI);ctx.fill();ctx.fillStyle='#e9c46a';ctx.fillRect(x-10,1057,20,4);}
  ctx.fillStyle='#dfe5ec';ctx.fillRect(110,1120,860*k,4);mono('TOSHKENT',110,1160,{size:22,align:'left',color:'#cfd6df',weight:700});if(t>39.2)txt('≈ 7 KM',540,1260,{size:110,font:'Osw',color:C.yellow,alpha:eo(P(t,39.3,.4))});}
function pools(t){for(let i=0;i<5;i++){const e=eo(P(t,42.6+i*.2,.3));if(e<=0)continue;const x=130+(i%3)*290,y=830+Math.floor(i/3)*230;ctx.save();ctx.globalAlpha*=e;ctx.fillStyle='#0d6fae';rrect(x,y,250,170,10);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=3;for(let l=1;l<5;l++){ctx.beginPath();ctx.moveTo(x+10,y+l*34);ctx.lineTo(x+240,y+l*34);ctx.stroke();}ctx.restore();}
  mono('50 × 25 × 2 M',740,1210,{size:24,color:'#8b929c',weight:700});}
function carrot(cx,cy,s){ctx.fillStyle='#ef8a2b';ctx.beginPath();ctx.moveTo(cx-s*.25,cy-s*.5);ctx.lineTo(cx+s*.25,cy-s*.5);ctx.lineTo(cx,cy+s*.7);ctx.closePath();ctx.fill();ctx.fillStyle=GD;ctx.fillRect(cx-s*.08,cy-s*.75,s*.16,s*.25);}
function endCard(t,t0,q){if(t<t0+2.4){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+2.4,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:5.35,d(t){kazan(540,1060,300,t);mono('1 QOZON · 39,5 MLN ODAM',540,1300,{size:26,color:C.yellow,weight:700});},
   heads:[{t:-1,y:HY,lines:[{s:'BITTA QOZON',size:140,color:C.yellow},{s:'HAMMA UCHUN?',size:130}]},{t:3.94,y:HY,lines:[{s:'QOZON QANDAY',size:120},{s:'BO‘LARDI?',size:140,color:C.yellow}]}]},
 {t0:5.35,t1:14.04,d(t){if(t<8.12){people(t,5.4,260,i=>i%13?'rgba(255,220,180,.9)':C.yellow);mono('1 NUQTA ≈ 152 000 ODAM',540,1300,{size:20,color:'#8b929c',weight:700});return;}
   if(t<10.98){plate(540,1040,210,t,8.2);return;}bigNum('≈11 900 T','OSH',C.yellow,t,11.0,1120);},
   heads:[{t:5.35,y:HY,lines:[{s:'39,5 MLN',size:170,color:C.yellow}],sub:'ODAM'},{t:8.12,y:HY,lines:[{s:'300 GRAMM',size:160}],sub:'BIR LIKOP · TAXMINAN'},{t:10.98,y:HY,lines:[{s:'11 900 TONNA',size:140,color:C.yellow}],sub:'JAMI OSH'}]},
 {t0:14.04,t1:22.64,d(t){kazan(540,1000,220,t);if(t<20.34){if(t>17)bigNum('7 360 KG','GINNES REKORDI · 2017',C.yellow,t,17.1,1220);return;}
   for(let i=0;i<50;i++){const e=eo(P(t,20.4+i*.02,.2));if(e>0)circle(150+(i%25)*32,1180+Math.floor(i/25)*40,12,`rgba(255,220,180,${.9*e})`);}mono('50 OSHPAZ',540,1290,{size:26,color:C.yellow,weight:700});},
   heads:[{t:14.04,y:HY,lines:[{s:'ENG KATTA OSH',size:140}],sub:'TOSHKENT · 2017'},{t:17.06,y:HY,lines:[{s:'7 360 KG',size:170,color:C.yellow}]},{t:19.19,y:HY,lines:[{s:'GINNES',size:130},{s:'REKORDI',size:150,color:C.yellow}]},{t:20.34,y:HY,lines:[{s:'50 OSHPAZ',size:160}]}]},
 {t0:22.64,t1:26.42,d(t){pots(t,22.8,160);mono('1 BELGI ≈ 10 REKORD QOZON',540,1300,{size:20,color:'#8b929c',weight:700});if(t>24.9)stamp('×1 600',540,1080,t,24.95,C.yellow);},
   heads:[{t:22.64,y:HY,lines:[{s:'BIZNING OSH',size:130}],sub:'REKORDDAN'},{t:23.65,y:HY,lines:[{s:'×1 600',size:190,color:C.yellow}],sub:'BAROBAR KATTA'}]},
 {t0:26.42,t1:32.52,d(t){if(t>27.5){hbar(920,'GURUCH',3060,4350,'#f4e3b0','3 000+ T',t,27.6);for(let i=0;i<6;i++)rice(200+i*40,850,14);}if(t>30)hbar(1130,'SABZI',4350,4350,'#ef8a2b','4 300 T',t,30.1);if(t>30)carrot(900,1070,60);},
   heads:[{t:26.42,y:HY,lines:[{s:'REKORD',size:130},{s:'RETSEPTI BILAN',size:120,color:C.yellow}]},{t:27.57,y:HY,lines:[{s:'3 000+ TONNA',size:140}],sub:'GURUCH'},{t:30.04,y:HY,lines:[{s:'4 300 TONNA',size:140,color:'#ef8a2b'}],sub:'SABZI'}]},
 {t0:32.52,t1:44.41,d(t){if(t<35.85){kazan(540,1040,260,t);ctx.strokeStyle=C.yellow;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(260,1230);ctx.lineTo(820,1230);ctx.stroke();txt('4,2 M',540,1300,{size:70,font:'Osw',color:C.yellow,alpha:eo(P(t,33.9,.4))});return;}
   if(t<41.28){row(t);return;}pools(t);},
   heads:[{t:32.52,y:HY,lines:[{s:'4,2 METR',size:170,color:C.yellow}],sub:'REKORD QOZON ENI'},{t:35.85,y:HY,lines:[{s:'1 600 QOZON',size:140},{s:'QATORDA',size:120,color:C.yellow}]},{t:39.24,y:HY,lines:[{s:'≈ 7 KM',size:180,color:C.yellow}]},{t:41.28,y:HY,lines:[{s:'BITTA QOZON =',size:110},{s:'5 TA BASSEYN',size:140,color:GB}],sub:'OLIMPIYA'}]},
 {t0:44.41,t1:53.18,d(t){if(t<49.41){for(let i=0;i<12;i++){const e=eo(P(t,44.6+i*.1,.3));if(e>0){ctx.save();ctx.globalAlpha=e;person(190+(i%6)*140,900+Math.floor(i/6)*170,52,'',i%3?GD:C.yellow);ctx.restore();}}
     carrot(540,1290,70);if(t>47.6){teapot(850,1240,.55,t);}return;}
   kazan(540,1060,250,t,0);txt('?',540,880,{size:200,font:'Osw',color:C.yellow,alpha:.7+.3*Math.sin(t*5)});},
   heads:[{t:44.41,y:HY,lines:[{s:'SABZINI',size:120},{s:'KIM TO‘G‘RAYDI?',size:120,color:'#ef8a2b'}]},{t:45.79,y:HY,lines:[{s:'BUTUN MAHALLA',size:130,color:GD}]},{t:47.69,y:HY,lines:[{s:'CHOY —',size:120},{s:'QO‘SHNI MAHALLA',size:120,color:C.yellow}]},{t:49.41,y:HY,lines:[{s:'QOZONNI',size:120},{s:'KIM YUVADI?',size:140,color:C.yellow}]},{t:50.69,y:HY,lines:[{s:'JAVOB',size:120},{s:'YO‘Q…',size:150,color:C.red}]}]},
 {t0:53.18,t1:999,d(t){endCard(t,53.18,'Xorazm oshi!');},
   heads:[{t:53.18,y:HY,lines:[{s:'QAYSI VILOYAT',size:120},{s:'OSHI?',size:160,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[5.35,10.9,'MANBA: STAT.UZ · 01.10.2026',null],[10.98,14,'39,5 MLN × 0,3 KG ≈ 11 860 T',C.yellow],[14.04,22.5,'MANBA: GUINNESS WORLD RECORDS',null],[22.64,26.3,'11 860 ÷ 7,36 ≈ 1 611',C.yellow],[26.42,32.4,'REKORD RETSEPTI · UZDAILY.UZ',null],[35.85,41.2,'1 611 × 4,2 M ≈ 6,8 KM',C.yellow],[41.28,44.3,'≈12,9 MLN L ÷ 2,5 MLN L ≈ 5',C.yellow]];
