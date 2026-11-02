// Episode 008 — «0% nasiya» aslida qancha turadi
const HDR_SUB='0% nasiya: hisob';
const CH=[[-1,'SAVOL'],[4.53,'TADQIQOT'],[13.6,'HISOB'],[20.63,'YASHIRIN'],[27.51,'TAQQOS'],[34.06,'2027'],[43.99,'MASLAHAT'],[50.83,'HAZIL'],[54.83,'SIZ-CHI?'],[58.79,'']];
const CL=[];
function priceTag(cx,cy,s,top,big,col,t,t0){const e=eo(P(t,t0,.4));if(e<=0)return;ctx.save();ctx.globalAlpha*=e;ctx.translate(cx,cy+(1-e)*40);ctx.rotate(-.06);
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-s,-s*.5);ctx.lineTo(s*.7,-s*.5);ctx.lineTo(s,0);ctx.lineTo(s*.7,s*.5);ctx.lineTo(-s,s*.5);ctx.closePath();ctx.fill();circle(s*.62,0,s*.08,'#11151b');
  mono(top,-s*.15,-s*.18,{size:s*.13,color:'#05070a',weight:700});txt(big,-s*.15,s*.3,{size:s*.42,font:'Osw',color:'#05070a'});ctx.restore();}
function months(t,t0){for(let i=0;i<6;i++){const e=eo(P(t,t0+i*.18,.3));if(e<=0)continue;const x=130+(i%3)*280,y=830+Math.floor(i/3)*230;ctx.save();ctx.globalAlpha*=e;card8(x,y,260,200,GB);mono((i+1)+'-OY',x+130,y+50,{size:22,color:'#aab2bd',weight:700});txt('3 665 000',x+130,y+130,{size:50,font:'Osw',color:C.white});mono('SO‘M',x+130,y+172,{size:18,color:'#8b929c',weight:700});ctx.restore();}}
function stack(t){const x=150,W=780,y=930,h=150,max=21.99;const e1=eo(P(t,20.7,.6)),e2=eo(P(t,22.3,.7));
  ctx.fillStyle=GB;ctx.fillRect(x,y,W*14.4/max*e1,h);mono('BOZOR NARXI · 14,4 MLN',x+20,y+h+46,{size:24,align:'left',color:GB,weight:700,alpha:e1});
  if(e2>0){ctx.fillStyle=C.red;ctx.fillRect(x+W*14.4/max,y,W*7.59/max*e2,h);mono('+7,6 MLN',x+W*(14.4+7.59/2)/max,y+h/2+12,{size:30,color:C.white,weight:700,alpha:e2});}
  if(t>25.1){const e=eo(P(t,25.2,.4));ctx.strokeStyle=C.yellow;ctx.lineWidth=5;ctx.setLineDash([14,10]);ctx.strokeRect(x+W*14.4/max-6,y-14,W*7.59/max+12,h+28);ctx.setLineDash([]);mono('YASHIRIN USTAMA',x+W*(14.4+7.59/2)/max,y-34,{size:24,color:C.yellow,weight:700,alpha:e});}
  if(t<22.28){txt('0%',540,1250,{size:150,font:'Osw',color:GD,alpha:eo(P(t,20.7,.4))});}else stamp('+52%',540,1250,t,22.4,C.red);}
function rule(i,s,t,t0){const e=eo(P(t,t0,.35));if(e<=0)return;const y=800+i*170;ctx.save();ctx.globalAlpha*=e;ctx.translate((1-e)*60,0);card8(110,y,860,140,GD);circle(185,y+70,36,GD);
  ctx.strokeStyle='#05070a';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(167,y+70);ctx.lineTo(181,y+86);ctx.lineTo(205,y+56);ctx.stroke();txt(s,250,y+88,{size:46,align:'left',font:'Osw',color:C.white});ctx.restore();}
