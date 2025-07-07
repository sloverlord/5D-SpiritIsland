function createTimelines(){
	Main.timelineTree.addBranch(-1);
	Main.timelineTree.addBranch(0);
	Main.timelineTree.addBranch(0);
	Main.timelineTree.addBranch(2);

	Main.timelineTree.addTurn(0, 1, FAST);
	Main.timelineTree.addTurn(0, 1, SLOW);
	Main.timelineTree.addTurn(0, 2, FAST);
	Main.timelineTree.addTurn(0, 2, SLOW);
	Main.timelineTree.addTurn(0, 3, FAST);
	Main.timelineTree.addTurn(0, 3, SLOW);
	Main.timelineTree.addTurn(0, 4, FAST);

	Main.timelineTree.addTurn(1, 2, FAST);
	Main.timelineTree.addTurn(1, 2, SLOW);
	Main.timelineTree.addTurn(1, 3, FAST);

	Main.timelineTree.addTurn(2, 3, FAST);
	Main.timelineTree.addTurn(2, 3, SLOW);
	Main.timelineTree.addTurn(2, 4, FAST);

	Main.timelineTree.addTurn(3, 3, SLOW);
}