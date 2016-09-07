(function(){
  angular
    .module('session', [])
    .config(routeConfig)
    .controller('SessionController', SessionController);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig($routeProvider, $locationProvider){
    $routeConfig
      .when('/dashboard/session/:session_id'){
        templateUrl:'/views/dashboard/session/show.html',
        controller:'SessionController',
        controllerAs:'session'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    })
  }
})();
