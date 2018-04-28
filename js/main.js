function gameOver()
{
	var p = document.createElement("p");
	p.id = "gameOverText";
	p.style.textAlign = "center";

	var gameOverDiv = document.getElementById("gameOverDiv");

	gameOverDiv.appendChild(p);
	p.innerHTML = "Too bad! You clicked a mine.  Click a difficulty below to start a new game.";
	/*gameOverDiv.style.height = "400px";
	gameOverDIv.style.width = "600px";*/
	gameOverDiv.style.background = "#cfcfcf";

}

//Reveals nearby squares
function revealNearbyCells(nRowId, nCellId)
{
	for(var h = -1; h <= 1; h++)
		{
			for(var j = -1; j <= 1; j++)
			{
				//Checks to see if row exists, then if cell exists, then the mine status of the cell
				if((game.gameBoard.grid[nRowId+h]) && (game.gameBoard.grid[nRowId+h][nCellId+j])
					&& (game.gameBoard.grid[nRowId+h][nCellId+j][0] == cellStatus.HIDDEN))
				{
					if(game.gameBoard.grid[nRowId+h][nCellId+j][2] == 0)
					{
						game.gameBoard.grid[nRowId+h][nCellId+j][0] == cellStatus.SHOWN;
						revealNearbyCells((nRowId+h), (nCellId+j));
					}
					else
					{
						//How do I get the cellDiv of the surrounding cell
						updateCells((nRowId+h), (nCellId+j));
					}
				}
			}
		}
}

//Updates cell arrays after one is clicked
function updateCells(rowId, cellId, cellDiv)
{
	var nRowId = parseInt(rowId);
	var nCellId = parseInt(cellId);
	var total = nRowId+nCellId;
	
	var nearbyMines = "" + game.gameBoard.grid[nRowId][nCellId][2];
	var node = document.createTextNode(nearbyMines);

	if(game.gameBoard.grid[nRowId][nCellId][0] == cellStatus.SHOWN)
	{
		console.log("Cell already clicked.");
	}
	else if(game.gameBoard.grid[nRowId][nCellId][1] == cellStatus.MINE)
	{
		game.gameBoard.grid[nRowId][nCellId][0] = cellStatus.SHOWN;
		cellDiv.classList.add("mine");
		gameOver();
	}
	else if(game.gameBoard.grid[nRowId][nCellId][1] == cellStatus.SAFE)
	{
		game.gameBoard.grid[nRowId][nCellId][0] = cellStatus.SHOWN;

		//reveals nearby squares if square has no mines around it
		/*if(game.gameBoard.grid[nRowId][nCellId][2] == 0)
		{
			revealNearbyCells(nRowId, nCellId);
		}*/
		cellDiv.classList.add("safe");
		cellDiv.appendChild(node);
	}
	console.log(game.gameBoard.grid);
}

//events using jquery
function setUpEvents()
{
	$(".cell").on("click", function(e)
	{
		var myparent = $(e.target).parent();
		var rowId = myparent.attr("id");
		var cellId = e.target.id;
		var cellDiv = e.target;
		
		var test = rowId+cellId;
		
		console.log("Row id: " + rowId + "\nCell id: " + cellId);
		console.log(test);
		
		updateCells(rowId, cellId, cellDiv);
	});

}

//Checks surrounding cells for mines
function checkSurroundingCells()
{
	var nRow;
	var nCell;
	var count = 0;

	console.log("checkSurroundingCells entered.")
	
	for(nRow = 0; nRow < game.gameBoard.height; nRow++)
	{
		for(nCell = 0; nCell < game.gameBoard.width; nCell++)
		{
			count = 0;
			if(game.gameBoard.grid[nRow][nCell][1] == 1)
			{
				game.gameBoard.grid[nRow][nCell][2] = 0;
			}
			else
			{
				//Checks surrounding cells with nested loops
				for(var h = -1; h <= 1; h++)
				{
					for(var j = -1; j <= 1; j++)
					{
						//Checks to see if row exists, then if cell exists, then the mine status of the cell
						if((game.gameBoard.grid[nRow+h]) && (game.gameBoard.grid[nRow+h][nCell+j]) && (game.gameBoard.grid[nRow+h][nCell+j][1] == 1))
						{
							count++;
						}
					}
				}
				game.gameBoard.grid[nRow][nCell][2] = count;
			}
			
		}
	}
}


