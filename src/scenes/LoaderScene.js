import PIXI from 'pixi.js';



export default class LoaderScene {



  constructor(){
    // this.loader = PIXI.loader;
    // this.loader.add("./assets/pict.png");
    // this.isStarted = false;
    // this.allLoaded = false;
    // this.progress = 5;
    //
    //
    // //loadBar
    // this.loadBar = new PIXI.Graphics();
    // this.drawBar(0.2);
    this._onLoadCallback = function(){};
    this.isLoaded = false;

    this.Myloader = PIXI.loader;
    this.introScreenContainer= new PIXI.Container();
    this.loadBarContainer = new PIXI.Container(513,8);
    this.loadBarTexture = PIXI.Texture.fromImage("./assets/progress_02.png");
    this.loadBar = new PIXI.Sprite(this.loadBarTexture);

    this.loadBar.position.x=0;

    this.loadBarProgressTexture = PIXI.Texture.fromImage("./assets/progress_01.png");
    this.loadBarProgress = new PIXI.Sprite(this.loadBarProgressTexture);

    this.loadBarContainer.addChild(this.loadBarProgress);
    this.loadBarContainer.addChild(this.loadBar);
    this.loadBarContainer.position.x = 100;
    this.loadBarContainer.position.y = 100;

    this.myMask = new PIXI.Graphics();
    this.myMask.beginFill();
    this.myMask.drawRect(0, 0, 513,8);
    this.myMask.endFill();
    this.introScreenContainer.addChild(this.myMask);
    this.loadBarContainer.mask = this.myMask;
    this.myMask.x=100;
    this.myMask.y=100;

    this.introScreenContainer.addChild(this.loadBarContainer);

    //this.LoadForMainScreen();
  }


  loadProgressHandler() {

    console.log("loadProgressHandler");

    let progress=`${this.Myloader.progress}`;
    let step = Math.round(progress);
    console.log(progress);

    this.loadBar.position.x += step;

    if(progress==100){
      this._onLoadCallback();
      this.isLoaded = true;
    }
  }


  handleProgress(event) {



    this.loadBar.position.x = event.loaded;

  }


  LoadForMainScreen (callback){
    console.log("LoadForMainScreen");
    this.Myloader.add(["./assets/pict.png","./assets/pict.jpg"])
    this.Myloader.on("progress", this.loadProgressHandler.bind(this));

    console.log("before if " + this.isLoaded);
    if(callback){

      console.log("after if " + this.isLoaded);
      this._onLoadCallback = callback;
    }
    this.Myloader.load();




  }


  




















































































 }