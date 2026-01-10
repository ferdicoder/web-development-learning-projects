const apiKey = 'd926cc9eabf99f5ea236a8b69ddd5657'; 

const weatherForm = document.querySelector('#weather-form'); 
const getWeatherBtn = document.querySelector('#get-weather-btn'); 
const cityName = document.querySelector('#city-input');

const weatherInfo = document.querySelector('.weather-info');
const cityResult = document.querySelector('#city-name'); 
const temperature = document.querySelector('.temp'); 
const desc = document.querySelector('.desc');
const weatherIcon = document.querySelector('.icon');

const errorDisplay = document.querySelector('.error-style'); 

function submitCityName(){
  weatherForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    try{
      const weatherData = await getWeatherData(cityName.value);
      
      renderWeather(weatherData); 
    }catch{
      renderError()
    }
  }); 
}
submitCityName(); 


async function getWeatherData(cityName){
  try{
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`; 
    const weatherData =  await fetch(apiURL);
  
    if(!weatherData.ok){
      throw new Error(`${weatherData.status}`); 
    }

    return await weatherData.json(); 
  }catch(error){
    console.error(`Fetch Error: ${error}`);
    return error; 
  }
}

function renderWeather(weatherData){
    const {name: city, 
         main: {temp}, 
         weather: [{description, id}]} = weatherData; 
  temperature.style.fontSize = '2.5 rem';
  cityName.value = '';
  cityResult.textContent = city; 
  temperature.textContent = `${(temp - 273.15).toFixed(1)}°C`; 
  desc.textContent = description.toUpperCase();
  weatherIcon.innerHTML = `<img src="assets/${chooseIcon(id)}">`
}


function chooseIcon(id){
  if (id >= 200 && id <= 232) {
    return 'thunderstorm.png';
  } else if (id >= 300 && id <= 321) {
    return 'drizzle.png';  
  } else if (id >= 500 && id <= 531) {
    return 'rain.png';  
  } else if (id >= 600 && id <= 622) {
    return 'snow.png';  
  } else if (id >= 701 && id <= 781) {
    return 'mist.png';  
  } else if (id === 800) {
    return 'clear-sky.png';  
  } else if (id >= 801 && id <= 804) {
    return 'clouds.png';  
  } 
}  

function resetInfo(){
  cityResult.textContent = ''; 
  temperature.textContent = ''; 
  desc.textContent = ''; 
  weatherIcon.innerHTML = ''; 
  errorDisplay.textContent = ''; 
}

function renderError(setTime){
  resetInfo();
  cityName.value = ''; 
  cityName.readOnly = true;  
  errorDisplay.textContent = `Something Went Wrong. Please Try Again.`;
  weatherIcon.innerHTML = '<img src="assets/error-weather.png">'
  setTimeout(() =>{
    resetInfo(); 
    cityName.readOnly = false; 
    cityResult.textContent = 'City Name'; 
    temperature.textContent = '0°C'; 
    desc.textContent = 'Let\'\s check your city!'; 
    weatherIcon.innerHTML = ' <img src="assets/default-icon.png" alt="">'; 
  }, 2000); 
}
