// Episode 007 — Soxta yutuqdan qanday saqlanish
const HDR_SUB='soxta yutuq: himoya';
const CH=[[-1,'SAVOL'],[5.02,'FOSH'],[15.64,'ZARAR'],[22.37,'SXEMA'],[32.67,'HIMOYA'],[55.47,'QOIDA'],[63.45,'SIZ-CHI?'],[67.64,'']];
const CL=[];
function gift(cx,cy,s,crossed){ctx.fillStyle=C.mag;rrect(cx-s,cy-s*.7,s*2,s*1.5,14);ctx.fill();ctx.fillStyle=C.yellow;ctx.fillRect(cx-s*.12,cy-s*.7,s*.24,s*1.5);ctx.fillRect(cx-s,cy-s*.12,s*2,s*.24);
  ctx.strokeStyle=C.yellow;ctx.lineWidth=10;ctx.beginPath();ctx.ellipse(cx-s*.3,cy-s*.85,s*.3,s*.18,0,0,7);ctx.ellipse(cx+s*.3,cy-s*.85,s*.3,s*.18,0,0,7);ctx.stroke();
  if(crossed){ctx.strokeStyle=C.red;ctx.lineWidth=16;ctx.beginPath();ctx.arc(cx,cy,s*1.35,0,7);ctx.moveTo(cx-s*.95,cy-s*.95);ctx.lineTo(cx+s*.95,cy+s*.95);ctx.stroke();}}
