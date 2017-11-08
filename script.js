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
})

app.directive('userInfoCard', function () {
  return {
    templateUrl: 'templates/userInfoCard.html',
    restrict: 'E'
  }
})