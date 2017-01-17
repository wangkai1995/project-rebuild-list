'use strict';

module.exports = {
    url: '/index',
    templateUrl: 'index/cloudBuy/index/tpl/index.html',
    resolve: {
    	oTabList: ['viewDataServices', function(viewDataServices){
    		return viewDataServices.requestData('cloudBuy_tabList').then(function(data){
    		 		var home = {
                        name: '首页',
                        id: 0
                    };
                    data.unshift(home);
    		 		return data;
    		});
    	}],
    	oDataList: ['viewDataServices', function(viewDataServices){
    		var params = {
    			categoryId: 0,
    			page: 1,
    			pageSize: 10,
    		}
    		return viewDataServices.requestData('cloudBuy_list',params).then(function(data){
    		 		return data;
    		});
    	}],
        oLottery: ['viewDataServices', function(viewDataServices){
            var params = {
                page: 1,
                pageSize: 6,
            }
            return viewDataServices.requestData('activity_inLotteryList',params).then(function(data){
                    return data;
            });
        }],
        oNotice: ['$cookies', 'noticeModel', function($cookies, noticeModel){
            if($cookies.getObject('token')){
                var sessionId = $cookies.getObject('token').sessionId;
                var params = {
                    sessionId: sessionId,
                };
                return noticeModel.notice_getNoticeCount(params).then(function(data){
                    if(!data.error){
                        return data.result;
                    }else{
                        return null;
                    }
                })
            }else{
                return null;
            }
        }],
        oActivityNotice: ['$cookies', 'noticeModel', function($cookies, noticeModel){
            if($cookies.getObject('token')){
                var sessionId = $cookies.getObject('token').sessionId;
                var params = {
                    sessionId: sessionId,
                };
                return noticeModel.notice_getActivityCount(params).then(function(data){
                    if(!data.error){
                        return data.result;
                    }else{
                        return null;
                    }
                });
            }else{
                return null;
            }
        }],
    },
    controller: 'CloudBuyIndexCtrl',
    controllerAs:'vm',
}




