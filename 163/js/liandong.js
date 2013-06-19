//联动
var data=[
	{
		type:"高级成衣",
		list:[
			{type:"2011春夏",list:[{type:"<a href='#'>3.1 Phillip Lim</a>"},{type:"<a href='#'>Adam"},{type:"<a href='#'>Adam2</a>"},{type:"<a href='#'>3.1 Phillip Lim</a>"},{type:"<a href='#'>Adam"},{type:"<a href='#'>Adam2</a>"},{type:"<a href='#'>3.1 Phillip Lim</a>"},{type:"<a href='#'>Adam"},{type:"<a href='#'>Adam2</a>"}]},
			{type:"2011秋冬",list:[{type:"<a href='#'>3.1 Phiip Lim</a>"},{type:"<a href='#'>Ad4am</a>"},{type:"<a href='#'>Adam2</a>"}]},
			{type:"2012春夏",list:[{type:"<a href='#'>3.1 Phillip Lim</a>"},{type:"<a href='#'>Ad6am</a>"},{type:"<a href='#'>Ada7m2</a>"}]},
			{type:"2012秋冬",list:[{type:"<a href='#'>3.1 Phillip Lim</a>"},{type:"<a href='#'>Ad7am</a>"},{type:"<a href='#'>Ad5am2</a>"}]}
		]
	},{
		type:"高级成2衣",
		list:[
			{type:"2011春夏",list:[{type:"3.1 Phillip Lim"},{type:"Adertream"},{type:"Adam2"}]},
			{type:"201sd1秋冬",list:[{type:"3.1 Phdfgdfiip Lim"},{type:"Ad4am"},{type:"Adam2"}]},
			{type:"2012春夏",list:[{type:"3.1 Phillip Lim"},{type:"Adrt6am"},{type:"Ada745m2"}]}
		]
	},{
		type:"高级32衣",
		list:[
			{type:"2011春夏",list:[{type:"3.1 Philerelip Lim"},{type:"Adam"},{type:"Ad4534am2"}]},
			{type:"201fvgdfg1秋冬",list:[{type:"3.1 dgdfPhiip Lim"},{type:"Ad4am"},{type:"Ad43534am2"}]},
			{type:"2012春夏",list:[{type:"3.1 Phillip Lim"},{type:"Ad6aretvm"},{type:"Ada7m2"}]},
			{type:"201fgd2秋冬",list:[{type:"3.1 Phillip Lim"},{type:"Ad7am"},{type:"Advcv5am2"}]}
		]
	}
];

(function(){
	var oDiv=document.getElementById("design");
	var aDiv=oDiv.children;
	
	dList(aDiv[0],data,0);
	dList(aDiv[1],data[0].list,1);
	dList(aDiv[2],data[0].list[0].list,2);
	
	function dList(oDiv,data,num){
		var oUl=oDiv.getElementsByTagName("ul")[0];
		oUl.innerHTML="";
		
		for(var i=0; i<data.length; i++){
			var oLi=document.createElement("li");
			
			oLi.innerHTML=data[i].type;
			oUl.appendChild(oLi);
			
			(function(index){
				oLi.onclick=function(){
					for(var j=0; j<oUl.children.length; j++){
						oUl.children[j].className="";
					}
					this.className="on";
					
					switch(num){
						case 0:
							dList(aDiv[1],data[index].list,1);
							dList(aDiv[2],data[index].list[0].list,2);
							break;
						case 1:
							dList(aDiv[2],data[index].list,2);
							break;
					}
				};
			})(i);
		}
		oUl.children[0].className="on";
	}
})();