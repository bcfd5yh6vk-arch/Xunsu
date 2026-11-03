'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
const allowed=new Set(['index.html','styles.css','app.js','data.js','core.js','scene.js']);
http.createServer((req,res)=>{
  const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','Cache-Control':'no-store','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"};
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,headers);res.end('Method not allowed');return;}
  let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '')||'index.html';}catch{res.writeHead(400,headers);res.end('Bad request');return;}
  const file=path.resolve(root,name);
  if(!file.startsWith(root+path.sep)||(!allowed.has(name)&&!name.startsWith('assets/'))){res.writeHead(404,headers);res.end('Not found');return;}
  fs.stat(file,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404,headers);res.end('Not found');return;}res.writeHead(200,{...headers,'Content-Type':mime[path.extname(file)]||'application/octet-stream','Content-Length':stat.size});if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);});
}).listen(port,'127.0.0.1',()=>console.log(`循塑 Xunsu 本地预览：http://127.0.0.1:${port}`));
