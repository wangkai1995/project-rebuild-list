'use strict';

angular.module('goods', [])


.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('goods', {
            url: '/goods',
            templateUrl: 'index/layout.html'
        })
    .state('goods.participate',require('./participate/route'))
    .state('goods.towards',require('./towards/route'));
})


//GoodsParticipate controller
.controller('GoodsParticipateCtrl',require('./participate/ctrl'))

//GoodsTowards controller
.controller('GoodsTowardsCtrl',require('./towards/ctrl'))