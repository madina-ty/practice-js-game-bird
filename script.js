var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/ground.png";
pipeUp.src = "img/pipe1.png";
pipeBottom.src = "img/pipe2.png";

// plus audio 
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio = "audio/score.mp3";

var gap = 90;

// click on btn 
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 25;
  fly.play();
}

// make blocks
var pipe = [];
pipe[0] = {
  x : canvas.width,
  y : 0
}

var score = 0;
// bird position
var xPos = 10;
var yPos = 150;
var grav = 1;


function draw() {
  ctx.drawImage(bg, 0, 0);  // Corrected method

  for(var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x --;

    if(pipe[i].x == 125) {
      pipe.push({
        x : canvas.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    if(xPos + bird.width >= pipe[i].x 
      && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeBottom.height
      || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
      || yPos + bird.height >= canvas.height - fg.height) {
        location.reload();
      }
      if(pipe[i].x == 5) {
        score++;
        score_audio.play();
      }
  }


  
  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, xPos, yPos); 

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Game score: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}


// Call draw after all images have loaded
pipeBottom.onload = function() {
  draw();
};
