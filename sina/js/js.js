function getByClass(oParent,sClass){
	var aEle=oParent.getElementsByTagName("*");
	var arr=[];
	var reg=new RegExp('\\b'+sClass+'\\b','i');
	
	for(var i=0; i<aEle.length; i++){
		if(reg.test(aEle[i].className)){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
}

function tuDou(n){
	if(n<10){
		return "0"+n;
	}else{
		return ""+n;
	}
}

function addEvent(obj, sEv, fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+sEv, fn);
	}
	else
	{
		obj.addEventListener(sEv, fn, false);
	}
}

function getPos(obj)
{
	var l=0;
	var t=0;
	
	while(obj)
	{
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		
		obj=obj.offsetParent;
	}
	
	return {left: l, top: t};
}

//顶部吸顶
(function top()
{
	var oDiv=document.getElementById('top-nav');
	var oA=document.getElementById('tn-close');
	var oDiv2=document.getElementById('search');
	var t=oDiv.offsetTop;
	
	oA.onclick=function(){
		oDiv.style.display="none";
		oDiv2.style.paddingTop="20px";
	};
	
	if(window.navigator.userAgent.indexOf('MSIE 6')!=-1){
		addEvent(window, 'scroll', function (){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			
			if(t<=scrollTop)
			{
				oDiv.style.top=scrollTop+'px';
			}
		});
	}else{
		addEvent(window, 'scroll', function (){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			
			if(t<=scrollTop)
			{
				oDiv.style.position = 'fixed';
			}
		});
	}
})();

//顶部鼠标滑动显示隐藏
function topNav(id){
	var oUl=document.getElementById(id);
	var aLi=oUl.children;
	var aDiv=oUl.getElementsByTagName("div");
	var oClose=document.getElementById("login-close");
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].onmouseover=function(){
			if(this.children[1]){
				this.children[0].style.background="#eee";
				this.children[1].style.display="block";
			}
		};
		aLi[i].onmouseout=function(){
			if(this.children[1]){				
				this.children[0].style.background="";
				this.children[1].style.display="none";
			}
		};
	}
	
	oClose.onclick=function(){
		getByClass(oUl,"tn-login")[0].style. display="none";
	};
}

//搜索
function sBar(){
	var oDiv=document.getElementById("sbar");
	var oSlt=getByClass(oDiv,"s-slt")[0];
	var oH3=oSlt.getElementsByTagName("h3")[0];
	var oUl=oSlt.getElementsByTagName("ul")[0];
	var aLi=oUl.getElementsByTagName("li");
	var oTxt=getByClass(oDiv,"s-txt")[0].getElementsByTagName("input")[0];
	
	oH3.onclick=function(){
		if(oUl.style.display=="block"){
			oUl.style.display="none";
		}else{
			oUl.style.display="block";
		}
	};
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].onclick=function(){
			oH3.innerHTML="";
			oH3.innerHTML=this.getElementsByTagName("a")[0].innerHTML;
			oUl.style.display="none";
		};
	};
	
	oTxt.onfocus=function(){
		oTxt.value="";
		oUl.style.display="none";
	};
	oTxt.onblur=function(){
		if(oTxt.value==""){
			oTxt.value="请输入关键字";
		};
	};
}

//时间
(function(){
	var oA=document.getElementById("today");
	
	function tick(){
		var oDate=new Date();
	
		var year=oDate.getFullYear();
		var month=tuDou(oDate.getMonth()+1);
		var date=tuDou(oDate.getDate());
		var day=oDate.getDay();
		var hours=tuDou(oDate.getHours());
		var minutes=tuDou(oDate.getMinutes());
		var seconds=tuDou(oDate.getSeconds());
		
		oA.innerHTML=year+"年"+month+"月"+date+"日"+["周日","周一","周二","周三","周四","周五","周六"][day]+" "+hours+":"+minutes+":"+seconds;
	}
	
	setInterval(tick,1000);
	tick();
})();

