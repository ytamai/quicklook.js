/*
* quicklook.js v0.1.3
* https://github.com/ytamai/quicklook.js
*
* Copyright 2015 ytamai
* Released under the MIT license
*/
var quickLook=function(className,suffix){


'use strict';
if(!Array.prototype.indexOf){
  Array.prototype.indexOf=function(target,index){
    if(isNaN(index)){
      index=0;
    }
    for(var i=index;i<target.length;i++){
      if(this[i]===target){
        return i;
      }
    }
    return -1;
  };
}

// getter
function getFileName(str){
  var path=/^.*\//,fileName=/([^\/]*)(\..*$)/;
  var s=str.replace(path,'');
  var result={
    path:path.exec(str)[0],
    fileName:fileName.exec(s)[0],
    name:fileName.exec(s)[1],
    extention:fileName.exec(s)[2]
  };
  return result;
}
function getByClassName(className){
  var all=document.getElementsByTagName('*');
  var searchNodes=[];
  for(var key in all){
    if(all[key].className){
      if(all[key].className.indexOf(className)>=0){
        searchNodes.push(all[key]);
      }
    }
  }
  if(searchNodes.length===0){
    searchNodes.push(document.getElementById(className));
  }
  return searchNodes;
}
function getWindowTop(){
  var scrollY=(window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  return scrollY+'px';
}
function getWindowWidth(){
  if(window.innerWidth){
    return window.innerWidth;
  }else if(document.documentElement && document.documentElement.clientWidth!=0){
    return document.documentElement.clientWidth;
  }else if(document.body){
    return document.body.clientWidth;
  }
  return 0;
}

function switchLR(thiswrap){
  var posi=thiswrap.offsetLeft;
  if(!posi){
    var offsetLeft=getWindowWidth()-thiswrap.parentNode.parentNode.scrollWidth;
    posi=thiswrap.parentNode.offsetLeft+offsetLeft;
  }
  if(getWindowWidth()/2<posi+20){
    return 'left';
  }else{
    return 'right';
  }
}

// Object
function QuickLook(dom,suffix){
  function addSuffix(file,suffix){
    var filename=getFileName(file);
    return filename.path+filename.name+suffix+filename.extention;
  }
  this.wrap=dom;
  var alt=document.createElement('p');
      alt.style.background='#fff';
      alt.style.textAlign='center';
  var img=document.createElement('img');
      img.style.display='block';
  for (var i=dom.childNodes.length-1;i>=0;i--){
    if(dom.childNodes[i].tagName){
      var tagName=dom.childNodes[i].tagName;
      if(tagName.toLowerCase()==='img'){
        alt.innerHTML=dom.childNodes[i].alt;
        img.src=addSuffix(dom.childNodes[i].src,suffix);
      }
    }
  }
  var quickLook=document.createElement('div');
      quickLook.appendChild(img);
      quickLook.appendChild(alt);
      quickLook.className='quickLook';
      quickLook.style.position='absolute';
      quickLook.style.zIndex=530000;
      quickLook.style.border='solid 1px #333';
      quickLook.style[switchLR(this.wrap)]='0';
  this.wrap.onmouseover=function(){
    quickLook.style.top=getWindowTop();
    dom.appendChild(quickLook);
  };
  this.wrap.onmouseleave=function(){
    quickLook.parentNode.removeChild(quickLook);
  };
}

function runQuickLook(className,suffix){
  var quickLookTargets=getByClassName(className);
  for(var i=quickLookTargets.length-1;i>=0;i--){
    var QuickLooks=new QuickLook(quickLookTargets[i],suffix);
  }
}
runQuickLook(className,suffix);

};