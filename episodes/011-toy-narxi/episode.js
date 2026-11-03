// Episode 011 — To‘y narxi raqamlarda
const HDR_SUB='to‘y narxi raqamlarda';
const CH=[[-1,'SAVOL'],[4.45,'HISOB'],[11.27,'XARAJAT'],[25.74,'JAMI'],[31.48,'DAROMAD'],[41.4,'QARZ'],[44.85,'HAZIL'],[55.31,'SIZ-CHI?'],[59.86,'']];
const CL=[];
function rings(cx,cy,s){ctx.save();ctx.lineWidth=s*.16;ctx.strokeStyle='#e9c46a';ctx.beginPath();ctx.arc(cx-s*.45,cy,s*.62,0,7);ctx.stroke();ctx.strokeStyle='#f3dc9a';ctx.beginPath();ctx.arc(cx+s*.45,cy,s*.62,0,7);ctx.stroke();
  ctx.fillStyle='#8fd0ff';ctx.beginPath();ctx.moveTo(cx-s*.45,cy-s*.95);ctx.lineTo(cx-s*.3,cy-s*.78);ctx.lineTo(cx-s*.45,cy-s*.66);ctx.lineTo(cx-s*.6,cy-s*.78);ctx.fill();ctx.restore();}
function calc(cx,cy,t,val){ctx.fillStyle='#1a1f27';rrect(cx-170,cy-230,340,460,34);ctx.fill();ctx.fillStyle='#0b2a1a';rrect(cx-140,cy-200,280,100,14);ctx.fill();
  mono(val,cx+120,cy-132,{size:44,align:'right',color:C.ok,weight:700,spacing:0});
  for(let r=0;r<4;r++)for(let c=0;c<3;c++){const on=Math.floor(t*4)%12==r*3+c;ctx.fillStyle=on?C.yellow:'#3a4049';rrect(cx-140+c*96,cy-70+r*72,84,60,12);ctx.fill();}}
function bill(t,rows){const x=200,y=780,w=680;const n=rows.filter(r=>t>=r[2]).length;const h=110+Math.max(n,1)*84;ctx.fillStyle='#f3f5f8';rrect(x,y,w,h,18);ctx.fill();
  txt('TO‘Y HISOBI · 100 MEHMON',x+w/2,y+62,{size:40,color:'#05070a',font:'Osw'});ctx.fillStyle='#c6ccd4';ctx.fillRect(x+30,y+86,w-60,3);
  rows.forEach((r,i)=>{if(t<r[2])return;const e=eo(P(t,r[2],.3));const yy=y+150+i*84;mono(r[0],x+34,yy,{size:30,align:'left',color:'#2a3038',weight:700,spacing:0,alpha:e});txt(r[1],x+w-34,yy+6,{size:48,align:'right',color:'#05070a',font:'Osw',alpha:e});});}
function guests(t,t0,n,col){const e=eo(P(t,t0,.8));const k=Math.round(n*e);for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);circle(270+c*60,800+r*52,18,i<k?col:'#2a3038');}}
function months(t,t0,n){for(let i=0;i<24;i++){const c=i%6,r=Math.floor(i/6);const on=i<Math.round(n*eo(P(t,t0+.0,1.6)));ctx.fillStyle=on?(i<12?C.yellow:'#e9a23a'):'#262c34';rrect(210+c*110,800+r*100,90,80,10);ctx.fill();mono(String(i+1),255+c*110,850+r*100,{size:24,color:on?'#05070a':'#6f7782',weight:700});}
  mono('1 KATAK = 1 OYLIK OILA DAROMADI',540,1330,{size:22,color:'#8b929c',weight:700});}
function families(t,t0){for(let i=0;i<4;i++){const e=eo(P(t,t0+i*.15,.3));if(e<=0)continue;ctx.save();ctx.globalAlpha*=e;person(240+i*200,1020,80,'',i==3?C.red:'#5a616b');ctx.restore();}
  if(t>t0+1.2)tag('QARZ',840,1160,t,t0+1.2,{col:C.red});}
