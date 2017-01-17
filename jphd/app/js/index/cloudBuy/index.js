'use strict';

angular.module('cloudbuy', [])


.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('/index','/cloudbuy/index');
    $stateProvider
    .state('cloudbuy', {
            url: '/cloudbuy',
            templateUrl: 'index/layout.html'
        })
    .state('cloudbuy.index', require('./index/route'))
    .state('cloudbuy.detaill',require('./detaill/route'))
})

//CloudBuyIndex controller
.controller('CloudBuyIndexCtrl', require('./index/ctrl'))

//cloundBuyDetaill controller
.controller('CloudBuyDetaillCtrl',require('./detaill/ctrl'))


