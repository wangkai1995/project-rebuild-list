
import Constant from '../../constant/config';



function toQueryString(obj){
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}


class httpServer {

	constructor(){	
	}
	
	request(config){
		var url = Constant.host + config.url;
		var headers = {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	    };

	    if(config.params){
	    	if(url.indexOf('?') === -1){
	    		url +='?';
	    	}
	    	var keys = Object.keys(config.params);
	    	for(var i=0 ;i<keys.length ;i++){
	    		if(i+1 < keys.length){
	    			url += ''+keys[i]+'='+config.params[ keys[i] ]+'&'
	    		}else{
	    			url += ''+keys[i]+'='+config.params[ keys[i] ];
	    		}	
	    	}
	    }


	    var defer = new Promise(function(resolve, reject){
	    	switch(config.method){
				case 'GET':
					fetch(url,{
						method:'GET',
						headers:headers,	
					}).then( result =>{
						result.json().then( data =>{
							resolve(data);
						}); 
					})
					.catch( err =>{
						reject(err);
					});
					break;

				case 'POST':
					fetch(url,{
						method:'POST',
						headers:headers,
						// body:toQueryString(config.data),
						body: JSON.stringify(config.data),
					}).then( result =>{
						result.json().then( data =>{
							resolve(data);
						}); 
					})
					.catch( err =>{
						reject(err);
					});
					break;

				default:
					fetch(url,{
						method:config.method,
						headers:headers,	
					}).then( result =>{
						result.json().then( data =>{
							resolve(data);
						}); 
					})
					.catch( err =>{
						reject(err);
					});
					break;
		    }
	    });

	    return defer;
	}
}



export default new httpServer;


