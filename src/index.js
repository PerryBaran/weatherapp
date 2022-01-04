import './style.css';

const search = document.getElementById('search')

function getData(location) {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=d1cad75804f6bd996f5d83905ac66876', {mode: 'cors'})
    .then(function(response) {
        console.log(response.json());
    });
}

getData(search.value);

search.addEventListener('change', () => {
    getData(search.value);
})