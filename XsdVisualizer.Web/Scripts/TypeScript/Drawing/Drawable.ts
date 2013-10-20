module XsdVisualizer.Drawing {

	export interface NativeBBox {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	export interface EventHandler<T> {
		(view: T): void;
	}

	export interface IDrawable {
		getBBox(): void;
		realign(): void;
		translate(x, y): void;
	}

	export class Drawable<TConcrete> {
		getBBox() { throw new Error(); }
		realign() { throw new Error(); }
		translate(x, y) { throw new Error(); }

		private events: { [key: string]: EventHandler<TConcrete>[] } = {};

		on(eventName: string, eventHandler: EventHandler<TConcrete>) {
			this.events[eventName] = this.events[eventName] || [];
			this.events[eventName].push(eventHandler);
		}

		trigger(eventName) {
			var eventHandlers: EventHandler<TConcrete>[] = this.events[eventName] || [];
			_.each(eventHandlers, eventHandler => eventHandler(this));
		}
	}
}