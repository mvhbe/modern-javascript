class WeatherApi {
    constructor(location) {
        this.location = location;
        this.apiKey = '69fcc5080c';
        this.url = 'http://weerlive.nl/api/json-data-10min.php';
    }

    async getWeather() {
        console.log(`>>> getWeather(${this.url}?key=${this.apiKey}&locatie=${this.location})`);
        const response = await fetch(`${this.url}?key=${this.apiKey}&locatie=${this.location}`);
        const data =  await response.json();
        return data.liveweer[0];
    }

    changeLocation(location) {
        console.log(`>>> changeLocation(${location})`);
        this.location = location;
    }
}