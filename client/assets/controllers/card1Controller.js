myApp.controller('card1Controller', ['$scope', 'cloudCardFactory', '$location', '$cookies', '$routeParams', '$interval', '$rootScope', function ($scope, cloudCardFactory, $location, $cookies, $routeParams, $interval, $rootScope ){

cloudCardFactory.getOneUser($routeParams, function(data){
	console.log(data.data)
    $scope.user = data.data
})


$(document).ready(function(){
    // $("#logo").delay(300).animate({"opacity": ".75"}, {queue: true, duration: 1500});
    // (A.M.K: http://stackoverflow.com/questions/11679567/using-css-for-fade-in-effect-on-page-load)
    // INTRO ANIMATIONS
    $("#loader-left").delay(750).animate({top:'-55%'}, {queue: true, duration: 1500});
    $("#loader-right").delay(750).animate({bottom:'-55%'}, {queue: true, duration: 1500});
    $("#content").delay(2000).animate({height: '80%', width: '80%'}, {queue: true, duration: 750});
    $("#logo").delay(1500).animate({top: "90%", height: '50px', width: '50px'}, {queue: true, duration: 750});
    $("#left").delay(3000).animate({"opacity": ".75"}, {queue: true, duration: 500});
    $("#link").delay(3000).animate({"opacity": ".75"}, {queue: true, duration: 500});
    
     // RIGHT SIDE ANIMATIONS
    // Default --------------------------//
    $('#github, #linkedin, #gmail, #facebook, #instagram').css("font-size", "0em");
    $('#instagram, #facebook, #gmail, #linkedin, #github').animate({top: "35%", left: "40%"});
    // Default ----------------------------//
    

    var linkclicks = 0;
    $('#link').click(function(){
        if(linkclicks == 0){
            $('#github, #linkedin, #gmail, #facebook, #instagram').css("font-size", "7em");
            $('#instagram').animate({top: "60%", left: "60%"});
            $('#facebook').animate({top: "60%", left: "20%"});
            $('#gmail').animate({top: "35%", left: "10%"});
            $('#linkedin').animate({top: "10%", left: "40%"});
            $('#github').animate({top: "35%", left: "70%"});
            linkclicks++;
            console.log("1 link works")
        }
        else {
            $('#github, #linkedin, #gmail, #facebook, #instagram').css("font-size", "0em");
            $('#instagram, #facebook, #gmail, #linkedin, #github').animate({top: "35%", left: "40%"});
            linkclicks--;
            console.log("2 link works")
        }
    });
    // LEFT SIDE ANIMATIONS
    var leftclicks = 0;
    $('#left').click(function(){
        if(leftclicks == 0){
            $('#left').animate({top: "17%", left: "50%"});
            $('#spiel2').animate({"opacity": ".75"}).typeIt({
                startDelay: 750,
                strings: [$scope.user.description]
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