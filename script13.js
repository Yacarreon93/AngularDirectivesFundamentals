var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
  $scope.person1 = {
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
    hasForce: true,
    yearsOfJediTraining: 4,
    master: 'Yoda',
    passedTrials: true,
    masterApproves: true,
    level: 0
  },
  $scope.person2 = {
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
  $scope.droid1 = {
    name: 'R2-D2',
    specifications: {
      manufacturer: 'Industrial Automaton',
      type: 'Astromech',
      productLine: 'R2 series'
    },
    level: 1
  }
})

app.directive('stateDisplay', function () {
  return {
    link: function (scope, el, attrs) {
      var parms = attrs['stateDisplay'].split(' ')
      var linkVar = parms[0]
      var classes = parms.slice(1)
      scope.$watch(linkVar, function (newVal) {
        el.removeClass(classes.join(' '))
        el.addClass(classes[newVal])
      })
    }
  }
})

app.directive('userPanel', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/userPanel.html',
    scope: {
      name: '@',
      level: '=',
      initialCollapsed: '@collapsed'
    }, 
    controller: function ($scope) {
      // $scope.collapsed = false
      $scope.collapsed = ($scope.initialCollapsed === 'true')
      $scope.nextState = function (evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.level++
        $scope.level = $scope.level % 4
      }
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed
      }
    }
  }
})

app.directive('droidInfoCard', function () {
  return {
    templateUrl: 'templates/droidInfoCard.html',
    restrict: 'E',
    // scope: true, // internal scope
    scope: {
      droid: '=',
      initialCollapsed: '@collapsed'
    },
    controller: function ($scope) {          
    }
  }
})

app.factory('jediPolicy', function ($q) {
  return {
    advanceToKnight: function (candidate) {
      var promise = $q(function (resolve, reject) {      
        if (candidate.hasForce && (
          candidate.yearsOfJediTraining > 20 || 
          candidate.isChosenOne || 
          (candidate.master === 'Yoda' && candidate.yearsOfJediTraining > 3)) && 
          candidate.masterApproves && 
          candidate.passedTrials
          ) {
          candidate.rank = 'Jedi knight'
          resolve(candidate)
        } else {
          reject(candidate)
        }
      })
      return promise
    }
  }
})

app.directive('personInfoCard', function (jediPolicy) {
  return {
    templateUrl: 'templates/personInfoCard.html',
    restrict: 'E',
    // scope: true, // internal scope
    scope: {
      person: '=',
      initialCollapsed: '@collapsed'
    },
    controllerAs: 'vm',
    bindToController: true,
    controller: function () {      
      this.knightMe = function (person) {
        jediPolicy.advanceToKnight(person).then(null, function (user) {
          alert('Sorry, ' + user.name + ' is not ready to be a Jedi')
        })
      }     
      this.removeFriend = function (friend) {
        var idx = this.person.friends.indexOf(friend)
        if (idx > -1) {
          this.person.friends.splice(idx, 1)
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