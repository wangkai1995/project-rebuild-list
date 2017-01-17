module.exports = [function(){
	return {
		restrict: 'E',
		scope: {
		},
        templateUrl: 'com/directives/footerTab/tpl/index.html',
		link:function(scope, elem, attrs){

			function init(){
				scope.type = 0;
				switch(attrs.type){
					case 'home' : scope.type = 0; break;
					case 'activity' : scope.type = 1; break;
					case 'friends' : scope.type = 2; break;
					case 'mine' : scope.type = 3; break;
					default : scope.type = 0; 
				}
			}

			init();

		}	
	}

}]