var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.user = {
    name: 'Luke',
    address: {
      street: '123 Main St.'
    },
    friends: [
      'John',
      'Carlos'
    ]
  }
  console.log($scope)
})

app.directive('userInfoCard', function () {
  return {
    templateUrl: 'templates/userInfoCard.html',
    restrict: 'E',
    controller: function ($scope) {      
      $scope.knightMe = function (user) {    
        user.rank = 'knight'
      }
      console.log($scope)
    }
  }
})