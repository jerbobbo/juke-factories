juke.controller('ArtistCtrl', function($scope, $rootScope, ArtistFactory, AlbumFactory, SongFactory, PlayerFactory){

	$scope.viewOneArtist = function(id){
		ArtistFactory.fetchById(id)
		.then(function(artist){
			$scope.artist = artist;
			AlbumFactory.addImageUrls(artist.albums);
			SongFactory.addUrls(artist.songs);
			$scope.showOne = true;
			$scope.showAll = false;
		});
	};

	$rootScope.$on('viewSwap', function(event, data){
		if(data.view == 'allArtists'){
			ArtistFactory.fetchAll()
			.then(function(artists){
				$scope.artists = artists;
				$scope.showAll = true;
				$scope.showOne = false;
			});
		}
		else{
			$scope.showAll = false;
			$scope.showOne = false;
		}
	});

	$scope.toggle = SongFactory.toggle;
	$scope.isPlaying = PlayerFactory.isPlaying;
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
 

});