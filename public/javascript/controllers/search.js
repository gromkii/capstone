(function(){
  angular
    .module('searchSessions', [])
    .config(routeConfig)
    .controller('SearchSessionsController', SearchSessionsController)

  routeConfig.$inject = ['$routeProvider', '$locationProvider']
  SearchSessionsController.$inject = ['$http']

  function routeConfig($routeProvider, $locationProvider){
    $routeProvider
      .when('/dashboard/sessions/search',{
        templateUrl:'/views/dashboard/sessions/search.html',
        controller:'SearchSessionsController',
        controllerAs:'search'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }

  function SearchSessionsController($http) {
    var vm = this;

    $http.get('/api/sessions')
      .then( results => {
        vm.sessions = results.data;
        console.log(vm.sessions);
      })
  }
})();
