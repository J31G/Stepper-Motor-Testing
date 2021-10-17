const { Board } = require("johnny-five");

const board = new Board();

module.exports.Stepper = class Stepper {
  constructor(config) {
    this.config = config;
  }

  init() {
    // Set step and dir pins to output
    board.pinMode(this?.config?.stepPin?.X, board.MODES.OUTPUT);
    board.pinMode(this?.config?.stepPin?.Y, board.MODES.OUTPUT);
    board.pinMode(this?.config?.dirPin?.X, board.MODES.OUTPUT);
    board.pinMode(this?.config?.dirPin?.Y, board.MODES.OUTPUT);

    return this;
  }

  step(amount) {
    // X
    for (let i = 0; i < amount?.X; i++) {
      board.digitalWrite(this?.config?.stepPin?.X, board.pins[this?.config?.stepPin?.X].value ? 0 : 1);
    }
    // Y
    for (let j = 0; j < amount?.Y; j++) {
      board.digitalWrite(this?.config?.stepPin?.Y, board.pins[this?.config?.stepPin?.Y].value ? 0 : 1);
    }

    return this;
  }

  move(options) {
    // Log out
    console.log(`Speed: [X: ${options?.speed?.X}], [Y: ${options?.speed?.Y}]`);
    console.log(`Steps: [X: ${options?.steps?.X}], [Y: ${options?.steps?.Y}]`);
    console.log(`Direction: [X: ${options?.direction?.X}], [Y: ${options?.direction?.Y}]`);
    console.log(`Wait after letter: ${options?.wait}ms`);

    // Set direction
    board.digitalWrite(this?.config?.dirPin?.X, options?.direction?.X == 'up' ? 1 : 0);
    board.digitalWrite(this?.config?.dirPin?.Y, options?.direction?.Y == 'left' ? 1 : 0);
    
    const stepperX = new Promise((resolve) => {
      let stepCount = 0;
      const id = setInterval(() => runStepper(), options?.speed?.X);

      const runStepper = () => {
        if (stepCount === options?.steps?.X) {
          clearInterval(id);
          setTimeout(() => { return resolve(this); }, options?.wait);
        }

        // Step the stepper
        this.step({X: 2});

        // TEMP: Log out which step we are on
        console.log(`X: ${stepCount}`);

        // Increase out count
        stepCount++;
      }
    });

    const stepperY = new Promise((resolve) => {
      let stepCount = 0;
      const id = setInterval(() => runStepper(), options?.speed?.Y);

      const runStepper = () => {
        if (stepCount === options?.steps?.Y) {
          clearInterval(id);
          setTimeout(() => { return resolve(this); }, options?.wait);
        }

        // Step the stepper
        this.step({Y: 2});

        // TEMP: Log out which step we are on
        console.log(`Y: ${stepCount}`);

        // Increase out count
        stepCount++;
      }
    });
    
    return stepperX, stepperY;
  }
}

// Export out board so we can use it in other files
module.exports.board = board;