function createTimelines(){
	Main.timelineTree.addBranch(-1, new Turn(0, 1));
	Main.timelineTree.addTurn(0, 2);
	Main.timelineTree.addTurn(0, 3);
	Main.timelineTree.addTurn(0, 4);
	Main.timelineTree.addTurn(0, 5);
	Main.timelineTree.addTurn(0, 7);
	Main.timelineTree.addBranch(0, new Turn(1, 2));
	Main.timelineTree.addTurn(1, 3);
	Main.timelineTree.addBranch(0, new Turn(2, 3));
	Main.timelineTree.addBranch(2, new Turn(3, 4));
}