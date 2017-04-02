(function() {
  angular.module('app').service('SpotifyService', ['$http', '$q', SpotifyService]);

  var SPOTIFY = {
    albumsOfArtistUrl: 'artists/{id}/albums',
    baseUrl: 'https://api.spotify.com/v1/',
    defaultLimit: 6,
    defaultType: 'album,artist', // 'album,artist,playlist,track'
    searchUrl: 'search',
    tracksOfAlbumUrl: 'albums/{id}/tracks',
  };



  /**
   * Spotify service exposes API for fetching albums, tracks and searching.
   */
  function SpotifyService($http, $q) {
    this.http_ = $http;
    this.q_ = $q;
  }


  /**
   *  Searches for albums and artist of user preference.
   */
  SpotifyService.prototype.search = function(query, offset, type) {
    offset = offset || 0;

    if (this.canceler) {
      this.canceler.resolve();
    }
    this.canceler = this.q_.defer();

    var url = SPOTIFY.baseUrl +
        SPOTIFY.searchUrl +
        '?q=' + query +
        '&type=' + (type || SPOTIFY.defaultType) +
        '&offset=' + (offset * SPOTIFY.defaultLimit) +
        '&limit=' + SPOTIFY.defaultLimit;
    return this.http_.get(url, {timeout: this.canceler.promise});
  };


  /**
   *  Fetches data from url.
   */
  SpotifyService.prototype.fetchItems = function(url) {
    return this.http_.get(url);
  };


 /**
   *  Fetches albums of an artist.
   */
  SpotifyService.prototype.fetchAlbumsOfArtist = function(artistId) {
    var url = SPOTIFY.baseUrl +SPOTIFY.albumsOfArtistUrl.replace('{id}', artistId);
    return this.fetchItems(url);
  };


 /**
   *  Fetches tracks of an album.
   */
  SpotifyService.prototype.fetchTracksOfAlbum = function(albumId) {
    var url = SPOTIFY.baseUrl +SPOTIFY.tracksOfAlbumUrl.replace('{id}', albumId);
    return this.fetchItems(url);
  };

})();
