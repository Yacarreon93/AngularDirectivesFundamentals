app.controller('mainCtrl2', function () {

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