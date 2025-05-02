export class BookInstance {
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
	get description() {
		return this.data.description;
	}
	get parsedText() {
		return this.data.parsedText;
	}
	get numberPages() {
		return this.data.numberPages;
	}
}

import excel from './excel/books.csv?raw';
import { ExcelSchema, Field } from './lib/parse';

const bookExcel = new ExcelSchema<BookInstance>(
	excel,
	[
		{ key: 'id', type: String },
		{ key: 'name', type: String },
		{ key: 'location', type: Field.commaSeparatedArray },
		{ key: 'description', type: String },
		{ key: 'parsedText', type: String },
		{ key: 'numberPages', type: Number }
	],
	BookInstance
);

export default bookExcel;
