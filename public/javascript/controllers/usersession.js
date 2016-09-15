(function(){
  angular
    .module('userSession', [])
    .config(routeConfig)
    .controller('UserSessionController', UserSessionController)

  routeConfig.$inject = ['$routeProvider', '$locationProvider']



  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/dashboard/users/sessions', {
        templateUrl:'/views/dashboard/sessions/usersessions.html',
        controller:'UserSessionController',
        controllerAs:'userSession'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }

  function UserSessionController(){
    var vm = this;
    vm.greeting = "Hello bitches.";
  }
})()
