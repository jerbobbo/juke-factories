juke.factory('SongFactory', function(PlayerFactory) {
	var songObj = {};

	songObj.addUrls = function(songs) {
    songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
	};

  songObj.toggle = function (song, songList) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    }
    else if (song === PlayerFactory.getCurrentSong()){
      PlayerFactory.resume();
    }
    else {
      PlayerFactory.start(song, songList);
    }
  };

	return songObj;
});