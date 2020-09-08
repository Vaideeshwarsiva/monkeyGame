var monkey, monkeyRunning;
var bgImage, bg;
var stone, stoneImage, stoneGroup;
var banana, bananaImage, bananaGroup;
var ground;
var score = 0;

function preload() {
  monkeyRunning = loadAnimation('Monkey_01.png','Monkey_02.png','Monkey_03.png','Monkey_04.png','Monkey_05.png', 'Monkey_06.png', 'Monkey_07.png', 'Monkey_08.png', 'Monkey_09.png','Monkey_10.png');
  
  bgImage = loadImage('jungle2.jpg');
  stoneImage = loadImage('stone.png');
  bananaImage = loadImage('Banana.png')
}

function setup(){
   createCanvas(800,400);
   bg = createSprite(0,0,800,400);
   bg.addImage(bgImage);
   bg.scale = 1.5;
   bg.x = bg.width / 2;
   bg.velocityX = -4;
  
   monkey = createSprite(50,350,20,20);
   monkey.addAnimation('running', monkeyRunning);
   monkey.scale = 0.14;
  
   ground = createSprite(400,350,800,10);
   ground.x = ground.width / 2;
   ground.velocityX = -4;
   ground.visible = false;
  
   bananaGroup = new Group();
   stoneGroup = new Group();
}
function draw(){
   background("white");
   createEdgeSprites();
   
   if(bg.x < 0) {
     bg.x = bg.width/2;
   }
  
  if(ground.x < 0) {
     ground.x = ground.width/2;
   }
  
   if(keyDown("space")){
      monkey.velocityY = -10;
   }
   monkey.velocityY += 0.7;
   
   if(bananaGroup.isTouching(monkey)) {
       score = score + 2;
       bananaGroup.destroyEach();
   }
  
   switch (score) {
     case 10:
       monkey.scale = 0.16;
       break
     case 20:
       monkey.scale = 0.18;
       break;
     case 30:
       monkey.scale = 0.2;
       break;
       default:
         break;
   }
  
   if(monkey.isTouching(stoneGroup)) {
       monkey.scale = 0.05;
   }
  
   monkey.collide(ground);
   spawnBananas();
   spawnStones();
   drawSprites();
   
   textSize(20);
   fill("white");
   text("Score: " + score, 500,50);
   
}

function spawnBananas() {
  if(frameCount % 80 == 0) {
     banana = createSprite(200,200,20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.05;
     banana.y = random(170,200);
     banana.velocityX = -4;
     banana.lifetime = 200; 
     bananaGroup.add(banana);
  }
}

function spawnStones() {
  if(frameCount %  200 == 0) {
     stone = createSprite(350,350,20,20);
     stone.addImage(stoneImage);
     stone.scale = 0.1;
     stone.velocityX = -4;
     stone.lifetime = 200;
     stoneGroup.add(stone);
  }
}