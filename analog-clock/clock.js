let seconds = new Date().getSeconds();
let minutes = new Date().getMinutes();
let hours = new Date().getHours();
let defAnim = '60ms';
let tickAnim = '40ms';
let time = hours * 3600 + minutes * 60 + seconds;
let clock = setInterval(() => {
	let secondsHand = document.getElementById('second');
	let minutesHand = document.getElementById('minute');
	let hoursHand = document.getElementById('hour');
	let hourChange = time * 6 / 60 / 12 + 30 * 6;
	let minuteChange = time * 6 / 60 + 30 * 6;
	let secondChange = time * 6 + 30 * 6;
	secondsHand.style.transform = `rotate(${secondChange + 6}deg)`;
	setTimeout(() => {
		secondsHand.style.transitionDuration = tickAnim;
		secondsHand.style.transform = `rotate(${secondChange}deg)`;
	}, 70);
	secondsHand.style.transitionDuration = defAnim;
	minutesHand.style.transform = `rotate(${minuteChange}deg)`;
	hoursHand.style.transform = `rotate(${hourChange}deg)`;
	console.log(
		new Date().getHours(),
		new Date().getMinutes(),
		new Date().getSeconds()
	);
	time++;
}, 1000);
function generateTabs() {
	let clock = document.getElementById('clock');
	for (let i = 0; i < 12; i++) {
		let tab = document.createElement('div');
		tab.classList.add('tab');

		clock.appendChild(tab);
	}
	let tabs = document.getElementsByClassName('tab');
	let deg = 0;
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].style.transform = `rotate(${deg}deg)`;
		deg += 30;
	}
}
function generateLittleTabs() {
	let clock = document.getElementById('clock');
	for (let i = 0; i < 60; i++) {
		let tab = document.createElement('div');
		tab.classList.add('littleTab');

		clock.appendChild(tab);
	}
	let tabs = document.getElementsByClassName('littleTab');
	let deg = 0;
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].style.transform = `rotate(${deg}deg)`;
		deg += 6;
	}
}
generateLittleTabs();
generateTabs();
