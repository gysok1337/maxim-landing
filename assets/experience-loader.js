/* Load the immersive scene only when the visitor approaches it. */
(function(){
  'use strict';

  var mount=document.getElementById('experienceMount');
  if(!mount)return;

  var loaded=false;
  window.__experienceLabActive=false;

  function loadExperience(){
    if(loaded)return;
    loaded=true;
    mount.dataset.experienceLoaded='true';
    var script=document.createElement('script');
    script.src='assets/experience.js?v=20260714-2';
    script.async=true;
    document.body.appendChild(script);
  }

  if(!('IntersectionObserver' in window)){
    window.__experienceLabActive=true;
    loadExperience();
    return;
  }

  var observer=new IntersectionObserver(function(entries){
    var entry=entries[0];
    window.__experienceLabActive=!!(entry&&entry.isIntersecting);
    if(window.__experienceLabActive)loadExperience();
  },{rootMargin:'800px 0px'});

  observer.observe(mount);
})();
