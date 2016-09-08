(function(){
  angular
    .module('Sessions', [])
    .factory('Sessions',Sessions)

  Sessions.$inject = ['$http'];

  function Sessions($http){
    return {
      greet:'Hello',
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
