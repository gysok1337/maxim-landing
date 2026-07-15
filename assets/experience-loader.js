/* Keep the scene controller ready before a fast scroll reaches the section. */
(function(){
  'use strict';

  var mount=document.getElementById('experienceMount');
  if(!mount)return;

  window.__experienceLabActive=false;
  var pendingFrames=[];
  var activationStart=0;
  var activationEnd=0;
  var activationResize=0;
  var activationMargin=420;

  window.__experienceLabSchedule=function(callback){
    if(window.__experienceLabActive===false){
      if(pendingFrames.indexOf(callback)===-1)pendingFrames.push(callback);
      return;
    }
    requestAnimationFrame(callback);
  };

  function setActivity(active){
    active=!!active;
    if(window.__experienceLabActive===active)return;
    window.__experienceLabActive=active;
    if(!active||!pendingFrames.length)return;
    var callbacks=pendingFrames.splice(0,pendingFrames.length);
    requestAnimationFrame(function(){
      callbacks.forEach(function(callback){callback(performance.now());});
    });
  }

  function measureActivityRange(){
    var rect=mount.getBoundingClientRect();
    var top=rect.top+window.scrollY;
    activationStart=Math.max(0,top-window.innerHeight-activationMargin);
    activationEnd=top+mount.offsetHeight+activationMargin;
    updateActivity();
  }
  window.__measureExperienceActivity=measureActivityRange;

  function updateActivity(){
    setActivity(window.scrollY>=activationStart&&window.scrollY<=activationEnd);
  }

  measureActivityRange();
  window.addEventListener('scroll',updateActivity,{passive:true});
  window.addEventListener('load',measureActivityRange,{once:true});
  window.addEventListener('resize',function(){
    if(window.__portfolioHeightOnlyResize)return;
    clearTimeout(activationResize);
    activationResize=setTimeout(measureActivityRange,120);
  },{passive:true});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measureActivityRange);
})();
