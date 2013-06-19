//nav
(function(){

  ready(function(){
     
	  var oCover=document.getElementById("cover");
	  
	  var oUl=document.getElementById("nav").children[0];
	  
	  var aLi=oUl.children;
	  
	  var start=aLi[0].offsetWidth*n;
	  
	  oCover.style.left=start+'px';
	  
	  for (var i=0;i<aLi.length;i++)
	  {
		 aLi[i].onmouseover=function()
		 {
		   	over(this); 
		 }
		 
		 oUl.onmouseout=function(ev)
		 {
		   	out(this,ev) 
		 }
	  }
	  
	  function over(obj)
	  {
		 startMove(oCover,{left:obj.offsetLeft});  
	  }
	  
	  function out(obj,ev)
	  {
		 var oEvent=ev||event;
		   
		 var to=oEvent.toElement||oEvent.relatedTarget;
		   
		 if(isChild(obj,to))return;
			 
		 startMove(oCover,{left:start}); 
	  }
  })
		  
})();


//fastNav
(function(){
	
  ready(function(){
	
	var oDiv=document.getElementById("fast_nav");
	
	var oClose=oDiv.children[0];
	
	var aDiv=getByClass(oDiv,"inner");
	
	var arr=[];
	
	var btn=true;
	
	var count=0;
	
	//存储初始位置
	for (var i=0;i<aDiv.length;i++)
	{
	  	arr[i]={left:aDiv[i].offsetLeft,top:aDiv[i].offsetTop};
	}
	
	oDiv.style.left=document.documentElement.clientWidth-100+'px';
	
	myAddEvent(window,'resize',left1);

    oDiv.onclick=function()
    {  
	  if(btn)
	  { 
	    removeEvent(window,"resize",left1);
		removeEvent(window,"resize",left2);
		myAddEvent(window,"resize",center);
		show();
		btn=false;
	  } 
    }

	oClose.onclick=function(ev)
	{  
	   var oEvent=ev||event;	
	   hide();
	   oEvent.cancelBubble=true;
	}
	
	function show()
	{
		var windowWidth=document.documentElement.clientWidth;
	   
	    var windowHeight=document.documentElement.clientHeight;
	  
	    var left=(windowWidth-oDiv.offsetWidth)/2;
	  
	    var top=(windowHeight-oDiv.offsetHeight)/2;
	    
	    oDiv.style.overflow="visible";

	    showShadow();

	    startMove(oDiv,{left:left,top:top},function(){
		
		move();
		
		function move()
		{
			
		  if(aDiv[count])
		  { 
			 startMove(aDiv[count],{left:0,top:0,opacity:100},function(){
			 
			   count++;
			 
			   move();
		  
		     },2);	 
		  }
		  else
		  {
		   	 oClose.style.display="block"; 
		  }
		 
		}
												  
	  },2)
	}

	function hide()
	{ 
	  oClose.style.display="none";
      
	  move();
	  
	  function move()
	  { 
		if(aDiv[count-1])
		{
		   startMove(aDiv[count-1],arr[count-1],function(){
		    
			 count--;
			 
		     move();
		
		   },2);	
		}
		else
		{  
		   removeEvent(window,"resize",center);
		   
		   var left=document.documentElement.clientWidth-100;
		   
		   startMove(oDiv,{top:"40px",left:left},function(){
			  
			  myAddEvent(window,"resize",left2);
			  
			  oDiv.style.overflow="hidden";
			  
			  removeShadow();
			
			  btn=true;	
														  
		   },2);
		}
	  }
	}

	function center()
	{
	   var left=(document.documentElement.clientWidth-oDiv.offsetWidth)/2;
	  
	   var top=(document.documentElement.clientHeight-oDiv.offsetHeight)/2;
	
	   setStyle(oDiv,{left:left+'px',top:top+'px'});		
	}
	
	function left1()
	{
	   oDiv.style.left=document.documentElement.clientWidth-100+'px';	
	}
	
	function left2()
	{
	   oDiv.style.left=document.documentElement.clientWidth-100+'px';	
	}
			 
  })	
		  
})();

//backToTop
(function(){

  ready(function(){
				 
	var oBack=document.getElementById("backTop");
	
	var scrollBtn=true;
	
	var timer=null;
	
	myAddEvent(window,"scroll",function(){
	  
	  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	  
	  if(scrollTop==0)
	  {
		startMove(oBack,{opacity:0});   
	  }
	  else
	  {
		startMove(oBack,{opacity:100});  
	  }
	  
	  if(!scrollBtn)
	  {
		 clearInterval(timer);
	  }
	  scrollBtn=false;
										
	});
	
	myAddEvent(oBack,"click",function(){
	  
	  clearInterval(timer);
	  
	  timer=setInterval(function(){
		
		 scrollBtn=true;
		
		 var iCur=document.documentElement.scrollTop||document.body.scrollTop;
		 
		 var iTarget=0;
		 
		 var iSpeed=(iTarget-iCur)/8;
		 
		 iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		 
		 if(iCur==iTarget)
		 {
		   clearInterval(timer);	 
		 }
		 
		 document.body.scrollTop=iCur+iSpeed;
		 document.documentElement.scrollTop=iCur+iSpeed;
	  
	  },30)
 
	  								  
	})
  
  })

})();

