const meanTemp = document.getElementById('meanTemp');
const mainIcon = document.getElementById('icon');
const country = document.getElementById('country');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feelsLike');
const minTemp = document.getElementById('minTemp');
const maxTemp = document.getElementById('maxTemp');
const humidity = document.getElementById('humidity');
const clouds = document.getElementById('clouds');
const wind = document.getElementById('wind');

export function updateMain(data) {
    meanTemp.innerHTML = data.main.temp;
    feelsLike.innerHTML = data.main.feels_like;
    mainIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'
    country.innerHTML = data.sys.country;
    description.innerHTML = data.weather[0].description;
    minTemp.innerHTML = data.main.temp_min;
    maxTemp.innerHTML = data.main.temp_max;
    humidity.innerHTML = data.main.humidity;
    clouds.innerHTML = data.clouds.all;
    wind.innerHTML = data.wind.speed;
}

const units = Array.from(document.getElementsByClassName('units'));
const speed = Array.from(document.getElementsByClassName('speed'));

export function changeUnits(data) {
    console.log(units);
    if (data === 'metric') {
        for (let i = 0; i < units.length; i++) {
            units[i].innerHTML = 'C';
        } for (let i = 0; i < speed.length; i++) {
            speed[i].innerHTML = 'm/s';
        }
    } else {
        for (let i = 0; i < units.length; i++) {
            units[i].innerHTML = 'F';
        } for (let i = 0; i < speed.length; i++) {
            speed[i].innerHTML = 'miles/hour';
        }
    }
};