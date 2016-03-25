'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  var audio = PlayerFactory.getAudioElem();
 audio.addEventListener('ended', function () {
    $scope.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    $scope.progress = 100 * PlayerFactory.getProgress();
    // $scope.$digest(); // re-computes current template only (this scope)
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });

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
