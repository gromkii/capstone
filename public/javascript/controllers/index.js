(function(){
  angular
    .module('index', ['Users'])
    .config(routeConfig)
    .controller('IndexController', IndexController);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];
  IndexController.$inject = ['Users']

  function routeConfig($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl:'/views/index/index.html',
        controller:'IndexController',
        controllerAs:'index'
      })
      .when('/auth/logout', {
        templateUrl:'/views/index/logout.html',
        controller:'LogoutController'
      })

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  };

  function IndexController(Users){
    var vm = this;
  }
})();
