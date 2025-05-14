import { KnowledgeInstance } from './knowledge';

export class BookInstance extends KnowledgeInstance {
	get link() {
		return `/books/${this.id}`;
	}
}

import excel from './excel/books.csv?raw';
import { ExcelSchema, Field } from './lib/parse';

import Objects from '.';
Objects.book = new ExcelSchema<BookInstance>(
	excel,
	[
		{ key: 'id', type: String },
		{ key: 'name', type: String },
		{ key: '_', type: String },
		{ key: 'author', type: String },
		{ key: 'description', type: String },
		{ key: 'parsedText', type: String },
		{ key: 'pageNum', type: Number }
	],
	BookInstance
);
