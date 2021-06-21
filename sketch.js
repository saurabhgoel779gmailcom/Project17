var monkey , monkey_running, monkey_collided;
var bananaImage, obstacleImage;
var score, background, backgroundimg, invisibleGround, ground;
var BananaGrp, ObstacleGrp, SurvivalTime=0;
var PLAY=1, END=0, score=0;
var gameState=1;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png"); 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundimg = loadImage("background.jpg");
  monkey_collided = loadAnimation("sprite_1.png")
}



function setup() {
  
  createCanvas(600, 300);
  
  ground = createSprite(0,0,600,600);
  ground.addImage(backgroundimg);
  
  background = createSprite(0,0,600,600);
  background.addImage(backgroundimg);
  
  monkey = createSprite(100,125,160,100);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale=0.13;
  
  invisibleGround = createSprite(200,165,400,10);
  invisibleGround.visible = false;
  
  BananaGrp = new Group();
  ObstacleGrp = new Group();
  gameState=PLAY;
}


function draw() {

  background.velocityX = -5;
  
  if (background.x < 0){
      background.x = background.width/2;
    }
  
  if(gameState===PLAY){
  
  if(keyDown("space") && monkey.collide(invisibleGround)){
    monkey.velocityY=-9;
  }
    
  monkey.changeAnimation("running", monkey_running);
  monkey.velocityY = monkey.velocityY+0.5;
  monkey.collide(invisibleGround); 
    
    if (World.frameCount % 100 == 0) {
      banana();
    }
    
    if (World.frameCount % 300 == 0) {
      obstacle();
    }
    
    if(monkey.isTouching(BananaGrp)){
      BananaGrp.destroyEach();
      score=score+1;
    }
    
    SurvivalTime=Math.ceil(frameCount/frameRate());
  }
  
  if(ObstacleGrp.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstacleGrp.setVelocityXEach(0);
    BananaGrp.setVelocityXEach(0);
    gameState=END;
  }
  
  if(gameState===END){
    background.velocityX=0;
    monkey.changeAnimation("collided", monkey_collided);
  }
  
  drawSprites();
  stroke("black");
  textSize(15);
  fill("black");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  text("Survival Time: "+SurvivalTime,450,200);
  
  function banana(){
  var banana = createSprite(Math.round(random(150,400)),40, 10,10);
  banana.addImage(bananaImage);
  banana.velocityX = -5;
  banana.lifetime = -1;
  banana.scale=0.1;
  BananaGrp.add(banana);
  return banana;
  }
  
  function obstacle(){
  var obstacle = createSprite(Math.round(random(200,600)),145,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -5;
  obstacle.lifetime = -1;
  obstacle.scale=0.1;
  ObstacleGrp.add(obstacle);
  return obstacle;
  }
  
}