(function(){
  angular
    .module('Sessions', [])
    .factory(Session)

  Session.$inject = ['$http'];

  function Session($http){
    return {
      getSessions:getSessions
    }
  }

  function getSessions(){
    return new Promise((resolve, reject) => {
      $http
        .get('http://localhost:3000/api/sessions')
        .then( sessions => {
          resolve(sessions);
        });
    });
  }
})();
