// Episode 010 — SMS-kodni nega hech kimga aytmaslik kerak
const HDR_SUB='sms-kod: himoya';
const CH=[[-1,'SAVOL'],[4.76,'TAJRIBA'],[12.7,'NATIJA'],[21.01,'ZARAR'],[27.58,'QOIDA'],[35.43,'HIMOYA'],[54.81,'HAZIL'],[60.31,'SIZ-CHI?'],[64.11,'']];
const CL=[];
function smsPhone(t){const x=330,y=780,w=420,h=560;ctx.fillStyle='#1a1f27';rrect(x-10,y-10,w+20,h+20,50);ctx.fill();ctx.fillStyle='#0e1a2c';rrect(x,y,w,h,42);ctx.fill();
  mono('BANK',x+40,y+90,{size:22,align:'left',color:'#8b929c',weight:700});const e=eo(P(t,-1,.3));ctx.fillStyle='#2a3038';rrect(x+30,y+120,w-60,190,24);ctx.fill();
  mono('Tasdiqlash kodi:',x+60,y+175,{size:26,align:'left',color:'#cfd6df',weight:700,spacing:0});txt('48 27 19',x+w/2,y+250,{size:70,font:'Osw',color:C.yellow});mono('HECH KIMGA AYTMANG',x+w/2,y+290,{size:18,color:C.red,weight:700});
  if(t>2.3){const k=eo(P(t,2.35,.3));ctx.save();ctx.globalAlpha=k;ctx.fillStyle=C.red;rrect(x+30,y+350,w-60,120,24);ctx.fill();mono('«Kodni ayting, iltimos»',x+w/2,y+420,{size:22,color:C.white,weight:700,spacing:0});ctx.restore();}}
function dots62(t){for(let i=0;i<62;i++){const c=i%11,r=Math.floor(i/11);const e=eo(P(t,12.8+i*.015,.25));if(e<=0)continue;const red=i<28&&t>13.92;circle(190+c*70,830+r*70,24,red?C.red:'#5a616b');}
  if(t>16.7)txt('45%',540,1330,{size:100,font:'Osw',color:C.red,alpha:eo(P(t,16.8,.4))});}
function cardPic(cx,cy,t,t0){const e=eo(P(t,t0,.4));if(e<=0)return;ctx.save();ctx.globalAlpha*=e;const g=ctx.createLinearGradient(cx-260,cy-160,cx+260,cy+160);g.addColorStop(0,'#2b6cb0');g.addColorStop(1,'#123b6b');ctx.fillStyle=g;rrect(cx-260,cy-160,520,320,30);ctx.fill();
  ctx.fillStyle='#e9c46a';rrect(cx-200,cy-90,80,60,10);ctx.fill();mono('8600 •••• •••• 9012',cx,cy+50,{size:34,color:C.white,weight:700});mono('KARTA RAQAMI',cx-200,cy+110,{size:18,align:'left',color:'#cfd6df',weight:700});ctx.restore();}
