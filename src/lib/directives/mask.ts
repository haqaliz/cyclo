import iMask from 'imask';
import UAParser from 'ua-parser-js';

const parser = new UAParser();

const fireEvent = (el, eventName, data) => {
	const e = document.createEvent('CustomEvent');
	e.initCustomEvent(eventName, true, true, data);
	el.dispatchEvent(e);
};

const mask = (node, args) => {
	const browser = parser.getBrowser();
	if (browser.name.toLowerCase() === 'firefox') {
		const fireMaskEvents = (node, data) => {
			const unmaskedValue = data.replace(/[^\w\s]/gi, '').replace(/ +/g, '');
			fireEvent(node, 'accept', {
				unmaskedValue
			});
			fireEvent(node, 'accept', {
				unmaskedValue
			});
		};
		node.addEventListener('keyup', (e) => fireMaskEvents(node, e.target.value));
		const handleMask = (e) => {
			const last = e?.key || e.target.value[e.target.value.length - 1];
			if (args.mask instanceof RegExp) {
				const masked = e.target.value.match(args.mask);
				if (!last.match(args.mask)) e.preventDefault();
				if (masked?.length) e.target.value = masked[0];
				fireMaskEvents(node, e.target.value);
				return;
			}
			if (!args || !args.mask || e.target.value.length < args.mask.length) {
				if (typeof args.mask === 'string') {
					const i = e.target.value.length;
					const j = args.mask[i];
					if (last !== j && j !== '0') {
						const beforeNext = args.mask.indexOf('0', i);
						e.target.value += !last.match(/\d/)
							? args.mask.substr(i, beforeNext - i)
							: `${args.mask.substr(i, beforeNext - i)}${last}`;
						e.preventDefault();
					}
					if (!last.match(/\d/) && j === '0') e.preventDefault();
				}
				fireMaskEvents(node, e.target.value);
				return;
			}
			e.preventDefault();
		};
		node.addEventListener('keypress', handleMask);
		node.addEventListener('change', handleMask);
		return;
	}

	const maskedNode = iMask(node, args);

	maskedNode.on('accept', () => fireEvent(node, 'accept', maskedNode));
	maskedNode.on('complete', () => fireEvent(node, 'complete', maskedNode));

	return {
		destroy() {
			maskedNode.destroy();
		}
	};
};

export default mask;
