
const regionInput = document.getElementById('region');
const Celci = document.getElementById('tempC');
const Fahrenheit = document.getElementById('tempFR');
const clockW = document.getElementById('clock');
const Wind = document.getElementById('wind');
const Gust = document.getElementById('gust');
const country = document.getElementById('country');
const city = document.getElementById('city');
const img = document.getElementById('image');
regionInput.addEventListener('change', () => {
    const region = regionInput.value;
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=d0817f6d767b408ea58155625242705&q=${region}&aqi=no`;
    fetch(apiURL)
       .then(response => response.json())
       .then(data => {
            Celci.innerHTML = data.current.temp_c
            Fahrenheit.innerHTML = data.current.temp_f + '°F'
            clockW.innerHTML = data.location.localtime.split(' ')[1]
            Wind.innerHTML = `${data.current.wind_kph} km/h`
            Gust.innerHTML = `${data.current.gust_kph} km/h`
            country.innerHTML = data.location.country
            city.innerHTML = data.location.region
            img.src = data.current.condition.icon

                    
                })
            })
