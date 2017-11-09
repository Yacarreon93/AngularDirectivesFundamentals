app.controller('mainCtrl2', function ($scope) {
  $scope.messages = []
  $scope.handlePause = function (e) {
    console.log(e)
    $scope.messages.push({ text: 'paused' })
    console.log('paused')
  }
})

app.directive('eventPause', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      var fn = $parse(attrs['eventPause'])
      el.on('pause', function (event) {
        scope.$apply(function () {
          fn(scope, { evt: event })
        })
      })
    } 
  }
})

app.directive('spacebarSupport', function () {
  return function (scope, el, attrs) {
    $('body').on('keypress', function (evt) {
      var vidEl = el[0]
      if (evt.keyCode === 32) {
        if (vidEl.paused) {
          vidEl.play()
        } else {
          vidEl.pause()
        }
      }
    })
  }
})