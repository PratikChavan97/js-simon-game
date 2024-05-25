const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;

$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function (event) {
  if (event.key === " ") {
    nextSequence();
  } else {
    alert("Invalid Keypress");
  }
  // console.log(event.key);
});

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenNumber = buttonColors[randomNumber];
  gamePattern.push(randomChosenNumber);

  playSound(randomChosenNumber);
  $("#" + randomChosenNumber)
    .fadeOut(100)
    .fadeIn(100);

  $("h1").text("Level " + level);
  level++;
}

function playSound(name) {
  const audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    $("body").addClass("game-over");
    $("h1").text("Game Over");
    playSound("wrong");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
