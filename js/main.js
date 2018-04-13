var gameBoard 
{
	//dimensions of game board
	width : 0,
	height : 0,

	//Funny h meme
	hJ : prompt("Type a funny meme", "")
}




var a = 0;
var b = 0;
function changeParagraph() 
{
	if(a == 0)
    {
    	document.getElementById("demo").innerHTML = "Paragraph changed.";
        a = 1;
    }
    else
    {
    	document.getElementById("demo").innerHTML = "A Paragraph.";
        a = 0;
    }
}
function changeTitle()
{
	if(b == 0)
    {
    	document.getElementById("title").innerHTML = gameBoard.hJ;
        //document.getElementById("title").style.display = "none";
        b = 1;
    }
    else
    {
    	document.getElementById("title").innerHTML = "JavaScript in Head.";
        document.getElementById("title").style.display = "block";
        b = 0;
    }
}
