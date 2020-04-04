const DEFAULT_LOCATION = 'Amsterdam';

class Storage {
    static getLocation() {
        return this.getLocationFromLocalStorage()
    }

    static getLocationFromLocalStorage() {
        let currentLocation = localStorage.getItem('location');
        if (currentLocation === null) {
            currentLocation = DEFAULT_LOCATION;
            this.saveLocation(currentLocation);
        }
        return currentLocation;
    }

    static saveLocation(newLocation) {
        localStorage.setItem('location', newLocation);
    }
}