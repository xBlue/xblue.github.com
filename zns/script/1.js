function ready(fn)
{
  if(document.addEventListener)
  {
    document.addEventListener("DOMContentLoaded",fn,false);
  }
  else
  {
    var oS=document.createElement("script");
	
	oS.defer=true;
	
	oS.onreadystatechange=function()
	{
	  if(oS.readyState=="complete")
	  {
	     fn();
	  }
	}
	
	var oHead=document.getElementsByTagName("html")[0];
	
	oHead.appendChild(oS);
	
  }
}

