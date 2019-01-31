var container = document.getElementById('container');
var bars = [];
var delay;
var barsNum;
function Bar(barHeight, barWidth) {
    return `<div class="bar" style="height:${barHeight}px;width:${barWidth}px;"></div>`;
}

function generateBars() {
    delay = Math.abs(document.getElementById('delay').value) || 50;
    barsNum = Math.abs(document.getElementById('barsNum').value) || 50;
    var barHeightArray = new Array();
    for (var i = 0; i < barsNum; i++) {
        barHeightArray.push(Math.floor(Math.random() * (window.innerHeight-30)));
    }
    return barHeightArray;
}
function bubble(barHeightArray) {
    var e;
    var be;
    for (var i = 0; i < barHeightArray.length; i++) {
        for (var j = 0; j < barHeightArray.length; j++ ){
            if (barHeightArray[i] < barHeightArray[j]){
                e = barHeightArray[i];
                barHeightArray[i] = barHeightArray [j];
                barHeightArray [j] = e;
                be = bars[i].style.height;
                bars[i].style.height = bars[j].style.height;
                bars[j].style.height = be;
            }
        }
    }
}

function bubbleRecursive(array){
    if (typeof interval != 'undefined') {
        clearInterval(interval);
    }
    var e;
    var be;
    var i = 0
    var sorted = true;
    
    function repeat(){

        if(array[i] > array[i+1]) {
            e = array[i];
            array[i] = array[i+1];
            array[i+1] = e;
            be = bars[i].style.height;
            bars[i].style.height = bars[i+1].style.height;
            bars[i+1].style.height = be;
            sorted = false;
            if (!sorted) bubbleRecursive(array);
        }

        i++
        if (i>=array.length) clearInterval(interval);
    }
    var interval = setInterval(repeat,delay);
}
function renderBars(arr) {
    container.innerHTML = '';
    if (document.getElementById('start').innerText == 'Reset') {
        reset()
    }
    document.getElementById('start').innerText = 'Reset';
    var width = (window.innerWidth - 1) / (arr.length);
    arr.forEach((element, index) => {
            container.innerHTML += Bar(element, width);
    });
    bars = document.getElementsByClassName('bar');
    bubbleRecursive(arr);
}
function reset(){
    document.getElementById('start').innerText == 'Start';
    location.reload();
}
