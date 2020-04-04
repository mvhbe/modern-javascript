const
    getTextButton = document.querySelector('#get-text'),
    getJsonButton = document.querySelector('#get-json'),
    getApiDataButton = document.querySelector('#get-api-data'),
    output = document.querySelector('#output');

function getTextButtonClicked() {
    console.log('=> getTextButtonClicked()');
    fetch('text.txt')
        .then(
            function (response) {
                return response.text();
            }
        )
        .then(
            function (data) {
                console.log(`>>> data = ${data}`);
                output.innerHTML = data;
            }
        )
        .catch(
            function (error) {
                console.log(`>>> error = ${error}`);
                output.innerHTML = error;
            }
        )
}

getTextButton.addEventListener('click', getTextButtonClicked);

function getJsonButtonClicked() {
    console.log('=> getJsonButtonClicked()');
    fetch('post.json')
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(
            function (data) {
                console.log(`>>> data = ${JSON.stringify(data)}`);
                let items = '';
                data.forEach(
                    function (post) {
                        items += `<li>${post.title}</li>`;
                    }
                );
                output.innerHTML = items;
            }
        )
        .catch(
            function (error) {
                console.log(`>>> error = ${error}`);
                output.innerHTML = error;
            }
        )
}

getJsonButton.addEventListener('click', getJsonButtonClicked);

function getApiDataButtonClicked() {
    console.log('=> getApiDataButtonClicked()');
    fetch('https://api.github.com/users')
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(
            function (users) {
                console.log(`>>> data = ${JSON.stringify(users)}`);
                let items = '';
                users.forEach(
                    function (user) {
                        items += `<li>${user.login}</li>`;
                    }
                );
                output.innerHTML = items;
            }
        )
        .catch(
            function (error) {
                console.log(`>>> error = ${error}`);
                output.innerHTML = error;
            }
        )
}

getApiDataButton.addEventListener('click', getApiDataButtonClicked);