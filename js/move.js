//所有的都到了——关闭
//没有没到的——关闭

function Move(obj, json, fn)
{
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
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
			
			var speed=(json[name]-cur)/8;
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
	}, 80);
}