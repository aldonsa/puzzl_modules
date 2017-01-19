import PIXI from 'pixi.js';
export default class MenuScene {


  constructor() {
    this._onMenuCallback = function(){};
    let ww = 100;
    let hh = 100;

    this.background = new PIXI.Graphics();
    this.background.lineStyle(2, 0x0000FF, 1);
    this.background.beginFill(0x1b7b89, 1);
    this.background.drawRect(50, 0, 300, 300);

    this.startBtn = new PIXI.Graphics();
    this.startBtn.beginFill(0xa38f33, 1);
    this.startBtn.drawRect(100, 250, 100, 50);
    this.startBtn.interactive=true;
    this.btnText = new PIXI.Text('START');
    this.btnText.x=100;
    this.btnText.y=250;
    this.btnText.fontSize="14px";
    this.startBtn.addChild(this.btnText);
    this.background.addChild(this.startBtn)

    this.timerCheck=new PIXI.Graphics();

    this.timerCheck.beginFill(0x2a924a, 1);
    this.timerCheck.drawRect(50, 0, 50, 50);
    this.timerCheck.interactive=true;
    this.background.addChild(this.timerCheck);

    this.initialPictCheck=new PIXI.Graphics();
    this.initialPictCheck.beginFill(0xd017fe, 1);
    this.initialPictCheck.drawRect(50, 100, 50, 50);
    this.initialPictCheck.interactive=true;
    this.background.addChild(this.initialPictCheck);


    this.startBtn.on("click", this.init.bind(this));
    this.timerCheck.on("click", this.timerOn.bind(this));
    this.initialPictCheck.on("click", this.pictOn.bind(this));
    this.isSetted=false;
    this.timerSet =false;
    this.pictureSet =false;



  }

  init() {
    console.log("menu click!")
    this.isSetted=true;

    if(this.isSetted){
      this._onMenuCallback();

    }



    }

  timerOn() {

      console.log("timerOn")
      this.timerSet=true;
      console.log(this.timerSet)



  }

  pictOn() {
    console.log("pictOn")
    this.pictureSet =true;
    return true;

  }







  startGame(callback){
    console.log("startGame")

    if(callback){


      this._onMenuCallback = callback;
    }




  }
}