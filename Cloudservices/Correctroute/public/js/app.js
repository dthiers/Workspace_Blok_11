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
        templateUrl: 'partials/api.html',
        controller: 'apiCtrl'
      })
      // .when('/news', {
      //   templateUrl: 'partials/news.html',
      //   controller: 'newsCtrl',
      //   resolve: {
      //     newsItem: function(){
      //       // This way you can send certain values to a new controller
      //       return "This is a news item produced by the resolve";
      //     }
      //   }
      // })
  })