function shops(t){[['DO‘KON 1','NAQD ?'],['DO‘KON 2','NAQD ?'],['DO‘KON 3','NAQD ?']].forEach((r,i)=>{const e=eo(P(t,44.9+i*.4,.35));if(e<=0)return;const x=120+i*290;ctx.save();ctx.globalAlpha*=e;card8(x,820,260,220,i==1?GD:'#3a4049');mono(r[0],x+130,880,{size:22,color:'#aab2bd',weight:700});txt(r[1],x+130,970,{size:48,font:'Osw',color:i==1?GD:C.white});ctx.restore();});
  mono('BOSHQA DO‘KONLAR',540,1080,{size:20,color:'#8b929c',weight:700});
  if(t>48.3){const e=eo(P(t,48.4,.4));ctx.save();ctx.globalAlpha=e;card8(120,1130,400,160,'#3a4049');mono('OYLIK',320,1180,{size:22,color:'#8b929c',weight:700});txt('3,7 MLN',320,1255,{size:56,font:'Osw',color:'#8b929c'});
    card8(560,1130,400,160,C.yellow);mono('JAMI',760,1180,{size:22,color:C.yellow,weight:700});txt('22 MLN',760,1255,{size:60,font:'Osw',color:C.yellow});ctx.restore();}}
