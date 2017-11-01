//business logic
//player object
function player(name, number) {
  this.playerName = name;
  this.turnScore = 0;
  this.playerScore = 0;
  this.playerNumber = number;
}
player.prototype.hold = function () {
  this.playerScore += this.turnScore;
  this.turnScore = 0;
}
player.prototype.checkFirWin = function () {
    var win = false;
    if(this.playerScore >= 100) {
      win = true;
    }
    return win;
}


function die() {
  this.sides = [1,2,3,4,5,6];
}

die.prototype.roll = function (player) {
  var rolledSide = this.sides[Math.floor(Math.random() * this.sides.length)];
  if (rolledSide == 1) {
    player.turnScore = 0;
  } else {
    player.turnScore += rolledSide;
  }
  return rolledSide;
};
