(function() {
  angular.module('app').controller('HomeCtrl', ['SpotifyService', '$sce', HomeCtrl]);

  var MIN_PREFIX_LENGTH = 2;


  /**
   * HomeCtrl controller for home page
   */
  function HomeCtrl(SpotifyService, $sce) {
    this.currentPageNumber_ = 0;
    this.spotifyService_ = SpotifyService;
    this.sce_ = $sce;
    this.searchString = '';
    this.results = [];
    this.albumTrackList = [];
    this.selectedItem = null;
  }


  /**
   * getSongs function for getting the all medaiList
   */
  HomeCtrl.prototype.getSongs = function(isLoadMore) {
    if (this.searchString.length > MIN_PREFIX_LENGTH) {
      this.spotifyService_.search(this.searchString, this.currentPageNumber_)
          .then(function(response) {
            if (!isLoadMore) {
              this.results = [];
            }
            var data = response.data;
            this.results = this.results.concat(data.albums.items);
            this.results = this.results.concat(data.artists.items);
          }.bind(this));
    }
  };


  /**
   * loadMore function is for  pagination of track
   */
  HomeCtrl.prototype.loadMore = function() {
    this.currentPageNumber_++;
    this.getSongs(true);
  };


  /**
   * trackType function is for  getting the songs list,
   * based on trackType eg. Album, Artist
   */
  HomeCtrl.prototype.trackType = function(trackType) {
    this.selectedItem = trackType;
    this.trackTypeList = [];
    var showTrack = angular.element(document.querySelector('.track-modal'));
    showTrack[0].style.display = 'block';
    if (trackType.type=='album') {
        this.spotifyService_.fetchTracksOfAlbum(trackType.id)
          .then(function(response) {
            this.albumTrackList = response.data.items;
          }.bind(this));
    } else if(trackType.type=='artist') {
       this.spotifyService_.fetchAlbumsOfArtist(trackType.id)
          .then(function(response) {
             this.albumTrackList = response.data.items;
          }.bind(this));
    }
  };


  /**
   * closeModel function close the trackModel
   */
  HomeCtrl.prototype.closeModel = function(trackType) {
    var close = angular.element(document.querySelector('.track-modal'));
    close[0].style.display = 'none';
  }


  /**
   * Sanitizes url.
   */
  HomeCtrl.prototype.getSanitizedUrl = function(url) {
    return this.sce_.trustAsResourceUrl(url);
  };

})();
