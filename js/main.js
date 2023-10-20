/*This program makes use of jquery-3.3.1. To see copyright information, go to jquery.org/license*/

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
                    //cell[0]: 0-hidden 1-revealed 2-flagged; cell[1]: 0-safe 1-mine; cell[2] tells number of nearby mines
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

	nMines: 99,
	
	revealedCells: 0
};

var cellStatus =
{
    //0 means safe, 1 means unsafe
    SAFE : 0,
	MINE : 1,

    //0 means hidden, 1 means revealed
	HIDDEN : 0,
	SHOWN : 1,
	FLAGGED: 2
};

function renderGameBoard()
{
	requestAnimationFrame(renderGameBoard);

	for(var row = 0; row < game.gameBoard.height; row++)
	{
		for(var cell = 0; cell < game.gameBoard.width; cell++)
		{
			var cellDiv = document.getElementsByClassName("row")[row].childNodes[cell];

			var visibility = game.gameBoard.grid[row][cell][0];

			if(visibility == cellStatus.SHOWN)
			{
				if(game.gameBoard.grid[row][cell][1] == cellStatus.MINE)
				{
					cellDiv.classList.add("mine");
				}
				else if(visibility == cellStatus.SHOWN)
				{
					var nearbyMines = "" + game.gameBoard.grid[row][cell][2];

					cellDiv.innerHTML = nearbyMines;
					cellDiv.classList.add("revealed");
					if(game.gameBoard.grid[row][cell][2] == 0)
					{
						cellDiv.innerHTML = "";
					}
				}
				
			}
			else if(visibility == cellStatus.FLAGGED)
			{
				cellDiv.innerHTML = "F";
			}
			else if(visibility == cellStatus.HIDDEN)
			{
				cellDiv.innerHTML = "";
			}
		}
	}
}

function gameOver()
{
	document.getElementById("gameOverDiv").innerHTML = "Too bad! You clicked a mine.  Click a difficulty above to start a new game.";
	document.getElementById("gameOverDiv").classList.add("active");

	for(var row = 0; row < game.gameBoard.height; row++)
	{
		for(var cell = 0; cell < game.gameBoard.width; cell++)
		{
			var cellDiv = document.getElementsByClassName("row")[row].childNodes[cell];
			if(game.gameBoard.grid[row][cell][1] == cellStatus.MINE)
			{
				console.log("added mine to class");
				cellDiv.classList.add("mine");
			}	
		}
	}
	//cancelAnimationFrame(renderGameBoard);
}

function checkGameWin()
{
	var test = ((game.gameBoard.width*game.gameBoard.height) - game.revealedCells);
	console.log("Win condition: " + test);
	console.log("nMines = " + game.nMines);

	if(test == game.nMines)
	{
		document.getElementById("gameOverDiv").classList.add("active");
		document.getElementById("gameOverDiv").innerHTML = "You won!  Great job.  Click a difficulty above to start a new game."
	}
	//cancelAnimationFrame(renderGameBoard);
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
						
						revealCell((nRowId+h), (nCellId+j));
					}
					else
					{
						revealCell((nRowId+h), (nCellId+j));
					}
				}
			}
		}
}

//Updates cell arrays after one is clicked
function revealCell(rowId, cellId)
{
	var nRowId = parseInt(rowId);
	var nCellId = parseInt(cellId);
	
	if(game.gameBoard.grid[nRowId][nCellId][1] == cellStatus.FLAGGED)
	{
		changeFlagCount(1);
	}
	
	if(game.gameBoard.grid[nRowId][nCellId][0] == 1)
	{
		console.log("Cell already clicked.");
	}
	else if(game.gameBoard.grid[nRowId][nCellId][1] == cellStatus.MINE)
	{
		game.gameBoard.grid[nRowId][nCellId][0] = cellStatus.SHOWN;
		gameOver();
	}
	else if(game.gameBoard.grid[nRowId][nCellId][1] == cellStatus.SAFE)
	{
		game.gameBoard.grid[nRowId][nCellId][0] = cellStatus.SHOWN;
		game.revealedCells++;
		console.log("Revealed cells: " + game.revealedCells);
		//reveals nearby squares if square has no mines around it
		if(game.gameBoard.grid[nRowId][nCellId][2] == 0)
		{
			revealNearbyCells(nRowId, nCellId);
		}
		
	}
	checkGameWin();
}

