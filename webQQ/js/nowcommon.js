//底层空间
var qq_cm={};

//设置样式
qq_cm.setStyle=function(obj, json)
{
	for(var i in json)
	{
		obj.style[i]=json[i];
	}
}

//获取样式
qq_cm.getStyle=function(obj, name)
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

//获取相对父级元素坐标
qq_cm.getPos=function(obj) 
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

//获取Class
qq_cm.getByClass=function(oParent, sClass)
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

//随机数
qq_cm.rnd=function(n, m)
{
	return Math.random()*(m-n)+n;
}

//补零
qq_cm.toDouble=function(str)
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

//jsonP
qq_cm.jsonp=function(url,data,fn)
{
	var fnName='fn'+parseInt(qq_cm.rnd(1,3000));
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

