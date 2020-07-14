const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var wordsPerMinute = document.querySelector("#result-table td#wpm strong");

var numberofErrors = document.querySelector("#wrong strong");
var errorCount = 0;

var typingAccuracy = document.querySelector("#accuracy strong");

//creating a global variable called timer set it an array of minutes, seconds , hundredth of seconds and thousandths of seconds
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

// 3. Run a standard minute:second:hundredths of a second timer:
function runTimer(){
  let currentTime = leadingZero(timer[0])  + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  // var convertTimeToMinutes = timer[0] + ;
   theTimer.innerHTML = currentTime;
   timer[3]++; //updating the last value

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}



// 4. Match the text entered with the provided text on the page:

  function spellcheck(){
    var textEntered  = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if(textEntered == originText){
    clearInterval(interval); //stop the timer.
    let minutesOfCurrentTime = timer[0];
    //converting the seconds portion of the time to minutes
    let secondsOfCurrentTimeToMinutes = (timer[1])/60;

    //converting the hundredth of a second time to minutes
    let hundrethofASecondOfCurrentTimeToMinutes = (timer[2])/6000;
    let totalCurrentTimeInMinutes = minutesOfCurrentTime +  secondsOfCurrentTimeToMinutes + hundrethofASecondOfCurrentTimeToMinutes;

    wordsPerMinute.innerHTML = Math.ceil(countWords(textEntered)/totalCurrentTimeInMinutes.toFixed(4)) + " WPM";

    //Accuracy : (Net WPM/ Gross WPM ) * 100
    // Gross WPM : Total Words Typed / Total Time Taken (in minutes)
    // Net Speed : (Total Words Typed - Word Error ) / Total Time Taken (in minutes)
    let grossWPM = countWords(textEntered)/totalCurrentTimeInMinutes.toFixed(4);
    let netSpeed =  (countWords(textEntered) - errorCount)/totalCurrentTimeInMinutes.toFixed(4);
    let percentageAccuray = ((netSpeed / grossWPM) * 100).toFixed(2);
    typingAccuracy.innerHTML = percentageAccuray + "%";
    testWrapper.style.borderColor ="#429890"; //set to green when the whole text typed matches the original text

  }else{
    if(textEntered == originTextMatch){
      testWrapper.style.borderColor ="#65CCf3"; //blue and typing correct letter but not done
      }

    else{
      testWrapper.style.borderColor ="#E95D0F";  //set to orange color when a wrong letter is typed
      ++errorCount;
      numberofErrors.innerHTML = errorCount;
      }
   }

}



//method for counting the number of words
function countWords(str) {
           str = str.replace(/(^\s*)|(\s*$)/gi,"");
           str = str.replace(/[ ]{2,}/gi," ");
           str = str.replace(/\n /,"\n");
           return str.split(' ').length;
  }


// 2.Start the timer:
function start(){
  let textEnteredLength = testArea.value.length;
  if(textEnteredLength === 0 && !timerRunning){
    timerRunning = true;
    interval = setInterval(runTimer , 10); //run every 1000 of a second
  }
}


//5.  Reset everything:
function reset(){
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

//clear the wordsPerMinute to display "0 WPM"
wordsPerMinute.innerHTML = "0 WPM";

//clear the numberofErrors to display 0
errorCount = 0;
numberofErrors.innerHTML = "0";

//clear the typing accuracy value after the resetButton
typingAccuracy.innerHTML ="0%";
}


//1. Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start , false);
testArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);
