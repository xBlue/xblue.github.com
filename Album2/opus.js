window.onload=function ()
{
	//li变成绝对定位
	var oDiv=document.getElementById('imgListBox');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var ready=true;
	
	var now=0;	//第一个
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].style.left=aLi[i].offsetLeft+'px';
		
		if(i>=12)
		{
			aLi[i].style.top='400px';
		}
		else
		{
			aLi[i].style.top=parseInt(i/4)*200+'px';
		}
	}
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].style.position='absolute';
	}
	
	for(var i=0;i<8;i++)
	{
		aLi[i].style.filter='alpha(opacity:100)';
		aLi[i].style.opacity=1;
	}
	//让下面的图片都隐藏
	for(var i=8;i<aLi.length;i++)
	{
		aLi[i].style.filter='alpha(opacity:0)';
		aLi[i].style.opacity=0;
	}
	oUl.className='list';
	//按钮
	var aBtn=oDiv.children[1].getElementsByTagName('span');
	
	//上一个
	aBtn[0].onclick=function ()
	{
		aBtn[1].style.color='';
		if(now==0)
		{			
			aBtn[0].style.color='yellow';
			return;
		}
		
		if(!ready)return;
		ready=false;
		
		var i=now+8-1;
		var timer=setInterval(function (){
			if(i<now)			//第一行
			{
				if(i==now-4)
				{
					aMove(aLi[i], {top: 0, opacity: 100}, function (){
						ready=true;
					});
				}
				else
				{
					aMove(aLi[i], {top: 0, opacity: 100});
				}
			}
			else if(i<now+4)	//第二行
			{
				aMove(aLi[i], {top: 200});
			}
			else			//第三行
			{
				aMove(aLi[i], {top: 400, opacity: 0});
			}
			
			i--;
			if(i==now-5)
			{
				now-=4;
				clearInterval(timer);
			}
		}, 40);
		
		//now+=4;
	};
	
	//下一个
	aBtn[1].onclick=function ()
	{
		aBtn[0].style.color='';
		if(now>=aLi.length-8)
		{
			aBtn[1].style.color='yellow';
			return;
		}
		
		if(!ready)return;
		ready=false;
		
		var i=now;
		var timer=setInterval(function (){
			if(i<now+4)			//第一行
			{
				aMove(aLi[i], {top: -200, opacity: 0});
			}
			else if(i<now+8)	//第二行
			{
				aMove(aLi[i], {top: 0});
			}
			else			//第三行
			{
				if(i==now+11)
				{
					aMove(aLi[i], {top: 200, opacity: 100}, function (){
						ready=true;
					});
				}
				else
				{
					aMove(aLi[i], {top: 200, opacity: 100});
				}
			}
			
			i++;
			if(i==now+12)
			{
				now+=4;
				clearInterval(timer);
			}
		}, 40);
		
		//now+=4;
	};
};