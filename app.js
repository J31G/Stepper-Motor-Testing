const { Stepper, board } = require('./modules/stepper');

const stepper1 = new Stepper(2, 5, 6400);

board.on("ready", () => {

  // stepper1.cw().move(64, 100, 100);

  const amountTakesToLetter = 6400;
  const delay = 500;
  const example = delay / 50;

  stepper1.cw().move(amountTakesToLetter / example, delay, example);

});