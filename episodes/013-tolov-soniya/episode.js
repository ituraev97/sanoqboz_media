// Episode 013 — Click/Payme: pulingiz 1 soniyada qayerga boradi
const HDR_SUB='pulingiz qayerga boradi';
const CH=[[-1,'SAVOL'],[6.44,'QADAMLAR'],[29.02,'KO‘LAM'],[41.01,'KOMISSIYA'],[50.94,'EHTIYOT'],[58.05,'HAZIL'],[62.25,'SIZ-CHI?'],[66.83,'']];
const CL=[];
function appPhone(t,pressed){const x=360,y=780,w=360,h=560;ctx.fillStyle='#1a1f27';rrect(x-10,y-10,w+20,h+20,46);ctx.fill();ctx.fillStyle='#0e1a2c';rrect(x,y,w,h,38);ctx.fill();
  mono('O‘TKAZMA',x+w/2,y+80,{size:22,color:'#8b929c',weight:700});txt('500 000 so‘m',x+w/2,y+190,{size:56,font:'Osw'});mono('DO‘STIM · 8600 •••• 1234',x+w/2,y+250,{size:18,color:'#aab2bd',weight:700,spacing:0});
  const s=pressed?.94:1+.04*Math.sin(t*7);ctx.save();ctx.translate(x+w/2,y+420);ctx.scale(s,s);ctx.fillStyle=pressed?'#1f8a4d':C.ok;rrect(-130,-44,260,88,20);ctx.fill();txt('O‘tkazish',0,14,{size:40,color:'#05070a',font:'Osw'});ctx.restore();}
const ND=[['ILOVA',270,880,GB],['UZCARD / HUMO',810,880,C.yellow],['SIZNING BANK',270,1220,GD],['DO‘STINGIZ BANKI',810,1220,C.mag]];
function node(i,on){const [l,x,y,col]=ND[i];ctx.save();ctx.globalAlpha*=on?1:.4;card8(x-200,y-70,400,140,on?col:'#3a4049');txt(l,x,y+18,{size:fitSize(l,48,360),font:'Osw',color:on?col:'#aab2bd'});ctx.restore();}
function edge(a,b,t,t0,col){const k=P(t,t0,.8);if(k<=0)return;const [,x1,y1]=ND[a],[,x2,y2]=ND[b];ctx.save();ctx.strokeStyle=col;ctx.lineWidth=6;ctx.setLineDash([14,12]);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x1+(x2-x1)*eo(k),y1+(y2-y1)*eo(k));ctx.stroke();ctx.restore();
  const f=(t*1.2)%1;circle(x1+(x2-x1)*f,y1+(y2-y1)*f,14,col);}
function flowSteps(t){const st=t<12.27?1:t<17.11?2:t<23.57?3:4;
  if(st>=1)edge(0,1,t,6.6,st==1?C.yellow:'#5a616b');if(st>=2)edge(1,2,t,12.4,st==2?C.yellow:'#5a616b');if(st>=3)edge(2,3,t,20.9,st==3?C.yellow:'#5a616b');
  for(let i=0;i<4;i++)node(i,(st==1&&i<2)||(st==2&&(i==1||i==2))||(st==3&&(i==2||i==3))||st==4);
  if(t>15.6&&t<20.9)bubble(540,1060,'Pul bormi?',t,15.7,false);if(t>18.0&&t<20.9)tag('HA · YECHILDI',270,1330,t,18.1,{col:GD,check:1});
  if(st==4){const e=eo(P(t,24.6,.4));ctx.save();ctx.globalAlpha*=e;card8(290,990,500,110,C.ok);mono('SMS: +500 000 so‘m',540,1058,{size:30,color:C.white,weight:700});ctx.restore();}}
