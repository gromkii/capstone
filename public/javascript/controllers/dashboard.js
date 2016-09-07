(function(){
  angular
    .module('dashboard', [])
    .config(routeConfig)
    .controller('DashboardController', DashboardController);

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routeConfig($routeProvider, $locationProvider){
      $routeProvider
        .when('/dashboard', {
          templateUrl:'/views/dashboard/index.html',
          controller:'DashboardController',
          controllerAs:'dash'
        });

      $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
      });
    }

    function DashboardController(){
      let vm = this;

      vm.greeting = 'Suh';
    }
})();
