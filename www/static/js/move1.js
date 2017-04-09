// JavaScript Document
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
function startmove(obj,jason,fn){
	clearInterval(obj.timer);
	var cur=0;
	var flag=true;
    obj.timer=setInterval(function(){
        for(var arr in jason){
		if(arr=='opacity'){
			    cur=Math.round(parseFloat(getStyle(obj,arr))*100);
			}
		else{
			    cur=parseInt(getStyle(obj, arr));
			}
		var speed=(jason[arr]-cur)/6;	
	    speed=speed>0?Math.ceil(speed):Math.floor(speed);
	    if(jason[arr]!=cur){
            flag=false; 	
			}
		if(arr=='opacity'){
			obj.style.filter='alpha(opacity:'+(cur+speed)+')';
			obj.style.opacity=(cur+speed)/100;
			}	
		else{
		    obj.style[arr]=cur+speed+'px';
		         }
		     }
	if(flag){
	    clearInterval(obj.timer);
		if(fn)fn();	
	}		  
	},30);
}