var game =
{
    gameBoard:
    {
        //dimensions of game board
        width : 0,
        height : 0,
        
        //Game board array
        board : []
    },

    nFlags : 100
};

var cell =
{
    //0 means safe, 1 means mine
    mineStatus : 0,

    //0 means hidden, 1 means revealed
    visualStatus : 0,
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
