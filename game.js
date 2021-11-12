const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
const randColour = function () {
  let number = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  return buttonColors[number];
};
let randomChosenColour = randColour();
let keyPressed = [];
let level = 0;
let checkGameOver = false;

//js function to play selected sound
const playSound = function (color) {
  const chooseAu = new Audio(`sounds/${color}.mp3`);
  chooseAu.play();
};

//j-query function to flash tiles
const flash = function (e) {
  $(e).fadeTo(100, 0.3, function () {
    $(e).fadeTo(500, 1.0);
  });
};

//random tile select func
const nextSequence = function (link, colour) {
  $("h1").html(`level ${level}`);
  flash(link);
  playSound(colour);
};

//game over highlight func
const animatePress = function (currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function () {
    $(currentColour).removeClass("pressed");
  }, 100);
};

const gameOver = function () {
  $("h1").html(`Game Over <br> <small> press any key to restart </small>`);

  //clearing store game pattern after game over
  gamePattern.splice(0, gamePattern.length);
  userClickedPattern.splice(0, userClickedPattern.length);
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  //changing  game over status
  checkGameOver = true;

  //resetting the level after game over
  level = 0;
};

$(document).keypress(function (e) {
  const pressedKey = e.key;

  if (keyPressed.length === 0 || checkGameOver) {
    $("h1").html(`level ${level}`);
    gamePattern.push(randomChosenColour);
    nextSequence(`.${randomChosenColour}`, randomChosenColour);
    checkGameOver = false;
  }
  keyPressed.push(pressedKey);
});

$(`.btn`).click(function (e) {
  //condition to allow for multiple key presses
  if (keyPressed.length === 0 || checkGameOver) return;
  let userChosenColour = this.id;

  //add userchosen color to userclicked pattern
  userClickedPattern.push(userChosenColour);
  nextSequence(this, userChosenColour);
  animatePress(this);

  //condition to prevent clicks responding after game over
  if (!(userClickedPattern.length === gamePattern.length)) return;

  //condition to check if clicked pattern is correct

  if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
    let nextColour = randColour();
    gamePattern.push(nextColour);

    //delayed looping through the colours
    setTimeout(function () {
      gamePattern.forEach((colour, i) => {
        setTimeout(() => {
          nextSequence(`.${colour}`, colour);
        }, i * 500);
      });
    }, 500);
    level++;
  } else {
    gameOver();
  }
  console.log(userClickedPattern);

  //clearing stored clicks to restart
  userClickedPattern.splice(0, userClickedPattern.length);
  console.log(gamePattern);
});
