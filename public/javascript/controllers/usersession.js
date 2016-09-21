(function(){
  angular
    .module('userSession', ['Sessions'])
    .config(routeConfig)
    .controller('UserSessionController', UserSessionController)

  routeConfig.$inject = ['$routeProvider', '$locationProvider']
  UserSessionController.$inject = ['$http', 'Sessions']


  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/dashboard/users/sessions', {
        templateUrl:'/views/dashboard/sessions/usersessions.html',
        controller:'UserSessionController',
        controllerAs:'userSession'
      });

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
  }

  function UserSessionController($http, Sessions){
    var vm = this;

    vm.deleteSession = deleteSession;
    vm.approveApplication = approveApplication;
    vm.denyApplication = denyApplication;

    // This is really ugly, but chains commands to get sessions.
    $http.get('/auth/user')
      .then( results => {
        var u = results.data;
        if (u.id) {
          $http.get(`/api/user/${u.id}/sessions`)
            .then( results => {

              vm.mySessions = results.data.sessions
            })
            .then(() => {
              $http.get(`/api/user/${u.id}/sessions/host`)
                .then( results => {
                   vm.hostedSessions = results.data
                })
            })
        }
      });

    function deleteSession(session_id, index){
      vm.hostedSessions.splice(index,1);

      $http.delete(`/api/session/${session_id}`)
        .then( results => {

        });
    }

    function approveApplication(session, app_id, index){
      console.log('Boop');



      $http.post(`/api/application/${app_id}/approve`)
        .then( results => {
          console.log(results.data);
        });

      session.applications.splice(index,1);
    }

    function denyApplication(session, app_id, index){
      console.log('Hey');

      $http.delete(`/api/application/${app_id}/deny`)
        .then(() => {
          console.log("Application denied.");
        });

      session.applications.splice(index,1);
    }

  }
})()
