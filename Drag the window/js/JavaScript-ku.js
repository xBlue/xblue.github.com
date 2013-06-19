/*
函数名字
1.		设置cookie函数	setCookie(name, value, iDay)
2.		获取cookie		getCookie(name)
3.		删除cookie		removeCookie(name)
4.		服务器时间函数	time2date(t)
5.		Ajax函数	ajax(url, fnSucc, fnFaild)
6.		坐标函数	getPos(obj)
7.		用class获取样式 getByClass(oParent, sClass)
8.		鼠标滚轮函数		addWheel(obj, fn)	
9.		随机函数	Random(oMin,oMax)
10.		计算获取样式 对象，样式的值	getStyle(obj,value)
11.		本月第一天	getMonthDay()
12.		这个月有多少天	getMonthDay()
13.		补零函数	toDou()
14.		这个月最后一天是周几	getLastMonthDay()		*************不懂  有时间要搞懂
15.		简单拖拽	tz(id)
16.		完美拖拽	wmtz(id)
17.		日历函数 makeUpCalender();
18.		自动引入样式函数	Linkcss(xx)
19.		运动框架 startMove (obj, json, fn)
20.		滚轮函数	addWheel(obj, fn)
21.		图片放大缩小移动  **中心点放大缩小	zoom(oShadow)
22.		跟 onload一样的 ready函数	addReady(fn)
23.		回调函数succ(json)
24.		事件绑定函数addEvent(obj, sEv, fn)
25.		用键盘制作的只能输入数字arr(oTxt)
26.		json 设置样式 setStyle(obj, json)
27.		trim切边  切除两边的空格 符号什么的
28.		isIE6  检测是否IE6
29.		添加class  addClass(obj, sClass)
30.		删除class  removeClass(obj, sClass)	
31.		onLoad(function(){});
*/

