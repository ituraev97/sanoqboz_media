const {chromium}=require('playwright'); const fs=require('fs'); const http=require('http'); const path=require('path');
const srv=http.createServer((q,s)=>{const f=path.join(__dirname,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);return s.end()};s.writeHead(200,{'Content-Type':f.endsWith('.js')?'text/javascript':f.endsWith('.html')?'text/html':'application/octet-stream'});s.end(d)})}).listen(8765);
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:700,height:1200}});
p.on('console',m=>console.log('C',m.text()));p.on('pageerror',e=>console.log('E',e.message));
await p.goto('http://localhost:8765/iphone_frames.html');await p.waitForFunction('window.ready!==undefined',null,{timeout:120000});
console.log('top',await p.evaluate('window.ready'));
const out=process.argv[2]; fs.mkdirSync(out,{recursive:true});
const angs=process.argv.slice(3).map(Number);
for(const a of angs){const u=await p.evaluate(`window.render(${a})`);fs.writeFileSync(`${out}/ip_${String(Math.round(a*2)+40).padStart(3,'0')}.png`,Buffer.from(u.split(',')[1],'base64'));}
await b.close();srv.close();})();
