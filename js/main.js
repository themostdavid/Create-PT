var count = 0;

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
			console.log("createBoard entered.");
            //creates rows
            for(var i = 0; i < game.gameBoard.height; i++)
            {
				var row = new Array();
				game.gameBoard.grid[i] = row;
				//creates cells
                for(var k = 0; k < game.gameBoard.width; k++)
                {
					var cell = new Array("HH", 2);
                    row[k] = cell;
                }
            }
			
			document.getElementById("testArray").innerHTML = "Output " + count + " is " + game.gameBoard.grid[1][count][1];
			count++;
        }
    },

    nFlags : 100
};

function changeDifficulty(level)
{
	if(level == 0)
	{
		game.gameBoard.width = 9;
		game.gameBoard.height = 9;
		console.log("Difficulty = Beginner");
	}
	else if(level == 1)
	{
		game.gameBoard.width = 16;
		game.gameBoard.height = 16;
		console.log("Difficulty = Medium");
	}
	else if(level == 2)
	{
		game.gameBoard.width = 30;
		game.gameBoard.height = 16;
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
