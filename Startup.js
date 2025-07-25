const EMPTY = 0;
const WRONG = 1;
const RIGHT = 2;
const INDICATOR = 3;
const ARROWUP = 4;
const ARROWDOWN = 5;

var midPoint = { x:0, y:0 };
var gridMin = 8;
var gridSize;
var screenMax = { x:0, y:0 };
var screenPan = { x:0, y:0 };

var activeInterval;
var activeKeyRemover;
var imageMap = {};
var loadedImgs = 0;
var imgScale;
var nodeGap = { x:2, y:2 };

var bgColor = "white";

var taskList = [];

window.onload = function() {
//	loadImages();
	
	canv = document.getElementById("gc");
	canv.width = window.innerWidth-30;
	canv.height = window.innerHeight-30;
	
	if (canv.width * 21 < canv.height * 10){
		canv.height = canv.width * 10 / 21;
		gridSize = canv.width/gridMin;
	} else {
		canv.width = canv.height * 21 / 10;
		gridSize = canv.height/gridMin;
	}
	
	ctx = canv.getContext("2d");
	
	load();
	
	mouse.setup();
	
	activeKeyRemover = function(){};
	activeInterval = setInterval(loadInterval, 1000/100);
}

function loadInterval(){
	if (loadedImgs == imageMap.size){
		Main.setup();
		Main.activate();
	} else {
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canv.width, canv.height);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
		// set up text writing
		ctx.font = 3 * gridSize - 10 + 'px serif';
		
		ctx.textAlign = "center";
		ctx.fillStyle = "black";
		ctx.fillText(loadedImgs + "/" + imageMap.size, midPoint.x, midPoint.y);

		ctx.fillStyle = "green";
		ctx.fillRect(gridSize, gridSize * (gridMin-2), loadedImgs/imageMap.size * gridSize*(Math.floor(canv.width/gridSize)-2), gridSize);
		ctx.strokeStyle = "black";
		ctx.strokeRect(gridSize, gridSize * (gridMin-2), gridSize*(Math.floor(canv.width/gridSize)-2), gridSize);
	}
}

function load(){
	midPoint.x = canv.width/2;
	midPoint.y = canv.height/2;
	
	imgScale = gridSize;

	let timelinesMap = parseTimelines();
	addTimelinesToTree(timelinesMap);
	let imagePaths = Object.values(timelinesMap)
		.flatMap(timeline => timeline.turns)
		.flatMap(turn => turn.image);

	imageMap = loadImages(imagePaths);
}

function addTimelinesToTree(timelinesMap) {
	for (let timeline of Object.values(timelinesMap)) {
		Main.timelineTree.addBranch(timeline.source);
		for (let turn of timeline.turns) {
			Main.timelineTree.addTurn(
				Number(timeline.id),
				Number(turn.number),
				getPhase(turn.phase),
				turn.image);
		}
	}
}

function getPhase(phase) {
	return phase == "f" ? FAST : SLOW;
}

function loadImages(imagePaths) {
	var toLoad = imagePaths.length;
	var imgPathMap = new Map();
	
	for (var i = 0; i < toLoad; i += 1) {
		imgObj = new Image();
		imgObj.onload = function () {
			loadedImgs++;
		}
		imgObj.src = imagePaths[i];
		imgPathMap.set(imagePaths[i], imgObj);
	}
	
	return imgPathMap;
}

function getColor(num)
{
	var hash = 5381;

	for (var i = 0; i < num + 10; i++) {
		hash = hash * 33 + i;
	}

	return "#" + ((hash % 16777215).toString(16));
}

function imageOnGrid(imageToDraw, x, y, tileScale){
	var drawX = gridSize * x - screenPan.x;
	var drawY = gridSize * y - screenPan.y;
	
	ctx.drawImage(imageToDraw, drawX, drawY, imgScale*tileScale, imgScale*tileScale);
	
	screenMax.x = Math.max(screenMax.x, drawX + gridSize * (tileScale + 2) + screenPan.x);
	screenMax.y = Math.max(screenMax.y, drawY + gridSize * (tileScale + 2) + screenPan.y);
}

function drawNodeConnection(x1, y1, x2, y2, timeline){
	// get line color
	ctx.strokeStyle = getColor(timeline);

	ctx.lineWidth = 3;
	
	// convert grid coords to screen coords
	x1 = gridSize * x1 + gridSize/2 - screenPan.x;
	y1 = gridSize * y1 + gridSize/2 - screenPan.y;
	x2 = gridSize * x2 + gridSize/2 - screenPan.x;
	y2 = gridSize * y2 + gridSize/2 - screenPan.y;
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	ctx.stroke();
}