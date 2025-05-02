type TextNode = {
	tag: '';
	content: string;
	style: undefined;
};

type TagNode = {
	tag: string;
	style?: string;
	content: string | ParsedNode[];
};

export type ParsedNode = TextNode | TagNode;

/**
 * Safely parses Unity RichText tags and returns a structured object representation
 */
export function parseRichText(text: string): ParsedNode {
	// Define supported tags and their style mappings
	const supportedTags: Record<string, (value?: string) => string> = {
		b: () => 'font-weight: bold',
		i: () => 'font-style: italic',
		size: (value) => `font-size: ${value || '100%'}`,
		color: (value) => `color: ${value || 'inherit'}`
		// Add more tags as needed
	};

	// Root node
	const rootNode: TagNode = {
		tag: 'span',
		content: []
	};

	let currentPos = 0;
	let currentNode = rootNode;
	const nodeStack: TagNode[] = [rootNode];

	while (currentPos < text.length) {
		// Look for opening tag
		const openTagIndex = text.indexOf('<', currentPos);

		// If no more tags, add remaining text as TextNode
		if (openTagIndex === -1) {
			if (currentPos < text.length) {
				const content = text.substring(currentPos);
				if (Array.isArray(currentNode.content)) {
					currentNode.content.push({ tag: '', content });
				} else {
					currentNode.content = [{ tag: '', content }];
				}
			}
			break;
		}

		// Add text before tag as TextNode
		if (openTagIndex > currentPos) {
			const content = text.substring(currentPos, openTagIndex);
			if (Array.isArray(currentNode.content)) {
				currentNode.content.push({ tag: '', content });
			} else {
				currentNode.content = [{ tag: '', content }];
			}
		}

		// Find closing bracket of tag
		const closeTagIndex = text.indexOf('>', openTagIndex);
		if (closeTagIndex === -1) {
			console.error('Malformed tag: missing closing bracket');
			currentPos = openTagIndex + 1;
			continue;
		}

		// Extract tag content
		const tagContent = text.substring(openTagIndex + 1, closeTagIndex);

		// Check if it's a closing tag
		if (tagContent.startsWith('/')) {
			const tagName = tagContent.substring(1).toLowerCase();

			// Pop the stack until we find the matching opening tag
			let found = false;
			for (let i = nodeStack.length - 1; i > 0; i--) {
				if (
					nodeStack[i].tag === tagName ||
					(nodeStack[i].tag === 'span' && supportedTags[tagName])
				) {
					// Pop nodes up to and including the matching tag
					while (nodeStack.length > i) {
						nodeStack.pop();
					}
					currentNode = nodeStack[nodeStack.length - 1];
					found = true;
					break;
				}
			}

			if (!found) {
				console.error(`Closing tag </${tagName}> doesn't match any opening tag`);
			}

			currentPos = closeTagIndex + 1;
			continue;
		}

		// Handle opening tag
		// Parse tag name and attributes
		const tagParts = tagContent.split('=');
		const tagName = tagParts[0].toLowerCase().trim();
		let tagValue: string | undefined;

		if (tagParts.length > 1) {
			tagValue = tagParts[1].trim();
			// Remove quotes if present
			if (
				(tagValue.startsWith('"') && tagValue.endsWith('"')) ||
				(tagValue.startsWith("'") && tagValue.endsWith("'"))
			) {
				tagValue = tagValue.substring(1, tagValue.length - 1);
			}
		}

		// Check if it's a supported tag
		const styleGetter = supportedTags[tagName];
		if (styleGetter) {
			// Create new node for this tag
			const newNode: TagNode = {
				tag: tagName === 'b' || tagName === 'i' ? tagName : 'span',
				style: styleGetter(tagValue),
				content: []
			};

			// Add to current node's content
			if (Array.isArray(currentNode.content)) {
				currentNode.content.push(newNode);
			} else {
				currentNode.content = [newNode];
			}

			// Update current node and stack
			nodeStack.push(newNode);
			currentNode = newNode;
		} else {
			console.error(`Unsupported tag: <${tagName}>`);
		}

		currentPos = closeTagIndex + 1;
	}

	// Simplify single content nodes
	// This recursive function converts single-item arrays to direct content
	const simplifyNode = (node: ParsedNode): ParsedNode => {
		if ('content' in node && Array.isArray(node.content)) {
			// Recursively simplify children
			node.content = node.content.map(simplifyNode);

			// If there's only one text node, simplify to string
			if (node.content.length === 1 && node.content[0].tag === '') {
				return {
					...node,
					content: node.content[0].content
				};
			}
		}
		return node;
	};

	return simplifyNode(rootNode);
}

// Example usage
// const example1 = 'This is <color=red>colored</color> text';
// const example2 = 'This is <b>bold</b> and <i>italic</i> text';
// const example3 = 'This has <size=20>different</size> <size=10>sizes</size>';
// const example4 = 'This has <color=#FF0000>red</color> and <color=blue>blue</color> text';
// const example5 = 'Nested <b>bold <i>and italic</i></b> text';
// const example6 = 'This has an <unknown>unsupported tag</unknown>';
// const example7 = 'This has a <b>malformed tag';

// console.log(JSON.stringify(parseRichText(example1), null, 2));
// console.log(JSON.stringify(parseRichText(example2), null, 2));
// console.log(JSON.stringify(parseRichText(example3), null, 2));
// console.log(JSON.stringify(parseRichText(example4), null, 2));
// console.log(JSON.stringify(parseRichText(example5), null, 2));
// console.log(JSON.stringify(parseRichText(example6), null, 2));
// console.log(JSON.stringify(parseRichText(example7), null, 2));
