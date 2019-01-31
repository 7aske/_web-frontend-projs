var simonArray = [];
var greenField = document.getElementById('greenField');
var redField = document.getElementById('redField');
var yellowField = document.getElementById('yellowField');
var blueField = document.getElementById('blueField');
var display = document.getElementById('lengthDisplay');
var play = document.getElementById('play');
var reset = document.getElementById('reset');
var choice = [greenField.id, redField.id, yellowField.id, blueField.id];
var currField = '';
var nextField = undefined;
var gameEnd;
var gameDur;


var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


function mEnter(){
			this.style.filter = 'brightness(1.3)';
			this.style.borderColor = '#202020';
}
function mLeave(){
			this.style.filter = 'brightness(0.7)';
			this.style.borderColor = '#3B3B3B';
}
function addListen(){
	for (let j = 0; j < document.getElementsByClassName('field').length; j++){
		document.getElementsByClassName('field')[j].addEventListener('mouseenter', mEnter);
		document.getElementsByClassName('field')[j].addEventListener('mouseout', mLeave);
		document.getElementsByClassName('field')[j].addEventListener('click', checkClick);
		document.getElementsByClassName('field')[j].style.cursor = 'pointer';
	}
}
function removeListen(){
	for (let j = 0; j < document.getElementsByClassName('field').length; j++){
		document.getElementsByClassName('field')[j].removeEventListener('mouseenter', mEnter);
		document.getElementsByClassName('field')[j].removeEventListener('mouseout', mLeave);
		document.getElementsByClassName('field')[j].removeEventListener('click', checkClick);
		document.getElementsByClassName('field')[j].style.cursor = 'default';
	}
}


function playSimon(){
	play.removeEventListener('click', playSimon);
	clearTimeout(gameEnd);
	for (let j = 0; j < document.getElementsByClassName('field').length; j++){
		document.getElementsByClassName('field')[j].style.filter = 'brightness(0.7)';
		document.getElementsByClassName('field')[j].style.borderColor = '#3B3B3B';
	}
	simonArray.push(choice[Math.floor(Math.random()*4)]);
	display.innerHTML = simonArray.length;
	var i = 0;
	function loop(){
		setTimeout(() => {
			switch (simonArray[i]){
				case 'redField':
					audio1.play();
					break;
				case 'greenField':
					audio2.play();
					break;
				case 'yellowField':
					audio3.play();
					break;
				case 'blueField':
					audio4.play();
					break;
			}
			document.getElementById(simonArray[i]).style.filter = 'brightness(1.3)';
			document.getElementById(simonArray[i]).style.borderColor = '#202020';
			setTimeout(() => {
				document.getElementById(simonArray[i]).style.filter = 'brightness(0.7)';
				document.getElementById(simonArray[i]).style.borderColor = '#3B3B3B';
				i++;
				if (i < simonArray.length){
					loop();
				}
			}, 800);
		}, 800);
	}
	loop();
	removeListen();
	gameDur = setTimeout(() => {
		addListen();
		checkWin();
		gameEnd = setTimeout(() => {
			shakeOnReset();
			setTimeout(() => {
				resetSimon();
			}, 500)
		}, 2000 + (simonArray.length * 1000));
	}, simonArray.length * 1600);

}


function checkWin(){
	if (nextField == 20) {
		display.innerHTML = '&#10003';
		clearTimeout(gameEnd);
		setTimeout(() => {
		  resetSimon();
		}, 2000)
	} else {
		currField = simonArray[0];
		nextField = 0;
	}

}


function checkClick(event){
	switch (event.target.id){
		case 'redField':
			audio1.pause();
   			audio1.currentTime = 0.0;
			audio1.play();
			break;
		case 'greenField':
			audio2.pause();
   			audio2.currentTime = 0.0;
			audio2.play();
			break;
		case 'yellowField':
			audio3.pause();
   			audio3.currentTime = 0.0;
			audio3.play();
			break;
		case 'blueField':
			audio4.pause();
   			audio4.currentTime = 0.0;
			audio4.play();
			break;
	}
	if (event.target.id == currField){
		if (nextField != simonArray.length - 1) {
			nextField += 1;
			currField = simonArray[nextField];
		} else {
			removeListen();
			console.log('not noob');
			setTimeout(() => {
			  playSimon();
			}, 1000);
			
		}
	} else {
		shakeOnReset();
		setTimeout(() => {
		  resetSimon()
		}, 1000)
		console.log('noob');
	}
}


function shakeOnReset(){
	document.getElementById('gameContainer').classList.add('shake');
	setTimeout(() => {
	  document.getElementById('gameContainer').classList.remove('shake');
	}, 500);
}


function resetSimon(){
	play.addEventListener('click', playSimon);
	clearTimeout(gameEnd);
	clearTimeout(gameDur);
	simonArray = [];
	display.innerHTML = '0';
	nextField = '';
	for (let j = 0; j < document.getElementsByClassName('field').length; j++){
		document.getElementsByClassName('field')[j].style.filter = 'brightness(0.7)';
		document.getElementsByClassName('field')[j].style.borderColor = '#3B3B3B';
	}
}
addListen();
reset.addEventListener('click', resetSimon);
play.addEventListener('click', playSimon);

