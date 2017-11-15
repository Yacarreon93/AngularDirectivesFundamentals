var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.users = [
    { name: 'Luke', planet: 'Tatooine', job: 'Jedi' },
    { name: 'Han', planet: 'Nowhere', job: 'Jedi' },
    { name: 'Chewbacca', planet: 'Kashyyyk', job: 'CoPilot' },
  ]
})

app.factory('userListState', function () {
  return {
    selectedUser: null
  }
})

app.directive('masterUsers', function (userListState) {
  return {
    scope: {
      users: '=data'
    },
    templateUrl: 'templates/masterUsers.html',
    controller: function ($scope) {
      $scope.state = userListState
      userListState.selectedUser = $scope.users[0]      
    }
  }
})

app.directive('detailUsers', function (userListState) {
  return {
    scope: {
      users: '=data'
    },
    templateUrl: 'templates/detailUsers.html',
    controller: function ($scope) {
      $scope.state = userListState
    }
  }
})