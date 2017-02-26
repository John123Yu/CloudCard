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
  $('#phone').focusout(function(){
    $scope.phoneLength = $(this).val().length
    $scope.$apply()
  })
  $('#twitter').focusout(function(){
    $scope.twitterLength = $(this).val().length
    $scope.$apply()
  })

  $scope.createUser = function() {
    cloudCardFactory.createUser($scope.user, function(data) {
      console.log(data)
      $cookies.put('loginId', data.data._id)      
      $location.url('/users2')
    })
  }

  $scope.addBasicInfo = function() {
    console.log("here")
    $scope.user2.id = $cookies.get('loginId')
    cloudCardFactory.addBasicInfo($scope.user2, function(data) {
      console.log(data)
      $location.url('/users3')
    })
  }

  $scope.addSocialMedia = function() {
    console.log("here")
    $scope.user3.id = $cookies.get('loginId')
    cloudCardFactory.addBasicInfo($scope.user3, function(data) {
      console.log(data)
      $location.url('/users3')
    })
  }

  $scope.login = function() {
    console.log($scope.userLogin)
    cloudCardFactory.login($scope.userLogin, function(data) {
      console.log(data)
      $cookies.put('loginId', data.data._id)    
      $location.url('/users2')
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