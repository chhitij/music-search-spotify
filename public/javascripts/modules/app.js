var app = angular.module('app', ['ngRoute', 'ngResource', 'ngSanitize']);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'public/templates/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'ctrl',
      requiredUser: false
    })
    .otherwise({redirectTo:'/'});
}]);

app.run(['$rootScope', '$location', '$http', function($rootScope, $location, $http) {

  $rootScope.$on('$routeChangeStart', function(event, next, prev) {
  });
}]);
