# Automatic Nerf Gun using a Rapsberry Pi

Make a software controlled Nerf Gun using a Raspberry Pi, a servo, and some 3D printed parts.

What you'll need:
* Nerf Revelle Rapid Red Blaster - <$12 on [Amazon](https://www.amazon.com/Nerf-Rebelle-Rapid-Red-Blaster/dp/B00INZO30M/ref=sr_1_2?s=toys-and-games&ie=UTF8&qid=1496580017&sr=1-2&keywords=nerf+rebelle)
* Raspberry Pi with one of the PCM GPIO pins available
* A 9g servo - like [these](https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dtoys-and-games&field-keywords=9g+servo)
* Relay switch for the Raspberry Pi - I have an odd setup from an existing project so I don't discuss this
* Access to a 3D Printer - you can use an online service
* Some 18 to 22 guage wire
* Some aligator clips, appropriate jumper pins or a breakout board for the Pi

## Software

### Installation

```
git clone https://github.com/chadwallacehart/rpi-auto-nerf-gun.git
cd rpi-auto-nerf-gun
npm install
```

### Servo.js

Set the servo to a minimum value: `sudo node servo -40` - where the enumber is the minimum value

Set the servo to a min value and then max: `sudo node servo -40 270` - first parameter is min, second is max

Sweep the servo between whatever min and max value is in the code: `sudo node servo`

### gun.js

Shoot one bullet: `sudo node gun`

Shoot any number of darts: `sudo node gun 12` - fires 12 darts

## Hardware setup

### Servo Wiring
See Adafruit's [guide](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-8-using-a-servo-motor/hardware) for hot to set this up.

![Servo Setup](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/rpi%20servo%20wiring.jpg?raw=true "Servo wiring")

Use _servo.js_ to test.

_Note on powering_

Adafruit shows an external power supply, separate from the Raspberry Pi's. 
You shoud do this! I was able to do some tests powering directly from the Pi's 5V supply, but it was inconsistent and I wasn't being too safe. 
You can power the servo from your gun. Once you have your gun open (see below), use some aligator clips to power off of the nerf gun's batteries as shown here:

![Nerf Gun wiring - servo power](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/nerf%20gun%20servo%20power.png?raw=true "Powering the servo from the nerf gun")

### Linear Actuator

See this [video](https://www.youtube.com/watch?v=qBHvMHJEG-M&t=1s) from Roger Rabbit of this in action.

You will need to 3d print this component and fit it inside the gun.

#### 3D printing parts

Grab the linear actuator 3D model in the repo [here](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/CAD/servo%20linear%20actuator%20adjustment%203.stl).

I made a slight modification to [tscha70's](https://github.com/tscha70) [original design](https://github.com/tscha70/3DPrinterSTLFiles/tree/master/Proton%20Rev%202%20-%20Easter%20Edition) to change the size of the piston head square. 

The piston head is actually to square, so I ended up filing it down with a Dremel to look more like the angled profile of the original piston head. When I work on this again I will update the design so that this is not necessary.

#### Adjustment

You want to adjust the servo gear position so that it provides the maximum extension. 
To do this, take apart the linear relay piece so you just see the gear.

First find the minimum range. Run `sudo node servo n` with a range of values starting with 0.  
Keep decreasing _n_ until the decreasing the value makes no difference. For me this was `-40`. Mark this point.

![Servo adjustment - minimum](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/servo%20min%20measurement.jpg?raw=true "Find the servo minimium")


Repeat this step to find the maximum range. Mine was `280`.

![Servo adjustment - maximum](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/servo%20max%20measurement.jpg?raw=true "Find the servo maximum")


After you find the maximum, make sure to reset the servo to its minimum point before re-assembling the linear servo.
When you are done you should have about a 38mm / 1.5 inch range.

![Adjusting to achieve the maximum linear servo range](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/linear%20actuator%20full%20range.jpg?raw=true "Test the servo to make sure you have the full range")


Make sure to test the full range of motion many times before proceeding. 
Wiggle the actuator and simulate what will happen when you get a bit of friction and resitance to make sure the actuator gears stay in alignment.
The actuator will stop working if something gets misaligned inside.

I found that every time I opened the linear actuator and put it back together I had to adjust the min and max slightly.
In the end, you probably do not need the fill minimum and maximum range to fire a dart.

### Relay

See a good guide for setting this up [here](http://www.susa.net/wordpress/2012/06/raspberry-pi-relay-using-gpio/)

Below is a wiring diagram from that post, just note that instead of AC power we are just controlling the 2 6V motors that propel the nerf dart:

![Relay Wiring](http://www.susa.net/wordpress/wp-content/uploads/2012/06/Relay-Sample.png "Schematic for a relay via GPIO on the Raspberry Pi")


### Wiring the gun

Now that the servo and relay are working, you need to permanently wire them to the gun.
Unfortunately I only had red, green, and black wire handy - it would have been helpful to have more colors.

I had to remove the motors and ran my wires down the original wire channel in the gun and out the trigger hole. See the _Assembled Photo_ below.


### Modifying the gun

If you have all the individual modules working above, the next step is fit the linear servo inside the gun.


You will need to trim some of the Rebelle gun plastic to make the linear servo fit inside. I used a Dremel tool to make this easy.

![Maxing the actuator fit](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/trim%20to%20fit%20actuator.png?raw=true "Trim some plastic from the gun to make the linear actuator fit")


Place the linear actuator inside and trim only what you need.
When you have a decent fit on this half of the gun, then try running the linear actuator continuously to ensure it does not get caught on anything.
I cut a little too much, so I used hot glue (see the last picture below) to properly seat everything, being careful to make sure the actuator could fully extend.


The actuator is too wide to fit inside the gun and maintain alignment, so next you will need to cut a square hole on the opposite cover. 
Start by cutting a piece of tape that is exactly the size of the box part of the servo that sticks out of the linear actuator.
Put the opposite gun cover on.

The tape should stick in the right place. Use this as a template to cut a hole.

![Cut a whole for the servo](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/servo%20hole%20template.jpg?raw=true "Use tape to make a template before cuttong a hole")


Lastly you should be able to put the entire gun back together.
Make sure you keep testing the linear actuator alignment.

#### Assembled photo without cover

![Nerf Gun wiring](https://github.com/chadwallacehart/rpi-auto-nerf-gun/blob/master/instruction_photos/nerf%20rebelle%20assembly.png?raw=true "Nerf Gun Assembly")


## Credits
* [Johnny-Five Project](http://johnny-five.io/) & [Nodebots](http://nodebots.io/)
* [Roger Rabbit](https://github.com/tscha70) for his outstanding [Linear Servo designs](https://github.com/tscha70/3DPrinterSTLFiles)

## Roadmap & To DO

- Make a video to better illustrate wiring & assembly
- Fix the linear servo piston head to mach the curved profile of the original piston head
- Investigate resizing the servo to better fit in the gun
- Use something other than j5's `servo.sweep` to see if it is possible to fire faster