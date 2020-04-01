const STATUS_OK = 200;

function EasyHttp() {
    this.http = new XMLHttpRequest();
}

EasyHttp.prototype.get = function (url, callbackFunction) {
    this.http.open('GET', url, true);
    this.http.onload = function () {
        if (this.status === STATUS_OK) {
            callbackFunction(null, this.responseText);
        } else {
            callbackFunction('Error : ' + this.status);
        }
    };
    this.http.send();
};

EasyHttp.prototype.post = function (url, post, callbackFunction) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');
    this.http.onload = function () {
        callbackFunction(null, this.responseText);
    };
    this.http.send(JSON.stringify(post));
};

EasyHttp.prototype.put = function (url, post, callbackFunction) {
    this.http.open('PUT', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');
    this.http.onload = function () {
        callbackFunction(null, this.responseText);
    };
    this.http.send(JSON.stringify(post));
};

EasyHttp.prototype.delete = function (url, callbackFunction) {
    this.http.open('DELETE', url, true);
    this.http.onload = function () {
        if (this.status === STATUS_OK) {
            callbackFunction(null, this.responseText);
        } else {
            callbackFunction('Error : ' + this.status);
        }
    };
    this.http.send();
};
