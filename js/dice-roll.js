var diceCount = 6;
var diceCountScore = 0;
function die() {
  this.sides = [1,2,3,4,5,6];
}

die.prototype.roll = function() {
  var dieNumber = this.sides[Math.floor(Math.random() * this.sides.length)];
  return dieNumber;
}

die.prototype.diceRoll = function() {
  var newDiceRoll = [];
  var DiceRoll = [];
  for (var i = 0; i < diceCount; i++) {
    newDiceRoll.push(this.roll());
  }
  return DiceRoll;
}

// die.prototype.diceTest = function() {
//   var dice = this.diceRoll();
//   var badDice = false;
//   var outputDiceRoll = [];
//   for (var i = 0; i < dice.length; i++) {
//     if (! "15".includes(dice[i])){
//
//     } else {
//       badDice = true;
//     }
//   }
//   if (badDice = true) {
//     for (var i = 0; i < newDiceRoll.length; i++) {
//       if (newDiceRoll[i] === 1 || newDiceRoll[i] === 5) {
//       outputDiceRoll.push('<span class="die-box clickable git">' + newDiceRoll[i] + '</span>');
//     } else {
//       outputDiceRoll.push('<span class="die-box clickable">' + newDiceRoll[i] + '</span>');
//     }
//     }
//   }
//   if (badDice = false) {
//     return false;
//   } else {
//     return outputDiceRoll;
//   }
// }
