export class KnowledgeInstance {
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
	get magnifierParsedText() {
		return this.data.magnifierParsedText;
	}
	get comments() {
		return this.data.comments;
	}
	get image() {
		return `/images/knowledge/${this.id}.webp`;
	}
	get link() {
		return `/knowledge/${this.id}`;
	}
	get foundIn() {
		return Objects.room.table.filter((r) => r.knowledgeItems.includes(this));
	}
}

import Objects from '.';
import excel from './excel/knowledge.csv?raw';
import { ExcelSchema, Field } from './lib/parse';

Objects.know = new ExcelSchema<KnowledgeInstance>(
	excel,
	[
		{ key: 'id', type: String },
		{ key: 'realName', type: String },
		{ key: 'name', type: String },
		{ key: 'location', type: Field.commaSeparatedSet },
		{ key: 'description', type: String },
		{ key: 'pageNum', type: Number },
		{ key: 'parsedText', type: String },
		{ key: 'magnifierParsedText', type: String },
		{ key: 'comments', type: String }
	],
	KnowledgeInstance
);

console.log(Objects.know);
