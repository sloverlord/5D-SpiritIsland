function createTimelines(){
	Main.timelineTree.addBranch(-1, new Turn(0, 1, FAST));
	Main.timelineTree.addTurn(0, 1, SLOW);
	Main.timelineTree.addTurn(0, 2, FAST);
	Main.timelineTree.addTurn(0, 4, FAST);
	Main.timelineTree.addTurn(0, 5, FAST);
	Main.timelineTree.addTurn(0, 6, FAST);
	Main.timelineTree.addBranch(0, new Turn(1, 2, FAST));
	Main.timelineTree.addTurn(1, 3, FAST);
	Main.timelineTree.addBranch(0, new Turn(2, 3, FAST));
	Main.timelineTree.addBranch(2, new Turn(3, 4, FAST));
}