const { Stepper, board } = require('./modules/stepper_new');

const stepper = new Stepper({
  stepPin: { X: 2, Y: 3 },
  dirPin: { X: 5, Y: 6 },
  stepsPerRev: { X: 3600, Y: 3600 }
});

board.on("ready", async () => {
  await stepper
    .init()
    .move({
      speed: { X: 1, Y: 1 },
      steps: { X: 3200 / 2, Y: 3200 },
      direction: { X: 'up', Y: 'left' },
      wait: 1000
    })
  await stepper
    .move({
      speed: { X: 1, Y: 2 },
      steps: { X: 3200 / 2, Y: 3200 },
      direction: { X: 'down', Y: 'right' },
      wait: 5000
    });

});

