import type { BookInstance } from './book';
import type { InteractableInstance } from './interactable';
import type { ItemInstance } from './item';
import type { KnowledgeInstance } from './knowledge';
import type { RoomInstance } from './room';
import { ExcelSchema } from './lib/parse';

class _Objects {
	fallback = new ExcelSchema<any>('', [], Function);
	#item: ExcelSchema<ItemInstance> | null = null;
	#intr: ExcelSchema<InteractableInstance> | null = null;
	#room: ExcelSchema<RoomInstance> | null = null;
	#book: ExcelSchema<BookInstance> | null = null;
	#know: ExcelSchema<KnowledgeInstance> | null = null;

	get item() {
		return this.#item || this.fallback;
	}
	set item(value: ExcelSchema<ItemInstance>) {
		this.#item = value;
	}
	get intr() {
		return this.#intr || this.fallback;
	}
	set intr(value: ExcelSchema<InteractableInstance>) {
		this.#intr = value;
	}
	get room() {
		return this.#room || this.fallback;
	}
	set room(value: ExcelSchema<RoomInstance>) {
		this.#room = value;
	}
	get book() {
		return this.#book || this.fallback;
	}
	set book(value: ExcelSchema<BookInstance>) {
		this.#book = value;
	}
	get know() {
		return this.#know || this.fallback;
	}
	set know(value: ExcelSchema<KnowledgeInstance>) {
		this.#know = value;
	}
}

const Objects = new _Objects();

export function resolve(idString: string) {
	const [type, id, comment] = idString.split(':');
	const data = Objects[type as keyof typeof Objects];
	if (!data) {
		throw new Error(`Unknown type: ${type}`);
	}
	return data?.map[id];
}

export default Objects;
