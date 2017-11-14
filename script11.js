var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {

})

app.directive('emperor', function () {
  var name = 'The Emperor'
  return {
    scope: true,
    controller: function ($scope) {
      this.name = name
    },
    link: function (scope, el, attrs) {
      el.data('name', name)
    }
  }
})

app.directive('vader', function () {
  var name = 'Vader'
  return {
    scope: true,
    require: '^emperor',
    controller: function ($scope) {
      this.name = name
    },
    link: function (scope, el, attrs, emperorCtrl) {
      el.data('name', name)
      el.data('master', emperorCtrl.name)
      console.log('Vader - My master is ' + emperorCtrl.name)
    }    
  }
})

app.directive('starkiller', function () {
  return {
    scope: true,
    require: '?^^vader',
    link: function (scope, el, attrs, vaderCtrl) {
      el.data('name', 'Starkiller')
      if (vaderCtrl) {
        el.data('master', vaderCtrl.name)
        console.log('Starkiller - My master is ' + vaderCtrl.name)
      } else {
        console.log('Starkiller doesn\'t have a master')
      }
    }    
  }
})