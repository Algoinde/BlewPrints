export class InteractableInstance {
	data: any;
	constructor(o: any) {
		this.data = o;
	}

	get id() {
		return this.data.id;
	}
	get name() {
		return this.data.name;
	}
	get location() {
		return this.data.location;
	}
	get requiresItem() {
		return resolve(this.data.requiresItem);
	}
}

import Objects, { resolve } from '.';
import excel from './excel/interactables.csv?raw';
import { ExcelSchema, Field } from './lib/parse';

Objects.intr = new ExcelSchema<InteractableInstance>(
	excel,
	[
		{ key: 'id', type: String },
		{ key: 'name', type: String },
		{ key: 'location', type: Field.commaSeparatedArray },
		{ key: 'requiresItem', type: String }
	],
	InteractableInstance
);
