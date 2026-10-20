'use strict';
const menu = document.getElementById('menu');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu(){ menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Abrir menu'); }
menuToggle.addEventListener('click',()=>{const opened=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(opened));menuToggle.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu();});
document.getElementById('year').textContent=new Date().getFullYear();
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window && !reducedMotion.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:0.06});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
const gallery=document.querySelector('.gallery');
function scrollGallery(direction){gallery.scrollBy({left:direction*(gallery.querySelector('.gallery-item').getBoundingClientRect().width+20),behavior:reducedMotion.matches?'auto':'smooth'});}
document.getElementById('gallery-prev').addEventListener('click',()=>scrollGallery(-1));
document.getElementById('gallery-next').addEventListener('click',()=>scrollGallery(1));
const galleryItems=Array.from(document.querySelectorAll('.gallery-item'));
const lightbox=document.getElementById('lightbox');let imageIndex=0;
function showImage(index){imageIndex=(index+galleryItems.length)%galleryItems.length;const item=galleryItems[imageIndex];const img=document.getElementById('lightbox-image');img.src=item.dataset.image;img.alt=item.querySelector('img').alt+' (ampliado)';document.getElementById('lightbox-counter').textContent=(imageIndex+1)+' / '+galleryItems.length;}
galleryItems.forEach((item,index)=>item.addEventListener('click',()=>{showImage(index);lightbox.showModal();}));
document.getElementById('lightbox-prev').addEventListener('click',()=>showImage(imageIndex-1));document.getElementById('lightbox-next').addEventListener('click',()=>showImage(imageIndex+1));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showImage(imageIndex-1);}if(e.key==='ArrowRight'){e.preventDefault();showImage(imageIndex+1);}});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});});
document.getElementById('privacy-open').addEventListener('click',()=>document.getElementById('privacy').showModal());
const interest=document.getElementById('interesse');
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{interest.value=link.dataset.service==='Harmonização glútea'?'Harmonização':link.dataset.service==='Cuidado com a pele'?'Tratamento':'Outro';}));
const phone=document.getElementById('telefone');
phone.addEventListener('input',()=>{const digits=phone.value.replace(/\D/g,'').slice(0,11);phone.value=digits.length>10?digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/,'($1) $2-$3'):digits.length>6?digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/,'($1) $2-$3'):digits;phone.setCustomValidity('');});
const form=document.getElementById('contact-form');
form.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('nome');const city=document.getElementById('cidade');name.setCustomValidity(name.value.trim().length<2?'Informe seu nome.':'');city.setCustomValidity(city.value.trim().length<2?'Informe sua cidade.':'');const digits=phone.value.replace(/\D/g,'');phone.setCustomValidity(/^\d{10,11}$/.test(digits)?'':'Informe um telefone com DDD.');if(!form.reportValidity())return;
const state=document.getElementById('estado').value;
const message=['Olá! Gostaria de agendar uma avaliação.','', '**Nome:** '+name.value.trim(),'**Telefone:** '+phone.value,'**Cidade e estado:** '+city.value.trim()+' / '+state,'**Interesse:** '+interest.value].join('\n');
const url='https://wa.me/5511918486677?text='+encodeURIComponent(message);
// Somente o envio validado dispara a conversão. Não enviamos dados pessoais ao GA4.
if(typeof window.gtag==='function')window.gtag('event','lead_whatsapp',{event_category:'contato',event_label:'Pré-cadastro WhatsApp',interesse:interest.value,transport_type:'beacon'});
const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';document.body.appendChild(link);link.click();link.remove();
const status=document.getElementById('form-status');status.textContent='Pré-cadastro preparado. Finalize o envio da mensagem no WhatsApp. ';
const retry=document.createElement('a');retry.href=url;retry.target='_blank';retry.rel='noopener noreferrer';retry.textContent='Abrir novamente';retry.className='text-link';status.appendChild(retry);
});
['nome','cidade'].forEach(id=>document.getElementById(id).addEventListener('input',e=>e.target.setCustomValidity('')));

// V2.0: carrega perto da tela; reproduz apenas o vídeo mais visível.
const testimonialVideos=Array.from(document.querySelectorAll('.testimonial-video video'));
const visibility=new Map();
let autoVideo=null;
let manualPause=new WeakSet();
let managedPause=new WeakSet();
function stopVideo(video){if(!video.paused){managedPause.add(video);video.pause();}}
function loadVideo(video){const source=video.querySelector('source[data-src]');if(source){source.src=source.dataset.src;delete source.dataset.src;video.load();}}
function updatePlayback(){
 const visible=testimonialVideos.filter(v=>(visibility.get(v)||0)>=.4);
 const next=document.hidden?null:visible.sort((a,b)=>(visibility.get(b)||0)-(visibility.get(a)||0))[0]||null;
 testimonialVideos.forEach(v=>{if(v!==next)stopVideo(v);});
 if(autoVideo && autoVideo!==next){autoVideo.muted=true;} autoVideo=next;
 if(next && !manualPause.has(next)){loadVideo(next);next.play().catch(()=>{});}
}
testimonialVideos.forEach((video,index)=>{
 video.muted=true;video.defaultMuted=true;
 const sound=video.parentElement.querySelector('.video-sound');
 function labelSound(){sound.textContent=video.muted?'Ativar som':'Silenciar';sound.setAttribute('aria-pressed',String(!video.muted));sound.setAttribute('aria-label',(video.muted?'Ativar som':'Silenciar')+' do depoimento '+(index+1));}
 sound.addEventListener('click',()=>{video.muted=!video.muted;if(!video.muted){testimonialVideos.forEach(v=>{if(v!==video){v.muted=true;stopVideo(v);}});}manualPause.delete(video);loadVideo(video);video.play().catch(()=>{});labelSound();});
 video.addEventListener('volumechange',labelSound);
 video.addEventListener('play',()=>{manualPause.delete(video);testimonialVideos.forEach(v=>{if(v!==video)stopVideo(v);});});
 video.addEventListener('pause',()=>{if(managedPause.has(video)){managedPause.delete(video);}else if((visibility.get(video)||0)>=.4&&!document.hidden){manualPause.add(video);}});
 video.addEventListener('ended',()=>manualPause.add(video));
});
if('IntersectionObserver' in window){
 const loader=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){loadVideo(e.target);loader.unobserve(e.target);}}),{rootMargin:'250px 0px'});
 const player=new IntersectionObserver(entries=>{entries.forEach(e=>{visibility.set(e.target,e.intersectionRatio);if(!e.isIntersecting){manualPause.delete(e.target);e.target.muted=true;}});updatePlayback();},{threshold:[0,.1,.25,.4,.5,.6,.75,1]});
 testimonialVideos.forEach(v=>{loader.observe(v);player.observe(v);});
}else{testimonialVideos.forEach(loadVideo);}
document.addEventListener('visibilitychange',updatePlayback);
