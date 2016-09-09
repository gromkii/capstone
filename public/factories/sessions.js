(function(){
  angular
    .module('Session', [])
    .factory(Session)

  Session.$inject = ['$http'];

  function Session($http){
    return {
      getSessions:getSessions
    }
  }

  function getSessions(){
    $http.get('http://localhost:3000/api/sessions')
  }
})
