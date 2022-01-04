import './style.css';

const search = document.getElementById('search')

async function getData(location) {
    const data = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=d1cad75804f6bd996f5d83905ac66876', {mode: 'cors'})
    data.json().then(function(response) {
        console.log(response);
    });
}

getData(search.value);

search.addEventListener('change', () => {
    getData(search.value);
})