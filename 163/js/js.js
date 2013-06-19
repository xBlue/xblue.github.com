//顶部点击更多
(function(){
	var oSpan=document.getElementById("navMore");
	var oSpan2=oSpan.getElementsByTagName("span")[0];
	oSpan.onclick=function(e){
		var oEvent=e||event;
		
		if(window.event){
			oEvent.cancelBubble=true;
		}else{
			oEvent.stopPropagation();
		}
		
		if(oSpan2.style.display=="block"){
			oSpan2.style.display="none";
		}else{
			oSpan2.style.display="block";
		}
	};
	
	document.onclick=function(){
		oSpan2.style.display="none";
	};
})();

//搜索栏按钮
(function(){
	var oSpan=document.getElementById("c-menu");
	var oSpan2=oSpan.getElementsByTagName("span")[0];
	var oUl=oSpan.getElementsByTagName("ul")[0];
	var aBtn=oUl.getElementsByTagName("a");
	
	oSpan.onclick=oUl.onmouseover=function(){	
		oUl.style.display="block";
	};
	
	oUl.onmouseout=function(){
		this.style.display="none";
	};
	
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].onclick=function(e){
			var oEvent=e||event;
			
			if(window.event){
				oEvent.cancelBubble=true;
			}else{
				oEvent.stopPropagation();
			}
			
			oSpan2.innerHTML=this.innerHTML;
			oUl.style.display="none";
		};
	}
	
})();

//日期
(function(){
	var oDiv=getByClass(document,"date")[0];
	var oDiv2=getByClass(document,"g-L")[0];
	
	var oDate=new Date();
	var month=toDou(oDate.getMonth()+1);
	var date=toDou(oDate.getDate());
	
	oDiv.children[0].innerHTML=month;
	oDiv.children[1].innerHTML=date;
	oDiv2.children[0].innerHTML=month;
})();

//公告牌下鼠标滑过效果
(function(){
	var oUl=document.getElementById("b_tab");
	var aLi=oUl.getElementsByTagName("li");
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].onmouseover=function(){
			for(var i=0; i<aLi.length; i++){
				aLi[i].className="";
			}
			this.className="on";
		};
	}
})();

//图片预加载
function imgLoad(){
	var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	var scrollBottom=scrollTop+document.documentElement.clientHeight;
	var aImg=document.getElementsByTagName("img");
	
	for(var i=0; i<aImg.length; i++){
		if(!aImg[i].getAttribute("_src")){
			continue;
		}
		
		var p=getPos(aImg[i]);
		
		if(p.top<scrollBottom){
			aImg[i].src=aImg[i].getAttribute("_src");
			aImg[i].setAttribute("_src","");
		}
	}
}