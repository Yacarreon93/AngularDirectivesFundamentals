var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.items = [2, 3, 7, 43, 21]
})

app.directive('myLazyRender', function () {
  return {
    restrict: 'A',
    transclude: 'element',
    priority: 1200,
    link: function (scope, el, attr, ctrl, transclude) {
      var hasBeenShown = false
      var unwatchFn = scope.$watch(attr.myLazyRender, function (newVal) {
        if (newVal && !hasBeenShown) {
          hasBeenShown = true
          transclude(scope, function (clone) {
            el.after(clone)
          })
          unwatchFn()
        }
      })
    }
  }
})

app.directive('echo', function () {
  return {
    priority: 1300,
    link: function () {
      console.log('echo')
    }
  }
})