myApp.controller('indexController', ['$scope', 'cloudCardFactory', '$location', '$cookies', '$routeParams', '$interval', '$rootScope', function ($scope, eventFriendsFactory, $location, $cookies, $routeParams, $interval, $rootScope ){

console.log("here")

$(document).ready(function(){
    $("#logo").delay(500).animate({"opacity": ".75"}, {queue: true, duration: 2000});
    // (A.M.K: http://stackoverflow.com/questions/11679567/using-css-for-fade-in-effect-on-page-load)
    // INTRO ANIMATIONS
    $("#loader-left").delay(2000).animate({top:'-55%'}, {queue: true, duration: 5000});
    $("#loader-right").delay(2000).animate({bottom:'-55%'}, {queue: true, duration: 5000});
    $("#content").delay(6000).animate({height: '80%', width: '80%'}, {queue: true, duration: 2000});
    $("#logo").delay(5000).animate({top: "90%", height: '50px', width: '50px'}, {queue: true, duration: 2000});
    $("#left").delay(9000).animate({"opacity": ".75"}, {queue: true, duration: 1500});
    $("#link").delay(9750).animate({"opacity": ".75"}, {queue: true, duration: 1500});
    // RIGHT SIDE ANIMATIONS
    var linkclicks = 0;
    $('#link').click(function(){
        if(linkclicks == 0){
            $('#instagram').animate({top: "80%", left: "70%", height: '80px', width: '80px'});
            $('#flickr').animate({top: "80%", left: "30%", height: '80px', width: '80px'});
            $('#gmail').animate({top: "50%", left: "20%", height: '60px', width: '80px'});
            $('#linkedin').animate({top: "20%", left: "50%", height: '80px', width: '80px'});
            $('#github').animate({top: "50%", left: "80%", height: '80px', width: '80px'});
            linkclicks++;
            console.log("1 link works")
        }
        else {
            $('#instagram').animate({top: "50%", left: "50%", height: '0px', width: '0px'});
            $('#flickr').animate({top: "50%", left: "50%", height: '0px', width: '0px'});
            $('#gmail').animate({top: "50%", left: "50%", height: '0px', width: '0px'});
            $('#linkedin').animate({top: "50%", left: "50%", height: '0px', width: '0px'});
            $('#github').animate({top: "50%", left: "50%", height: '0px', width: '0px'});
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
                startDelay: 1000,
                strings: ['Nameer Rizvi.', '26.', 'DC-area based.', 'Web designer for hire.', ':)']
            })
            // (Alex Macarthur: http://macarthur.me/typeit/)
            leftclicks++;
            console.log("1 left works")
        }
        else {
            $('#spiel2').animate({"opacity": "0"});
            $('#left').delay(500).animate({top: "50%", left: "50%"});
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