function putFlagDown(rowId, cellId)
{
	var nRowId = parseInt(rowId);
	var nCellId = parseInt(cellId);
	console.log("entered");

	if((game.gameBoard.grid[nRowId][nCellId][0] == cellStatus.HIDDEN) && (game.nFlags > 0))
	{
		changeFlagCount(-1);
		game.gameBoard.grid[nRowId][nCellId][0] = cellStatus.FLAGGED;
	}
	else if(game.gameBoard.grid[nRowId][nCellId][0] == cellStatus.FLAGGED)
	{
		changeFlagCount(1);
		game.gameBoard.grid[nRowId][nCellId][0] = cellStatus.HIDDEN;
	}
}

//events using jquery
function setUpEvents()
{
	$(".cell").on("mousedown", function(e)
	{
		var myparent = $(e.target).parent();
		var rowId = myparent.attr("id");
		var cellId = e.target.id;
		var cellDiv = e.target;

		switch (e.which)
		{
			//Left click
			case 1:
				revealCell(rowId, cellId);
				break;
			//Right click
			case 3:
				putFlagDown(rowId, cellId);
				break;
		}
		var test = rowId+cellId;
		
		console.log("Row id: " + rowId + "\nCell id: " + cellId);
		console.log(test);
	});

	$("#gameBoard").on("contextmenu", function(e)
	{
		return false;
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
						if((game.gameBoard.grid[nRow+h]) && 
						(game.gameBoard.grid[nRow+h][nCell+j]) && 
						(game.gameBoard.grid[nRow+h][nCell+j][1] == 1))
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
	//used to make win condition easier
	var placeholder = game.nMines;
	
	console.log("setUpCells entered");
	console.log(game.nMines);
	
	while(placeholder != 0)
	{
		console.log("loop entered");
		randomRow = Math.floor(Math.random() * (game.gameBoard.height));
		randomCell = Math.floor(Math.random() * (game.gameBoard.width));
		
		if(game.gameBoard.grid[randomRow][randomCell][1] != 1) 
		{
			//console.log("Bomb placed");
			game.gameBoard.grid[randomRow][randomCell][1] = 1;
			placeholder--;
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
	document.getElementById("gameBoard").style.background = "#222222";
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

function changeDifficulty(level)
{
	if(level == 0)
	{
		game.gameBoard.width = 9;
        game.gameBoard.height = 9;
		game.nMines = 10;
		game.nFlags = 10;
		console.log("Difficulty = Beginner");
	}
	else if(level == 1)
	{
		game.gameBoard.width = 16;
        game.gameBoard.height = 16;
		game.nMines = 32;
		game.nFlags = 32;
		console.log("Difficulty = Medium");
	}
	else if(level == 2)
	{
		game.gameBoard.width = 30;
        game.gameBoard.height = 16;
		game.nMines = 100;
		game.nFlags = 99;
		console.log("Difficulty = Hard");
	}
	game.revealedCells = 0;
	document.getElementById("gameOverDiv").classList.remove("active");
	document.getElementById("nFlags").innerHTML = "Number of flags: " + game.nFlags;
	populateGameBoard();
}

//Changes value of flag count
function changeFlagCount(x)
{
    if((game.nFlags > 0) && (game.nFlags < 100))
    {
        game.nFlags += x;
        document.getElementById("nFlags").innerHTML = "Number of flags: " + game.nFlags;
    }
    else if((game.nFlags == 100) && (x == -1))
    {
        game.nFlags += x;
        document.getElementById("nFlags").innerHTML = "Number of flags: " + game.nFlags;
    }
    else if((game.nFlags == 0) && (x == 1))
    {
        game.nFlags += x;
        document.getElementById("nFlags").innerHTML = "Number of flags: " + game.nFlags;
    }
}

$(function() {
	populateGameBoard();
	renderGameBoard();
});
