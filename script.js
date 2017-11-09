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
    ]
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
    ]
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