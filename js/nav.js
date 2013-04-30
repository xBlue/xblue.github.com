onLoad(function(){
	var oNav=document.getElementById('nav');
	var oUl=oNav.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var oBox=aLi[aLi.length-1];
	
	for(var a=0;a<aLi.length;a++)
	{
		aLi[a].onmouseover=function ()
		{
			startMove(oBox, {left: this.offsetLeft}, 'elec');
		};	
	}	
});