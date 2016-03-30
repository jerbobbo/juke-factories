juke.factory('AlbumFactory', function ($http, $q){
  var albumObj = {};

  albumObj.addImageUrls = function(albums){
    albums.forEach(function(album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
    });
  };

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
