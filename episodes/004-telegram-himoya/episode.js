// Episode 004 — Telegram akkauntni qanday himoyalash
const HDR_SUB='telegram: qanday himoyalanish';
const TG='#2aabee';
const CH=[[-1,'SAVOL'],[5.20,'RAQAMLAR'],[17.39,'XABAR'],[24.25,'TUZOQ'],[36.42,'HIMOYA'],[56.16,'APK'],[61.61,'SIZ-CHI?'],[66.46,'']];
const CL=[];
function plane(cx,cy,s){circle(cx,cy,s,TG);ctx.fillStyle=C.white;ctx.beginPath();ctx.moveTo(cx-s*.5,cy);ctx.lineTo(cx+s*.45,cy-s*.4);ctx.lineTo(cx+s*.25,cy+s*.45);ctx.lineTo(cx-s*.05,cy+s*.15);ctx.closePath();ctx.fill();}
function msg(x,y,w,s,col,t,t0,dark){const e=eo(P(t,t0,.3));if(e<=0)return;ctx.save();ctx.globalAlpha*=e;ctx.translate(0,(1-e)*30);ctx.fillStyle=col||'#2a3038';rrect(x,y,w,84,22);ctx.fill();txt(s,x+28,y+56,{size:40,align:'left',font:'Osw',color:dark?'#05070a':C.white});ctx.restore();}
function step(i,lab,col,t,t0,on){const e=eo(P(t,t0,.35));if(e<=0)return;const y=790+i*130;ctx.save();ctx.globalAlpha*=e*(on?1:.45);card8(110,y,860,110,on?col:'#3a4049');circle(180,y+55,34,on?col:'#3a4049');txt(String(i+1),180,y+72,{size:46,font:'Osw',color:'#05070a'});txt(lab,240,y+72,{size:48,align:'left',font:'Osw',color:on?C.white:'#aab2bd'});ctx.restore();}
function endCard(t,t0,q){if(t<t0+3.2){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+3.2,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:5.20,d(t){plane(540,1000,170);if(t>3.1)padlock(800,1180,120,t,6);else{ctx.save();ctx.globalAlpha=.6+.4*Math.sin(t*8);txt('!',800,1230,{size:200,font:'Osw',color:C.red});ctx.restore();}},
   heads:[{t:-1,y:HY,lines:[{s:'AKKAUNTINGIZ',size:120},{s:'XAVFDAMI?',size:140,color:C.red}],sub:'TELEGRAM'},{t:3.18,y:HY,lines:[{s:'QANDAY',size:120},{s:'HIMOYALANISH',size:120,color:GD}]}]},
 {t0:5.20,t1:17.39,d(t){
   if(t<15.09){const v=fmt(62440*eo(P(t,9.9,1.4)));card8(160,800,760,330,C.red);mono('IIV · 2025-YIL',540,870,{size:24,color:'#aab2bd',weight:700});txt(t<9.9?'…':v,540,1020,{size:150,font:'Osw',color:C.red});mono('KIBERJINOYAT',540,1090,{size:26,color:'#aab2bd',weight:700});return;}
   pairBars(t,15.1,['2021',4865,'4 865',''],['2025',62440,'62 440','']);if(t>15.9)stamp('×11',360,920,t,15.95,C.yellow);},
   heads:[{t:5.20,y:HY,lines:[{s:'IIV MA’LUMOTI',size:130}]},{t:9.96,y:HY,lines:[{s:'62 440',size:170,color:C.red}],sub:'KIBERJINOYAT · 2025'},{t:12.61,y:HY,lines:[{s:'BARCHA TURDAGI',size:110},{s:'KIBERJINOYATLAR',size:110,color:C.red}]},{t:15.09,y:HY,lines:[{s:'4 YILDA ×11',size:150,color:C.yellow}]}]},
 {t0:17.39,t1:24.25,d(t){msg(140,820,560,'«Ovoz bering» → havola','#2a3038',t,20.2);msg(260,950,620,'Sovg‘a yutdingiz!','#2a3038',t,21.3);msg(140,1080,520,'fayl.apk','#3a1414',t,22.5);},
   heads:[{t:17.39,y:HY,lines:[{s:'BITTA XABAR',size:140,color:C.yellow}],sub:'HAMMASI SHUNDAN BOSHLANADI'}]},
 {t0:24.25,t1:36.42,d(t){
   if(t<32.65){card8(160,790,760,470,'#3a4049');ctx.fillStyle='#16202c';rrect(190,815,700,60,14);ctx.fill();mono('te1egram-ovoz.com',540,855,{size:28,color:C.red,weight:700,spacing:0});
     plane(540,950,48);ctx.fillStyle='#0b0f14';rrect(240,1020,600,70,12);ctx.fill();mono(t>26.6?'+998 •• ••• •• ••':'Telefon raqam',540,1066,{size:28,color:'#aab2bd',weight:700,spacing:0});
     ctx.fillStyle='#0b0f14';rrect(240,1110,600,70,12);ctx.fill();mono(t>27.9?'KOD: • • • • •':'Kod',540,1156,{size:28,color:t>27.9?C.yellow:'#aab2bd',weight:700,spacing:0});
     if(t>29.4)stamp('O‘G‘IRLANDI',540,1040,t,29.45,C.red);return;}
   person(260,1000,90,'',C.red);txt('?',260,1020,{size:80,font:'Osw',color:C.red});msg(400,860,560,'Tezda qarz berib tur!','#1f4f8a',t,35.0);mono('DO‘STLARINGIZGA · SIZ NOMINGIZDAN',620,1010,{size:20,color:'#8b929c',weight:700});},
   heads:[{t:24.25,y:HY,lines:[{s:'SOXTA SAYT',size:150,color:C.red}]},{t:26.53,y:HY,lines:[{s:'RAQAM + KOD',size:150,color:C.yellow}]},{t:29.37,y:HY,lines:[{s:'AKKAUNT',size:120},{s:'SIZNIKI EMAS',size:130,color:C.red}]},{t:32.65,y:HY,lines:[{s:'DO‘STLARDAN',size:120},{s:'QARZ SO‘RAYDI',size:120,color:C.red}]}]},
 {t0:36.42,t1:56.16,d(t){const cur=t<42.69?0:t<48.29?1:t<52.24?2:3;
   step(0,'KODNI HECH KIMGA AYTMANG',GD,t,37.84,cur==0);step(1,'IKKI BOSQICHLI TEKSHIRUV',GD,t,42.69,cur==1);step(2,'BEGONA SEANSLARNI O‘CHIRING',GD,t,48.29,cur==2);step(3,'SAYT MANZILINI TEKSHIRING',GD,t,52.24,cur==3);},
   heads:[{t:36.42,y:HY,lines:[{s:'HIMOYA',size:150,color:GD}],sub:'4 QADAM'},{t:37.84,y:HY,lines:[{s:'KOD — FAQAT',size:120},{s:'SIZ UCHUN',size:130,color:GD}],sub:'TELEGRAM FAQ'},{t:42.69,y:HY,lines:[{s:'KOD + PAROL',size:150,color:GD}],sub:'IKKI BOSQICHLI TEKSHIRUV'},{t:48.29,y:HY,lines:[{s:'SOZLAMALAR →',size:110},{s:'QURILMALAR',size:130,color:GD}]},{t:52.24,y:HY,lines:[{s:'MANZILNI',size:120},{s:'TEKSHIRING',size:130,color:GD}],sub:'telegram.org ≠ te1egram'}]},
 {t0:56.16,t1:61.61,d(t){ctx.fillStyle='#e8ecf0';rrect(420,820,240,300,20);ctx.fill();ctx.fillStyle='#c6ccd4';ctx.beginPath();ctx.moveTo(600,820);ctx.lineTo(660,880);ctx.lineTo(600,880);ctx.fill();txt('.APK',540,1010,{size:64,font:'Osw',color:'#05070a'});
   if(t>57.5){ctx.strokeStyle=C.red;ctx.lineWidth=16;ctx.beginPath();ctx.arc(540,970,210,0,7);ctx.moveTo(392,822);ctx.lineTo(688,1118);ctx.stroke();}
   if(t>59.2)msg(300,1215,480,'Qaynona: fayl.apk','#2a3038',t,59.2);},
   heads:[{t:56.16,y:HY,lines:[{s:'APK FAYLNI',size:130},{s:'OCHMANG',size:150,color:C.red}]},{t:59.19,y:HY,lines:[{s:'HATTO',size:120},{s:'QAYNONADAN BO‘LSA HAM',size:100,color:C.yellow}]}]},
 {t0:61.61,t1:999,d(t){endCard(t,61.61,'Ha, yoqqanman...');},
   heads:[{t:61.61,y:HY,lines:[{s:'SIZ YOQQANMISIZ?',size:120,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[9.96,17.3,'MANBA: IIV · GAZETA.UZ 24.12.2025',null],[24.25,36.3,'MANBA: SPOT.UZ · KIBERXAVFSIZLIK',null],[37.84,47.9,'MANBA: TELEGRAM.ORG/FAQ',null]];
