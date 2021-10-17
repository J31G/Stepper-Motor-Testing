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

  move(delay, steps, wait) {

    const running = new Promise((resolve) => {
      let amountCount = 0;
      const id = setInterval(() => runStepper(), delay);
  
      const runStepper = () => {
        if (amountCount == steps) {
          clearInterval(id);
          setTimeout(() => { return resolve(this); }, wait);
        }
        console.log(amountCount);
        amountCount++;
        this.step(2);
      }
    });

    return running;
  }

}

module.exports.board = board;
