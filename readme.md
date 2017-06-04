# Automatic Nerf Gun using a Rapsberry Pi

What you'll need:
* Nerf Revelle Rapid Red Blaster - <$12 on [Amazon](https://www.amazon.com/Nerf-Rebelle-Rapid-Red-Blaster/dp/B00INZO30M/ref=sr_1_2?s=toys-and-games&ie=UTF8&qid=1496580017&sr=1-2&keywords=nerf+rebelle)
* Raspberry Pi with one of the PCM GPIO pins available
* A 9g servo - like [these](https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dtoys-and-games&field-keywords=9g+servo)
* Relay switch for the Raspberry Pi - I have an odd setup from an existing project so I don't discuss this
* Access to a 3D Printer - you can use an online service
* Some 18 to 22 guage wire
* Some aligator clips, appropriate jumper pins or a breakout board for the Pi

## Software

## Installation

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

### Servo
See Adafruit's [guide](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-8-using-a-servo-motor/hardware) for hot to set this up.

Note on powering - Adafruit shows an external power supply, seperate from the Raspberry Pi's. You shoud do this! I was able to do some tests powering directly from the Pi's 5V supply, but it was inconsistent and I wasn't being too safe. You can power the servo from your gun. Just put the 

### Linear Actuator

See the [video](https://www.youtube.com/watch?v=qBHvMHJEG-M&t=1s) from Roger Rabbit of this in action.

### Modifying the gun

MORE COMING SOON
README IS A WORK IN PROGRESS

## Credits
* [Johnny-Five Project](http://johnny-five.io/) & [Nodebots](http://nodebots.io/)
* [Roger Rabbit](https://github.com/tscha70) for his outstanding [Linear Servo designs](https://github.com/tscha70/3DPrinterSTLFiles)