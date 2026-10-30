// Episode 002 — Dollar 10 yilda: so‘m bilan nima bo‘ldi?
const HDR_SUB='dollar 10 yilda';
const CH=[[-1,'SAVOL'],[4.54,'2016'],[13.33,'QOG‘OZDA'],[18.29,'5.09.2017'],[33.66,'BUGUN'],[39.74,'10 YILDA'],[44.09,'ONAM'],[48.71,'SIZ-CHI?'],[54.04,'']];
const CL=[];
function bill(cx,cy,s,col,lab){ctx.save();ctx.translate(cx,cy);ctx.fillStyle=col;rrect(-150*s,-70*s,300*s,140*s,12*s);ctx.fill();ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=4*s;rrect(-130*s,-52*s,260*s,104*s,8*s);ctx.stroke();
  txt(lab,0,22*s,{size:64*s,color:'#05070a',font:'Osw'});ctx.restore();}
function endCard(t,t0,q){if(t<t0+3.2){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+3.2,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:4.54,d(t){bill(540,1010,1.6,GD,'$100');const k=.5+.5*Math.sin(t*4);txt('= ?',540,1250,{size:150,color:C.yellow,font:'Osw',alpha:.7+.3*k});},
   heads:[{t:-1,y:HY,lines:[{s:'$100 = ? SO‘M',size:140,color:C.yellow}],sub:'10 YIL OLDIN'}]},
 {t0:4.54,t1:13.33,d(t){card8(160,790,760,250,GB);mono('MARKAZIY BANK · 2016-YIL BOSHI',540,850,{size:22,color:'#aab2bd',weight:700});txt('$1 = '+fmt(2809*eo(P(t,4.7,1.6)))+' so‘m',540,960,{size:88,font:'Osw',color:GB});
   if(t>10.39)bigNum('≈ 280 900','SO‘M · $100 UCHUN',C.yellow,t,10.4,1220);},
   heads:[{t:4.54,y:HY,lines:[{s:'2016-YIL',size:150}],sub:'RASMIY KURS'},{t:7.63,y:HY,lines:[{s:'2 809 SO‘M',size:150,color:GB}],sub:'1 DOLLAR'},{t:10.39,y:HY,lines:[{s:'$100 ≈ 280 900',size:120,color:C.yellow}],sub:'SO‘M'}]},
 {t0:13.33,t1:18.29,d(t){card8(240,800,600,420,'#3a4049');txt('BANK',540,880,{size:64,font:'Osw'});ctx.fillStyle='#16202c';rrect(320,920,440,220,16);ctx.fill();mono('VALYUTA',540,1000,{size:36,color:'#6f7782',weight:700});mono('KASSA',540,1050,{size:36,color:'#6f7782',weight:700});
   if(t>15.6)stamp('ERKIN EMAS',540,1040,t,15.65,C.red);},
   heads:[{t:13.33,y:HY,lines:[{s:'KURS QOG‘OZDA',size:120}]},{t:15.67,y:HY,lines:[{s:'ERKIN SOTUV',size:120},{s:'YO‘Q',size:130,color:C.red}]}]},
 {t0:18.29,t1:29.89,d(t){
   if(t<23.6){const e=eo(P(t,18.4,.4));ctx.save();ctx.globalAlpha=e;card8(300,800,480,440,C.yellow);ctx.fillStyle=C.red;rrect(300,800,480,90,26);ctx.fill();txt('SENTYABR 2017',540,862,{size:44,font:'Osw'});txt('5',540,1150,{size:260,font:'Osw',color:C.yellow});ctx.restore();return;}
   pairBars(t,23.7,['OLDIN',4210,'4 210','4-SENTYABR'],['KEYIN',8100,'8 100','5-SENTYABR']);if(t>28.34)stamp('×2',540,880,t,28.4,C.yellow);},
   heads:[{t:18.29,y:HY,lines:[{s:'5-SENTYABR',size:140,color:C.yellow}],sub:'2017-YIL'},{t:20.94,y:HY,lines:[{s:'VALYUTA ERKIN',size:120},{s:'SOTILA BOSHLANDI',size:100,color:C.yellow}]},{t:23.6,y:HY,lines:[{s:'4 210 → 8 100',size:140,color:C.red}],sub:'BIR KUNDA'},{t:28.34,y:HY,lines:[{s:'DEYARLI ×2',size:150,color:C.yellow}]}]},
 {t0:29.89,t1:33.66,d(t){bill(540,900,1.3,GD,'$100');txt('↓',540,1080,{size:90,color:'#aab2bd',font:'Osw'});bigNum('810 000','SO‘M · 100 × 8 100',C.yellow,t,31.1,1260);},
   heads:[{t:29.89,y:HY,lines:[{s:'$100 =',size:130},{s:'810 000 SO‘M',size:130,color:C.yellow}]}]},
 {t0:33.66,t1:39.74,d(t){card8(160,790,760,250,GD);mono('MARKAZIY BANK · 31-OKTYABR 2026',540,850,{size:22,color:'#aab2bd',weight:700});txt('$1 = '+fmt(12023*eo(P(t,33.7,1.1)))+' so‘m',540,960,{size:84,font:'Osw',color:GD});
   if(t>36.75)bigNum('1 202 346','SO‘M · $100 UCHUN',C.yellow,t,36.8,1220);},
   heads:[{t:33.66,y:HY,lines:[{s:'BUGUN',size:150}],sub:'RASMIY KURS'},{t:34.89,y:HY,lines:[{s:'12 023 SO‘M',size:150,color:GD}],sub:'1 DOLLAR'},{t:36.75,y:HY,lines:[{s:'$100 > 1,2 MLN',size:130,color:C.yellow}],sub:'SO‘M'}]},
 {t0:39.74,t1:44.09,d(t){bars([['2016',2809,GB,'2 809'],['2017',8100,C.red,'8 100'],['2026',12023,C.yellow,'12 023']],90,1260,400,12023,t,39.9);},
   heads:[{t:39.74,y:HY,lines:[{s:'10 YILDA',size:130},{s:'×4,3',size:160,color:C.yellow}]}]},
 {t0:44.09,t1:48.71,d(t){person(300,1120,110,'',C.mag);bubble(620,930,'Dollar necha bo‘ldi?',t,47.1,false);if(t>45.2){sack(800,1260,180,'BOZOR');}},
   heads:[{t:44.09,y:HY,lines:[{s:'ONAMIZNING',size:120},{s:'BIRINCHI SAVOLI',size:110,color:C.mag}]}]},
 {t0:48.71,t1:999,d(t){endCard(t,48.71,'$100 ga men...');},
   heads:[{t:48.71,y:HY,lines:[{s:'SIZ NIMA',size:120},{s:'OLARDINGIZ?',size:130,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[7.63,10.35,'MANBA: MARKAZIY BANK · KUN.UZ',null],[10.39,13.2,'100 × 2 809 = 280 900',C.yellow],[23.6,29.8,'MANBA: MARKAZIY BANK · KUN.UZ 05.09.2017',null],[34.89,39.6,'MANBA: MARKAZIY BANK · SPOT.UZ',null],[39.74,44.0,'12 023 ÷ 2 809 ≈ 4,3',C.yellow]];
