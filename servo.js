var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

let min = process.argv[2] || -90;
let max = process.argv[3] || 270;

board.on("ready", function() {
  var servo = new five.Servo({
	pin: "P1-12",
	range: [min,max],
	startAt: min
	});
  console.log("Instructions");
  console.log("Test min and max: sudo node servo [min] [max]");
  console.log("Sweep: sudo node servo");
  console.log();

  //sweep if no arguments
  if(!process.argv[2]){
  	console.log("sweeping from " + min + " to " + max);
	servo.sweep();
	}
  //go to max if max argument provided
  else if(process.argv[3]) {
	console.log("Starting at " + min);
  	setTimeout(()=>
	  {
		console.log("Ending at " + max);
		servo.max()
		process.exit();

	  }, 500);
	}
  else{
	console.log("Starting at " + min);
	process.exit();
	}

});
