myApp.controller('userController', ['$scope', 'cloudCardFactory', '$location', '$cookies', '$routeParams', 'Upload', function ($scope, cloudCardFactory, $location, $cookies, $routeParams, Upload){

  $scope.createUser = function() {
    cloudCardFactory.createUser($scope.user, function(data) {
      
      console.log(data)
    })
  }

}])