function list(t,t0){const x=560,y=790;const n=Math.min(14,Math.floor((t-t0)*4));ctx.fillStyle='#f3f5f8';rrect(x,y,360,90+n*34,14);ctx.fill();mono('MEHMONLAR',x+180,y+52,{size:26,color:'#05070a',weight:700});
  for(let i=0;i<n;i++){ctx.fillStyle=i>5?C.red:'#8b929c';ctx.fillRect(x+30,y+86+i*34,200+((i*53)%100),12);}}
function endCard(t,t0,q){if(t<t0+2.4){const e=eo(P(t,t0+.1,.4));ctx.save();ctx.globalAlpha=e;ctx.fillStyle='rgba(17,21,27,.97)';rrect(120,900,840,170,24);ctx.fill();circle(190,965,30,'#f3dccb');mono('Izoh',240,955,{size:20,align:'left',color:'#8b929c',spacing:0});
  mono(typed(q,t,t0+.5,14)+(Math.floor(t*3)%2?'|':''),240,1022,{size:36,align:'left',color:C.white,weight:700,spacing:0});ctx.restore();return;}
  const e=eo(P(t,t0+2.4,.3));ctx.save();ctx.globalAlpha=e;ctx.fillStyle=C.red;rrect(290,900,500,110,14);ctx.fill();txt('OBUNA BO‘LING',540,975,{size:56,font:'Osw'});ctx.restore();}
