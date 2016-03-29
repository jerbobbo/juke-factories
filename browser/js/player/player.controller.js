'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');

    $scope.isPlaying = PlayerFactory.isPlaying;
    $scope.getCurrentSong = PlayerFactory.getCurrentSong;
    console.log($scope.currentSong);

  // state
  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    }
    else {
      PlayerFactory.resume();
    }

  };


  // outgoing events (to Album… or potentially other characters)
  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.previous;

});
