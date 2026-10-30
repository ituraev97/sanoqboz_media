// Episode 001 — Aktrisalar qancha topadi? (reference for new episodes)
const HDR_SUB='aktrisalar qancha topadi?';
const CH=[[-1,'SAVOL'],[5.82,'MIA'],[14.32,'LANA'],[23.63,'PUL QAYERDA'],[27.91,'ONLYFANS'],[44.25,'NARXI'],[54.45,'SIZ-CHI?'],[58.85,'']];
const CL=[];
const S=[
 {t0:-1,t1:5.82,d(t){cash(540,1240,22,t,-0.5);txt('?',540,880,{size:260,color:C.yellow,font:'Osw',alpha:.9});},
   heads:[{t:-1,y:HY,lines:[{s:'MILLIONLAB?',size:150,color:GD}],sub:'AKTRISALAR DAROMADI'},{t:4.10,y:HY,lines:[{s:'RAQAMLARNI',size:120},{s:'KO‘RAMIZ',size:120,color:C.yellow}]}]},
 {t0:5.82,t1:14.32,d(t){profile('MIA KHALIFA','O‘Z SO‘ZLARI · X (TWITTER), BBC 2019',C.mag,t,5.9);if(t>9.4){const v=fmt(12000*eo(P(t,11.6,1.6)));bigNum('$'+v,'BUTUN FAOLIYATI DAVOMIDA',C.yellow,t,9.5);}if(t>13.4)stamp('XOLOS',760,1070,t,13.45,C.red);},
   heads:[{t:5.82,y:HY,lines:[{s:'MIA KHALIFA',size:130,color:C.mag}],sub:'ENG MASHHUR NOMLARDAN BIRI'},{t:9.40,y:HY,lines:[{s:'≈ $12 000',size:150,color:C.yellow}],sub:'JAMI · O‘Z SO‘ZLARI'}]},
 {t0:14.32,t1:23.63,d(t){profile('LANA RHOADES','O‘Z SO‘ZLARI · PODKAST, 2022',C.blue,t,14.4);if(t<19.66){if(t>16)bigNum('$1 200','BITTA SURATGA OLISH',C.yellow,t,16.2);}else bigNum('≈$100 000','SOHANI TARK ETGANDA · HISOBIDA',GD,t,19.8);},
   heads:[{t:14.32,y:HY,lines:[{s:'LANA RHOADES',size:120,color:C.blue}]},{t:16.2,y:HY,lines:[{s:'$1 200',size:160,color:C.yellow}],sub:'BITTA SURATGA OLISH UCHUN'},{t:19.66,y:HY,lines:[{s:'≈ $100 000',size:150,color:GD}],sub:'TARK ETGANDA'}]},
 {t0:23.63,t1:27.91,d(t){flow(t);},
   heads:[{t:23.63,y:HY,lines:[{s:'KATTA PUL',size:120},{s:'KIMGA KETADI?',size:110,color:C.yellow}]},{t:25.88,y:HY,lines:[{s:'STUDIYA VA',size:110},{s:'SAYTLARGA',size:120,color:C.red}]}]},
 {t0:27.91,t1:44.25,d(t){
   if(t<34.57){cash(540,1250,34,t,29.7,'#00aff0');mono('MUXLISLAR TO‘LOVI · 2024',540,1320,{size:20,color:'#8b929c',weight:700});return;}
   if(t<37.34){poolDots(t);return;}
   card8(190,800,700,360,'#00aff0');txt('$5,8 MLRD',540,920,{size:80,color:'#00aff0',font:'Osw'});ctx.fillStyle='#3a4049';ctx.fillRect(260,960,560,4);txt('4,63 MLN',540,1060,{size:80,font:'Osw'});
   if(t>42.68)bigNum('≈ $105 / OY','',C.yellow,t,42.7,1290);else bigNum('≈ $1 250 / YIL','',C.yellow,t,37.6,1290);},
   heads:[{t:27.91,y:HY,lines:[{s:'ONLYFANS',size:150,color:'#00aff0'}]},{t:29.62,y:HY,lines:[{s:'$7,2 MLRD',size:150,color:'#00aff0'}],sub:'MUXLISLAR TO‘LAGAN · 2024'},{t:34.57,y:HY,lines:[{s:'4,6 MLN+',size:150}],sub:'IJODKOR AKKAUNT'},{t:37.34,y:HY,lines:[{s:'O‘RTACHA',size:110},{s:'≈$1 250 / YIL',size:120,color:C.yellow}]},{t:42.68,y:HY,lines:[{s:'≈ $105',size:160,color:C.yellow}],sub:'OYIGA'}]},
 {t0:44.25,t1:49.81,d(t){if(t<46.59){hourglass(540,1060,170,P(t,44.3,2.2),t);return;}infinity(540,1060,300,t);},
   heads:[{t:44.25,y:HY,lines:[{s:'PUL',size:130},{s:'TUGAYDI',size:130,color:C.yellow}]},{t:46.59,y:HY,lines:[{s:'VIDEOLAR —',size:120},{s:'UMRBOD',size:140,color:C.red}]}]},
 {t0:49.81,t1:54.45,d(t){const e=eo(P(t,50,.4));ctx.save();ctx.globalAlpha=e;card8(140,820,800,400,C.mag);person(260,940,70,'MK',C.mag);txt('MIA KHALIFA',360,935,{size:48,align:'left',font:'Osw'});mono('BBC HARDtalk · 2019',362,975,{size:18,align:'left',color:'#aab2bd',weight:700});
   txt('o‘tmishidan',540,1090,{size:56,font:'Osw',color:C.white});txt('afsusda ekanini aytgan',540,1160,{size:56,font:'Osw',color:C.mag});ctx.restore();},
   heads:[{t:49.81,y:HY,lines:[{s:'KEYINCHALIK',size:120},{s:'AFSUSDA',size:130,color:C.mag}]}]},
 {t0:54.45,t1:999,d(t){
   if(t<57.49){const e=eo(P(t,54.6,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
     mono(typed('Arzimaydi, chunki...',t,55.0,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
   const e=eo(P(t,57.5,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();},
   heads:[{t:54.45,y:HY,lines:[{s:'BU PULGA',size:120},{s:'ARZIYDIMI?',size:130,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[9.4,14.2,'MANBA: MIA KHALIFA (X) · BBC HARDtalk 2019',null],[16.2,23.5,'MANBA: LANA RHOADES · BFFs PODKAST 2022',null],[29.62,34.5,'MANBA: ONLYFANS FY2024 HISOBOTI',null],[37.34,44.2,'$5,8 MLRD ÷ 4,63 MLN AKKAUNT',C.yellow]];
