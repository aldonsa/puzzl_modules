import PIXI from 'pixi.js';
import GameScene from './scenes/GameScene';
import LoaderScene from './scenes/LoaderScene';
import MenuScene from './scenes/MenuScene';
export default class Game {

  constructor(){
    

    const Container = PIXI.Container;
    this.stage = new Container();
    const Renderer = PIXI.autoDetectRenderer;
    this.renderer = new Renderer(800,800);


    document.body.appendChild(this.renderer.view);

  }

  initialize(){

    console.log("initialize")

    console.log(this);

    this.menuScene = new MenuScene();




    let loaderScene = new LoaderScene();
    this.stage.addChild(loaderScene.introScreenContainer);
    loaderScene.LoadForMainScreen(this.setup.bind(this,this.menuScene, loaderScene));

    this.animate();

  }

  animate() {

    this.renderer.render(this.stage);
    requestAnimationFrame(this.animate.bind(this));
  }

  setup(menuScene){

    console.log("setup");


    this.stage.removeChildAt(0);


    this.stage.addChild(menuScene.background)



    menuScene.startGame(this.startMainGame.bind(this));



  }


  startMainGame(){
    console.log("startMainGame started");
    console.log(this.menuScene);
    let gameScene= new GameScene();
    //this.stage.addChild(gameScene.background);
    this.stage.addChild(gameScene.gameField);
    gameScene.init();

  }


}