function step(i,lab,t,t0,on){const e=eo(P(t,t0,.35));if(e<=0)return;const y=800+i*150;ctx.save();ctx.globalAlpha*=e*(on?1:.45);card8(110,y,860,120,on?GD:'#3a4049');circle(180,y+60,34,on?GD:'#3a4049');txt(String(i+1),180,y+77,{size:46,font:'Osw',color:'#05070a'});txt(lab,240,y+78,{size:44,align:'left',font:'Osw',color:on?C.white:'#aab2bd'});ctx.restore();}
function brush(cx,cy,s){ctx.save();ctx.translate(cx,cy);ctx.rotate(-.5);ctx.fillStyle=GB;rrect(-s*1.6,-s*.12,s*2.4,s*.24,s*.12);ctx.fill();ctx.fillStyle='#e8edf3';for(let i=0;i<8;i++)ctx.fillRect(s*.85+i*s*.09,-s*.42,s*.05,s*.32);ctx.fillStyle=GB;ctx.fillRect(s*.8,-s*.12,s*.8,s*.18);ctx.restore();}
function endCard(t,t0,q){if(t<t0+2.4){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+2.4,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:4.76,d(t){smsPhone(t);},
   heads:[{t:-1,y:HY,lines:[{s:'SMS-KODNI',size:130,color:C.yellow},{s:'SO‘RASHSA?',size:140}]},{t:3.66,y:HY,lines:[{s:'NIMA QILASIZ?',size:140,color:C.yellow}]}]},
 {t0:4.76,t1:12.7,d(t){if(t<8.19){card8(160,800,760,300,'#3a4049');mono('ADLIYA VAZIRLIGI',540,870,{size:26,color:'#aab2bd',weight:700});txt('TAJRIBA',540,990,{size:100,font:'Osw'});mono('TOSHKENT · BOZOR',540,1060,{size:24,color:C.yellow,weight:700});return;}
   person(250,1020,90,'',C.yellow);bubble(640,880,'Mashina yutdingiz!',t,8.3,false);if(t>10.7){const e=eo(P(t,10.8,.3));ctx.save();ctx.globalAlpha=e;card8(420,1140,520,130,C.red);txt('KODNI AYTING',680,1225,{size:60,font:'Osw',color:C.red});ctx.restore();}},
   heads:[{t:4.76,y:HY,lines:[{s:'ADLIYA',size:130},{s:'VAZIRLIGI',size:140,color:C.yellow}],sub:'TAJRIBA'},{t:8.19,y:HY,lines:[{s:'«MASHINA',size:130},{s:'YUTDINGIZ!»',size:140,color:C.yellow}]},{t:10.77,y:HY,lines:[{s:'SMS-KODNI',size:120},{s:'AYTING',size:150,color:C.red}]}]},
 {t0:12.7,t1:21.01,d(t){if(t<18.03){dots62(t);return;}person(540,1040,130,'',GB);mono('SHOSHILISH — XAVFLI',540,1260,{size:30,color:C.yellow,weight:700,alpha:eo(P(t,19.4,.4))});},
   heads:[{t:12.7,y:HY,lines:[{s:'62 KISHIDAN',size:150}]},{t:13.92,y:HY,lines:[{s:'28 TASI',size:170,color:C.red}],sub:'KODNI AYTDI'},{t:16.71,y:HY,lines:[{s:'DEYARLI',size:120},{s:'YARMI!',size:170,color:C.red}]},{t:18.03,y:HY,lines:[{s:'AQLSIZ EMAS',size:130},{s:'SHOSHILISHDI',size:130,color:C.yellow}]}]},
 {t0:21.01,t1:27.58,d(t){if(t<25.11){bigNum('≈70 000','KIBERJINOYAT · 2026 · 9 OY',C.red,t,21.1,1100);return;}bigNum('1 TRLN+','SO‘M ZARAR',C.red,t,25.2,1100);},
   heads:[{t:21.01,y:HY,lines:[{s:'9 OYDA',size:150}],sub:'2026-YIL'},{t:22.32,y:HY,lines:[{s:'≈70 000',size:170,color:C.red}],sub:'KIBERJINOYAT'},{t:25.11,y:HY,lines:[{s:'1 TRLN+ SO‘M',size:150,color:C.red}],sub:'ZARAR'}]},
 {t0:27.58,t1:35.43,d(t){cardPic(540,960,t,27.7);if(t>30.1)tag('YETARLI',540,1180,t,30.2,{col:GD,check:1});if(t>32.1){mono('SMS-KOD',540,1280,{size:36,color:'#8b929c',weight:700});ctx.strokeStyle=C.red;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(430,1270);ctx.lineTo(650,1270);ctx.stroke();}
   if(t>33.4)stamp('FIRIBGAR',540,1000,t,33.5,C.red);},
   heads:[{t:27.58,y:HY,lines:[{s:'PUL O‘TKAZISH',size:130},{s:'UCHUN:',size:120,color:'#aab2bd'}]},{t:28.67,y:HY,lines:[{s:'FAQAT',size:120},{s:'KARTA RAQAMI',size:140,color:GD}]},{t:32.11,y:HY,lines:[{s:'KOD',size:130},{s:'KERAK EMAS',size:150,color:C.red}]},{t:33.4,y:HY,lines:[{s:'KOD SO‘RASHSA —',size:110},{s:'FIRIBGAR',size:160,color:C.red}]}]},
 {t0:35.43,t1:54.81,d(t){const cur=t<41.02?0:t<46.08?1:2;step(0,'KODNI HECH KIMGA AYTMANG',t,36.8,cur==0);step(1,'SMS MATNINI O‘QING',t,41.1,cur==1);step(2,'DARHOL BANKKA QO‘NG‘IROQ',t,46.1,cur==2);
   if(t>51.5){const e=eo(P(t,51.6,.4));ctx.save();ctx.globalAlpha=e;card8(110,1250,860,90,C.yellow);mono('TEZ XABAR = PULNI SAQLASH IMKONIYATI',540,1308,{size:26,color:C.yellow,weight:700});ctx.restore();}},
   heads:[{t:35.43,y:HY,lines:[{s:'HIMOYA',size:160,color:GD}],sub:'3 QOIDA'},{t:36.77,y:HY,lines:[{s:'KODNI',size:120},{s:'HECH KIMGA',size:150,color:GD}]},{t:39.19,y:HY,lines:[{s:'KIM BO‘LMASIN',size:140,color:GD}]},{t:41.02,y:HY,lines:[{s:'SMS MATNINI',size:130},{s:'OXIRIGACHA',size:140,color:GD}]},{t:43.98,y:HY,lines:[{s:'KOD NIMA',size:120},{s:'UCHUN KELDI?',size:130,color:C.yellow}]},{t:46.08,y:HY,lines:[{s:'DARHOL',size:130},{s:'BANKKA',size:160,color:GD}]},{t:49.29,y:HY,lines:[{s:'KARTANI',size:130},{s:'BLOKLANG',size:150,color:C.red}]},{t:51.58,y:HY,lines:[{s:'TEZ XABAR',size:140,color:C.yellow}],sub:'PULNI SAQLAB QOLISH IMKONIYATI OSHADI'}]},
 {t0:54.81,t1:60.31,d(t){brush(440,1050,170);if(t>57.2){person(780,1150,80,'',C.mag);bubble(600,860,'Bir martaga beraymi?',t,57.3,false);if(t>59)stamp('YO‘Q!',780,1150,t,59.1,C.red);}},
   heads:[{t:54.81,y:HY,lines:[{s:'SMS-KOD =',size:130},{s:'TISH CHO‘TKASI',size:130,color:GB}]},{t:57.23,y:HY,lines:[{s:'QO‘SHNI BILAN',size:120},{s:'HAM BO‘LISHMANG',size:120,color:C.yellow}]}]},
 {t0:60.31,t1:999,d(t){endCard(t,60.31,'Ha, so‘rashgan...');},
   heads:[{t:60.31,y:HY,lines:[{s:'SIZDAN HAM',size:120},{s:'SO‘RASHGANMI?',size:130,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[4.76,20.9,'MANBA: ADLIYA VAZIRLIGI · ZAMIN.UZ · 28 ÷ 62 ≈ 45%',null],[21.01,27.5,'MANBA: IIV · SPOT.UZ 12.10.2026',null],[27.58,35.3,'MANBA: MARKAZIY BANK · KUN.UZ',null],[51.58,54.7,'MANBA: SPOT.UZ',null]];
