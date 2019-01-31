//Old project - spaghetti code but works
var currentNumber = undefined;
var currentOperation = undefined;
var num1 = undefined;
var num2 = undefined;
var result = undefined;
function precisionRound(number) {
  var factor = Math.pow(10, 10);
  return Math.round(number * factor) / factor;
}
function clear(){
	currentNumber = undefined;
	currentOperation = undefined;
	num1 = undefined;
	num2 = undefined;
	result = undefined;
	document.getElementById('result-display').innerHTML = '0';
	document.getElementById('function-display').innerHTML = '';
}
function appendNum(str){
	if (document.getElementById('function-display').innerHTML != 'Max length reached'){
		if (document.getElementById('function-display').innerHTML.length < 24) {
			if ((result != undefined) && (currentOperation == undefined)){
				document.getElementById('function-display').innerHTML = '';
				result = undefined;
			}
			if (currentNumber == undefined){
				currentNumber = '';
				currentNumber += str;
			} else {
				currentNumber += str;
			}
			console.log('num num1 ' + num1);
			console.log('num num2 ' + num2);
			console.log('num result ' + result);
			console.log('num cur ' + currentNumber);
			console.log('num curOp ' + currentOperation);
			if (currentNumber != undefined){
				//if (result == undefined){
					document.getElementById('function-display').innerHTML += str;
				//}
			}
		} else {
			clear();
			document.getElementById('function-display').innerHTML = 'Max length reached';
		}
	} else {
		clear();
	}
};
function appendOp(op){
	if ((currentNumber != undefined) || (num1 != undefined)) {
		if (currentOperation == undefined) {
			if (document.getElementById('function-display').innerHTML != 'Max length reached'){
				if (document.getElementById('function-display').innerHTML.length < 24) {
					if ((num1 == undefined) && (currentNumber != undefined)) {
						num1 = parseFloat(currentNumber);
						currentNumber = undefined;
					} else if ((num2 == undefined) && (currentNumber != undefined)) {
						num2 = parseFloat(currentNumber);
						currentNumber = undefined;
					}
					console.log('op num1 ' + num1);
					console.log('op num2 ' + num2);
					console.log('op result ' + result);
					console.log('op cur ' + currentNumber);
					console.log('op curOp ' + currentOperation);
					if ((num1 != undefined) && (num2 != undefined)){
						currentOperation = op;
						console.log('with calc');
						calc();
					} else {
						currentOperation = op;
						console.log('wo calc');
					}
					if ((currentOperation != undefined)){
						if ((document.getElementById('function-display').innerHTML.charAt(document.getElementById('function-display').innerHTML.length - 1) == '+') ||
							(document.getElementById('function-display').innerHTML.charAt(document.getElementById('function-display').innerHTML.length - 1) == '-') ||
							(document.getElementById('function-display').innerHTML.charAt(document.getElementById('function-display').innerHTML.length - 1) == '*') ||
							(document.getElementById('function-display').innerHTML.charAt(document.getElementById('function-display').innerHTML.length - 1) == '/')) {
							document.getElementById('function-display').innerHTML = document.getElementById('function-display').innerHTML.substring(0, document.getElementById('function-display').innerHTML.length - 1);
							document.getElementById('function-display').innerHTML += op;
						} else {
							document.getElementById('function-display').innerHTML += op;
						}
					}
				} else {
					clear();
					document.getElementById('function-display').innerHTML = 'Max length reached';
				}
			} else {
				clear();
			}
		} else {
			calc();
			appendOp(op);
		}
	}
};
function calc(){
	if ((num1 == undefined) && (currentNumber != undefined)){
		num1 = parseFloat(currentNumber);
		document.getElementById('result-display').innerHTML = num1;
		currentNumber = undefined;
	} else if ((num2 == undefined) && (currentNumber != undefined)) {
		num2 = parseFloat(currentNumber);
		currentNumber = undefined;
	}
	console.log('before calc num1 ' + num1);
	console.log('before calc num2 ' + num2);
	console.log('before calc result ' + result);
	console.log('before calc cur ' + currentNumber);
	console.log('before calc curOp ' + currentOperation);
	switch (currentOperation){
		case '+':
			if (num2 != undefined){
				result = precisionRound(num1 + num2);
			} else {
				result = num1;
			}
			break;
		case '-':
			if (num2 != undefined){
				result = precisionRound(num1 - num2);
			} else {
				result = num1;
			}
			break;
		case '*':
			if (num2 != undefined){
				result = precisionRound(num1 * num2);
			} else {
				result = num1;
			}
			break;
		case '/':
			if (num2 != undefined){
				result = precisionRound(num1 / num2);
			} else {
				result = num1;
			}
			break;
		default:
			result = num1;
			break;

	}
	num2 = undefined;
	console.log('result ' + result);
	if (result != undefined){
		num1 = result;
	};
	console.log('calc num1 ' + num1);
	console.log('calc num2 ' + num2);
	console.log('calc result ' + result);
	console.log('calc cur ' + currentNumber);
	console.log('calc curOp ' + currentOperation);
	currentOperation = undefined;
	if (!isNaN(num1)){
		if (result.toString().length < 12){
			document.getElementById('result-display').innerHTML = result;
			document.getElementById('function-display').innerHTML = result;
		} else {
			clear();
			document.getElementById('function-display').innerHTML = 'Max length reached';
		}
	}
}


