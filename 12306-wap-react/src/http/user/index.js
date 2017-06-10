import httpServer  from '../../server/http/index';


export default {

    userInfo:function(data){
        return httpServer.request({
            url:'/v1/user/info',
            method: 'GET',
            params: data,
        });
    },

   	login: function(data){
        return httpServer.request({
            method: 'POST',
            url: '/oauth/token?client_id=client&client_secret=secret&grant_type=password&username='+ data.username + '&password='+ data.password
        })
    },

    mobileValid: function(data){
    	return httpServer.request({
            method: 'GET',
            url:'/v1/check-mobile/'+ data.mobile
    	})
    },

    verifyCode:function(data){
    	return httpServer.request({
    	   method: 'POST',
    	   url: '/v1/verify-code/'+data.mode+'?mobile='+ data.mobile
    	})
    },

    register:function(data){
        return httpServer.request({
            method : 'POST',
            url :'/v1/register',
            params: data,
        })
    },

    getPassengerList:function(data){
        return httpServer.request({
            method: 'GET',
            url:'/v1/passenger/',
            params: data,
        })
    },

    complain:function(data){
        return httpServer.request({
            method: 'POST',
            url:'/v1/complain',
            params: data,
        })
    },


    getPassenger:function(data){
        return httpServer.request({
            method: 'GET',
            url:'/v1/passenger/'+data.passengerId+'?access_token='+data.access_token,
        })
    },

    addPassenger:function(data){
        return httpServer.request({
            method: 'POST',
            url:'/v1/passenger/',
            params: data,
        })
    },

    updatePassenger:function(data){
        return httpServer.request({
            method: 'POST',
            url:'/v1/passenger/'+data.passengerId,
            params: data.info,
        })
    },

    orderInfo:function(data){
        return httpServer.request({
            method: 'GET',
            url:'/v1/user/orders',
            params: data,
        })
    },
    
    login12306:function(data){
        return httpServer.request({
            method: 'POST',
            url: '/v1/train/trainAccount',
            params: data
        })
    },

    updateUserInfo:function(data){
        return httpServer.request({
            method : 'POST',
            url: '/v1/user?access_token='+data.token,
            params:data.formData
        })
    },

}



