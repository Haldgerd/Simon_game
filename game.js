//alert("This is Simon game!")  //check if jquery is working.


//variables

var buttonColors = ["red", "blue", "yellow", "green"];

var gamePattern = [];           // buttons chosen randomly by computer.
var userClickedPattern = [];    // buttons pressed by the user.

var startGame = false;
var level = 1;


//functions

function nextSequence() {      //stands for an integer number. Game pattern sequence!
  
  $("#paragraph").text("Level " + level);  

  var randomNumber = Math.floor(Math.random() * 4);   //raandomly generates a number between 0 and 3. Represents index!
  var randomChosenColor = buttonColors[randomNumber];  //number is treated as index number. Result is a color from the buttomColor list.
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);  //Chosing a button with id equal to color stored in randomChosenColor. Animation on id = "color of the button".
  playAudio(randomChosenColor);                          //Play corresponding sound as defined in playAudio function.
  
  level++;
}

//IMPORTANT NOTE ON PLAY AUDIO:
// New versions of Google Chrome have sound automatically disabled when page is loaded (usually not the best practice for a sound to start automatically/ UX bad.).
// To ALLOW the page to play the sound on load, change Chrome sound setting. You must add your page URL among "ALLOW" files, 
// which activates sounds to be played when page is loaded.
function playAudio(name) {                           //plays audio for selected button either useer pressed button or randomly chosen button by computer.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animtion added when USER presses a button.
function animatePress(currentColor) {                //currentColor will be replaced with currenty pressed button -it's "id" attribute which refers to color.
    $("#" + currentColor).addClass("pressed");      //adding new class

    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed"); //removing a class after 3 miliseconds.
    }, 300);
  };

function checkAnwser(currentLevel) {
  //var lastItem = gamePattern[gamePattern.length - 1];

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    //console.log("Sucess prick, you're winner!");
    if (currentLevel == gamePattern.length - 1) {
      userClickedPattern = [];
      setTimeout(function(){
        nextSequence();
      }, 2000);
    }
  } else {
    //console.log("You fuckin' asshole!");
    wrongAnswer();
    restart();
  }
}

function wrongAnswer() {
  //adds functionality - changes to css/HTML in case of a wrong anwser.
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();

  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  }, 300);
  $("#paragraph").text("Game Over, press any key to Restart...");
}

// resets the game variable values.
function restart() {
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  startGame = false;
  //console.log("restarted");
}

//MAIN SECTION
//Game code

$(document).keypress(function() {
  if (!startGame) {
    nextSequence();
    startGame = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");  //this equals to object pressed/object that triggered the event.
  // attr returns the value of specified attribute. In this case returns the value of id attribute of button that was clicked.
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playAudio(userChosenColor);
  animatePress(userChosenColor);

  checkAnwser(userClickedPattern.length - 1);  //passing index number (0, 1, 2....) of element in the array
});