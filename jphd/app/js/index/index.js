'use strict';

require('./cloudBuy/index');
require('./user/index');
require('./goods/index');

angular.module('app', [
    //插件依赖
    // 'ionic'
    'ngCookies',
    'ui.router',

    //公共部分
    'template',
    'constants',
    'directives',
    'services',
    'factories',
    'models',
    'filters',

    //业务代码
    'cloudbuy',
    'user',
    'goods',
])

.config(function($urlRouterProvider) {

    $urlRouterProvider.when('','/index');
    // redirect
    // $urlRouterProvider.otherwise('/error/404');
})

.controller('AppCtrl', require('./ctrl'))

