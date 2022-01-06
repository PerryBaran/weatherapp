import './style.css';
import { updateMain, changeUnits } from './dom';

const search = document.getElementById('search')
var units = 'metric';

async function getData(location, units) {
    try {
        const data = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=' + units + '&APPID=d1cad75804f6bd996f5d83905ac66876', {mode: 'cors'})
        data.json().then(function(response) {
            console.log(response)
            updateMain(response);
        });
    } catch (error) {
        console.log('oops, something went wrong')
    }
}

getData(search.value, units);

search.addEventListener('change', () => {
    getData(search.value, units);
});

const switchUnits = document.getElementById('switchUnits');

switchUnits.addEventListener('click' ,() => {
    if (units === 'metric') {
        units = 'imperial';
        switchUnits.innerHTML = 'Imperial'
    } else {
        units = 'metric';
        switchUnits.innerHTML = 'Metric'
    }
    getData(search.value, units)
    changeUnits(units);
});