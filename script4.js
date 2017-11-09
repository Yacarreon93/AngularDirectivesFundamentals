app.controller('mainCtrl4', function ($scope) {
  $scope.user1 = {
    name: 'Yasser',
    selected: false
  }
})

app.directive('userTile', function () {
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    templateUrl: 'templates/userTile.html'
  }
})

app.directive('userClickSelect', function () {
  return {
    link: function (scope, el, attrs) {
      el.on('click', function() {
        scope.user.selected = !scope.user.selected
        scope.$apply()
      })
    }
  }
})