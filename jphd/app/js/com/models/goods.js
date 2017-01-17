'use strict';

module.exports = ['httpFactory', function(httpFactory) {
    return {
        //商品本次购买记录
        goods_BuyList:function(params){
            return httpFactory.request('activity_buyList',params);
        },

        //商品往期揭晓
        goods_toward:function(params){
        	return httpFactory.request('goods_yungouPrizes',params);
        },

        //获取商品获奖结果
        goods_result:function(params){
            return httpFactory.request('activity_result',params);
        }


    }
}]