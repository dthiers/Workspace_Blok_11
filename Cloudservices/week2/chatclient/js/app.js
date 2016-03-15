// The start of our Angular App. Modules can be injected in the array (like ng-route)
var app = angular.module('app', ['ngRoute'])

  // This removes the templateCaching. During development this might get you into trouble
  .run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    })
  })

  // routeProvider.
  .config(function($routeProvider, $locationProvider) {
    console.log('test');
    $routeProvider
      .when('/', {
        templateUrl: 'partials/test.html',
        controller: 'testCtrl'
      })
      .when('/news', {
        templateUrl: 'partials/news.html',
        controller: 'newsCtrl',
        resolve: {
          newsItem: function(){
            // This way you can send certain values to a new controller
            return "This is a news item produced by the resolve";
          }
        }
      })
      .when('/room', {
        templateUrl: 'partials/chat-partial.html',
        controller: 'chatCtrl'
      })
      .when('/room/:roomId', {
        templateUrl: 'partials/room-partial.html',
        controller: 'roomCtrl',
        resolve: {
          room: function($routeParams){
            // TODO: promise
            return angular.fromJson($routeParams);
          }
        }
      })
      .when('/user', {
        templateUrl: 'partials/user-partial.html',
        controller: 'userCtrl'
      })
  })
