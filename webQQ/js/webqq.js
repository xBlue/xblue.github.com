function time2date(t)
{
	var oDate=new Date();
	
	oDate.setTime(t*1000);
	
	return oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes();
};
function zc(json)
{	
	if(json.err)
	{
		alert('错误:'+json.msg);	
	}
	else
	{
		alert('创建失败，可能是没有连接上服务器 ');	
	}
};
function login(json)
{
	if(json.err)
	{
		alert('错误:'+json.msg);
	}
	else
	{
	//判断登录后才开启的聊天内页
		var oDiv=document.getElementById('talk');
		var oZzc=document.getElementById('zzc');
		var oC=document.getElementById('login');
		oDiv.style.display='block';
		oC.style.display='none';
		oZzc.style.display='none';
		
	}
	
};
//发布
function FuBu(json)
{
	var oDiv=document.getElementById('talk');
	var oContentText=getByClass(oDiv,'inText')[0];
	var oTaklUl=getByClass(oDiv,'talk_content')[0];
	var oLi=document.createElement('li');
	var oUserName=document.getElementById('qqLoginText');
	oLi.className='MyName';
	oLi.innerHTML='<div class="taler"><span class="taler_name">'+oUserName.value+'</span><span class="talk_time">'+time2date(json.time)+'</span></div><div class="talker_content">'+oContentText.value+'</div>';
	oTaklUl.appendChild(oLi);
	oContentText.value='';

}
//接收
function getMsgJ(json)
{

}
window.onload=function()
{
	
	var oZcBtn=document.getElementById('qqzhuce_btn');
	var oText=document.getElementById('qqLoginText');
	var oPassWord=document.getElementById('qqPassWord');
	//获取head
	var oHead=document.getElementsByTagName('head')[0];
	var oS=null;
	var oZzc=document.getElementById('zzc');
	var oC=document.getElementById('login');
	var oClose=document.getElementById('login_close');
	
	//点击图片弹出QQ登录页面
	(function()
	{
		(function()
		{
			var oBtn=document.getElementById('login_btn');	
			
			var oW=(document.documentElement.clientWidth-oC.offsetWidth)/2;
			var oH=(document.documentElement.clientHeigth-oC.offsetHeigth)/2;
			
			oC.style.top=oH+'px';
			oC.style.left=oW+'px';
			oC.style.display='none';
			oBtn.onclick=function()
			{
				oZzc.style.display='block';
				oC.style.display='block';	
			}
	})();
	closeLogin();
		//登录框拖动
		var oLoginMove=oC.children[0];
		oLoginMove.onmousedown=function(ev)
		{
			var oEvent=ev || event;
			var oldX=oEvent.clientX-oC.offsetLeft;
			var oldY=oEvent.clientY-oC.offsetTop;
			
			document.onmousemove=function(ev)
			{
				var oEvent=ev || event;
				var nW=oEvent.clientX-oldX;
				var nY=oEvent.clientY-oldY;
				
				oC.style.left=nW+'px';
				oC.style.top=nY+'px';
			}
			document.onmouseup=function()
			{
				document.onmousemove=null;
				document.onmouseup=null;
			}	
		}	
	})();
	//注册
	(function()
	{
		oZcBtn.onclick=function()
		{
			if(oS)
			{
				oHead.removeChild(oS);	
			}
			var url='http://www.zhinengshe.com/exercise/im/api.php?a=reg&user='+oText.value+'&pass='+oPassWord.value+'&face='+'1'+'&cb=zc&r='+Math.random();
			oS=document.createElement('script');
			oS.src=url;
			oHead.appendChild(oS);
		};
	})();
	//用户登录
	var oMyBtn=document.getElementById('qqlogin_btn');
	var oDiv=document.getElementById('talk');
	oDiv.style.left=(document.documentElement.clientWidth-oDiv.offsetWidth)/2+'px';	
	oDiv.style.top=(document.documentElement.clientHeight-oDiv.offsetHeight)/2+'px';
	oDiv.style.display='none';
	oMyBtn.onclick=function()
	{
		if(oS)
		{
			oHead.removeChild(oS);	
		}
		var url='http://www.zhinengshe.com/exercise/im/api.php?a=lgn&user='+oText.value+'&pass='+oPassWord.value+'&cb=login&r='+Math.random();
		oS=document.createElement('script');
		oS.src=url;
		oHead.appendChild(oS);
		
			
	}
	var oClose=getByClass(oDiv,'talk_close')[0];
	oClose.onclick=function()
	{
		var url='http://www.zhinengshe.com/exercise/im/api.php?a=logout';
		alert(url);
		oDiv.style.display='none';	
	}	
	
	function oFb()
	{
		if(oContentText.value=='')
		{
			alert('内容不能为空，请重新输入。');
			return;
		}
		if(oS)
		{
			oHead.removeChild(oS);	
		}
		
		var oTaklUl=getByClass(oDiv,'talk_content')[0];
		var url='http://www.zhinengshe.com/exercise/im/api.php?a=snd_msg&content='+oContentText.value+'&cb=FuBu&r='+Math.random();
		oS=document.createElement('script');
		oS.src=url;
		oHead.appendChild(oS);
		
			
	}
	//鼠标发布
	var oContentText=getByClass(oDiv,'inText')[0];
	var oFaBu=getByClass(oDiv,'tack_button')[0];
	oFaBu.onclick=function()
	{
		oFb();
	}
	//键盘发布
	oContentText.onkeydown=function(ev)
	{
		var oEvent=ev||event;
		if(oEvent.keyCode==13)
		{
			oFb();
			return false;
		}
	}
	//接受信息
	function getMsg()
	{
		if(oS)
		{
			oHead.removeChild(oS);	
		}
		var url='http://www.zhinengshe.com/exercise/im/api.php?a=get_msg&cb=getMsgJ';
		oS=document.createElement('script');
		oS.src=url;
		oHead.appendChild(oS);	
	}
	getMsg();
	//关闭登陆框
	function closeLogin()
	{
		oClose.onclick=function()
		{
			oZzc.style.display='none';
			oC.style.display='none';
			
		}	
	}
	
	//移动变大
	(function()
	{
		var oMove=oDiv.children[0];
	
		oMove.onmousedown=function(ev)
		{
			var oEvent=ev || event;
			var oldX=oEvent.clientX-oDiv.offsetLeft;
			var oldY=oEvent.clientY-oDiv.offsetTop;
			document.title=oldX+','+oldY;
			document.onmousemove=function(ev)
			{
				var oEvent=ev||event;
				var nW=oEvent.clientX-oldX;
				var nH=oEvent.clientY-oldY;
				
				oDiv.style.left=nW+'px';
				oDiv.style.top=nH+'px';
				
				
			}
			document.onmouseup=function()
			{
				document.onmousemove=null;
				document.onmouseup=null;	
			}
			return false; 	
		};
	
	
	})();
	//应用鼠标移入效果
	(function()
	{
		var oDiv=document.getElementById('useWrap');
		var aDiv=oDiv.children;
		var aSpan=oDiv.getElementsByTagName('span');
		for(var i=0;i<aDiv.length;i++)
		{
			(function(index)
			{
				aDiv[i].onmouseover=function()
				{
					aSpan[index].style.display='block';	
				}
				aDiv[i].onmouseout=function()
				{
					aSpan[index].style.display='none';	
				}	
			})(i)	
		};	
	})();
	
	//显示或隐藏
	(function()
	{
		var oList=getByClass(oDiv,'userList')[0];
		var oListBtn=getByClass(oDiv,'zxlb')[0];
		
		oListBtn.onclick=function()
		{
			if(oList.style.display=='none')	
			{
				oList.style.display='block';	
			}
			else
			{
				oList.style.display='none';
			}
		}
	})();
}