var lastTime=null;

//getByClass
function getByClass(oParent,sClass)
{
  var aResult=[];
  
  var aEle=oParent.getElementsByTagName("*");
  
  var re=new RegExp("\\b"+sClass+"\\b","i");
  
  for (var i=0;i<aEle.length;i++)
  {
	 if(re.test(aEle[i].className))
     {
	   aResult.push(aEle[i]);  
     }   
  }
  return aResult;
}

//getStyle
function getStyle(obj,attr)
{
  if(obj.currentStyle)
  {
	return obj.currentStyle[attr];  
  }
  else
  {
	return getComputedStyle(obj,false)[attr];  
  }
}

//setStyle
function setStyle(obj,json)
{
  for (var i in json)
  {
	 obj.style[i]=json[i];  
  }
}

//bind
function myAddEvent(obj,sEv,fn)
{
  if(obj.attachEvent)
  {  
	 obj.attachEvent("on"+sEv,function(ev){
	   var oEvent=ev||event;
	
	   if(fn.call(obj)==false)
	   {
		  oEvent.cancelBubble=true;
		  return false;
	   }
									   
	 });  
  }
  else
  {
	 obj.addEventListener(sEv,function(ev){
	    var oEvent=ev||event;
	
	   if(fn.call(obj)==false)
	   {
		  oEvent.cancelBubble=true;
		  oEvent.preventDefault();
	   }								   
	 },false);  
  }
}

//unbind
function removeEvent(obj,sEv,fn)
{ 
  if(obj.detachEvent)
  {
     obj.detachEvent("on"+sEv,fn);
  }
  else
  {  
	 obj.removeEventListener(sEv,fn,false);  
  }
}

//ischild
function isChild(oParent,obj)
{
  while(obj)
  {
	 if(oParent==obj)return true;
	 obj=obj.parentNode;
  }
  return false;
}

//ready
function ready(fn)
{
  if(document.addEventListener)
  {
	 document.addEventListener("DOMContentLoaded",fn,false);  
  }
  else
  {
	 document.attachEvent("onreadystatechange", function(){   
            if ( document.readyState === "complete" ) {   
                //document.detachEvent( "onreadystatechange", arguments.callee );   
                fn();  
            }   
        });   
  }
}

//ajax
function ajax(json)
{
  var oAjax=null;
  
  var url=json.url;
  
  if(json.cache=="false")
  {
	 url=url+"?t="+new Date().getTime();  
  }
  
  if(window.XMLHttpRequest)
  {
	oAjax=new XMLHttpRequest();  
  }
  else
  {
	oAjax=new ActiveXObject("Microsoft.XMLHttpRequest");  
  }
  
  oAjax.open(json.type,url,json.async);
  
  oAjax.send();
  
  oAjax.onreadystatechange=function()
  {
	 if(oAjax.readyState==4)
	 {
	    if(oAjax.status==200)
		{
		   var data=oAjax.responseText;
		   
		   if(json.dataType=="json")
		   {
			  data=eval('('+data+')');   
		   }
		   
		   json.success(data);
		}
		else
		{
		   json.error();	
		}
	 }
  }
}

//move
function startMove(obj,json,fn,time)
{
  if(!time)
  {
	 time=5;  
  }
	
  clearInterval(obj.timer);
  
  obj.timer=setInterval(move,30);
  
  if(new Date().getTime()-lastTime>=30)
  {
	move();
  }
  
  function move()
  {  
	 var bStop=true;

	 for (var attr in json)
	 { 
	   var iTarget=parseInt(json[attr]);
	   
	   var iCur=0;
	   
	   if(attr=="opacity")
	   {
		  iCur=Math.round(parseFloat(getStyle(obj,attr))*100) ;  
	   }
	   else if(attr=="scrollTop")
	   {
		  iCur=document.body.scrollTop||document.documentElement.scrollTop;
	   }
	   else
	   {
		  iCur=parseInt(getStyle(obj,attr));
	   }
	   
	   var iSpeed=(iTarget-iCur)/time;
	   
	   iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
	   
	   if(attr=="opacity")
	   {
		  obj.style.opacity=(iCur+iSpeed)/100;
		  obj.style.filter="alpha(opacity="+(iCur+iSpeed)+")";  
	   }
	   else if(attr=="scrollTop")
	   {
		  obj[attr]=iCur+iSpeed;
	   }
	   else
	   {
		  obj.style[attr]=iCur+iSpeed+'px';   
	   }
	   
	   if(iCur!=iTarget)
	   {
		  bStop=false;   
	   } 
	 }
	 
	 if(bStop)
	 {
	   clearInterval(obj.timer);	 
		 
	   if(fn)
	   {
		 fn();   
	   };
	   
	   lastTime=new Date().getTime();
	 }
  }
}

//addClass
function addClass(obj,sClass)
{
  if(obj.className=="")
  {
	 obj.className=sClass;  
  }
  else
  {
	 obj.className=obj.className+" "+sClass;  
  }
}

//removeClass
function removeClass(obj,sClass)
{ 
  var re=/\s/;
  
  if(obj.className=="")
  {
	 return;  
  }
  else if(!re.test(obj.className))
  {  
	 obj.className=""; 
  }
  else
  {
	var arr=obj.className.split(" ");
	
	for (var i=0;i<arr.length;i++)
	{
	   if(arr[i]==sClass)
	   {
		  arr.splice(i,1);   
	   }
    }
	obj.className=arr.join(" ");
  }
}

//showBox
function showShadow()
{	
	 var oDiv=document.getElementById("shadow");
  
     oDiv.style.display="block";
}

//removeBox
function removeShadow()
{	 
	 var oDiv=document.getElementById("shadow");
  
     oDiv.style.display="none";
}

//showLogin()
function showLogin(obj,box,shadow)
{
   	
}

