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
    mainIcon.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'
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

const forecastContainer = document.getElementById('forecast');

export function updateForecast(data, units) {
    var unit = '°C';
    if (units === 'metric') {
        unit = '°C'
    } else {
        unit = '°F'
    }
    reset(forecastContainer);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');

    for (let i = 0; i < data.length; i++) {
        if (data[i].dt_txt.slice(8, 10) != dd && data[i].dt_txt.slice(11, 13) == '12') { //filtering out today's date and only showing data for midday
            const container = document.createElement('div');
            container.className = 'forecastItem'
            
            const temp = document.createElement('p');
            temp.innerHTML = data[i].main.temp + unit;
            temp.className = 'forecastTemp'
            container.appendChild(temp);

            const icon = document.createElement('img');
            icon.src = 'https://openweathermap.org/img/wn/' + data[i].weather[0].icon + '@2x.png'
            icon.className = 'forecastIcon'
            container.appendChild(icon);

            const iconDescription = document.createElement('p');
            iconDescription.innerHTML = data[i].weather[0].description
            iconDescription.className = 'ForecastDescription'
            container.appendChild(iconDescription);

            const date = document.createElement('p');
            date.innerHTML = getDate(data[i].dt_txt, dd, today)
            date.className = 'forecastDate'
            container.appendChild(date);

            forecastContainer.appendChild(container);
        } 
    }
}

function reset(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']

function getDate(data, day, today) {
    //get day
    const dd = data.slice(8, 10); //day as dd
    const dayName = dayOfWeek[determineDay(dd, day, today)]
    //determine ordinal
    let ordinal = ''
    if (dd == 1 || dd == 21 || dd == 31) {
        ordinal = 'st';
    } else if (dd == 2 || dd == 22) {
        ordinal = 'nd';
    } else if (dd == 3 || dd == 23) {
        ordinal = 'rd';
    } else {
        ordinal = 'th';
    };
    //get month
    const mm = month[parseInt(data.slice(5, 7)) - 1] //month as shorthand
    //get year
    const yyyy = data.slice(0, 4); //year as yyyy
    //make into string
    return dayName + ',<br>' + dd + '<sup>' + ordinal + '</sup> ' + mm + ' ' + yyyy;
}

function determineDay(targetDD, todayDD, todayDate) {
    const difference = targetDD - todayDD;
    let dayName = todayDate.getDay() + difference
    if (dayName > 6) {
        dayName = dayName - 7;
    }
    return parseInt(dayName);
}