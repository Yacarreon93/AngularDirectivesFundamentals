var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.bountyHunters = [
    { name: 'Boba Fett' },
    { name: 'IG-88' },
    { name: 'Dengar' },
  ]
  $scope.add = function () {
    $scope.bountyHunters.push({ name: 'Bossk' })
  }
  $scope.remove = function () {
    $scope.bountyHunters.length--
  }
})

app.directive('myRepeat', function () {
  return {
    restrict: 'A',
    transclude: 'element',
    link: function (scope, el, attr, ctrl, transclude) {
      var pieces = attr.myRepeat.split(' ')
      var itemString = pieces[0]
      var collectionName = pieces[2]
      var elements = []
      scope.$watchCollection(collectionName, function (collection) {
        if (elements.length > 0) {
          for (var index = 0; index < elements.length; index++) {
            elements[index].el.remove()
            elements[index].scope.$destroy()

          }
          elements = []
        }
        for (var index = 0; index < collection.length; index++) {
          var childScope = scope.$new()
          childScope[itemString] = collection[index]
          transclude(childScope, function (clone) {
            el.before(clone)
            var item = {}
            item.el = clone
            item.scope = childScope
            elements.push(item)
          })
        }
      })
    }
  }
})