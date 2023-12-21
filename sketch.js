var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var obstacleTop, obsTop1, obsTop2;
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;
var gameState = "play"

function preload() {
    bgImg = loadImage("assets/bg.png");
    balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");

    obsTop1 = loadImage("assets/obsTop1.png");
    obsTop2 = loadImage("assets/obsTop2.png");

    obsBottom1 = loadImage("assets/obsBottom1.png");
    obsBottom2 = loadImage("assets/obsBottom2.png");
    obsBottom3 = loadImage("assets/obsBottom3.png");

    dieSound = loadSound ("assets/die.mp3");
    gameOverImg = loadImage ("assets/gameOver.png");
    jumpSound = loadSound ("assets/jump.mp3");
    restartImg = loadImage ("assets/restart.png");
}

function setup(){
    bg= createSprite(165,485,1,1);
    bg.addImage(bgImg);
    bg.scale = 1.3;

    bottomGround= createSprite(200,390,800,20);
    bottomGround.visible = false;

    gameOver = createSprite(200,150,300,20);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    restart = createSprite(200,200,400,30);
    restart.addImage(restartImg);
    restart.visible = false;

    topGround= createSprite(200,10,800,20);
    topGround.visible = false;

    balloon = createSprite(100,200,20,50);
    balloon.addAnimation("balloon",balloonImg);
    balloon.scale = 0.2;

    obstacleGroup = new Group()
    obstacleTopGroup = new Group()
}

function draw(){
    background("black");
    if (gameState === "play"){
        if(keyDown("space")) {
            balloon.velocityY = -10;
          }
        
    balloon.velocityY = balloon.velocityY + 2; 
           Bar();
           spawnObstacleBottom();
           spawnObstacleTop();
           if (balloon.isTouching(obstacleGroup)){
            gameState = "end";
           } 
    }

        else if (gameState === "end"){
            balloon.velocityY = 0
            gameOver.visible = true
            restart.visible = true
            obstacleGroup.setVelocityXEach(0)
            obstacleTopGroup.setVelocityXEach(0)
            obstacleTopGroup.setLifetimeEach(-1)
            obstacleBottomGroup.setLifetimeEach(-1)
        }   
       balloon.collide(bottomGround)
    drawSprites();
}

function spawnObstacleTop(){
    if(World.frameCount % 60 == 0){
       obstacleTop = createSprite(400, 50, 40, 50);
       obstacleTop.scale = 0.1;
       obstacleTop.velocityX = -4;
       obstacleTop.y = Math.round(random(10,100));
       var rand = Math.round(random(1,2));
 
       switch(rand){
        case 1 : obstacleTop.addImage(obsTop1);
                    break;
        case 2 : obstacleTop.addImage(obsTop2);
                    break;
        default : break;
       }

       obstacleTop.lifetime = 100;
       balloon.depth = balloon.depth+1;
       obstacleTopGroup.add(obstacleTop);

    }

}

function Bar (){
    if(World.frameCount % 60 == 0){
        var bar = createSprite(400,200,10,100);
        bar.velocityX = -6;
        bar.depth = balloon.depth;
        bar.lifetime = 70;
        bar.visible = false;
    }
}

function spawnObstacleBottom (){
        if(World.frameCount % 60 == 0){
           obstacle = createSprite(400, 310, 40, 50);
           obstacle.scale = 0.1;
           obstacle.velocityX = -4;
           var rand = Math.round(random(1,2));
     
           switch(rand){
            case 1 : obstacle.addImage(obsBottom1);
                        break;
            case 2 : obstacle.addImage(obsBottom2);
                        break;
            case 3 : obstacle.addImage(obsBottom3);
            default : break;
           }
    
           obstacle.lifetime = 100;
           balloon.depth = balloon.depth+1;
           obstacleGroup.add(obstacle)
        }
    
    }