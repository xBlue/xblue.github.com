//幻灯
(function(){
	var oDiv=document.getElementById("focusPic");
	var oBul=oDiv.children[0].getElementsByTagName("ul")[0];
	var aBli=oBul.children;
	var oSul=oDiv.children[1].getElementsByTagName("ul")[0];
	oSul.innerHTML+=oSul.innerHTML;
	var aSli=oSul.children;
	
	var oPrev=oDiv.getElementsByTagName("span")[0];
	var oNext=oDiv.getElementsByTagName("span")[1];
	
	oSul.style.width=(oSul.children[0].offsetWidth+3)*aSli.length+"px";
	
	for(var i=0; i<aSli.length; i++){
		aSli[i].index=i;
		aSli[i].onmouseover=function(){
			for(var i=0; i<aSli.length; i++){
				aSli[i].className="";
				aBli[i%aBli.length].className="";
			}
			this.className="on";
			aBli[this.index%aBli.length].className="on";
			aBli[this.index%aBli.length].getElementsByTagName("img")[0].src=aSli[this.index%aBli.length].getElementsByTagName("img")[0].src;
		}
	}
	
	oPrev.onclick=function(){
		if(oSul.offsetLeft>=0){
			oSul.style.left=-oSul.offsetWidth/2+"px";
		}
		oSul.style.left=oSul.offsetLeft+(oSul.children[0].offsetWidth+3)+"px";
	};
	
	oNext.onclick=function(){
		if(oSul.offsetLeft<=-oSul.offsetWidth/2){
			oSul.style.left=0;
		}
		oSul.style.left=oSul.offsetLeft-(oSul.children[0].offsetWidth+3)+"px";
	};
})();


//幻灯2
function focusPic2(oDiv){
	var oUl=oDiv.getElementsByTagName("ul")[0];
	
	oUl.innerHTML+=oUl.innerHTML;
	var aLi=oUl.getElementsByTagName("li");
	var aLiWidth=aLi[0].offsetWidth+parseInt(getStyle(aLi[0],"marginRight"));
	
	oUl.style.width=aLi.length*aLiWidth+"px";
	
	var oPrev=oDiv.getElementsByTagName("a")[0];
	var oNext=oDiv.getElementsByTagName("a")[1];
	
	oPrev.onclick=function(){
		if(oUl.offsetLeft>=0){
			oUl.style.left=-oUl.offsetWidth/2+"px";
		}
		oUl.style.left=oUl.offsetLeft+aLiWidth+"px";
	};
	
	oNext.onclick=function(){
		if(oUl.offsetLeft<=-oUl.offsetWidth/2){
			oUl.style.left=0;
		}
		oUl.style.left=oUl.offsetLeft-aLiWidth+"px";
	};
};

(function(){
	var aDiv=getByClass(document,"jewelry");
	for(var i=0; i<aDiv.length; i++){
		focusPic2(aDiv[i]);
	}
})();