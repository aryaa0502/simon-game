var buttonColors = ["red", "blue", "green", "yellow"]; //all colors of buttons in the game

var gamePattern = []; //the sequence of colors that game flashes
var userClickedPattern = []; //the sequence of colors that user clicks

var started = false; //to use this variable for checking if the game has just restarted
var level = 0;

$(document).keypress(function(){ //to check for the keypress from user to restart the game
  if(!started){
    $("#level-title").text("Level" + level); //if the game has just started, change h1's text to level 0
    nextSequence(); //to let the game show next random sequence of numbers after game restarts
    started = true; //changing started to true so that this function doesn't get called in the middle of the game
  }                 //this function should only run ONCE, when level = 0, i.e., when game restarts
});

$(".btn").click(function(){ //to detect clicks on buttons from the user during the game

  var userChosenColour = $(this).attr("id"); //tracks the object that called this function and stores its id name in userChosenColor
  userClickedPattern.push(userChosenColour); //the pattern of colors that user clicks gets stored in the array userClickedPattern

  playSound(userChosenColour);// calls playSound() to make it play the corresponding sound for the button that user pressed
  animatePress(userChosenColour); //calls animatePress to add animation to buttons on user's click

  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ //to check whether last input from the user is same
                                                                      //as the last color in game pattern
    if(userClickedPattern.length === gamePattern.length){ //then we check if the ALL the previous colors have been pressed
                  //or not...i.e., counting the number of colors pressed..hence checking the length of userClickedPattern
      setTimeout(function(){ //once the user has entered correct pattern, next color is flashed..hence calling
        nextSequence();    //nextSequence() after a delay of 1000ms or 1 sec
      }, 1000);
    }
  }else{
    playSound("wrong");
    //In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.

    $("body").addClass("game-over");
    // In the styles.css file, there is a class called "game-over", apply this class to the body
    // of the website when the user gets one of the answers wrong

    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    // and then remove game-over class after 200 milliseconds.

    startOver();
    // Call startOver() if the user gets the sequence wrong.
  }
}


function nextSequence(){
  userClickedPattern = []; //reset userClickedPattern array

  level++; //level increments everytime a new random color flashes, which means the user got all the previous colors sequence right
            //so they go to the next level
  $("#level-title").text("Level " + level); //changes h1 to level 1 on first call after game restarts

  var randomNumber = Math.floor(Math.random()*4); //generates random no. between 0 to 3...to access the four button-Colors
                                                  //whuch are stored in an array called buttonColors with indices 0, 1, 2, 3
  var randomChosenColor = buttonColors[randomNumber]; //chooses on rand color using the index of buttonColors via generated randnum

  gamePattern.push(randomChosenColor); //the pattern of colors that game throws gets stored in the array gamePattern

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //to animate the buttons when game shows the pattern

  playSound(randomChosenColor); //to play corresponding sound for a button when game shows the pattern

}

function animatePress(currentColor){ //to add animation to buttons on user's click..gets called by $(".btn").click(function() and is
                            //passed userChosenColor
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
} //this function adds .pressed class styles to the userChosenColor button and then removes it after 100ms

function playSound(name){ //this function gets called by nextSequence() and $(".btn").click(function() and gets passed the name of
                      //the button that the game showed or the user clicked via randomChosenColor and userChosenColour
  var audio = new Audio("sounds/" + name + ".mp3"); //and it plays the corresponding sound
  audio.play();
}

function startOver(){
  // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  // while(gamePattern.length > 0){
  //   gamePattern.pop();}  OR
  gamePattern = [];
  started = false;

}
