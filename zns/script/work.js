//works
(function(){

  ready(function(){
				 
    var oDiv=document.getElementById("wroks");
	
	var oUl=oDiv.children[0];
	
	var aLi=oUl.getElementsByTagName("li");
	
	var oLeft=document.getElementById("left_btn");
	
	var oRight=document.getElementById("right_btn");
	
	var sumWidth=aLi.length*aLi[0].offsetWidth;
	
	oDiv.onmousedown=function()
	{
	  return false;	
	}
	
	oUl.style.width=sumWidth+'px';
	
	oLeft.onclick=function()
	{
	   startMove(oUl,{left:100})	
    }
  
  });
  
})()