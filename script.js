var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.user = {
    name: 'Luke',
    address: {
      street: '123 Main St.'
    }
  }
})

app.directive('userInfoCard', function () {
  return {
    template: 'Name: {{ user.name }}<br>Address: {{ user.address.street}}<br>',
    restrict: 'A'
  }
})