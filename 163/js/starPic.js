//名利赏左右切换
(function(){
	var oDiv=document.getElementById('starPic');
	var aLi=getByClass(oDiv, 'pic_list')[0].children;
	var oPrev=getByClass(oDiv, 'left')[0];
	var oNext=getByClass(oDiv, 'right')[0];
	var oP=oDiv.getElementsByTagName('p')[0];
	var arr=[];
	var p=['赵欣瑜领衔 揭秘各国名媛背景','范冰冰史上最大尺度现身','韩星着装精选 有“惊”无喜','志玲各式红毯造型回顾','童版金球明星红毯秀'];
	var now=0;
	
	for(var i=0;i<aLi.length;i++){
		arr[i]=aLi[i].className;
	}
	
	oPrev.onclick=function (){
		arr.unshift(arr.pop());
		
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=arr[i];
		}
		
		now++;
		if(now>aLi.length)now=0;
		oP.children[0].innerHTML=p[now];
	};
	
	oNext.onclick=function (){
		arr.push(arr.shift());
		
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=arr[i];
		}
		
		now--;
		if(now<0)now=aLi.length-1;
		oP.children[0].innerHTML=p[now];
	};
})();