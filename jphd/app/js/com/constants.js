'use strict';

angular.module('constants',[])
	.constant('Constants', {
		locales : require('./constants/locales'),
		settings : require('./constants/setting')
	})