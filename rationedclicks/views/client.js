/**
 * @fileoverview code containing the main logic for the site
 * @author: @un-index 
 */

window.onload = function(){
	alert('Terms of Service\n1) You may not use your own mouse; click on the window to use our customized high performance mouse.\nAdditionally, you will be reminded of any notices frequently so you remember (this will consume clicks).')
}

let canvas = document.querySelector('canvas');
// console.log(canvas)

/**
 * new strat
 * hide pointer
 * create proxy
 * move proxy
 *
 */

var x = 150;
var y = 150;

var ctx = canvas.getContext('2d');

const image = document.getElementById('source');

let chargeLevel = document.getElementById('charge_level');

let contains = (obj, secondObj, usePadding=true) => {
	let {x, y, right, bottom} = obj.getBoundingClientRect();
	let clientBoundingRect = secondObj.getBoundingClientRect();
	let x2 = clientBoundingRect.x;
	let y2 = clientBoundingRect.y;
	
	let padding = usePadding&&1.5||0

	return x2 > x+padding*48 && x2 < right-padding*60 && y2 > y+padding*10 && y2 < bottom-padding*20;
};

let listener;

let stopDischarging = () => {
	clearInterval(dischargeListener);
	dischargeListener = null;
};

let setUpListener = () => {
	stopDischarging();
	return setInterval(() => {
		if (contains(charge_level, image)) {
			console.log('contains');
			console.log('current: ', mult);
			let t = mult + step * chargeStrictnessFactor
			mult = (t <= maxMult && t) || maxMult;
			console.log("inc'd mult to %s", mult);

			t = clickCount + clickCountStep * chargeStrictnessFactor
			clickCount = (t <= 10 && t) || 10;
			console.log("inc'd clickCount to %s", clickCount);
			updateClickCount()

			
			
		} else {
			console.log('does not contain, exiting now');
			clearInterval(listener);
			listener = null;
			setUpDischargeListener();
		}


		charge_level.src = `battery-status-${
			(mult >= 0.5 && (mult + 1) >>> 0) || 0
		}.png`;
	}, 80);
};

function canvasDraw() {
	ctx.fillStyle = 'rgba(0,0,0,0)'; //"#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// canvas.width = image.Width;
	// canvas.height = image.Height;
	// NOTE Y is measured from the top
	image.style.left = x + 'px';
	image.style.top = y + 'px';

}
canvasDraw();
// NOTE ADD A LOGIN FORM TOO

// not possible unless we use pointer lock;
// as we can't restrict the real mouse to our screen
// window.onmousemove = updatePosition

canvas.requestPointerLock =
	canvas.requestPointerLock || canvas.mozRequestPointerLock;

document.exitPointerLock =
	document.exitPointerLock || document.mozExitPointerLock;


canvas.onclick = function () {
	canvas.requestPointerLock();
};

let absClickCounter = 0;

const base = 'aero_arrow_crack_';

let updateClickCount = () => {
	console.log('click count: %s', clickCount,);
	if (Math.floor(clickCount) === 0) {
		clicks.textContent = `out of clicks`;
		// alert('out of clicks; recharge at station or buy clicks via the store')
	} else {
		clicks.textContent = `clicks left: ${Math.floor(clickCount)}`;
	}
		image.src = './' + base + String(Math.floor(clickCount)) + '.svg';
};


document.onclick = function () {
	let newClickCount = clickCount - 1;
	clickCount = (newClickCount > 0 && newClickCount) || 0;

	absClickCounter += 1
	updateClickCount();
	
console.log('will compare: ', clickCount)
if (absClickCounter%5===0){	setTimeout(()=>{
	
		alert('Notice:\nWe are rationing the use of clicks due to heavy usage in your local area. Please contact Helpdesk for more clicks or enter an unlock-code.\nYou may recharge your cursor at the charging station, or buy more clicks via the store.')
		clickCount -= 1
		updateClickCount();

		setTimeout(()=>{
		confirm('Are you sure you wish to continue ?')
	clickCount -= 1
	updateClickCount();
			setTimeout(()=>{
		confirm('Are you really sure you wish to continue ?')
		}, 700)

					clickCount -=1
						updateClickCount();
		}, 500)

	


	
}, 300)}

};

function lockChangeAlert() {
	if (
		document.pointerLockElement === canvas ||
		document.mozPointerLockElement === canvas
	) {
		console.log('The pointer lock status is now locked');
		document.addEventListener('mousemove', updatePosition, false);
	} else {
		console.log('The pointer lock status is now unlocked');
		document.removeEventListener('mousemove', updatePosition, false);
	}
}
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

// var tracker = document.getElementById('tracker');
// NOTE remember to use compresser.io to compress the images
var animation;
// console.log(canvas.offsetWidth, '<<')
// NOTE change the first few images to indicate
// cracks more clearly
// NOTE the jpg format doesn't support transparency
// so convert the webp to png, and then to svg (I just like svg)


// max mult must be 4 because of the way the images are named
const maxMult = 4;
let mult = maxMult;

// the lower this number, the stricter it is
// currently balanced 
const chargeStrictnessFactor = 0.8;
// the lower the value, the slower it discharges and charges
const step = 0.05 //0.04;
const clickCountStep = 0.12

let dischargeListener;
const setUpDischargeListener = () => {
	if (!dischargeListener) {
		dischargeListener = setInterval(() => {
			let n = mult - step;
			mult = (n > 0 && n) || 0.05;

			let n2 = clickCount - clickCountStep

			if (n2<0){
				clickCount = 0;
			}else if(n2<10){
				clickCount = n2
			}else{
				clickCount = n2
			}

			updateClickCount()

			charge_level.src = `battery-status-${
				(mult >= 0.5 && (mult + 1) >>> 0) || 0
			}.png`;
		}, 100);
	}
};

setUpDischargeListener();

// note: add mouse acceleration for more realistic movement?

let btn = document.getElementById('btn')
let clickCount = 11;
const clicks = document.createElement('span');

document.body.appendChild(clicks);
function updatePosition(e) {
	// updateClickCount()
	x += e.movementX * mult;
	y += e.movementY * mult;
	// display the text here

	clicks.style.position = 'fixed';
	clicks.style.left = x + 25 + 'px';
	clicks.style.top = y + 'px';

	if (contains(btn, image, false)){
		console.log('contains')
		btn.style.transform = `translate(${(x*1.3)+Math.random()*100}px, 0px)`

	}

	if (contains(charge_level, image) && !listener) {
		console.log('will setup listener');
		listener = setUpListener();
	}

	
	// limit to canvas size
	// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
	let width = canvas.clientWidth - 20;
	let boundingClient = canvas.getBoundingClientRect();
	let boundingClientLeft = boundingClient.left - 9;
	let boundingClientTop = boundingClient.top;
	let boundingClientBottom =
		boundingClient.bottom - image.getBoundingClientRect().height - 7;

	// clamp the FAKE mouse's position by using the FAKE mouse's position

	let fakeX = image.getBoundingClientRect().x;
	let fakeY = image.getBoundingClientRect().y;

	if (x > width) {
		x = width;
	} else if (x < boundingClientLeft) {
		x = boundingClientLeft;
	}
	// console.log(y)
	if (y < boundingClientTop) {
		y = boundingClientTop;
	} else if (y > boundingClientBottom) {
		y = boundingClientBottom;
	}



	if (!animation) {
		animation = requestAnimationFrame(function () {
			animation = null;
			canvasDraw();
		});
	}
}
