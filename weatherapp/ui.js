class UserInterface {
    constructor() {
        console.log(`>>> constructor()`);
        this.location = document.querySelector('#location');
        this.description = document.querySelector('#description');
        this.temperature = document.querySelector('#temperature');
        this.icon = document.querySelector('#icon');
        this.humidity = document.querySelector('#humidity');
        this.dewpoint = document.querySelector('#dewpoint');
        this.feelsLike = document.querySelector('#feels-like');
        this.wind = document.querySelector('#wind');
    }

    showWeatherInfo(data) {
        console.log('>>> showWeatherInfo()');
        this.location.textContent = data.plaats;
        this.description.textContent = data.samenv;
        this.temperature.textContent = `Temperatuur : ${data.temp} °`;
        this.icon.textContent = data.icon;
        this.humidity.textContent = `Relatieve luchtvochtigheid : ${data.lv}`;
        this.dewpoint.textContent = `Dauwpunt : ${data.dauwp}`;
        this.feelsLike.textContent = `Gevoelstemperatuur : ${data.gtemp} °`;
        this.wind.textContent = `Windkracht : ${data.winds} (Beaufort)`;
    }

    showError(error) {
        console.log('>>> showError()');
    }
}