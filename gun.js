const five = require("johnny-five");
const Raspi = require("raspi-io");
const board = new five.Board({
    io: new Raspi()
});

let min = -40,
    max = 280;

let servo, gun;

let bullets = process.argv[2] || 1;

board.on("ready", function () {
    servo = new five.Servo({
        pin: "P1-12",
        range: [min, max],
        startAt: min
    });

    gun = new five.Pin('GPIO12');
    gun.low();  //initialize to low

    shoot2(bullets);

});


//function using sweep
function shoot2(count){

    let interval = 600;

    function stop(){
        console.log("turning off gun");
        gun.low();
        process.exit();
    }

    function fire(){
        servo.sweep({interval:interval});
        setTimeout(()=>{
            servo.stop();
            servo.min();
            stop();
        }, count*interval*2);
    }

    console.log("Turning on gun. Ready to fire " + count + " times");
    gun.high();
    setTimeout(() => {fire()}, 2500);

}

//function using min and max
//todo: debug - min never fires until the end
function shoot(shots){

    let counter = 1;

    function fire(){
        console.log("shot #" + counter);
        //console.time("fire");
        servo.stop();
        servo.max();

        setTimeout(()=>{
            console.log("I should be going to " + min + " now");
            servo.to(min);
            //console.timeEnd("fire");
            if (counter >= shots){
                stop();
            }
            else{
                counter++;
                fire();
            }
        }, 2000);
    }

    function stop(){
        console.log("turning off gun");
        gun.low();
        process.exit();
    }

    console.log("Turning on gun. Ready to fire " + shots + " times");
    gun.high();
    //give the gun some time to spin up
    setTimeout(() => {fire()}, 2500);
}