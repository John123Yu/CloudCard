myApp.controller('userController', ['$scope', 'cloudCardFactory', '$location', '$cookies', '$routeParams', 'Upload', function ($scope, cloudCardFactory, $location, $cookies, $routeParams, Upload){

  // if(!$cookies.get('loginId')) {
  //   $location.url('/login')
  // }

  // $scope.user;
  // var loginId = $cookies.get('loginId')
  // $scope.loginId = loginId

  // $scope.uploadPic = function(image) {
  //   $scope.upload = Upload.upload({
  //   url: '/uploadPic',
  //   method: 'POST',
  //   data: {
  //     file: image,
  //     id: loginId
  //   },
  //   file: image
  // }).success(function(data, status, headers, config) {
  //   console.log('user photo uploaded')
  //   $scope.check = data
  // }).error(function(err) {
  //   console.log('user photo upload failure')
  // });
  // } 

  // $scope.$watch('check', function(newValue, oldValue) {
  //   cloudCardFactory.getOneUser($routeParams.id, function(data){
  //     $scope.user = data.data
  //     if(!$scope.user.userPicUrl) {
  //       $scope.user.userPicUrl = '/dbx2nglsgn8-swaraj-tiwari.jpg'
  //     }
  //     var birthdayDate = new Date(data.data.birthday)
  //   })
  // })

  // $scope.privateChat = {}
  // $scope.createPrivate = function() {
  //   $scope.privateChat.initId = loginId;
  //   $scope.privateChat.recId = $scope.user._id;
  //   if(loginId != $scope.user._id) {
  //     cloudCardFactory.privateExist($scope.privateChat , function(data) {
  //       if(data.data._id) {
  //         $location.url('/privateChat/' + data.data._id)
  //       } else {
  //         cloudCardFactory.createPrivate($scope.privateChat, function(data) {
  //           $location.url('/privateChat/' + data.data._id)
  //         })
  //       }
  //     })
  //   }
  //   else {
  //     toaster.pop('error', "", "You can't chat with yourself");
  //   }
  // }

}])