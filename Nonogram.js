//Globals
var canvasGrid = new Array();
var elementCount = 0;
var turnCounter = 1;
var timeCounter = 0;


//Initialization
function initializeGrid()
{
    boardSize = document.getElementById("gameBoard").width;

    //Fills initial array with more arrays for 2D array effect
    for(i=0; i<(boardSize/50);i++)
    {
        canvasGrid[i] = new Array(5);
    }

    //Sets all elements of the 2D array with 'false'
    for(i=0; i<(boardSize/50);i++)
    {
        for(j=0;j<5;j++)
        {
            canvasGrid[i][j]=false;
        }
    }
}

window.onload = function()
{
    initializeGrid();
    canvas=document.getElementById("gameBoard");
    ctx= canvas.getContext("2d");
    canvas.addEventListener('click',onDown);
}


//Event Functions
function onDown(e)
{
    //Gets the raw coordinate values
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    //Inputs the document with the coordinates.
    document.getElementById("mouseCoordsX").value = x;
    document.getElementById("mouseCoordsY").value = y;
    
    document.getElementById("turnCount").value = turnCounter++;
    //Changes the tile clicked on.
    changeTile(x,y);
}

function changeTile(x,y)
{
    //Converts the event coords to its rounded value for tile detection.
    roundX = roundLeft(x);
    roundY = roundUp(y);

    //Inputs the document with the rounded input value.
    document.getElementById("roundedX").value = roundX;
    document.getElementById("roundedY").value = roundY;

    gridValueX = roundX / 50;
    gridValueY = roundY / 50;

    if(canvasGrid[roundX/50][roundY/50] == false)
    {
        ctx.fillStyle="black";
        ctx.fillRect(roundX+5,roundY+5,45,45);   
        canvasGrid[roundX/50][roundY/50]=true;
    }
    else
    {
        ctx.fillStyle="rgba(255, 255, 255, 1.0)";
        ctx.fillRect(roundX+5,roundY+5,45,45);   
        canvasGrid[roundX/50][roundY/50]=false;
    }
}

//Canvas Functions
function setGridSize() //Sets the canvas size based on the user input
{
    var setSize =  document.getElementById("boardSize").value;
    document.getElementById("gameBoard").width = setSize;
    document.getElementById("gameBoard").height = setSize;
}

function resetGame()
{
    turnCounter=1;
    document.getElementById("turnCount").value = turnCounter++;
    initializeGrid();
    ctx.clearRect(0,0,ctx.width,ctx.height);
}


//Math Functions
function roundUp(y)
{
    tempY = y - (y%50);
    return parseInt(tempY);
}

function roundLeft(x)
{
    tempX = x - (x%50);
    return parseInt(tempX);
}



//Debug Functions
function testFunction() //Function for testing purposes
{
    testValue = document.getElementById("boardSize").value;
    alert(testValue/50);
}