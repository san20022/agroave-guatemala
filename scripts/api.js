const currentPage = window.location.pathname.split("/").pop();
//html elements
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myHumidity = document.querySelector('#humidity');
const mySunrise = document.querySelector('#sunrise');
const mySunset = document.querySelector('#sunset');
const myGraphic = document.querySelector('#graphic');

const myForecast = document.querySelector('#forecast');

const myAPI = "98d437cc58adb55ddd0c72032f24b9ac"; //OpenWeatherMap API key
const myLat = "27.597250470579866"; // Latitude for the location
const myLon = "-105.01486898964178"; // Longitude for the location
const myUnits = "metric"; // Units for temperature (metric, imperial, or standard)

//call whether API
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myAPI}&units=${myUnits}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myAPI}&units=${myUnits}`

async function apiFetch(){
  try {
    const response = await fetch(url);
    const forecastResponse = await fetch(forecastUrl)
    if (!response.ok || !forecastResponse.ok){
      throw Error(await response.text() || await forecastResponse.text());
    }
    else if (response.ok) {
      const data = await response.json();
      const forecastData = await forecastResponse.json();
      //console.log(forecastData);
      //console.log(data);

      //console.log("Hello from the Weather API");
      displayResults(data);
      displayForecast(forecastData);
    }
    else {
      throw Error(await response.text()||await forecastResponse.text());
    }
  }
  catch (error) {
    console.log(error);
  }
}

function getDayNames() {
  const today = new Date();
  const options = { weekday: 'long' };

  const dayNames = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dayNames.push(date.toLocaleDateString('en-US', options));
  }
  return dayNames; // [today, tomorrow, day after]
}

// Example usage:
const [todayName, tomorrowName, dayAfterName] = getDayNames();
//console.log(todayName, tomorrowName, dayAfterName);

// Display the day names
function displayForecast(data) {
  //console.log(data);
  const [todayName, tomorrowName, dayAfterName] = getDayNames();
  myForecast.innerHTML = `
    ${todayName}: <strong>${data.list[0].main.temp.toFixed(1)} &deg;C</strong><br />
    ${tomorrowName}: <strong>${data.list[1].main.temp.toFixed(1)} &deg;C</strong><br />
    ${dayAfterName}: <strong>${data.list[2].main.temp.toFixed(1)} &deg;C</strong>
  `;
}


function displayResults(data) {
  //console.log(data);
  myTown.innerHTML = data.name;
  myDescription.innerHTML = data.weather[0].description;
  myTemperature.innerHTML = `<strong> Temp: ${data.main.temp.toFixed(1)} &deg;C</strong>`; 
  myHumidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  mySunrise.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  mySunset.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  myGraphic.setAttribute('src', iconSrc);
  myGraphic.setAttribute('alt', data.weather[0].description);
  myGraphic.setAttribute('loading', 'lazy');
  myForecast.innerHTML = `Today: <strong>90°F</strong><br />Wednesday: <strong>89°F</strong
						><br />Thursday: <strong>68°F</strong>`
  
} 
// End of Weather API

export {apiFetch};