// Episode 005 — Toshkentda kvartira: necha yillik oylik?
const HDR_SUB='kvartira = necha yil?';
const CH=[[-1,'SAVOL'],[5.71,'NARX'],[20.03,'OYLIK'],[30.3,'HISOB'],[40.32,'OVQAT'],[42.21,'REAL'],[47.65,'QAYNONA'],[54.51,'SIZ-CHI?'],[59.68,'']];
const CL=[];
function flat(cx,base,w,h,lit,t){ctx.fillStyle='#1b2431';ctx.fillRect(cx-w/2,base-h,w,h);const cols=5,rows=Math.floor(h/70);for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const on=lit(r,c);ctx.fillStyle=on?C.yellow:'#2e3a4a';ctx.fillRect(cx-w/2+18+c*(w-36)/cols,base-h+18+r*70,(w-36)/cols-14,44);}}
function endCard(t,t0,q){if(t<t0+3.2){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+3.2,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:5.71,d(t){flat(540,1300,420,500,(r,c)=>((r*7+c*3)%5==0)||(t>2&&r==3&&c==2),t);const k=.5+.5*Math.sin(t*4);txt('?',540,1010,{size:220,font:'Osw',color:C.yellow,alpha:.6+.4*k});},
   heads:[{t:-1,y:HY,lines:[{s:'KVARTIRA =',size:130},{s:'NECHA YIL?',size:150,color:C.yellow}],sub:'TOSHKENT · O‘RTACHA OYLIK'},{t:3.57,y:HY,lines:[{s:'HISOBLAYMIZ',size:140,color:GD}]}]},
 {t0:5.71,t1:20.03,d(t){
   if(t<14.18){card8(160,790,760,300,GB);mono('1 m² · TOSHKENT · 1-IYUL 2026',540,850,{size:22,color:'#aab2bd',weight:700});txt(t<11.4?'…':(16.5*eo(P(t,11.4,1.2))).toFixed(1).replace('.',',')+' MLN',540,1000,{size:130,font:'Osw',color:GB});mono('SO‘M · O‘RTACHA',540,1060,{size:24,color:'#aab2bd',weight:700});return;}
   hbar(860,'SHAYXONTOHUR',25.3,25.3,C.red,'25,3',t,14.2);hbar(1010,'O‘RTACHA',16.5,25.3,GB,'16,5',t,14.4);if(t>17.2)hbar(1160,'YANGIHAYOT',11,25.3,GD,'11,0',t,17.25);mono('MLN SO‘M · 1 m²',540,1290,{size:22,color:'#8b929c',weight:700});},
   heads:[{t:5.71,y:HY,lines:[{s:'1 KVADRAT METR',size:130}],sub:'OMMAVIY BAHOLASH MILLIY MARKAZI'},{t:11.41,y:HY,lines:[{s:'16,5 MLN SO‘M',size:150,color:GB}],sub:'1 m² · O‘RTACHA'},{t:14.18,y:HY,lines:[{s:'SHAYXONTOHUR',size:120},{s:'25 MLN',size:140,color:C.red}]},{t:17.24,y:HY,lines:[{s:'YANGIHAYOT',size:120},{s:'11 MLN',size:140,color:GD}]}]},
 {t0:20.03,t1:30.3,d(t){
   if(t<27.14){card8(160,790,760,300,GD);mono('O‘RTACHA OYLIK · TOSHKENT · 2026 I YARIM YIL',540,850,{size:20,color:'#aab2bd',weight:700});txt(t<25.7?'…':fmt(12013900*eo(P(t,25.7,1.1))),540,1000,{size:120,font:'Osw',color:GD});mono('SO‘M',540,1060,{size:24,color:'#aab2bd',weight:700});return;}
   pairBars(t,27.2,['OYLIK',12.0,'12,0 MLN',''],['1 m²',16.5,'16,5 MLN','']);},
   heads:[{t:20.03,y:HY,lines:[{s:'ENDI OYLIK',size:150}],sub:'STATISTIKA QO‘MITASI'},{t:25.71,y:HY,lines:[{s:'12 MLN SO‘M',size:150,color:GD}],sub:'TOSHKENT · O‘RTACHA'},{t:27.14,y:HY,lines:[{s:'1 m² ≈ 1,4 OYLIK',size:140,color:C.yellow}]}]},
 {t0:30.3,t1:40.32,d(t){
   if(t<36.08){const e=eo(P(t,30.4,.5));ctx.save();ctx.globalAlpha=e;ctx.strokeStyle=C.white;ctx.lineWidth=6;ctx.strokeRect(260,800,560,330);ctx.beginPath();ctx.moveTo(540,800);ctx.lineTo(540,1000);ctx.moveTo(260,1000);ctx.lineTo(440,1000);ctx.stroke();mono('XONA',400,910,{size:26,color:'#8b929c',weight:700});mono('XONA',680,910,{size:26,color:'#8b929c',weight:700});txt('60 m²',540,1090,{size:70,font:'Osw',color:C.yellow});ctx.restore();
     if(t>33.5)bigNum('≈ 990 MLN','SO‘M · 60 × 16,5',C.yellow,t,33.57,1250);return;}
   cash(540,1220,Math.min(28,Math.floor((t-36.1)*10)),t,36.1);bigNum('≈ 7 YIL','82 OY · BUTUN OYLIK',C.yellow,t,38.9,1310);},
   heads:[{t:30.3,y:HY,lines:[{s:'2 XONALI',size:130},{s:'60 m²',size:150,color:C.yellow}]},{t:33.57,y:HY,lines:[{s:'≈ 990 MLN SO‘M',size:140,color:C.yellow}],sub:'TAXMINAN'},{t:36.08,y:HY,lines:[{s:'BUTUN OYLIK →',size:120},{s:'QARIYB 7 YIL',size:140,color:C.yellow}]}]},
 {t0:40.32,t1:42.21,d(t){kazan(540,1060,200,t);},
   heads:[{t:40.32,y:HY,lines:[{s:'OVQAT HAM',size:130},{s:'KERAK-KU',size:150,color:C.yellow}]}]},
 {t0:42.21,t1:47.65,d(t){bars([['100% OYLIK',6.9,GD,'≈ 7 YIL'],['1/3 OYLIK',20.6,C.red,'20+ YIL']],90,1270,440,20.6,t,42.4);},
   heads:[{t:42.21,y:HY,lines:[{s:'OYLIKNING',size:120},{s:'UCHDAN BIRI',size:130,color:C.yellow}]},{t:44.34,y:HY,lines:[{s:'20+ YIL',size:170,color:C.red}]},{t:45.92,y:HY,lines:[{s:'20+ YIL',size:170,color:C.red}],sub:'NARXLAR O‘ZGARMASA'}]},
 {t0:47.65,t1:54.51,d(t){house(800,1300,300);person(210,1190,70,'',GB);person(360,1190,70,'',C.mag);person(560,1170,90,'',C.yellow);if(t>51.6)bubble(560,980,'Shoshilmanglar, bolalar!',t,51.6,false);},
   heads:[{t:47.65,y:HY,lines:[{s:'BIRINCHI YILLAR',size:120},{s:'QAYNONA BILAN',size:130,color:C.mag}]},{t:51.58,y:HY,lines:[{s:'QAYNONA',size:120},{s:'XURSAND',size:150,color:C.yellow}]}]},
 {t0:54.51,t1:999,d(t){endCard(t,54.51,'Men ... yilda yig‘aman');},
   heads:[{t:54.51,y:HY,lines:[{s:'SIZ NECHA YILDA?',size:130,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[11.41,19.9,'MANBA: OMMAVIY BAHOLASH MARKAZI · SPOT.UZ',null],[25.71,27.1,'MANBA: STATISTIKA QO‘MITASI · SPOT.UZ',null],[27.14,30.2,'16,5 ÷ 12 ≈ 1,4',C.yellow],[33.57,36.0,'60 × 16,5 = 990 MLN',C.yellow],[36.08,40.2,'990 ÷ 12 ≈ 82 OY ≈ 7 YIL',C.yellow],[44.34,47.5,'990 ÷ 4 ≈ 247 OY ≈ 20,6 YIL',C.yellow]];
