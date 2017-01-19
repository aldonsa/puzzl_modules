import PIXI from 'pixi.js';

export default class GameScene {


  constructor() {

    let ww = 100;
    let hh = 100;

    this.background = new PIXI.Graphics();
    this.background.lineStyle(2, 0x0000FF, 1);
    this.background.beginFill(0xFF700B, 1);
    this.background.drawRect(50, 0, 300, 300);

    this.gameField = new PIXI.Container(300, 300);
    this.sprArr = [];
    this.initialArr = [];
    this.posTo={};
    this.posFrom={};

    this.toX;
    this.toXLimit;
    this.toXEvent;
    this.toY;
    this.toYLimit;
    this.toYEvent;






  }

  init() {

    console.log("this scene " + "GameScene")
    this.createSpriteArray()
    //this.createStartBtn();




  }

  createSpriteArray() {
    console.log("createSpriteArray")




    var rectArr = [];
    var texturesArr = [];
    var prArr = [];
    var mySpriteSheetImage = PIXI.utils.TextureCache["./assets/pict.png"];

    for (var i = 0; i < 4; i++) {
      rectArr[i] = [];
      texturesArr [i] = [];
      prArr[i] = [];
      for (var j = 0; j < 4; j++) {


        rectArr[i][j] = new PIXI.Rectangle(75 * i, 75 * j, 75, 75);
        texturesArr[i][j] = new PIXI.Texture(mySpriteSheetImage, rectArr[i][j])

        prArr[i][j] = new PIXI.Sprite(texturesArr[i][j]);
        prArr[i][j].column2 = i;
        prArr[i][j].row2 = j;

      }

    }

    prArr = prArr[0].map(function (col, i) {
      return prArr.map(function (row) {
        return row[i]
      })
    });


    this.sprArr = prArr;




    //this.createInitialArray();
    this.addPieceToStage2(this.sprArr);


  }

  addPieceToStage2(array) {


    var dd=this;

    for (var i = 0; i < 4; i++) {

      for (var j = 0; j < 4; j++) {

        array[i][j].x = i * 75;
        array[i][j].y = j * 75;

        array[i][j].interactive = true;
        this.sprArr[i][j].column = i;
        this.sprArr[i][j].row = j;


        var onePiece = array[i][j];
        //onePiece.anchor.x=0.5;
        //onePiece.anchor.y=0.5;
        onePiece.off("mousedown");
        onePiece.off("mouseup");
        onePiece.off("mousemove");
        onePiece.off("mouseupoutside");
        onePiece
            .on('mousedown', this.onDragStart.bind(this,i,j))
            .on('mouseup', this.onDragEnd.bind(this))
            .on('mousemove', this.onDragMove.bind(this))
            .on('mouseupoutside', this.onDragEnd.bind(this));
        //.on('touchstart', onDragStart)
        // .on('touchend', onDragEnd)
        // .on('touchendoutside', onDragEnd)
        // .on('touchmove', onDragMove);
        this.gameField.addChild(onePiece);


      }

    }


  }


  onDragStart(i,j,event) {
    console.log("onDragStart");

    console.log(i,j);


    this.sprArr[i][j].alpha = 0.5;
    this.sprArr[i][j].dragging = true;
    console.log(event.data)



  }






  onDragMove() {

  // var toX,
  //     toXLimit,
  //     toXEvent,
  //     toY,
  //     toYLimit,
  //     toYEvent;

    for (var i = 0; i < 4; i++) {

      for (var j = 0; j < 4; j++) {
        if (this.sprArr[i][j].dragging){
          //var newPosition = event.data.getLocalPosition();
          //console.log("dragging");
          this.toXEvent=event.clientX;
          this.toYEvent=event.clientY;

            if (this.toXEvent > 225) {
              this.toXLimit = Math.min(this.sprArr[i][j].x, 225);
              this.toXEvent=this.toXLimit;

            }

            if (this.toYEvent > 225) {
              this.toYLimit = Math.min(this.sprArr[i][j].y, 225);
              this.toYEvent=this.toYLimit;
            }

            if (this.toXEvent < 0) {
              this.toXLimit = Math.min(this.sprArr[i][j].x, 0);
              this.toXEvent=this.toXLimit;
            }

            if (this.toYEvent < 0) {
              this.toYLimit = Math.min(this.sprArr[i][j].y, 0);
              this.toYEvent=this.toYLimit;
            }

          this.toX = Math.floor(Math.round(this.toXEvent) / 75);
          this.toY = Math.floor(Math.round(this.toYEvent) / 75);
          console.log("toX "+this.toX+ " toY " + this.toY);
          this.sprArr[i][j].x=this.toX * 75;
          this.sprArr[i][j].y=this.toY * 75;
        }


      }
    }




}




  onDragEnd() {


    console.log("onDragEnd")
    var sprfromX,
        sprfromY;

    for (var i = 0; i < 4; i++) {

      for (var j = 0; j < 4; j++) {

          this.sprArr[i][j].dragging=false;
          this.sprArr[i][j].alpha=1;

        sprfromX=this.sprArr[i][j].column;
        sprfromY=this.sprArr[i][j].row;


      }
    }

    //this.setPosFrom(this.column,this.row)
    // var sprfromX,
    //     sprfromY;
    //
    //
    // console.log("fromX "+sprfromX+ " fromY "  + sprfromY);
    //
    //
    // this.alpha = 1;
    //
    // this.dragging = false;
    //
    //
    // this.data = null;





    for (var i = this.gameField.children.length - 1; i >= 0; i--) {
      this.gameField.removeChild(this.gameField.children[i]);
    };

    this.swapPlaces(this.sprArr,sprfromX,sprfromY,this.toY,this.toX);

  }


  swapPlaces(array,columnFrom,rowFrom,rowTo,columnTo) {


    var tempFrom=array[columnFrom][rowFrom];
    console.log("tempFr" + tempFrom)
    var tempTo=array[columnTo][rowTo];



    array[columnFrom][rowFrom]=array[columnTo][rowTo];
    array[columnTo][rowTo]=tempFrom;
    array[columnFrom][rowFrom]=tempTo;



    this.addPieceToStage2(array);

  }



  createInitialArray (array){
    for(var i=0; i<4; i++){
      this.initialArr[i]=[];
      for(var j=0; j<4; j++){

        //array[i][j].column=i;
        //array[i][j].row=j;
        //initialArr[i][j]=array[i][j]

        this.initialArr[i][j]=[i,j];


      }
    }

    console.log("initialArr");
    console.log(initialArr);
    //addPieceToStage2(array);
  }
















}