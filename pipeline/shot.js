// node shot.js OUTDIR t1 t2 ...  -> OUTDIR/<t>.jpg
const {chromium}=require('playwright-core');const fs=require('fs');
(async()=>{const b=await chromium.launch(Object.assign({args:['--allow-file-access-from-files']},(()=>{const fs=require('fs');for(const p of['/opt/pw-browsers/chromium-1194/chrome-linux/chrome',...(fs.existsSync('/opt/pw-browsers')?fs.readdirSync('/opt/pw-browsers').filter(d=>/^chromium-\d+$/.test(d)).sort().reverse().map(d=>`/opt/pw-browsers/${d}/chrome-linux64/chrome`):[])])if(fs.existsSync(p))return{executablePath:p};return{};})()));
const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/render.html');await p.evaluate(()=>window.ready);
const dir=process.argv[2];fs.mkdirSync(dir,{recursive:true});
for(const t of process.argv.slice(3).map(Number)){const d=await p.evaluate(t=>grabV(t,.85),t);fs.writeFileSync(`${dir}/${t}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
await b.close();})();
