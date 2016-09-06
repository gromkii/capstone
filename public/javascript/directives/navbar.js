(function(){
  angular
    .module('navbar', [])
    .directive('navbar', navbar)

  function navbar(){
    var navbarObject = {
      restrict:'EA',
      templateUrl:'/views/partials/navbar.html',
      controller:NavbarController,
      controllerAs:'navbar'
    }

    return navbarObject;

    function NavbarController(){
      let vm = this;
      vm.greeting = 'Hello';
    }
  }
})();
