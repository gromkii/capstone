(function(){
  angular
    .module('index', [])
    .config(routeConfig)
    .controller('IndexController', IndexController);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl:'/views/index/index.html',
        controller:'IndexController',
        controllerAs:'index'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  };

  function IndexController(){
    var vm = this;

    vm.greeting = 'It works btw.';
    vm.registerModal = registerModal;
    vm.signinModal = signinModal;
  }

  function registerModal(){
    // Do shit.
  }

  function signinModal(){
    // Do shit.
  }
})();