const ROWS=[['Restoran',' 50 MLN',14.55],['Libos',' 22 MLN',17.52],['Foto + video',' 14 MLN',20.15],['DJ, bezak, tort...',' 31 MLN',24.35]];
const S=[
 {t0:-1,t1:4.45,d(t){rings(330,1060,120);calc(740,1060,t,'??? MLN');},
   heads:[{t:-1,y:HY,lines:[{s:'TO‘Y',size:150},{s:'QANCHA TURADI?',size:130,color:C.yellow}]},{t:2.39,y:HY,lines:[{s:'HISOBLAYMIZ',size:140,color:C.yellow}],sub:'TOSHKENT · 2026'}]},
 {t0:4.45,t1:11.27,d(t){if(t<7.73){card8(160,820,760,300,'#3a4049');mono('AFISHA.UZ · 2026',540,890,{size:26,color:'#aab2bd',weight:700});txt('TOSHKENT',540,1010,{size:100,font:'Osw'});mono('NARXLARIDA HISOB',540,1080,{size:24,color:C.yellow,weight:700});return;}
   guests(t,7.8,100,GB);if(t>9.3)tag('ENG KATTA XARAJAT — RESTORAN',540,1340,t,9.4,{col:C.red});},
   heads:[{t:4.45,y:HY,lines:[{s:'AFISHA.UZ',size:140,color:C.yellow}],sub:'TOSHKENT NARXLARI'},{t:7.73,y:HY,lines:[{s:'100 MEHMON',size:150}]},{t:9.22,y:HY,lines:[{s:'ENG KATTASI:',size:110},{s:'RESTORAN',size:150,color:C.red}]}]},
 {t0:11.27,t1:25.74,d(t){if(t<14.55){person(400,1050,110,'',GB);bigNum('500 000','SO‘M · 1 MEHMON',C.yellow,t,13.2,1300);txt('×100',720,1080,{size:110,font:'Osw',color:'#aab2bd',alpha:eo(P(t,12.3,.4))});return;}bill(t,ROWS);},
   heads:[{t:11.27,y:HY,lines:[{s:'RESTORAN',size:150,color:C.red}]},{t:13.22,y:HY,lines:[{s:'500 000 SO‘M',size:140,color:C.yellow}],sub:'HAR BIR MEHMONGA'},{t:14.55,y:HY,lines:[{s:'50 MLN',size:170,color:C.red}],sub:'RESTORAN JAMI'},{t:16.26,y:HY,lines:[{s:'LIBOS',size:120},{s:'22 MLN',size:150,color:C.yellow}]},{t:19.02,y:HY,lines:[{s:'FOTO + VIDEO',size:120},{s:'14 MLN',size:150,color:C.yellow}]},{t:21.09,y:HY,lines:[{s:'DJ, BEZAK, TORT',size:110},{s:'+31 MLN',size:150,color:C.yellow}]}]},
 {t0:25.74,t1:31.48,d(t){if(t<28.66){txt('117 MLN',540,1000,{size:130,font:'Osw',color:C.white});if(t>26.59)txt('+10%',540,1180,{size:120,font:'Osw',color:C.yellow,alpha:eo(P(t,26.6,.3))});return;}
   const v=Math.round(129*eo(P(t,28.7,1.2)));calc(540,1020,t,'≈'+v+' MLN');if(t>30.2)stamp('JAMI',800,1250,t,30.25,C.red);},
   heads:[{t:25.74,y:HY,lines:[{s:'EHTIYOT',size:120},{s:'+10%',size:160,color:C.yellow}]},{t:28.66,y:HY,lines:[{s:'≈ 129 MLN',size:170,color:C.red}],sub:'SO‘M · 100 MEHMON'}]},
 {t0:31.48,t1:41.4,d(t){if(t<37.8){card8(160,820,760,330,'#3a4049');mono('«YUKSALISH» SO‘ROVI',540,890,{size:26,color:'#aab2bd',weight:700});
     if(t>35.2){txt('5–12 MLN',540,1030,{size:120,font:'Osw',color:C.yellow,alpha:eo(P(t,35.3,.4))});mono('OILA DAROMADI · OYIGA',540,1100,{size:24,color:'#cfd6df',weight:700});}else{person(540,1020,80,'',GB);}return;}
   months(t,38,24);},
   heads:[{t:31.48,y:HY,lines:[{s:'OILA',size:130},{s:'DAROMADI',size:140,color:C.yellow}]},{t:35.2,y:HY,lines:[{s:'5–12 MLN',size:160,color:C.yellow}],sub:'OYIGA · KO‘PCHILIK OILALAR'},{t:37.8,y:HY,lines:[{s:'1 TO‘Y =',size:130},{s:'1–2 YIL',size:160,color:C.red}],sub:'OILA DAROMADI · TAXMINAN'}]},
 {t0:41.4,t1:44.85,d(t){families(t,41.5);},
   heads:[{t:41.4,y:HY,lines:[{s:'HAR 4-OILA',size:150,color:C.red}],sub:'QARZ OLGAN YOKI OLMOQCHI'}]},
 {t0:44.85,t1:55.31,d(t){if(t<50.99){bars([['100 MEHMON',129,GB,'129 MLN'],['200 MEHMON',198,C.red,'198 MLN']],90,1300,440,198,t,46.3);return;}person(330,1060,120,'',C.mag);mono('QAYNONA',330,1240,{size:28,color:C.mag,weight:700});list(t,51.6);},
   heads:[{t:44.85,y:HY,lines:[{s:'QIZIG‘I',size:150,color:C.yellow}]},{t:46.18,y:HY,lines:[{s:'2× MEHMON',size:130},{s:'1,5× XARAJAT',size:130,color:C.yellow}]},{t:50.99,y:HY,lines:[{s:'QAYNONA',size:130,color:C.mag},{s:'RO‘YXATI',size:130}]},{t:53.05,y:HY,lines:[{s:'KO‘PAYAVERADI',size:140,color:C.red}]}]},
 {t0:55.31,t1:999,d(t){endCard(t,55.31,'Kamtarona to‘y, chunki...');},
   heads:[{t:55.31,y:HY,lines:[{s:'QANCHA',size:120},{s:'SARFLASH KERAK?',size:120,color:C.yellow}],sub:'IZOHDA YOZING'}]},
];
const CHIPS=[[4.45,25.6,'MANBA: AFISHA.UZ · 24.08.2026',null],[25.74,31.4,'117 MLN + 10% ≈ 129 MLN · AFISHA.UZ',C.yellow],[31.48,37.7,'MANBA: «YUKSALISH» SO‘ROVI · 1 247 KISHI',null],[37.8,41.3,'129 ÷ 12 ≈ 11 OY · 129 ÷ 5 ≈ 26 OY',C.yellow],[41.4,44.8,'MANBA: «YUKSALISH» · 25,1%',null],[46.18,50.9,'MANBA: AFISHA.UZ · 200 MEHMON ≈ 198 MLN',null]];
