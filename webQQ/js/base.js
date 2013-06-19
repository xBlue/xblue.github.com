//随机函数，最小值，最大值
function Random(oMin,oMax)
{
	return parseInt(oMin+(Math.random()*oMax-oMin));
};

function getByClass(parentNode,ClassName)
{
	var aEle=parentNode.getElementsByTagName('*');
	var arr=[];
	for(var i=0;i<aEle.length;i++)	
	{
		if(aEle[i].className==ClassName)
		{
			arr.push(aEle[i]);	
		}	
	}
	return arr;
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
};
//滑轮滚动
function addWheel(obj,fn)
{
	obj.onmousewheel=fnWheel;
	if(obj.addEventListener)
	{
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
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
	
};
//ajax
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
};

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