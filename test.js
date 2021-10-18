const { Stepper, board } = require('./modules/stepper_new');

const stepper = new Stepper({
  stepPin: { X: 2, Y: 3 },
  dirPin: { X: 5, Y: 6 },
  stepsPerRev: { X: 3600, Y: 3600 }
});

board.on("ready", async () => {

  // Init stepper
  await stepper.init();

  // First letter
  await stepper
    .move({
      speed: { X: 0, Y: 0 },
      steps: { X: 3200 / 2, Y: 3200 },
      direction: { X: 'up', Y: 'right' },
      wait: 1000
    });

    stepper.location();

  // Second letter
  /* await stepper
    .move({
      speed: { X: 0, Y: 0 },
      steps: { X: 3200 / 2, Y: 3200 },
      direction: { X: 'down', Y: 'left' },
      wait: 5000
    }); */

});

