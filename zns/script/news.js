//news
(function(){
  
  ready(function(){
				 
	 var oDiv=document.getElementById("left_news");
	 
	 var oUl=oDiv.children[1];
	 
	 var aDiv=oUl.getElementsByTagName("div");
	 
	 var maxlength=aDiv.length;
	 
	 var aA=oUl.getElementsByTagName("a");
	 
	 var even=find_aA().single;
		   
	 var odd=find_aA().double;
     
	 var oLeft=oDiv.children[0].children[1];
	 
	 var oRight=oDiv.children[0].children[2];
	 
	 var moveBtn=true;//总开关
	 
	 var timer=null;
	 
	 var count=0;//运动几个;
	 
	 var page=1;//初始页
	 
	 var btn=true;//运动开关
	 
	 ajax({
  
		type:"get",
		
		url:"script/data.js",
		
		dataType:"json",
		
		async:"true",
		
		cache:"false",
		
		success:function(json)
		{  
		   //如果不够翻页
		   if(json.news.length<=maxlength)
		   {
			  oLeft.style.display="none";
			  oRight.style.display="none";
		   }
		   
           //第一次数据读取
		   changeData(even,json,page);
           
		   //点击
		   oRight.onclick=function()
		   {  
              _click("right");
		   }

		   oLeft.onclick=function()
		   {  
			  _click("left");
		   }
		   
		   function _click(dir)
		   {  
		      if(moveBtn)
			  {
				  moveBtn=false;
				  switch(dir)
				  {  //left
					 case "left":
					 page--;
					 
					 if(page<1)
					 { 
						page=1;
						moveBtn=true;
						return;
					 }
					 else
					 { 
						if(page==1)
						{ 
						   oLeft.className="prev_active";	 
						}  
					 }
					 oRight.className="next";
					 break;
					 
					 //right
					 case "right":

					 if(page*maxlength>=json.news.length)
				     {  
					    moveBtn=true;
					    return;
				     }
					 else
					 { 
					   if(page==Math.floor(json.news.length/maxlength))
					   {
						 oRight.className="next_active";   
					   }
					 }
				     oLeft.className="prev";
					 page++;
					 
					 break; 
				  }
			   
				  if(page%2==0)
				  {  
					changeData(odd,json,page);
				  }
				  else
				  {  
					changeData(even,json,page);  
				  }
	
				  clearInterval(timer);
				  
				  move(maxlength);  
		      }
		   }
		}
  
     });
	 
	 function changeData(aA,data,page)
	 {   
	    for (var i=0;i<maxlength;i++)
	    {   
		    aA[i].href="javascript:void(0)";
			aA[i].children[0].innerHTML="";
			aA[i].children[1].innerHTML="";
		
		    n=i+(page-1)*maxlength;
			//数据不够一页
			if(data.news[n])
			{
			  aA[i].href=data.news[n].href;
			  aA[i].children[0].innerHTML=data.news[n].content;
			  aA[i].children[1].innerHTML=data.news[n].time;  	
			}   
	    }	 
	 }

	 function find_aA()
	 {  
	    var even=[];
		var odd=[];
		
	   	for (var i=0;i<aA.length;i++)
		{
		  if(i%2==0)
		  {
			 even.push(aA[i]);  
		  }
		  else
		  {
			 odd.push(aA[i]);  
		  }
	    }
		return {single:even,double:odd}
	 }

     function move(num)
	 {  	 
		timer=setInterval(function(){
		  
		  if(count==num)
		  { 
			clearInterval(timer);
			btn=!btn;
			count=0;
			moveBtn=true;
		  } 
		  else if(btn)
		  { 
			 startMove(aDiv[count],{top:-aA[0].offsetHeight});
			 count++;
		  }
		  else
		  {
			 startMove(aDiv[count],{top:"0"});
			 count++; 
		  }
		  
		},200) 
	 }
  })
  
})();