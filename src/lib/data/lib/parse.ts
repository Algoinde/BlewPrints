interface ExcelSchemaFieldInterface {
	key: string;
	type: Function;
}

class CSVParserInterface {
	static parse(data: string) {
		throw new Error('Method not implemented.');
	}
}

class BasicCSVParser implements CSVParserInterface {
	static parse(data: string) {
		const lines = data
			.split('\n')
			.filter((row) => row.length > 0 && !row.startsWith('\t') && !row.startsWith(' '));
		const rows = lines.map((line) => line.split('\t'));
		return rows;
	}
}

import { parse } from 'csv-parse/browser/esm/sync';

class QuoteCSVParser implements CSVParserInterface {
	static parse(data: string) {
		return parse(data, { columns: false, skip_empty_lines: true, trim: true, from_line: 2 }).filter(
			(r: any) => r[0] != ''
		);
	}
}

export class ExcelSchema<T> {
	table: T[] = [];
	map: Record<string, T> = {};
	schema: ExcelSchemaFieldInterface[];
	cls: new (...args: any[]) => T;

	constructor(data: string, schema: ExcelSchemaFieldInterface[], cls: new (...args: any[]) => T) {
		this.schema = schema;
		this.cls = cls;
		this.parse(data);
	}

	parse(data: string) {
		const parsed = QuoteCSVParser.parse(data);

		for (let i = 0; i < parsed.length; i++) {
			const row = parsed[i];
			const o: Record<string, any> = {};
			for (let j = 0; j < this.schema.length; j++) {
				const cell = row[j];
				const field = this.schema[j];
				o[field.key] = field.type(cell);
			}
			const instance = new this.cls(o);
			this.table.push(instance);
			this.map[o.id] = instance;
		}
	}

	merge(excelSchema: ExcelSchema<T>) {
		this.table.push(...excelSchema.table);
		this.map = { ...this.map, ...excelSchema.map };
		return this;
	}
}

export class Field {
	static commaSeparatedArray(c: string) {
		return c
			.split(',')
			.map((s) => s.split(':').slice(0, 2).join(':').trim())
			.filter(Boolean);
	}
	static commaSeparatedSet(c: string) {
		return new Set(Field.commaSeparatedArray(c));
	}
	static foreign(key: string) {}
}

export class Sort {
	static by<T extends Record<string, any>>(key: string) {
		return (a: T, b: T) => {
			return a[key] - b[key];
		};
	}
}
