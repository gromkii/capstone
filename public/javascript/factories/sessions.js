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
      return $http.get(`/api/session/${sessionId}`);
    }

    function newSession(){
      return $http.post(`/api/sessions`)
    }

    function getUserSession(user_id){
      return $http.get(`/api/user/${user_id}/sessions`)
    }

    return sessionObj;
  }

})();
