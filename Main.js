const FAST = 0;
const SLOW = 1;

class Multiverse {
	timelines = [];
	
	addBranch(source){
		this.timelines[this.timelines.length] = new Timeline(source, this.timelines.length);
	}
	
	addTurn(timeline, turn, phase){
		this.timelines[timeline].addTurn(new Turn(timeline, turn, phase));
	}

	getTurn(timeline, turn, phase){
		return this.timelines[timeline].getTurn(turn, phase);
	}
}

class Timeline {
	constructor(source, timeline){
		this.timelineIdx = timeline;
		this.source = source;
		this.firstTurn = null;
	}
	
	addTurn(turn){
		if (this.firstTurn != null) {
			return (this.firstTurn.addTurn(turn));
		} else {
			this.firstTurn = turn;
			return true;
		}
	}

	getTurn(turn, phase){
		if (this.firstTurn != null) {
			return this.firstTurn.findTurn(turn, phase);
		} else {
			return null;
		}
	}
	
	getTurns(){
		if (this.firstTurn != null) {
			return this.firstTurn.getTurns();
		} else {
			return [];
		}
	}
}

class Turn {
	constructor(idx, turn, phase){
		this.timeline = idx;
		this.turn = turn;
		this.phase = phase;
		this.nextTurn = null;
		this.img = imageList[(this.timeline + this.turn + this.phase * 7) % imageList.length];
		
		this.x, this.y;
		this.calcCoords();
	}
	
	addTurn(turn){
		if(this.nextTurn == null){
			this.nextTurn = turn;
			return true;
		} else {
			return (this.nextTurn.addTurn(turn));
		}
	}
	
	findTurn(turn, phase){
		if (this.turn == turn && this.phase == phase){
			return this;
		} else if (this.turn > turn){
			return null;
		} else if(this.nextTurn != null) {
			return this.nextTurn.findTurn(turn, phase);
		} else {
			return null;
		}
	}
	
	getTurns(){
		if(this.nextTurn == null){
			return [this];
		} else {
			var turns = this.nextTurn.getTurns();
			return [this].concat(turns);
		}
	}
	
	calcCoords(){
		this.x = 1 + (this.phase * nodeGap.x) + (this.turn-1) * nodeGap.x * 2;
		this.y = 3 + (this.timeline-1) * nodeGap.x;
	}

	calcPrevTurn(){
		var dat = {
			turn:this.turn,
			phase:this.phase
		};

		if (dat.phase == FAST){
			dat.turn -= 1;
		}

		dat.phase = (dat.phase + 1) % 2;

		return dat;
	}
}

class Main {
	//static timelineTree = new Tree(new Branch(1,1));
	static timelineTree = new Multiverse();

	static activate(){
		clearInterval(activeInterval);
		activeKeyRemover();
		
		activeInterval = setInterval(Main.loop, 1000/100);
		document.addEventListener("keydown", Main.keyPush);
		activeKeyRemover = Main.keyRemover;
	}
	
	static keyRemover(){
		document.removeEventListener("keydown", Main.keyPush);
	}
	
	static setup(){
		createTimelines();
	}
	
	static loop (){
		Main.draw();
	}
	
	static draw(){
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canv.width, canv.height);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		ctx.strokeRect(0, 0, canv.width, canv.height);
		
//		Main.drawGrid();

		// draw lines
		for (var i = 0; i < Main.timelineTree.timelines.length; i += 1){
			var turns = Main.timelineTree.timelines[i].getTurns();

			// draw arrow to source timeline
			var currTimeline = Main.timelineTree.timelines[i];
			if (currTimeline.source != -1){
				var prev = currTimeline.firstTurn.calcPrevTurn();
				var parentTurn = Main.timelineTree.getTurn(currTimeline.source, prev.turn, prev.phase);
				drawNodeConnection(currTimeline.firstTurn.x, currTimeline.firstTurn.y, parentTurn.x, parentTurn.y);
			}
		}

		// draw images
		for (var i = 0; i < Main.timelineTree.timelines.length; i += 1){
			var turns = Main.timelineTree.timelines[i].getTurns();
			
			for (var j = 0; j < turns.length; j += 1){
				// draw current node
				if(turns[j].nextTurn != null){ drawNodeConnection(turns[j].x, turns[j].y, turns[j].nextTurn.x, turns[j].y); }
				imageOnGrid(turns[j].img, turns[j].x, turns[j].y, 1)
			}
		}
		
		if (mouse.action == "zoom"){
			var turnToSee = Main.clickedOnTurn();
			
			if (turnToSee != null){
				var screenFill = .95;
				
				//rescale image
				var imgScale = Math.min((canv.width*screenFill)/turnToSee.img.width, (canv.height*screenFill)/turnToSee.img.height);
				var imgWidth = turnToSee.img.width * imgScale;
				var imgHeight = turnToSee.img.height * imgScale;
				
				// center image
				var xPos = midPoint.x - (imgWidth / 2);
				var yPos = midPoint.y - (imgHeight / 2);
				
				ctx.drawImage(turnToSee.img, xPos, yPos, imgWidth, imgHeight);
				ctx.lineWidth = 10;
				ctx.strokeRect(xPos, yPos, turnToSee.img.width * imgScale, turnToSee.img.height * imgScale);
			}
		}
		
	//	mouse.draw();
	}
	
	static drawGrid(){
		ctx.lineWidth = 1;
		var cols = canv.width / gridSize;
		var rows = canv.height / gridSize;
		
		for (var i = 0; i < cols; i += 1){
			ctx.strokeRect(-10, -10, i * gridSize + 10 - screenPan.x, canv.height + 20 - screenPan.y);
		}
		
		for (var i = 0; i < rows; i += 1){
			ctx.strokeRect(-10, -10, canv.width + 20 - screenPan.x, i * gridSize + 10 - screenPan.y);
		}
	}
	
	static clickedOnTurn(){
		// calc grid pos
		var gridX = Math.floor((mouse.snapshot.x + screenPan.x) / gridSize);
		var gridY = Math.floor((mouse.snapshot.y + screenPan.y) / gridSize);
		
		for (var i = 0; i < Main.timelineTree.timelines.length; i += 1){
			if (Main.timelineTree.timelines[i].firstTurn.y == gridY){
				var turns = Main.timelineTree.timelines[i].getTurns();
				
				for (var j = 0; j < turns.length; j += 1){
					if (turns[j].x == gridX){
						return turns[j];
					}
				}
			}
		}
		
		return null;
	}
	
	static keyPush(evt) {
		switch(evt.keyCode) {
			case 38: // up
			case 87: // w
				
				break;
			case 40: //down
			case 83: // s
				
				break;
			case 13: // enter
				
				break;
		}
	}
}