//Sets up the cell arrays
function setUpCells()
{
	var randomRow;
	var randomCell;
	
	console.log("setUpCells entered");
	console.log(game.nMines);
	
	while(game.nMines != 0)
	{
		console.log("loop entered");
		randomRow = Math.floor(Math.random() * (game.gameBoard.height-1));
		randomCell = Math.floor(Math.random() * (game.gameBoard.width-1));
		
		if(game.gameBoard.grid[randomRow][randomCell][1] != 1) 
		{
			//console.log("Bomb placed");
			game.gameBoard.grid[randomRow][randomCell][1] = 1;
			game.nMines--;
		}
	}
	
	checkSurroundingCells();
}

function formatGameBoard()
{
	//Sets proper width of gameBoard
	var gameBoardWidth = 30 * game.gameBoard.width;
	var str = "";
	str += gameBoardWidth + "px";
	
	document.getElementById("gameBoard").style.width = str;
	
	//Sets up border of game board
	document.getElementById("gameBoard").style.border = "5px solid #939393";
	document.getElementById("gameBoard").style.background = "#a5a5a5";
}

//Creates html board
function populateGameBoard()
{
	console.log("populateGameBoard entered");
	game.gameBoard.createBoard();
	
	while(gameBoard.firstChild)
	{
		gameBoard.removeChild(gameBoard.firstChild);
	}
    //Creates each html row
    for(var i = 0; i < game.gameBoard.height; i++)
    {
		var rowElement = document.createElement("div");
		rowElement.id = i;
		rowElement.classList.add("row");
		
        //Creates each html cell within each row
        for(var k = 0; k < game.gameBoard.width; k++)
        {
			var cellElement = document.createElement("div");
			cellElement.id = k;
			cellElement.classList.add("cell");
			
			rowElement.appendChild(cellElement);
		
			
        }
		
		gameBoard.appendChild(rowElement);
    }
	
	formatGameBoard();
	//jquery event handlers for cells
	setUpEvents();
}

var game =
{
    gameBoard:
    {
        //dimensions of game board
        width : 30,
        height : 16,
        
        //Game board array
		grid : [],
        //Should each cell be its own array, to store cellStatus?
        createBoard: function()
        {
            
            this.deleteBoard();
			console.log("createBoard entered.");
            //creates rows
            for(var i = 0; i < game.gameBoard.height; i++)
            {
				var row = new Array();
				game.gameBoard.grid[i] = row;
				//creates cells
                for(var k = 0; k < game.gameBoard.width; k++)
                {
                    //cell[0]: 0-hidden 1-revealed; cell[1]: 0-safe 1-mine; cell[2] tells number of nearby mines
					var cell = new Array(0, 0, 0);
                    row[k] = cell;
                }
            }
			setUpCells();
			console.log(this.grid);
			
        },
		
		deleteBoard: function()
		{
			game.gameBoard.grid = [];
		}
    },

    nFlags : 100,

    nMines: 100
};

function changeDifficulty(level)
{
	if(level == 0)
	{
		game.gameBoard.width = 9;
        game.gameBoard.height = 9;
        game.nMines = 10;
		console.log("Difficulty = Beginner");
	}
	else if(level == 1)
	{
		game.gameBoard.width = 16;
        game.gameBoard.height = 16;
        game.nMines = 32;
		console.log("Difficulty = Medium");
	}
	else if(level == 2)
	{
		game.gameBoard.width = 30;
        game.gameBoard.height = 16;
        game.nMines = 100;
		console.log("Difficulty = Hard");
	}
	if(document.getElementById("gameOverText") != null)
	{
		document.getElementById("gameOverText").innerHTML = "";
	}
	populateGameBoard();
}

var cellStatus =
{
    //0 means safe, 1 means unsafe
    SAFE : 0,
	MINE : 1,

    //0 means hidden, 1 means revealed
	HIDDEN : 0,
	SHOWN : 1
};

