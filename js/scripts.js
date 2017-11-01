//business logic
//object containing data regarding each player
var diceCount = 6;
var diceCountScore = 0;
function Player(name, number) {
  this.playerName = name;
  this.playerScore = 0;
  this.playerNumber = number;
}

//ends the current Player's turn and adds their turn score to their total score
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

Player.prototype.resetScore = function() {
  this.turnScore = 0;
  this.playerScore = 0;
}














//object representing a six-sided die
function die() {
  this.sides = [1,2,3,4,5,6];
}

/* returns a random number from 1-6, simulating the roll of a die.
   takes a Player object as an argument and manipulates the turnScore key according to the number 'rolled' */


die.prototype.roll = function() {
  var die = this.sides[Math.floor(Math.random() * this.sides.length)];
  return die;
}
die.prototype.diceRoll = function() {
  var newDiceRoll = [];
  for (var i = 0; i < diceCount; i++) {
    newDiceRoll.push(this.roll());
  }
  return newDiceRoll;
}














//returns who the turn player is based on how many turns have passed
var whichTurn = function(player1, player2, turns) {
  if (turns % 2 === 0) {
    return player2;
  } else {
    return player1;
  }
}


//ui logic
$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var player1Name = $('input#player1name').val(),
        player2Name = $('input#player2name').val(),
        player1 = new Player(player1Name, 1),
        player2 = new Player(player2Name, 2),
        dice = new die(),
        turnCount = 1;

    if (player1Name && player2Name && player1Name !== player2Name) {
      $(this).hide();
      $('#game').show();
      $("#name1").text(player1Name);
      $('#name2').text(player2Name);
      //reset the form and display player1 as turn player
      $(this).trigger('reset');
      $('#turn-player-name').text(player1Name);


      $('button#roll-button').click(function() {
        //determine the turn Player (will be an object),
        var turnPlayer = whichTurn(player1, player2, turnCount);

        //get a random number 1-6
        var roll = dice.diceRoll();
        alert(roll);

        //insert current game info (dice roll/turn score/total score) into the div of the current player (1 or 2)
        $('#player' + turnPlayer.playerNumber + ' .die-roll').html(roll);
        $('#player' + turnPlayer.playerNumber + ' .turnscore').html(turnPlayer.turnScore);

        //if a 1 was rolled, increment the turn count and display the new turn player
        if (turnPlayer.turnScore === 0) {
          turnCount++;
          turnPlayer = whichTurn(player1, player2, turnCount);
          $('#turn-player-name').text(turnPlayer.playerName);
        }
      });
    } else {
      alert('Please enter a unique name for each player!');
    }


    $('button#hold-button').click(function() {
      var turnPlayer = whichTurn(player1, player2, turnCount);
      turnPlayer.hold();
      $('#player' + turnPlayer.playerNumber + ' .die-roll').html(0);
      $('#player' + turnPlayer.playerNumber + ' .turnscore').html(turnPlayer.turnScore);

      if (turnPlayer.checkForWin()) {
        alert(turnPlayer.playerName + ' you won!' );
        player1.resetScore();
        player2.resetScore();
        turnCount = 1;
        $('.die-roll, .turnscore, .playerscore').empty();
        $('#turn-player-name').text(player1.playerName);
      } else {
        $('#player' + turnPlayer.playerNumber + ' .playerscore').html(turnPlayer.playerScore);
        turnCount++;
        turnPlayer = whichTurn(player1, player2, turnCount);
        $('#turn-player-name').text(turnPlayer.playerName);
      }
    });
  });
});
