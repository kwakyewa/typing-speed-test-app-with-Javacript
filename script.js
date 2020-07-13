const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

//creating a global variable called timer set it an array of minutes, seconds , hundreth of seconds and thousandths of seconds
var timer = [0,0,0,0];
var interval ;
var timerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
  if(time <= 9){
    time= "0" + time;
  }
  return time;
}

// 3. Run a standard minute/second/hundredths timer:
function runTimer(){
  let currentTime = leadingZero(timer[0])  + ":" + leadingZero(timer[1])+ ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++; //updating the last value

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// 4. Match the text entered with the provided text on the page:
function spellcheck(){
  let textEntered  = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

if(textEntered == originText){
  clearInterval(interval); //stop the timer.
  testWrapper.style.borderColor ="#429890"; //set to green when the whole text typed matches the original text
}else{
  if(textEntered == originTextMatch){
    testWrapper.style.borderColor ="#65CCf3"; //blue and typing correct letter but not done
  }else{
      testWrapper.style.borderColor ="#E95D0F";  //set to orange color when a wrong letter is typed
  }
}
}

// 2.Start the timer:
function start(){
  let textEnteredLength = testArea.value.length;

  if(textEnteredLength === 0 && !timerRunning){
    timerRunning = true;
  interval = setInterval(runTimer , 10); //run every 1000 of a second
  }
  console.log(textEnteredLength);
}


//5.  Reset everything:
function reset(){
//  console.log("Reset button pressed");
clearInterval(interval); //this ensures the browser is not running any interval in the background
interval = null; //we do this so that we're not setting up a new interval with a new index number the next time we start the app
timer = [0, 0, 0, 0];
timerRunning = false;

//clear the textarea by seting it to nothing
testArea.value = "";
//set the innerHTML of the timer back to what it was originally
theTimer.innerHTML = "00:00:00";

//set the border color around the textara back to grey
testWrapper.style.borderColor = "grey";
}


//1. Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start , false);
testArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);
