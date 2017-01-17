

window.onload = function(){

	var a_link = wk('#porduct_solution a');

	a_link.click(function(event) {
		 var e = event || window.event;
        
        //验证用户是否登录cookie
	if(getCookie('Rosim_flag') && getCookie('Rosim_user')){
        
        
       var code = Math.random();

		Ajax({
            type : 'post',
            url : '/code_library/Ve_jurisdiction.php?rand='+code,
            data : {
            	rand : code,
            	query : 'true',
            	flag : getCookie('Rosim_flag'),
            },
            
         
            success : function(text){

                
               if(text === 'false' || text.length < 40){
                    alert('All visitors are not available, please wait for the Audit Manager');
                    preDef(e);
                     
               }

            },


		     });
       
       }else{
       	  alert('Please login first');
          preDef(e);
       }  

	});

   
}