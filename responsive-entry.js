// The approved desktop modules remain unchanged; phones use their own framing.
const mobile = matchMedia('(max-width:700px), (pointer:coarse) and (max-width:1024px)');
mobile.addEventListener('change', () => location.reload());
document.documentElement.dataset.layout = mobile.matches ? 'mobile' : 'desktop';
// Safari's collapsing bars resize the visual viewport while a swipe is still
// moving. Measure the small/large screens once per width, not on each bar frame.
if(mobile.matches){
 let viewportWidth=0;
 const sizeViewport=()=>{
  const w=document.documentElement.clientWidth;
  if(w===viewportWidth)return;
  viewportWidth=w;
  const probe=document.createElement('div');
  probe.style.cssText='position:fixed;visibility:hidden;pointer-events:none;width:0;height:100svh';
  document.body.append(probe);
  const small=probe.getBoundingClientRect().height||innerHeight;
  probe.style.height='100lvh';
  const large=Math.max(small,probe.getBoundingClientRect().height||innerHeight);
  probe.remove();
  const style=document.documentElement.style;
  style.setProperty('--mobile-small-screen',small+'px');
  style.setProperty('--mobile-large-screen',large+'px');
  style.setProperty('--mobile-chrome-gap',Math.max(0,large-small)+'px');
 };
 sizeViewport();
 window.addEventListener('resize',sizeViewport,{passive:true});
}
await import('./intro-ui.js?v=5');
await import('./journey.js?v=30');
if (mobile.matches) {
  await Promise.all([import('./mobile-scroll-player.js?v=8'), import('./mobile-interactions.js')]);
  const {mountMotionTuner}=await import('./mobile-motion-tuning.js?v=2');
  mountMotionTuner();
} else {
  await Promise.all([import('./scroll-player.js?v=3'), import('./scene.js')]);
}
