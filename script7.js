var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.answers = { baseLocation: "Navi" }
})

app.directive('myQuestion', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/myQuestion.html',
    scope: {
      questionText: '@q'
    }
  }
})