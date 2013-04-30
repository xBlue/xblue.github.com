onLoad(function(){	
	
	//banner
	var oContent=document.getElementById('content');
	var aImgUl=getByClass(oContent, 'list_li')[0];
	var aImgLi=aImgUl.getElementsByTagName('li');
	var aImgspan=aImgUl.getElementsByTagName('span');
	var now=0;
	
	for(var a=0;a<aImgLi.length;a++)
	{
		(function(index){
				now=index;
				tabs();
		})(a);
	}	
	
	function tabs()
	{
		//startMove(aImgUl, {left: -(aImgLi[now].offsetLeft)}, 'buffer');		
		for(var a=0;a<aImgLi.length;a++)
		{
			Move(aImgLi[a], {opacity: 0});
		}
		Move(aImgLi[now], {opacity: 100});
	}	
	
	//自动播放
	var timer=setInterval(next, 5000);
	
	oContent.onmouseover=function ()
	{
		clearInterval(timer);
		for(var a=0;a<aImgspan.length;a++)
		{
			Move(aImgspan[a], {opacity: 100});	
		}	
	}
	oContent.onmouseout=function ()
	{
		timer=setInterval(next, 5000);
		for(var a=0;a<aImgspan.length;a++)
		{
			Move(aImgspan[a], {opacity: 0});	
		}
	}
	
	function next()
	{
		now++;
		if(now==aImgLi.length)
		{
			now=0;	
		}	
		tabs();
	}

	
	//进度条
/*	var aSpeed=getByClass(oContent, 'speed')[0];
	var aSp=aSpeed.children;*/

	
	/*-----------------------------*/
	var aColumn=document.getElementById('column');
	var aCoLi=getByClass(aColumn, 'column_ul')[0].getElementsByTagName('li');
	var aSspan=getByClass(aColumn, 'column_ul')[0].getElementsByTagName('span');
	//alert(aSspan.length);
	for(var i=0;i<aSspan.length;i++)
	{
		(function (index){
			aCoLi[index].onmouseover=function ()
			{
				Move(aSspan[index], {opacity: 100});
			};
			aCoLi[index].onmouseout=function ()
			{
				Move(aSspan[index], {opacity: 0});
			};		
		})(i);
	}
	
});