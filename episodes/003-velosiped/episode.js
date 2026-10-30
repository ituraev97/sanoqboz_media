// Episode 003 — Agar hamma velosipedga o‘tsa
const HDR_SUB='agar hamma velosipedga o‘tsa';
const CH=[[-1,'SAVOL'],[5.24,'AHOLI'],[15.75,'MASHINALAR'],[31.39,'ENERGIYA'],[41.65,'BENZIN'],[50.59,'MUAMMO'],[55.78,'SIZ-CHI?'],[60.28,'']];
const CL=[];
function bike(cx,cy,s,t,col=C.yellow,o={}){const r=55*s,sp=t*6;ctx.save();ctx.strokeStyle='#cfd6df';ctx.lineWidth=6*s;
  for(const dx of[-85*s,85*s]){ctx.beginPath();ctx.arc(cx+dx,cy,r,0,7);ctx.stroke();ctx.save();ctx.translate(cx+dx,cy);ctx.rotate(sp);ctx.lineWidth=2*s;for(let i=0;i<4;i++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.moveTo(-r,0);ctx.lineTo(r,0);ctx.stroke();}ctx.restore();}
  ctx.strokeStyle=col;ctx.lineWidth=8*s;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx-85*s,cy);ctx.lineTo(cx-10*s,cy);ctx.lineTo(cx-35*s,cy-75*s);ctx.lineTo(cx-85*s,cy);ctx.moveTo(cx-10*s,cy);ctx.lineTo(cx+55*s,cy-75*s);ctx.lineTo(cx+85*s,cy);ctx.moveTo(cx-35*s,cy-75*s);ctx.lineTo(cx+55*s,cy-75*s);ctx.stroke();
  ctx.strokeStyle='#cfd6df';ctx.beginPath();ctx.moveTo(cx+55*s,cy-75*s);ctx.lineTo(cx+50*s,cy-100*s);ctx.lineTo(cx+75*s,cy-102*s);ctx.moveTo(cx-35*s,cy-75*s);ctx.lineTo(cx-38*s,cy-92*s);ctx.stroke();ctx.fillStyle='#2a3038';rrect(cx-58*s,cy-100*s,44*s,12*s,6*s);ctx.fill();
  if(o.basket){ctx.fillStyle='#c9a46a';rrect(cx+70*s,cy-125*s,60*s,40*s,6*s);ctx.fill();ctx.strokeStyle='#8a6a40';ctx.lineWidth=3*s;for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(cx+70*s+i*15*s,cy-125*s);ctx.lineTo(cx+70*s+i*15*s,cy-85*s);ctx.stroke();}}
  if(o.rack){ctx.fillStyle='#8b929c';ctx.fillRect(cx-110*s,cy-70*s,70*s,8*s);}
  ctx.lineCap='butt';ctx.restore();}
