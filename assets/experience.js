/* Production controllers from experience-lab-v2.html. */
window.__experienceLabSchedule=window.__experienceLabSchedule||function(callback){
  if(window.__experienceLabActive===false){
    setTimeout(function(){requestAnimationFrame(callback);},320);
  }else{
    requestAnimationFrame(callback);
  }
};
window.__experienceLabSuspended=false;
window.__experienceVirtualMode=true;

function experienceScrollTo(top,smooth){
  top=Math.max(0,Math.round(top));
  var now=performance.now();
  window.__experienceInternalScrollUntil=now+(smooth?950:160);
  if(smooth)window.__experienceProgrammaticScrollUntil=now+900;
  var lenis=window.__portfolioLenis;
  if(lenis&&typeof lenis.scrollTo==='function'){
    var options={force:true,immediate:!smooth};
    if(smooth){
      options.duration=.72;
      options.easing=function(t){return Math.min(1,1.001-Math.pow(2,-10*t));};
    }
    lenis.scrollTo(top,options);
    return;
  }
  window.scrollTo({top:top,behavior:smooth?'smooth':'auto'});
}

function experienceScrollBy(amount){
  experienceScrollTo(window.scrollY+amount,false);
}

function holdExperienceScrollAt(top){
  var sticky=document.getElementById('labSticky');
  if(!sticky){experienceScrollTo(top,false);return;}
  if(window.__experienceClampFrame)return;
  sticky.classList.add('is-scroll-held');
  experienceScrollTo(top,false);
  window.__experienceClampFrame=requestAnimationFrame(function(){
    window.__experienceClampFrame=requestAnimationFrame(function(){
      window.__experienceClampFrame=0;
      sticky.classList.remove('is-scroll-held');
    });
  });
}

