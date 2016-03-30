juke.controller('SidebarCtrl', function($scope, $rootScope) {
	$scope.viewAlbums = function() {
		$rootScope.$broadcast('viewSwap', {view: 'allAlbums'});
	};

	$scope.viewAllArtists = function(){
		$rootScope.$broadcast('viewSwap', {view: 'allArtists'});
	};
});