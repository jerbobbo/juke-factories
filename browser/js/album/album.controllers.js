'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory, SongFactory) {

  // load our initial data
  function showOneAlbum(id) {
      AlbumFactory.fetchAll()
    .then(function (albums) {
      return AlbumFactory.fetchById(id); // temp: get one
    })
    .then(function (album) {

      album.imageUrl = '/api/albums/' + album._id + '.image';
      SongFactory.addUrls(album.songs);
      $scope.album = album;

      return StatsFactory.totalTime(album);
    })
    .then(function(duration){
        $scope.album.totalDuration = duration;
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound
  }
  
  
  $scope.isPlaying = PlayerFactory.isPlaying;
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.viewState = false;

  $rootScope.$on('viewSwap', function(event, data) {
    if(data.view == "oneAlbum"){
      showOneAlbum(data.albumId);
      $scope.viewState = true;
    }
    else{
      $scope.viewState = false;
    }
    
  });
    
  // // main toggle
  // $scope.toggle = function (song) {
  //   if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
  //     PlayerFactory.pause();
  //   }
  //   else if (song === PlayerFactory.getCurrentSong()){
  //     PlayerFactory.resume();
  //   }
  //   else {
  //     PlayerFactory.start(song, $scope.album.songs);
  //   }
  // };

$scope.toggle = SongFactory.toggle;

});

juke.controller('AllAlbumsCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory) {
  AlbumFactory.fetchAll()
  .then(function(albums) {
    AlbumFactory.addImageUrls(albums);

    $scope.albums = albums;

    $rootScope.$on('viewSwap', function(event, data) {
      $scope.viewState = (data.view == "allAlbums");
    });

    $scope.showOneAlbum = function(id) {
      $rootScope.$broadcast('viewSwap', { view: 'oneAlbum', albumId: id });
      $scope.viewState = false;
    };

    $scope.viewState = false;
    
  });



});

juke.factory('StatsFactory', function ($q) {
    var statsObj = {};
    statsObj.totalTime = function (album) {
        var audio = document.createElement('audio');
        return $q(function (resolve, reject) {
            var sum = 0;
            var n = 0;
            function resolveOrRecur () {
                if (n >= album.songs.length) resolve(sum);
                else audio.src = album.songs[n++].audioUrl;
            }
            audio.addEventListener('loadedmetadata', function () {
                sum += audio.duration;
                resolveOrRecur();
            });
            resolveOrRecur();
        });
    };
    return statsObj;
});
