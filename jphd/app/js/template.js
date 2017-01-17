(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/layout.html',
    '<div ui-view></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('com/services/shade/index.html',
    '\n' +
    '<div class="shader-container">\n' +
    '	 <div class="shade-title" ng-if="shade.config.title">\n' +
    '	 	{{shade.config.title}}\n' +
    '	 </div>\n' +
    '<div class="shade-content" ng-class="{\'alone-content\':!shade.config.title}">\n' +
    '	 		<span>{{shade.config.content}}</span>\n' +
    '	 </div>\n' +
    '	 <div class="shade-button">\n' +
    '	 	<button ng-class="{\'alone\': shade.config.button.length === 1 }" ng-repeat="button in shade.config.button" ng-click="button.callback()">\n' +
    '	 		{{button.text}}\n' +
    '	 	</button>\n' +
    '	 </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('com/directives/footerTab/tpl/index.html',
    '\n' +
    '\n' +
    '<div class="footer-tab-container">\n' +
    '	<a ui-sref="cloudbuy.index" ng-class="{\'active\':type === 0}">\n' +
    '		<i class="cicon bar-home" ng-if="type !== 0"></i>\n' +
    '		<i class="cicon bar-home-on" ng-if="type === 0"></i>\n' +
    '		<span>首页</span>\n' +
    '	</a>\n' +
    '	<a href="javascript:void(0);" ng-class="{\'active\':type === 1}">\n' +
    '		<i class="cicon bar-activity" ng-if="type !== 1"></i>\n' +
    '		<i class="cicon bar-activity-on" ng-if="type === 1"></i>\n' +
    '		<span>活动</span>\n' +
    '	</a>\n' +
    '	<a href="javascript:void(0);" ng-class="{\'active\':type === 2}">\n' +
    '		<i class="cicon bar-friends" ng-if="type !== 2"></i>\n' +
    '		<i class="cicon bar-friends-on" ng-if="type === 2"></i>\n' +
    '		<span>好友</span>\n' +
    '	</a>\n' +
    '	<a ui-sref="user.index" ng-class="{\'active\':type === 3}">\n' +
    '		<i class="cicon bar-mine" ng-if="type !== 3"></i>\n' +
    '		<i class="cicon bar-mine-on" ng-if="type === 3"></i>\n' +
    '		<span>我的</span>\n' +
    '	</a>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('com/directives/headTitle/tpl/index.html',
    '\n' +
    '\n' +
    '<div class="head-title-container">\n' +
    '	<div ng-if="leftIcon" class="left" ng-click="leftClick()"><i class="cicon {{leftIcon}}"></i></div>\n' +
    '	<div class="title"><span>{{title}}</span></div>\n' +
    '	<div ng-if="rightIcon" class="right" ng-click="rightClick()"><i class="cicon {{rightIcon}}"></i></div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/cloudBuy/detaill/tpl/index.html',
    ' <div class="cloudbuy-index-head">\n' +
    '		<head-title title="活动详情" left-icon="go-back" left-click="vm.goBack()">\n' +
    '		</head-title>\n' +
    '  </div>\n' +
    '\n' +
    '\n' +
    ' <div class="war-container-infooter cloudbuy-detail-container bgGrey">\n' +
    ' 		<swipe-scroll refresh="vm.doRefresh()">\n' +
    ' 			<div class="cloudbuy-goods-img">\n' +
    ' 				<a href="javascript:">\n' +
    ' 					<img ng-src="{{vm.detail.goodsCover}}" alt="goods-img">\n' +
    ' 				</a>\n' +
    ' 			</div>\n' +
    '			<!--状态-->\n' +
    ' 			<div class="cloudbuy-goods-title">\n' +
    ' 				<em ng-if="vm.detail.status === 0" class="fl color4">未开始</em>\n' +
    '	            <em ng-if="vm.detail.status === 1" class="fl color3">进行中</em>\n' +
    '	            <em ng-if="vm.detail.status === 2" class="fl color3">待揭晓</em>\n' +
    '	            <em ng-if="vm.detail.status === 3" class="fl color2">已开奖</em>\n' +
    '	            <em ng-if="vm.detail.status === 4" class="fl color2">已失效</em>\n' +
    '	            <span>{{::vm.detail.goodsTitle}}</span>\n' +
    '	            <i class="cicon fr icon-right-arrows"></i>\n' +
    ' 			</div>\n' +
    '			<!--进度条-->\n' +
    ' 			<div class="cloidbuy-progress-container" ng-if="vm.detail.status !== 0">\n' +
    '				<div class="cloidbuy-progress progress">\n' +
    '					<div class="index-process-in" ng-style="{width: (vm.detail.totalParts - vm.detail.remainParts)/vm.detail.totalParts*100 + \'%\'}"></div>\n' +
    '				</div>\n' +
    '				<p>\n' +
    '					<span class="fr">活动号：{{vm.detail.activityId}}</span>\n' +
    '					<span class="fl">总需：{{vm.detail.totalParts}}份</span>\n' +
    '					<span class="ml15">剩余：{{vm.detail.remainParts}}份</span>\n' +
    '				</p>\n' +
    ' 			</div>\n' +
    ' 			<!--开奖和购买信息-->\n' +
    ' 			<div ng-if="vm.detail.status === 1 && vm.detail.buyParts === 0" class="lottery-lose">	\n' +
    ' 				想要这样的好运气？快来参与夺宝吧！\n' +
    ' 			</div>\n' +
    '            <div ng-if="vm.detail.status === 3 && vm.detail.buyParts === 0" class="lottery-lose">\n' +
    '            	您错过了本期夺宝，快去参加最新一期吧！\n' +
    '        	</div>\n' +
    '            <div ng-if="vm.detail.status === 2" class="lottery-count-down">\n' +
    '                <div>\n' +
    '                    <!-- 开奖倒计时:<span>{{time.hours}}:{{time.minutes}}:{{time.seconds}}</span> -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="lottery-calculation-view" ng-if="vm.detail.status === 2">\n' +
    '            	<a>\n' +
    '            		查看计算详情 \n' +
    '            		<span class="cicon icon-right-arrows-red"></span>\n' +
    '        		</a>\n' +
    '    		</div>\n' +
    '    		<!--获奖者-->\n' +
    '	        <div class="cloudbuy-winning" ng-if="vm.detail.status == \'3\'">\n' +
    '	            <div class="clearfix">\n' +
    '	                <div class="col-25 fl">\n' +
    '	                    <img ng-src="{{vm.tmp.avatar}}" class="img-responsive rn-img rn-activitydetail-img2">\n' +
    '	                </div>\n' +
    '	                <div class="col-75 fl">\n' +
    '	                    <p>获奖者：<span>{{::vm.tmp.name}}</span></p>\n' +
    '	                    <p>购买份数：<span>{{::vm.tmp.buyParts}}份</span></p>\n' +
    '	                    <p>开奖时间：<span>{{::vm.winTime}}</span></p>\n' +
    '	                </div>\n' +
    '	                <span class="rn-activitydetail-img3 cicon sign-prize"><span>\n' +
    '	            </span></div>\n' +
    '	            <div class="rn-ad-div4 clearfix">\n' +
    '	                <div class="col-60 fl">\n' +
    '	                    <p>幸运号码：<em>{{::vm.tmp.winNumber}}</em></p>\n' +
    '	                </div>\n' +
    '	                <div class="col-40 fr">\n' +
    '	                    <a class="rn-a" href="#calculationDetails/{{vm.activityId}}/1">计算详情</a>\n' +
    '	                </div>\n' +
    '	            </div>\n' +
    '	        </div>\n' +
    '	        <!--本期购买-->\n' +
    '	        <div class="lottery-being" ng-if="vm.detail.status === 2 && vm.detail.buyParts !== null">\n' +
    '	            <div class="tabs-text" ng-if="vm.detail.buyParts === 0">\n' +
    '	            	您错过了本期夺宝，快去参加最新一期吧！\n' +
    '            	</div>\n' +
    '	            <div ng-if="vm.detail.buyParts > 0">\n' +
    '	            	本期已购买{{vm.detail.buyParts}}份，查看号码 <span class="cicon icon-right-arrows"></span>\n' +
    '	            </div>\n' +
    '	        </div>\n' +
    '	        <div class="lottery-being" ng-if="vm.detail.status === 1 && vm.detail.buyParts !== null && vm.detail.buyParts > 0">\n' +
    '	            <div ng-if="vm.detail.buyParts > 0">\n' +
    '	            	本期已购买{{vm.detail.buyParts}}份，查看号码 <span class="cicon icon-right-arrows"></span>\n' +
    '            	</div>\n' +
    '	        </div>\n' +
    '	        <div class="lottery-being" ng-if="vm.detail.status === 3 && vm.detail.buyParts !== null && vm.detail.buyParts > 0">\n' +
    '	            <div ng-if="vm.detail.buyParts > 0">\n' +
    '	            	本期已购买{{vm.detail.buyParts}}份，查看号码 <span class="cicon icon-right-arrows"></span>\n' +
    '            	</div>\n' +
    '	        </div>\n' +
    '\n' +
    ' 			<!--往期揭晓-->\n' +
    ' 			<div class="cloudbuy-detail-record">\n' +
    ' 				<a ui-sref="goods.participate({activityId:vm.activityId})">\n' +
    ' 					本期所有参与记录<i class="cicon fr icon-right-arrows"></i>\n' +
    '				</a>\n' +
    ' 				<a ui-sref="goods.towards({goodsId:vm.detail.goodsId})">\n' +
    ' 					往期揭晓<i class="cicon fr icon-right-arrows">\n' +
    ' 				</i></a>\n' +
    ' 			</div>\n' +
    ' 		</swipe-scroll>\n' +
    ' </div>\n' +
    '\n' +
    '\n' +
    ' <div class="war-footer">	\n' +
    '	<div class="cloudbuy-footer-tab" ng-if="vm.detail.status == \'0\'|| vm.detail.status ==\'1\' || vm.detail.status ==\'4\'">\n' +
    '        <a class="tab-item" ng-if="vm.detail.status == \'0\' || vm.detail.status ==\'1\'">\n' +
    '            <span class="icon invite-on cicon"></span>\n' +
    '            <p>邀请好友</p>\n' +
    '        </a>\n' +
    '        <a class="tab-item" ng-if="vm.detail.status == \'4\' || vm.detail.status == \'3\' || vm.detail.status == \'2\'">\n' +
    '            <span class="icon icon-invite cicon"></span>\n' +
    '            <p>邀请好友</p>\n' +
    '        </a>\n' +
    '        <a class="tab-item" ng-if="vm.detail.status == \'0\' || vm.detail.status ==\'1\'">\n' +
    '            <span class="cicon share-on"></span>\n' +
    '            <p style="right: 30px">分享</p>\n' +
    '        </a>\n' +
    '        <a class="tab-item" ng-if="vm.detail.status == \'4\' || vm.detail.status == \'3\' || vm.detail.status == \'2\'">\n' +
    '            <span class="cicon icon-share"></span>\n' +
    '            <p style="right: 30px">分享</p>\n' +
    '        </a>\n' +
    '        <a class="tab-item"></a>\n' +
    '        <a class="tab-item"></a>\n' +
    '    </div>\n' +
    '    <div class="rn-activitydetail-button" ng-if="vm.detail.status == \'0\' || vm.detail.status ==\'4\'">\n' +
    '        <button>购买</button>\n' +
    '    </div>\n' +
    '    <div class="cloudbuy-footer-button" ng-if="vm.detail.status ==\'1\'">\n' +
    '        <button class="cloudbuy-footer-button-ed">购买</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="tabs cloudbuy-footer-tab" ng-if="vm.detail.status ==\'2\' || vm.detail.status ==\'3\'">\n' +
    '        <div class="tabs-text tab-item">新一期火爆进行中...</div>\n' +
    '    </div>\n' +
    '    <div class="cloudbuy-footer-button" ng-if="vm.detail.status ==\'2\' || vm.detail.status ==\'3\'">\n' +
    '        <button class="cloudbuy-footer-button-ed">立即参与</button>\n' +
    '    </div>\n' +
    ' </div>\n' +
    '\n' +
    '	\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/cloudBuy/index/tpl/index.html',
    '  \n' +
    '  <div class="cloudbuy-index-head">\n' +
    '  		<div class="head-title-container">\n' +
    '			<div class="title"><span>精品活动</span></div>\n' +
    '			<div class="right" ng-click="vm.goNotice()">\n' +
    '				<i ng-if="vm.notice > 0" class="notice-active">&bull;</i>\n' +
    '				<i class="cicon go-notice"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="cloudbuy-tab-list swipe-war">\n' +
    '	  	<div class="swipe-container">\n' +
    '	  		<div class="swipe-item tab-list-item" ng-click="vm.tabChange(item)" ng-repeat="item in vm.tabList">\n' +
    '	  		 	 <div ng-class="{\'active\':item.id === vm.activeList.id}">{{item.name}}</div>\n' +
    '	  		 </div>\n' +
    '	  	</div>\n' +
    '  </div>	\n' +
    ' \n' +
    '\n' +
    ' <div class="cloudbuy-index-container bgGrey">\n' +
    ' 		<swipe-scroll refresh="vm.doRefresh()" loadmore="vm.loadMore()" ismore="vm.isMore">	\n' +
    '			<!--精选分类-->\n' +
    '	 		<div ng-if="vm.activeList.id === 0">\n' +
    '				<div class="index-banner">\n' +
    '		 			<a href="javascript:">\n' +
    '		 				<img src="img/banner.png" alt="banner-img">\n' +
    '		 			</a>\n' +
    '				</div>\n' +
    '				<div class="index-menu">\n' +
    '					<a href="javascript:">\n' +
    '						<i class="cicon icon-menu-mainactivitf"></i>\n' +
    '						<h3>私人订制</h3>\n' +
    '					</a>\n' +
    '					<a href="javascript:">\n' +
    '						<i class="cicon icon-menu-redpacket"></i>\n' +
    '						<h3>幸运红包</h3>\n' +
    '					</a>\n' +
    '					<a href="javascript:">\n' +
    '						<i class="cicon icon-menu-comingsoon"></i>\n' +
    '						<h3>即将揭晓</h3>\n' +
    '					</a>\n' +
    '					<a href="javascript:">\n' +
    '						<i class="cicon icon-menu-invite"></i>\n' +
    '						<h3>活动邀请</h3>\n' +
    '					</a>\n' +
    '				</div>\n' +
    '				<div class="index-lottery">\n' +
    '					<div class="lottery-head">\n' +
    '						<p>\n' +
    '							<span>即将揭晓</span>\n' +
    '							<a href="javascript:">查看更多<i class="cicon icon-go-right"></i></a>\n' +
    '						</p>\n' +
    '					</div>\n' +
    '					<div class="lottery-list swipe-war">\n' +
    '						<div class="swipe-container">\n' +
    '								<div class="swipe-item lottery-list-item" ng-repeat=" item in vm.LotteryList.objects">\n' +
    '									<div class="lottery-item">\n' +
    '										<img src="{{item.goodsCover}}" alt="">\n' +
    '										<p>{{item.goodsTitle}}</p>\n' +
    '										<div>\n' +
    '											<center><em>还没做</em></center>\n' +
    '										</div>\n' +
    '									</div>\n' +
    '								</div>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '				<div class="index-goods-item" ng-repeat="item in vm.DataList.objects" ng-click="vm.goCloundBuyDetail(item)">\n' +
    '					<div class="goods-img">\n' +
    '						<img ng-src="{{item.goodsCover}}" alt="goods">\n' +
    '					</div>\n' +
    '					<div class="goods-message">\n' +
    '						<div class="goods-name">\n' +
    '							<span>{{item.goodsTitle}}</span>\n' +
    '						</div>\n' +
    '						<div class="goods-footer">\n' +
    '							<div class="goods-progress mt0 fl">\n' +
    '								<p>进度揭晓<span>{{(item.totalParts - item.remainParts)/item.totalParts*100 | number: 0}}%</span></p>\n' +
    '								<div class="progress">\n' +
    '									<div class="index-process-in" ng-style="{width: (item.totalParts - item.remainParts)/item.totalParts*100 + \'%\'}"></div>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '							<div class="goods-pay fr">\n' +
    '								<a href="javascript">一元购<i class="cicon icon-pay-right"></i></a>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '	 		</div>\n' +
    '			\n' +
    '			<!--其他分类-->\n' +
    '	 		<div ng-if="vm.activeList.id !== 0">\n' +
    '	 			<ul class="category-list">\n' +
    '	 				<li ng-repeat="item in vm.DataList.objects">\n' +
    '	 					<div class="item-goods-img">\n' +
    '	 						<img ng-src="{{item.goodsCover}}" alt="goods-img" class="img-responsive">\n' +
    '	 					</div>\n' +
    '	 					<div class="cloudbuy-item-info">\n' +
    '	 						<div class="goods-name">\n' +
    '	 							<span>{{item.goodsTitle}}</span>\n' +
    '	 						</div>\n' +
    '	 						<div class="goods-footer">\n' +
    '	 							<div class="goods-progress">\n' +
    '	 								<div class="fl">进度揭晓</div>\n' +
    '	 								<div class="fr progress">\n' +
    '										<div class="index-process-in" ng-style="{width: (item.totalParts - item.remainParts)/item.totalParts*100 + \'%\'}"></div>\n' +
    '										<span class="progress-text">\n' +
    '											{{(item.totalParts - item.remainParts)/item.totalParts*100 | number: 0}}%\n' +
    '										</span>\n' +
    '									</div>\n' +
    '	 							</div>\n' +
    '	 							<div class="goods-pay">\n' +
    '	 								<a href="javascript:">一元购</a>\n' +
    '	 							</div>\n' +
    '	 						</div>\n' +
    '	 					</div>\n' +
    '	 				</li>\n' +
    '	 			</ul>\n' +
    '	 		</div>\n' +
    '	 		\n' +
    '			<div class="text-center mt10 mb10" ng-if="!vm.isMore || vm.DataList.objects.length === 0">\n' +
    '            	暂无更多商品\n' +
    '     		</div>\n' +
    '     	</swipe-scroll>	\n' +
    '	 </div>\n' +
    ' \n' +
    '\n' +
    ' <div class="cloudbuy-index-footer">\n' +
    ' 		<footer-tab type="home"></footer-tab>\n' +
    ' </div>');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/goods/participate/tpl/index.html',
    ' <div class="war-header">\n' +
    '		<head-title title="本期所有参与记录" left-icon="go-back" left-click="vm.goBack()" right-icon="go-home" right-click="vm.goHome()">\n' +
    '		</head-title>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="war-container bgGrey">\n' +
    '  		<swipe-scroll refresh="vm.doRefresh()" loadmore="vm.loadMore()" ismore="vm.isMore">	\n' +
    '  			 <div class="clearfix pt15">\n' +
    '  			 	<div class="cloudbuy-participate-item bgWhite" ng-repeat="(key, item) in vm.buyList">\n' +
    '  			 		<div class="clearfix bgWhite">\n' +
    '  			 			<div class="col-20 fl pt15 item-portrait">\n' +
    '  			 				<img ng-if="item.avatar" ng-src="{{item.avatar}}" alt="user-portrait">\n' +
    '  			 				<img ng-if="!item.avatar" src="../img/default-people-small.PNG" alt="user-portrait">\n' +
    '  			 			</div>\n' +
    '						<div class="col-80 fl item-container">\n' +
    '							<div class="col-70 message fl">\n' +
    '								<span>\n' +
    '									{{::item.name}}<strong>购买了{{::item.buyParts}}份</strong>\n' +
    '								</span>\n' +
    '								<span>{{::item.buyTime | date : \'yyyy-MM-dd HH:mm:ss\' }}</span>\n' +
    '							</div>\n' +
    '							<div class="col-30 luck-number fl">\n' +
    '								<a class="" href="javascipte:">幸运号码</a>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '  			 		</div>\n' +
    '  			 	</div>\n' +
    '  			 </div>\n' +
    '  		</swipe-scroll>\n' +
    '  </div>\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/goods/towards/tpl/index.html',
    ' <div class="war-header">\n' +
    '		<head-title title="往期中奖记录" left-icon="go-back" left-click="vm.goBack()">\n' +
    '		</head-title>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="war-container bgGrey">\n' +
    '  		<swipe-scroll refresh="vm.doRefresh()" loadmore="vm.loadMore()" ismore="vm.isMore">	\n' +
    '  			 <ul class="toward-list pt15">\n' +
    '             <li ng-repeat="(key, item) in vm.buyList">\n' +
    '                 <a ui-sref="cloudbuy.detaill({activityId:item.activityId})">\n' +
    '                    <div class="toward-item-head">\n' +
    '                        <div class="fl">活动号:{{::item.activityId}}</div>\n' +
    '                        <div class="fr">{{::item.lotteryTime| date:\'yyyy-MM-dd HH:MM:ss\'}}揭晓</div>\n' +
    '                    </div>\n' +
    '                    <div class="toward-item-cont">\n' +
    '                        <i class="cicon icon-winning"></i>\n' +
    '                        <div class="toward-img">\n' +
    '                            <img ng-if="item.winnerCover" ng-src="{{item.winnerCover}}" alt="user-portrait">\n' +
    '                              <img ng-if="!item.winnerCover" src="../img/default-people-small.PNG" alt="user-portrait">\n' +
    '                        </div>\n' +
    '                        <div class="toward-info">\n' +
    '                           <p>\n' +
    '                              <span>获奖者:</span>{{::item.winnerName}}\n' +
    '                           </p>\n' +
    '                           <p>\n' +
    '                              <span>购买份数:</span>{{::item.buyParts}}\n' +
    '                           </p>\n' +
    '                           <p>\n' +
    '                              <span>幸运号码:</span>{{::item.prizeNumber}}\n' +
    '                           </p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                 </a>\n' +
    '             </li>\n' +
    '         </ul>\n' +
    '  		</swipe-scroll>\n' +
    '  </div>\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/user/index/tpl/index.html',
    '<div class="war-header">\n' +
    '	<head-title title="我的"></head-title>\n' +
    '</div>\n' +
    '\n' +
    '<div class="war-container-infooter bgGrey">\n' +
    '	<swipe-scroll>\n' +
    '		<!--用户头像-->\n' +
    '		<div class="user-index-banner clearfix">\n' +
    '			<img ng-if="vm.userInfo" ng-src="{{vm.userInfo.avatar}}" alt="user-avatar">\n' +
    '			<p ng-fi="vm.userInfo">{{::vm.userInfo.name}}</p>\n' +
    '			<img ng-if="!vm.userInfo" ng-click="vm.goLogin()" src="../img/default-people-small.PNG" alt="user-defulat">\n' +
    '			<p ng-if="!vm.userInfo" ng-click="vm.goLogin()">请登录</p>\n' +
    '		</div>\n' +
    '		<!--列表-->\n' +
    '		<div class="user-list-first bgWhite clearfix">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon remain-icon"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">余额</p>\n' +
    '				<p class="item-icon fr" ng-if="!vm.userInfo">无</p>\n' +
    '				<p class="item-icon fr" ng-if="vm.userInfo">&yen;&nbsp;{{::vm.userInfo.money}}</p>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix mt15">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon list-record"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">购买记录</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon my-prize"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">中奖记录</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon voucher-icon"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">代金券</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon icon-invitation"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">邀请有奖</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon redPocket"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">我的红包</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon icon-intowechat"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">微信提现</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix mt15">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon rn-set"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">设置</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="user-list bgWhite clearfix">\n' +
    '			<div class="fl">\n' +
    '				<i class="user-list-icon cicon my-service"></i>\n' +
    '			</div>\n' +
    '			<div class="fl user-list-item">\n' +
    '				<p class="item-name fl">客服中心</p>\n' +
    '				<i class="item-icon fr item-icon-i cicon go-to"></i>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</swipe-scroll>	\n' +
    '</div>\n' +
    '\n' +
    '<div class="war-footer">\n' +
    '	<footer-tab type="mine"></footer-tab>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/user/login/tpl/index.html',
    '<div class="war-header">\n' +
    '	<head-title title="请登录" left-icon="go-back" left-click="vm.goBack()">\n' +
    '	</head-title>\n' +
    '</div>\n' +
    '\n' +
    '<div class="war-container bgGrey">\n' +
    '	<form name="loginForm" novalidate="novalidate" autocomplete="off">\n' +
    '		<div class="user-login-input clearfix bgWhite mt15">\n' +
    '			<div class="user-mobile-container clearfix">\n' +
    '				<div class="mobile">\n' +
    '					<input type="text" name="mobile" required ng-pattern="/^1[3|4|5|7|8]\\d{9}$/" placeholder="手机号码" ng-model="vm.user.mobile">\n' +
    '				</div>\n' +
    '				<button ng-class="{\'active\':loginForm.mobile.$valid ,\'gary\': vm.countDown}" ng-disabled="!loginForm.mobile.$valid" class="verification-code" ng-click="vm.getVerification()">\n' +
    '					{{vm.verification}}\n' +
    '				</button>\n' +
    '			</div>\n' +
    '\n' +
    '			<div class="user-password-container clearfix">\n' +
    '				<input type="tel" name="password" required ng-pattern="/^\\d{4}$/" placeholder="输入验证码" ng-model="vm.user.password">\n' +
    '			</div>\n' +
    '		</div> \n' +
    '\n' +
    '		<div class="user-login-check clearfix">\n' +
    '			<div class="col-20 fl">\n' +
    '				<i ng-show="!vm.radioChecked" ng-click="vm.radioClick()" class="cicon icon-radio"></i>\n' +
    '				<i ng-show="vm.radioChecked" ng-click="vm.radioClick()" class="cicon icon-radio-ed"></i>\n' +
    '			</div>\n' +
    '			<div class="col-80 fl">\n' +
    '				<p>\n' +
    '					我已查看并同意\n' +
    '					<a href="javascipte:">精品活动使用条款</a>\n' +
    '				</p>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '\n' +
    '		<div class="user-login-submit clearfix">\n' +
    '			<button ng-class="{\'active\':loginForm.$valid && vm.radioChecked}" ng-disabled="!loginForm.$valid && vm.radioChecked" ng-click="vm.submitLogin()">\n' +
    '				完成\n' +
    '			</button>\n' +
    '		</div>\n' +
    '	</form>\n' +
    '</div>');
}]);
})();
