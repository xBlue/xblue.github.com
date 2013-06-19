//点击显示,居中
function clickShow(oBtn,obj,Zz)        
{
	obj.style.display='none';
	oBtn.onclick=function()
	{
		if(Zz)
		{
			Zz.style.display='block';
		}
		
		obj.style.display='block';
		
		var oW=(document.documentElement.clientWidth-obj.offsetWidth)/2;
		var oH=(document.documentElement.clientHeigth-obj.offsetHeigth)/2;
		obj.style.top=oH+'px';
		obj.style.left=oW+'px';	
	}
}
//应用鼠标移入效果
function moveWrap(aBtn,Wrap)
{
	for(var i=0;i<aBtn.length;i++)
	{
		(function(index)
		{
			aBtn[i].onmouseover=function()
			{
				Wrap[index].style.display='block';	
			}
			aBtn[i].onmouseout=function()
			{
				Wrap[index].style.display='none';	
			}	
		})(i)	
	};	
};
//拖拽移动
function ObjMove(MoveObj,Obj)
{
	MoveObj.onmousedown=function(ev)
	{
		var oEvent=ev || event;
		var oldX=oEvent.clientX-Obj.offsetLeft;
		var oldY=oEvent.clientY-Obj.offsetTop;
		
		document.onmousemove=function(ev)
		{
			var oEvent=ev || event;
			var nW=oEvent.clientX-oldX;
			var nY=oEvent.clientY-oldY;
			
			Obj.style.left=nW+'px';
			Obj.style.top=nY+'px';
		}
		document.onmouseup=function()
		{
			document.onmousemove=null;
			document.onmouseup=null;
		}
		return false;	
	}	
	
}
//关闭
function closeLogin(oCloseBtn,obj,Zz)
{
	oCloseBtn.onclick=function()
	{
		if(Zz)
		{
			Zz.style.display='none';
		}
		obj.style.display='none';
		
	}	
}

//自定义滚动条
function useWheel(obj,cBox,cList,wBox,wBar,up,down)
{
	var oWheelScrollBox=getByClass(obj,wBox)[0];
	var oWheelScroll=getByClass(obj,wBar)[0];
	var oTalk_content=getByClass(obj,cList)[0];
	oWheelScroll.onmousedown=function(ev)
	{
	var oEvent=ev||event;
	var oldY=oEvent.clientY-oWheelScroll.offsetTop;
	
	document.onmousemove=function(ev)
	{
		var oEvent=ev||event;
		var newY=oEvent.clientY-oldY;
		setTop(newY);
	}
	document.onmouseup=function()
	{
		document.onmousemove=null;
		document.onmouseup=null;	
	}
	return false;
	}
	//滑动坐标函数
	function setTop(newY)
	{
	if(newY<0)
	{
		newY=0;	
	}
	else if(newY>oWheelScrollBox.offsetHeight-oWheelScroll.offsetHeight)
	{
		newY=oWheelScrollBox.offsetHeight-oWheelScroll.offsetHeight;
	}
	oWheelScroll.style.top=newY+'px';
	var oPint=newY/(oWheelScrollBox.offsetHeight-oWheelScroll.offsetHeight);
	oTalk_content.style.top=-(oTalk_content.offsetHeight-obj.offsetHeight)*oPint+'px';
	}
	//滑轮
	addWheel(obj, function (down){
	if(down)
	{
	setTop(oWheelScroll.offsetTop+10);
	}
	else
	{
	setTop(oWheelScroll.offsetTop-10);
	}
	});
	//上下
	var oWheelUp=getByClass(obj,up)[0];
	var oWheeldown=getByClass(obj,down)[0];
	oWheelUp.onmousedown=oWheeldown.onmousedown=function ()
	{
	return false;
	};
	
	oWheelUp.onclick=function ()
	{
	setTop(oWheelScroll.offsetTop-10);
	};
	oWheeldown.onclick=function ()
	{
	setTop(oWheelScroll.offsetTop+10);
	};
	
	
	return{
		oPint: function (n)
		{
			setTop(n*(oWheelScrollBox.offsetHeight-oWheelScroll.offsetHeight));
		},
		resize: function ()
		{
			oWheelScroll.style.height=oWheelScrollBox.offsetHeight*oTalk_content.offsetHeight/obj.offsetHeight+'px';
		}
	};
};