function endCard(t,t0,q){if(t<t0+2.4){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+2.4,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:4.53,d(t){priceTag(540,1040,300,'NASIYA','0%',GD,t,-1);txt('?',860,900,{size:200,font:'Osw',color:C.yellow,alpha:.75+.25*Math.sin(t*5)});},
   heads:[{t:-1,y:HY,lines:[{s:'«0% NASIYA»',size:140,color:GD},{s:'BEPULMI?',size:140}]},{t:2.95,y:HY,lines:[{s:'HISOBLAYMIZ',size:150,color:C.yellow}]}]},
 {t0:4.53,t1:13.6,d(t){if(t<10.56){card8(160,800,760,240,'#3a4049');mono('MARKAZIY BANK',540,870,{size:26,color:'#aab2bd',weight:700});txt('TADQIQOT',540,980,{size:96,font:'Osw'});
     if(t>6.6)priceTag(540,1200,190,'6 OY · USTAMA','0%',C.yellow,t,6.7);return;}months(t,10.6);},
   heads:[{t:4.53,y:HY,lines:[{s:'MARKAZIY BANK',size:140}],sub:'NASIYA SAVDOSI TADQIQOTI'},{t:6.63,y:HY,lines:[{s:'«ORTIQCHA',size:120,color:C.yellow},{s:'TO‘LOVSIZ»',size:130,color:C.yellow}],sub:'6 OYGA'},{t:10.56,y:HY,lines:[{s:'3 665 000',size:160}],sub:'SO‘M · OYIGA'}]},
 {t0:13.6,t1:20.63,d(t){pairBars(t,13.7,['BOZOR NARXI',14.4,'14,4 MLN','O‘RTACHA'],['NASIYA',21.99,'21,99 MLN','6 × 3 665 000']);},
   heads:[{t:13.6,y:HY,lines:[{s:'21 990 000',size:160,color:C.red}],sub:'JAMI · SO‘M'},{t:17.06,y:HY,lines:[{s:'14 400 000',size:160,color:GB}],sub:'BOZORDAGI O‘RTACHA NARX'}]},
 {t0:20.63,t1:27.51,d(t){stack(t);},
   heads:[{t:20.63,y:HY,lines:[{s:'FOIZ YO‘Q…',size:150,color:GD}]},{t:22.28,y:HY,lines:[{s:'+52%',size:180,color:C.red}],sub:'QIMMAT'},{t:25.1,y:HY,lines:[{s:'USTAMA —',size:120},{s:'NARX ICHIDA',size:140,color:C.yellow}]}]},
 {t0:27.51,t1:34.06,d(t){hbar(900,'NASIYA · 12 OY (AYFON)',39.6,45,C.red,'≈40%',t,27.6);if(t>31.4)hbar(1100,'BANK KREDITI',17,45,GB,'17%',t,31.5);},
   heads:[{t:27.51,y:HY,lines:[{s:'+40%',size:180,color:C.red}],sub:'AYFON · 12 OYLIK NASIYA'},{t:31.48,y:HY,lines:[{s:'+17%',size:180,color:GB}],sub:'BANK KREDITI'}]},
 {t0:34.06,t1:43.99,d(t){if(t<37.4){txt('2027',540,1150,{size:280,font:'Osw',color:GD,alpha:eo(P(t,34.2,.5))});mono('1-YANVARDAN',540,1240,{size:30,color:'#cfd6df',weight:700,alpha:eo(P(t,35.4,.4))});return;}
   rule(0,'MAKSIMUM 12 OY',t,37.42);rule(1,'YAKUNIY NARX — SHARTNOMADA',t,38.82);rule(2,'ERTA TO‘LASANGIZ — JARIMASIZ',t,41.44);},
   heads:[{t:34.06,y:HY,lines:[{s:'YAXSHI XABAR',size:150,color:GD}]},{t:35.36,y:HY,lines:[{s:'2027-YILDAN',size:150}],sub:'YANGI QOIDALAR'},{t:38.82,y:HY,lines:[{s:'YAKUNIY NARX',size:130},{s:'ALOHIDA',size:140,color:GD}]},{t:41.44,y:HY,lines:[{s:'MUDDATIDAN OLDIN',size:110},{s:'JARIMA YO‘Q',size:140,color:GD}]}]},
 {t0:43.99,t1:50.83,d(t){if(t<44.85){txt('!',540,1150,{size:300,font:'Osw',color:C.yellow});return;}shops(t);},
   heads:[{t:43.99,y:HY,lines:[{s:'MASLAHAT',size:160,color:C.yellow}]},{t:44.85,y:HY,lines:[{s:'NAQD NARXNI',size:130},{s:'SOLISHTIRING',size:130,color:GD}]},{t:48.33,y:HY,lines:[{s:'OYLIKKA EMAS —',size:110},{s:'JAMI SUMMAGA',size:130,color:C.yellow}]}]},
 {t0:50.83,t1:54.83,d(t){const k=eo(P(t,51.2,1.2));phone(330,1060,{w:200,day:'2027',time:'ESKI',alpha:1-.5*k});if(k>.5){ctx.strokeStyle='#cfd6df';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(270,900);ctx.lineTo(340,1010);ctx.lineTo(300,1100);ctx.lineTo(380,1220);ctx.stroke();}
   if(t>52.8){const e=eo(P(t,52.9,.4));ctx.save();ctx.globalAlpha=e;card8(530,920,420,260,C.red);mono('QARZ',740,990,{size:26,color:'#aab2bd',weight:700});txt('YANGI ✦',740,1100,{size:84,font:'Osw',color:C.red});ctx.restore();}},
   heads:[{t:50.83,y:HY,lines:[{s:'TELEFON',size:120},{s:'ESKIRADI…',size:140,color:'#aab2bd'}]},{t:52.87,y:HY,lines:[{s:'QARZ —',size:120},{s:'HALI YANGI',size:150,color:C.red}]}]},
 {t0:54.83,t1:999,d(t){endCard(t,54.83,'Men nasiyaga...');},
   heads:[{t:54.83,y:HY,lines:[{s:'SIZ NASIYAGA',size:120},{s:'NIMA OLGANSIZ?',size:120,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[4.53,13.5,'MANBA: CBU.UZ · 2024-YIL DEKABR NARXLARI',null],[13.6,20.5,'6 × 3 665 000 = 21 990 000',C.yellow],[20.63,27.4,'21,99 ÷ 14,4 ≈ 1,52 → +52%',C.yellow],[27.51,33.9,'MANBA: CBU.UZ · GAZETA.UZ',null],[34.06,43.9,'MANBA: KUN.UZ 17.08.2026',null]];
