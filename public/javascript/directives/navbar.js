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

    NavbarController.$inject = ['$http'];

    return navbarObject;

    function NavbarController($http){
      var vm = this;
      vm.loggedIn = false;

      $http
        .get('/auth/user')
        .then( results => {
          var user = results.data;
          if (user.id) {
            vm.loggedIn = true;
            vm.username = user.username;
            vm.user_id = user.id;
          }
        })
    }
  }
})();
