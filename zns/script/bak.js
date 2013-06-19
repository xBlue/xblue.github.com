//nav
(function(){

  ready(function(){
     
	  var oCover=document.getElementById("cover");
	  
	  var oUl=document.getElementById("nav").children[0];
	  
	  var aLi=oUl.children;
	  
	  var start=-aLi[0].offsetWidth*n;
	  
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