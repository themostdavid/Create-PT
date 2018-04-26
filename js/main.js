var a = 0;

//Updates cell arrays after one is clicked
function updateCells(rowId, cellId, cellDiv)
{
	var nRowId = parseInt(rowId);
	var nCellId = parseInt(cellId);
	var total = nRowId+nCellId;

	console.log(total);
	if(game.gameBoard.grid[nRowId][nCellId][0] = 1)
	{
	}
	else if(game.gameBoard.grid[nRowId][nCellId][1] = 1)
	{
		game.gameBoard.grid[nRowId][nCellId][0] = 1;
		mine.appendChild(cellDiv);
	}
	else if(game.gameBoard.grid[nRowId][nCellId][1] = 0)
	{
		game.gameBoard.grid[nRowId][nCellId][0] = 1;
		safe.appendChild(cellDiv);
	}
	console.log(game.gameBoard.grid);
}

//events using jquery
function setUpEvents()
{
	$(".cell").on("click", function(e)
	{
		testFunction();
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

function testFunction()
{
	console.log("testFunction entered");
	
	if(a == 0)
	{
		document.getElementById("heading").style.color = "#FF0000";
		a = 1;
	}
	else
	{
		document.getElementById("heading").style.color = "#00FF00";
		a = 0;
	}
	
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
