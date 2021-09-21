const paramsString = window.location.href;
let searchParams = new URLSearchParams(paramsString);
let url =
	window.location.protocol + '//' + window.location.hostname + '/?redirect';
let redirectUrl = searchParams.get(url);
console.log(redirectUrl);

const container = document.getElementById('container');
let target = document.getElementById('title');

let a = document.createElement('button');
a.type = 'button';
a.textContent = 'https://www.youtube.com/watch?v=a3Z7zEc5AXQ';

let b = document.createElement('button');
b.type = 'button';
b.textContent = 'https://www.youtube.com/watch?v=a3Z5zEc7AXQ';

const correct = 'https://www.youtube.com/watch?v=a3Z7zEc7AXQ';

let c = document.createElement('button');
c.type = 'button';
c.textContent = correct;

// use prettier

let append = (parent, e) => {
	parent.insertAdjacentElement('afterend', e);
};

// fisher-yates shuffle from https://bost.ocks.org/mike/shuffle/

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

let elements = shuffle([a, b, c]);

for (let el of elements) {
	el.onclick = () => {
		// console.log(el.innerHTML);
		if (el.innerHTML === correct) {
			// console.log('yep');
			window.location.href = correct;
		} else {
			advance();
		}
	};
	append(target, el);
}

// a, b, c = null, null, null
elements = null;

// console.log(number)

// target = null;

let advance = () => {
	for (el of [a, b, c]) {
		el.parentNode.removeChild(el);
	}

	let d = document.getElementById('second');

	d.style.position = 'relative';
	d.style.visibility = 'visible';
	d.style.top = '0px';

	let imgElements = document.getElementsByTagName('img');

	let dragElement;

	for (let img of imgElements) {
		img.draggable = 'true';
		img.style.cursor = 'move';

		// var dragElement;

		// swap el positions

		// https://stackoverflow.com/a/52446165/14738189
		function swapElements(el1, el2) {
			let prev1 = el1.previousSibling;
			let prev2 = el2.previousSibling;

			prev1.after(el2);
			prev2.after(el1);
		}

		let ondrop = (e) => {
			if (e.stopPropagation) {
				e.stopPropagation();
			}

			// console.log('dragelement received: ', dragElement);

			if (dragElement !== img) {
				console.log('continuing');

				swapElements(img, dragElement);
			}

			return false;
		};
		let ondragstart = (e) => {
			dragElement = img;
			e.dataTransfer.effectAllowed = 'move';
			// console.log('img.innerhtml = ', img.innerHTML, 'txt=', img.textContent, img.toString())
			e.dataTransfer.setData('text/html', img.outerHTML);
			// console.log('set drag el', dragElement);
		};
		let ondragend = () => {
			for (let img of imgElements) {
				img.classList.remove('over');
			}
		};
		let ondragleave = () => {
			img.classList.remove('over');
		};
		let ondragenter = (e) => {
			// console.log('ayo');
			img.classList.add('over');
		};
		let ondragover = (e) => {
			e.preventDefault();
			// e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.dropEffect = 'move';

			return false;
		};

		img.addEventListener('dragleave', ondragleave, false);

		img.addEventListener('dragstart', ondragstart, false);

		img.addEventListener('dragover', ondragover, false);
		img.addEventListener('dragenter', ondragenter, false);
		img.addEventListener('drop', ondrop, false);
	}
};

const du  = document.getElementById('du')
let counter;
let video = document.getElementById('if');
let audio = document.createElement('Audio');
let button2 = document.getElementById('verify2');


let onAudioShouldBeEnded = ()=>	{
		audio.pause()
	  clearInterval(counter);
		counter = null;
		du.textContent = `duration left: 0s`
		video.pause();
		button2.style['pointer-events'] = 'None';
		button2.textContent = ('verified️️ ✔️');
		if (redirectUrl){
			button2.textContent +='; redirecting'
			setTimeout(() => {
				window.location.href = redirectUrl;
			}, 1200);
		}
}
document.getElementById('verify1').onclick = () => {
	// check order
	let imgElements = document.getElementsByTagName('img');
	let order = {
		'https://i.imgur.com/9Rs8KhN.png': 0, // 1
		'https://i.imgur.com/sou8MWy.png': 1, // 2
		'https://i.imgur.com/nSW7SyQ.png': 2, // 3
	};

	// let correct = false;
	// in order; first to last as visible
	for (let i = 0; i < 3; ++i) {
		// console.log(imgElements[i].src);
		let img = imgElements[i];
		if (i !== order[img.src]) {
			console.log('incorrect');
			console.log(i, ' !== ', order[img.src]);
			window.location.href = correct;
			return;
		}
	}

	// if it was correct

	second.parentNode.removeChild(second);

	let d = document.getElementById('third');
	d.style.position = 'relative';
	d.style.visibility = 'visible';
	d.style.top = '0px';

	// let video = document.createElement('Video'); video.width="612"
	// video.height="315"
	// video.autoplay='true'
	// video.src="https://i.imgur.com/FXEZiJK.mp4"

	// video = document.getElementById('if');
	video.autoplay = 'true';



	// let t = Date.now();
	audio.autoplay = 'true';
	audio.src = 'rickaudio.mp3';
	// compensation
	// audio.currentTime = video.currentTime - (Date.now() - t) - 0.5;

	// audio seems to play late often

	// hopefully this should fix the sync issues
	audio.currentTime = 0//(Date.now() - t)
	video.currentTime = 0.04






	// audio.currentTime += 5;
	// how does this not work sometimes? just how?
	// audio.addEventListener('ended', onAudioEnded, false);

	
	button2.onclick = () => {
		if (audio.currentTime < 60) {
			// display 60 hours now
			video.loop = 'true';
			audio.loop = 'true';
			button2.style['background-color'] = '#ff0000';
			button2.innerHTML = `<del>verify</del>`;
			button2.style['pointer-events'] = 'None';
			target.style.color = '#ff0000';
			video.style.filter = 'saturate(8)';
			clearInterval(counter);
			counter = null;
			du.textContent = '∞';

		}
	};
};




let num = 65
counter = setInterval(()=>{
	if(num===0){
		clearInterval(counter);
		counter=null;
		// need this because audio ended does not fire at the right time, we should just remove  it
		onAudioShouldBeEnded()
	}
	du.textContent = `duration left: ${num}s`
	num -= 1
}, 1000)