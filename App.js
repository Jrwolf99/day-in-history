//This app uses JQuery to import the JSON data. 

//create DOM element to output to html.
const date = document.querySelector('.date');
const fact = document.querySelector('.fact');

var month;  //month part of the date from the input in the form.
var day;    //day part of the date from the input in the form.
var originalDateFormat;
var randomNum;

const months = ["January", "February", "March", "April", "May", 
                "June", "July", "August", "September", "October",
                 "November", "December"];



//Create event listener for form, which already has DOM element myForm.
myForm.addEventListener('submit', handleSubmission);



//Handle the form submission before the page completely reloads.
function handleSubmission(e){
  //prevent HTML form from completely submitting.
  e.preventDefault();
  //get date from the form.
  originalDateFormat = myForm.day.value;
  findDayMonth(originalDateFormat);
  
//random number 1-10;
  randomNum = Math.floor(Math.random()*10);

  //make new url with chosen date.
  var linkToAPI = "https://history.muffinlabs.com/date/" + month +"/"+ day;
  url = new URL(linkToAPI);
  $.getJSON(url, handleJSON);
}



//find day and month of the given date format YYYY-MM-DD.
function findDayMonth(originalDateFormat) {
  //find the index of month and date.
  let firstHyphen = originalDateFormat.indexOf("-");
  let secondHyphen = originalDateFormat.indexOf("-", originalDateFormat.indexOf("-")+1);
  //update month and day
  month = myForm.day.value.substring(firstHyphen+1, secondHyphen);
  day = myForm.day.value.substring(secondHyphen+1);
  //remove leading 0 if there is one.
  if (day[0] == 0) day = day.substring(1);
  if (month[0] == 0) month = month.substring(1);
}


// load API for fact on date and put into fact variable.
function handleJSON(data) {

  let myFact = data.data.Events[randomNum].text;
  let myMonth = months[month-1];
  date.innerHTML =  myMonth + " " + day + ", in the year " + data.data.Events[randomNum].year;
  fact.innerHTML = myFact;
};


