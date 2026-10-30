// node shot.js OUTDIR t1 t2 ...  -> OUTDIR/<t>.jpg
const {chromium}=require('playwright-core');const fs=require('fs');
(async()=>{const b=await chromium.launch(Object.assign({args:['--allow-file-access-from-files']},require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}));
const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/render.html');await p.evaluate(()=>window.ready);
const dir=process.argv[2];fs.mkdirSync(dir,{recursive:true});
for(const t of process.argv.slice(3).map(Number)){const d=await p.evaluate(t=>grabV(t,.85),t);fs.writeFileSync(`${dir}/${t}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
await b.close();})();
