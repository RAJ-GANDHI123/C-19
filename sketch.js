var tower, towerImg;
var door, doorImg, doorG;
var climber, climberImg, climberG;
var ghost, ghostImg;
var invB, invBG;
var gameState = "play";
var score;

function preload () {
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}


function setup () {
  
  createCanvas (600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorG = new Group();
  climberG = new Group();
  invBG = new Group();
  score = 0;
}
  
  
function draw () {
  
  background(0);
  
  if ( gameState === "play") {
    
    if( keyDown('left_arrow')) {
    ghost.x = ghost.x - 3
  }
  
  if( keyDown('right_arrow')) {
    ghost.x = ghost.x + 3
  }
  
  
  if( keyDown('space')) {
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
    
  if ( tower.y > 400) {
    tower.y = 300;
  }
    
   if (climberG.isTouching (ghost)) {
      ghost.velocityY = 0;
      
} 
    
    
    if (invBG.isTouching(ghost) || ghost.y > 600) {
    
    ghost.destroy();
    gameState = "end";
    }
    
    score = score + Math.round(getFrameRate()/60);
    
  spawnDoors();
  drawSprites();
  fill("red");  
  text("score-" + score,tower.width/2,tower.height/2 - 50)  
  }
  
  if (gameState === "end") {
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER", 230,250)
    
    spookySound.stop();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
}
  
function spawnDoors() {
  if (frameCount%240 === 0) {
    var door = createSprite(200,-50)
    door.addImage("door",doorImg);
    
    var climber = createSprite(200,10)
    climber.addImage("dclimber",climberImg);
    
    var invB = createSprite (200,15);
    invB.width = climber.width;
    invB.height = 2;
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    invB.x = door.x;
    invB.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    
    
    
    door.lifetime = 800;
    doorG.add(door);
    
    climber.lifetime = 800;
    climberG.add(climber);
    
    invB.lifetime = 800;
    invBG.add(invB);
    invB.debug = true;
  }
  
  
  
}


  