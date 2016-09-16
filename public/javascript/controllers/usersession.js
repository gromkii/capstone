(function(){
  angular
    .module('userSession', ['Sessions'])
    .config(routeConfig)
    .controller('UserSessionController', UserSessionController)

  routeConfig.$inject = ['$routeProvider', '$locationProvider']
  UserSessionController.$inject = ['$http', 'Sessions']


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

  function UserSessionController($http, Sessions){
    var vm = this;
    vm.greeting = "Hello bitches.";

    $http.get('/auth/user')
      .then( results => {
        var u = results.data;
        if (u.id) {
          $http.get(`/api/user/${u.id}/sessions`)
            .then( results => {

              vm.mySessions = results.data.sessions

              console.log(vm.mySessions);
            })
        }
      });
  }
})()
