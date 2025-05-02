export default function (node) {
	const handleKey = (event) => {
		if (event.code == 'Escape') {
			event.stopPropagation();
			node.dispatchEvent(new CustomEvent('escape'));
		}
	};

	node.addEventListener('keydown', handleKey, true);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKey, true);
		},
	};
}
