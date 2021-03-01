var tower,ghost,door,climber;
var towerImg,ghostImg,doorImg,climberImg;
var gameState= "PLAY";

function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  
  ghost = createSprite(250,300,20,20);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  
  edges = createEdgeSprites();
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background("white");
  
  if (gameState === "PLAY"){
  
  tower.velocityY = 4;
  
  if (tower.y > 600){
      tower.y = 300
      }
  
  if (keyDown("space")){
    ghost.velocityY = -10;
  }
  
  ghost.velocityY = ghost.velocityY+1; 
  ghost.collide(edges[3]);
  
  if (keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+4
  }
  
  if (keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-4
  }
    
  if (ghost.isTouching(climbersGroup)){
    ghost.velocityY=0;
  }
    
  if (ghost.isTouching(invisibleBlockGroup)){
    gameState = "END";
  }
    
  spawnDoors();
  
  drawSprites();
}
  else if(gameState === "END"){
    textSize(35);
    text("GAME OVER",200,300);
  }
  
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(random(120, 400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);

    var climber = createSprite(200, 10);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);


    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;




  }
}