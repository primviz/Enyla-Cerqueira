// Execute após escolher seu domínio: node configurar-dominio.mjs https://seu-dominio
import {readFileSync,writeFileSync} from 'node:fs';
const input=process.argv[2];
if(!input){console.error('Informe a URL definitiva do site como argumento.');process.exit(1);}
const url=new URL(input);if(url.protocol!=='https:'||url.username||url.password){throw new Error('Use uma URL HTTPS pública sem credenciais.');}
const root=url.origin+'/';let html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
html=html.replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta property="og:url"[^>]*>/g,'');
html=html.replace('</head>',`<link rel="canonical" href="${root}"><meta property="og:url" content="${root}"></head>`);
html=html.replace(/<meta property="og:image"[^>]*>/,`<meta property="og:image" content="${root}assets/images/dra-enyla.webp">`);
writeFileSync(new URL('./index.html',import.meta.url),html);
writeFileSync(new URL('./sitemap.xml',import.meta.url),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${root}</loc></url></urlset>\n`);
writeFileSync(new URL('./robots.txt',import.meta.url),`User-agent: *\nAllow: /\nSitemap: ${root}sitemap.xml\n`);
console.log('Canonical, Open Graph, robots.txt e sitemap.xml configurados.');
