(function(){
  angular
    .module('Users', [])
    .factory('Users', Users)

  Users.$inject = ['$http'];

  function Users($http) {
    var returnObj = {
      getAllUsers: getAllUsers
    }

    function getAllUsers() {
      return $http.get('/api/users')
    }

    function getUsers(user_id){
      return $http.get(`/api/user/${user_id}`);
    }

    return returnObj;
  }
})();
