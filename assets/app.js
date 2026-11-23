function filters(buttonAttr,itemAttr){const buttons=[...document.querySelectorAll(`[${buttonAttr}]`)];buttons.forEach(b=>b.addEventListener('click',()=>{const choice=b.getAttribute(buttonAttr);buttons.forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});document.querySelectorAll(`[${itemAttr}]`).forEach(item=>{item.hidden=choice!=='all'&&item.getAttribute(itemAttr)!==choice});const grid=document.querySelector('.media-grid');if(grid)grid.hidden=choice==='press'}))}
filters('data-writing','data-writing-kind');filters('data-media','data-kind');
const dialog=document.querySelector('#video-dialog');let opener;
document.querySelectorAll('[data-video]').forEach(b=>b.addEventListener('click',()=>{opener=b;document.querySelector('#video-title').textContent=b.dataset.title;const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${b.dataset.video}?autoplay=1`;frame.title=b.dataset.title;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;document.querySelector('#video-frame').replaceChildren(frame);document.querySelector('#video-external').href=`https://www.youtube.com/watch?v=${b.dataset.video}`;dialog.showModal();document.body.style.overflow='hidden'}));
function closeVideo(){dialog?.close()}
document.querySelector('#close-video')?.addEventListener('click',closeVideo);
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeVideo()}});
dialog?.addEventListener('close',()=>{document.querySelector('#video-frame').replaceChildren();document.body.style.overflow='';opener?.focus()});
// Progressive enhancement: all content stays visible when animation is unavailable.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reduceMotion.matches&&'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -15px 0px'});
 document.querySelectorAll('.manifesto h2,.manifesto-bottom,.work-item,.about-visual,.about-copy,.section-heading,.featured-article,.quote-inner,.work-story,.bio-photo,.prose,.contact-aside,.social-row,.writing-article').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)});
 reduceMotion.addEventListener('change',e=>{if(e.matches){document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.add('is-visible'));observer.disconnect()}});
}
let scrollTick=false;
function updateScroll(){const heroImage=document.querySelector('.hero-image');if(heroImage&&!reduceMotion.matches&&window.innerWidth>640&&window.scrollY<1000){heroImage.style.setProperty('--portrait-shift',`${Math.min(window.scrollY*.09,70)}px`)}scrollTick=false}
window.addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
const carousel=document.querySelector('.home-carousel');
function moveConversations(direction){if(!carousel)return;const card=carousel.querySelector('.video-card');const distance=(card?.getBoundingClientRect().width||320)+24;carousel.scrollBy({left:direction*distance,behavior:reduceMotion.matches?'instant':'smooth'})}
document.querySelector('.carousel-prev')?.addEventListener('click',()=>moveConversations(-1));document.querySelector('.carousel-next')?.addEventListener('click',()=>moveConversations(1));
carousel?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();moveConversations(e.key==='ArrowRight'?1:-1)}});
