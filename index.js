const buttonColours = ['red', 'blue', 'green', 'yellow']
const gamePattern = [];
const userClickPattern = [];

let started = false;
let level = 0;
$(document).keydown(() => {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on('click', function () {
    const userChosenColour = $(this).attr("id")
    userClickPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over,Press Any Key to Restart")
        startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log($('#'+randomChosenColour))
    // console.log(randomNumber)
    // console.log(randomChosenColour)
    // console.log(document.querySelector('#'+randomChosenColour))
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    const audio = new Audio("/sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function playSound(name) {
    // const audio = new Audio("sounds/" + name + ".mp3");
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(() => { $('#' + currentColour).removeClass('pressed') }, 100);
}


