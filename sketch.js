var path, boy, cash, diamonds, jwellery, sword, end;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, endImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 8;


  //creating boy running
  boy = createSprite(70, height-580, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  end = createSprite(200, 300)
  end.scale = 0.5
  end.visible=false
  

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX || touches.length>0 
    touches=[]

    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > 400) {
      path.y = height / 2;
    }


    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
      
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
       treasureCollection = treasureCollection + 150;


    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
 treasureCollection = treasureCollection + 100;

    } else if (swordGroup.isTouching(boy)){
        end.addImage(endImg)
        gameState=END
      cashG.destroyEach()
      cashG.setVelocityEach(0)
      diamondsG.destroyEach()
     diamondsG.setVelocityEach(0)
      jwelleryG.destroyEach()
      jwelleryG.setVelocityEach(0)
      boy.visible=false
      swordGroup.visible=false
    }
        
        
    

    if (gameState === END) {
      end.visible=true
      boy.velocityY=0
      path.velocityY=0
    }
    
    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: " + treasureCollection, 150, 30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.setCollider("circle",-9,-9,10)
    cash.scale = 0.12;
    cash.velocityY = 8;
    cash.lifetime = 210;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.setCollider("circle",-9,-9,10)
    diamonds.scale = 0.03;
    diamonds.velocityY = 10;
    diamonds.lifetime = 210;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.setCollider("circle",-9,-9,10)
    jwellery.scale = 0.1;
    jwellery.velocityY = 10;
    jwellery.lifetime = 210;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.setCollider("circle",-9,-9,10)
    sword.scale = 0.1;
    sword.velocityY = 12;
    sword.lifetime = 210;
    swordGroup.add(sword);
  }
}