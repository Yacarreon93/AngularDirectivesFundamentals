var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {
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