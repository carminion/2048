var tilesArr;
var numCells;
var numRows;
var numCols;

$(document).ready(function() {
  console.log('ready!');

  //determine number of rows and columns in gameboard
  numCells = document.getElementsByClassName('cell').length;
  numRows = Math.sqrt(numCells);
  numCols = Math.sqrt(numCells);
  tilesArr = createArray(numRows);


  //add two starting game tiles to array of tile locations 
  //define new tile elements
  var $tile1 = $("<div class=\"tile\" data-row=\"r1\", data-col=\"c1\" data-val=\"2\">2</div>");
  var $tile2 = $("<div class=\"tile\" data-row=\"r3\", data-col=\"c3\" data-val=\"2\">2</div>");

  //insert new tiles
  $($tile1).insertAfter(".cells");
  $($tile2).insertAfter($(".tile:eq(0)"));
  tilesArr[1][1] = $tile1;
  tilesArr[3][3] = $tile2;

  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {

      var tile;
      var direction = event.which;
      var startingRowIndex;
      var endingRowIndex;
      var startingColIndex;
      var endingColIndex;
      /*
      for (var i = 0; i < document.getElementsByClassName('tile').length; i++){
        tile = $(".tile:eq("+i+")");
        console.log("tile being passed to moveTile method: " + tile);
        console.log("row of tile that is about to be moved: " + tile.attr("data-row"));
        console.log("col of tile that is about to be moved: " + tile.attr("data-col"));
        moveTile(tile, event.which); //moves one tile
      }
      */
      //if arrow key is up, start moving tiles at row 0, end with row 3
      switch (direction){
        case 38: //up key was pressed
        //tiles will be moved starting with row 0
        startingRowIndex = 0;
        endingRowIndex = 3;
        startingColIndex = 0;
        endingColIndex = 3;

        var tilesInGivenRow;

        for (var i = startingRowIndex; i <= endingRowIndex; i++){
            //move each individual tile starting with the appropriate row/column per the direction of movement
            //var index = $(".tile").index(tileInPath);
            //tile = $(".tile:eq("+i+")");
            //tile = tilesArr[i][j];

            //grab all tiles with row 0 first
            tilesInGivenRow = $()
            //iterate through that array

            moveTile(tile, direction);
          }
        }
        break;

        case 40: //down
        //tiles will be moved starting with row 3
        startingRowIndex = 3;
        endingRowIndex = 0;
        startingColIndex = 3;
        endingColIndex = 0;

        for (var i = startingRowIndex; i >= endingRowIndex; i--){
          for (var j = startingColIndex; j>= endingColIndex; j--){
            //move each individual tile starting with the appropriate row/column per the direction of movement
            tile = tilesArr[i][j];
            moveTile(tile, direction);
          }
        }
        break;

        case 37: //left
        //tiles will be moved starting with col 0
        startingRowIndex = 0;
        endingRowIndex = 3;
        startingColIndex = 0;
        endingColIndex = 3;

        for (var i = startingRowIndex; i <= endingRowIndex; i++){
          for (var j = startingColIndex; j<= endingColIndex; j++){
            //move each individual tile starting with the appropriate row/column per the direction of movement
            tile = tilesArr[i][j];
            moveTile(tile, direction);
          }
        }
        break;

        case 39: //right
        //tiles will be moved starting with col 3
        startingRowIndex = 3;
        endingRowIndex = 0;
        startingColIndex = 3;
        endingColIndex = 0;

        for (var i = startingRowIndex; i >= endingRowIndex; i--){
          for (var j = startingColIndex; j>= endingColIndex; j--){
            //move each individual tile starting with the appropriate row/column per the direction of movement
            tile = tilesArr[i][j];
            moveTile(tile, direction);
          }
        }
      

      }

      createTile();
      event.preventDefault();
    }
  })


})


function createArray(numRows){
  var tiles = new Array(numRows);
  for (var i = 0; i< numRows; i++){
    tiles[i] = new Array(numRows);
  }
  return tiles;
}


// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function moveTile(tile, direction){
  var tileRow = tile.attr("data-row");
  var tileCol = tile.attr("data-col");
  var tileVal = tile.attr("data-val");
  var closestTile;
  var collidingTileRow;
  var collidingTileCol;
  var destRow;
  var destCol;
  var destRowNum;
  var destColNum;
  var tileRowNum = tileRow.charAt(1);
  var tileColNum = tileCol.charAt(1);
  var collidingTileRowNum;
  var collidingTileColNum;


  switch(direction) {
    case 38: //up
    var tileInPath;
    var isTileInPath = false;
    //if tile is already at top of grid, break
    if (tile.attr("data-row") === "r0"){
      break;
    }

    //if there are tiles in the same col, above the given tile:
    for (var i= tileRowNum - 1; i >= 0; i--){
      tileInPath = tilesArr[i][tileColNum];

      if (tileInPath != undefined && tileInPath != null){ //there exists a tile in the path of movement
        isTileInPath = true;
        collidingTileCol = tileInPath.attr("data-col");
        collidingTileRow = tileInPath.attr("data-row");
        collidingTileRowNum = collidingTileRow.charAt(1);
        collidingTileColNum = collidingTileCol.charAt(1);

        console.log("moving tile with starting row: " + tileRow + "and starting col: " + tileCol+ " is blocked in path of motion" +
          "by a tile with row: "+ collidingTileRow + " and column: " + collidingTileCol + " this statement is: " +isTileInPath);
        //check if the closest tile has the same value
        if (tileInPath.attr("data-val") === tile.attr("data-val")){ //closest tile has same value
          console.log("tiles have same value");
          //set final destination of moving tile so it is same as other tile
          destRow = tileInPath.attr("data-row");
          destCol = tileInPath.attr("data-col");
          destRowNum = destRow.charAt(1);
          destColNum = destCol.charAt(1);
          //move in-motion tile to final destination 
          tile.attr("data-row", destRow);
          tile.attr("data-col", destCol);
          
          //remove tile that was collided with (stationary) from html
          console.log("removing colliding tile");
          //$("div[data-row="+collidingTileRow+"]").remove();
           //$("div[data-row="+collidingTileRow+"] [data-col="+collidingTileCol+"]").remove();
           //tileInPath.remove();
           var index = $(".tile").index(tileInPath);
           $(".tile:eq("+index+")").remove();
          //console.log($("div[data-row="+collidingTileRow+"]"));
          //console.log(collidingTileRow);
           //merge the two tiles: update value of tile that was moving so it's 2*currValue
           updateValue(tile);
           console.log("value of tile that was moving has been updated to: " + tile.attr("data-val"));
          //update array
          //delete old location of moving tile
          delete tilesArr[tileRowNum][tileColNum];
          delete tilesArr[collidingTileRowNum][collidingTileColNum];
          console.log("element being removed from array: " +   delete tilesArr[collidingTileRowNum][collidingTileColNum]);
          //update location of tile that was moving to final destination cell
          tilesArr[destRowNum][destColNum] = tile;
          //tilesArr[collidingTileRowNum][collidingTileColNum] = null;
        } else { //closest tile does not have same value, don't merge
          console.log("tiles have different values");
        //update final location of tile as one below upper tile
          var finalRow = parseInt(collidingTileRowNum, 10) + parseInt(1, 10);
          destCol = collidingTileCol;
          //remove tile from old location in array
          delete tilesArr[tileRowNum][tileColNum];
          //tilesArr[tileRowNum].splice(tileColNum, 1);

          tile.attr("data-row", "r"+finalRow);
          tile.attr("data-col", destCol);

          tileRowNum =  tile.attr("data-row").charAt(1);
          tileColNum = tile.attr("data-col").charAt(1);
          tilesArr[tileRowNum][tileColNum] = tile;
         
        }
        break;
      } 
    } 
    if (isTileInPath === false){
      //remove tile from old location in array
      //tilesArr[tileRowNum].splice(tileColNum, 1);
      delete tilesArr[tileRowNum][tileColNum];
      console.log("tile is not in path, updating location of tile by removing old tile location: "+   delete tilesArr[tileRowNum][tileColNum]);
      //tilesArr[tileRowNum][tileColNum] = null;
      //move tile to uppermost row, in same column
       tile.attr("data-row","r0");
      //update array with new location for tile
      tileRowNum =  tile.attr("data-row").charAt(1);
      tileColNum = tile.attr("data-col").charAt(1);
      tilesArr[tileRowNum][tileColNum] = tile;

    }
      
    
      break;
    case 40: //down
      
      createTile();
      break;
    case 37: //left
      
      createTile();
      break;
    case 39: //right
      
      createTile();
      break;
  } //end of switch statement
} //end of moveTile function


//create tile at a random grid location when a move happens
function createTile() {

  //get random row and column
  var row = getRandomInt(0, numRows);
  var col = getRandomInt(0, numCols);
  //ensure that tile is being created in an empty cell, where no tiles exist
  while (tilesArr[row][col] != undefined || tilesArr[row][col] != null ){
    row = getRandomInt(0, numRows);
    col = getRandomInt(0, numCols);
  }

  //define new tile element
  var $tile = $("<div class=\"tile\" data-row=\"r" + row + "\"" +  "," + " data-col=\"c" + col + "\" data-val=\"2\">2</div>");

  //insert new tile 
  $($tile).insertAfter(".cells");
  tilesArr[row][col] = $tile;
}

function mergeTiles(){

}

//takes in starting row and column of tile and direction of movement and manages possible collision with other tiles
function detectCollision(tiles, row, col, direction){
  //if direction of movement is up
    //if there is a tile in the same column as a moving tile
        //if tiles have equal values
        //remove the tile closest to starting point
        //multiply the value of the adjacent tile by 2
      //else 
        //tile will stop before adjacent tile

      //else
        //tile will stop moving at farthest row from starting point, in direction of travel
        tile.attr("data-row","r0");

  //if direction of movement is down
    //if there is a tile in the same column as a moving tile
        //if tiles have equal values
        //remove the tile closest to starting point
        //multiply the value of the adjacent tile by 2
      //else 
        //tile will stop before adjacent tile

      //else
        //tile will stop moving at farthest row from starting point, in direction of travel
        tile.attr("data-row","r3");


  //if direction of movement is left
      //if there is a tile in the same row as a moving tile
        //if tiles have equal values
        //remove the tile closest to starting point
        //multiply the value of the adjacent tile by 2
      //else 
        //tile will stop before adjacent tile

      //else
        //tile will stop moving at farthest column from starting point, in direction of travel
        tile.attr("data-col","c0");

    //if direction of movement is right
      //if there is a tile in the same row as a moving tile
        //if tiles have equal values
        //remove the tile closest to starting point
        //multiply the value of the adjacent tile by 2

      //else
        //tile will stop moving at farthest column from starting point, in direction of travel
        tile.attr("data-col","c3");
    

}

function updateValue(tile) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);
}
