


function Minesweeper( level,size,containerSelector,scoreSelector){
    this.level=level;
    this.size=size;
    this.container=document.querySelector(containerSelector);
    this.scoreDOM=document.querySelector(scoreSelector)
    if(!this.container){
        return console.error("Please provide valid container for game.")
    }


    this.init=this.init.bind(this);
    this.createTable=this.createTable.bind(this);
    this.getRandomInt=this.getRandomInt.bind(this);
    this.cellClicked=this.cellClicked.bind(this);
    this.checkForWin=this.checkForWin.bind(this);
    this.init();

}

Minesweeper.prototype.init=function(){
    //setup the game here
    this.score=0;
    this.container.innerHTML="";
    this.container.appendChild(this.createTable(this.size,this.size));
    this.plantBombs(this.level+Math.floor(this.size/2))
    this.container.addEventListener("click",this.cellClicked)

}
Minesweeper.prototype.plantBombs=function(noOfBombs){
    console.log(noOfBombs);
    for(var i=0;i<noOfBombs;i++){
        var row=this.getRandomInt(0,this.size)
        var column=this.getRandomInt(0,this.size)
        var selector="[data-loc='"+row+"_"+column+"']";
        //get the dom
        var dom=this.container.querySelector(selector);
       // console.log(dom);
       dom.innerHTML="B";
       dom.setAttribute("data-open","true");
    }

}
Minesweeper.prototype.cellClicked=function(e){
    var cellClicked=e.target;
    var dataLoc=cellClicked.getAttribute("data-loc");

    var selector="[data-loc='"+dataLoc+"']";
    
    var dom=this.container.querySelector(selector);

    if(dom.innerHTML.trim()==="B"){
        return alert("GameOver... your score is "+this.score);
    }
    else{
        //return if this cell is already open
        if(cellClicked.getAttribute("data-open")==="true"){
            console.log("returning");
            return;
        }
        //get all the bombs around this dom
        var bombCount=this.getBombCount(dataLoc);
        dom.innerHTML=bombCount;
        dom.setAttribute("data-open","true");
        this.score+=bombCount;
        this.scoreDOM.innerHTML=this.score;
        this.checkForWin();
    }
    

}
Minesweeper.prototype.checkForWin=function() {
 //check if game win
  var selector="[data-open='false']";
    var leftDOM=this.container.querySelector(selector);
    if(!leftDOM){
        alert("congratulations!!! you win...");
    }
}
Minesweeper.prototype.getRandomInt=function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
Minesweeper.prototype.createTable=function(row,col) {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < row; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < col; j++) {
                var td = document.createElement('td');
                td.style.width="50px";
                td.style.height="50px";
                td.setAttribute("data-loc",i+"_"+j);
                td.setAttribute("data-open","false");
                td.appendChild(document.createTextNode('\u0020'))
                tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    return tbl;
}
Minesweeper.prototype.getBombCount=function(dataLoc){
    var count=0;
    dataLoc=dataLoc.split("_");
    var row=parseInt(dataLoc[0]);
    var column=parseInt(dataLoc[1]);
    console.log(row,column)
    var leftTopSelector="[data-loc='"+(row-1)+"_" +(column-1)+"']";
    console.log(leftTopSelector);
    var leftTopDom=document.querySelector(leftTopSelector);
    if(leftTopDom){
        if(leftTopDom.innerHTML==="B"){
            count++;
        }
    }
     var topSelector="[data-loc='"+(row-1)+"_"+column+"']";
    var topDom=document.querySelector(topSelector);
    if(topDom){
        if(topDom.innerHTML==="B"){
            count++;
        }
    }
     var rightTopSelector="[data-loc='"+(row-1)+"_"+(column+1)+"']";
    var rightTopDom=document.querySelector(rightTopSelector);
    if(rightTopDom){
        if(rightTopDom.innerHTML==="B"){
            count++;
        }
    }
     var rightLevelSelector="[data-loc='"+row+"_"+(column+1)+"']";
    var rightLevelDom=document.querySelector(rightLevelSelector);
    if(rightLevelDom){
        if(rightLevelDom.innerHTML==="B"){
            count++;
        }
    }
         var leftLevelSelector="[data-loc='"+row+"_"+(column-1)+"']";
    var leftLevelDom=document.querySelector(leftLevelSelector);
    if(leftLevelDom){
        if(leftLevelDom.innerHTML==="B"){
            count++;
        }
    }
     var leftBottomSelector="[data-loc='"+(row+1)+"_"+(column-1)+"']";
    var leftBottomDom=document.querySelector(leftBottomSelector);
    if(leftBottomDom){
        if(leftBottomDom.innerHTML==="B"){
            count++;
        }
    }
       var bottomSelector="[data-loc='"+(row+1)+"_"+column+"']";
    var bottomDom=document.querySelector(bottomSelector);
    if(bottomDom){
        if(bottomDom.innerHTML==="B"){
            count++;
        }
    }
    var rightBottomSelector="[data-loc='"+(row+1)+"_"+(column+1)+"']";
    var rightBottomDom=document.querySelector(rightBottomSelector);
    if(rightBottomDom){
        if(rightBottomDom.innerHTML==="B"){
            count++;
        }
    }

    return count;

}


//initialisation code
var startButton=document.querySelector(".start-button");
startButton.addEventListener("click",initialisegame);

function initialisegame(){

    var level=parseInt(document.querySelector(".game-level").value);
    var size=parseInt(document.querySelector(".game-size").value);
    
    

    var msInstance=new Minesweeper(level,size,".game-container",".game-score");
    
}