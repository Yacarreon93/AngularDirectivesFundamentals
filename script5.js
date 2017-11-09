app.controller('mainCtrl5', function ($scope) {
  $scope.size = 150
})

app.directive('fontScale', function () {
  return {
    link: function (scope, el, attrs) {
      scope.$watch(attrs['fontScale'], function (newVal) {
        el.css('font-size', newVal + '%')
      })
    } 
  }
})