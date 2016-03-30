'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var playerObj = {};
  var songList;

  audio.addEventListener('ended', function () {
    playerObj.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    $rootScope.progress = 100 * playerObj.getProgress();
    // $scope.$digest(); // re-computes current template only (this scope)
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });

  playerObj.start = function(song, songArray){
  	
    playerObj.pause();
    currentSong = song;
    songList = songArray;

    var nextSong = songList[songList.indexOf(currentSong) + 1] || songList[0];
    
    if(!(song.audio)){
      song.audio = document.createElement('audio');
      song.audio.src = song.audioUrl;
      song.audio.load();
    }
    if(!(nextSong.audio)){
      nextSong.audio = document.createElement('audio');
      nextSong.audio.src = nextSong.audioUrl;
      nextSong.audio.load();
    }

    audio = song.audio;
    audio.currentTime = 0;
  	audio.play();
	  playing = true;
	  
  };

  playerObj.pause = function(){
  	audio.pause();
  	playing = false;
  };

  playerObj.resume = function(){
  	audio.play();
  	playing = true;
  };

  playerObj.isPlaying = function(){
  	return playing;
  };

  playerObj.getCurrentSong = function(){
  	return currentSong;
  };

  playerObj.next = function(){
  	playerObj.start(songList[songList.indexOf(currentSong) + 1] || songList[0], songList);
  };

  playerObj.previous = function(){
  	playerObj.start(songList[songList.indexOf(currentSong) - 1] || songList[songList.length - 1], songList);
  };

  playerObj.getProgress = function(){
  	return audio.currentTime / audio.duration || 0;
  };

  playerObj.getAudioElem = function() {
  	return audio;
  };

  return playerObj;
});
