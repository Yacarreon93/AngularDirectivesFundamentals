var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.bountyHunters = [
    { name: 'Boba Fett', age: 12 },
    { name: 'IG-88', age: 13 },
    { name: 'Dengar', age: 11 },
  ]
  $scope.add = function () {
    $scope.bountyHunters.push({ name: 'Bossk' })
  }
  $scope.remove = function () {
    $scope.bountyHunters.length--
  }
})

app.directive('userList', function ($compile) {
  return {
    restrict: 'A',
    transclude: 'element',
    link: function (scope, el, attr, ctrl, transclude) {
      var pieces = attr.userList.split(' ')
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
            var template = $compile('<div class="panel panel-primary"><div class="panel panel-heading">{{ ' + itemString + '.name }}</div><div class="panel panel-body"></div></div>')
            var wrapper = template(childScope)
            wrapper.find('.panel-body').append(clone)
            el.before(wrapper)
            var item = {}
            item.el = wrapper
            item.scope = childScope
            elements.push(item)
          })
        }
      })
    }
  }
})