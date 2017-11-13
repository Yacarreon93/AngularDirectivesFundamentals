var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.items = [1,3,6,7,8]
})

app.directive('myTransclude', function () {
  return {
    restrict: 'A',
    transclude: 'element',
    link: function (scope, el, attrs, ctrl, transclude) {
      transclude(scope, function (clone, scope) {
        el.after(clone)
      })
    } 
  }
})