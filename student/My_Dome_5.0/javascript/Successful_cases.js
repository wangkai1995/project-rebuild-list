
window.onload = function(){
	
    addEvent(window,'scroll',function(){
    	var span = wk('#porduct_button span');	
    	
    	span.css('top',(function(){
    		
    		var top = 350 + Getscroll().top;           //这个350是最初span的'top'高度
    		
    		return top+'px';
    		
    	})());
    	
    });
    
}