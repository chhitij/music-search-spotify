(function() {
   angular.module('app').directive('audioPlayer', [function (){
    return {
      scope: {src: '@'},
      templateUrl: 'public/templates/audio_player.html',
      link: function (scope, ele, attrs) {
        angular.element(ele)[0].querySelector('audio').onplay = function() {
          var el = this;
          document.querySelectorAll('audio').forEach(function(audioElement) {
            if (audioElement != el) {
               audioElement.pause();
            }
          });
        };
      }
    };

  }]);
})();