function cardsStack(cx,cy,n,t,t0){for(let i=0;i<n;i++){const e=eo(P(t,t0+i*.06,.3));if(e<=0)continue;ctx.save();ctx.globalAlpha*=e;ctx.translate(cx+i*10,cy-i*16);const g=ctx.createLinearGradient(-200,-120,200,120);g.addColorStop(0,i%2?'#2b6cb0':'#1f8a4d');g.addColorStop(1,'#123b6b');ctx.fillStyle=g;rrect(-200,-120,400,240,24);ctx.fill();ctx.fillStyle='#e9c46a';rrect(-150,-60,60,46,8);ctx.fill();ctx.restore();}}
function twoCards(t,t0){person(380,1060,120,'',GB);const e=eo(P(t,t0,.4));ctx.save();ctx.globalAlpha*=e;for(let i=0;i<2;i++){ctx.save();ctx.translate(720+i*40,980+i*90);ctx.rotate(-.1+i*.1);const g=ctx.createLinearGradient(-130,-80,130,80);g.addColorStop(0,i?'#1f8a4d':'#2b6cb0');g.addColorStop(1,'#123b6b');ctx.fillStyle=g;rrect(-130,-80,260,160,18);ctx.fill();ctx.fillStyle='#e9c46a';rrect(-100,-40,44,34,6);ctx.fill();ctx.restore();}ctx.restore();}
function coins(t,t0,n){for(let i=0;i<n;i++){const e=eo(P(t,t0+i*.05,.25));if(e<=0)continue;const c=i%6,r=Math.floor(i/6);circle(330+c*84,1300-r*30-(1-e)*60,34,'#e9c46a');ctx.strokeStyle='#b88a2a';ctx.lineWidth=4;ctx.beginPath();ctx.arc(330+c*84,1300-r*30-(1-e)*60,26,0,7);ctx.stroke();}}
function confirmCard(t){card8(160,790,760,420,t>54.91?C.red:GD);mono('QABUL QILUVCHI',540,860,{size:24,color:'#8b929c',weight:700});
  if(t<54.91){txt('DO‘STIM',540,960,{size:80,font:'Osw',color:C.white});mono('8600 •••• •••• 1234',540,1030,{size:32,color:'#cfd6df',weight:700});if(t>53.0)tag('ISMNI TEKSHIRING',540,1130,t,53.1,{col:GD,check:1});}
  else{txt('BEGONA ODAM',540,960,{size:80,font:'Osw',color:C.red});mono('8600 •••• •••• 1237',540,1030,{size:32,color:C.red,weight:700});tag('1 RAQAM XATO',540,1130,t,55,{col:C.red});}}
