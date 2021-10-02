//alert("working");
//$("h1").text("hello");
var buttonColours=["red","blue","green","yellow"] ;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level= 0;

// alert("Yes");

$(document).keypress(function() {
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }    
});

$(".btn").click( function() {
var userChosenColour= $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
});

/*8*/
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
/*9*/    else{
        //console.log("failure");
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

/*1*/
function nextSequence(){
    userClickedPattern = []; //i have done big mistake here
    level++;
    $("#level-title").text("Level "+level);
    var rn=Math.floor(Math.random() * 4);
    
    var randomChosenColour= buttonColours[rn];
    
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
s
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
    }, 100);
}

/*10*/
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
