'user strice'

angular.module('services',[])
	.service('viewDataServices',require('./services/viewData'))
	.service('shadeServices',require('./services/shade'))
	.service('tonkenServices',require('./services/token'))