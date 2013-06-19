(function(){

  ready(function(){
	
	var oDiv=document.getElementById("banner");
	
	var aBtn=getByClass(oDiv,"dot_wrap")[0].getElementsByTagName("li");
	
	var oUl=getByClass(oDiv,"roll_wrap")[0].children[0];
	
	var aLi=oUl.children;

	var oLeft=getByClass(oDiv,"left_btn")[0];
	
	var oRight=getByClass(oDiv,"right_btn")[0];
	
	var moveDis=aLi[0].offsetWidth;
	
	var moveBtn=true;
	
	var speed=2000;
	
	var from=0;
	
	var iNow=0;
	
	var timer=null;
	
	var l=false;
	
	var na=window.navigator.userAgent;
	var reWebkit=/webkit/gi;
	var reMoz=/Firefox/gi;
	
	if(reWebkit.test(na))
	{	
	   baozha(oDiv,aLi,aBtn,7,3,3000,oLeft,oRight);//五个参数 最外层容器 图片li  按钮  列 行  自动播放间隔
	}
	else if(reMoz.test(na))
	{
	   baozha(oDiv,aLi,aBtn,7,3,3000,oLeft,oRight);//五个参数 最外层容器 图片li  按钮  列 行    自动播放	
    }
	else if(!reMoz.test(na))
	{   
		ieMove();
	}
	
	function ieMove()
	{
		oLeft.onmouseover=oRight.onmouseover=function()
		{
		   startMove(this.children[1],{opacity:100})
		};
		
		oLeft.onmouseout=oRight.onmouseout=function()
		{
		   startMove(this.children[1],{opacity:0})
		};
		
		for (var i=0;i<aBtn.length;i++)
		{  
		   (function(index){	
					 
			 aBtn[i].onclick=function()
			 { 
				if(moveBtn)
				{ 
				   if(this.children[0].className!="mark")
				   {  
					  moveBtn=false;
					  iNow=index;
					  tab(iNow);
				   }
				} 
			 }
		   })(i)	
		}
		
		function tab(iNow,l)
		{  
		  for (var i=0;i<aBtn.length;i++)
		  {
			startMove(aBtn[i].children[1],{opacity:0});
			aBtn[i].children[0].className="";
		  }
	
		   aBtn[iNow%aBtn.length].children[0].className="mark";
		   startMove(aBtn[iNow%aBtn.length].children[1],{opacity:100});
	
		   if(iNow>from&&!l)
		   {  
			  aLi[iNow%aBtn.length].style.left=moveDis+'px';
			  startMove(aLi[iNow%aBtn.length],{left:0},function(){
				moveBtn=true;												
			  });
			  startMove(aLi[from%aBtn.length],{left:-moveDis});    
		   }
		   else
		   {  
			  aLi[iNow%aBtn.length].style.left=-moveDis+'px';
			  startMove(aLi[iNow%aBtn.length],{left:0},function(){
				 moveBtn=true; 												
			  })
			  startMove(aLi[from%aBtn.length],{left:moveDis}); 
		   }
	
		   from=iNow;
		}
	
		oLeft.onclick=function()
		{  
		   if(moveBtn)
		   {
			   moveBtn=false;
			   iNow--;
			   l=false;
			   if(iNow<0)
			   { 
				 l=true;
				 iNow=aBtn.length-1;
			   }
			   tab(iNow,l);
			} 
		}
		
		oRight.onclick=function()
		{  
		   if(moveBtn)
		   {  
			  moveBtn=false; 
			  iNow++;
			  tab(iNow);  
			}
		}
	
		oDiv.onmouseover=function()
		{
		   clearInterval(timer);	
		}
		
		oDiv.onmouseout=function()
		{
		   auto();	
		}
		
		function auto()
		{
		   timer=setInterval(function(){
			
			 iNow++;
			 tab(iNow)
		   
		   },speed) 	
		}
		
		auto();
	}
	
	
	
  })
  
})();


