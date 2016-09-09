(function(){
  angular
    .module('Sessions', [])
    .factory('Sessions', Sessions)

  Sessions.$inject = ['$http']

  function Sessions($http){
    var sessionObj = {
      getSession:getSession,
      newSession:newSession
    }

    function getSession(sessionId){
      return $http.get(`http://localhost:3000/api/session/${sessionId}`);
    }

    function newSession(){
      return $http.post(`http://localhost:3000/api/sessions`)
    }

    return sessionObj;
  }

})();