//login
(function(){

  ready(function(){
	
	var oDiv=document.getElementById("head");
	
	var oBtn=getByClass(oDiv,"l")[0];
	
	var oBox=document.getElementById("login_box");
	
	var oClose=document.getElementById("close_btn");
	
	var shadow=document.getElementById("shadow");
	
	var oBackBtn=document.getElementById("num_back");
	
	var oRegistBtn=document.getElementById("num_regist");
	
	var oRegist=document.getElementById("regist");
	
	var oLogin=document.getElementById("login");
	
	myAddEvent(oRegistBtn,"click",rotate);
	
	myAddEvent(oBackBtn,"click",backer);
	
	myAddEvent(oBtn,"click",show);
	
	myAddEvent(oClose,"click",hide);
	
	function rotate()
	{
	   oLogin.style.display="none";	
	   
	   oClose.style.display="none";
	   
	   oRegist.style.display="block";
	   
	   oBox.className="rotate";	
    }
	
	function backer()
	{
	   oLogin.style.display="block";	
	   
	   oClose.style.display="block";
	   
	   oRegist.style.display="none";	
		
	   oBox.className="back";	
	}
	
    function show()
    {
	  oBox.style.display="block";
	 
	  shadow.style.zIndex=1000;
	 
	  showShadow();
	 
	  setTimeout(function(){
						 
	    oBox.className="active";
	 
	  },100) 
    }
   
    function hide()
    {
	 shadow.style.zIndex=999;
	 
	 oBox.className="";
	 
	 setTimeout(function(){
		
		removeShadow();
		
	    oBox.style.display="none";
	 
	 },1100)
   }
	
  })

})();

//aboutus
(function(){

  ready(function(){
	
	var oHead=document.getElementById("head");
	
	var oFoucs=getByClass(oHead,"r")[0];
	
	oFoucs.onmouseover=function()
	{ 
	  this.children[0].style.color="#000";
	  this.children[1].style.display="block";	
	}
	
	oFoucs.onmouseout=function()
	{
	  this.children[0].style.color="#fff";	
	  this.children[1].style.display="none";	
	}
	
  })

})();

//3d
(function(){

  ready(function(){
				 
	var oLogo=document.getElementById("logo");
	var startX=70;
	var startZ=60;
	var webkit=window.navigator.userAgent;
	var re=/webkit/gi;
	
	if(re.test(webkit))
	{
	  	roll_3d();
    }
	else
	{
	   oLogo.onclick=function()
	   {
		  alert('请使用谷歌浏览器查看此效果');	  
	   } 
    }
	
	function roll_3d()
	{
		var oMain=document.getElementById("zns");
		var oBanner=document.getElementById("banner");
		var oBottom=document.getElementById("bottom_content");
		var oHead=document.getElementById("top");
		var btn=true;

	    oLogo.onclick=function(ev)
		{  
		   var oEvent=ev||event;
		   
		   if(btn)
		   {  
			  btn=false;
			  document.body.style.overflow='hidden';
			  oMain.style.WebkitTransition='1s'; 
			  oMain.style.WebkitTransform='perspective(3000px) rotateX('+(70)+'deg) rotateZ('+(60)+'deg)';
			 
			  setTimeout(function(){
				 oBanner.className='active';
				 oBottom.className='clearfix active';
				 oHead.className='clearfix active';				 
			  },1000)
			  
			  move();  
		   }
		   else
		   {
			   document.body.style.overflowX='hidden';
			   document.body.style.overflowY='auto';
			   document.onmousedown=null;
			   document.onmousemove=null;
			   document.onmouseup=null;
			   oBanner.className=''; 
			   oBottom.className='clearfix';
			   oHead.className='clearfix';
			  
			   setTimeout(function(){
				 oMain.style.WebkitTransition='1s'; 
				 oMain.style.WebkitTransform='';
			   },2000)
			   
			   setTimeout(function(){
				  btn=true;				   
			   },4000)
			   
		   }
		   
		   oEvent.cancelBubble=true;
		}
	
	    function move()
		{  
			var nowX=0;
			var nowZ=0;
			
			var x=0;
			var z=0;
			
			document.onmousedown=function(){
													 
			   var disX=event.clientX-nowX;
			   var disZ=event.clientY-nowZ;
			   
			   document.onmousemove=fnMove;
			   
			   document.onmouseup=fnUp;
			   
			   function fnMove()
			   {
				  x=event.clientX-disX;
				  z=event.clientY-disZ;
				  
				  oMain.style.WebkitTransition='0s';
				  oMain.style.WebkitTransform='perspective(3000px) rotateX('+(-z/10+startX)+'deg) rotateZ('+(-x/10+startZ)+'deg)';  
			   }
			   
			   function fnUp()
			   {   
				   nowX=x;
				   nowZ=z;
				   
				   document.onmousemove=null;
				   document.onmouseup=null;
			   }
			   
			   return false;	
			};	
		}
	}

  }) 
		  
})();