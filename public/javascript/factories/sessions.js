(function(){
  angular
    .module('Sessions', [])
    .factory('Sessions', Sessions)

  Sessions.$inject = ['$http']

  function Sessions($http){
    var sessionObj = {
      getSession:getSession
    }

    function getSession(sessionId){
      return $http.get(`http://localhost:3000/api/session/${sessionId}`);
    }

    return sessionObj;
  }

})();