function msg(x,y,w,s,col,t,t0){const e=eo(P(t,t0,.3));if(e<=0)return;ctx.save();ctx.globalAlpha*=e;ctx.translate(0,(1-e)*30);ctx.fillStyle=col||'#2a3038';rrect(x,y,w,84,22);ctx.fill();txt(s,x+28,y+56,{size:40,align:'left',font:'Osw',color:C.white});ctx.restore();}
function step(i,lab,col,t,t0,on){const e=eo(P(t,t0,.35));if(e<=0)return;const y=790+i*130;ctx.save();ctx.globalAlpha*=e*(on?1:.45);card8(110,y,860,110,on?col:'#3a4049');circle(180,y+55,34,on?col:'#3a4049');txt(String(i+1),180,y+72,{size:46,font:'Osw',color:'#05070a'});txt(lab,240,y+72,{size:44,align:'left',font:'Osw',color:on?C.white:'#aab2bd'});ctx.restore();}
function endCard(t,t0,q){if(t<t0+3.2){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+3.2,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:5.02,d(t){const sh=t<4?Math.sin(t*40)*6:0;ctx.save();ctx.translate(sh,0);if(t>4)ctx.globalAlpha=1-.65*eo(P(t,4,.3));card8(300,790,480,520,'#3a4049');mono('KIRUVCHI QO‘NG‘IROQ',540,850,{size:22,color:'#aab2bd',weight:700});person(540,960,70,'',C.yellow);txt('TABRIKLAYMIZ!',540,1110,{size:60,font:'Osw',color:C.yellow});mono('SIZ YUTDINGIZ',540,1160,{size:26,color:C.white,weight:700});
   circle(420,1250,36,GD);circle(660,1250,36,C.red);ctx.restore();if(t>4)stamp('SHOSHILMANG',540,1040,t,4.05,C.red);},
   heads:[{t:-1,y:HY,lines:[{s:'SIZ',size:120},{s:'YUTDINGIZMI?',size:140,color:C.yellow}]},{t:4.03,y:HY,lines:[{s:'SHOSHILMANG',size:150,color:C.red}]}]},
 {t0:5.02,t1:15.64,d(t){
   if(t<10.77){card8(160,800,760,330,'#3a4049');mono('IIBB · TOSHKENT VILOYATI',540,860,{size:24,color:'#aab2bd',weight:700});txt('SOXTA',540,980,{size:90,font:'Osw',color:C.red});txt('CALL-MARKAZ',540,1080,{size:80,font:'Osw'});if(t>9.0)stamp('FOSH ETILDI',540,1230,t,9.1,C.yellow);return;}
   person(250,1000,90,'?',C.red);msg(380,860,560,'«Men Uzum vakiliman»','#2a3038',t,10.9);msg(380,990,560,'«Aksiyada yutdingiz!»','#2a3038',t,13.9);mono('ASLIDA — FIRIBGAR',540,1180,{size:30,color:C.red,weight:700,alpha:eo(P(t,12.2,.4))});},
   heads:[{t:5.02,y:HY,lines:[{s:'SENTYABR 2026',size:140}],sub:'IIBB XABARI'},{t:7.97,y:HY,lines:[{s:'SOXTA',size:120},{s:'CALL-MARKAZ',size:140,color:C.red}]},{t:10.77,y:HY,lines:[{s:'«UZUM VAKILI»',size:140,color:C.yellow}],sub:'ASLIDA — FIRIBGAR'}]},
 {t0:15.64,t1:22.37,d(t){if(t<17.99){bigNum('110+','KISHI ALDANGAN',C.red,t,15.7,1080);return;}bigNum('300 MLN+','SO‘M ZARAR',C.red,t,18.0,1080);if(t>20.6)mono('BU — FAQAT BITTA GURUH',540,1260,{size:30,color:C.yellow,weight:700,alpha:eo(P(t,20.6,.4))});},
   heads:[{t:15.64,y:HY,lines:[{s:'110+ KISHI',size:150,color:C.red}]},{t:17.99,y:HY,lines:[{s:'300 MLN+ SO‘M',size:140,color:C.red}],sub:'ZARAR'},{t:20.59,y:HY,lines:[{s:'BITTA GURUH',size:140,color:C.yellow}]}]},
 {t0:22.37,t1:32.67,d(t){gift(300,1020,120,t>30.9);
   if(t>24.5){const k=eo(P(t,24.6,.6));card8(620,880,320,200,GB);mono('KREDIT /',780,960,{size:30,color:C.white,weight:700});mono('NASIYA LIMITI',780,1010,{size:30,color:C.white,weight:700});
     ctx.strokeStyle=C.red;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(780,1100);ctx.quadraticCurveTo(780,1260,lerp(780,520,k),1260);ctx.stroke();if(k>.95)txt('→ FIRIBGAR',540,1320,{size:48,font:'Osw',color:C.red});
}},
   heads:[{t:22.37,y:HY,lines:[{s:'SOVG‘A:',size:120},{s:'MAISHIY TEXNIKA',size:120,color:C.mag}]},{t:24.58,y:HY,lines:[{s:'AVVAL',size:120},{s:'PUL O‘TKAZING',size:130,color:C.red}]},{t:27.26,y:HY,lines:[{s:'KREDIT / NASIYA',size:120,color:C.yellow}],sub:'LIMITIDAN'},{t:30.04,y:HY,lines:[{s:'PUL KETADI…',size:120,color:C.red},{s:'SOVG‘A YO‘Q',size:130}]}]},
 {t0:32.67,t1:55.47,d(t){const cur=t<40.19?0:t<45.23?1:t<49.5?2:3;
   step(0,'PUL SO‘RASHSA — FIRIBGAR',GD,t,34.06,cur==0);step(1,'SHOSHILTIRSA — QO‘YING',GD,t,40.19,cur==1);step(2,'RASMIY ILOVADA TEKSHIRING',GD,t,45.23,cur==2);step(3,'KARTANI AYTMANG',GD,t,49.5,cur==3);},
   heads:[{t:32.67,y:HY,lines:[{s:'HIMOYA',size:150,color:GD}],sub:'4 QOIDA'},{t:34.06,y:HY,lines:[{s:'PUL SO‘RASHSA —',size:120},{s:'FIRIBGAR',size:150,color:C.red}]},{t:37.51,y:HY,lines:[{s:'HAQIQIY AKSIYA',size:120},{s:'PUL SO‘RAMAYDI',size:120,color:GD}]},{t:40.19,y:HY,lines:[{s:'«24 SOAT QOLDI»',size:130,color:C.yellow}],sub:'TELEFONNI QO‘YING'},{t:45.23,y:HY,lines:[{s:'RASMIY ILOVA',size:120},{s:'YOKI SAYT',size:140,color:GD}]},{t:49.5,y:HY,lines:[{s:'KARTA MA’LUMOTI',size:120},{s:'HECH KIMGA',size:140,color:GD}]},{t:53.11,y:HY,lines:[{s:'SHUBHA →',size:120},{s:'BANKKA QO‘NG‘IROQ',size:110,color:GD}]}]},
 {t0:55.47,t1:63.45,d(t){if(t<59.3){txt('?',540,1200,{size:360,font:'Osw',color:C.yellow,alpha:.7+.3*Math.sin(t*5)});return;}
   person(330,1100,110,'',C.mag);bubble(650,890,'Men ham yutdim!',t,59.4,false);if(t>62.2)stamp('TEKSHIRING',650,1150,t,62.3,GD);},
   heads:[{t:55.47,y:HY,lines:[{s:'YUTUQ KATTA =',size:120},{s:'SHUBHA KATTA',size:130,color:C.yellow}]},{t:59.3,y:HY,lines:[{s:'HATTO',size:110},{s:'QAYNONA YUTSA HAM',size:110,color:C.mag}]},{t:62.25,y:HY,lines:[{s:'AVVAL',size:120},{s:'TEKSHIRING',size:150,color:GD}]}]},
 {t0:63.45,t1:999,d(t){endCard(t,63.45,'Ha, menga ham...');},
   heads:[{t:63.45,y:HY,lines:[{s:'SIZGA HAM',size:120},{s:'BO‘LGANMI?',size:140,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[5.02,22.3,'MANBA: IIBB · GAZETA.UZ 30.09.2026',null],[37.51,45.1,'MANBA: UZUM MEDIA',null]];
