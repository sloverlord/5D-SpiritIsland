class MouseManager {
	pos = {
		x : 0,
		y : 0
	};
	
	snapshot = {
		x : 0,
		y : 0
	};
	
	action = "none";
	
	setup(){
		document.addEventListener("mousemove", this.mouseMove);
		document.addEventListener("mousedown", this.mouseClick);
		document.addEventListener("mouseup", this.mouseRelease);
	}
	
	mouseMove(e){
		mouse.pos.x = e.offsetX;
		mouse.pos.y = e.offsetY;
		
		if (mouse.action == "pan"){
			screenPan.x -= mouse.pos.x - mouse.snapshot.x;
			screenPan.y -= mouse.pos.y - mouse.snapshot.y;
			
			mouse.snapshot = Object.assign({}, mouse.pos);
		}
	}
	
	mouseClick(e){
		if (mouse.action == "none"){
			if (e.button == 0){
				// ^ check left click
				mouse.snapshot = Object.assign({}, mouse.pos);
				if (Main.clickedOnTurn() != null){
					mouse.action = "zoom";
				}
			} else if (e.button == 1){
				// ^ check middle click
			} else if (e.button == 2){
				// ^ check right click
				mouse.snapshot = Object.assign({}, mouse.pos);
				mouse.action = "pan";
			}
		} else if (mouse.action == "zoom"){
			mouse.action = "none";
		}
	}
	
	mouseRelease(e){
		if (e.button == 0){
			// ^ check left click
			
		} else if (e.button == 1){
			// ^ check middle click
			mouse.action = "none";
		} else if (e.button == 2){
			// ^ check right click
			mouse.action = "none";
		}
	}
	
	draw(){
		ctx.fillStyle = "green";
		ctx.fillRect(this.pos.x-5, this.pos.y-5, 10, 10);
		
		// calc grid pos
		var gridX = Math.floor((mouse.pos.x + screenPan.x) / gridSize);
		var gridY = Math.floor((mouse.pos.y + screenPan.y) / gridSize);
		
		ctx.strokeRect(gridX * gridSize - screenPan.x, gridY * gridSize - screenPan.y, gridSize, gridSize);
	}
}

mouse = new MouseManager();