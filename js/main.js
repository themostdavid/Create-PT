var count = 0;

function formatGameBoard()
{
	//Sets proper width of gameBoard
	var gameBoardWidth = 30 * game.gameBoard.width;
	var str = "";
	str += gameBoardWidth + "px";
	
	document.getElementById("gameBoard").style.width = str;
	
	//Sets up border of game board
	document.getElementById("gameBoard").style.border = "5px solid #939393";
}

function populateGameBoard()
{
	console.log("populateGameBoard entered");
	
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
            
            game.gameBoard.grid = [];
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
					var cell = new Array(0, (count-1), 0);
                    row[k] = cell;
                }
            }
			
			document.getElementById("testArray").innerHTML = "Output " + count + " is " + game.gameBoard.grid[1][count][1];
			count++;
        },
		
		deleteBoard: function()
		{
			
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
        game.gameBoard.nMines = 10;
        //game.gameBoard.createBoard();
		console.log("Difficulty = Beginner");
	}
	else if(level == 1)
	{
		game.gameBoard.width = 16;
        game.gameBoard.height = 16;
        game.gameBoard.nMines = 32;
        //game.gameBoard.createBoard();
		console.log("Difficulty = Medium");
	}
	else if(level == 2)
	{
		game.gameBoard.width = 30;
        game.gameBoard.height = 16;
        game.gameBoard.nMines = 100;
        //game.gameBoard.createBoard();
		console.log("Difficulty = Hard");
	}
}

var cellStatus =
{
    //0 means safe, 1 means unsafe
    mine : 0,

    //0 means hidden, 1 means revealed
    visual : 0,

    //Number of surrounding squares with mines
    nearby : 0
};

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
