var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.user1 = {
    name: 'Luke',
    address: {
      street: '123 Main St.',
      city: 'Aguascalientes',
      planet: 'Earth'
    },
    friends: [
      'John',
      'Carlos'
    ]
  },
  $scope.user2 = {
    name: 'Han',
    address: {
      street: '123 Main St.',
      city: 'Mexico',
      planet: 'Earth'
    },
    friends: [
      'Luke',
      'Chewbacca'
    ]
  }
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
      $scope.collapsed = false  
      $scope.knightMe = function (user) {    
        user.rank = 'knight'
      }
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed
      }
    }
  }
})

app.directive('address', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/address.html',
    scope: true,
    controller: function ($scope) {
      $scope.collapsed = false
      $scope.collapseAddress = function () {
        $scope.collapsed = true
      }
      $scope.expandAddress = function () {
        $scope.collapsed = false
      }
    }
  }
})