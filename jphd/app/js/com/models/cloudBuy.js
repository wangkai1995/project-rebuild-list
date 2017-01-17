'use strict';

module.exports = ['httpFactory', function(httpFactory) {
    return {
        //云购分类列表
    	cloudBuy_tabList :function(){
    		var params = {
    			'module' : 2  //1为私人订制 2为一元购
    		}
    		return httpFactory.request('category_list',params);
    	},

        //云购商品列表
        cloudBuy_list :function(params){
			return  httpFactory.request('activity_yungouList',params);
		},

        //云购商品详细
        cloudBuy_detail :function(params){
            return httpFactory.request('activity_yungouDetail',params);
        },

    }
}]