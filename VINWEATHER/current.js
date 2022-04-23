const zipSubmit = document.querySelector('#submitButton');
const input = document.querySelector('#search');
const mainContent = document.querySelector('#mainContent');
const currentCity = document.querySelector('#currentConditions');
const startingImg = document.querySelector('#currentImg');
const dailyLink = document.querySelector('#dailyButton');
const apiKey = 'ZQzK1txXnfWReOB7WXUW5Wejg2AAOqE6';
const sunny = 'img/sunny.svg';
const partlyCloudy = 'img/partlyCloudy.svg';
const cloudy = 'img/cloudy.svg';
const foggy = 'img/foggy.svg';
const rain = 'img/rain.svg';
const thunder = 'img/thunder.svg';
const snow = 'img/snow.svg';
const windy = 'img/windy.svg';
const moon = 'img/moon.svg';
const night = 'img/night.svg';
let myLocation = ''; //The location of the user
let cityName = ''; //The city, used to fetch the background later
const daysInWeek = 5;
const hoursInDay = 12;
const zipCodeLength = 5;
let date;
const helper = new Helper();
let zipCode;
const display = document.querySelector('#display');
//This is the only time I need to do the null check; the user
//always starts on the current page
window.onload = () => {
  console.log('On Load!!');
  if (zipCode !== null) createUI(document.cookie); //The cookie from earlier (current.js)
  date = new Date();
  if (date.getHours() < 6 || date.getHours() > 18) {
    document.body.style.backgroundColor = 'rgb(14, 5, 29)';
    //display.backgroundColor = '#485b7bd0';
  }
};
//TODO: If the zip is the same do nothing on submit, if it's different
//clear then reload the data
zipSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value.length === zipCodeLength) {
    zipCode = input.value;
    document.cookie = zipCode; //Save the zip code to a cookie for later
    createUI(input.value);
  } else {
    //createUI(fetchCodeFromCity(input.value));
    alert('Invalid Zip Code');
    clearLocation();
  }
});

async function fetchCodeFromCity(city) {
  const res = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
  );
}
//Sets location so that it getLocation doesn't have to be called unless
//The zip changes (which happens when the search button is pressed)
async function setLocation(zip) {
  if (myLocation === '') {
    myLocation = await getLocation(zip);
  }
}
//Gets called whenever the user searches with a new zip
function clearLocation() {
  myLocation = '';
}

//Clears the input box
function clearInput() {
  input.value = '';
}

//The api requires a call to get the location key FIRST
//Then I can make another call below to get the actual forecast
//Gets the JSON then parses for the location code
//Note this only searches the US (the API can search for anything, but I'm hardcoding it to only search US)
//This function is DONE
async function getLocation(search) {
  const res = await fetch(
    `http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=${apiKey}&q=${search}`
  );
  const data = await res.json(); //Save response as a JSON right away
  //The first index of the data is always the zip we want   TODO: Alert the user if the zip code isn't five digits long (is invalid)
  cityName = data[0].LocalizedName;
  console.log(cityName);
  return data[0].Key;
}
//This only works in code, if you log this in the dev console it does nothing
/*
getLocation('XXXXX')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
*/

const currentForecast = new Current();
const hourlyForecast = new Hourly();

//Put the forecast on the screen
async function createUI(zip) {
  //Instantiating
  //always call getForecast() before compile() or it'll return null
  await hourlyForecast.getForecast(zip);
  await hourlyForecast.compile(zip);
  await currentForecast.getForecast(zip);
  await currentForecast.compile(zip);
  startingImg.style.display = 'block'; //Show the img

  //document.querySelector('#mainContent').style.display = 'block';
  //All of these functions can just be constructors lol
  await getLocation(zip);
  fillCurrent();

  clearInput();
  // document.body.style.backgroundImage =
  // (await "url('https://source.unsplash.com/1600x900/?") + cityName + "')";
}

//Returns the icon that should be used given the condition
//timeOfDay is 'day' or 'night', text is "sunny, mostly sunny, etc, pulled from the api"

//TODO: Get phrase to have custom phrases for all the nonsense
//Once I get further in this function I'll see if I can use it for all of them or not
function fillCurrent() {
  currentCity.innerHTML = `Weather in ${cityName}:`;

  const currentImg = document.querySelector('#currentImg');
  currentImg.src = helper.getIcon(
    currentForecast.isDayTime ? 'day' : 'night',
    currentForecast.weatherText
  );

  const currentDesc = document.querySelector('#currentForecastDesc');
  currentDesc.innerText = `${helper.getDesc(
    currentForecast.weatherText
  )}\n Chance of ${
    currentForecast.hasPrec ? currentForecast.precType : 'Rain'
  }: ${hourlyForecast.precProb[0]}%`;

  const currentTemp = document.querySelector('#currentTemp');
  //\xB0 F is the escape code for the degree symbol
  currentTemp.innerText = `${currentForecast.temp}\xB0 F`;
}
