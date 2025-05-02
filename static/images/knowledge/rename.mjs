import { glob } from 'glob';
import fs from 'fs';

const normalize = (str) => str.toLowerCase().replace(/\s+/g, '');

function toCamelCaseStrippedID(str) {
	const parts = str.split(/[\s-]+/);
	const camelCased = parts
		.map((part, index) => {
			if (index === 0) {
				return part.toLowerCase();
			}
			return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
		})
		.join('');
	return camelCased.replace(/[^a-zA-Z0-9]/g, '');
}

const pattern = `./*.webp`;

const files = glob.sync(pattern);
files.forEach((file) => {
	try {
		const extension = file.split('.').pop();
		const name = file.split('/').pop().split('.')[0];
		const newName = `${toCamelCaseStrippedID(name)}.${extension}`;
		fs.renameSync(file, newName);
		console.log(`Renamed ${file} -> ${newName}`);
	} catch (e) {
		console.error(`Error renaming ${file}`);
	}
});
