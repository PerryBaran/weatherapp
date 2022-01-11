import './style.css';
import { updateMain, updateForecast, changeUnits } from './dom';

const searchBox = document.getElementById('searchBox')
const searchButton = document.getElementById('searchButton')
var units = 'metric';

async function getWeather(location, units) {
    try {
        const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=' + units + '&APPID=d1cad75804f6bd996f5d83905ac66876', {mode: 'cors'})
        data.json().then(function(response) {
            updateMain(response);
        });
    } catch (error) {
        console.log('oops, something went wrong')
    }
}

searchButton.addEventListener('click', () => {
    getData();
});

const switchUnits = document.getElementById('switchUnits');

switchUnits.addEventListener('click' ,() => {
    if (units === 'metric') {
        units = 'imperial';
        switchUnits.innerHTML = 'IMPERIAL'
    } else {
        units = 'metric';
        switchUnits.innerHTML = 'METRIC'
    }
    getData();
    changeUnits(units);
});

async function getForecast(location, units) {
        const data = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=' + units + '&APPID=d1cad75804f6bd996f5d83905ac66876', {mode: 'cors'})
        data.json().then(function(response) {
            console.log(response.list);
            updateForecast(response.list, units);
        });
}

function getData () {
    getWeather(searchBox.value, units);
    getForecast(searchBox.value, units);
}

getData();