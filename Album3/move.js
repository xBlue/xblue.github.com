var lastTime=null;

function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}
function startMove(obj,json,fn)
{
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
	   else
	   {
		  iCur=parseInt(getStyle(obj,attr));   
	   }
	   
	   var iSpeed=(iTarget-iCur)/4;
	   
	   iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
	   
	   if(attr=="opacity")
	   {
		  obj.style.opacity=(iCur+iSpeed)/100;
		  obj.style.filter="alpha(opacity="+(iCur+iSpeed)+")";  
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