(function(){
  'use strict';

  var messageSegments=[
    {text:'Нужен сайт для '},
    {text:'винодельческого оборудования',key:'product',label:'продукт'},
    {text:': показать '},
    {text:'каталог',key:'catalog',label:'каталог'},
    {text:', '},
    {text:'проекты',key:'projects',label:'проекты'},
    {text:' и сделать удобную '},
    {text:'заявку',key:'lead',label:'заявка'},
    {text:'.'}
  ];

  var reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var coarsePointer=window.matchMedia('(pointer:coarse)').matches;
  var webkitTouch=/AppleWebKit/i.test(navigator.userAgent)&&!/(Chrome|Chromium|CriOS|Edg|EdgiOS|OPR|OPiOS|FxiOS|Android)/i.test(navigator.userAgent);
  document.documentElement.classList.toggle('is-apple-webkit',webkitTouch);
  var section=document.getElementById('labExperience');
  var sticky=document.getElementById('labSticky');
  var visualField=document.getElementById('visualField');
  var worldGrid=document.getElementById('worldGrid');
  var copyOne=document.getElementById('copyOne');
  var copyTwo=document.getElementById('copyTwo');
  var copyThree=document.getElementById('copyThree');
  var stageTabs=Array.prototype.slice.call(document.querySelectorAll('#labExperience .stage-tab[data-jump]'));
  var launchJump=document.querySelector('#labExperience .stage-tab[data-launch-jump]');
  var stagePickerTabs=Array.prototype.slice.call(document.querySelectorAll('#labExperience .stage-copy > .stage-tabs .stage-tab'));
  var stageCount=document.getElementById('stageCount');
  var stageTrack=document.getElementById('stageTrack');
  var pageProgress=document.getElementById('pageProgress');
  var objectWrap=document.getElementById('objectWrap');
  var morphShell=document.getElementById('morphShell');
  var bubbleTail=document.getElementById('bubbleTail');
  var messageTint=document.getElementById('messageTint');
  var notificationContent=document.getElementById('notificationContent');
  var messageContent=document.getElementById('messageContent');
  var typedMessage=document.getElementById('typedMessage');
  var typingCaret=document.getElementById('typingCaret');
  var codeArea=document.querySelector('.code-area');
  var editorContent=document.getElementById('editorContent');
  var browserContent=document.getElementById('browserContent');
  var semanticAssembly=document.getElementById('semanticAssembly');
  var assemblyBackplate=document.getElementById('assemblyBackplate');
  var assemblyVeil=document.getElementById('assemblyVeil');
  var assemblyArtboard=document.getElementById('assemblyArtboard');
  var semanticModules=Array.prototype.slice.call(document.querySelectorAll('[data-semantic-module]'));
  var moduleLinks=Array.prototype.slice.call(document.querySelectorAll('[data-module-link]'));
  var moduleNodes=Array.prototype.slice.call(document.querySelectorAll('[data-module-node]'));
  var finalPreview=document.getElementById('finalPreview');
  var finalPreviewReady=false;
  var webkitFinalPortal=document.getElementById('webkitFinalPortal');
  var webkitFinalPortalImage=document.getElementById('webkitFinalPortalImage');
  var webkitFinalPortalReady=false;
  var buildSeam=document.getElementById('buildSeam');
  var assemblyBeam=document.getElementById('assemblyBeam');
  var assemblyRoute=document.getElementById('assemblyRoute');
  var assemblyRouteGlow=document.getElementById('assemblyRouteGlow');
  var assemblyRouteCore=document.getElementById('assemblyRouteCore');
  var assemblyRouteHead=document.getElementById('assemblyRouteHead');
  var assemblyNodes=Array.prototype.slice.call(document.querySelectorAll('[data-route-node]'));
  var buildPieces=Array.prototype.slice.call(document.querySelectorAll('[data-build-piece]'));
  var codeRows=Array.prototype.slice.call(document.querySelectorAll('.code-row'));
  var playControl=document.getElementById('playControl');
  var virtualCursor=document.getElementById('virtualCursor');
  var clickRing=document.getElementById('clickRing');
  var ribbonSvg=document.getElementById('ribbonSvg');
  var ribbonGlow=document.getElementById('ribbonGlow');
  var ribbonCore=document.getElementById('ribbonCore');
  var ribbonHead=document.getElementById('ribbonHead');
  var tokenLayer=document.getElementById('tokenLayer');
  var scrollCue=document.getElementById('scrollCue');
  var scrollCueText=document.getElementById('scrollCueText');

  if(!section||!sticky||!typedMessage||!morphShell)return;

  var allChars=[];
  var sourceTokens=[];
  var flightTokens=[];
  var tokenMetrics=[];
  var target=0;
  var visual=0;
  var follow=reduced?1:.09;
  var depth=1;
  var manual=false;
  var scrollTrigger=null;
  var pointerTarget={x:0,y:0};
  var pointer={x:0,y:0};
  var cursorTarget={x:0,y:0};
  var cursor={x:0,y:0,angle:0};
  var cursorMetrics={noticeStartX:0,noticeStartY:0,noticeX:0,noticeY:0,codeX:0,codeY:0,playX:0,playY:0};
  var noticeAction=0;
  var runAction=0;
  var lastTypedCount=-1;
  var lastNoticeSound=0;
  var lastRunSound=0;
  var lastTypingSound=-1;
  var desktopRibbonPath=ribbonCore.getAttribute('d');
  var mobileRibbonPath='M430 642 C650 642 790 607 875 552 C945 507 950 412 885 352 C775 257 540 267 340 307 C165 342 78 427 88 517 C98 597 220 642 400 642 C575 642 710 607 800 552';
  var activeRibbonPath='';
  var ribbonLength=1;
  var ribbonHeadScaleX=1;
  var assemblyRouteLength=1;
  var noticeTopInset=75;
  var noticeBottomInset=365;
  var messageLeftInset=60;
  var messageRightInset=36;
  var messageBottomInset=180;
  var runHoverTime=0;
  var runAutoAdvanced=false;
  var lastFrameTime=performance.now();
  var buildStart=.955;
  var exitGuardProgress=buildStart;
  var wheelFrame=0;
  var wheelStep=0;
  var exitGuardFrame=0;
  var storyUnits=1.86;
  var buildEnd=1.80;
  var idleCueTimer=0;
  var nudgeCueTimer=0;
  var cueStableSince=0;
  var cueStarted=false;
  var mobileFinalShellHeight=330;
  var processCompleted=false;
  var processFrozen=false;
  var processLoopRunning=false;

  function clamp(value,min,max){return Math.max(min,Math.min(max,value));}
  function mix(a,b,t){return a+(b-a)*t;}
  function segment(value,start,end){return clamp((value-start)/(end-start),0,1);}
  function smooth(value){return value*value*(3-2*value);}
  function out(value){return 1-Math.pow(1-value,3);}
  function backOut(value){var c1=1.36,c3=c1+1;return 1+c3*Math.pow(value-1,3)+c1*Math.pow(value-1,2);}
  function setOpacity(element,value){element.style.opacity=clamp(value,0,1).toFixed(3);}
  function setTransform(element,value){element.style.transform=value;}
  function labPhaseEnd(){return reduced?.60:(window.innerWidth<=700?.469:.447);}
  function wakeProcessFrame(){
    if(processLoopRunning||window.__experiencePassed||window.__experienceLabSuspended)return;
    lastFrameTime=performance.now();
    processLoopRunning=true;
    window.__experienceLabSchedule(frame);
  }
  window.__wakeExperienceProcess=wakeProcessFrame;
  window.__resumeExperienceProcess=function(){processFrozen=false;wakeProcessFrame();};
  function setProcessTarget(value){
    if(window.__experiencePassed)return;
    value=clamp(value,0,storyUnits);
    if(manual){
      processFrozen=false;
      target=value;
      wakeProcessFrame();
      return;
    }
    if(value<=target+.0005)return;
    processFrozen=false;
    target=value;
    wakeProcessFrame();
  }
  window.__labFreezeProcess=function(){
    if(manual)return;
    target=visual;
    processFrozen=true;
    runHoverTime=0;
  };
  window.__labProcessProgress=function(){return clamp(visual/storyUnits,0,1);};
  window.__setExperienceProcessOverall=function(overall){
    setProcessTarget(clamp(overall/labPhaseEnd(),0,1)*storyUnits);
  };
  function syncStagePicker(tabs,active){
    tabs.forEach(function(tab,index){
      tab.style.setProperty('--stage-shift',((index-active)*118)+'%');
      tab.classList.toggle('is-active',index===active);
      tab.setAttribute('aria-hidden',index===active?'false':'true');
    });
  }

  function markFinalPreviewReady(){finalPreviewReady=true;}
  function markWebkitFinalPortalReady(){webkitFinalPortalReady=true;}

  finalPreview.addEventListener('load',markFinalPreviewReady,{once:true});
  if(finalPreview.complete&&finalPreview.naturalWidth)markFinalPreviewReady();
  else if(finalPreview.decode)finalPreview.decode().then(markFinalPreviewReady).catch(function(){});
  webkitFinalPortalImage.addEventListener('load',markWebkitFinalPortalReady,{once:true});
  if(webkitFinalPortalImage.complete&&webkitFinalPortalImage.naturalWidth)markWebkitFinalPortalReady();
  else if(webkitFinalPortalImage.decode)webkitFinalPortalImage.decode().then(markWebkitFinalPortalReady).catch(function(){});

  function hexToRgb(hex){
    var clean=hex.replace('#','');
    if(clean.length===3)clean=clean.split('').map(function(ch){return ch+ch;}).join('');
    return [parseInt(clean.slice(0,2),16),parseInt(clean.slice(2,4),16),parseInt(clean.slice(4,6),16)];
  }
  function setAccent(color){
    var rgb=hexToRgb(color);
    document.documentElement.style.setProperty('--accent',color);
    document.documentElement.style.setProperty('--accent-rgb',rgb.join(','));
  }

  function buildMessage(){
    typedMessage.innerHTML='';
    messageSegments.forEach(function(segmentData){
      var parent=typedMessage;
      if(segmentData.key){
        parent=document.createElement('span');
        parent.className='message-source';
        parent.dataset.token=segmentData.key;
        parent.dataset.label=segmentData.label;
        typedMessage.appendChild(parent);
      }
      Array.from(segmentData.text).forEach(function(character){
        var span=document.createElement('span');
        span.className='typed-char';
        span.textContent=character;
        parent.appendChild(span);
        allChars.push(span);
      });
    });
    sourceTokens=Array.prototype.slice.call(document.querySelectorAll('.message-source'));
  }

  function createFlightTokens(){
    tokenLayer.innerHTML='';
    flightTokens=sourceTokens.map(function(source){
      var clone=document.createElement('span');
      clone.className='flight-token';
      clone.textContent=source.textContent.trim();
      tokenLayer.appendChild(clone);
      return clone;
    });
  }

  buildMessage();
  createFlightTokens();
  ribbonLength=ribbonCore.getTotalLength?ribbonCore.getTotalLength():1;
  assemblyRouteLength=assemblyRouteCore&&assemblyRouteCore.getTotalLength?assemblyRouteCore.getTotalLength():1;

  function updateCaret(count){
    if(count===lastTypedCount)return;
    lastTypedCount=count;
    var shellRect=morphShell.getBoundingClientRect();
    var textRect=typedMessage.getBoundingClientRect();
    var last=count>0?allChars[count-1]:null;
    var rect=last?last.getBoundingClientRect():textRect;
    var lineHeight=parseFloat(getComputedStyle(typedMessage).lineHeight)||28;
    var caretHeight=clamp(last?rect.height*.9:lineHeight*.9,21,32);
    var x=(last?rect.right:textRect.left)-shellRect.left+2;
    var y=(last?rect.top:textRect.top+(lineHeight-caretHeight)/2)-shellRect.top+1;
    typingCaret.style.left=x.toFixed(1)+'px';
    typingCaret.style.top=y.toFixed(1)+'px';
    typingCaret.style.height=caretHeight.toFixed(1)+'px';
  }

  function layoutRect(element,ancestor){
    var left=element.offsetLeft;
    var top=element.offsetTop;
    var node=element.offsetParent;
    while(node&&node!==ancestor){
      left+=node.offsetLeft;
      top+=node.offsetTop;
      node=node.offsetParent;
    }
    return {left:left,top:top,width:element.offsetWidth,height:element.offsetHeight};
  }

  function measure(){
    var restoreWebkitFlat=objectWrap.classList.contains('is-webkit-final');
    var restoreCompactResult=objectWrap.classList.contains('is-result-compact');
    objectWrap.classList.remove('is-webkit-final');
    objectWrap.classList.remove('is-result-compact');
    var nextRibbonPath=window.innerWidth<=700?mobileRibbonPath:desktopRibbonPath;
    if(activeRibbonPath!==nextRibbonPath){
      ribbonGlow.setAttribute('d',nextRibbonPath);
      ribbonCore.setAttribute('d',nextRibbonPath);
      activeRibbonPath=nextRibbonPath;
      ribbonLength=ribbonCore.getTotalLength?ribbonCore.getTotalLength():1;
    }
    var objectAnchorLeft=objectWrap.offsetLeft;
    var objectAnchorTop=objectWrap.offsetTop;
    var shellLeft=objectAnchorLeft-objectWrap.offsetWidth/2;
    var shellTop=objectAnchorTop-objectWrap.offsetHeight/2;
    tokenMetrics=sourceTokens.map(function(source){
      var targetElement=document.querySelector('[data-code-token="'+source.dataset.token+'"]');
      var sourceRect=layoutRect(source,morphShell);
      var targetRect=layoutRect(targetElement,morphShell);
      var flightToken=flightTokens[sourceTokens.indexOf(source)];
      var tokenWidth=Math.max(1,flightToken.offsetWidth);
      var tokenHeight=Math.max(1,flightToken.offsetHeight);
      return {
        sx:shellLeft+sourceRect.left+sourceRect.width/2,
        sy:shellTop+sourceRect.top+sourceRect.height/2,
        tx:shellLeft+targetRect.left+targetRect.width/2,
        ty:shellTop+targetRect.top+targetRect.height/2,
        tokenWidth:tokenWidth,
        tokenHeight:tokenHeight,
        endScale:clamp(targetRect.height/tokenHeight,.36,.72)
      };
    });
    var noticeRect=layoutRect(notificationContent,morphShell);
    var messageRect=layoutRect(messageContent,morphShell);
    var playRect=layoutRect(playControl,morphShell);
    var objectHeight=objectWrap.offsetHeight;
    var objectWidth=objectWrap.offsetWidth;
    var mobileLayout=window.innerWidth<=700;
    mobileFinalShellHeight=mobileLayout?40+objectWidth/1.6:objectHeight;
    var finalObjectAnchorLeft=objectAnchorLeft;
    var finalObjectAnchorTop=objectAnchorTop;
    var finalObjectWidth=objectWidth;
    var finalObjectHeight=objectHeight;
    var compactFinalLayout=window.innerWidth>700&&window.innerWidth<=1200;
    if(compactFinalLayout){
      finalObjectWidth=Math.min(window.innerWidth*.52,620,Math.max(1,(window.innerHeight-126)*1.38));
      finalObjectHeight=finalObjectWidth/1.38;
      finalObjectAnchorLeft=visualField.clientWidth*.72;
      finalObjectAnchorTop=visualField.clientHeight*(window.innerWidth<=820?.62:.56);
    }
    var finalScale=mobileLayout?1:.945;
    var finalX=mobileLayout?0:18;
    var finalY=mobileLayout?0:2;
    var flatWidth=finalObjectWidth*finalScale;
    var flatHeight=finalObjectHeight*finalScale;
    objectWrap.style.setProperty('--webkit-flat-left',(finalObjectAnchorLeft+finalX-flatWidth/2).toFixed(2)+'px');
    objectWrap.style.setProperty('--webkit-flat-top',(finalObjectAnchorTop+finalY-flatHeight/2).toFixed(2)+'px');
    objectWrap.style.setProperty('--webkit-flat-width',flatWidth.toFixed(2)+'px');
    objectWrap.style.setProperty('--webkit-flat-height',flatHeight.toFixed(2)+'px');
    var webkitPageTop=mobileLayout?40:50;
    webkitFinalPortal.style.left=(finalObjectAnchorLeft+finalX-flatWidth/2+1).toFixed(2)+'px';
    webkitFinalPortal.style.top=(finalObjectAnchorTop+finalY-flatHeight/2+webkitPageTop).toFixed(2)+'px';
    webkitFinalPortal.style.width=Math.max(1,flatWidth-2).toFixed(2)+'px';
    webkitFinalPortal.style.height=Math.max(1,flatHeight-webkitPageTop-1).toFixed(2)+'px';
    var ribbonRect=ribbonSvg.getBoundingClientRect();
    if(ribbonRect.width>0&&ribbonRect.height>0){
      ribbonHeadScaleX=(ribbonRect.height/700)/(ribbonRect.width/1000);
    }
    var compactMessage=window.innerWidth<=700;
    noticeTopInset=clamp(noticeRect.top-8,0,objectHeight-40);
    noticeBottomInset=clamp(
      objectHeight-(noticeRect.top+noticeRect.height+8),
      0,
      objectHeight-40
    );
    messageBottomInset=clamp(
      objectHeight-(messageRect.top+messageRect.height+16),
      window.innerWidth<=700?38:185,
      window.innerWidth<=700?92:275
    );
    messageLeftInset=clamp(
      messageRect.left-(compactMessage?12:18),
      compactMessage?8:40,
      objectWidth-80
    );
    messageRightInset=clamp(
      objectWidth-(messageRect.left+messageRect.width+(compactMessage?12:12)),
      compactMessage?8:24,
      objectWidth-80
    );
    cursorMetrics={
      noticeStartX:shellLeft+noticeRect.left+noticeRect.width+88,
      noticeStartY:shellTop+noticeRect.top+noticeRect.height+74,
      noticeX:shellLeft+noticeRect.left+noticeRect.width*.55,
      noticeY:shellTop+noticeRect.top+noticeRect.height*.54,
      codeX:shellLeft+objectWrap.offsetWidth*.64,
      codeY:shellTop+objectWrap.offsetHeight*.72,
      playX:shellLeft+playRect.left+playRect.width*.46,
      playY:shellTop+playRect.top+playRect.height*.48
    };
    objectWrap.classList.toggle('is-result-compact',restoreCompactResult);
    objectWrap.classList.toggle('is-webkit-final',restoreWebkitFlat);
    if(!cursor.x&&!cursor.y){cursor.x=cursorMetrics.noticeStartX;cursor.y=cursorMetrics.noticeStartY;}
  }

  function render(progress){
    var timeline=Math.max(0,progress);
    var p=clamp(timeline,0,1);
    var isMobile=window.innerWidth<=700;
    var buildP=smooth(segment(timeline,buildStart,buildEnd));
    var compactResultLayout=window.innerWidth>700&&window.innerWidth<=1200&&buildP>=.035;
    objectWrap.classList.toggle('is-result-compact',compactResultLayout);
    webkitFinalPortal.classList.toggle('is-result-compact',compactResultLayout);
    var buildCopyOut=smooth(segment(buildP,.001,.018));
    var buildCopy=smooth(segment(buildP,.006,.03));
    var browserIn=smooth(segment(buildP,.002,.04));
    var perspectiveIn=smooth(segment(buildP,.004,.06));
    var frontAlign=smooth(segment(buildP,.70,.84));
    var sideView=(reduced?0:perspectiveIn*(1-frontAlign));
    var arrival=backOut(segment(p,.015,.075));
    var noticeCursorIn=smooth(segment(p,.045,.08));
    var noticeCursorMove=smooth(segment(p,.065,.13));
    var openMessage=smooth(segment(p,.185,.285));
    var typeP=smooth(segment(p,.275,.49));
    var scanP=smooth(segment(p,.50,.69));
    var morph=smooth(segment(p,.62,.81));
    var mobileCodeScroll=isMobile
      ?-100*smooth(segment(p,.70,.84))-55*smooth(segment(p,.84,.91))
      :0;
    var playIn=smooth(segment(p,.84,.895));
    var runCursorIn=smooth(segment(p,.825,.87));
    var runCursorMove=smooth(segment(p,.845,.925));
    var copySwap=smooth(segment(p,.52,.68));
    var noticeClickPhase=segment(noticeAction,.02,.58);
    var runClickPhase=segment(runAction,.02,.58);
    var noticePress=noticeAction<.58?Math.sin(noticeClickPhase*Math.PI):0;
    var runPress=runAction<.58?Math.sin(runClickPhase*Math.PI):0;
    var runHover=smooth(clamp(runHoverTime/.18,0,1));

    setOpacity(copyOne,1-copySwap);
    setTransform(copyOne,'translate3d(0,'+(-26*copySwap)+'px,0)');
    copyOne.style.filter='blur('+(2.5*copySwap).toFixed(2)+'px)';
    setOpacity(copyTwo,copySwap*(1-buildCopyOut));
    setTransform(copyTwo,'translate3d(0,'+(36*(1-copySwap)-26*buildCopyOut).toFixed(1)+'px,0)');
    copyTwo.style.filter='blur('+(3*(1-copySwap)+2.5*buildCopyOut).toFixed(2)+'px)';
    copyTwo.setAttribute('aria-hidden',copySwap>.5&&buildCopyOut<.5?'false':'true');
    setOpacity(copyThree,buildCopy);
    setTransform(copyThree,'translate3d(0,'+(36*(1-buildCopy)).toFixed(1)+'px,0)');
    copyThree.style.filter='blur('+(3*(1-buildCopy)).toFixed(2)+'px)';
    copyThree.setAttribute('aria-hidden',buildCopy>.5?'false':'true');
    var overallProgress=clamp(timeline/storyUnits,0,1);
    if(!window.__labLaunchActive){
      var activeStage=timeline<.60?0:(timeline<buildStart?1:2);
      syncStagePicker(stagePickerTabs,activeStage);
      stageCount.textContent=timeline<.60?'01 / 04':(timeline<buildStart?'02 / 04':'03 / 04');
      stageTrack.style.transform='scaleX('+overallProgress.toFixed(4)+')';
    }
    pageProgress.style.transform='scaleY('+overallProgress.toFixed(4)+')';
    if(overallProgress>=.98)hideScrollCue();

    var objectScale=isMobile
      ?mix(.92,1,arrival)-noticePress*.006-sideView*.02
      :mix(.92,1,arrival)-noticePress*.006-sideView*.08-frontAlign*.055;
    var objectX=isMobile
      ?mix(70,0,arrival)
      :mix(90,0,arrival)-sideView*2+frontAlign*18;
    var objectY=isMobile
      ?mix(18,0,arrival)+sideView
      :mix(24,0,arrival)+sideView*5+frontAlign*2;
    var pointerWeight=1-morph*.65-buildP*.12;
    var objectRotateX=-pointer.y*2.3*depth*pointerWeight+sideView*(isMobile?4:17);
    var objectRotateY=pointer.x*3.2*depth*pointerWeight-sideView*(isMobile?.35:2);
    var objectRotateZ=-sideView*(isMobile?0:1.2);
    var webkitFinalFlat=webkitTouch&&buildP>=.84;
    var webkitImageReady=webkitTouch&&buildP>=.90;
    objectWrap.classList.toggle('is-webkit-final',webkitFinalFlat);
    webkitFinalPortal.classList.toggle('is-visible',webkitImageReady&&webkitFinalPortalReady);
    setOpacity(objectWrap,arrival);
    setTransform(objectWrap,
      'translate3d(calc(-50% + '+objectX.toFixed(1)+'px),calc(-50% + '+objectY.toFixed(1)+'px),0) '+
      'rotateX('+objectRotateX.toFixed(2)+'deg) '+
      'rotateY('+objectRotateY.toFixed(2)+'deg) '+
      'rotateZ('+objectRotateZ.toFixed(2)+'deg) '+
      'scale('+objectScale.toFixed(4)+')'
    );

    var noticeClip=isMobile?{top:noticeTopInset,right:8,bottom:noticeBottomInset,left:18,radius:15}:{top:noticeTopInset,right:22,bottom:noticeBottomInset,left:330,radius:17};
    var messageClip=isMobile?{top:80,right:messageRightInset,bottom:messageBottomInset,left:messageLeftInset,radius:20}:{top:92,right:messageRightInset,bottom:messageBottomInset,left:messageLeftInset,radius:22};
    var messageTop=mix(noticeClip.top,messageClip.top,openMessage);
    var messageRight=mix(noticeClip.right,messageClip.right,openMessage);
    var messageBottom=mix(noticeClip.bottom,messageClip.bottom,openMessage);
    var messageLeft=mix(noticeClip.left,messageClip.left,openMessage);
    var messageRadius=mix(noticeClip.radius,messageClip.radius,openMessage);
    var top=mix(messageTop,0,morph);
    var right=mix(messageRight,0,morph);
    var bottom=mix(messageBottom,0,morph);
    var left=mix(messageLeft,0,morph);
    var radius=mix(messageRadius,14,morph);
    morphShell.style.clipPath='inset('+top.toFixed(1)+'px '+right.toFixed(1)+'px '+bottom.toFixed(1)+'px '+left.toFixed(1)+'px round '+radius.toFixed(1)+'px)';
    var mobileShellResize=isMobile?smooth(segment(buildP,.72,.84)):0;
    if(isMobile&&mobileShellResize>0){
      morphShell.style.bottom='auto';
      morphShell.style.height=mix(objectWrap.offsetHeight,mobileFinalShellHeight,mobileShellResize).toFixed(2)+'px';
    }else{
      morphShell.style.bottom='';
      morphShell.style.height='';
    }
    morphShell.style.borderColor='rgba(255,255,255,'+mix(.10,.14,scanP*(1-morph)+morph*.35).toFixed(3)+')';
    morphShell.style.boxShadow=(sideView*24).toFixed(1)+'px '+(44+sideView*12).toFixed(1)+'px '+(110+sideView*34).toFixed(1)+'px rgba(0,0,0,'+(.42+sideView*.08).toFixed(3)+'),inset 0 1px rgba(255,255,255,.055)';
    var notificationExit=smooth(segment(openMessage,.08,.58));
    var messageReveal=smooth(segment(openMessage,.34,.9));
    setOpacity(notificationContent,arrival*(1-notificationExit));
    setTransform(notificationContent,'translate3d('+mix(18,-18,openMessage).toFixed(1)+'px,0,0) scale('+(1-noticePress*.022).toFixed(3)+')');
    notificationContent.style.filter='blur('+(openMessage*1.7).toFixed(2)+'px)';
    setOpacity(messageTint,arrival*(.36+openMessage*.64)*(1-morph*.92));
    setOpacity(bubbleTail,openMessage*(1-morph)*arrival);
    setTransform(bubbleTail,'rotate(2deg) scale('+mix(1,.4,morph).toFixed(3)+')');
    bubbleTail.style.right=Math.max(2,messageRightInset-(isMobile?2:16)).toFixed(1)+'px';
    bubbleTail.style.bottom=(messageBottomInset+5).toFixed(1)+'px';
    setOpacity(messageContent,messageReveal*(1-smooth(segment(p,.64,.81))));
    setTransform(messageContent,'translate3d('+(morph*-18).toFixed(1)+'px,'+(mix(12,0,openMessage)+morph*-14).toFixed(1)+'px,0) scale('+mix(.985,.97,morph).toFixed(3)+')');
    messageContent.style.filter='blur('+(mix(2.2,0,openMessage)+morph*1.4).toFixed(2)+'px)';

    var typedCount=Math.floor(typeP*allChars.length);
    allChars.forEach(function(character,index){character.classList.toggle('is-visible',index<typedCount);});
    updateCaret(typedCount);
    var caretVisible=smooth(segment(p,.235,.265))*(1-smooth(segment(p,.49,.525)));
    var blink=typeP>=1?(Math.sin(performance.now()*.012)>.05?1:.2):1;
    setOpacity(typingCaret,caretVisible*blink*openMessage*(1-morph));

    var ribbonFade=1-smooth(segment(p,.586,.659));
    var ribbonDrawP=isMobile?clamp(scanP-.085,0,1):scanP;
    var ribbonVisibility=ribbonDrawP*ribbonFade;
    var ribbonHeadVisibility=smooth(segment(scanP,0,.045))*ribbonFade;
    setOpacity(ribbonSvg,Math.max(ribbonVisibility,ribbonHeadVisibility)>0?1:0);
    setOpacity(ribbonGlow,ribbonVisibility);
    setOpacity(ribbonCore,ribbonVisibility);
    var dash=1-ribbonDrawP;
    ribbonGlow.style.strokeDashoffset=dash.toFixed(4);
    ribbonCore.style.strokeDashoffset=dash.toFixed(4);
    if(ribbonCore.getPointAtLength){
      var point=ribbonCore.getPointAtLength(ribbonLength*scanP);
      ribbonHead.setAttribute('transform','translate('+point.x.toFixed(2)+' '+point.y.toFixed(2)+') rotate('+mix(-13,-5,scanP).toFixed(2)+') scale('+(.96*ribbonHeadScaleX).toFixed(3)+' .96)');
    }
    setOpacity(ribbonHead,scanP>0&&scanP<.995?clamp(ribbonHeadVisibility,0,1):0);

    sourceTokens.forEach(function(source,index){
      var hit=smooth(segment(scanP,.08+index*.15,.34+index*.15));
      var extraction=smooth(segment(p,.62+index*.028,.76+index*.028));
      var handoff=smooth(segment(extraction,0,.12));
      source.style.backgroundSize=(hit*100).toFixed(1)+'% 38%';
      source.style.color=hit>.2?'var(--accent)':'var(--ink)';
      source.style.opacity=(1-handoff).toFixed(3);
    });

    flightTokens.forEach(function(token,index){
      var metric=tokenMetrics[index];
      if(!metric)return;
      var flightStart=.62+index*.028;
      var flightEnd=.76+index*.028;
      var settleStart=flightEnd-.006;
      var fly=smooth(segment(p,flightStart,flightEnd));
      var settle=smooth(segment(p,settleStart,flightEnd+.05));
      var arc=Math.sin(fly*Math.PI);
      var bendX=[110,70,-58,94][index]||0;
      var bendY=[-96,-52,74,102][index]||0;
      var x=mix(metric.sx,metric.tx,fly)+arc*bendX;
      var shiftedTargetY=metric.ty+mobileCodeScroll;
      var y=mix(metric.sy,shiftedTargetY,fly)+arc*bendY;
      var scale=mix(1,metric.endScale,fly)+arc*.1;
      var tokenIn=smooth(segment(fly,0,.12));
      setOpacity(token,tokenIn*(1-settle));
      setTransform(token,'translate3d('+(x-metric.tokenWidth/2).toFixed(1)+'px,'+(y-metric.tokenHeight/2).toFixed(1)+'px,'+(arc*72).toFixed(1)+'px) rotate('+((index%2?-1:1)*arc*9).toFixed(1)+'deg) scale('+scale.toFixed(3)+')');
      token.style.filter='blur('+(settle*1.8).toFixed(2)+'px)';
      var targetElement=document.querySelector('[data-code-token="'+sourceTokens[index].dataset.token+'"]');
      setOpacity(targetElement,settle);
      targetElement.style.color=settle>.5?'var(--accent)':'var(--ink)';
      targetElement.style.textShadow='none';
    });

    var editorOut=smooth(segment(buildP,.002,.045));
    codeArea.scrollTop=Math.max(0,-mobileCodeScroll);
    setOpacity(editorContent,morph*(1-editorOut));
    setTransform(editorContent,'translate3d('+(18*(1-morph)).toFixed(1)+'px,'+(-5*editorOut).toFixed(1)+'px,'+(-22*editorOut).toFixed(1)+'px) scale('+mix(1,.992,editorOut).toFixed(4)+')');
    editorContent.style.filter='blur('+(2.2*(1-morph)+editorOut*.7).toFixed(2)+'px)';
    editorContent.style.clipPath='none';
    var rowRevealStarts=[
      .630,.642,.654,.666,.678,.690,.702,.714,.726,.738,
      .754,.762,.769,.776,.782,.810,.818,.838,.846,.858,
      .870,.882,.894
    ];
    codeRows.forEach(function(row,index){
      var rowStart=rowRevealStarts[index]||(.63+index*.012);
      var rowP=smooth(segment(p,rowStart,rowStart+.04));
      var rowTarget=row.querySelector('.code-target');
      if(rowTarget){
        var rowTokenIndex=sourceTokens.findIndex(function(source){return source.dataset.token===rowTarget.dataset.codeToken;});
        var tokenArrival=.754+rowTokenIndex*.028;
        rowP=smooth(segment(p,tokenArrival,tokenArrival+.04));
      }
      setOpacity(row,rowP);
      setTransform(row,'translate3d('+(12*(1-rowP)).toFixed(1)+'px,0,0)');
      row.style.filter='blur('+(1.8*(1-rowP)).toFixed(2)+'px)';
      row.style.clipPath='inset(0 '+((1-rowP)*100).toFixed(1)+'% 0 0)';
      row.classList.toggle('is-active',rowP>.25&&rowP<.96);
    });

    setOpacity(playControl,playIn*(1-editorOut));
    setTransform(playControl,'scale('+(mix(.94,1,playIn)+runHover*.018-runPress*.09).toFixed(3)+')');
    playControl.style.background='rgba(255,255,255,'+(.025+runPress*.035).toFixed(3)+')';
    playControl.style.boxShadow='none';

    var firstCursorVisible=noticeCursorIn*(1-smooth(segment(noticeAction,.7,1)));
    var secondCursorVisible=runCursorIn*(1-smooth(segment(runAction,.86,1))*.18);
    if(p<.28){
      cursorTarget.x=mix(cursorMetrics.noticeStartX,cursorMetrics.noticeX,noticeCursorMove);
      cursorTarget.y=mix(cursorMetrics.noticeStartY,cursorMetrics.noticeY,noticeCursorMove);
    }else if(p<.82){
      cursorTarget.x=cursorMetrics.codeX;
      cursorTarget.y=cursorMetrics.codeY;
    }else{
      cursorTarget.x=mix(cursorMetrics.codeX,cursorMetrics.playX,runCursorMove);
      cursorTarget.y=mix(cursorMetrics.codeY,cursorMetrics.playY,runCursorMove);
    }
    var cursorVisible=Math.max(firstCursorVisible,secondCursorVisible)*(1-smooth(segment(buildP,.02,.2)));
    setOpacity(virtualCursor,cursorVisible);
    var cursorScale=1-Math.max(noticePress,runPress)*.12;
    setTransform(virtualCursor,'translate3d('+(cursor.x-4).toFixed(1)+'px,'+(cursor.y-4).toFixed(1)+'px,0) rotate('+cursor.angle.toFixed(2)+'deg) scale('+cursorScale.toFixed(3)+')');

    var ringP=noticePress>0?noticeClickPhase:runClickPhase;
    var ringOpacity=Math.max(noticePress,runPress);
    setOpacity(clickRing,ringOpacity);
    setTransform(clickRing,'translate3d('+(cursor.x-16).toFixed(1)+'px,'+(cursor.y-16).toFixed(1)+'px,0) scale('+mix(.55,1.45,out(ringP)).toFixed(3)+')');
    setOpacity(browserContent,smooth(segment(browserIn,0,.18)));
    browserContent.style.clipPath='none';
    setTransform(browserContent,'translate3d(0,'+(7*(1-browserIn)).toFixed(1)+'px,0) scale('+mix(.992,1,browserIn).toFixed(4)+')');
    browserContent.style.filter='blur('+(1.8*(1-browserIn)).toFixed(2)+'px)';
    setOpacity(buildSeam,0);

    var backdropIn=smooth(segment(buildP,.012,.075));
    var artboardIn=smooth(segment(buildP,.035,.10));
    var moduleStarts=[.09,.19,.30,.41,.52];
    var materialP=smooth(segment(buildP,webkitTouch?.88:.82,.97));
    setOpacity(semanticAssembly,1);
    setOpacity(assemblyBackplate,backdropIn);
    setTransform(assemblyBackplate,'scale('+mix(1.035,1,backdropIn).toFixed(4)+')');
    assemblyBackplate.style.filter='none';
    setOpacity(assemblyVeil,backdropIn*(1-materialP*.68));
    setOpacity(assemblyArtboard,artboardIn*(1-materialP));
    setTransform(assemblyArtboard,'translate3d(0,'+(6*(1-artboardIn)).toFixed(1)+'px,'+(sideView*8).toFixed(1)+'px) scale('+mix(.992,1,artboardIn).toFixed(4)+')');
    assemblyArtboard.style.filter='blur('+(1.4*(1-artboardIn)+materialP*1.2).toFixed(2)+'px)';

    semanticModules.forEach(function(module,index){
      var reveal=smooth(segment(buildP,moduleStarts[index],moduleStarts[index]+.15));
      setOpacity(module,reveal*(1-materialP));
      setTransform(module,'translate3d(0,'+(8*(1-reveal)).toFixed(1)+'px,'+((12+index*3)*(1-reveal)*sideView).toFixed(1)+'px) scale('+mix(.992,1,reveal).toFixed(4)+')');
      module.style.clipPath='inset(0 '+((1-reveal)*100).toFixed(2)+'% 0 0)';
      module.style.filter='blur('+(1.2*(1-reveal)+materialP).toFixed(2)+'px)';
    });

    setOpacity(finalPreview,finalPreviewReady&&!webkitTouch?materialP:0);
    setTransform(finalPreview,webkitTouch?'translate3d(0,0,0)':'translate3d(0,0,14px)');
    finalPreview.style.filter=webkitTouch?'none':'grayscale('+(1-materialP).toFixed(3)+') blur('+(2.6*(1-materialP)).toFixed(2)+'px)';
    setOpacity(webkitFinalPortal,webkitTouch&&webkitImageReady&&webkitFinalPortalReady?materialP:0);
    buildPieces.forEach(function(piece){
      setOpacity(piece,1);
      setTransform(piece,'none');
      piece.style.clipPath='none';
      piece.style.filter='none';
      piece.style.boxShadow='none';
      piece.style.setProperty('--layer-label-opacity','0');
    });

    setOpacity(assemblyBeam,0);
    setOpacity(assemblyRoute,0);
    setOpacity(assemblyRouteHead,0);
    assemblyNodes.forEach(function(node){setOpacity(node,0);});

    var gridX=mix(0,-58,p)-buildP*34+pointer.x*8;
    setTransform(worldGrid,'perspective(900px) rotateX('+(66-buildP*3).toFixed(2)+'deg) translate3d('+gridX.toFixed(1)+'px,'+(-25*p-buildP*18).toFixed(1)+'px,0)');
    worldGrid.style.opacity=(.3-morph*.07-buildP*.04).toFixed(3);
  }

  function frame(now){
    if(window.__experiencePassed||window.__experienceLabSuspended){processLoopRunning=false;return;}
    var frameTime=typeof now==='number'?now:performance.now();
    var deltaTime=clamp((frameTime-lastFrameTime)/1000,0,.05);
    lastFrameTime=frameTime;
    if(processFrozen){
      render(visual);
      syncFx();
      window.__experienceLabSchedule(frame);
      return;
    }
    pointer.x+=(pointerTarget.x-pointer.x)*(reduced?1:.055);
    pointer.y+=(pointerTarget.y-pointer.y)*(reduced?1:.055);
    var gatedTarget=target;
    var soundForward=!manual;
    if(target>.16&&noticeAction<.96)gatedTarget=Math.min(gatedTarget,.16);
    else if(target>.935&&runAction<.96)gatedTarget=Math.min(gatedTarget,.935);
    if(reduced){
      visual=gatedTarget;
    }else{
      gatedTarget=Math.max(gatedTarget,visual);
      /* Keep the scene close to the physical scroll. The old cinematic caps made
         a fast swipe reach the end while the visuals were still several seconds
         behind, which felt like the page had skipped the whole interaction. */
      var catchup=1-Math.exp(-8*deltaTime);
      var visualDelta=(gatedTarget-visual)*Math.max(follow,catchup);
      var messageCorridor=visual>.255&&visual<.42;
      var codeCorridor=visual>.42&&visual<buildStart;
      var buildCorridor=visual>buildStart&&visual<buildEnd;
      var buildIntro=visual>buildStart&&visual<buildStart+.15;
      var maxVisualRate=messageCorridor?1.02:(codeCorridor?.90:(buildCorridor?(buildIntro?1.12:1.00):1.16));
      var maxVisualStep=maxVisualRate*Math.max(deltaTime,1/120);
      visual+=clamp(visualDelta,-maxVisualStep,maxVisualStep);
    }
    if(Math.abs(gatedTarget-visual)<.00005)visual=gatedTarget;
    if(visual>=buildEnd-.006)processCompleted=true;
    window.__labProcessReady=processCompleted;
    if(processCompleted&&typeof window.__wakeExperienceLaunch==='function')window.__wakeExperienceLaunch();

    var cursorDx=cursorTarget.x-cursor.x;
    var cursorDy=cursorTarget.y-cursor.y;
    var cursorFollow=reduced?1:.2;
    cursor.x+=cursorDx*cursorFollow;
    cursor.y+=cursorDy*cursorFollow;
    cursor.angle+=(clamp(cursorDx*.035,-7,7)-cursor.angle)*(reduced?1:.14);

    var noticeDistance=Math.hypot(cursor.x-cursorMetrics.noticeX,cursor.y-cursorMetrics.noticeY);
    var noticeActionTarget=noticeAction;
    if(target<.13&&visual<.13)noticeActionTarget=0;
    else if(noticeAction<.96)noticeActionTarget=target>.16&&visual>.145&&noticeDistance<13?1:0;
    else noticeActionTarget=1;
    noticeAction+=(noticeActionTarget-noticeAction)*(reduced?1:.1);
    if(soundForward&&noticeAction>=.55&&lastNoticeSound<.55&&window.__labSound)window.__labSound.click('soft');
    lastNoticeSound=noticeAction;

    var runDistance=Math.hypot(cursor.x-cursorMetrics.playX,cursor.y-cursorMetrics.playY);
    var runReady=target>.935&&visual>.91&&noticeAction>.95&&runDistance<12;
    var runActionTarget=runAction;
    if(target<.88&&visual<.88){
      runActionTarget=0;
      runHoverTime=0;
      runAutoAdvanced=false;
    }else if(runAction<.96){
      if(runReady)runHoverTime=Math.min(.26,runHoverTime+(reduced?.18:deltaTime));
      else runHoverTime=0;
      runActionTarget=runReady&&runHoverTime>=.18?1:0;
    }else{
      runActionTarget=1;
    }
    runAction+=(runActionTarget-runAction)*(reduced?1:.18);
    if(soundForward&&runAction>=.55&&lastRunSound<.55&&window.__labSound)window.__labSound.click('strong');
    lastRunSound=runAction;
    if(soundForward&&visual>=.46&&visual<.90){
      var typingSound=Math.floor((visual-.46)/.03);
      if(typingSound!==lastTypingSound&&window.__labSound){
        lastTypingSound=typingSound;
        window.__labSound.type(typingSound);
      }
    }else if(visual<.44){
      lastTypingSound=-1;
    }
    if(!manual&&!runAutoAdvanced&&runAction>=.96){
      runAutoAdvanced=true;
      target=Math.max(target,buildStart+.13);
    }

    render(visual);
    syncFx();
    if(processCompleted&&window.__labLaunchActive){processLoopRunning=false;return;}
    window.__experienceLabSchedule(frame);
  }

  function cueCanShow(){
    if(!scrollCue||visual>=buildEnd-.01)return false;
    var rect=section.getBoundingClientRect();
    return rect.top<window.innerHeight&&rect.bottom>0;
  }

  function hideScrollCue(){
    if(!scrollCue)return;
    scrollCue.classList.remove('is-visible','is-idle','is-nudging');
  }

  function cueAnimationSettled(){
    var noticeSettled=noticeAction<.03||noticeAction>.97;
    var runSettled=runAction<.03||runAction>.97;
    return !manual&&!processFrozen&&Math.abs(target-visual)<.003&&noticeSettled&&runSettled;
  }

  function scheduleScrollCue(){
    clearTimeout(idleCueTimer);
    clearTimeout(nudgeCueTimer);
    cueStableSince=0;
    function waitForRest(){
      if(!cueCanShow())return;
      var now=performance.now();
      if(!cueAnimationSettled()){
        cueStableSince=0;
        idleCueTimer=setTimeout(waitForRest,180);
        return;
      }
      if(!cueStableSince)cueStableSince=now;
      if(now-cueStableSince<650){
        idleCueTimer=setTimeout(waitForRest,180);
        return;
      }
      scrollCueText.textContent='Дальше';
      scrollCue.classList.add('is-visible','is-idle');
      if(!reduced){
        nudgeCueTimer=setTimeout(function(){
          if(!cueCanShow()||!scrollCue.classList.contains('is-visible'))return;
          scrollCue.classList.remove('is-nudging');
          void scrollCue.offsetWidth;
          scrollCue.classList.add('is-nudging');
        },2100);
      }
    }
    idleCueTimer=setTimeout(waitForRest,180);
  }

  function registerCueActivity(){
    cueStarted=true;
    hideScrollCue();
    scheduleScrollCue();
  }

  ['wheel','touchstart','touchmove','pointerdown','keydown'].forEach(function(eventName){
    window.addEventListener(eventName,registerCueActivity,{passive:true});
  });
  if(scrollCue){
    if(window.scrollY>4){
      cueStarted=true;
      hideScrollCue();
      scheduleScrollCue();
    }else if(!reduced){
      nudgeCueTimer=setTimeout(function(){
        if(!cueStarted&&cueCanShow())scrollCue.classList.add('is-nudging');
      },2200);
    }
  }

  sticky.addEventListener('pointermove',function(event){
    if(reduced)return;
    var rect=sticky.getBoundingClientRect();
    pointerTarget.x=clamp((event.clientX-rect.left)/rect.width*2-1,-1,1);
    pointerTarget.y=clamp((event.clientY-rect.top)/rect.height*2-1,-1,1);
  });
  sticky.addEventListener('pointerleave',function(){pointerTarget.x=0;pointerTarget.y=0;});

  function scrollToProgress(progress){
    manual=false;
    runAutoAdvanced=progress>.935;
    if(typeof window.__experienceVirtualSeek==='function'){
      window.__experienceVirtualSeek(labPhaseEnd()*clamp(progress/storyUnits,0,1));
      return;
    }
    if(progress<visual){
      visual=progress;
      noticeAction=progress>.16?1:0;
      runAction=progress>.935?1:0;
      runHoverTime=0;
      render(visual);
    }
    var sectionTop=section.getBoundingClientRect().top+window.scrollY;
    var distance=Math.max(1,section.offsetHeight-window.innerHeight);
    experienceScrollTo(sectionTop+distance*labPhaseEnd()*clamp(progress/storyUnits,0,1),!reduced);
  }
  stageTabs.forEach(function(tab){tab.addEventListener('click',function(){scrollToProgress(parseFloat(tab.dataset.jump)||0);});});
  if(launchJump)launchJump.addEventListener('click',function(){
    manual=false;
    if(typeof window.__experienceVirtualSeek==='function'){
      var virtualSplit=labPhaseEnd();
      window.__experienceVirtualSeek(virtualSplit+(1-virtualSplit)*.018);
      return;
    }
    var sectionTop=section.getBoundingClientRect().top+window.scrollY;
    var distance=Math.max(1,section.offsetHeight-window.innerHeight);
    var split=labPhaseEnd();
    experienceScrollTo(sectionTop+distance*(split+(1-split)*.018),!reduced);
  });

  function fallbackScroll(){
    if(manual||window.__experienceVirtualMode)return;
    var rect=section.getBoundingClientRect();
    var distance=Math.max(1,section.offsetHeight-window.innerHeight);
    var overall=clamp(-rect.top/distance,0,1);
    setProcessTarget(clamp(overall/labPhaseEnd(),0,1)*storyUnits);
  }

  function sectionProgress(){
    var sectionTop=section.getBoundingClientRect().top+window.scrollY;
    var distance=Math.max(1,section.offsetHeight-window.innerHeight);
    var overall=clamp((window.scrollY-sectionTop)/distance,0,1);
    var split=labPhaseEnd();
    var progress=clamp(overall/split,0,1);
    return {
      progress:progress,
      timeline:progress*storyUnits,
      overall:overall,
      split:split,
      top:sectionTop,
      distance:distance,
      processDistance:distance*split
    };
  }

  function governWheel(event){
    if(window.__experiencePassed||reduced||manual||event.deltaY<=0)return;
    var rect=section.getBoundingClientRect();
    if(rect.top>1||rect.bottom<window.innerHeight)return;
    var state=sectionProgress();
    if(state.overall>=state.split)return;
    var maxLead=runAction<.96&&state.timeline>.88?.012:(state.timeline>1?.035:.045);
    var available=Math.max(0,(visual+maxLead-state.timeline)/storyUnits*state.processDistance);
    var step=Math.min(event.deltaY,64,available);
    if(step+1<event.deltaY){
      event.preventDefault();
      if(step>.5){
        wheelStep=Math.max(wheelStep,step);
        if(!wheelFrame){
          wheelFrame=requestAnimationFrame(function(){
            wheelFrame=0;
            var amount=wheelStep;
            wheelStep=0;
            experienceScrollBy(amount);
          });
        }
      }
    }
  }

  function guardSectionExit(){
    if(window.__experiencePassed||reduced||manual)return;
    var state=sectionProgress();
    var limitTimeline;
    if(runAction<.96)limitTimeline=exitGuardProgress;
    else if(visual<buildEnd-.006)limitTimeline=buildEnd+.025;
    else return;
    var programmatic=performance.now()<(window.__experienceProgrammaticScrollUntil||0);
    if(!programmatic){
      var maxLead=runAction<.96&&state.timeline>.88?.012:(state.timeline>1?.035:.045);
      var leadLimit=visual+maxLead;
      limitTimeline=Math.min(limitTimeline,leadLimit);
    }
    var limit=Math.round(state.top+state.processDistance*clamp(limitTimeline/storyUnits,0,1));
    if(window.scrollY>limit+2&&!exitGuardFrame){
      exitGuardFrame=requestAnimationFrame(function(){
        exitGuardFrame=0;
        if(window.scrollY>limit+2){
          if(!programmatic&&target>limitTimeline)target=limitTimeline;
          holdExperienceScrollAt(limit);
        }
      });
    }
  }

  if(!window.__experienceVirtualMode){
    window.addEventListener('wheel',governWheel,{passive:false,capture:true});
    var processTouchY=0;
    window.addEventListener('touchstart',function(event){
      if(event.touches&&event.touches[0])processTouchY=event.touches[0].clientY;
    },{passive:true});
    window.addEventListener('touchmove',function(event){
      if(!event.touches||!event.touches[0])return;
      var nextY=event.touches[0].clientY;
      var delta=processTouchY-nextY;
      processTouchY=nextY;
      if(delta<=0)return;
      governWheel({deltaY:delta,preventDefault:function(){event.preventDefault();}});
    },{passive:false,capture:true});
    window.addEventListener('scroll',fallbackScroll,{passive:true});
    window.addEventListener('scroll',guardSectionExit,{passive:true});
  }
  fallbackScroll();
  document.addEventListener('visibilitychange',function(){
    if(document.hidden)return;
    lastFrameTime=performance.now();
    fallbackScroll();
    wakeProcessFrame();
  });

  var fxParams=new URLSearchParams(window.location.search);
  var fxEnabled=false;
  var fxScene=parseFloat(fxParams.get('scene'));
  var fxProgress=document.getElementById('fxProgress');
  var fxDepth=document.getElementById('fxDepth');
  var fxFollow=document.getElementById('fxFollow');
  var fxAccent=document.getElementById('fxAccent');
  var fxProgressOut=document.getElementById('fxProgressOut');
  var fxDepthOut=document.getElementById('fxDepthOut');
  var fxFollowOut=document.getElementById('fxFollowOut');
  var fxMode=document.getElementById('fxMode');
  var fxResume=document.getElementById('fxResume');
  var fxReset=document.getElementById('fxReset');
  var fxKey='messageWebsiteLabV2';

  function loadFx(){
    if(!fxEnabled)return;
    if(fxParams.get('hidefx')!=='1')document.body.classList.add('fx-enabled');
    try{
      var saved=JSON.parse(localStorage.getItem(fxKey)||'{}');
      if(saved.depth){fxDepth.value=saved.depth;depth=parseFloat(saved.depth)/100;}
      if(saved.follow){fxFollow.value=saved.follow;follow=parseFloat(saved.follow)/100;}
      if(saved.accent){fxAccent.value=saved.accent;setAccent(saved.accent);}
    }catch(error){}
  }
  function saveFx(){
    if(!fxEnabled)return;
    try{localStorage.setItem(fxKey,JSON.stringify({depth:fxDepth.value,follow:fxFollow.value,accent:fxAccent.value}));}catch(error){}
  }
  function syncFx(){
    if(!fxEnabled)return;
    if(!manual)fxProgress.value=(visual*100).toFixed(1);
    fxProgressOut.value=Math.round(visual*100);
    fxDepthOut.value=Math.round(depth*100);
    fxFollowOut.value=Math.round(follow*100);
    fxMode.textContent=manual?'Manual':'Scroll';
  }
  loadFx();
  if(fxEnabled){
    fxProgress.addEventListener('input',function(){manual=true;target=visual=parseFloat(this.value)/100;render(visual);});
    fxDepth.addEventListener('input',function(){depth=parseFloat(this.value)/100;saveFx();});
    fxFollow.addEventListener('input',function(){follow=parseFloat(this.value)/100;saveFx();});
    fxAccent.addEventListener('input',function(){setAccent(this.value);saveFx();});
    fxResume.addEventListener('click',function(){manual=false;fallbackScroll();if(scrollTrigger)target=clamp(scrollTrigger.progress/labPhaseEnd(),0,1)*storyUnits;});
    fxReset.addEventListener('click',function(){
      depth=1;follow=.09;setAccent('#ff4764');fxDepth.value=100;fxFollow.value=9;fxAccent.value='#ff4764';
      try{localStorage.removeItem(fxKey);}catch(error){}
    });
  }

  var resizeTimer;
  window.addEventListener('resize',function(){
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(function(){measure();if(window.ScrollTrigger)window.ScrollTrigger.refresh();},120);
  });
  window.addEventListener('load',function(){measure();if(window.ScrollTrigger)window.ScrollTrigger.refresh();});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
  else setTimeout(measure,200);

  var recordLabControl=document.getElementById('recordLabControl');
  if(recordLabControl&&new URLSearchParams(location.search).get('record')==='1'){
    recordLabControl.addEventListener('input',function(){
      var value=parseFloat(this.value);
      if(!Number.isFinite(value))return;
      manual=true;
      target=visual=clamp(value,0,storyUnits);
      render(visual);
      processCompleted=visual>=buildEnd-.006;
      window.__labProcessReady=processCompleted;
    });
  }

  measure();
  if(fxEnabled&&Number.isFinite(fxScene)){
    manual=true;
    target=visual=clamp(fxScene/100,0,storyUnits);
    fxProgress.value=(visual*100).toFixed(1);
    render(visual);
    syncFx();
  }else{
    render(0);
  }
})();

