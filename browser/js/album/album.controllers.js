'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (albums) {
    return AlbumFactory.fetchById(albums[3]._id); // temp: get one
  })
  .then(function (album) {

    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    $scope.album = album;

    return StatsFactory.totalTime(album);
  })
  .then(function(duration){
      $scope.album.totalDuration = duration;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound
  
    $scope.isPlaying = PlayerFactory.isPlaying;
    $scope.getCurrentSong = PlayerFactory.getCurrentSong;
    
  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    }
    else if (song === PlayerFactory.getCurrentSong()){
      PlayerFactory.resume();
    }
    else {
      PlayerFactory.start(song, $scope.album.songs);
    }

  };

});

juke.controller('AllAlbumsCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory) {
  AlbumFactory.fetchAll()
  .then(function(albums) {
    albums.forEach(function(album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
    });
    $scope.albums = albums;
  });
});


juke.factory('AlbumFactory', function ($http, $q){
  var albumObj = {};

  albumObj.fetchAll = function(){
    return $http.get('/api/albums/')
    .then(function (res) { return res.data; });
  };

  albumObj.fetchById = function(id){
    return $http.get('/api/albums/' + id)
    .then(function (res) { return res.data; });
  };

  return albumObj;
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
