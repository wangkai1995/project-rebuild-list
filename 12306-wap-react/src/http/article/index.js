import httpServer  from '../../server/http/index';


export default {

    //公司简介
    company:function(){
        return httpServer.request({
            url:'/v1/article/content/1',
            method:'GET',
        })
    },
    
    //法律声明
    legalnotices:function(){
        return httpServer.request({
            url:'/v1/article/content/2',
            method:'GET',
        })
    },

    //文章列表
    agreementList:function(){
        return httpServer.request({
            url:'/v1/article/content/11',
            method:'GET',
        })
    },

    //文章
    agreement:function(data){
        return httpServer.request({
            url:'/v1/article/'+data.id,
            method:'GET',
        });
    }



}



