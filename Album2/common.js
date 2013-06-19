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
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	var arr=[];
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			arr.push(aEle[i]);
		}
	}
	
	return arr;
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

function rnd(n, m)
{
	return Math.random()*(m-n)+n;
}

function json2url(json)
{
	var a=[];
	for(var i in json)
	{
		var v=json[i]+'';
		v=v.replace(/\n/g, '<br/>');
		v=encodeURIComponent(v);
		a.push(i+'='+v);
	}
	return a.join('&');
}

function isIE6()
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

function addWheel(obj, fn)
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









