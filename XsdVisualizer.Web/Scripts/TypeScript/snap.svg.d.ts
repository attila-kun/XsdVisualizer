interface SnapSvgElement {
	attr(options): void;
	attr(propertyName: string, value: any): void;
	click(callback: Function): void;
}

interface SnapSvgPaper {
	node: HTMLElement;
	group();
	rect(x: number, y: number, width: number, height: number, rx?: number, ry?: number);
}

interface SnapSvgGroup {
	text(x: number, y: number, value: string);
	group(): SnapSvgGroup;
	append(group: SnapSvgGroup);
	append(group: SnapSvgElement);
	node: HTMLElement;
	rect(x: number, y: number, width: number, height: number, rx?: number, ry?: number);
	transform(matrix: SnapSvgMatrix);
}

interface SnapSvgMatrix {
	translate(x: number, y: number): SnapSvgMatrix;
}

interface ISnap {
	(width: number, height: number): SnapSvgPaper;
	Matrix: new() => SnapSvgMatrix;
}

declare var Snap: ISnap;