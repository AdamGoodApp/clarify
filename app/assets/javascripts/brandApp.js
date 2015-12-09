var brandApp = angular.module('brandApp', ['ngResource', 'ngRoute']);

brandApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:id', {
    templateUrl: 'angular/index.html',
    controller: 'brandController'
  }).when('/', {
    templateUrl: 'angular/index.html',
    controller: 'brandController'
  });

}]);

brandApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);