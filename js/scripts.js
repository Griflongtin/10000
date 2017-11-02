var diceCountScore = 0;

function die() {
  this.sides = [1,2,3,4,5,6];
  this.diceCount = 6;
}

function Player(name, number) {
  this.playerName = name;
  this.playerScore = 0;
  this.playerNumber = number;
}

Player.prototype.hold = function() {
  debugger
  this.playerScore += diceCountScore;
}

Player.prototype.checkForWin = function() {
  var win = false;
  if (this.playerScore >= 1000) {
    win = true;
  }
  return win;
}

var whichTurn = function(player1, player2, turns) {
  if (turns % 2 === 0) {
    return player2;
  } else {
    return player1;
  }
}

die.prototype.roll = function() {
  var dieNumber = this.sides[Math.floor(Math.random() * this.sides.length)];
  return dieNumber;
}

die.prototype.diceRoll = function() {
  var newDiceRoll = [];
  for (var i = 0; i < this.diceCount; i++) {
    newDiceRoll.push(this.roll());
  }
  return newDiceRoll;
}

die.prototype.resetScoreDie = function() {
  this.diceCount = 6;
  diceCountScore = 0;
}

die.prototype.testRoll = function(roll) {
  for (var i = 0; i < roll.length; i++) {
    if ("15".includes(roll[i])) {
      return true;
    }
  }
  return false;
}

die.prototype.addChosenDice = function(numbers) {
  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] === 1) {
      diceCountScore += 100;
    } else if (numbers[i] === 5) {
      diceCountScore += 50;
    }
    this.diceCount += -1;
  }
  if (this.diceCount === 0) {
    this.diceCount = 6;
  }
}

$(function() {
  $('form#user-input-page').submit(function(event) {
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

      $(this).trigger('reset');
      $('#turn-player-name').text(player1Name);


      $('button#roll-button').click(function() {
        var roll = dice.diceRoll();
        if (dice.testRoll(roll) === false) {
          $('#dice-output').empty();
          dice.resetScoreDie();
          turnCount++;
          turnPlayer = whichTurn(player1, player2, turnCount);
          $('#turn-player-name').text(turnPlayer.playerName);
        } else {
          $('button#roll-button').hide();
          $('button#dice-submit-button').show();
          var turnPlayer = whichTurn(player1, player2, turnCount);
          for (var i = 0; i < roll.length; i++) {
            $('#dice-output').append('<div class="form-check form-check-inline"><label class="form-check-label"><input class="form-check-input" name="die-check" type="checkbox" value="' + roll[i] + '">' + roll[i] + '</input></label></div>');
          }
        }
      });
    } else {
      alert('Please enter a unique name for each player!');
    }

    $('form#dice-submit-form').submit(function(event) {
      event.preventDefault();
      var diceChosen = [];
      $("input:checkbox[name=die-check]:checked").each(function() {
        diceChosen.push(parseInt($(this).val()));
      });
      dice.addChosenDice(diceChosen);
      $('.dice-count-score').html(diceCountScore);
      $('#dice-output').empty();
      $('button#roll-button').show();
      $('button#dice-submit-button').hide();
    });

    $('button#hold-button').click(function() {
      var turnPlayer = whichTurn(player1, player2, turnCount);
      turnPlayer.hold();
      console.log(turnPlayer.playerScore);
      console.log(diceCountScore);
      $('#player' + turnPlayer.playerNumber + ' .playerscore').html(turnPlayer.playerScore);

      if (turnPlayer.checkForWin()) {
        alert(turnPlayer.playerName + ' you won!');
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
