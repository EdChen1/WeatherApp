let appId = '5d9ef962b702685a08ca8a5e9113ec99';
let units = 'imperial'; 
let searchMethod; 

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
}

function init(resultFromServer) {
	if(resultFromServer.message == "city not found")
		alert("invalid/incorrect input!");
	else {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('./Picture/clear.jpg')";
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = "url('./Picture/cloudy.jpg')";
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = "url('./Picture/rain.jpg')";
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('./Picture/storm.jpg')";
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = "url('.Picture/snow.jpg')";
            break;

        default: 
        	document.body.style.backgroundImage = "url('.Picture/default.jpg')";
            break;
    }
	}

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let cityHeader = document.getElementById('cityHeader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    cityHeader.innerHTML = resultFromServer.name;

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});