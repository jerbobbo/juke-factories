'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var playerObj = {};
  var songList;

  playerObj.start = function(song, songArray){
  	playerObj.pause();
  	audio.src = song.audioUrl;
  	audio.load();
  	audio.play();
  	currentSong = song;
	  playing = true;
	  songList = songArray;
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
  }

  return playerObj;
});
