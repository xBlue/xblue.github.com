function tab(oParent,time){
	var oUl=oParent.getElementsByTagName("ul")[0];
	var aLi=oUl.getElementsByTagName("li");
	var oDiv=getByClass(oParent,"t-box")[0];
	var aDiv=oDiv.children;
	
	var now=0;
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			now=this.index;
			t();
		};
	}
	
	function t(){
		for(var i=0; i<aLi.length; i++){
			aLi[i].className="";
			aDiv[i].style.display="none";
		}
		aLi[now].className="on";
		aDiv[now].style.display="block";
	}
	
	function next(){
		now++;
		
		if(now==aLi.length){
			now=0;
		}
		
		t();
	}
	
	if(time){
		var timer=setInterval(next,time);
		oParent.onmouseover=function(){
			clearInterval(timer);
		};
		oParent.onmouseout=function(){
			timer=setInterval(next,time);
		};
	}
}