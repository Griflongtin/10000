function Player(name, number) {
  this.playerName = name;
  this.playerScore = 0;
  this.playerNumber = number;
}

Player.prototype.hold = function() {
  this.playerScore += diceCountScore;
}

Player.prototype.checkForWin = function() {
  var win = false;
  if (this.playerScore >= 10000) {
    win = true;
  }
  return win;
}

Player.prototype.resetScorePlayer = function() {
  this.turnScore = 0;
  this.playerScore = 0;
}

var whichTurn = function(player1, player2, turns) {
  if (turns % 2 === 0) {
    return player2;
  } else {
    return player1;
  }
}