function endCard(t,t0,q){if(t<t0+2.4){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+2.4,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const S=[
 {t0:-1,t1:6.44,d(t){appPhone(t,t>1.25&&t<1.6);},
   heads:[{t:-1,y:HY,lines:[{s:'PULINGIZ',size:140},{s:'QAYERGA BORADI?',size:120,color:C.yellow}]},{t:4.53,y:HY,lines:[{s:'BIR NECHA',size:130},{s:'SONIYADA',size:150,color:C.yellow}]}]},
 {t0:6.44,t1:29.02,d(t){flowSteps(t);},
   heads:[{t:6.44,y:HY,lines:[{s:'1-QADAM',size:160,color:C.yellow}],sub:'ILOVA → PROTSESSING'},{t:10.44,y:HY,lines:[{s:'UZCARD',size:130,color:C.yellow},{s:'YOKI HUMO',size:130}]},{t:12.27,y:HY,lines:[{s:'2-QADAM',size:160,color:C.yellow}],sub:'PROTSESSING → SIZNING BANK'},{t:15.67,y:HY,lines:[{s:'PUL BORMI?',size:150,color:C.yellow}]},
     {t:17.11,y:HY,lines:[{s:'3-QADAM',size:160,color:C.yellow}],sub:'BANK SUMMANI YECHADI'},{t:20.89,y:HY,lines:[{s:'DO‘STINGIZ',size:130,color:C.mag},{s:'KARTASIGA',size:130}]},{t:23.57,y:HY,lines:[{s:'4-QADAM',size:160,color:C.yellow}],sub:'IKKALANGIZGA SMS'},{t:26.78,y:HY,lines:[{s:'KO‘Z OCHIB',size:140},{s:'YUMGUNCHA',size:140,color:GD}]}]},
 {t0:29.02,t1:41.01,d(t){if(t<35.52){cardsStack(540,1120,12,t,29.3);return;}if(t<37.82){dotsN(540,1060,40,8,70,'#8b929c',36);mono('1 NUQTA ≈ 1 MLN ODAM',540,1330,{size:22,color:'#8b929c',weight:700});return;}twoCards(t,38.2);},
   heads:[{t:29.02,y:HY,lines:[{s:'TIZIM',size:130},{s:'QANCHALIK KATTA?',size:120,color:C.yellow}]},{t:32.48,y:HY,lines:[{s:'75,7 MLN',size:170,color:GD}],sub:'BANK KARTASI · 01.08.2026'},{t:35.52,y:HY,lines:[{s:'39,5 MLN',size:170}],sub:'AHOLI'},{t:37.82,y:HY,lines:[{s:'1 ODAMGA',size:130},{s:'≈ 2 KARTA',size:160,color:C.yellow}]}]},
 {t0:41.01,t1:50.94,d(t){if(t<45.08){coins(t,41.3,t<43.65?2:30);return;}bars([['PAYNET',1140,C.ok,'1,14 TRLN'],['PAYME',493,GB,'493 MLRD'],['CLICK',438,C.yellow,'438 MLRD']],90,1300,420,1140,t,45.2);},
   heads:[{t:41.01,y:HY,lines:[{s:'KICHIK',size:130},{s:'KOMISSIYA',size:140,color:C.yellow}]},{t:43.65,y:HY,lines:[{s:'LEKIN',size:130},{s:'YIG‘ILSA...',size:150,color:C.yellow}]},{t:45.08,y:HY,lines:[{s:'3 KOMPANIYA',size:120}],sub:'2026 · 1-YARIM YIL DAROMADI'},{t:48.26,y:HY,lines:[{s:'2 TRLN+ SO‘M',size:150,color:GD}],sub:'6 OYDA'}]},
 {t0:50.94,t1:58.05,d(t){confirmCard(t);},
   heads:[{t:50.94,y:HY,lines:[{s:'EHTIYOT',size:130},{s:'BO‘LING',size:150,color:C.red}]},{t:51.95,y:HY,lines:[{s:'ISMNI',size:130},{s:'TEKSHIRING',size:150,color:GD}],sub:'TASDIQLASHDAN OLDIN'},{t:54.91,y:HY,lines:[{s:'1 RAQAM XATO =',size:110},{s:'BEGONA ODAM',size:140,color:C.red}]}]},
 {t0:58.05,t1:62.25,d(t){person(330,1080,120,'',GB);mono('DADAM',330,1260,{size:28,color:GB,weight:700});bubble(640,880,'Keldimi?',t,61.4,false);if(t<61.4)mono('qo‘ng‘iroq...',680,880,{size:30,color:'#8b929c',weight:700,alpha:.5+.5*Math.sin(t*8)});},
   heads:[{t:58.05,y:HY,lines:[{s:'DADAM ESA',size:140}]},{t:60.22,y:HY,lines:[{s:'«KELDIMI?»',size:160,color:C.yellow}]}]},
 {t0:62.25,t1:999,d(t){endCard(t,62.25,'Kuniga besh-oltita...');},
   heads:[{t:62.25,y:HY,lines:[{s:'KUNIGA',size:130},{s:'NECHTA O‘TKAZMA?',size:120,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[6.44,28.9,'SODDALASHTIRILGAN SXEMA',null],[32.48,37.7,'MANBA: MARKAZIY BANK · UZA 23.08.2026',null],[37.82,40.9,'75,7 ÷ 39,5 ≈ 1,9',C.yellow],[45.08,50.8,'MANBA: SPOT.UZ 08.08.2026 · 1,14+0,49+0,44 ≈ 2,07',null]];