/* Safari-safe virtual scroll controller. The scene itself stays on one native
   viewport; wheel/touch input advances a bounded internal progress instead of
   dragging the document through a multi-thousand-pixel spacer. */
(function(){
  'use strict';

  if(!window.__experienceVirtualMode)return;
  var section=document.getElementById('labExperience');
  if(!section)return;

  var reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var coarse=window.matchMedia('(pointer:coarse)').matches;
  var active=false;
  var overall=0;
  var touchY=0;
  var upwardIntent=0;
  var inputCredit=0;
  var inputFrame=0;
  var lastScrollY=window.scrollY;
  var transitionUntil=0;

  function clamp(value,min,max){return Math.max(min,Math.min(max,value));}
  function splitPoint(){return reduced?.60:(window.innerWidth<=700?.469:.447);}
  function sectionTop(){var rect=section.getBoundingClientRect();return rect.top+window.scrollY;}
  function stopPageScroller(){
    var lenis=window.__portfolioLenis;
    if(lenis&&typeof lenis.stop==='function')lenis.stop();
  }
  function startPageScroller(){
    var lenis=window.__portfolioLenis;
    if(lenis&&typeof lenis.start==='function')lenis.start();
  }
  function visualOverall(){
    var split=splitPoint();
    if(window.__labProcessReady===true){
      var launch=typeof window.__labLaunchProgress==='function'?window.__labLaunchProgress():0;
      return split+(1-split)*clamp(launch,0,1);
    }
    var process=typeof window.__labProcessProgress==='function'?window.__labProcessProgress():0;
    return split*clamp(process,0,1);
  }
  function applyOverall(value){
    overall=clamp(Math.max(overall,value),0,1);
    if(typeof window.__setExperienceProcessOverall==='function')window.__setExperienceProcessOverall(overall);
    if(typeof window.__setExperienceLaunchOverall==='function')window.__setExperienceLaunchOverall(overall);
  }
  function allowedOverall(){
    var split=splitPoint();
    if(window.__labProcessReady!==true){
      var process=typeof window.__labProcessProgress==='function'?window.__labProcessProgress():0;
      return split*clamp(process+.028,0,1);
    }
    var launch=typeof window.__labLaunchProgress==='function'?window.__labLaunchProgress():0;
    var lead=launch<.78?.018:(launch<.985?.007:.012);
    return split+(1-split)*clamp(launch+lead,0,1);
  }
  function pinScene(){
    transitionUntil=performance.now()+180;
    holdExperienceScrollAt(sectionTop());
  }
  function activateScene(){
    if(window.__experiencePassed)return;
    overall=Math.max(overall,visualOverall());
    active=true;
    upwardIntent=0;
    window.__experienceLabSuspended=false;
    document.documentElement.classList.add('experience-virtual-active');
    stopPageScroller();
    pinScene();
    if(typeof window.__resumeExperienceProcess==='function')window.__resumeExperienceProcess();
    if(typeof window.__resumeExperienceLaunch==='function')window.__resumeExperienceLaunch();
    applyOverall(overall);
  }
  function freezeScene(){
    inputCredit=0;
    overall=visualOverall();
    if(typeof window.__labFreezeProcess==='function')window.__labFreezeProcess();
    if(typeof window.__labFreezeLaunch==='function')window.__labFreezeLaunch();
    window.__experienceLabSuspended=true;
  }
  function leaveUp(amount){
    if(!active)return;
    freezeScene();
    active=false;
    upwardIntent=0;
    document.documentElement.classList.remove('experience-virtual-active');
    startPageScroller();
    var distance=clamp(150+Math.abs(amount)*2.2,180,window.innerHeight*.72);
    transitionUntil=performance.now()+220;
    holdExperienceScrollAt(Math.max(0,sectionTop()-distance));
  }
  function advance(amount){
    if(window.__experiencePassed)return;
    var pixels=clamp(Math.abs(amount),5,coarse?64:84);
    inputCredit=clamp(inputCredit+pixels/(coarse?820:1080),0,
      window.__labProcessReady===true?.085:.12);
    if(!inputFrame)inputFrame=requestAnimationFrame(pumpInput);
  }
  function pumpInput(){
    inputFrame=0;
    if(!active||window.__experiencePassed||inputCredit<=.00005){inputCredit=0;return;}
    var allowed=allowedOverall();
    var step=Math.min(inputCredit,Math.max(0,allowed-overall));
    if(step>.00005){
      applyOverall(overall+step);
      inputCredit=Math.max(0,inputCredit-step);
    }
    if(inputCredit>.00005)inputFrame=requestAnimationFrame(pumpInput);
  }
  function normalizedWheel(event){
    var amount=event.deltaY;
    if(event.deltaMode===1)amount*=16;
    else if(event.deltaMode===2)amount*=window.innerHeight;
    return amount;
  }
  function canEnter(rect){return rect.top<=2&&rect.bottom>Math.min(window.innerHeight,section.offsetHeight)*.72;}

  function onWheel(event){
    if(window.__experiencePassed)return;
    var amount=normalizedWheel(event);
    if(Math.abs(amount)<.1)return;
    var rect=section.getBoundingClientRect();
    if(active){
      event.preventDefault();
      if(amount<0){
        upwardIntent+=Math.min(48,-amount);
        if(upwardIntent>=18)leaveUp(amount);
      }else{
        upwardIntent=0;
        advance(amount);
      }
      return;
    }
    if(amount<=0)return;
    if(canEnter(rect)||(rect.top>2&&rect.top<window.innerHeight&&amount>=rect.top-2)||
       (rect.top<0&&rect.bottom>0)){
      event.preventDefault();
      activateScene();
    }
  }

  function onTouchStart(event){
    if(event.touches&&event.touches[0])touchY=event.touches[0].clientY;
    upwardIntent=0;
  }
  function onTouchMove(event){
    if(!event.touches||!event.touches[0])return;
    var nextY=event.touches[0].clientY;
    var amount=touchY-nextY;
    touchY=nextY;
    if(Math.abs(amount)<.2)return;
    var rect=section.getBoundingClientRect();
    if(active){
      event.preventDefault();
      if(amount<0){
        upwardIntent+=Math.min(36,-amount);
        if(upwardIntent>=14)leaveUp(amount*3);
      }else{
        upwardIntent=0;
        advance(amount*2.2);
      }
      return;
    }
    if(amount>0&&(canEnter(rect)||(rect.top>2&&rect.top<window.innerHeight&&amount>=rect.top-2)||
       (rect.top<0&&rect.bottom>0))){
      event.preventDefault();
      activateScene();
    }
  }

  function onKeyDown(event){
    if(!active||window.__experiencePassed)return;
    var forward=event.key==='ArrowDown'||event.key==='PageDown'||event.key===' ';
    var backward=event.key==='ArrowUp'||event.key==='PageUp';
    if(forward){event.preventDefault();upwardIntent=0;advance(event.key==='ArrowDown'?70:180);}
    else if(backward){event.preventDefault();leaveUp(event.key==='ArrowUp'?90:220);}
  }

  function onScroll(){
    var now=performance.now();
    var scrollY=window.scrollY;
    var scrollDelta=scrollY-lastScrollY;
    var movingDown=scrollDelta>.5;
    lastScrollY=scrollY;
    if(now<transitionUntil)return;
    var rect=section.getBoundingClientRect();
    if(active){
      /* Safari may still apply a fragment of trackpad momentum even after the
         wheel/touch event was cancelled. Turn that fragment into scene input
         before restoring the exact pinned position. */
      if(scrollDelta>1.5){advance(scrollDelta);pinScene();return;}
      if(scrollDelta<-1.5){leaveUp(scrollDelta);return;}
      if(Math.abs(rect.top)>2)pinScene();
      return;
    }
    if(!window.__experiencePassed&&movingDown&&rect.top<=0&&rect.bottom>0)activateScene();
  }

  window.__experienceVirtualSeek=function(value){
    if(window.__experiencePassed)return;
    if(!active)activateScene();
    applyOverall(value);
  };
  window.__experienceVirtualState=function(){return {active:active,overall:overall,visual:visualOverall()};};

  window.addEventListener('wheel',onWheel,{passive:false,capture:true});
  window.addEventListener('touchstart',onTouchStart,{passive:true,capture:true});
  window.addEventListener('touchmove',onTouchMove,{passive:false,capture:true});
  window.addEventListener('keydown',onKeyDown,{capture:true});
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('experience:passed',function(){
    active=false;
    overall=1;
    inputCredit=0;
    window.__experienceLabSuspended=false;
    document.documentElement.classList.remove('experience-virtual-active');
    startPageScroller();
  });
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&active)pinScene();});
})();

