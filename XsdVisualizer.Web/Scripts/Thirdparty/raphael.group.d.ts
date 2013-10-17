interface RaphaelPaper {
	group(): RaphaelGroup;
}

interface RaphaelGroup {
	push(element: RaphaelElement): void;
}