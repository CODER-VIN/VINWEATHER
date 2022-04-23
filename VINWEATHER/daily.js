const zipSubmit = document.querySelector('#submitButton');
const input = document.querySelector('#search');
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
let myLocation = '';
let cityName = ''; //The city, used to fetch the background later
const daysInWeek = 5;
const hoursInDay = 12;
const zipCodeLength = 5;
let date;
const currentCity = document.querySelector('#currentCity');
const helper = new Helper();
window.onload = () => {
  createUI(document.cookie); //The cookie from earlier (current.js)
  date = new Date();
  if (date.getHours() < 6 || date.getHours() > 18) {
    document.body.style.backgroundColor = 'rgb(14, 5, 29)';
  }
};
zipSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value.length === zipCodeLength) {
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
const dailyForecast = new Daily();
async function createUI(zip) {
  //Instantiating
  //always call getForecast() before compile() or it'll return null
  await dailyForecast.getForecast(zip);
  await dailyForecast.compile(zip);

  //document.querySelector('#mainContent').style.display = 'block';
  //All of these functions can just be constructors lol

  fillDaily();

  clearInput();
  // document.body.style.backgroundImage =
  // (await "url('https://source.unsplash.com/1600x900/?") + cityName + "')";
}

function fillDaily() {
  const dayImg = document.querySelector('#dayImg');
  const nightImg = document.querySelector('#nightImg');
  const dayDesc = document.querySelector('#dayDesc');
  const nightDesc = document.querySelector('#nightDesc');
  const dayTemp = document.querySelector('#dayTemp');
  const nightTemp = document.querySelector('#nightTemp');
  dayImg.src = helper.getIcon('day', dailyForecast.dayText);
  nightImg.src = helper.getIcon('night', dailyForecast.nightText);
  dayDesc.innerText = helper.getDesc(dailyForecast.dayText);
  nightDesc.innerText = helper.getDesc(dailyForecast.nightText);
  dayTemp.innerText = `High: ${dailyForecast.maxTemp}\xB0 F`;
  nightTemp.innerText = `Low: ${dailyForecast.minTemp}\xB0 F`;
  // currentCity.innerHTML = `Weather in ${cityName}:`;
}