document.getElementById('clear').addEventListener('click', function(){
 	clear();
 });
document.getElementById('calc').addEventListener('click', function(){
 	calc();
 });
document.getElementById('add').addEventListener('click', function(){
 	appendOp('+');
 });
document.getElementById('subtract').addEventListener('click', function(){
 	appendOp('-');
 });
document.getElementById('multiply').addEventListener('click', function(){
 	appendOp('*');
 });
document.getElementById('divide').addEventListener('click', function(){
 	appendOp('/');
 });
document.getElementById('dot').addEventListener('click', function(){
 	appendNum('.');
 });
document.getElementById('zero').addEventListener('click', function(){
 	appendNum('0');
 });
document.getElementById('one').addEventListener('click', function(){
 	appendNum('1');
 });
document.getElementById('two').addEventListener('click', function(){
 	appendNum('2');
 });
document.getElementById('three').addEventListener('click', function(){
 	appendNum('3');
 });
document.getElementById('four').addEventListener('click', function(){
 	appendNum('4');
 });
document.getElementById('five').addEventListener('click', function(){
 	appendNum('5');
 });
document.getElementById('six').addEventListener('click', function(){
 	appendNum('6');
 });
document.getElementById('seven').addEventListener('click', function(){
 	appendNum('7');
 });
document.getElementById('eight').addEventListener('click', function(){
 	appendNum('8');
 });
document.getElementById('nine').addEventListener('click', function(){
 	appendNum('9');
 });


function handleEnter(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    switch (keycode){
    	case 48:
    		appendNum('0');
    		cl(event);
    		break;
    	case 49:
    		appendNum('1');
    		break;
    	case 50:
    		appendNum('2');
    		break;
    	case 51:
    		appendNum('3');
    		break;
    	case 52:
    		appendNum('4');
    		break;
    	case 53:
    		appendNum('5');
    		break;
    	case 54:
    		appendNum('6');
    		break;
    	case 55:
    		appendNum('7');
    		break;
    	case 56:
    		appendNum('8');
    		break;
    	case 57:
    		appendNum('9');
    		break;
    	case 43:
    		appendOp('+')
    		break;
    	case 45:
    		appendOp('-')
    		break;
    	case 42:
    		appendOp('*')
    		break;
    	case 47:
    		appendOp('/')
    		break;
    	case 13:
    		calc()
    		break;	
    	case 61:
    		calc()
    		break;	
    	case 8:
    		clear()
    		break;	
    	case 127:
    		clear()
    		break;
    }
}

document.addEventListener('keypress', handleEnter);