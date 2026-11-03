import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, FPS, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp } from '../lib';
import { Logo, Lockup, Phone, Car, CarFront, Plate, CamPole, Gauge, Packet, Donut, Piyola } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, flight, fmt, flashAt, Road, SmsScreen, Avatar, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';
/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 7.6, .2, .3);
  const aA = env(t, -1, T.tel + .5, .2, .45), aB = env(t, T.tel - .1, 7.6, .4, .3);
  const cp = P(t, -.3, 2.2), cx = lerp(-80, 1180, cp);
  const fl = flashAt(t, T.chirt);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={700} y={900} r={460} a={.8} />
      <Road t={t} y={1080} speed={300} />
      <div style={{ ...abs(640, 660) }}><CamPole h={470} flash={fl} id="p1" /></div>
      {/* speed streaks */}
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>{[0, 1, 2, 3].map((i) => <line key={i} x1={cx - 40 - i * 30} y1={1180 + i * 18} x2={cx - 260 - i * 40} y2={1180 + i * 18} stroke="#fff" strokeOpacity={.25 - i * .05} strokeWidth="4" strokeLinecap="round" />)}</svg>
      <div style={{ ...abs(cx, 1110) }}><Car w={420} wheel={t * 900} id="c1" /></div>
      <Pill s="chirt!" x={760} y={600} a={env(t, T.chirt, T.tel + .4, .15, .3)} size={32} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.tel, 7.6), 1, 1.06)}>
      <Glow x={CX} y={1000} r={520} a={.9} />
      <div style={{ ...abs(CX - 160, 690 + (1 - eout(P(t, T.tel - .1, T.tel + .5))) * 160) }}>
        <Phone w={320} glow={env(t, T.jarima, 7.6, .2, .5)} id="p1"><SmsScreen t={t} t0={T.jarima - .1} from="xabar" title="JARIMA" body="Tezlik oshirildi · +18 km/soat" sum="440 000 so‘m" /></Phone>
      </div>
    </Layer>
    <Head t={t} t0={-1} t1={T.bu - .1} y={490} lines={[['«chirt» — va'], ['jarima', 'y']]} size={80} />
    <Head t={t} t0={T.bu - .1} t1={7.6} y={490} lines={[['1 soniyada'], ['nima bo‘ladi?', 'y']]} size={64} />
    <div style={{ position: 'absolute', inset: 0, background: '#fffbe8', opacity: fl * .22 }} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 7.45, 17.65, .3, .3);
  const src: [number, number] = [158, 712], car: [number, number] = [560, 1130];
  const dx = car[0] - src[0], dy = car[1] - src[1], L = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
  const out = P(t, T.yubor - .3, T.yubor), back = P(t, T.qaytib - .2, T.qaytib + .1);
  const comp = eio(P(t, T.tez, T.ozgar + .3));
  const arcs = (cxy: [number, number], dir: number, spacing: number, sp: number, col: string, alpha: number, key: string) => {
    if (alpha <= 0) return null;
    const n = Math.ceil(L / spacing) + 1;
    return Array.from({ length: n }, (_, k) => {
      const r = ((t * sp + k * spacing) % (spacing * n));
      if (r > L - 30 || r < 20) return null;
      const a0 = dir - .28, a1 = dir + .28;
      const p0 = [cxy[0] + r * Math.cos(a0), cxy[1] + r * Math.sin(a0)], p1 = [cxy[0] + r * Math.cos(a1), cxy[1] + r * Math.sin(a1)];
      return <path key={key + k} d={`M${p0[0]} ${p0[1]} A ${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`} stroke={col} strokeWidth="7" fill="none" strokeLinecap="round" opacity={alpha * (1 - r / L * .6)} />;
    });
  };
  const sp = Math.round(78 * eio(P(t, T.tezlik - .1, T.hisob + .2)));
  const cxx = car[0] - 20 + Math.sin(t * 2) * 8;
  return <Layer a={a} z={logZ(P(t, 7.45, 17.6), 1, 1.05)}>
    <Glow x={360} y={920} r={520} a={.8} col={back > 0 ? '91,140,255' : '246,185,59'} />
    <Road t={t} y={1060} speed={-120} />
    <div style={{ ...abs(70, 650) }}><CamPole h={460} id="p2" /></div>
    <div style={{ ...abs(cxx, 1095), scale: '-1 1' }}><Car w={380} wheel={-t * 500} id="c2" col={['#ffd9a0', '#c27a1c']} /></div>
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
      {arcs(src, ang, 64, 160, Y, out, 'o')}
      {arcs(car, ang + Math.PI, lerp(64, 34, comp), 160, BLUE, back, 'b')}
    </svg>
    <Pill s="yuborildi →" x={430} y={780} a={env(t, T.yubor, T.tez, .25, .3)} size={26} />
    <Pill s="← qaytdi" x={300} y={1010} a={env(t, T.qaytib, 17.6, .25, .3)} size={26} col={BLUE} dark />
    <Pill s="to‘lqin siqildi" x={720} y={900} a={env(t, T.ozgar - .2, 17.6, .25, .3)} size={26} col={ICE} dark />
    <Head t={t} t0={7.45} t1={T.qaytib - .1} y={490} lines={[['radar', 'y']]} size={110} from="slam" />
    <Head t={t} t0={T.qaytib - .1} t1={T.tezlik - .15} y={490} lines={[['to‘lqin'], ['qaytadi', 'y']]} size={64} />
    <Head t={t} t0={T.tezlik - .15} t1={17.6} y={490} lines={[['farq ='], ['tezlik', 'y']]} size={64} />
    <Card x={CX - 190} y={1265} w={380} a={eout(P(t, T.tezlik - .1, T.tezlik + .3))}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 12, padding: '14px 0' }}>
        <span style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 64, color: Y }}>{sp}</span><span style={{ fontFamily: MONO, fontSize: 24, color: GR }}>km/soat · misol</span>
      </div>
    </Card>
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.55, 24.65, .3, .3);
  const aA = env(t, 17.55, T.baza - .05, .3, .3), aB = env(t, T.baza - .2, 24.65, .3, .3);
  const fl = flashAt(t, T.surat);
  const plate = '01S 404 BZ';
  const rp = P(t, T.harf - .45, T.harf + .9), shown = t < T.dastur ? 99 : 2 + Math.floor(rp * 9), box = rp > 0 && rp < 1 ? shown : -1;
  const pk = eout(P(t, T.dastur - .2, T.dastur + .3));
  const scan = P(t, T.baza, T.kim);
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 17.55, 22.4), 1, 1.05)}>
      <Glow x={CX} y={880} r={520} a={.85} />
      <Card x={SL + 50} y={650} w={SR - SL - 100} a={eout(P(t, 17.55, 18.1))} style={{ background: 'linear-gradient(180deg,#232836,#11141b)', scale: String(lerp(1.06, 1, eout(P(t, T.surat, T.surat + .4)))) }}>
        <div style={{ padding: '22px 0 26px', display: 'grid', placeItems: 'center' }}>
          <CarFront w={520} plate={<Plate s={40} chars={plate} />} />
        </div>
        {/* viewfinder corners */}
        <svg width={SR - SL - 100} height={420} style={{ position: 'absolute', left: 0, top: 0 }}>
          {[[18, 18, 1, 1], [742, 18, -1, 1], [18, 380, 1, -1], [742, 380, -1, -1]].map(([x, y, sx, sy], i) => <path key={i} d={`M${x} ${y + 40 * sy} L ${x} ${y} L ${x + 40 * sx} ${y}`} stroke={RED} strokeWidth="5" fill="none" />)}
          <circle cx="40" cy="40" r="8" fill={RED} opacity={.5 + .5 * Math.sin(t * 8)} /><text x="56" y="47" fontFamily="JBM, monospace" fontSize="20" fill={RED}>REC</text>
          <text x="740" y="47" textAnchor="end" fontFamily="JBM, monospace" fontSize="20" fill={GR}>08:41:57</text>
        </svg>
      </Card>
      {pk > 0 && <div style={{ position: 'absolute', left: CX, top: 1200, translate: '-50% -50%', opacity: pk, scale: String(lerp(.7, 1, eback(pk))) }}><Plate s={104} chars={plate} shown={shown} box={box} /></div>}
      <Pill s="dastur o‘qiydi" x={CX} y={1330} a={env(t, T.harf, T.baza, .25, .25)} size={26} dark col={BLUE} />
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: fl * .55 }} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={900} r={520} a={.8} col={scan >= 1 ? '61,220,132' : '91,140,255'} />
      <Card x={SL + 60} y={680} w={SR - SL - 120} style={{ scale: String(lerp(.9, 1, eback(P(t, T.baza - .2, T.baza + .4)))) }}>
        <div style={{ padding: '24px 30px 10px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 34, color: WH }}>BAZA</div>
          <div style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 20, color: scan >= 1 ? GRN : GR }}>{scan >= 1 ? 'topildi ✓' : `qidirilmoqda… ${Math.round(scan * 100)}%`}</div>
        </div>
        <div style={{ margin: '6px 30px 18px', height: 8, borderRadius: 4, background: '#1d2230' }}><div style={{ width: `${scan * 100}%`, height: '100%', borderRadius: 4, background: scan >= 1 ? GRN : BLUE }} /></div>
        {[['RAQAM', '01 S 404 BZ'], ['EGASI', '●●●●● ●●●●●'], ['MASHINA', 'sedan · oq']].map(([k, v], i) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 30px', borderTop: '1px solid rgba(255,255,255,.08)', opacity: eout(P(t, T.baza + .2 + i * .35, T.baza + .5 + i * .35)) }}>
          <span style={{ fontFamily: MONO, fontSize: 24, color: GR }}>{k}</span><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH }}>{v}</span></div>)}
        <div style={{ height: 10 }} />
      </Card>
      <Stamp s="TOPILDI" y={1250} t={t} t0={T.kim} t1={24.65} col={GRN} size={60} rot={-5} />
    </Layer>
    <Head t={t} t0={17.55} t1={T.dastur - .1} y={490} lines={[['surat', 'y']]} size={100} from="slam" />
    <Head t={t} t0={T.dastur - .1} t1={T.baza - .1} y={490} lines={[['raqamni'], ['o‘qiydi', 'y']]} size={64} />
    <Head t={t} t0={T.baza - .1} t1={24.65} y={490} lines={[['bazadan'], ['qidiradi', 'y']]} size={64} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.6, 30.65, .3, .3);
  const aA = env(t, 24.6, T.uzb - .05, .3, .3), aB = env(t, T.uzb - .2, 30.65, .3, .3);
  const R = rnd(7); const dots = Array.from({ length: 200 }, (_, i) => ({ x: SL + 40 + (i % 20) * 41 + (Math.floor(i / 20) % 2) * 20, y: 900 + Math.floor(i / 20) * 40, d: R() }));
  const cnt = eio(P(t, T.n1831 - .2, T.bitta + .2));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 24.6, 27), 1, 1.05)}>
      <Glow x={CX} y={920} r={520} a={.85} />
      <div style={{ ...abs(CX - 220, 660) }}><CamPole h={560} flash={.25 + .15 * Math.sin(t * 3)} id="p4" /></div>
      <Pill s="24/7" x={CX + 200} y={760} a={eout(P(t, T.charch - .1, T.charch + .3))} size={40} />
      <div style={{ ...abs(CX + 90, 1000), opacity: eout(P(t, T.choy - .1, T.choy + .3)) }}><Piyola w={220} />
        <svg width={220} height={160} style={{ position: 'absolute', left: 0, top: -6 }}><line x1="20" y1="10" x2="200" y2="150" stroke={RED} strokeWidth="12" strokeLinecap="round" opacity={eout(P(t, T.choy + .2, T.choy + .5))} /></svg>
      </div>
      <Pill s="choy — yo‘q" x={CX + 200} y={1240} a={eout(P(t, T.choy + .25, T.choy + .55))} size={28} dark col={RED} />
      <Head t={t} t0={24.6} t1={T.uzb - .1} y={490} lines={[['charchamaydi', 'y']]} size={60} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={1000} r={560} a={.8} />
      <Num v={fmt(1831 * cnt)} y={650} a={eout(P(t, T.uzb - .2, T.uzb + .2))} size={150} />
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        {dots.map((d, i) => { const on = clamp(cnt * 1.25 - d.d); return <g key={i}><circle cx={d.x} cy={d.y} r={on > .5 ? 9 : 5} fill={on > .5 ? Y : '#2a3040'} opacity={on > .5 ? .95 : .7} />{on > .5 && on < .8 && <circle cx={d.x} cy={d.y} r={9 + 24 * (on - .5)} fill="none" stroke={YL} strokeWidth="2" opacity={1 - (on - .5) * 3} />}</g>; })}
      </svg>
      <Pill s="kamera va radar nuqtasi" x={CX} y={840} a={eout(P(t, T.nuqta, T.nuqta + .3))} size={28} dark />
      <Src s="YHXX ro‘yxati · iyul 2025" y={1340} a={eout(P(t, T.n1831, T.n1831 + .4))} />
      <Head t={t} t0={T.uzb - .2} t1={30.65} y={490} lines={[['butun'], ['O‘zbekiston', 'y']]} size={58} />
    </Layer>
  </Layer>;
};

