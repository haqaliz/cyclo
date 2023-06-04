const inject = (node, argument = 'body') => {
	let targetNode;

	if (typeof argument !== 'string') {
		targetNode = argument;
	} else {
		targetNode = document.querySelector(argument);
	}

	targetNode.appendChild(node);

	return {
		destroy() {
			node.remove();
		},
	};
};

export default inject;
