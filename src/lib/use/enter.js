export default function (node) {
	const handleKey = (event) => {
		if (event.code == 'Enter') {
			event.stopPropagation();
			node.dispatchEvent(new CustomEvent('enter'));
		}
	};

	node.addEventListener('keydown', handleKey, true);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKey, true);
		},
	};
}
