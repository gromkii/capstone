(function(){
  angular
    .module('newSession', ['Sessions'])
    .config(routeConfig)
    .controller('NewSessionController', NewSessionController)

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];
  NewSessionController.$inject = ['Sessions'];


  function routeConfig($routeProvider, $locationProvider){
    $routeProvider
      .when('/dashboard/sessions/new', {
        templateUrl:'/views/dashboard/sessions/new.html',
        controller:'NewSessionController',
        controllerAs:'new'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }

  function NewSessionController(Sessions){
    var vm = this;

    vm.post = Sessions.newSession();

  }
})();
