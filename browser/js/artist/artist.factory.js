juke.factory('ArtistFactory', function ($http, $q){
  var artistObj = {};

  artistObj.fetchAll = function(){
    return $http.get('/api/artists/')
    .then(function (res) { return res.data; });
  };

  artistObj.fetchById = function(id){
    return $q.all([$http.get('/api/artists/' + id), $http.get('/api/artists/' + id + '/albums'), $http.get('/api/artists/' + id + '/songs')])
            .then(function (arr) {
              var artist = arr[0].data;
              artist.albums = arr[1].data;
              artist.songs = arr[2].data;
              return artist;
            });
  };

  return artistObj;
});