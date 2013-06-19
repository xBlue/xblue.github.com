//obj, 起始值json ,终点值json, 拼接, 类型,时间,回调函数
function flex(obj,jsonStart,jsonEnd,cb,type,time,fnEnd)
{
   if(!time)time=5;
   if(!type)type='buffer';
   if(!obj.iSpeed)obj.iSpeed={};
   if(!obj.iCur)obj.iCur={};
   if(!obj.lastMove)obj.lastMove=0;
   
   for (var attr in jsonStart)
   {
     if(!obj.iSpeed[attr])obj.iSpeed[attr]=0;
	 
	 obj.iCur[attr]=parseInt(jsonStart[attr]);
   }

   clearInterval(obj.timer);
   obj.timer=setInterval(move,30);

   var now=new Date().getTime();
   
   if(now-obj.lastMove>=30)
   {   
		move();
   }
   
   function move()
   {
     var bStop=true;
	 
	 for (var attr in jsonEnd)
	 {  
	    var iTarget=parseInt(jsonEnd[attr])
	 
	    if(type=='buffer')
		{
		   obj.iSpeed[attr]=(iTarget-obj.iCur[attr])/time;
		   obj.iSpeed[attr]=obj.iSpeed[attr]>0?Math.ceil(obj.iSpeed[attr]):Math.floor(obj.iSpeed[attr]);
		} 
		else if(type=='elec')
 		{
		   obj.iSpeed[attr]+=(iTarget-obj.iCur[attr])/time;
		   obj.iSpeed[attr]*=0.7;
		}
		
		obj.iCur[attr]+=obj.iSpeed[attr];
		
		if(Math.round(obj.iCur[attr])!=iTarget||parseInt(obj.iSpeed[attr])!=0)
		{
		   bStop=false;
		}
		
		cb(obj.iCur); 
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