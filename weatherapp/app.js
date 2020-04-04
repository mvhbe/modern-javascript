const
    weatherApi = new WeatherApi(Storage.getLocation()),
    userInterface = new UserInterface(),
    cityLocation = document.querySelector('#city');

function getWeatherFromApi() {
    weatherApi.getWeather()
        .then(data => userInterface.showWeatherInfo(data))
        .catch(error => userInterface.showError(error));
}

function getWeather() {
    console.log(`>>> getWeather()`);
    getWeatherFromApi();
}

document.addEventListener('DOMContentLoaded', getWeather);

function changeLocation(event) {
    let newLocation = cityLocation.value;
    console.log(`>>> changeLocation(${newLocation})`);
    weatherApi.changeLocation(newLocation);
    Storage.saveLocation(newLocation);
    getWeatherFromApi();
    $('#locationModal').modal('hide');
    event.preventDefault();
}

document.querySelector('#save-location').addEventListener('click', changeLocation);

