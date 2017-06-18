import httpServer  from '../../server/http/index';


export default {

    //请求汽车票支付倒计时
    getBusPayCountDown:function(data){
        return httpServer.request({
            url:'/v1/bus/leftPayTime/'+data.order+'?access_token='+data.token,
            method: 'GET',
        })
    },
    

    //请求火车票支付倒计时
    getTrainPayCountDown:function(data){
        return httpServer.request({
            url:'/v1/train/leftPayTime/'+data.order+'?access_token='+data.token,
            method: 'GET',
        })
    },

    //获取微信openId
    getWeChatOpenId :function(data){
        return httpServer.request({
            method: 'GET',
            url: '/v1/weixin/openid?code='+data.code,
        })
    },
    
    //汽车票微信支付
    busWeChatPay : function(data){
        return httpServer.request({
            method:'GET',
            url:'/v1/bus/code-url/'+data.order+'?access_token='+data.token,
            params : data.paydata,
        })
    },
    
    //火车票微信支付
    trainWeChatPay : function(data){
        return httpServer.request({
            method:'GET',
            url:'/v1/train/code-url/'+data.order+'?access_token='+data.token,
            params : data.paydata,
        })
    },
    
    //汽车票状态
    busState : function(data){
        return httpServer.request({
            method:'GET',
            url:'/v1/bus/order-status/'+data.order+'?access_token='+data.token,
        })
    },
    
    //火车票状态
    trainState: function(data){
        return httpServer.request({
             method: 'GET',
            url: '/v1/train/status/'+data.order+'?access_token='+data.token,
        })
    },

    //火车票支付宝支付
    mobileTrainAliPay:function(data){
        return httpServer.request({
            method: 'GET',
            url: '/v1/train/alipay-wap/'+data.order+'?access_token='+data.token,
        })
    },


}
