myApp.controller('card2Controller', ['$scope', 'cloudCardFactory', '$location', '$cookies', '$routeParams', '$interval', '$rootScope', 'Upload', 'NgMap', '$http', '$compile',  function ($scope, cloudCardFactory, $location, $cookies, $routeParams, $interval, $rootScope, Upload, NgMap, $http, $compile ){

$scope.icon = {};
$scope.iconUrl = {}
$scope.check = "";
$scope.instagramColorSelect = true;
$scope.linkedInColorSelect = true;
$scope.facebookColorSelect = true;
$scope.githubColorSelect = true;
$scope.emailColorSelect = true;
$scope.twitterColorSelect = true;
$scope.flickrColorSelect = true;
$scope.personalSiteColorSelect = true;
$scope.phoneColorSelect = true;
$scope.addressColorSelect = true;
$scope.numberOfIcons = 0;
var colorAlign = false;

$scope.$watch('check', function(newValue, oldValue) {
    cloudCardFactory.getOneUser($routeParams, function(data){
        $scope.user = data.data
        // console.log($scope.user)
        for(var i = 0, j = 1; i <= 10; i++) {
            if(eval("$scope.user.icon" + i)) {
                correctIcon(eval("$scope.user.icon" + i), j.toString())
                $scope.numberOfIcons = j;
                j++;
            }
        }
        setTimeout(function(){ setSavedColors(); }, 20);
        // setSavedColors();
        if($scope.user.defaultBackgroundPic) {
            $('body').css('background-image', 'url(' + $scope.user.defaultBackgroundPic +')');
        } else {
            $('body').css('background-image', 'url(img/background.jpg)');    
        }
        var iconArray = [$scope.user.icon1, $scope.user.icon2, $scope.user.icon3, $scope.user.icon4, $scope.user.icon5, $scope.user.icon6, $scope.user.icon7, $scope.user.icon8, $scope.user.icon9, $scope.user.icon10 ]
        if(iconArray.indexOf("instagramIcon") > -1) {
            $scope.instagramColorSelect = false;
        }
        if(iconArray.indexOf("emailIcon") > -1) {
            $scope.emailColorSelect = false;
        }
        if(iconArray.indexOf("twitterIcon") > -1) {
            $scope.twitterColorSelect = false;
        }
        if(iconArray.indexOf("linkedInIcon") > -1) {
            $scope.linkedInColorSelect = false;
        }
        if(iconArray.indexOf("facebookIcon") > -1) {
            $scope.facebookColorSelect = false;
        }
        if(iconArray.indexOf("githubIcon") > -1) {
            $scope.githubColorSelect = false;
        }
        if(iconArray.indexOf("flickrIcon") > -1) {
            $scope.flickrColorSelect = false;
        }
        if(iconArray.indexOf("phoneIcon") > -1) {
            $scope.phoneColorSelect = false;
        }
        if(iconArray.indexOf("addressIcon") > -1) {
            $scope.addressColorSelect = false;
        }
        if(iconArray.indexOf("personalSiteIcon") > -1) {
            $scope.personalSiteColorSelect = false;
        }
    })
})

// if($('#formSelectIcons').find('input:checkbox:not(:checked)').length > 0){
//     alert("hello")
// }

var correctIcon = function(name, number) {
    if(name == "instagramIcon"){
        $scope.icon[number] = "ion-social-instagram-outline instagram"
        $scope.iconUrl[number] = "https://" +$scope.user.instagram;
    }
    else if(name == "emailIcon") {
        $scope.icon[number] = "ion-email email"
        $scope.iconUrl[number] = "https://" +$scope.user.email;
    }
    else if(name == "twitterIcon") {
        $scope.icon[number] = "ion-social-twitter twitter"
        $scope.iconUrl[number] = $scope.user.twitter;
    }
    else if(name == "linkedInIcon") {
        $scope.icon[number] = "ion-social-linkedin linkedIn"
        $scope.iconUrl[number] = "https://" +$scope.user.linkedIn;
    }
    else if(name == "facebookIcon") {
        $scope.icon[number] = "ion-social-facebook facebook"
        $scope.iconUrl[number] = "https://" +$scope.user.facebook;
    }
    else if(name == "githubIcon") {
        $scope.icon[number] = "ion-social-github github"
        $scope.iconUrl[number] = "https://" +$scope.user.github;
    }
    else if(name == "flickrIcon") {
        // NOT THE RIGHT ICON
        $scope.icon[number] = "ion-more flickr"
        $scope.iconUrl[number] = "https://" +$scope.user.flickr;
    }
    else if(name == "personalSiteIcon") {
        $scope.icon[number] = "ion-android-globe personalSite"
        $scope.iconUrl[number] = "https://" +$scope.user.personalSite;
    }
    else if(name == "phoneIcon") {
        $scope.icon[number] = "ion-android-call phone"
        $scope.iconUrl[number] = "https://" + $scope.user.phone;
    }
    else if(name == "addressIcon") {
        $scope.icon[number] = "ion-ios-home address"
        $scope.iconUrl[number] = "#"
    }
}

var setSavedColors = function() {
    if($scope.user.instagramColor) {
        $('.instagram').css("color", $scope.user.instagramColor)
    }
    if($scope.user.linkedInColor) {
        $('.linkedIn').css("color", $scope.user.linkedInColor)
    }
    if($scope.user.facebookColor) {
        $('.facebook').css("color", $scope.user.facebookColor)
    }
    if($scope.user.githubColor) {
        $('.github').css("color", $scope.user.githubColor)
    }
    if($scope.user.emailColor) {
        $('.email').css("color", $scope.user.emailColor)
    }
    if($scope.user.twitterColor) {
        $('.twitter').css("color", $scope.user.twitterColor)
    }
    if($scope.user.flickrColor) {
        $('.flickr').css("color", $scope.user.flickrColor)
    }
    if($scope.user.personalSiteColor) {
        $('.personalSite').css("color", $scope.user.personalSiteColor)
    }
    if($scope.user.phoneColor) {
        $('.phone').css("color", $scope.user.phoneColor)
    }
    if($scope.user.addressColor) {
        $('.address').css("color", $scope.user.addressColor)
        $('.address').parent().addClass('address1')
        $('.address1').attr('data-target', 'addressMap')
        $('.address1').attr('modal')
        $('.address1').attr('ng-click', 'openMap();')
        $compile($('.address1'))($scope);
    }
}

$scope.changeColors = function() {
    console.log($scope.color)
    $scope.color.userId = $scope.user._id
    cloudCardFactory.changeColors($scope.color, function(data) {
      console.log(data)
      $scope.check = data;
    })
}

$scope.selectIcons = function() {
    $scope.icon.userId = $scope.user._id
    cloudCardFactory.selectIcons($scope.icon, function(data) {
      $scope.check = data;

    setTimeout(function(){
        console.log("HEYOOOOO")
        if($scope.numberOfIcons == 3) {
            $('#icon1, #icon2, #icon3').css("font-size", "6em");
            $('#icon4, #icon5, #icon6, #icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "12%")
            $('.s1Icons').css('margin-right', "12%")
        } else if($scope.numberOfIcons == 4) {
            $('#icon1, #icon2, #icon3, #icon4').css("font-size", "6em");
            $('#icon5, #icon6, #icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "7%")
            $('.s1Icons').css('margin-right', "7%")
        } else if($scope.numberOfIcons == 5) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5').css("font-size", "6em");
            $('#icon6, #icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "5.5%")
            $('.s1Icons').css('margin-right', "5%")
        } else if ($scope.numberOfIcons == 6) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6').css("font-size", "5em");
            $('#icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "4%")
            $('.s1Icons').css('margin-right', "4%")
        } else if ($scope.numberOfIcons == 7) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7').css("font-size", "5em");
            $('#icon8').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "2.6%")
            $('.s1Icons').css('margin-right', "2.6%")
        } else if ($scope.numberOfIcons == 8) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8').css("font-size", "4.3em");
            $('#icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "1.7%")
            $('.s1Icons').css('margin-right', "1.7%")
        } 
        // else if ($scope.numberOfIcons == 9) {
        //     $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8, #icon9').css("font-size", "3em");
        // }
     }, 200);

    })
}

$scope.uploadBackgroundPic = function(image) {
    $scope.upload = Upload.upload({
        url: '/uploadBackgroundPic',
        method: 'POST',
        data: {
          file: image,
          id: $scope.user._id
        },
        file: image
    }).success(function(data, status, headers, config) {
        console.log('background photo uploaded')
        $scope.check = data
    }).error(function(err) {
        console.log('background photo upload failure')
    });
} 

$scope.setDefaultPic = function() {
    console.log($scope.user)
    $('body').css('background-image', 'url(' + $scope.user.backgroundPicDefault +')');
    cloudCardFactory.updateDefaultPic($scope.user, function(data) {
      console.log(data)
    })
}

$scope.updateInfo = function() {
    var address = $scope.user.street + ", " + $scope.user.city + ", " + $scope.user.state 
    console.log(address)
    $http.get('https://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false').then(function(mapData) {
            $scope.user.lat = mapData.data.results[0].geometry.location.lat
            $scope.user.lon = mapData.data.results[0].geometry.location.lng
            cloudCardFactory.updateInfo($scope.user, function(data){
                console.log(data)
                $scope.check = data;
            })
    }).catch( function(response) {
      Materialize.toast('The address you entered was not valid according to google. Please try editing your address', 4000)
    })  
}

$scope.openMap = function() {
    window.setTimeout(function(){
        NgMap.getMap({id: 'googleMap' }).then(function(map) {
            console.log("here")
            var currCenter = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(currCenter);
        });
    }, 200);
}

$scope.shuffle = function() {
    $('.address1').removeAttr('data-target')
    $('.address1').removeAttr('modal')
    $('.address1').removeAttr('ng-click', 'openMap()')
    $('.address1').removeClass('address1')
    cloudCardFactory.shuffle($scope.user, function(data) {
      console.log(data)
      $scope.check = data;
    })
}

$(document).ready(function(){
    var linkclicks = 0;
        $('#nav1').click(function(){
        if($scope.numberOfIcons == 3) {
            $('#icon1, #icon2, #icon3').css("font-size", "6em");
            $('#icon4, #icon5, #icon6, #icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "12%")
            $('.s1Icons').css('margin-right', "12%")
        } else if($scope.numberOfIcons == 4) {
            $('#icon1, #icon2, #icon3, #icon4').css("font-size", "6em");
            $('#icon5, #icon6, #icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "7%")
            $('.s1Icons').css('margin-right', "7%")
        } else if($scope.numberOfIcons == 5) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5').css("font-size", "6em");
            $('#icon6, #icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "5.5%")
            $('.s1Icons').css('margin-right', "5%")
        } else if ($scope.numberOfIcons == 6) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6').css("font-size", "5em");
            $('#icon7, #icon8, #icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "4%")
            $('.s1Icons').css('margin-right', "4%")
        } else if ($scope.numberOfIcons == 7) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7').css("font-size", "5em");
            $('#icon8').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "2.6%")
            $('.s1Icons').css('margin-right', "2.6%")
        } else if ($scope.numberOfIcons == 8) {
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8').css("font-size", "4.3em");
            $('#icon9').css("font-size", "0em");
            $('.s1Icons').css('margin-left', "1.7%")
            $('.s1Icons').css('margin-right', "1.7%")
        } 
    if(linkclicks == 0){
            $('#information').animate({top: "40%"});
            $('#links_container').animate({opacity: ".8"});
            linkclicks++;
            console.log("1 link works")
        }
        else {
            $('#information').animate({top: "50%"});
            $('#links_container').animate({opacity: "0"});
            linkclicks--;
            console.log("2 link works")
        }
    });
    var linkclicks2 = 0;
    $('#nav2').click(function(){
        if(linkclicks2 == 0){
            $('#information').animate({top: "30%"});
            $('#links_container').animate({opacity: ".8"});
            linkclicks2++;
            console.log("1 link works")
        }
        else {
            $('#information').animate({top: "50%"});
            $('#links_container').animate({opacity: "0"});
            linkclicks2--;
            console.log("2 link works")
        }
    });
});


}])