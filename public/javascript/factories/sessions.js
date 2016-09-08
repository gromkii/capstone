(function(){
  angular
    .module('Sessions', [])
    .factory('Sessions', Sessions)


  function Sessions(){
    var sessionObj = {
      greeting: 'Hello'
    }

    return sessionObj;
  }

})();
