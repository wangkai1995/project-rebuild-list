'user strict';

module.exports = ['httpFactory',function(httpFactory){

	return {
		//获取未读通知
		notice_getNoticeCount: function(params){
			return httpFactory.request('notice_unreadedCount',params);
		},

		//获取未读活动数
		notice_getActivityCount:function(params){
			return httpFactory.request('notice_activityInviteUnreadedCount',params);
		}
	}

}]