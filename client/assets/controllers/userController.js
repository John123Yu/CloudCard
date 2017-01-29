myApp.controller('userController', ['$scope', 'cloudCardFactory', '$location', '$cookies', '$routeParams', 'Upload', function ($scope, cloudCardFactory, $location, $cookies, $routeParams, Upload){

  $('#age').focusout(function(){
    $scope.ageLength = $(this).val().length
    $scope.$apply()
  })
  $('#occupation').focusout(function(){
    $scope.occupationLength = $(this).val().length
    $scope.$apply()
  })
  $('#education').focusout(function(){
    $scope.educationLength = $(this).val().length
    $scope.$apply()
  })
  $('#instagram').focusout(function(){
    $scope.instagramLength = $(this).val().length
    $scope.$apply()
  })
  $('#facebook').focusout(function(){
    $scope.facebookLength = $(this).val().length
    $scope.$apply()
  })
  $('#personalSite').focusout(function(){
    $scope.personalSiteLength = $(this).val().length
    $scope.$apply()
  })
  $('#linkedIn').focusout(function(){
    $scope.linkedInLength = $(this).val().length
    $scope.$apply()
  })
  $('#github').focusout(function(){
    $scope.githubLength = $(this).val().length
    $scope.$apply()
  })
  $('#flickr').focusout(function(){
    $scope.flickrLength = $(this).val().length
    $scope.$apply()
  })


  $scope.createUser = function() {
    cloudCardFactory.createUser($scope.user, function(data) {
      
      console.log(data)
    })
  }

}]).directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});