/*----------------------上面是注释  方便查找使用 下面为函数---------------------------*/
//1.
(function (){
	window.setCookie=function (name, value, iDay)			
	{
		if(iDay!==false)
		{
				var oDate=new Date();
				oDate.setDate(oDate.getDate()+iDay);
				document.cookie=name+'='+value+';expires'+oDate;
		}
		else
		{
			document.cookie=name+'='+value;	
		}
	}
})();
//2.
(function (){
	window.getCookie=function (name)		
	{
		var arr=document.cookie.split(';');
		var i=0;
		for(var i=0;i<arr.length;i++)
		{
			var arr2=arr[i].split('=');
			if(arr[2]==name)
			{
				return arr2[1];	
			}	
		}		
		return '';
	}
})();
//3.
(function (){
	window.removeCookie=function (name)
	{
		setCookie(name, 'a', -1);	
	}	
	
	//jsonURL函数	jsonURL(json)
	function jsonURL(json)				
	{
		var arr=[];
		
		for(var i in json)
		{
			arr.push(i+'='+json[i]);	
		}	
		return arr.join('&');
	}
})();
//4.
(function (){
	window.time2date=function (t)		
	{
		var oDate=new Date();
		oDate.setTime(t*1000);
		
		return oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes();	
	}
})();	
//5.
(function (){
	window.ajax=function (url, fnSucc, fnFaild)
	{
		//1.创建Ajax对象
		if(window.XMLHttpRequest)
		{
			var oAjax=new XMLHttpRequest();
		}
		else
		{
			var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		//2.连接服务器（打开和服务器的连接）
		oAjax.open('GET', url, true);
		
		
		//3.发送
		oAjax.send();
		
		//4.接收
		oAjax.onreadystatechange=function ()
		{
			if(oAjax.readyState==4)
			{
				if(oAjax.status==200)
				{
					//alert('成功了：'+oAjax.responseText);
					fnSucc(oAjax.responseText);
				}
				else
				{
					//alert('失败了');
					if(fnFaild)
					{
						fnFaild();
					}
				}
			}
		};
	}
})();
//6.
(function (){
	window.getPos=function (obj)
	{
		var res={l: 0, t: 0};
		
		while(obj)
		{
			res.l+=obj.offsetLeft||0;
			res.t+=obj.offsetTop||0;
			
			obj=obj.offsetParent;
		}
		
		return res;
	}
})();
//7.
(function (){
	window.getByClass=function (oParent, sClass)
	{
		var aEle=oParent.getElementsByTagName('*');
		var arr=[];
		
		var re=new RegExp('\\b'+sClass+'\\b');
		
		for(var i=0;i<aEle.length;i++)
		{
			if(re.test(aEle[i].className))
			{
				arr.push(aEle[i]);
			}
		}
		
		return arr;
	}
})();
//8.
(function (){
	window.addWheel=function (obj, fn)
	{
		obj.onmousewheel=fnWheel;
		if(obj.addEventListener)
		{
			obj.addEventListener('DOMMouseScroll', fnWheel, false);
		}
		
		function fnWheel(ev)
		{
			var oEvent=ev||event;
			
			var down=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
					
			fn(down);
			
			if(oEvent.preventDefault)
			{
				oEvent.preventDefault();
			}
			return false;
		}
	}	
})();
//9.
(function (){
	window.Random=function (oMin,oMax)
	{
		return parseInt(oMin+(Math.random()*oMax-oMin));
	}
})();
//10.
(function (){
	window.getStyle=function (obj,value)
	{
		return obj.cuurentStyle?obj.currentStyle[value]:getComputedStyle(obj,false)[value];
	}
})();
//11.
(function (){
	window.getMonthDay=function ()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+now);
		oDate.setMonth(oDate.getMonth()+1);
		oDate.setDate(0);
		
		return oDate.getDate();
	}
})();
//12.
(function (){
	window.getMonthDay=function ()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+now);
		oDate.setMonth(oDate.getMonth()+1);
		oDate.setDate(0);
		
		return oDate.getDate();
	}
})();
//13.
(function (){
	window.toDou=function (n)
	{
		return n<10?'0'+n:''+n;
	}	
})();
//14.
(function (){
	window.getLastMonthDay=function ()	
	{
		var oDate=new Date();
		
		oDate.setMonth(oDate.getMonth()+now);
		
		oDate.setDate(0);
		
		return oDate.getDate();
	}
})();
//15.
(function (){
	window.tz=function (id)	
	{
		var oDiv=document.getElementById(id);
		
		oDiv.onmousedown=function (ev)
		{
			var oEvent=ev||event;
			
			//1.距离
			var disX=oEvent.clientX-oDiv.offsetLeft;
			var disY=oEvent.clientY-oDiv.offsetTop;
			
			function fnMove(ev)
			{
				//2.算位置
				var oEvent=ev||event;
				
				oDiv.style.left=oEvent.clientX-disX+'px';
				oDiv.style.top=oEvent.clientY-disY+'px';
			}
			
			function fnUp()
			{
				//3.清掉
				this.onmousemove=null;
				this.onmouseup=null;
				
				if(oDiv.releaseCapture)
				{
					oDiv.releaseCapture();
				}
			}
			
			if(oDiv.setCapture)
			{
				oDiv.onmousemove=fnMove;
				oDiv.onmouseup=fnUp;
				
				oDiv.setCapture();
			}
			else
			{
				document.onmousemove=fnMove;
				document.onmouseup=fnUp;
			}
			
			return false;
		};	
	}
})();
//16.
(function (){
	window.wmtz=function (id)
	{
		var oDiv=document.getElementById(id);		
		var disX=0;
		var disY=0;
		
		oDiv.onmousedown=function (ev)
		{
			var oEvent=ev||event;
			
			disX=oEvent.clientX-oDiv.offsetLeft;
			disY=oEvent.clientY-oDiv.offsetTop;
			
			function fnDown(ev)
			{
				var oEvent=ev||event;
				
				oDiv.style.left=oEvent.clientX-disX+'px';
				oDiv.style.top=oEvent.clientY-disY+'px';
			}
			
			function fnUp()
			{
				this.onmousemove=null;
				this.onmouseup=null;
				
				if(this.releaseCapture)
				{
					this.releaseCapture();
				}
			}
			
			if(oDiv.setCapture)
			{
				//当鼠标按下的时候，才有move
				oDiv.onmousemove=fnDown;
				oDiv.onmouseup=fnUp;
				
				oDiv.setCapture();
			}
			else
			{
				//当鼠标按下的时候，才有move
				document.onmousemove=fnDown;
				document.onmouseup=fnUp;
				
				return false;
			}
		};	
	}	
})();
//17.
(function (){
	window.makeUpCalender=function (oTxt)
	{
		oTxt.onfocus=function ()
		{
			oDiv.style.display='block';
		};
		//创建元素
		var oDiv=document.createElement('div');
		
		oDiv.className='calender';
		oDiv.innerHTML=
			'<a href="javascript:;" class="prev">←</a>'+
			'<a href="javascript:;" class="next">→</a>'+
			'<span class="year_month"></span>'+
			'<ol>'+
				'<li>一</li>'+
				'<li>二</li>'+
				'<li>三</li>'+
				'<li>四</li>'+
				'<li>五</li>'+
				'<li class="week_end">六</li>'+
				'<li class="week_end">日</li>'+
			'</ol>'+
			'<ul></ul>';
		
		document.body.appendChild(oDiv);
		
		var p=getPos(oTxt);
		
		oDiv.style.left=p.left+'px';
		oDiv.style.top=p.top+oTxt.offsetHeight+'px';
		
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		var oSpan=oDiv.getElementsByTagName('span')[0];
		
		var now=0;
		
		function getMonthDay()
		{
			var oDate=new Date();
			
			oDate.setMonth(oDate.getMonth()+now);
			
			oDate.setMonth(oDate.getMonth()+1);
			oDate.setDate(0);
			
			return oDate.getDate();
		}
		
		function getFirstDay()
		{
			var oDate=new Date();
			
			oDate.setMonth(oDate.getMonth()+now);
			
			oDate.setDate(1);
			
			return oDate.getDay();
		}
		
		function refresh()
		{
			oUl.innerHTML='';
			
			//0.生成空的Li——第一天往后顶
			var m=getFirstDay();
			if(m==0)m=7;
			m--;
			
			for(var i=0;i<m;i++)
			{
				var oLi=document.createElement('li');
				
				oUl.appendChild(oLi);
			}
			
			//1.生成日期Li
			var n=getMonthDay();
			for(var i=0;i<n;i++)
			{
				var oLi=document.createElement('li');
				
				oLi.innerHTML=i+1;
				
				oLi.onclick=function ()
				{
					var oDate=new Date();
					
					oDate.setMonth(oDate.getMonth()+now);
					
					oTxt.value=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+this.innerHTML;
					
					oDiv.style.display='none';
				};
				
				oUl.appendChild(oLi);
			}
			
			//2.周末变红
			for(var i=0;i<aLi.length;i++)
			{
				if(i%7==5 || i%7==6)
				{
					aLi[i].className='week_end';
				}
			}
			
			//3.把过去的天变灰
			if(now<0)
			{
				//以前的——全灰
				for(var i=0;i<aLi.length;i++)
				{
					aLi[i].className='past';
				}
			}
			else if(now>0)
			{
				//未来的——不管
			}
			else
			{
				var oDate=new Date();
				oDate.setMonth(oDate.getMonth()+now);
				var n=oDate.getDate()-1;
				var m=getFirstDay();
				
				if(m==0)m=7;
				m--;
				for(var i=0;i<n;i++)
				{
					aLi[i+m].className='past';
				}
			}
			
			//显示当前年月
			var oDate=new Date();
			
			oDate.setMonth(oDate.getMonth()+now);
			
			oSpan.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
		}
		
		refresh();
		
		//上个月、下个月
		var oPrev=oDiv.children[0];
		var oNext=oDiv.children[1];
		
		oPrev.onclick=function ()
		{
			now--;
			refresh();
		};
		oNext.onclick=function ()
		{
			now++;
			refresh();
		};
		
		//自动引入css
		if(added)return;
		
		added=true;
		
		var oL=document.createElement('link');
		
		oL.rel='stylesheet';
		oL.type='text/css';
		oL.href='calender.css';
		
		var oHead=document.getElementsByTagName('head')[0];
		
		oHead.appendChild(oL);
	};	
})();	
//18.
(function (){
	window.Linkcss=function (xx)
	{
		var oL=document.createElement('link');
		oL.rel='stylesheet';
		oL.type='text/css';
		oL.href='xx.css';
		var oHead=document.getElementsByTagName('head')[0];
		oHead.appendChild(oL);	
	}
})();
//19.
(function (){
	window.startMove=function (obj, json, fn)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;		//假设：所有的都到了
			
			for(var name in json)
			{
				if(name=='opacity')
				{
					var cur=Math.round(parseFloat(getStyle(obj, name))*100);
				}
				else
				{
					var cur=parseInt(getStyle(obj, name));
				}
				
				var speed=(json[name]-cur)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				
				if(name=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}
				else
				{
					obj.style[name]=cur+speed+'px';
				}
				
				if(cur!=json[name])
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
				}
			}
		}, 30);
	}
})();
//20.
(function (){
	window.addWheel=function (obj, fn)
	{
		obj.onmousewheel=fnWheel;
		if(obj.addEventListener)
		{
			obj.addEventListener('DOMMouseScroll', fnWheel, false);
		}
		
		function fnWheel(ev)
		{
			var oEvent=ev||event;
			
			var down=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
					
			fn(down, ev);
			
			if(oEvent.preventDefault)
			{
				oEvent.preventDefault();
			}
			return false;
		}
	}
})();
//21.
(function (){
	window.zoom=function (oShadow, oBox)
	{
		var oShadow=document.getElementById(id);
		var oBox=oShadow.getElementById(id);
		var oImg=oBox.children[0];
		
		//弹出
		var aImg=document.getElementsByTagName('img');
		for(var i=0;i<aImg.length;i++)
		{
			aImg[i].onclick=function ()
			{
				oBox.children[0].src=this.src;
				
				oShadow.style.display='block';
				oBox.style.display='block';
				
				oBox.style.left=(document.documentElement.clientWidth-oBox.offsetWidth)/2+'px';
				oBox.style.top=(document.documentElement.clientHeight-oBox.offsetHeight)/2+'px';
				
			};
		}
		
		oImg.onclick=null;
		
		//关闭
		var oBtnClose=oBox.children[1].children[2];
		oBtnClose.onclick=function ()
		{
			oShadow.style.display='none';
			oBox.style.display='none';
		};
		
		//拖拽
		oBox.onmousedown=function (ev)
		{
			var oEvent=ev||event;
			
			var disX=oEvent.clientX-oBox.offsetLeft;
			var disY=oEvent.clientY-oBox.offsetTop;
			
			document.onmousemove=function (ev)
			{
				var oEvent=ev||event;
				
				oBox.style.left=oEvent.clientX-disX+'px';
				oBox.style.top=oEvent.clientY-disY+'px';
			};
			
			document.onmouseup=function ()
			{
				document.onmousemove=null;
				document.onmouseup=null;
			};
			
			return false;
		};
		
		//滚轮
		addWheel(oBox, function (down, ev){
			var oEvent=ev||event;
			
			//保存鼠标原来的比例
			var scaleX=(oEvent.clientX-oBox.offsetLeft)/oBox.offsetWidth;
			var scaleY=(oEvent.clientY-oBox.offsetTop)/oBox.offsetHeight;
			
			if(down)//缩小
			{
				oImg.width-=10;
			}
			else	//放大
			{
				oImg.width+=10;
			}
			
			//求一下变大后鼠标的距离
			var x=scaleX*oBox.offsetWidth;
			var y=scaleY*oBox.offsetHeight;
			
			//
			oBox.style.left=oEvent.clientX-x+'px';
			oBox.style.top=oEvent.clientY-y+'px';
		});
		
		//实际大小
		var oBtnActure=oBox.children[1].children[1];
		
		//
		var oBtnOpen=oBox.children[1].children[0];
		
		oBtnOpen.onclick=function ()
		{
			window.open(oImg.src, '_blank');
		};	
	}
})();
//22.
(function (){
	window.addReady=function (fn)
	{
		if(document.addEventListener)
		{
			document.addEventListener('DOMContentLoaded', fn, false);
		}
		else
		{
			//1.创建script
			var oS=document.createElement('script');
			
			//2.defer
			oS.defer=true;
			
			//3.事件
			oS.onreadystatechange=function ()
			{
				if(this.readyState=='complete')
				{
					fn();
				}
			};
			
			//4.插
			var oHead=document.getElementsByTagName('head')[0];
			
			oHead.appendChild(oS);
		}
	}
})();
//23.
(function (){
	window.succ=function (json)
	{
		//alert(json.s);
		var oUl=document.getElementById('ul1');
		
		oUl.innerHTML='';
		for(var i=0;i<json.s.length;i++)
		{
			var oLi=document.createElement('li');
			
			oLi.innerHTML=json.s[i];
			
			oUl.appendChild(oLi);
		}
	}
})();
//24.
(function (){
	window.addEvent=function (obj, sEv, fn)
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
})();
//25.
(function (){
	window.arr=function (oTxt)
	{
		oTxt.onkeydown=function (ev)
		{
			var oEvent=ev||event;
			
			//0		48
			//9		57
			//退格	8
			
			if(
				(oEvent.keyCode<48 || oEvent.keyCode>57) &&
				oEvent.keyCode!=8
			)
			{
				return false;
			}
		};	
	}
})(); 
//26.
(function (){
	window.setStyle=function (obj, json)
	{
		for(var i in json)
		{
			obj.style[i]=json[i];
		}
	}
})();
//27.
(function (){
	window.trim=function (str)
	{
		return str.replace(/^\s+|\s+$/g,'');
	}	
})();
//28.
(function (){
	window.isIE6=function ()
	{
		return window.navigator.userAgent.indexOf('MSIE 6')!=-1;
	}
})();
//29.
(function (){
	window.addClass=function (obj, sClass)
	{
		var re=new RegExp('\\b'+sClass+'\\b');
		
		if(!re.test(obj.className))
		{
			obj.className+=' '+sClass;
		}
	}
})();
//30.
(function (){
	window.removeClass=function (obj, sClass)
	{
		var re=new RegExp('\\b'+sClass+'\\b', 'g');
		
		obj.className=obj.className.replace(re, '').replace(/\s+/g, ' ');
	}
})();
//31.
var onLoad=(function (){
	var loaded=false;
	var added=false;
	var arr=[];
	
	function init()
	{
		if(loaded)return;
		loaded=true;
		
		for(var i=0;i<arr.length;i++)
			arr[i]();
		
		arr=null;
	}
	
	return function (fn)
	{
		if(loaded)return fn();
		
		arr.push(fn);
		
		if(added)return;
		
		//开始加载
		//chrome
		if(document.addEventListener)document.addEventListener('DOMContentLoaded', init, false);
		
		//IE
		document.write("<script id=\"__ie_onload\" defer src=\"//:\"><\/scr"+"ipt>");
		document.getElementById('__ie_onload').onreadystatechange=function ()
		{
			if(this.readyState == "complete")
			{
				init();
			}
		};
		
		//其他连defer都不支持的
		window.onload=init;
		
		added=true;
	};
})();