const FineRow: React.FC<{ y: number; a: number; k: string; bhm: string; sum: string; col: string }> = ({ y, a, k, bhm, sum, col }) =>
  <Card x={SL + 30} y={y} w={SR - SL - 60} a={a} style={{ translate: `${(1 - eout(a)) * 60}px 0` }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '22px 28px', gap: 20 }}>
      <div style={{ fontFamily: MONO, fontSize: 22, color: GR, width: 270, whiteSpace: 'nowrap' }}>{k}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 34, color: col }}>{bhm}</div>
      <div style={{ marginLeft: 'auto', fontFamily: HEAD, fontWeight: 800, fontSize: 34, color: WH }}>{sum}</div>
    </div>
  </Card>;
const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 30.55, 38.75, .3, .3);
  const v = t < T.qirq ? lerp(.3, .49, eio(P(t, T.yigirma, T.bhm1))) : lerp(.49, .69, eio(P(t, T.qirq - .1, T.qirq + .6)));
  const s1 = 440000 * eio(P(t, T.n440 - .2, T.n440 + .9)), s2 = 3960000 * eio(P(t, T.bhm9 - .1, T.mln + .4));
  return <Layer a={a} z={logZ(P(t, 30.55, 38.7), 1, 1.04)}>
    <Glow x={CX} y={800} r={460} a={.8} col={t > T.qirq ? '255,90,95' : '246,185,59'} />
    <div style={{ ...abs(CX - 190, 590), scale: String(lerp(.8, 1, eback(P(t, 30.55, 31.2)))) }}><Gauge w={380} v={v} red={.375} /></div>
    <Pill s={t < T.qirq ? '+20 gacha' : '+40 dan ko‘p'} x={CX + 290} y={700} a={eout(P(t, T.yigirma, T.yigirma + .3))} size={28} col={t < T.qirq ? Y : RED} dark />
    <FineRow y={1010} a={eout(P(t, T.bhm1 - .1, T.bhm1 + .3))} k="+20 km/soatgacha" bhm="1 BHM" sum={fmt(s1)} col={Y} />
    <FineRow y={1160} a={eout(P(t, T.qirq - .1, T.qirq + .3))} k="+40 dan ortiq" bhm="9 BHM" sum={fmt(s2)} col={RED} />
    <Src s="1 BHM = 440 000 so‘m · 1.09.2026 dan · so‘mda" y={1320} a={eout(P(t, T.n440, T.n440 + .4))} />
    <Head t={t} t0={30.55} t1={38.75} y={490} lines={[['jarima narxi', 'y']]} size={62} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 38.65, 47.25, .15, .3);
  const aA = env(t, 38.65, T.qogoz - .05, .1, .3), aB = env(t, T.qogoz - .2, 47.25, .3, .3);
  const env1 = env(t, T.qogoz - .2, T.sms + .1, .3, .35);
  const digits = '6079', dt = [T.d6, T.d0, T.d7, T.d9];
  const nd = dt.filter((x) => t >= x - .05).length;
  const ph = eout(P(t, T.sms - .2, T.sms + .4));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} />
      <Head t={t} t0={38.65} t1={T.qogoz - .05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={920} r={520} a={.85} col={t > T.sms ? '61,220,132' : '255,90,95'} />
      <Layer a={env1}>
        <div style={{ ...abs(CX - 170, 700), rotate: `${-6 + Math.sin(t * 2) * 2}deg` }}><Packet w={340} paper /></div>
        <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, opacity: eout(P(t, T.kelmay - .1, T.kelmay + .2)) }}>
          <line x1={CX - 190} y1={690} x2={CX + 190} y2={960} stroke={RED} strokeWidth="14" strokeLinecap="round" /><line x1={CX + 190} y1={690} x2={CX - 190} y2={960} stroke={RED} strokeWidth="14" strokeLinecap="round" />
        </svg>
        <Stamp s="QOG‘OZ YO‘Q" y={1090} t={t} t0={T.kelmay} t1={T.sms + .2} size={56} />
        <Pill s="1-mart 2026 dan" x={CX} y={1240} a={eout(P(t, T.mart - .1, T.mart + .3))} size={30} />
      </Layer>
      {ph > 0 && <div style={{ ...abs(CX - 145, 660 + (1 - ph) * 200), opacity: ph }}>
        <Phone w={290} glow={.6} id="p6"><SmsScreen t={t} t0={T.sms} from={digits.slice(0, nd).padEnd(4, '·')} title="JARIMA TO‘G‘RISIDA QAROR" body="Qaror va materiallar elektron ko‘rinishda" /></Phone>
      </div>}
      {ph > 0 && <div style={{ position: 'absolute', left: CX + 245, top: 820, translate: '-50% 0', display: 'flex', flexDirection: 'column', gap: 10, opacity: ph }}>
        {digits.split('').map((d, i) => <div key={i} style={{ width: 74, height: 74, borderRadius: 16, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 800, fontSize: 42, background: i < nd ? Y : 'rgba(30,34,46,.9)', color: i < nd ? '#1A1306' : GR, scale: String(i < nd ? lerp(1.3, 1, eout(P(t, dt[i], dt[i] + .2))) : 1) }}>{i < nd ? d : '·'}</div>)}
      </div>}
      <Pill s="MyGov · Road24 · Hamroh" x={CX} y={1300} a={eout(P(t, T.raq - .1, T.raq + .3))} size={26} dark />
      <Head t={t} t0={T.qogoz - .2} t1={T.sms - .15} y={490} lines={[['qog‘oz xat'], ['kelmaydi', 'r']]} size={62} />
      <Head t={t} t0={T.sms - .15} t1={47.25} y={490} lines={[['faqat sms', 'y']]} size={70} />
    </Layer>
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 47.2, 54.7, .3, .3);
  const aA = env(t, 47.2, T.ishonch - .05, .3, .3), aB = env(t, T.ishonch - .2, 54.7, .3, .3);
  const fill = eout(P(t, T.ball - .1, T.ball + .5));
  const fp = P(t, T.osh - .35, T.osh + .15);
  const [bx, by] = flight(fp, [CX, 760], [CX + 230, 990], 120);
  const got = t > T.osh + .1;
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 47.2, 51), 1, 1.05)}>
      <Glow x={CX} y={900} r={520} a={.85} />
      <div style={{ ...abs(CX - 330, 720) }}><CamPole h={420} flash={flashAt(t, T.ball - .2)} id="p7" /></div>
      <Card x={CX - 90} y={760} w={430} style={{ scale: String(lerp(.9, 1, eback(P(t, 47.3, 47.9)))) }}>
        <div style={{ padding: '24px 28px' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>haydovchi</div>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 32, color: WH, marginTop: 6 }}>JARIMA BALLARI</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 22 }}>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ flex: 1, height: 26, borderRadius: 8, background: i < 2 ? (i === 1 ? `rgba(255,90,95,${fill})` : RED) : '#1d2230', border: '1px solid rgba(255,255,255,.1)' }} />)}</div>
        </div>
      </Card>
      <Pill s="+ ball" x={CX + 240} y={720} a={env(t, T.ball, T.ishonch, .2, .3)} size={30} col={RED} />
      <Pill s="1-aprel 2026 dan" x={CX + 120} y={1080} a={eout(P(t, T.aprel - .1, T.aprel + .3))} size={30} />
      <Head t={t} t0={47.2} t1={T.ishonch - .1} y={490} lines={[['kamera'], ['ball ham yozadi', 'y']]} size={54} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={920} r={520} a={.8} />
      <Card x={CX - 200} y={650} w={400} style={{ scale: String(lerp(.85, 1, eback(P(t, T.ishonch - .2, T.ishonch + .4)))) }}>
        <div style={{ padding: '18px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 28, color: WH }}>ISHONCHNOMA</div>
          {[0, 1, 2].map((i) => <div key={i} style={{ height: 8, borderRadius: 4, background: '#2a3040', margin: '12px auto 0', width: `${90 - i * 18}%` }} />)}
        </div>
      </Card>
      <div style={{ ...abs(CX - 230 - 75, 930) }}><Avatar n="Egasi" c="#9fb8ff" sel={0} dim={eout(P(t, T.osh, T.osh + .3))} /></div>
      <div style={{ ...abs(CX + 230 - 75, 930) }}><Avatar n="Rulda" c="#8be0b4" sel={got ? 1 : 0} /></div>
      {fp > 0 && fp < 1 && <div style={{ position: 'absolute', left: bx, top: by, translate: '-50% -50%', width: 46, height: 46, borderRadius: '50%', background: RED, boxShadow: '0 0 24px rgba(255,90,95,.8)' }} />}
      <Pill s="ball" x={CX + 230} y={1150} a={eout(P(t, T.osh, T.osh + .3))} size={28} col={RED} />
      <Pill s="—" x={CX - 230} y={1150} a={eout(P(t, T.osh, T.osh + .3))} size={28} dark col={GR} />
      <Src s="ishonchnoma, sug‘urta polisi yoki yo‘l varaqasi bo‘lsa" y={1260} a={eout(P(t, T.boshqa, T.boshqa + .4))} />
      <Head t={t} t0={T.ishonch - .2} t1={54.7} y={490} lines={[['ball —'], ['rulda o‘tirganga', 'y']]} size={54} />
    </Layer>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 54.65, 61.25, .3, .3);
  const stage2 = t > T.n30 - .1;
  const p = stage2 ? lerp(.5, .7, eio(P(t, T.n70 - .1, T.n70 + .5))) : .5 * eio(P(t, T.yarm - .4, T.yarm + .5));
  const bar = stage2 ? lerp(.5, 1, eio(P(t, T.n30 - .1, T.n30 + .6))) : .5 * eio(P(t, T.n15 - .2, T.n15 + .7));
  return <Layer a={a} z={logZ(P(t, 54.65, 61.2), 1, 1.04)}>
    <Glow x={CX} y={830} r={480} a={.9} col={stage2 ? '246,185,59' : '61,220,132'} />
    <div style={{ ...abs(CX - 190, 640) }}><Donut w={380} p={Math.max(p, .001)} col={stage2 ? Y : GRN} id="d8" /></div>
    <Num v={`${Math.round(p * 100)}%`} y={770} a={eout(P(t, T.yarm - .4, T.yarm))} size={96} col={stage2 ? Y : GRN} />
    <div style={{ ...abs(CX - 80, 880, 160), textAlign: 'center', fontFamily: MONO, fontSize: 22, color: GR, opacity: eout(P(t, T.yarm - .2, T.yarm + .2)) }}>to‘laysiz</div>
    <Card x={SL + 30} y={1070} w={SR - SL - 60} a={eout(P(t, T.n15 - .3, T.n15 + .1))}>
      <div style={{ padding: '22px 30px 20px' }}>
        <div style={{ position: 'relative', height: 30, borderRadius: 15, background: '#1d2230', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(bar, .5) * 100}%`, background: GRN }} />
          {bar > .5 && <div style={{ position: 'absolute', left: '50%', top: 0, height: '100%', width: `${(bar - .5) * 100}%`, background: Y }} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: MONO, fontSize: 22, color: GR }}><span>0</span><span style={{ color: GRN }}>15 kun · 50%</span><span style={{ color: stage2 ? Y : GR }}>30 kun · 70%</span></div>
      </div>
    </Card>
    <Src s="mast holda haydash va 1 yilda takrorlansa — chegirma yo‘q" y={1270} a={eout(P(t, T.n30, T.n30 + .5))} />
    <Head t={t} t0={54.65} t1={T.n30 - .1} y={490} lines={[['15 kunda —'], ['yarmi', 'g']]} size={64} />
    <Head t={t} t0={T.n30 - .1} t1={61.25} y={490} lines={[['30 kunda —'], ['70%', 'y']]} size={64} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 61.2, END + 1, .3, .1);
  const aA = env(t, 61.2, T.buni - .05, .3, .3), aB = eout(P(t, T.buni - .2, T.buni + .3));
  const sel = eout(P(t, T.dost, T.dost + .3)), sent = t > T.yub + .25;
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={850} r={480} a={.85} col="61,220,132" />
      <div style={{ ...abs(CX - 200, 640) }}><Gauge w={400} v={.35 + Math.sin(t * 3) * .01} red={.375} /></div>
      <Stamp s="0 so‘m" y={1150} t={t} t0={T.oshirma} t1={T.buni} col={GRN} size={80} rot={-6} />
      <Head t={t} t0={61.2} t1={T.oshirma - .1} y={490} lines={[['eng arzon'], ['jarima', 'y']]} size={64} />
      <Head t={t} t0={T.oshirma - .1} t1={T.buni} y={490} lines={[['tezlikni'], ['oshirmaslik', 'g']]} size={60} />
    </Layer>
    <Layer a={aB}>
      <Head t={t} t0={T.buni - .1} t1={END + 1} y={490} lines={[['do‘stga'], ['yuboring', 'y']]} size={66} />
      <Card x={SL + 20} y={800 + (1 - eout(P(t, T.buni - .1, T.buni + .5))) * 200} w={SR - SL - 40}>
        <div style={{ padding: '26px 30px' }}>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, textAlign: 'center' }}>Ulashish</div>
          <div style={{ marginTop: 18, height: 56, borderRadius: 14, background: '#1d2230', fontFamily: SANS, fontSize: 24, color: GR, display: 'flex', alignItems: 'center', paddingLeft: 20 }}>Qidirish</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26 }}>
            <Avatar n="Aziz" c="#9fb8ff" sel={0} /><Avatar n="Sardor" c={Y} sel={sel} /><Avatar n="Malika" c="#8be0b4" sel={0} /><Avatar n="Dilnoza" c="#ffb3c1" sel={0} />
          </div>
          <div style={{ marginTop: 28, height: 70, borderRadius: 18, background: sent ? GRN : BLUE, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: sent ? '#06210f' : '#fff' }}>{sent ? 'Yuborildi ✓' : 'Yuborish'}</div>
        </div>
      </Card>
      <div style={{ ...abs(SL, 1330, SR - SL), display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: eout(P(t, T.yub + .3, T.yub + .7)) }}>
        <Lockup h={84} />
      </div>
    </Layer>
  </Layer>;
};

const HITS: [number, number, number][] = [[T.chirt, 10, 7], [T.radar, 12, 6], [T.surat, 10, 7], [T.kim, 8, 7], [T.n1831, 10, 6], [T.bhm9, 12, 6], [T.endi, 20, 5], [T.kelmay, 12, 6], [T.osh, 8, 7], [T.yarm, 10, 6], [T.oshirma, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 60} y={1100} r={560} a={1} />
    <Road t={0} y={1180} />
    <div style={{ ...abs(640, 850) }}><CamPole h={380} flash={.9} id="cv" /></div>
    <div style={{ ...abs(90, 1210) }}><Car w={440} id="cv" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>radar · kamera · SMS</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 104, lineHeight: 1.04, ...yel }}>KAMERA<br />QANDAY<br />USHLAYDI?</div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1.1, color: GRN }}>15 KUNDA TO‘LASANGIZ —<br />FAQAT YARMI</div>
  </AbsoluteFill>;
};
