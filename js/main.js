var game =
{
    gameBoard:
    {
        //dimensions of game board
        width : 30,
        height : 16,
        
        //Game board array
        //Should each cell be its own array, to store cellStatus?
        createBoard: function()
        {
            //creates rows
            for(var i = 0; i < height; i++)
            {
                for(var k = 0; k < width; k++)
                {
                    
                }
            }
        }
    },

    nFlags : 100
};

var cellStatus =
{
    //0 means safe, 1 means mine
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
