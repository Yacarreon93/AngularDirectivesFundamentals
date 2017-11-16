var app = angular.module('app', ['ui.bootstrap'])

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
  $scope.openModal = function () {
    $scope.modalOpen = true
  }
  $scope.closeModal = function (response) {
    $scope.modalOpen = false
    console.log('modal closed', response)
  }
  $scope.modalClosed = function (response) {
    $scope.closeModal('no')
  }
})

// Services

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

// Directives

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
    scope: {
      droid: '=',
      initialCollapsed: '@collapsed'
    }
  }
})

app.directive('personInfoCard', function (jediPolicy) {
  return {
    templateUrl: 'templates/personInfoCard.html',
    restrict: 'E',
    scope: {
      person: '=',
      initialCollapsed: '@collapsed'
    },
    controllerAs: 'vm',
    bindToController: true,
    controller: function ($modal) {    
      var that = this  
      this.knightMe = function (person) {
        var modalInstance = $modal.open({
          templateUrl: 'templates/knightConfirmation.html',
          controller: 'knightConfirmationCtrl',
          resolve: {
            person: function () {
              return that.person
            }
          }
        })
        modalInstance.result.then(function (answer) {
          if (answer) {
            that.person.rank = 'Jedi Knight'
          }
        })
        this.showKnightModal = true
      }
      this.knightDialogDone = function (response) {
        this.showKnightModal = false
        if (response) {
          this.person.rank = 'Jedi knight' 
        }
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

app.controller('modalCtrl', function ($scope) {
  $scope.close = function (response) {
    $scope.closeModal(response)
  }
})

app.directive('modal', function ($document) {
  return {
    scope: {
      modalOpen: '=open',
      options: '=',
      onClose: '&'
    },
    transclude: true,
    templateUrl: 'templates/modal.html',
    controller: function ($scope) {
      $scope.close = function () {
        $scope.modalOpen = false
        $scope.onClose()
      } 
    },
    link: function ($scope, el, attrs) {
      var options = angular.extend({
        height: '250px',
        width: '500px',
        top: '20%',
        left: '30%'
      }, $scope.options)
      el.find('.modal-container').css({
        left: options.left,
        top: options.top,
        height: options.height + 'px',
        width: options.width + 'px'
      })
      var pageHeight = $document.height()
      var pageWidth = $document.width()
      el.find('.modal-blackout').css({
        'width': pageWidth + 'px',
        'height': pageHeight + 'px'
      })
    }
  }
})

app.controller('knightConfirmationCtrl', function ($scope, $modalInstance, person) {
  $scope.person = person
  $scope.yes = function () {
    $modalInstance.close(true)
  }
  $scope.no = function () {
    $modalInstance.close(false)
  }
})