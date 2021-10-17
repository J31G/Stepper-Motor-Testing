const { Board } = require("johnny-five");

const board = new Board();

module.exports.Stepper = class Stepper {
  constructor(stepPin, dirPin, stepsPerRev) {
    this.stepPin = stepPin;
    this.dirPin = dirPin;
    this.stepsPerRev = stepsPerRev;
  }
  cw() {
    board.pinMode(this.dirPin, board.MODES.OUTPUT);
    board.digitalWrite(this.dirPin, 0);
    return this;
  }

  ccw() {
    board.pinMode(this.dirPin, board.MODES.OUTPUT);
    board.digitalWrite(this.dirPin, 1);
    return this;
  }
  
  step(amount) {
    board.pinMode(this.stepPin, board.MODES.OUTPUT);

    // const step = this.stepsPerRev * ( amount || 1 );

    for (let index = 0; index < amount; index++) {
      board.digitalWrite(this.stepPin, board.pins[this.stepPin].value ? 0 : 1);
    }

    return this;
  }

  move(steps, delay, amount) {
    let amountCount = 0;
    const id = setInterval(() => runStepper(), delay);
  
    const runStepper = () => {
      if (amountCount == amount) return clearInterval(id);

      amountCount++;
      this.step(steps);
    }

    return this;
  }
}

module.exports.board = board;
