var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.user1 = {
    name: 'Luke',
    address: {
      street: '123 Main St.'
    },
    friends: [
      'John',
      'Carlos'
    ]
  },
  $scope.user2 = {
    name: 'Han',
    address: {
      street: '123 Main St.'
    },
    friends: [
      'Luke',
      'Chewbacca'
    ]
  }
  console.log($scope)
})

app.directive('userInfoCard', function () {
  return {
    templateUrl: 'templates/userInfoCard.html',
    restrict: 'E',
    // scope: true, // internal scope
    scope: {
      user: '='
    },
    controller: function ($scope) {      
      $scope.knightMe = function (user) {    
        user.rank = 'knight'
      }
      console.log($scope)
    }
  }
})