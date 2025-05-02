import { clamp, delay, easeOut, easeOutQuart, tension, unlerp } from "$lib/alg";

function arraymove(arr, fromIndex, toIndex) {
	var element = arr[fromIndex];
	arr.splice(fromIndex, 1);
	arr.splice(toIndex, 0, element);
	return arr;
}

const defaultConfig = {
	log: false,
	time: 160,
	min: 0,
	max: 0,
	disabled: false,
	vertical: false,
	pointer: true
}

export default function drag(node, config = {}) {
	let state = {};
	let scroll = 0;
	config = Object.assign({ ...defaultConfig }, config)
	let setup = false;
	let locked = false;

	function init() {
		if (config.disabled) return destroy();
		if (setup) return;
		node.style.userSelect = 'none';
		// node.style.touchAction = 'none';
		node.addEventListener('mousedown', start)
		node.addEventListener('contextmenu', start)
		node.addEventListener('scroll', _scroll)
		setup = true;
	}

	init();

	function log(o) {
		const vertical = config.vertical;
		if (!log.elements) {
			node.style.overflow = 'visible';
			if (vertical)
				node.style.paddingLeft = '3em';
			else
				node.style.paddingTop = '20em';
			log.elements = {};
		}
		let i = 0;
		for (let key in o) {
			o = Object.fromEntries(Object.entries(o).reverse())
			if (!log.elements[key]) {
				log.elements[key] = node.appendChild(document.createElement('i'))
				log.elements[key].style.position = 'absolute';
				log.elements[key].style.fontSize = '12px';
				log.elements[key].style.fontFamily = 'monospace';
				log.elements[key].style.color = 'lime';
				log.elements[key].style.borderLeft = '1px lime solid';
				log.elements[key].style.background = 'rgba(0,0,0,0.6)';
				log.elements[key].style.padding = '3px';
			}
			if (vertical) {
				log.elements[key].style.marginLeft = `-${i * 18}px`
				log.elements[key].style.top = (o[key]?.join ? o[key][0] : o[key]) + 'px';
			} else {
				log.elements[key].style.marginTop = `-${i * 18}px`
				log.elements[key].style.left = (o[key]?.join ? o[key][0] : o[key]) + 'px';
			}
			log.elements[key].innerHTML = `${o[key]?.join ? o[key][1] : o[key]} : ${key}`;
			i++;
		}
	}

	function start(event) {
		const vertical = config.vertical;
		if (locked) return;
		if (event.type == 'contextmenu') {
			event.preventDefault();
		} else {
			if (event.button !== 0) return;
		}
		// node.style.userSelect = 'none'

		let e = event.target;
		if (e == node) return;
		while (e.parentNode != node) {
			e = e.parentNode;
		}
		let children = [...node.children].filter(ch => ch.tagName != 'I')
		children = children.slice(config.min, children.length - config.max);
		const index = children.indexOf(e);
		if (index == -1) return;

		state = {
			nodeBCR: node.getBoundingClientRect(),
			e,
			width: (vertical ? e.offsetHeight : e.offsetWidth),
			baseIndex: index,
			baseCenter: (vertical ? e.offsetTop : e.offsetLeft) + ((vertical ? e.offsetHeight : e.offsetWidth) / 2),
			baseLeft: (vertical ? e.offsetTop : e.offsetLeft),
			shift: 0,
			i: 0,
			context: event.type == 'contextmenu',
			initScroll: scroll,
			scrollDelta: 0
		}
		const coord = (vertical ? 'clientY' : 'clientX');
		state.nodeX = (vertical ? state.nodeBCR.top : state.nodeBCR.left);
		state.grabX = (event.touches ? event.touches[0][coord] : event[coord]) - state.nodeX;
		state.breakpoints = children
			.map((c, i) => {
				// let px = c.offsetLeft + (c.offsetWidth / 2);
				const offset = (vertical ? c.offsetTop : c.offsetLeft);
				const width = (vertical ? c.offsetHeight : c.offsetWidth);
				const total = (offset + width);
				return {
					node: c,
					value: i > state.baseIndex ? total - state.width : offset,
					center: offset + width / 2,
					left: i > state.baseIndex ? offset : total - state.width
					// left: c.offsetLeft - state.baseLeft
				};
			})

		e.style.transition = null;
		e.style.position = 'relative';
		e.style.zIndex = children.length;
		e.classList.add('drag');
		document.addEventListener('mousemove', move)
		document.addEventListener('touchmove', move, { passive: false })
		document.addEventListener('mouseup', stop)
		document.addEventListener('touchend', stop)
		document.addEventListener('touchcancel', stop)

		if (event.type == 'contextmenu') doTranslate(event);
	}

	function getRef() {
		return state.breakpoints[state.baseIndex + state.shift];
	}

	function getTarget(sign) {
		const resin = config.vertical ? 100 : 500;
		const targetIndex = state.baseIndex + sign + state.shift;
		const lastIndex = state.breakpoints.length - 1;
		if (targetIndex > lastIndex)
			return {
				center: state.breakpoints[lastIndex].center + resin,
				edge: 1
			}
		if (targetIndex < 0)
			return {
				center: state.breakpoints[0].center - resin,
				edge: -1
			}
		return state.breakpoints[targetIndex]
	}

	function doTranslate(event) {
		const vertical = config.vertical;
		const coord = (vertical ? 'clientY' : 'clientX');

		if (event)
			var delta = ((event.touches ? event.touches[0][coord] : event[coord]) - state.nodeX) - state.grabX + state.scrollDelta;
		else
			delta = state.scrollDelta;
		const sign = Math.sign(delta);
		const reference = state.ref = getRef();
		const target = getTarget(sign);

		const detent = target.center - (state.initScroll);
		const factor = clamp(unlerp(
			state.grabX,
			detent,
			state.grabX + delta
		));


		const translate = target.edge ?
			(getRef().value - state.baseLeft) + tension(factor) * (detent - state.grabX) * (vertical ? 0.1 : 0.02) :
			(getRef().value - state.baseLeft) + tension(factor) * (detent - state.grabX) * (vertical ? 1 : 0.6);

		if (state.context || state.move || Math.abs(delta) > (vertical ? 2 : 8)) {
			state.e.style.transform = vertical ? `translate(1px, ${translate}px)` : `translate(${translate}px, -3px)`;
			if (config.pointer)
				node.style.pointerEvents = 'none';
			state.move = true;
		}

		if (config.log) log({
			factor,
			shift: state.shift,
			sign,
			baseLeft: state.baseLeft,
			refV: getRef()?.value,
			refLeft: getRef()?.left,
			translate: [state.baseLeft + translate, translate],
			targetV: getTarget(sign)?.value,
			targetLeft: getTarget(sign)?.left,
			grabX: state.grabX,
			delta: [state.grabX + delta, delta],
			detent,
			ref: vertical ? getRef()?.node?.offsetTop : getRef()?.node?.offsetLeft,
			target: vertical ? getTarget(sign)?.node?.offsetTop : getTarget(sign)?.node?.offsetLeft,
		})

		return { delta, detent, factor, reference, target, sign };
	}

	let eventCache = null;

	async function move(event, force) {
		if (event) eventCache = event;
		event = eventCache;

		if (event && event.touches) event.preventDefault();
		if (event && !event.touches && state.context) return stop(event);

		const { delta, detent, factor, reference, target, sign } = doTranslate(event);
		// if(state.inTransition && Math.abs(delta) < 3) {
		// 	// const time = config.time - (performance.now() - state.transition);
		// 	state.e.style.transition = null;
		// }

		if (target.edge) return;
		// if(!state.once && target.node.style.transition)
		// 	target.node.style.transition = null;
		if (factor == 1) {
			const translate = config.vertical ? 'translateY' : 'translateX';
			state.e.style.transition = `transform ${config.time / 2}ms ease-out`;
			if ((sign > 0 && state.shift < 0) || (sign < 0 && state.shift > 0)) {
				reference.node.style.transition = `transform ${config.time}ms ease-out`;
				reference.node.style.transform = `${translate}(0px)`
			} else {
				target.node.style.transition = `transform ${config.time}ms ease-out`;
				target.node.style.transform = `${translate}(${reference.value - target.left}px)`
			}
			state.shift += sign;
			state.grabX = detent;
			move(event);
			state.inTransition = true;
			// state.transition = performance.now();
			if (state.cancel) {
				clearTimeout(state.cancel);
				state.e.style.transition = 'none';
			}
			state.cancel = setTimeout(() => {
				if (!state.e) return;
				state.inTransition = false;
				state.e.style.transition = 'none';
				state.cancel = 0;
			}, config.time / 2)

		}
	}

	async function stop(event) {
		document.removeEventListener('mousemove', move)
		document.removeEventListener('touchmove', move)
		document.removeEventListener('mouseup', stop)
		document.removeEventListener('touchend', stop)
		document.removeEventListener('touchcancel', stop)

		const translate = config.vertical ? 'translateY' : 'translateX';

		const { e, ref, baseLeft, shift, baseIndex } = state;
		const mv = state.move;
		state = {};
		e.classList.remove('drag')
		node.style.touchAction = null;
		if (!mv) {
			e.style.transform = null;
			return;
		}
		e.style.transition = `transform ${config.time}ms ease-out`;
		e.style.transform = `${translate}(${ref.value - baseLeft}px)`
		e.style.zIndex = null;
		locked = true;
		await delay(config.time);
		node.style.pointerEvents = null;
		e.style.transition = 'none';

		if (shift && config.items) {
			const items = arraymove([...config.items], baseIndex + config.min, baseIndex + shift + config.min);
			[...node.children].filter(c => c.tagName !== 'I').forEach(c => {
				c.style.transition = 'none'
				c.style.transform = null
				c.style.zIndex = null
				c.style.position = null
			});
			requestAnimationFrame(() => {
				node.dispatchEvent(
					new CustomEvent('moved', {
						detail: {
							items,
							index: baseIndex + config.min,
							shift: shift,
							shiftIndex: (baseIndex + config.min + shift > config.min) ? baseIndex + config.min + shift : null,
						}
					})
				);
				// [...node.children].forEach(c => {
				// 	c.style.transition = ''
				// });
			})
		}
		locked = false;
	}

	function _scroll(e) {
		scroll = config.vertical ? node.scrollTop : node.scrollLeft;
		if (state.e) {
			state.scrollDelta = scroll - state.initScroll;
			clearTimeout(_scroll.timeout);
			_scroll.timeout = setTimeout(() => move(), 5);
		}
	}

	function destroy() {
		node.removeEventListener('mousedown', start)
		node.removeEventListener('contextmenu', start)
		node.removeEventListener('scroll', start)
		setup = false;
	}

	return {
		destroy,
		update: (newConfig) => {
			config = Object.assign({ ...defaultConfig }, newConfig)
			init();
		}
	}
}