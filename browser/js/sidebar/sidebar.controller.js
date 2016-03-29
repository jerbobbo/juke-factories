juke.controller('SidebarCtrl', function($scope, $rootScope) {
	$scope.viewAlbums = function() {
		$rootScope.$broadcast('viewAlbums');
	};
});