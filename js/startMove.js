function startMove(obj, json, type, fnEnd)
{
	if(!obj.lastMove)
	{
		obj.lastMove=0;
	}

	if(!obj.speed)obj.speed={};
	var cur={};
	
	for(var name in json)
	{
		if(!obj.speed[name])
		{
			obj.speed[name]=0;
		}
		if(name=='opacity')
		{
			cur[name]=Math.round(parseFloat(getStyle(obj, name))*100);
		}
		else
		{
			cur[name]=parseInt(getStyle(obj, name));
		}
	}
	
	clearInterval(obj.timer);
	obj.timer=setInterval(move, 30);
	
	var now=new Date().getTime();
	
	if(now-obj.lastMove>=30)
	{
		move();
	}
	
	function move(){
		var bStop=true;
		
		for(var name in json)
		{
			if(type=='elec')
			{
				obj.speed[name]+=(json[name]-cur[name])/5;
				obj.speed[name]*=0.7;
			}
			else if(type=='buffer')
			{
				obj.speed[name]=(json[name]-cur[name])/4;
				obj.speed[name]=obj.speed[name]>0?Math.ceil(obj.speed[name]):Math.floor(obj.speed[name]);
			}
			
			cur[name]+=obj.speed[name];
			
			if(parseInt(obj.speed[name])!=0 || Math.round(cur[name])!=json[name])
			{
				bStop=false;
			}
			
			if(name=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur[name]+obj.speed[name])+')';
				obj.style.opacity=(cur[name]+obj.speed[name])/100;
			}
			else
			{
				obj.style[name]=cur[name]+obj.speed[name]+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			
			if(fnEnd)
			{
				fnEnd();
			}
		}
		
		obj.lastMove=now;
	}
}