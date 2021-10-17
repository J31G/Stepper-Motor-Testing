const { Stepper, board } = require('./modules/stepper');

const stepper1 = new Stepper(2, 5, 6400);

const speed = 1;            // LOWER BEING FASTER
const steps = 3200;         // AMOUNT OF STEPS TO MOVE
const waitBetween = 5000;   // AMOUNT OF TIME TO WAIT BETWEEN

board.on("ready", async () => {

  await stepper1.cw().move(speed, steps, waitBetween);
  await stepper1.ccw().move(speed, steps, waitBetween);

});