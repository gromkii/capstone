(function(){
  angular
    .module('index', [])
    .config(routeConfig)
    .controller('IndexController', IndexController);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];
  registerPost.$inject = ['$http'];
  signinPost.$inject = ['$http'];

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
    vm.registerPost = registerPost;
    vm.signinModal = signinModal;
    vm.signinPost = signinPost;
  }

  function registerModal(){
    // Do shit.
  }

  function registerPost($http){
    // $http.post to API when form is valid.
  }

  function signinModal(){
    // Do shit.
  }

  function signinPost($http){

  }
})();
