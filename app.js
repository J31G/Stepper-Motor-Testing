const { Stepper, board } = require('./modules/stepper');

const stepperX = new Stepper(2, 5, 3200);
const stepperY = new Stepper(3, 6, 3200);

// X = 11.6
// Y = 7.1

// X = 5.8
// Y = 3.55

const speed = 1;            // LOWER BEING FASTER
const stepsX = stepperX.stepsPerRev * 5.8;  // AMOUNT OF STEPS TO MOVE
const stepsY = stepperY.stepsPerRev * 3.56;
const waitBetween = 5000;   // AMOUNT OF TIME TO WAIT BETWEEN

// X: (LEFT/RIGHT) = CW: RIGHT, CCW: LEFT
// Y: TOP/BOTTOM) = CW: DOWN, CCW: TOP

board.on("ready", async () => {

  stepperY.ccw().move(speed, stepsY / 2, waitBetween);
  stepperX.ccw().move(speed, stepsX / 2, waitBetween);

});