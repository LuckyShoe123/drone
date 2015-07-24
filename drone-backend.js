var Cylon = require('cylon');
var ws = require('nodejs-websocket');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })


    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })

    .device("nav",{
        driver: "ardrone-nav",
        connection: "ardrone"
    })

    .on("ready", fly);


// Fly the bot
function fly(robot) {
    bot=robot;
    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on("navdata", function(data){
        //console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        // Drone is higher than 1.5 meters up
        if (data > 1.5) {
            bot.drone.land();
        }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });

    bot.drone.disableEmergency();

    bot.drone.ftrim();

    bot.drone.takeoff();

    after (2*1000, function(){
        bot.drone.hover()
    });

    after (6*1000, function(){
        bot.drone.left(0.1)
    });

    after (8*1000, function(){
        bot.drone.hover()
    });

    after (12*1000, function(){
        bot.drone.front(0.1)
    });

    after (14*1000, function(){
        bot.drone.hover()
    });

    after (18*1000, function(){
        bot.drone.right(0.1)
    });

    after (20*1000, function(){
        bot.drone.hover()
    });

    after (24*1000, function(){
        bot.drone.back(0.1)
    });

    after (26*1000, function(){
        bot.drone.hover()
    });

    after (30*1000, function(){
        bot.drone.left(0.1)
    });

    after (32*1000, function(){
        bot.drone.hover()
    });

    after(36*1000, function(){
        bot.drone.land();
    });

    after(38*1000, function(){
        bot.drone.stop();
    });

}

Cylon.start();