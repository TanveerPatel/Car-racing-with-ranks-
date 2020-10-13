class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        // console.log(y);
        // console.log(allPlayers[plr].name);
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          fill("blue");
          stroke(5);
          ellipse(x,y,60,100);

          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        // if(allPlayers[plr].distance>=4200)
        //   form.reset.show();
        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

      if(allPlayers.player1.distance>= 4200 && allPlayers.player2.distance>= 4200
         && allPlayers.player3.distance>= 4200 && allPlayers.player4.distance>= 4200){
        
          form.reset.show();
        
          fill("red");
          textSize(20);
          text("Rank: "+allPlayers.player1.rank,cars[0].x-40,y-100);
          text("Rank: "+allPlayers.player2.rank,cars[1].x-40,y-100);
          text("Rank: "+allPlayers.player3.rank,cars[2].x-40,y-100);
          text("Rank: "+allPlayers.player4.rank,cars[3].x-40,y-100);
          text("Please refresh the page after clicking reset",displayWidth/3,y-300);
          if(allPlayers.player1.rank===1) {
            text(allPlayers.player1.name+" Wins!",displayWidth/2,y-200);
         
          }
          if(allPlayers.player2.rank===1) 
            text(allPlayers.player2.name+" Wins!",displayWidth/2,y-200);
          if(allPlayers.player3.rank===1) 
            text(allPlayers.player3.name+" Wins!",displayWidth/2,y-200);
          if(allPlayers.player4.rank===1) 
            text(allPlayers.player4.name+" Wins!",displayWidth/2,y-200);
        
        // console.log("Rank: "+allPlayers.player1.rank);  
      
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.distance<=4200){
      player.distance +=50
      player.update();
    }

    if(player.distance  === 4150){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      //console.log("Hi");
    }

    //console.log(player.distance);
   
    drawSprites();
  }

  end(){
    //console.log("Game Ended");
    game.update(2);
    
    //console.log(player.rank);

    // if()
    //form.reset.show();
  }
}
