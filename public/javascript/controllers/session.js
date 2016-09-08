(function(){
  angular
    .module('session', [])
    .config(routeConfig)
    .controller('SessionController', SessionController);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];
  SessionController.$inject = ['Sessions'];

  function routeConfig($routeProvider, $locationProvider){
    $routeProvider
      .when('/dashboard/sessions', {
        templateUrl:'/views/dashboard/sessions/show.html',
        controller:'SessionController',
        controllerAs:'session'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    })
  }

  function SessionController(Sessions){
    var vm = this;

  }
})();
