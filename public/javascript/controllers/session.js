(function(){
  angular
    .module('session', ['Sessions', 'Users'])
    .config(routeConfig)
    .controller('SessionController', SessionController);

  routeConfig.$inject = ['$routeProvider', '$locationProvider']
  SessionController.$inject = ['Sessions', '$routeParams', 'Users'];

  function routeConfig($routeProvider, $locationProvider){
    $routeProvider
      .when('/dashboard/session/:session_id', {
        templateUrl:'/views/dashboard/sessions/show.html',
        controller:'SessionController',
        controllerAs:'session'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }

  function SessionController(Sessions, $routeParams, Users){
    var vm = this;
    vm.getUser = Users.getUser;
    Sessions
      .getSession($routeParams.session_id)
      .then( session => {
        vm.info = session.data;
      })
  }
})();
