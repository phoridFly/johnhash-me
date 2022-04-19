
window.onload = function(){

    var canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let wingImage = document.getElementById("wingImage");
    ctx.drawImage(wingImage, 0, 0);

}

// array to hold coordinates
var myCoordsArray = [];
var coordinateIndex = 0;

// document.getElementById("myCanvas").onclick = function(event) {
//     getPosition(event);
// }

$("#myCanvas").click(function(e){
    getPosition(e); 
});

// https://ourcodeworld.com/articles/read/49/draw-points-on-a-canvas-with-javascript-html5
// Event will be a click event which can be retrieved as first parameter in the addEventListener(function(event){}); or in jQuery with $("selector").click(function(event){});
function getPosition(event){
    var rect = myCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
    var y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
    
    let coords = [x,y];
    myCoordsArray.push(coords);
    console.log(myCoordsArray);

    // write to screen output
    let elem = document.createElement("p");
    let elemText = document.createTextNode(coords);
    elem.appendChild(elemText);
    document.getElementById("coordinates").appendChild(elem);

    coordinateIndex = coordinateIndex + 1;
    console.log("index " + coordinateIndex);
    //console.log(myCoordsArray.length);

    if (coordinateIndex == 14) {
        drawHelperLine(4,8);
    }
    if (coordinateIndex == 15) {
        drawHelperLine(4,9);
    }
    if (coordinateIndex == 16) {
        drawHelperLine(4,10);
    }
    if (coordinateIndex == 20) {
        drawHelperLine(2,10);
    }
    if (coordinateIndex == 23) {
        drawHelperLine(1,7);
    }
    if (coordinateIndex == 24) {
        drawHelperLine(1,8);
    }
    if (coordinateIndex == 25) {
        drawHelperLine(1,9);
    }
    if (coordinateIndex == 29) {
        drawHelperLine(7,9);
    }
    if (coordinateIndex == 30) {
        drawHelperLine(7,10);
    }

    // This method will handle the coordinates and will draw them in the canvas.
    drawCoordinates(x,y);
}

function drawCoordinates(x,y){	
    let ctx = document.getElementById("myCanvas").getContext("2d");

    let pointSize = 3;


    ctx.fillStyle = "#ff2626"; // Red color

    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawHelperLine (begin, end) {
    console.log(myCoordsArray[begin][0]);
    console.log(myCoordsArray[begin][1]);
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(myCoordsArray[begin][0],myCoordsArray[begin][1]);
    ctx.lineTo(myCoordsArray[end][0],myCoordsArray[end][1]);
    ctx.stroke();
}

