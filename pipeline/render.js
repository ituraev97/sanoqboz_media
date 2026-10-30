// node render.js START END OUT.mp4   (frames at 30fps)
const {chromium}=require('playwright-core');const {spawn}=require('child_process');
const [a,b,out]=[+process.argv[2],+process.argv[3],process.argv[4]];const FPS=30;
(async()=>{const br=await chromium.launch(Object.assign({args:['--allow-file-access-from-files']},(()=>{const fs=require('fs');for(const p of['/opt/pw-browsers/chromium-1194/chrome-linux/chrome',...(fs.existsSync('/opt/pw-browsers')?fs.readdirSync('/opt/pw-browsers').filter(d=>/^chromium-\d+$/.test(d)).sort().reverse().map(d=>`/opt/pw-browsers/${d}/chrome-linux64/chrome`):[])])if(fs.existsSync(p))return{executablePath:p};return{};})()));
const p=await br.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/render.html');await p.evaluate(()=>window.ready);
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',''+FPS,'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
for(let f=a;f<b;f++){const d=await p.evaluate(t=>grabV(t,.93),f/FPS);const buf=Buffer.from(d.split(',')[1],'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await br.close();console.log('done',out);})();
