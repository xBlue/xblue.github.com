var snaker=null;

(function(){
		  
	function myaddEvent(obj,sEv,fn)
	{
	  if(obj.attachEvent)
	  {
		 obj.attachEvent("on"+sEv,fn);  
	  }
	  else
	  {
		 obj.addEventListener(sEv,fn);  
	  }
	}
	
	function Snake(id)
	{ 
	  var _this=this;
	  
	  this.oDiv=document.getElementById(id)
	
	  this.snake=[];
	  
	  this.font=[];
	  
	  this.wrapWidth=this.oDiv.offsetWidth;
	  
	  this.wrapHeight=this.oDiv.offsetHeight;
	  
	  this.unit=30;
	  
	  this.speed=200;
	  
	  this.level=0;
	  
	  this.timer=null;
	  
	  this.derection="left";
	  
	  this.row=this.wrapHeight/this.unit;  //9
	  
	  this.col=this.wrapWidth/this.unit;  //20
	
	  this.unitSnake=null;
	  
	  this.unitFont=null;
	  
	  this.msg=document.getElementById("msg");
	  
	  this.information=document.getElementById("information");
	  
	  this.startBtn=document.getElementById("btn");
	  
	  this.startBtn.onclick=function()
	  {
		_this.start();
		  
	  }
	}
	//开始
	Snake.prototype.start=function()
	{   
	    this.msg.innerHTML="";
		
	    this.init();
	  
	    this.changeDerction();
	  
	    this.move();
	    
	    this.createFont(); 
	}
	
	//蛇初始化
	Snake.prototype.init=function()
	{
	  this.information.innerHTML="当前等级1";

	  this.oDiv.innerHTML="";
	  
	  this.snake.length=0;
	  
	  this.font.length=0;
	  
	  this.speed=200;
	  
	  this.level=0;
	  
	  this.derection="left";
	  
	  clearInterval(this.timer);

	  for (var i=0;i<5;i++)
	  { 
		this.unitSnake=document.createElement("div");
		
		this.unitSnake.style.background="url(img/snake"+i+".png)";
	  
		this.snake[i]={r:4,c:i+7,div:this.unitSnake,dir:"left",type:"snake"};
		
		this.oDiv.appendChild(this.unitSnake);
		
		this.setPosition(this.snake[i]);
		
	  }
	  
	  this.snake[0].div.style.zIndex=2;
	};
	
	//生成字
	Snake.prototype.createFont=function()
	{  
	
	  while(this.font.length<4)
	  {
		var btn=true;  
		  
		var r=this.rndR_C().rndR;
		
		var c=this.rndR_C().rndC;
	
		for (var i=0;i<this.snake.length;i++)
		{
		   if(r==this.snake[i].r&&c==this.snake[i].c)
		   {
			  btn=false;   
		   }
		}
		
		for (var i=0;i<this.font.length;i++)
		{
		   if(r==this.font[i].r&&c==this.font[i].c)
		   {
			  btn=false;   
		   }	
		}
		
		if(btn)
		{  
		   this.unitFont=document.createElement("div");
		   
		   this.font.push({r:r,c:c,div:this.unitFont,type:"font"});
		   
		   this.unitFont.style.background="url(img/iconBg.jpg) no-repeat -"+30*(this.font.length-1)+"px -"+30*(this.level)+"px";
	
		   this.setPosition(this.font[this.font.length-1]); 
	
		   this.oDiv.appendChild(this.unitFont);
		}
	  }
	
	};
	
	//随机生成
	Snake.prototype.rndR_C=function()
	{
	   return {rndR:parseInt(Math.random()*this.row),rndC:parseInt(Math.random()*this.col)};
	};
	
	//设置蛇和字的定位方法
	Snake.prototype.setPosition=function(obj)
	{
	   obj.div.style.top=obj.r*this.unit+"px";
	   
	   obj.div.style.left=obj.c*this.unit+"px";
	   
	   if(obj.type=="snake")
	   {
		 obj.div.className=obj.dir;  
	   }  
	};
	
	//蛇的移动
	Snake.prototype.move=function()
	{
	   var _this=this;
	
	   this.timer=setInterval(function(){
							   
		  //吃到了							   
		  _this.eated();
		  
		  //升级
		  _this.upgrade();
	
		  for (var i=_this.snake.length-1;i>0;i--)
		  { 
			 _this.snake[i].r=_this.snake[i-1].r;
			 _this.snake[i].c=_this.snake[i-1].c;
			 _this.snake[i].dir=_this.snake[i-1].dir;
		  } 
		  
		  switch(_this.derection)
		  {
			case "left":
			  _this.snake[0].c--;
			break;
			
			case "up":
			  _this.snake[0].r--;
			break;
			
			case "right":
			  _this.snake[0].c++;
			break;
			
			case "down":
			  _this.snake[0].r++;
			break;
		  }
		  
		  for (var i=0;i<_this.snake.length;i++)
		  {
			 _this.setPosition(_this.snake[i]); 
		  }
		  //挂了
		  _this.wrong();
	   
	   },_this.speed)
	};
	
	//改变方向
	Snake.prototype.changeDerction=function()
	{
	  var _this=this;	
		
	  myaddEvent(document,"keydown",function(ev){
		 
		 var oEvent=ev||event;
		 
		 var code=oEvent.keyCode;
		 
		 switch(code)
		 {
		   case 37:
			_this.derection="left";
			_this.snake[0].dir="left";
		   break;
		   
		   case 38:
			_this.derection="up";
			_this.snake[0].dir="up";
		   break;
		   
		   case 39:
			_this.derection="right";
			_this.snake[0].dir="right";
		   break;
		   
		   case 40:
			_this.derection="down";
			_this.snake[0].dir="down";
		   break;
		 }
		 
	  })
	};
	
	//升级了
	Snake.prototype.upgrade=function()
	{ 
	  if(this.font.length==0)
	  {  
		 this.level++;
		 this.information.innerHTML="当前等级"+(this.level+1);
		 
		 this.speed-=10;
		 if(this.speed<=50)
		 {
		   this.speed=50;
		   this.msg.innerHTML="恭喜你打穿了";
		   return;
		 }
		 
		 clearInterval(this.timer);
		 this.move();
		 this.createFont();  
	  }
	}
	
	//判定是否吃到了
	Snake.prototype.eated=function()
	{
	   
	  if(this.snake[0].r==this.font[0].r&&this.snake[0].c==this.font[0].c)
	  {
		 this.snake.splice(this.snake.length-2,0,this.font[0]);
		 this.font.shift();
	  }
	}
	
	//挂了
	Snake.prototype.wrong=function()
	{
	  //判定是否吃错了
	  for (var i=1;i<this.font.length;i++)
	  {
		 if(this.snake[0].r==this.font[i].r&&this.snake[0].c==this.font[i].c)
		 {
			this.end();  	 
		 }
	  }	
	  
	  //判定是否撞墙了
	  if(this.snake[0].c<0||this.snake[0].c>this.col-1||this.snake[0].r<0||this.snake[0].r>this.row-1)
	  {
		 this.end();
	  }
	  
	  //判定是否撞到自己了
	  for (var i=1;i<this.snake.length;i++)
	  {
		 if(this.snake[0].r==this.snake[i].r&&this.snake[0].c==this.snake[i].c)
		 {
			this.end()  	 
		 }
	  }
	}
	
	//gameover初始化
	Snake.prototype.end=function()
	{  
		this.msg.innerHTML="恭喜你挂了";
		this.init();
	}
	
	snaker=function(id)
	{
	  new Snake(id);
	}
	
	var oLink=document.createElement("link");
	
	var oHead=document.getElementsByTagName('head')[0];
	
	oLink.type="text/css";
	
	oLink.rel="stylesheet";
	
	oLink.href="snake.css";
	
	oHead.appendChild(oLink);

})()
