'use strict';

angular.module('user', [])

.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('/user','/user/index');
    $stateProvider
    .state('user', {
            url: '/user',
            templateUrl: 'index/layout.html'
        })
    .state('user.index', require('./index/route'))
    .state('user.login',require('./login/route'))
})

//UserIndex controller
.controller('UserIndexCtrl', require('./index/ctrl'))

//UserLogin controller
.controller('UserLoginCtrl',require('./login/ctrl'))



