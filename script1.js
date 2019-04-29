//alert("hi");
console.log("Have a nice day");

//variables for the program
var howManyDots; 
var howManyMade = 0;

console.log(howManyDots);


var xLocs = new Array();
var yLocs = new Array();
var dXSpeed = new Array();
var dYSpeed = new Array();
var dotColor = new Array();

var moveTheDots = false;

var dotSize =15;

var colors = ['Aquamarine', 'CadetBlue', 'Chocolate',
'CornflowerBlue', 'Cyan', 'DarkBlue',
'#00008b', 'DarkGreen', 'DarkSlateBlue', 'DeepSkyBlue',
'FireBrick', 'Gold', 'GreenYellow', 'HotPink',
'Indigo', 'LightBlue', 'LightGreen', 
'LightSeaGreen', 'LimeGreen', 'Maroon', 
'MediumSeaGreen', 'MediumSlateBlue'
];

var totalColors = colors.length;
console.log("The total num of colors is " + totalColors);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

var rect = canvas.getBoundingClientRect();

var canvasW = rect.right - rect.left;

//alert("rect.top is " + rect.top);
//alert("rect.bottom is " + rect.bottom);
var canvasH = rect.bottom - rect.top;
//alert("canvas height is " + canvasH);


function frame() {

	if(moveTheDots === false) {
		clearInterval(id);
	} else {

		for(var i = 0; i < xLocs.length; i++) {
			var theDX = dXSpeed[i];
			var theDY = dYSpeed[i];
			xLocs[i] += theDX;
			yLocs[i] += theDY;

			if(xLocs[i] < dotSize/2) {
				xLocs[i] = dotSize/2 +1;
				dXSpeed[i] *= -1;
			}

			if(xLocs[i] > canvasW - dotSize/2) {
				xLocs[i] = canvasW - 1 - dotSize/2;
				dXSpeed[i] *= -1;
			}

			if(yLocs[i] < dotSize/2) {
				yLocs[i] = dotSize/2 +1;
				dYSpeed[i] *= -1;
			}

			if(yLocs[i] > canvasH - dotSize/2) {
				yLocs[i] = canvasH - 1 - dotSize/2;
				dYSpeed[i] *= -1;
			}
		}
		

	}
	redrawScene();

}


function moveEveryBody() {

	var id = setInterval(frame, 7);
}



function toggleDotMoving() {

	if(moveTheDots === false) {
		moveEveryBody();
		moveTheDots = true;
	} else {
		moveThDots = false;
		
	}
}

//Helper function to get x, y
function getMousePosition(canvas, event) {

 	var rect = canvas.getBoundingClientRect();
 	var xL = event.clientX - rect.left;
 	var yL = event.clientY - rect.top;

	return {

		x: xL,
		y: yL
	};

}

function addClick(x, y) {
	//lots of programming...
	//alert("Hi from addClick");
	xLocs.push(Math.floor(x - (dotSize/2.0)));
	yLocs.push(Math.floor(y - (dotSize/2.0)));
	// this is for color
	var dColor = Math.floor( Math.random() * colors.length);
	dotColor.push(dColor);

	//this is for dot speed
	var randDX = Math.floor( Math.random() * 8) - 4; 
	var randDY = Math.floor( Math.random() * 8) - 4; 

	dXSpeed.push(randDX);
	dYSpeed.push(randDY);
}

function redrawScene() {
	//alert("Hi from redrawScene");
	context.clearRect(0,0, context.canvas.width, context.canvas.height);

	//loop
	for(var i=0; i < xLocs.length; i++) {

		context.beginPath();
		context.ellipse( 
			xLocs[i],
			yLocs[i],
			dotSize, 
			dotSize,
			0,0,
			Math.PI*2
			);
		var whichColorNum = dotColor[i];
		context.fillStyle = colors[whichColorNum];
		context.fill();
		context.closePath();
	}

}

function setup(){

	setTimeout(function(){ 
	howManyDots = prompt("How many dots would you like");
	}, 1000);
	
}



canvas.addEventListener( 'mousedown', function(event) {

			//alert("hey you called the anonymous function");
			var mousePos = getMousePosition(canvas, event);
			//alert("You clicked at " + mousePos.x + ", " + mousePos.y);
			//alert("How many made is " + howManyMade);
			//alert("howManyDots is " + howManyDots);

			if(howManyMade < howManyDots) {
				addClick(mousePos.x, mousePos.y);
				howManyMade++;
				redrawScene();
			}

		}
);

	




