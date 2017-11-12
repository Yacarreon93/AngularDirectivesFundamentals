var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.message = 'Hello'
  console.log('controller', $scope)
})

app.controller('innerCtrl', function ($scope) {
  console.log('inner controller', $scope)
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
      $scope.message = 'Hello hackers'
      console.log('directive', $scope)
    },
    transclude: true,
    scope: true
  }
})