(function(){
  'use strict';

  var section=document.getElementById('labExperience');
  if(!section)return;

  var reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var coarsePointer=window.matchMedia('(pointer:coarse)').matches;
  var sticky=document.getElementById('launchSticky');
  var visual=document.getElementById('launchVisual');
  var camera=document.getElementById('launchCamera');
  var browser=document.getElementById('launchBrowser');
  var adaptiveStage=document.getElementById('adaptiveStage');
  var adaptiveDevice=document.getElementById('adaptiveDevice');
  var adaptiveFrame=document.getElementById('adaptiveFrame');
  var adaptiveIsland=document.getElementById('adaptiveIsland');
  var phoneSystemBar=document.getElementById('phoneSystemBar');
  var phoneBrowserBar=document.getElementById('phoneBrowserBar');
  var adaptiveDesktopChrome=document.getElementById('adaptiveDesktopChrome');
  var adaptiveLabel=document.getElementById('adaptiveLabel');
  var adaptiveScreenShutter=document.getElementById('adaptiveScreenShutter');
  var browserMorphShutter=document.getElementById('browserMorphShutter');
  var adaptiveShots=[
    document.getElementById('adaptiveShotDesktop'),
    document.getElementById('adaptiveShotTablet'),
    document.getElementById('adaptiveShotPhone')
  ];
  var resultObject=document.getElementById('objectWrap');
  var address=document.getElementById('launchAddress');
  var warning=document.getElementById('launchWarning');
  var lock=document.getElementById('secureLock');
  var lockShackle=document.getElementById('lockShackle');
  var protocolS=document.getElementById('protocolS');
  var pageShade=document.getElementById('launchPageShade');
  var secureFocus=document.getElementById('secureFocus');
  var secureCaption=document.getElementById('secureCaption');
  var serverConsole=document.getElementById('serverConsole');
  var serverChecks=Array.prototype.slice.call(document.querySelectorAll('[data-server-check]'));
  var leadForm=document.getElementById('leadForm');
  var leadSend=document.getElementById('leadSend');
  var launchCursor=document.getElementById('launchCursor');
  var launchClick=document.getElementById('launchClick');
  var deliveryRoute=document.getElementById('deliveryRoute');
  var mailPath=document.getElementById('deliveryPathMail');
  var telegramPath=document.getElementById('deliveryPathTelegram');
  var mailPacket=document.getElementById('deliveryPacketMail');
  var telegramPacket=document.getElementById('deliveryPacketTelegram');
  var mailTarget=document.getElementById('mailTarget');
  var telegramTarget=document.getElementById('telegramTarget');
  var ready=document.getElementById('launchReady');
  var launchProgress=document.getElementById('launchProgress');
  var sharedStageTrack=document.getElementById('stageTrack');
  var sharedStageCount=document.getElementById('stageCount');
  var resultCopy=document.getElementById('copyThree');
  var copySteps=Array.prototype.slice.call(document.querySelectorAll('[data-launch-copy]'));
  var sharedStageTabs=Array.prototype.slice.call(document.querySelectorAll('#labExperience .stage-copy > .stage-tabs .stage-tab'));
  var headerStatus=document.querySelector('.lab-status');
  var defaultHeaderStatus=headerStatus?headerStatus.textContent:'';
  var target=0;
  var current=0;
  var launchFrozen=false;
  var renderedMotion=0;
  var lastTime=performance.now();
  var launchWheelFrame=0;
  var launchWheelStep=0;
  var launchExitFrame=0;
  var sectionNavLastY=window.scrollY;
  var sectionNavUpward=0;
  var sectionNavFreezeStarted=false;
  var sectionNavFrozenOverall=null;
  var sectionResumeOverall=null;
  var sectionNavBusy=false;
  var sectionNavTimer=0;
  var lastSoundMotion=0;
  var launchLoopRunning=false;
  var secureCaptionShown=false;
  var secureCaptionExpired=false;
  var secureCaptionTimer=0;
  var launchTarget={x:0,y:0};
  var launchOrigin={x:0,y:0};
  var targetMeasured=false;
  var deviceMetrics=null;
  var deviceBaseKey='';
  var browserBaseKey='';
  var processVisualLayer=document.querySelector('#labSticky > .visual-field');
  var processAuxLayers=[
    document.getElementById('scrollCue'),
    document.querySelector('#labSticky > .page-progress')
  ].filter(Boolean);

  function clamp(value,min,max){return Math.max(min,Math.min(max,value));}
  function mix(from,to,amount){return from+(to-from)*amount;}
  function segment(value,start,end){return clamp((value-start)/(end-start),0,1);}
  function smooth(value){return value*value*(3-2*value);}
  function out(value){return 1-Math.pow(1-value,3);}
  function setOpacity(element,value){if(element)element.style.opacity=clamp(value,0,1).toFixed(3);}
  function setTransform(element,value){if(element)element.style.transform=value;}
  function labPhaseEnd(){return reduced?.60:(window.innerWidth<=700?.469:.447);}
  function phase(value,startIn,endIn,startOut,endOut){
    return smooth(segment(value,startIn,endIn))*(1-smooth(segment(value,startOut,endOut)));
  }
  var launchMotionStops=[
    [0,0],
    [.045,.22],[.075,.22],
    [.145,.36],[.18,.36],
    [.25,.50],[.285,.50],
    [.355,.59],[.38,.59],
    [.50,.75],[.53,.79],[.55,.79],
    [.59,.82],[.63,.86],[.70,.86],[.75,.90],
    [.78,.925],[.815,.925],
    [.845,.95],[.868,.962],
    [.925,.984],[.945,.989],[.972,.989],
    [1,1]
  ];
  function forwardStageMotion(value){
    value=clamp(value,0,1);
    for(var index=1;index<launchMotionStops.length;index++){
      var from=launchMotionStops[index-1];
      var to=launchMotionStops[index];
      if(value<=to[0])return mix(from[1],to[1],smooth(segment(value,from[0],to[0])));
    }
    return 1;
  }
  function wakeLaunchFrame(){
    if(launchLoopRunning||window.__experiencePassed||window.__experienceLabSuspended)return;
    if(window.__labProcessReady!==true&&target<=0)return;
    lastTime=performance.now();
    launchLoopRunning=true;
    window.__experienceLabSchedule(frame);
  }
  window.__wakeExperienceLaunch=wakeLaunchFrame;
  window.__labLaunchProgress=function(){return current;};
  window.__labFreezeLaunch=function(){target=current;launchFrozen=true;};
  window.__resumeExperienceLaunch=function(){launchFrozen=false;wakeLaunchFrame();};
  window.__setExperienceLaunchOverall=function(overall){
    var split=labPhaseEnd();
    setLaunchTarget(clamp((overall-split)/(1-split),0,1));
  };
  function setLaunchTarget(value){
    if(window.__experiencePassed)return;
    value=clamp(value,0,1);
    if(value<=target+.0005)return;
    launchFrozen=false;
    target=value;
    wakeLaunchFrame();
  }
  function syncLaunchPicker(activeIndex){
    sharedStageTabs.forEach(function(tab,index){
      tab.style.setProperty('--stage-shift',((index-activeIndex)*118)+'%');
      tab.classList.toggle('is-active',index===activeIndex);
      tab.setAttribute('aria-hidden',index===activeIndex?'false':'true');
    });
  }

  function renderCopy(progress,processReady,motion){
    if(!processReady||progress<=.0001){
      section.classList.remove('is-stage-switching');
      copySteps.forEach(function(step){setOpacity(step,0);step.setAttribute('aria-hidden','true');});
      return;
    }
    var copyEntry=smooth(segment(progress,.002,.02));
    var values=[
      1-smooth(segment(motion,.515,.55)),
      phase(motion,.515,.55,.87,.895),
      phase(motion,.87,.895,.985,.995),
      smooth(segment(motion,.985,.995))
    ];
    var active=0;
    values.forEach(function(value,index){
      value*=copyEntry;
      values[index]=value;
      if(value>values[active])active=index;
      var step=copySteps[index];
      setOpacity(step,value);
      var before=motion<[0,.515,.87,.985][index];
      setTransform(step,'translate3d(0,'+((before?1:-1)*(1-value)*26).toFixed(1)+'px,0)');
      step.style.filter='blur('+((1-value)*3).toFixed(2)+'px)';
      step.setAttribute('aria-hidden',value>.45?'false':'true');
    });
    setOpacity(resultCopy,1-copyEntry);
    setTransform(resultCopy,'translate3d(0,'+(-18*copyEntry).toFixed(1)+'px,0)');
    resultCopy.style.filter='blur('+(2.5*copyEntry).toFixed(2)+'px)';
    resultCopy.setAttribute('aria-hidden',copyEntry>.55?'true':'false');
    if(sharedStageCount)sharedStageCount.textContent=copyEntry>.5?'04 / 04':'03 / 04';
    if(sharedStageTrack)sharedStageTrack.style.transform='scaleX('+mix(.968,1,progress).toFixed(4)+')';
    section.classList.toggle('is-stage-switching',progress>.0005&&progress<.08);
    syncLaunchPicker(copyEntry>.5?3:2);
    if(headerStatus)headerStatus.textContent=copyEntry<=.5?defaultHeaderStatus:(active===0?'Запуск · Адаптив':active===1?'Запуск · Сервер':active===2?'Запуск · Заявки':'Запуск · Готово');
  }

  function elementCenter(element,visualRect){
    var rect=element.getBoundingClientRect();
    return {x:rect.left-visualRect.left+rect.width/2,y:rect.top-visualRect.top+rect.height/2};
  }

  function measureDeviceMetrics(){
    if(!visual||!resultObject||!adaptiveDevice||!browser)return;
    var visualRect=visual.getBoundingClientRect();
    var sourceRect=resultObject.getBoundingClientRect();
    if(!visualRect.width||!visualRect.height||sourceRect.width<100||sourceRect.height<100)return;
    var viewportWidth=window.innerWidth;
    var mobile=viewportWidth<=700;
    var compact=viewportWidth<=900;
    var shortMobile=mobile&&window.innerHeight<=700;
    var deviceHeightReserve=shortMobile?6:24;
    var desktopWidth=mobile
      ?Math.min(sourceRect.width,shortMobile?visualRect.width-12:viewportWidth-28)
      :(compact?Math.min(sourceRect.width,visualRect.width-28):Math.min(sourceRect.width,viewportWidth*.50,860));
    desktopWidth=Math.min(desktopWidth,Math.max(shortMobile?220:260,(visualRect.height-deviceHeightReserve)*1.6));
    var desktopHeight=desktopWidth/1.6;
    var tabletWidth=mobile
      ?Math.min(viewportWidth*(shortMobile?.60:.72),500,shortMobile?visualRect.width-12:Infinity)
      :(compact?Math.min(viewportWidth*.68,500,visualRect.width-14):Math.min(viewportWidth*.36,540));
    if(compact&&!mobile)tabletWidth=Math.min(tabletWidth,desktopWidth*.92);
    var phoneWidth=mobile
      ?Math.min(viewportWidth*(shortMobile?.32:.48),200,Math.max(shortMobile?132:116,(visualRect.height-deviceHeightReserve)/2.32))
      :(compact?Math.min(viewportWidth*.34,220):Math.min(viewportWidth*.185,250));
    var tabletHeight=(tabletWidth-10)/(1024/702)+10;
    var tabletHeightLimit=Math.max(shortMobile?150:180,visualRect.height-deviceHeightReserve);
    if(tabletHeight>tabletHeightLimit){
      tabletHeight=tabletHeightLimit;
      tabletWidth=(tabletHeight-10)*(1024/702)+10;
    }
    var phoneHeight=phoneWidth*2.32;
    if(!mobile){
      phoneHeight=Math.min(phoneHeight,tabletHeight*1.38,Math.max(180,visualRect.height-24));
      phoneWidth=phoneHeight/2.32;
      if(compact){
        var compactPhoneMin=Math.min(180,desktopWidth*.45,Math.max(80,(visualRect.height-deviceHeightReserve)/2.32));
        if(phoneWidth<compactPhoneMin){
          phoneWidth=compactPhoneMin;
          phoneHeight=phoneWidth*2.32;
        }
      }
    }
    var browserChromeHeight=mobile?42:54;
    var sourceX=sourceRect.left-visualRect.left+sourceRect.width/2;
    var sourceY=sourceRect.top-visualRect.top+sourceRect.height/2;
    var stageX=compact?visualRect.width/2:sourceX;
    var stageY=compact?visualRect.height/2:sourceY;
    deviceMetrics={
      desktop:{x:sourceX,y:sourceY,width:sourceRect.width,height:sourceRect.height},
      desktopTarget:{x:stageX,y:stageY,width:desktopWidth,height:desktopHeight},
      tablet:{x:stageX,y:stageY,width:tabletWidth,height:tabletHeight},
      phone:{x:stageX,y:stageY,width:phoneWidth,height:phoneHeight},
      browser:{x:stageX,y:stageY,width:desktopWidth,height:desktopHeight+browserChromeHeight}
    };
    deviceBaseKey='';
    browserBaseKey='';
  }

  function measureInteractionTargets(){
    var visualRect=visual.getBoundingClientRect();
    var routeRect=deliveryRoute.getBoundingClientRect();
    if(!visualRect.width||!visualRect.height||!routeRect.width||!routeRect.height)return;
    launchTarget=elementCenter(leadSend,visualRect);
    var formRect=leadForm.getBoundingClientRect();
    launchOrigin={
      x:clamp(formRect.left-visualRect.left-72,24,visualRect.width-28),
      y:clamp(formRect.bottom-visualRect.top+42,24,visualRect.height-28)
    };
    var sendRect=leadSend.getBoundingClientRect();
    var mailRect=mailTarget.getBoundingClientRect();
    var telegramRect=telegramTarget.getBoundingClientRect();
    var sx=clamp((sendRect.left+sendRect.width*.52-routeRect.left)/routeRect.width*1000,0,1000);
    var sy=clamp((sendRect.top+sendRect.height/2-routeRect.top)/routeRect.height*700,0,700);
    var mx=clamp((mailRect.left-routeRect.left+2)/routeRect.width*1000,0,1000);
    var my=clamp((mailRect.top+mailRect.height/2-routeRect.top)/routeRect.height*700,0,700);
    var tx=clamp((telegramRect.left-routeRect.left+2)/routeRect.width*1000,0,1000);
    var ty=clamp((telegramRect.top+telegramRect.height/2-routeRect.top)/routeRect.height*700,0,700);
    mailPath.setAttribute('d','M'+sx.toFixed(1)+' '+sy.toFixed(1)+' C'+(sx+58).toFixed(1)+' '+(sy-82).toFixed(1)+' '+(mx-28).toFixed(1)+' '+(my+48).toFixed(1)+' '+mx.toFixed(1)+' '+my.toFixed(1));
    telegramPath.setAttribute('d','M'+sx.toFixed(1)+' '+sy.toFixed(1)+' C'+(sx+76).toFixed(1)+' '+(sy-34).toFixed(1)+' '+(tx-24).toFixed(1)+' '+(ty+34).toFixed(1)+' '+tx.toFixed(1)+' '+ty.toFixed(1));
    targetMeasured=true;
  }

  function render(progress,motionOverride,isReverse){
    var processReady=window.__labProcessReady===true;
    if(!processReady)progress=0;
    progress=clamp(progress,0,1);
    var motion=Number.isFinite(motionOverride)?clamp(motionOverride,0,1):forwardStageMotion(progress);
    renderedMotion=motion;
    var launchEntry=smooth(segment(progress,.0005,.012));
    var adaptiveTakeover=smooth(segment(motion,.185,.22));
    window.__labLaunchActive=processReady&&progress>.003;
    section.classList.toggle('is-launch-active',window.__labLaunchActive);
    var processExit=smooth(segment(progress,.003,.03));
    var desktopSettle=smooth(segment(motion,.14,.22));
    if(processVisualLayer){
      processVisualLayer.style.opacity=(1-adaptiveTakeover).toFixed(3);
      processVisualLayer.style.clipPath='none';
      processVisualLayer.style.pointerEvents=adaptiveTakeover>.98?'none':'';
    }
    visual.style.clipPath='none';
    processAuxLayers.forEach(function(layer){
      layer.style.opacity=progress<=.0001?'':(1-processExit).toFixed(3);
      layer.style.pointerEvents=progress<=.0001?'':'none';
    });
    setOpacity(sticky,launchEntry);
    sticky.style.pointerEvents='none';
    var mobile=window.innerWidth<=700;
    var width=Math.max(320,visual.clientWidth);
    var height=Math.max(360,visual.clientHeight);
    var tabletMorph=smooth(segment(motion,.225,.36));
    var phoneMorph=smooth(segment(motion,.365,.50));
    var browserIn=smooth(segment(motion,.51,.59));
    var browserLayerIn=smooth(segment(browserIn,.18,.82));
    var deviceLayerOut=1-browserLayerIn;
    var secureZoomIn=smooth(segment(motion,.59,.625));
    var secureZoomOut=smooth(segment(motion,.75,.79));
    var secureZoom=secureZoomIn*(1-secureZoomOut);
    var warningOut=smooth(segment(motion,.645,.66));
    var secureChange=smooth(segment(motion,.66,.735));
    var secureMoment=smooth(segment(motion,.66,.735));
    var securePulse=Math.sin(secureMoment*Math.PI);
    var serverPanel=phase(motion,.80,.82,.86,.89);
    var leadIn=out(segment(motion,.87,.895));
    var clickPhase=smooth(segment(motion,.95,.962));
    var routeMail=smooth(segment(motion,.958,.978));
    var routeTelegram=smooth(segment(motion,.964,.984));
    var deliveryDone=smooth(segment(motion,.978,.989));
    var finalIn=smooth(segment(motion,.992,1));
    var tabletReveal=smooth(segment(motion,.292,.304));
    var phoneReveal=smooth(segment(motion,.425,.439));
    var activeShot=phoneReveal>=.5?2:(tabletReveal>=.5?1:0);

    if(!isReverse&&motion>=lastSoundMotion&&window.__labSound){
      if(lastSoundMotion<.30&&motion>=.30)window.__labSound.click('soft');
      if(lastSoundMotion<.43&&motion>=.43)window.__labSound.click('soft');
      if(lastSoundMotion<.70&&motion>=.70)window.__labSound.lock();
      if(lastSoundMotion<.956&&motion>=.956)window.__labSound.click('strong');
      if(lastSoundMotion<.995&&motion>=.995)window.__labSound.success();
    }
    lastSoundMotion=motion;

    renderCopy(progress,processReady,motion);
    launchProgress.style.transform='scaleY('+progress.toFixed(4)+')';

    if(window.__labProcessReady===true&&!deviceMetrics)measureDeviceMetrics();
    setOpacity(adaptiveStage,1-finalIn);
    var browserBoxScaleX=1;
    var browserBoxScaleY=1;
    var browserShiftX=0;
    var browserShiftY=0;
    var browserZoomScale=1;
    var browserZoomShiftX=0;
    var browserZoomShiftY=0;
    var browserZoomDepth=0;
    if(deviceMetrics){
      var settledWidth=mix(deviceMetrics.desktop.width,deviceMetrics.desktopTarget.width,desktopSettle);
      var settledHeight=mix(deviceMetrics.desktop.height,deviceMetrics.desktopTarget.height,desktopSettle);
      var tabletWidth=mix(settledWidth,deviceMetrics.tablet.width,tabletMorph);
      var tabletHeight=mix(settledHeight,deviceMetrics.tablet.height,tabletMorph);
      var phoneWidth=mix(tabletWidth,deviceMetrics.phone.width,phoneMorph);
      var phoneHeight=mix(tabletHeight,deviceMetrics.phone.height,phoneMorph);
      var deviceWidth=mix(phoneWidth,deviceMetrics.browser.width,browserIn);
      var deviceHeight=mix(phoneHeight,deviceMetrics.browser.height,browserIn);
      var settledX=mix(deviceMetrics.desktop.x,deviceMetrics.desktopTarget.x,desktopSettle);
      var settledY=mix(deviceMetrics.desktop.y,deviceMetrics.desktopTarget.y,desktopSettle);
      var tabletX=mix(settledX,deviceMetrics.tablet.x,tabletMorph);
      var tabletY=mix(settledY,deviceMetrics.tablet.y,tabletMorph);
      var phoneX=mix(tabletX,deviceMetrics.phone.x,phoneMorph);
      var phoneY=mix(tabletY,deviceMetrics.phone.y,phoneMorph);
      var deviceX=mix(phoneX,deviceMetrics.browser.x,browserIn);
      var deviceY=mix(phoneY,deviceMetrics.browser.y,browserIn);

      var deviceBase=activeShot===2?deviceMetrics.phone:(activeShot===1?deviceMetrics.tablet:deviceMetrics.desktopTarget);
      var nextDeviceBaseKey=activeShot+':'+deviceBase.width.toFixed(2)+':'+deviceBase.height.toFixed(2)+':'+deviceMetrics.desktopTarget.x.toFixed(2)+':'+deviceMetrics.desktopTarget.y.toFixed(2);
      if(deviceBaseKey!==nextDeviceBaseKey){
        adaptiveDevice.style.left=deviceMetrics.desktopTarget.x.toFixed(2)+'px';
        adaptiveDevice.style.top=deviceMetrics.desktopTarget.y.toFixed(2)+'px';
        adaptiveDevice.style.width=deviceBase.width.toFixed(2)+'px';
        adaptiveDevice.style.height=deviceBase.height.toFixed(2)+'px';
        deviceBaseKey=nextDeviceBaseKey;
      }
      var deviceScaleX=deviceWidth/Math.max(1,deviceBase.width);
      var deviceScaleY=deviceHeight/Math.max(1,deviceBase.height);
      var deviceShiftX=deviceX-deviceMetrics.desktopTarget.x;
      var deviceShiftY=deviceY-deviceMetrics.desktopTarget.y;

      if(processVisualLayer){
        var processScaleX=deviceWidth/Math.max(1,deviceMetrics.desktop.width);
        var processScaleY=deviceHeight/Math.max(1,deviceMetrics.desktop.height);
        var processShiftX=deviceX-deviceMetrics.desktop.x;
        var processShiftY=deviceY-deviceMetrics.desktop.y;
        processVisualLayer.style.transformOrigin=deviceMetrics.desktop.x.toFixed(2)+'px '+deviceMetrics.desktop.y.toFixed(2)+'px';
        processVisualLayer.style.transform='translate3d('+processShiftX.toFixed(2)+'px,'+processShiftY.toFixed(2)+'px,0) scaleX('+processScaleX.toFixed(5)+') scaleY('+processScaleY.toFixed(5)+')';
      }

      var nextBrowserBaseKey=deviceMetrics.browser.width.toFixed(2)+':'+deviceMetrics.browser.height.toFixed(2)+':'+deviceMetrics.browser.x.toFixed(2)+':'+deviceMetrics.browser.y.toFixed(2);
      if(browserBaseKey!==nextBrowserBaseKey){
        browser.style.left=deviceMetrics.browser.x.toFixed(2)+'px';
        browser.style.top=deviceMetrics.browser.y.toFixed(2)+'px';
        browser.style.width=deviceMetrics.browser.width.toFixed(2)+'px';
        browser.style.height=deviceMetrics.browser.height.toFixed(2)+'px';
        browserBaseKey=nextBrowserBaseKey;
      }
      browserBoxScaleX=deviceWidth/Math.max(1,deviceMetrics.browser.width);
      browserBoxScaleY=deviceHeight/Math.max(1,deviceMetrics.browser.height);
      browserShiftX=deviceX-deviceMetrics.browser.x;
      browserShiftY=deviceY-deviceMetrics.browser.y;

      var compactViewport=window.innerWidth<=900;
      browserZoomScale=1+secureZoom*(compactViewport?.10:.32);
      browserZoomShiftY=secureZoom*(compactViewport?20:112);
      browserZoomDepth=secureZoom*(compactViewport?18:46);

      setOpacity(adaptiveDevice,adaptiveTakeover*deviceLayerOut*(1-finalIn));
      setTransform(adaptiveDevice,'translate3d(-50%,-50%,0) translate3d('+deviceShiftX.toFixed(2)+'px,'+deviceShiftY.toFixed(2)+'px,0) scaleX('+deviceScaleX.toFixed(5)+') scaleY('+deviceScaleY.toFixed(5)+') rotateX('+(Math.sin(phoneMorph*Math.PI)*.45).toFixed(2)+'deg)');

      var desktopRadius=mix(16,12,desktopSettle);
      var tabletRadius=mix(desktopRadius,22,tabletMorph);
      var phoneRadius=mix(tabletRadius,42,phoneMorph);
      var deviceRadius=mix(phoneRadius,12,browserIn);
      var desktopInsetX=mix(0,7,desktopSettle);
      var desktopInsetTop=mix(0,7,desktopSettle);
      var desktopInsetBottom=mix(0,7,desktopSettle);
      var tabletInsetX=mix(desktopInsetX,4,tabletMorph);
      var tabletInsetTop=mix(desktopInsetTop,4,tabletMorph);
      var tabletInsetBottom=mix(desktopInsetBottom,4,tabletMorph);
      var phoneInsetX=mix(tabletInsetX,6,phoneMorph);
      var phoneInsetTop=mix(tabletInsetTop,6,phoneMorph);
      var phoneInsetBottom=mix(tabletInsetBottom,6,phoneMorph);
      var deviceInsetX=mix(phoneInsetX,0,browserIn);
      var deviceInsetTop=mix(phoneInsetTop,0,browserIn);
      var deviceInsetBottom=mix(phoneInsetBottom,0,browserIn);
      var phoneUi=smooth(segment(phoneMorph,.45,.82))*(1-smooth(segment(browserIn,.05,.30)));
      adaptiveFrame.style.setProperty('--device-radius',deviceRadius.toFixed(2)+'px');
      adaptiveFrame.style.setProperty('--screen-radius',Math.max(4,deviceRadius-7).toFixed(2)+'px');
      adaptiveFrame.style.setProperty('--device-inset-x',deviceInsetX.toFixed(2)+'px');
      adaptiveFrame.style.setProperty('--device-inset-top',deviceInsetTop.toFixed(2)+'px');
      adaptiveFrame.style.setProperty('--device-inset-bottom',deviceInsetBottom.toFixed(2)+'px');
      adaptiveFrame.style.setProperty('--chrome-h',mix(40.2,0,desktopSettle).toFixed(2)+'px');
      adaptiveFrame.style.setProperty('--desktop-shot-scale',mix(1.013,1,desktopSettle).toFixed(4));
      adaptiveFrame.style.setProperty('--phone-top-h',(40*phoneUi).toFixed(2)+'px');
      adaptiveFrame.style.setProperty('--phone-bottom-h',(42*phoneUi).toFixed(2)+'px');
      adaptiveDevice.style.setProperty('--phone-ui-alpha',phoneUi.toFixed(3));
      adaptiveFrame.style.background=phoneMorph>.55?'#050505':'linear-gradient(145deg,#282827 0%,#0a0a0a 18%,#111 82%,#2b2b2a 100%)';
      browser.style.borderRadius=deviceRadius.toFixed(2)+'px';
      setOpacity(adaptiveDesktopChrome,(1-desktopSettle)*(1-browserIn));

      setOpacity(adaptiveShots[0],1-tabletReveal);
      setOpacity(adaptiveShots[1],tabletReveal*(1-phoneReveal));
      setOpacity(adaptiveShots[2],phoneReveal);
      setOpacity(adaptiveScreenShutter,0);
      setOpacity(browserMorphShutter,0);
      setOpacity(adaptiveIsland,phoneUi);
      setOpacity(phoneSystemBar,phoneUi);
      setOpacity(phoneBrowserBar,phoneUi);

      adaptiveLabel.textContent=phoneMorph>.5?'Телефон':(tabletMorph>.5?'Планшет':'Компьютер');
      var labelDip=Math.max(Math.sin(tabletMorph*Math.PI),Math.sin(phoneMorph*Math.PI));
      var labelEntry=smooth(segment(motion,.13,.18));
      var labelBrowserOut=1-smooth(segment(browserIn,.04,.22));
      setOpacity(adaptiveLabel,adaptiveTakeover*labelEntry*(1-labelDip*.68)*labelBrowserOut*(1-finalIn));
    }

    setOpacity(browser,browserLayerIn*(1-finalIn));
    setTransform(browser,'translate3d(-50%,-50%,0) translate3d('+(browserShiftX+browserZoomShiftX).toFixed(2)+'px,'+(browserShiftY+browserZoomShiftY).toFixed(2)+'px,'+browserZoomDepth.toFixed(1)+'px) scaleX('+(browserBoxScaleX*browserZoomScale).toFixed(5)+') scaleY('+(browserBoxScaleY*browserZoomScale).toFixed(5)+')');
    browser.style.filter='blur('+(finalIn*2.2).toFixed(2)+'px)';

    setOpacity(warning,1-warningOut);
    setTransform(warning,'translate3d('+(-8*warningOut).toFixed(1)+'px,-50%,0)');
    setOpacity(lock,smooth(segment(motion,.655,.675)));
    setTransform(lock,'scale('+mix(.8,1,secureChange).toFixed(3)+')');
    if(lockShackle)lockShackle.style.transform='rotate('+mix(-38,0,secureChange).toFixed(2)+'deg)';
    protocolS.style.opacity=secureChange.toFixed(3);
    protocolS.style.width=secureChange.toFixed(4)+'ch';
    protocolS.style.transform='none';
    address.classList.toggle('is-secure',secureChange>.96);

    var focusAlpha=phase(motion,.59,.62,.75,.79);
    setOpacity(secureFocus,focusAlpha);
    setTransform(secureFocus,'translate(-50%,-50%) scale('+(mix(.58,1,secureZoom)+securePulse*.22).toFixed(3)+')');
    if(motion<.65&&secureCaptionShown){
      clearTimeout(secureCaptionTimer);
      secureCaptionShown=false;
      secureCaptionExpired=false;
    }
    if(secureChange>.96&&!secureCaptionShown){
      secureCaptionShown=true;
      secureCaptionExpired=false;
      clearTimeout(secureCaptionTimer);
      secureCaptionTimer=setTimeout(function(){
        secureCaptionExpired=true;
        setOpacity(secureCaption,0);
        setTransform(secureCaption,'translate3d(-4px,0,0)');
      },2300);
    }
    var captionAlpha=secureCaptionExpired?0:smooth(segment(motion,.695,.735));
    setOpacity(secureCaption,captionAlpha);
    setTransform(secureCaption,'translate3d('+mix(6,secureCaptionExpired?-4:0,captionAlpha).toFixed(1)+'px,0,0)');

    setOpacity(serverConsole,serverPanel);
    setTransform(serverConsole,'translate3d(0,'+(12*(1-serverPanel)).toFixed(1)+'px,18px) scale('+mix(.96,1,serverPanel).toFixed(3)+')');
    serverChecks.forEach(function(check,index){
      var checkIn=smooth(segment(motion,.805+index*.008,.825+index*.008))*serverPanel;
      setOpacity(check,checkIn);
      setTransform(check,'translate3d('+(9*(1-checkIn)).toFixed(1)+'px,0,0)');
    });

    setOpacity(leadForm,leadIn*(1-finalIn));
    setTransform(leadForm,'translate3d('+(26*(1-leadIn)).toFixed(1)+'px,'+(22*(1-leadIn)).toFixed(1)+'px,20px) scale('+mix(.92,1,leadIn).toFixed(3)+')');
    leadSend.textContent=deliveryDone>.7?'Отправлено ✓':'Отправить';
    leadSend.style.background=deliveryDone>.7?'#d9d7d0':'var(--accent)';
    pageShade.style.opacity=(secureZoom*.07+serverPanel*.04+leadIn*.08+finalIn*.22).toFixed(3);
    if(motion>.84&&!targetMeasured)measureInteractionTargets();

    var cursorStartX=targetMeasured?launchOrigin.x:(mobile?width*.58:width*.69);
    var cursorStartY=targetMeasured?launchOrigin.y:(mobile?height*.61:height*.55);
    var cursorTargetX=targetMeasured?launchTarget.x:(mobile?width*.70:width*.77);
    var cursorTargetY=targetMeasured?launchTarget.y:(mobile?height*.76:height*.79);
    var cursorMove=out(segment(motion,.928,.948));
    var cursorArc=Math.sin(cursorMove*Math.PI);
    var cursorX=mix(cursorStartX,cursorTargetX,cursorMove)+cursorArc*(mobile?5:9);
    var cursorY=mix(cursorStartY,cursorTargetY,cursorMove)-cursorArc*(mobile?7:11);
    var transientAlpha=isReverse?0:1;
    var cursorAlpha=phase(motion,.915,.932,.968,.982)*transientAlpha;
    setOpacity(launchCursor,cursorAlpha);
    setTransform(launchCursor,'translate3d('+(cursorX-4).toFixed(1)+'px,'+(cursorY-4).toFixed(1)+'px,0) rotate('+mix(-7,1,cursorMove).toFixed(2)+'deg) scale('+(1-Math.sin(clickPhase*Math.PI)*.1).toFixed(3)+')');
    var clickAlpha=Math.sin(clickPhase*Math.PI)*transientAlpha;
    setOpacity(launchClick,clickAlpha);
    setTransform(launchClick,'translate3d('+(cursorTargetX-14).toFixed(1)+'px,'+(cursorTargetY-14).toFixed(1)+'px,0) scale('+mix(.55,1.45,out(clickPhase)).toFixed(3)+')');

    var routeAlpha=phase(motion,.952,.96,.985,.994)*transientAlpha;
    setOpacity(deliveryRoute,routeAlpha);
    mailPath.style.strokeDashoffset=(1-routeMail).toFixed(4);
    telegramPath.style.strokeDashoffset=(1-routeTelegram).toFixed(4);
    if(routeAlpha>.001&&mailPath.getPointAtLength){
      var mailLength=mailPath.getTotalLength();
      var mailPoint=mailPath.getPointAtLength(mailLength*routeMail);
      mailPacket.setAttribute('cx',mailPoint.x.toFixed(2));
      mailPacket.setAttribute('cy',mailPoint.y.toFixed(2));
      setOpacity(mailPacket,routeMail>0&&routeMail<.995?1:0);
      var telegramLength=telegramPath.getTotalLength();
      var telegramPoint=telegramPath.getPointAtLength(telegramLength*routeTelegram);
      telegramPacket.setAttribute('cx',telegramPoint.x.toFixed(2));
      telegramPacket.setAttribute('cy',telegramPoint.y.toFixed(2));
      setOpacity(telegramPacket,routeTelegram>0&&routeTelegram<.995?1:0);
    }
    var mailIn=smooth(segment(motion,.958,.978))*(1-finalIn);
    var telegramIn=smooth(segment(motion,.964,.984))*(1-finalIn);
    setOpacity(mailTarget,mailIn);
    setOpacity(telegramTarget,telegramIn);
    setTransform(mailTarget,'translateX('+(24*(1-mailIn)).toFixed(1)+'px)');
    setTransform(telegramTarget,'translateX('+(24*(1-telegramIn)).toFixed(1)+'px)');
    mailTarget.style.borderColor=deliveryDone>.35?'rgba(var(--accent-rgb),.42)':'';
    telegramTarget.style.borderColor=deliveryDone>.55?'rgba(var(--accent-rgb),.42)':'';

    setOpacity(ready,finalIn);
    setTransform(ready,'translate(-50%,-46%) scale('+mix(.96,1,finalIn).toFixed(3)+')');
    setOpacity(camera,1);
    sticky.style.setProperty('--launch-progress',progress.toFixed(4));
  }

  function sectionProgress(){
    var rect=section.getBoundingClientRect();
    var distance=Math.max(1,section.offsetHeight-window.innerHeight);
    var overall=clamp(-rect.top/distance,0,1);
    var split=labPhaseEnd();
    return clamp((overall-split)/(1-split),0,1);
  }

  function launchScrollState(){
    var sectionTop=section.getBoundingClientRect().top+window.scrollY;
    var distance=Math.max(1,section.offsetHeight-window.innerHeight);
    var overall=clamp((window.scrollY-sectionTop)/distance,0,1);
    var split=labPhaseEnd();
    return {
      overall:overall,
      split:split,
      progress:clamp((overall-split)/(1-split),0,1),
      launchDistance:distance*(1-split),
      top:sectionTop,
      distance:distance
    };
  }

  function launchFinished(){
    return current>=.9994&&renderedMotion>=.998;
  }

  function freezeSectionState(state){
    if(state.overall>=state.split-.0005&&window.__labProcessReady===true){
      target=current;
      launchFrozen=true;
      return state.split+(1-state.split)*current;
    }
    if(typeof window.__labFreezeProcess==='function')window.__labFreezeProcess();
    var processProgress=typeof window.__labProcessProgress==='function'?window.__labProcessProgress():0;
    return state.split*clamp(processProgress,0,1);
  }

  function finishSectionNavigation(){
    sectionNavBusy=false;
    sectionNavLastY=window.scrollY;
  }

  function beginSectionExit(state){
    if(sectionNavBusy)return;
    sectionNavBusy=true;
    sectionResumeOverall=clamp(sectionNavFrozenOverall===null?freezeSectionState(state):sectionNavFrozenOverall,0,1);
    sectionNavUpward=0;
    sectionNavFreezeStarted=false;
    window.__experienceLabSuspended=true;
    var destination=Math.max(0,state.top-Math.min(720,window.innerHeight*.78));
    experienceScrollTo(destination,!reduced);
    clearTimeout(sectionNavTimer);
    sectionNavTimer=setTimeout(finishSectionNavigation,reduced?80:720);
  }

  function resumeSection(state){
    if(sectionNavBusy||sectionResumeOverall===null)return;
    sectionNavBusy=true;
    var resumeAt=sectionResumeOverall;
    sectionResumeOverall=null;
    sectionNavFrozenOverall=null;
    var destination=state.top+state.distance*resumeAt;
    window.__experienceLabSuspended=false;
    experienceScrollTo(destination,false);
    if(typeof window.__resumeExperienceProcess==='function')window.__resumeExperienceProcess();
    wakeLaunchFrame();
    clearTimeout(sectionNavTimer);
    sectionNavTimer=setTimeout(finishSectionNavigation,80);
  }

  function governSectionNavigation(){
    if(window.__experiencePassed)return;
    var scrollY=window.scrollY;
    var delta=scrollY-sectionNavLastY;
    sectionNavLastY=scrollY;
    if(sectionNavBusy||Math.abs(delta)<.25)return;
    var rect=section.getBoundingClientRect();
    var state=launchScrollState();
    if(sectionResumeOverall!==null&&delta>0&&rect.top<=window.innerHeight*.82&&state.overall<sectionResumeOverall-.001){
      resumeSection(state);
      return;
    }
    if(performance.now()<(window.__experienceInternalScrollUntil||0)){
      sectionNavUpward=0;
      sectionNavFreezeStarted=false;
      sectionNavFrozenOverall=null;
      return;
    }
    var pinned=rect.top<=1&&rect.bottom>=window.innerHeight;
    if(!pinned||state.overall<=.0005){
      sectionNavUpward=0;
      sectionNavFreezeStarted=false;
      sectionNavFrozenOverall=null;
      return;
    }
    if(delta<0){
      sectionNavUpward+=Math.min(48,-delta);
      if(!sectionNavFreezeStarted&&sectionNavUpward>=10){
        sectionNavFrozenOverall=freezeSectionState(state);
        sectionNavFreezeStarted=true;
      }
      if(sectionNavUpward>=34)beginSectionExit(state);
    }else{
      sectionNavUpward=0;
      sectionNavFreezeStarted=false;
      sectionNavFrozenOverall=null;
    }
  }

  function governLaunchWheel(event){
    if(window.__experiencePassed||reduced||event.deltaY<=0||window.__labProcessReady!==true)return;
    var rect=section.getBoundingClientRect();
    if(rect.top>1||rect.bottom<window.innerHeight)return;
    var state=launchScrollState();
    if(state.overall<state.split-.0005)return;
    if(state.progress>=.999){
      if(!launchFinished()){
        event.preventDefault();
        if(state.progress<.99999)experienceScrollTo(state.top+state.distance,false);
      }
      return;
    }
    if(launchFinished())return;
    var maxLead=current<.38?.022:(current<.55?.020:(current<.815?.018:(current<.945?.022:.026)));
    var available=Math.max(0,(current+maxLead-state.progress)*state.launchDistance);
    var step=Math.min(event.deltaY,56,available);
    if(step+1<event.deltaY){
      event.preventDefault();
      if(step>.5){
        launchWheelStep=Math.max(launchWheelStep,step);
        if(!launchWheelFrame){
          launchWheelFrame=requestAnimationFrame(function(){
            launchWheelFrame=0;
            var amount=launchWheelStep;
            launchWheelStep=0;
            experienceScrollBy(amount);
          });
        }
      }
    }
  }

  function guardLaunchExit(){
    if(window.__experiencePassed||reduced||launchFinished())return;
    var state=launchScrollState();
    if(state.overall<state.split-.0005)return;
    var progressLimit=1;
    var programmatic=performance.now()<(window.__experienceProgrammaticScrollUntil||0);
    if(!programmatic){
      var maxLead=current<.38?.022:(current<.55?.020:(current<.815?.018:(current<.945?.022:.026)));
      progressLimit=Math.min(1,current+maxLead);
    }
    var allowedOverall=state.split+(1-state.split)*progressLimit;
    var limit=Math.round(state.top+state.distance*allowedOverall);
    if(window.scrollY>limit+1&&!launchExitFrame){
      launchExitFrame=requestAnimationFrame(function(){
        launchExitFrame=0;
        if(!launchFinished()&&window.scrollY>limit+1){
          if(!programmatic&&target>progressLimit)target=progressLimit;
          holdExperienceScrollAt(limit);
        }
      });
    }
  }

  function collapseCompletedExperience(){
    if(window.__experiencePassed||!launchFinished())return false;
    var rect=section.getBoundingClientRect();
    if(rect.bottom>window.innerHeight+2)return false;
    var oldHeight=section.offsetHeight;
    var oldScroll=window.scrollY;
    target=1;
    current=1;
    renderedMotion=1;
    launchFrozen=true;
    render(1,1,false);
    window.__experiencePassed=true;
    section.classList.add('is-passed');
    document.documentElement.classList.remove('experience-virtual-active');
    if(window.__portfolioLenis&&typeof window.__portfolioLenis.start==='function')window.__portfolioLenis.start();
    var removedHeight=Math.max(0,oldHeight-section.offsetHeight);
    if(removedHeight>0)experienceScrollTo(oldScroll-removedHeight,false);
    requestAnimationFrame(function(){
      if(typeof window.__measureExperienceActivity==='function')window.__measureExperienceActivity();
      if(typeof window.__measureExperienceHeaderRange==='function')window.__measureExperienceHeaderRange();
      if(window.ScrollTrigger)window.ScrollTrigger.refresh();
    });
    window.dispatchEvent(new CustomEvent('experience:passed'));
    return true;
  }

  function fallback(){if(!window.__experienceVirtualMode)setLaunchTarget(sectionProgress());}

  function frame(now){
    if(window.__experiencePassed||window.__experienceLabSuspended){launchLoopRunning=false;return;}
    var delta=clamp((now-lastTime)/1000,0,.05);
    lastTime=now;
    var gatedTarget=window.__labProcessReady===true?target:0;
    if(launchFrozen)gatedTarget=current;
    if(reduced){
      current=gatedTarget;
    }else{
      var difference=gatedTarget-current;
      var follow=1-Math.pow(difference<0?.00002:.00035,delta);
      var change=difference*follow;
      if(difference>0){
        var maxRate=current<.38?.42:(current<.55?.34:(current<.78?.28:(current<.985?.13:.22)));
        change=Math.min(change,maxRate*Math.max(delta,1/120));
      }
      current+=change;
    }
    if(Math.abs(gatedTarget-current)<.00005)current=gatedTarget;
    var motion=forwardStageMotion(current);
    render(current,motion,false);
    if(collapseCompletedExperience())return;
    window.__experienceLabSchedule(frame);
  }

  if(!window.__experienceVirtualMode){
    window.addEventListener('wheel',governLaunchWheel,{passive:false,capture:true});
    var launchTouchY=0;
    window.addEventListener('touchstart',function(event){
      if(event.touches&&event.touches[0])launchTouchY=event.touches[0].clientY;
    },{passive:true});
    window.addEventListener('touchmove',function(event){
      if(!event.touches||!event.touches[0])return;
      var nextY=event.touches[0].clientY;
      var delta=launchTouchY-nextY;
      launchTouchY=nextY;
      if(delta<=0)return;
      governLaunchWheel({deltaY:delta,preventDefault:function(){event.preventDefault();}});
    },{passive:false,capture:true});
    window.addEventListener('scroll',fallback,{passive:true});
    window.addEventListener('scroll',guardLaunchExit,{passive:true});
  }
  fallback();
  document.addEventListener('visibilitychange',function(){
    if(document.hidden)return;
    lastTime=performance.now();
    fallback();
    wakeLaunchFrame();
  });

  var recordLaunchControl=document.getElementById('recordLaunchControl');
  if(recordLaunchControl&&new URLSearchParams(location.search).get('record')==='1'){
    recordLaunchControl.addEventListener('input',function(){
      var value=parseFloat(this.value);
      if(!Number.isFinite(value))return;
      value=clamp(value,0,1);
      launchFrozen=false;
      target=value;
      current=value;
      renderedMotion=forwardStageMotion(value);
      render(current,renderedMotion,false);
    });
  }

  window.addEventListener('resize',function(){
    targetMeasured=false;
    deviceMetrics=null;
    render(current,forwardStageMotion(current),false);
  },{passive:true});
  render(0,0,false);
})();
