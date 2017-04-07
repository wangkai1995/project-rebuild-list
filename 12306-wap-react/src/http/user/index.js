import httpServer  from '../../server/http/index';


export default {

    userInfo:function(data){
        return httpServer.request({
            url:'/v1/user/info',
            method: 'GET',
            params: data,
        });
    },
    
}



