var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.message = 'Hello'
})

app.directive('displayBox', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/displayBox.html',
    controller: function ($scope) {
      $scope.hidden = false
      $scope.close = function () {
        $scope.hidden = true
      }
    },
    transclude: true
  }
})