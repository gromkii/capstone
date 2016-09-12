(function(){
  angular
    .module('index', ['Users'])
    .config(routeConfig)
    .controller('IndexController', IndexController);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];
  registerPost.$inject = ['$http'];
  signinPost.$inject = ['$http'];
  IndexController.$inject = ['Users']

  function routeConfig($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl:'/views/index/index.html',
        controller:'IndexController',
        controllerAs:'index'
      })

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  };

  function IndexController(Users){
    var vm = this;

    vm.greeting = 'It works btw.';
    vm.registerModal = registerModal;
    vm.registerPost = registerPost;
    vm.signinModal = signinModal;
    vm.signinPost = signinPost;


  }
})();
