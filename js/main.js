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
    	document.getElementById("title").innerHTML = "Title changed.";
        document.getElementById("title").style.display = "none";
        b = 1;
    }
    else
    {
    	document.getElementById("title").innerHTML = "JavaScript in Head.";
        document.getElementById("title").style.display = "block";
        b = 0;
    }
}
