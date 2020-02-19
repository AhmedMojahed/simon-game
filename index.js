var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(() => {
  if (!started) {
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});
$("body").on("tap", () => {
  if (!started) {
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  soundPlay(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);

  // $("#" + randomChosenColour)
  //   .fadeOut(50)
  //   .fadeIn(50);
  animatePress(randomChosenColour);

  soundPlay(randomChosenColour);
}

function soundPlay(colourId) {
  var audio = new Audio("sounds/" + colourId + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucsses");
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");
    soundPlay("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
  userClickedPattern = [];
  $("h1").text("Game Over, Press Any Key to Restart");
}