//选项卡
function tabs(id,sClass,oEvent){
	var oDiv=document.getElementById(id);
	var oUl=oDiv.getElementsByTagName("ul")[0];
	var aLi=oUl.getElementsByTagName("li");
	var aDiv=getByClass(oDiv,sClass)[0].children;
	
	if(oEvent){
		for(var i=0; i<aLi.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for(var i=0; i<aLi.length; i++){
					aLi[i].className="";
					aDiv[i].style.display="none";
				}
				this.className="on";
				aDiv[this.index].style.display="block";
			};
		}	
	}else{
		for(var i=0; i<aLi.length; i++){
			aLi[i].index=i;
			aLi[i].onmouseover=function(){
				for(var i=0; i<aLi.length; i++){
					aLi[i].className="";
					aDiv[i].style.display="none";
				}
				this.className="on";
				aDiv[this.index].style.display="block";
			};
		}	
	}
}

//定时选项卡
function timeTab(id,sClass,speed){
	var oDiv=document.getElementById(id);
	var oUl=getByClass(oDiv,sClass)[0];
	var aLi=oUl.getElementsByTagName("li");
	var oDiv2=oDiv.getElementsByTagName("div")[0];
	var aDiv=oDiv2.children;
	var speed=speed*1000;
	
	var btnL=getByClass(oDiv,"btn-l")[0];
	var btnR=getByClass(oDiv,"btn-r")[0];
	
	var now=0;
	var timer=null;

	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			now=this.index;			
			tab();
		};
	}
	
	function tab(){
		for(var i=0; i<aLi.length; i++){
			aLi[i].className="";
			aDiv[i].style.display="none";
		};
		aLi[now].className="on";
		aDiv[now].style.display="block";
	}
	
	function prev(){
		now--;
		if(now==-1){
			now=aLi.length-1;
		}
		tab();
	}
	
	function next(){
		now++;
		if(now==aLi.length){
			now=0;
		}
		tab();
	}
	
	timer=setInterval(next,speed);
	tab();
	
	oDiv.onmouseover=function(){
		clearInterval(timer);
	};
	oDiv.onmouseout=function(){
		timer=setInterval(next,speed);
	};
	
	if(btnL){
		btnL.onclick=prev;
	};
	if(btnR){
		btnR.onclick=next;
	};
}

/*----------------------------------------------------*/



//右侧固定导航
(function popNav(){
	var oDiv=document.getElementById("pop-nav");
	var oUl=oDiv.getElementsByTagName("ul")[0];
	var aLi=oUl.getElementsByTagName("li");
	
	addEvent(window, 'scroll', function (){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop>10){
			aLi[aLi.length-1].style.visibility="visible";
		}else{
			aLi[aLi.length-1].style.visibility="hidden";
		};
	});
})();

//图片预加载
/*(function(){
	window.onload=window.onresize=function ()
	{
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var scrollBottom=scrollTop+document.documentElement.clientHeight;
		
		var aImg=document.getElementsByTagName('img');
		
		for(var i=0;i<aImg.length;i++)
		{
			if(!aImg[i].getAttribute('_src'))
			{
				continue;
			}
			var p=getPos(aImg[i]);
			
			if(p.top<scrollBottom)
			{
				aImg[i].src=aImg[i].getAttribute('_src');
				aImg[i].setAttribute('_src', '');
			}
		}
	};
	
	addEvent(window, 'scroll', function (){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var scrollBottom=scrollTop+document.documentElement.clientHeight;
		
		var aImg=document.getElementsByTagName('img');
		
		
		
		for(var i=0;i<aImg.length;i++)
		{
			var p=getPos(aImg[i]);
			
			if(p.top<scrollBottom)
			{
				aImg[i].src=aImg[i].getAttribute('_src');
			}
		}
	});
})();*/


function img(){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var scrollBottom=scrollTop+document.documentElement.clientHeight;
	var aImg=document.getElementsByTagName('img');
	//alert(aImg.length);
	for(var i=0;i<aImg.length;i++)
	{
		if(!aImg[i].getAttribute('_src'))
		{
			continue;
		}
		var p=getPos(aImg[i]);
		
		if(p.top<scrollBottom)
		{
			aImg[i].src=aImg[i].getAttribute('_src');
			aImg[i].setAttribute('_src', '');
		}
	}
}

(function(){	
	window.onload=window.onresize=function ()
	{
		img();	
	};
	
	addEvent(window, 'scroll', function (){
		img();
	});
})();
