var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.user1 = {
    name: 'Luke',
    address: {
      street: '123 Main St.',
      city: 'Aguascalientes',
      planet: 'Earth'
    },
    friends: [
      'John',
      'Han'
    ],
    level: 0
  },
  $scope.user2 = {
    name: 'Han',
    address: {
      street: '123 Main St.',
      city: 'Mexico',
      planet: 'Earth'
    },
    friends: [
      'Luke',
      'Chewbacca'
    ],
    level: 2
  }
})

app.directive('userInfoCard', function () {
  return {
    templateUrl: 'templates/userInfoCard.html',
    restrict: 'E',
    // scope: true, // internal scope
    scope: {
      user: '=',
      initialCollapsed: '@collapsed'
    },
    link: function (scope, el, attrs) {
      scope.nextState = function () {
        scope.user.level++
        scope.user.level = scope.user.level % 3
        setState()   
      }
      function setState () {
        switch (scope.user.level) {
          case 0:
            el.find('.panel-body').css('background-color', 'white')
            break
          case 1:
            el.find('.panel-body').css('background-color', 'yellow')
            break
          case 2:
            el.find('.panel-body').css('background-color', 'red')
            break
        }
      }
      setState()
    },
    controller: function ($scope) {
      // $scope.collapsed = false
      $scope.collapsed = ($scope.initialCollapsed === 'true')
      $scope.knightMe = function (user) {    
        user.rank = 'knight'
      }
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed
      }
      $scope.removeFriend = function (friend) {
        var idx = $scope.user.friends.indexOf(friend)
        if (idx > -1) {
          $scope.user.friends.splice(idx, 1)
        }
      }
    }
  }
})

app.directive('removeFriend', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/removeFriend.html',
    scope: {
      notifyParent: '&method'
    },
    controller: function ($scope) {
      $scope.removing = false
      $scope.startRemove = function () {
        $scope.removing = true
      }
      $scope.cancelRemove = function () {
        $scope.removing = false
      }
      $scope.confirmRemove = function () {
        $scope.notifyParent()
        // $scope.notifyParent({ friend: 'Han' })
      }
    }
  }
})

app.directive('address', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/address.html',
    scope: true,
    controller: function ($scope) {
      $scope.collapsed = false
      $scope.collapseAddress = function () {
        $scope.collapsed = true
      }
      $scope.expandAddress = function () {
        $scope.collapsed = false
      }
    }
  }
})