myApp.controller('card1Controller', ['$scope', 'cloudCardFactory', '$location', '$cookies', '$routeParams', '$interval', '$rootScope', 'Upload', 'NgMap', '$http', '$compile',  function ($scope, cloudCardFactory, $location, $cookies, $routeParams, $interval, $rootScope, Upload, NgMap, $http, $compile ){

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
var numberOfIcons = 0;
var colorAlign = false;

$scope.$watch('check', function(newValue, oldValue) {
    cloudCardFactory.getOneUser($routeParams, function(data){
        $scope.user = data.data
        console.log($scope.user)
        for(var i = 0, j = 1; i <= 10; i++) {
            if(eval("$scope.user.icon" + i)) {
                correctIcon(eval("$scope.user.icon" + i), j.toString())
                numberOfIcons = j;
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
    console.log($scope.icon)
    $scope.icon.userId = $scope.user._id
    cloudCardFactory.selectIcons($scope.icon, function(data) {
      console.log(data)
      $scope.check = data;
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
    // $("#logo").delay(300).animate({"opacity": ".75"}, {queue: true, duration: 1500});
    // (A.M.K: http://stackoverflow.com/questions/11679567/using-css-for-fade-in-effect-on-page-load)
    // INTRO ANIMATIONS
    $("#loader-left").delay(1750).animate({top:'-55%'}, {queue: true, duration: 1500});
    $("#loader-right").delay(1750).animate({bottom:'-55%'}, {queue: true, duration: 1500});
    $("#content").delay(3000).animate({height: '80%', width: '80%'}, {queue: true, duration: 750});
    $("#logo").delay(1500).animate({top: "90%", height: '50px', width: '50px'}, {queue: true, duration: 750});
    $("#left").delay(3000).animate({"opacity": ".75"}, {queue: true, duration: 500});
    $("#link").delay(3000).animate({"opacity": ".75"}, {queue: true, duration: 500});
    
     // RIGHT SIDE ANIMATIONS
    // Default --------------------------//
    $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8').css("font-size", "0em");
    $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8').animate({top: "35%", left: "40%"});
    // Default ----------------------------//
    
    var firstClick = false;
    var linkclicks = 0;
    $('#link').click(function(){
        if(linkclicks == 0){
            if(numberOfIcons == 5) {
                $('#icon1, #icon2, #icon3, #icon4, #icon5').css("font-size", "7em");
                $('#icon4').animate({top: "12%", left: "40%"});
                $('#icon5').animate({top: "35%", left: "70%"});
                $('#icon1').animate({top: "60%", left: "62%"});
                $('#icon2').animate({top: "60%", left: "22%"});
                $('#icon3').animate({top: "35%", left: "10%"});
            } else if (numberOfIcons == 6) {
                $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6').css("font-size", "7em");
                $('#icon4').animate({top: "12%", left: "22%"});
                $('#icon6').animate({top: "12%", left: "62%"});
                $('#icon5').animate({top: "35%", left: "70%"});
                $('#icon1').animate({top: "60%", left: "62%"});
                $('#icon2').animate({top: "60%", left: "22%"});
                $('#icon3').animate({top: "35%", left: "10%"});
            } else if (numberOfIcons == 7) {
                $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7').css("font-size", "7em");
                $('#icon4').animate({top: "12%", left: "22%"});
                $('#icon6').animate({top: "12%", left: "62%"});
                $('#icon5').animate({top: "35%", left: "70%"});
                $('#icon1').animate({top: "60%", left: "70%"});
                $('#icon7').animate({top: "60%", left: "40%"});
                $('#icon2').animate({top: "60%", left: "10%"});
                $('#icon3').animate({top: "35%", left: "10%"});
            } else if (numberOfIcons == 8) {
                $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8').css("font-size", "7em");
                $('#icon4').animate({top: "12%", left: "10%"});
                $('#icon8').animate({top: "12%", left: "40%"});
                $('#icon6').animate({top: "12%", left: "70%"});
                $('#icon5').animate({top: "35%", left: "70%"});
                $('#icon1').animate({top: "60%", left: "70%"});
                $('#icon7').animate({top: "60%", left: "40%"});
                $('#icon2').animate({top: "60%", left: "10%"});
                $('#icon3').animate({top: "35%", left: "10%"});
            }
            console.log(numberOfIcons)
            linkclicks++;
            console.log("1 link works")
            if(!firstClick) {
                firstClick = true;
                $scope.check = "click"
                $scope.$apply();
            }
        }
        else {
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8').animate({top: "35%", left: "40%"});
            $('#icon1, #icon2, #icon3, #icon4, #icon5, #icon6, #icon7, #icon8').delay(200).queue(function (next) { 
                $(this).css("font-size", "0em"); 
                 next(); 
             })
            linkclicks--;
            console.log("2 link works")
        }
    });
    // LEFT SIDE ANIMATIONS
    var leftclicks = 0;
    $('#left').click(function(){
        var fullname = $scope.user.firstName + " " + $scope.user.lastName
        if(leftclicks == 0){
            $('#left').animate({top: "17%", left: "50%"});
            $('#spiel2').animate({"opacity": ".75"}).typeIt({
                startDelay: 750,
                strings: [fullname, $scope.user.description]
            })
            // (Alex Macarthur: http://macarthur.me/typeit/)
            leftclicks++;
            console.log("1 left works")
        }
        else {
            $('#spiel2').animate({"opacity": "0"});
            $('#left').delay(300).animate({top: "50%", left: "50%"});
            leftclicks--;
            console.log("2 left works")
        }
    });
    // FOOTER ANIMATIONS
    var logoclicks = 0;
    $('#logo').click(function(){
        if(logoclicks == 0){
            $('#2017').animate({top: "50%", left: "58%", fontSize: '20px'});
            $('#copyright').animate({top: "50%", left: "42%", fontSize: '30px'});
            logoclicks++;
            console.log("1 logo works")
        }
        else {
            $('#2017').animate({top: "50%", left: "50%", fontSize: '0px'});
            $('#copyright').animate({top: "50%", left: "50%", fontSize: '0px'});
            logoclicks--;
            console.log("2 logo works")
        }
    });
});


}])