function rider(cx,cy,s,col){circle(cx,cy-180*s,22*s,'#f3dccb');ctx.strokeStyle=col;ctx.lineWidth=14*s;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx-5*s,cy-155*s);ctx.lineTo(cx-25*s,cy-100*s);ctx.lineTo(cx+5*s,cy-50*s);ctx.moveTo(cx-5*s,cy-150*s);ctx.lineTo(cx+50*s,cy-105*s);ctx.stroke();ctx.lineCap='butt';}
function car(x,y,w,col){ctx.fillStyle=col;rrect(x,y-w*.28,w,w*.28,w*.06);ctx.fill();rrect(x+w*.22,y-w*.46,w*.52,w*.22,w*.06);ctx.fill();circle(x+w*.22,y,w*.09,'#111');circle(x+w*.78,y,w*.09,'#111');}
function endCard(t,t0,q){if(t<t0+3.2){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+3.2,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:5.24,d(t){uzMap(540,960,820,{});bike(540,1220,1.1,t);rider(540,1220,1.1,C.blue);},
   heads:[{t:-1,y:HY,lines:[{s:'HAMMA',size:140},{s:'VELOSIPEDDA!',size:130,color:C.yellow}],sub:'AGAR... BIR KUNDA'},{t:4.08,y:HY,lines:[{s:'HISOBLAYMIZ',size:130,color:C.yellow}]}]},
 {t0:5.24,t1:11.08,d(t){const n=Math.round(395*eo(P(t,5.4,1.6)));for(let i=0;i<395;i++){const c=i%25,r=Math.floor(i/25);ctx.fillStyle=i<n?(t>8.2?C.yellow:'rgba(220,230,240,.85)'):'#262c34';ctx.fillRect(190+c*28,790+r*28,18,18);}
   mono(t>8.2?'1 KATAK = 100 000 VELOSIPED':'1 KATAK = 100 000 KISHI',540,1290,{size:22,color:'#8b929c',weight:700});},
   heads:[{t:5.24,y:HY,lines:[{s:'39,5 MLN',size:160}],sub:'AHOLI · 1-OKTYABR 2026'},{t:8.22,y:HY,lines:[{s:'39,5 MLN',size:150,color:C.yellow},{s:'VELOSIPED',size:110}]}]},
 {t0:11.08,t1:15.75,d(t){bike(320,1180,1.05,t,C.mag,{basket:1});rider(320,1180,1.05,C.mag);mono('BUVIJON',320,1290,{size:24,color:C.mag,weight:700});
   if(t>13.0){bike(760,1180,1.05,t,C.blue,{rack:1});rider(760,1180,1.05,C.blue);circle(680,1010,20,'#f3dccb');ctx.fillStyle=C.red;rrect(662,1030,40,70,12);ctx.fill();mono('QAYNONA',760,1290,{size:24,color:C.blue,weight:700});}},
   heads:[{t:11.08,y:HY,lines:[{s:'SAVATCHALI',size:130,color:C.mag}],sub:'BUVIJONLAR UCHUN'},{t:13.02,y:HY,lines:[{s:'ORQA O‘RINDIQ',size:120,color:C.blue}],sub:'QAYNONA UCHUN'}]},
 {t0:15.75,t1:19.68,d(t){const n=Math.round(30*eo(P(t,15.9,1.5)));for(let i=0;i<n;i++){const c=i%6,r=Math.floor(i/6);car(170+c*125,860+r*95,100,i%7?'#8b929c':C.red);}mono('TO‘XTAB QOLDI',540,1310,{size:24,color:C.red,weight:700});},
   heads:[{t:15.75,y:HY,lines:[{s:'4,39 MLN',size:160}],sub:'YENGIL AVTOMOBIL'}]},
 {t0:19.68,t1:28.79,d(t){
   if(t<25.84){const k=eo(P(t,19.8,4.5));for(let i=0;i<7;i++){car(110+i*120*k,1000,100,'#8b929c');}mono('KOBALT = 4,48 M',540,1110,{size:26,color:'#aab2bd',weight:700});
     if(t>22.72)bigNum('≈ 19 700 KM','',C.yellow,t,22.8,1260);return;}
   const cx=540,cy=1050,r=230;glow(cx,cy,r*.9,r*1.2,'70,150,255',.3);circle(cx,cy,r,'#0e2a4a');ctx.strokeStyle='#26507e';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(cx,cy,r,r*.3,0,0,7);ctx.stroke();
   const k=eo(P(t,26,1.6));ctx.strokeStyle=C.yellow;ctx.lineWidth=12;ctx.beginPath();ctx.ellipse(cx,cy,r,r*.3,0,Math.PI*.5,Math.PI*.5+Math.PI*.98*k);ctx.stroke();
   mono('EKVATOR ≈ 40 075 KM',540,1330,{size:22,color:'#8b929c',weight:700});},
   heads:[{t:19.68,y:HY,lines:[{s:'BITTA QATORGA',size:120},{s:'TIZSAK',size:130,color:C.yellow}]},{t:22.72,y:HY,lines:[{s:'≈ 19 700 KM',size:150,color:C.yellow}],sub:'TAXMINAN'},{t:25.84,y:HY,lines:[{s:'YER AYLANASINING',size:100},{s:'DEYARLI YARMI',size:120,color:C.yellow}]}]},
 {t0:28.79,t1:31.39,d(t){ctx.fillStyle='#262c34';ctx.fillRect(60,1080,960,200);ctx.fillStyle=C.yellow;for(let i=0;i<8;i++)ctx.fillRect(80+i*125,1175,70,10);const x=((t*260)%1300)-150;bike(x,1160,.8,t,C.yellow);rider(x,1160,.8,C.blue);},
   heads:[{t:28.79,y:HY,lines:[{s:'TIRBANDLIK',size:130},{s:'YO‘Q',size:150,color:GD}]}]},
 {t0:31.39,t1:41.65,d(t){
   if(t<37.94){bike(540,1120,1.2,t);rider(540,1120,1.2,C.red);mono('70 KG · 30 DAQIQA',540,1250,{size:26,color:'#aab2bd',weight:700});if(t>35.65)stamp('288 KKAL',800,900,t,35.7,C.yellow);return;}
   const n=Math.round(395*eo(P(t,38,1.4)));for(let i=0;i<395;i++){const c=i%25,r=Math.floor(i/25);ctx.fillStyle=i<n?'rgba(255,140,60,.9)':'#262c34';ctx.fillRect(240+c*24,780+r*22,16,15);}
   if(t>39.65)bigNum('11,4 MLRD','KKAL',C.yellow,t,39.7,1270);},
   heads:[{t:31.39,y:HY,lines:[{s:'ENERGIYA',size:150,color:C.red}]},{t:35.65,y:HY,lines:[{s:'288 KKAL',size:160,color:C.yellow}],sub:'30 DAQIQA VELOSIPED'},{t:39.65,y:HY,lines:[{s:'11,4 MLRD',size:150,color:C.yellow}],sub:'KILOKALORIYA · HAMMA BIRDAN'}]},
 {t0:41.65,t1:50.59,d(t){
   if(t<47.87){ctx.fillStyle='#c0392b';rrect(400,860,280,360,30);ctx.fill();ctx.fillStyle='#8e2a20';rrect(580,820,80,60,10);ctx.fill();txt('AI-92',540,1060,{size:64,font:'Osw'});
     if(t<43.7)cross(540,1040,190,eo(P(t,42.4,.4)));else bigNum('1,2 MLN T','2025-YIL · ISHLAB CHIQARILGAN',C.yellow,t,44.8,1300);return;}
   ctx.fillStyle='#c0392b';rrect(440,800,200,260,24);ctx.fill();ctx.fillStyle='#8e2a20';rrect(570,770,56,44,8);ctx.fill();txt('AI-92',540,950,{size:48,font:'Osw'});bigNum('≈ 3 300 T','HAR KUNI',C.yellow,t,47.9,1250);},
   heads:[{t:41.65,y:HY,lines:[{s:'BENZIN',size:140},{s:'KERAK EMAS',size:120,color:GD}]},{t:44.79,y:HY,lines:[{s:'1,2 MLN TONNA',size:130,color:C.yellow}],sub:'2025-YIL'},{t:47.87,y:HY,lines:[{s:'≈ 3 300 T',size:150,color:C.yellow}],sub:'KUNIGA'}]},
 {t0:50.59,t1:55.78,d(t){kazan(790,1150,120,t);bike(330,1230,1.1,t);rider(330,1230,1.1,C.blue);mono('TO‘YDAN QOLGAN OSH',540,1320,{size:22,color:'#8b929c',weight:700});},
   heads:[{t:50.59,y:HY,lines:[{s:'ENG KATTA',size:120},{s:'MUAMMO',size:140,color:C.red}]},{t:52.59,y:HY,lines:[{s:'OSHNI QANDAY',size:120},{s:'OLIB KETAMIZ?',size:120,color:C.yellow}]}]},
 {t0:55.78,t1:999,d(t){endCard(t,55.78,'Men velosipedda...');},
   heads:[{t:55.78,y:HY,lines:[{s:'SIZ BORARMIDINGIZ?',size:110,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[5.24,10.9,'MANBA: STATISTIKA AGENTLIGI · 01.10.2026',null],[15.75,19.6,'MANBA: STAT.UZ · 01.10.2025',null],[22.72,28.7,'4,39 MLN × 4,48 M ≈ 19 700 KM',C.yellow],[35.65,39.6,'MANBA: HARVARD HEALTH',null],[39.65,41.6,'39,5 MLN × 288 KKAL',C.yellow],[44.79,47.8,'MANBA: STAT.UZ',null],[47.87,50.5,'1,2 MLN T ÷ 365 ≈ 3 300 T',C.yellow]];
