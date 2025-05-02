export default {
	multipass: true, // boolean
	plugins: [
		"preset-default", // built-in plugins enabled by default
		{
			name: "prefixIds",
			params: {
				prefix: {
					toString() {
						return (Math.random() || 0.0000000000001)
							.toString(36)
							.slice(2);
					},
				},
			},
		},
	],
};
