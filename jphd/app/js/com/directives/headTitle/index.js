module.exports = [function(){
	return {
		restrict: 'E',
		scope: {
			leftClick : '&',
			rightClick : '&',
		},
        templateUrl: 'com/directives/headTitle/tpl/index.html',
		link:function(scope, elem, attrs){

            scope.title = attrs.title
            scope.leftIcon = attrs.leftIcon? attrs.leftIcon: null;
            scope.rightIcon = attrs.rightIcon? attrs.rightIcon: null;

		}	
	}

}]