(function(){
    
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
	
	function setStyle(obj,json)
	{
	  for (var i in json)
	  {
		obj.style[i]=json[i];
	  }
	}
	
	function rnd(m,n)
	{
	  return parseInt(Math.random()*((m+1)-n))+n;
	}
	
	var moveBtn=true;
	var iNow=0;
	
	window.baozha=function(oWrap,aObj,aBtn,row,col,time,oL,oR)
	{
	  var timer=null;
	  var aImg=[];
	  var aHref=[];
	  var url="";
	  var href="";
	  var from=0;
	  
	  oWrap.moveBtn=true;
	  
	  for (var i=0;i<aObj.length;i++)
	  {
		setStyle(aObj[i],{left:0,top:0,position:'absolute',display:'none'});
		aHref[i]=aObj[i].children[0].getAttribute('href');
		aImg[i]=aObj[i].children[0].children[0].getAttribute('src');
	  }
	  
	  var oNewDiv=document.createElement("div");
	  
	  oNewDiv.className="floor"
	  oNewDiv.innerHTML=
	  '<a href='+aHref[0]+'></a>';
	  
	  var oA=oNewDiv.children[0];
	  
	  oA.style.background='url('+aImg[0]+') no-repeat';
	  
	  oWrap.appendChild(oNewDiv);
	  
	  for (var i=0;i<aBtn.length;i++)
	  {
		 (function(index){
		 
		   aBtn[i].onclick=function()
		   {  
			  if(moveBtn&&this.children[0].className!='mark')
			  {   
				  moveBtn=false;
				  iNow=index;
				  tab(iNow);  
			  }      
		   }
		 
		 })(i)
	  }
	  
	  oL.onmouseover=oR.onmouseover=function()
	  {
		   startMove(this.children[1],{opacity:100})
	  };
		
	  oL.onmouseout=oR.onmouseout=function()
	  {
		   startMove(this.children[1],{opacity:0})
	  };
	  
	  function tab(iNow)
	  {
		  href=aHref[iNow];
		  url=aImg[iNow];
		  
		  oA.style.background='url('+url+') no-repeat';
		  oA.href=href;
		  
		  for (var i=0;i<aBtn.length;i++)
		  {
			startMove(aBtn[i].children[1],{opacity:0});
			aBtn[i].children[0].className="";
		  }
	
		   aBtn[iNow].children[0].className="mark";
		   startMove(aBtn[iNow%aBtn.length].children[1],{opacity:100});
		  
		  createDiv(oNewDiv,row,col,aImg[from]);
		  from=iNow;
	  }
	  
	  oR.onclick=function()
	  { 
	     if(moveBtn)
		 {
			iNow++; 
		 }
		 if(iNow>aBtn.length-1)
		 {
		    iNow=0;	 
		 }
		 aBtn[iNow].click();
	  }
	  
	  oL.onclick=function()
	  { 
	     if(moveBtn)
		 {
			iNow--; 
		 }
		 if(iNow<0)
		 {
		    iNow=aBtn.length-1;	 
		 }
		 aBtn[iNow].click();
	  }
	  
	  function go()
	  {
		 iNow++;
		 
		 if(iNow>aObj.length-1)
		 {
		   iNow=0;
		 }
		 
		 tab(iNow);
	  }
	  
	  function auto()
	  {  
	     clearInterval(timer);
		 timer=setInterval(go,time);
	  }
	  
	  auto();
	  
	  oWrap.onmouseover=function()
	  {
		 clearInterval(timer);
	  }
	  
	  oWrap.onmouseout=function()
	  {
		 auto();
	  }
	  
	}
	
	function createDiv(oWrap,row,col,url)
	{ 
	  var sumW=parseInt(getStyle(oWrap,'width'));
	  var sumH=parseInt(getStyle(oWrap,'height'));
	  var w=Math.ceil(parseInt(getStyle(oWrap,'width'))/row);
	  var h=Math.ceil(parseInt(getStyle(oWrap,'height'))/col);
	  
	  for (var i=0;i<row;i++)
	  {
		for (var j=0;j<col;j++)
		{
		   var oDiv=document.createElement("div");
		   
		   oDiv.className="block";
		   
		   setStyle(oDiv,{width:w+'px',height:h+'px',left:w*i+'px',top:h*j+'px',position:'absolute',background:'url('+url+') no-repeat '+(-w*i)+'px '+(-h*j)+'px'});
		   
		   oWrap.children[0].appendChild(oDiv);
		}
	  }
	
	  setTimeout(function(){
	  
		move(oWrap,sumW,sumH);
		
	  },10);
	  
	}
	
	function move(oWrap,w,h)
	{
	  var aObj=oWrap.children[0].children;
	
	  for (var i=0;i<aObj.length;i++)
	  {
		var rndX=rnd(-180,180);
		var rndY=rnd(-180,180);
		var rndZ=rnd(-180,180);
		var rndS=rnd(3,2); 
		
		
		var l=(w/2)*(aObj[i].offsetLeft+aObj[i].offsetWidth/2-(w/2))+rnd(100,50);
		var t=(h/2)*(aObj[i].offsetTop+aObj[i].offsetHeight/2-(h/2))+rnd(100,50);
		
		startMove(aObj[i],{left:l,top:t},null,30);
	
		aObj[i].style.opacity=0;
		aObj[i].style.MozTransform='perspective(500px) rotateX('+rndX+'deg) rotateY('+rndY+'deg) rotateZ('+rndZ+'deg) scale('+rndS+')';
		aObj[i].style.webkitTransform='perspective(500px) rotateX('+rndX+'deg) rotateY('+rndY+'deg) rotateZ('+rndZ+'deg) scale('+rndS+')';
		
	  }
	  
	  aObj[0].addEventListener('transitionend',function(){oWrap.children[0].innerHTML="";moveBtn=true;},false)
	}

})();