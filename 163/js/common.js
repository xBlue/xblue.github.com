function getByClass(oParent, sClass){
	var aEle=oParent.getElementsByTagName('*');
	var arr=[];
	var reg=new RegExp('\\b'+sClass+'\\b','i');
	
	for(var i=0; i<aEle.length; i++){
		if(reg.test(aEle[i].className)){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
}

function toDou(n){
	if(n<10){
		return "0"+n;
	}else{
		return ""+n;
	}
}

function getStyle(obj, name)
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

function getPos(obj){
	var l=0; 
	var t=0;
	
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		
		obj=obj.offsetParent;
	}
	
	return {left:l,top:t};
}