'use strict';

angular.module('models', ['factories'])
    .factory('activityModel', require('./models/activity'))
    .factory('cloudBuyModel', require('./models/cloudBuy'))
    .factory('noticeModel',require('./models/notice'))
    // .factory('friend', require('./models/friend'))
    .factory('goodsModel', require('./models/goods'))
    .factory('userModel', require('./models/user'))