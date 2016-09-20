(function(){
  angular
    .module('logout',[])
    .controller('LogoutController', LogoutController)

  LogoutController.$inject = ['$location'];

  function LogoutController($location){
    var vm = this;

    $location.path('/auth/logout');
    $location.replace();

  }
})()
