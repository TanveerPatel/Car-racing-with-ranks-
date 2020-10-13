class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');

    this.reset = createButton("RESET");
    
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  show() {
    // this.greeting.show();
    this.button.show();
    this.input.show();
    this.title.show();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.button.style("width","100px");
    this.button.style("height","50px");
    // this.button.style.width = "100px";
    // this.button.style.height = "100px";

    this.reset.position(displayWidth/3,displayHeight/4);
    this.reset.style("width","100px");
    this.reset.style("height","50px");
    this.reset.hide();

    this.reset.mousePressed(() =>{
      player.updateCount(0);
      game.update(0);
      
      database.ref("/").update({
        "CarsAtEnd": 0
      })

      form.show();
      this.reset.hide();

      background(255);

      car1.visible = false;
      car2.visible = false;
      car3.visible = false;
      car4.visible = false;x``
      // form.display();
    })

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

  }
}
