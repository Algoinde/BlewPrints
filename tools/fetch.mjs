import fs from 'fs/promises';
import path from 'path';

const SHEETS = [
	'Rooms',
	'Upgrades',
	'Items',
	'Interactables',
	'Knowledge',
	'Books',
	'Relations',
	'ConceptGroups'
];

const BASE_URL =
	'https://docs.google.com/spreadsheets/d/1r_iI-CBb-DIu7nupCbckxp7aw5tMMP214y6PDigBvIQ/gviz/tq?tqx=out:csv&sheet=';
const OUTPUT_DIR = './src/lib/data/excel';

async function fetchAndSaveSheet(sheetName) {
	const url = `${BASE_URL}${sheetName}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch sheet "${sheetName}": ${response.statusText}`);
	}

	const csvData = await response.text();
	const filePath = path.join(OUTPUT_DIR, `${sheetName.toLowerCase()}.csv`);

	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, csvData, 'utf8');

	console.log(`Saved "${sheetName}" to ${filePath}`);
}

async function main() {
	try {
		const fetchPromises = SHEETS.map((sheet) => fetchAndSaveSheet(sheet));
		await Promise.all(fetchPromises);
		console.log('All sheets have been fetched and saved.');
	} catch (error) {
		console.error('Error:', error.message);
	}
}

main();
