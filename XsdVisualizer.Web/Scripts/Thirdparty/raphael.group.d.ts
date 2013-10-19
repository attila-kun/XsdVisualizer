interface RaphaelPaper {
	group(): RaphaelGroup;
}

interface RaphaelGroup {
	push(element: RaphaelElement): RaphaelGroup;
	translate(newTranslateX: number, newTranslateY: number): RaphaelGroup;
	getBBox(): any;
	node: HTMLElement;
}