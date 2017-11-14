var app = angular.module('app', [])

app.controller('mainCtrl', function ($scope) {

})

app.directive('emperor', function () {
  return {
    scope: true,
    link: {
      pre: function (scope, el, attrs) {
      el.data('name', 'The Emperor')
      scope.master = 'The Emperor'
      }
    }
  }
})

app.directive('vader', function () {
  return {
    scope: true,
    link: {
      pre: function (scope, el, attrs) {
        el.data('name', 'Vader')
        el.data('master', scope.master)
        console.log('Vader - My master is ' + scope.master)
        scope.master = 'Vader'
      }
    }    
  }
})

app.directive('starkiller', function () {
  return {
    scope: true,
    link: {
      post: function (scope, el, attrs) {
        el.data('name', 'Starkiller')
        el.data('master', scope.master)
        console.log('Starkiller - My master is ' + scope.master)
      }
    }    
  }
})