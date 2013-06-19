function getStyle(obj,name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function startMove(obj, json, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		
		
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




