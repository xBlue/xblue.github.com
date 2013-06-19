function setStyle(obj, json)
{
	for(var i in json)
	{
		obj.style[i]=json[i];
	}
}

 //获取元素相对于页面的Top,Left
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

function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b');
	var aResult=[];
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}

function addEvent(obj, ev, fn)
{
	obj.addEventListener?obj.addEventListener(ev, fn, false):obj.attachEvent('on'+ev, fn);
}
function removeEvent(obj, ev, fn)
{
	obj.removeEventListener?obj.removeEventListener(ev, fn, false):obj.detachEvent('on'+ev, fn);
}

//cookie
function setCookie(name, value, iDay)
{
	if(iDay!==false)
	{
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);
		
		document.cookie=name+'='+value+';expires='+oDate;
	}
	else
	{
		document.cookie=name+'='+value;
	}
}

function getCookie(name)
{
	var arr=document.cookie.split('; ');
	var i=0;
	
	for(i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');
		
		if(arr2[0]==name)
		{
			return arr2[1];
		}
	}
	
	return '';
}

function removeCookie(name)
{
	setCookie(name, 'a', -1);
}

function addReady(fn)
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

function rnd(n, m)
{
	return Math.random()*(m-n)+n;
}

//补零
function toDouble(str)
{
	if(str<10)
	{
		return '0'+str;	
	}
	else
	{
		return ''+str;
	}	
};

//jsonp
function jsonp(url,data,fn)
{
	var fnName='fn'+parseInt(Random(1,3000));
	window[fnName]=function(json)
	{
		//完成——script扔
		oHead.removeChild(oS);
		clearTimeout(timer);
		
		fn(json);	
	}
	
	data.t=Math.random();
	data.cb=fn;
	
	var arr=[];
	for(var i in data)
	{
		arr.push(i+'='+data[i]);	
	}
	
	var str=url+'?'+arr.join('&');
	
	var oS=document.createElement('script');
	oS.src=str;
	
	var oHead=document.getElementsByTagName('head');
	
	oHead.appendChild(oS);
}
function ajax(url, fnSucc, fnFaild)
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

function isSbIE6()
{
	return window.navigator.userAgent.indexOf('MSIE 6')!=-1;
}

function addClass(obj, sClass)
{
	var re=new RegExp('\\b'+sClass+'\\b');
	
	if(!re.test(obj.className))
	{
		obj.className+=' '+sClass;
	}
}

function removeClass(obj, sClass)
{
	var re=new RegExp('\\b'+sClass+'\\b', 'g');
	
	obj.className=obj.className.replace(re, '').replace(/\s+/g, ' ');
}

function isChild(oParent, obj)
{
	while(obj)
	{
		if(oParent==obj)
		{
			return true;
		}
		
		obj=obj.parentNode;
	}
	
	return false;
}

function startMove(obj, json, sp, fn)
{
	if(!sp)sp=8;
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
			
			var speed=(json[name]-cur)/sp;
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







