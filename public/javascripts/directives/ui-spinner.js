(function() {
   angular.module('app').directive('uiSpinner', ['$http', '$rootScope' ,function ($http, $rootScope){
    return {
      link: function (scope, elm, attrs) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };

        scope.$watch(scope.isLoading, function(loading) {
          if(loading){
            angular.element(elm).removeClass('hidden');
          }else{
            angular.element(elm).addClass('hidden');
          }
        });
      }
    };

  }]);
})();
