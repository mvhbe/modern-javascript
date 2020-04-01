const STATUS_OK = 200;

const numberOfJokes = document.querySelector('#number-of-jokes');
const jokesList = document.querySelector('.jokes');

document.querySelector('#get-jokes').addEventListener('click', getJokes);

function createJokeItem(joke) {
    console.log('=> createJokeItem()');
    console.log(`=> joke = ${joke.value}`);
    const jokeItem = document.createElement('li');
    jokeItem.innerText = joke;
    return jokeItem;
}

function displayJokes(jokes) {
    console.log('=> displayJokes()');
    jokesList.innerHTML = '';
    if (Array.isArray(jokes)) {
        jokes.forEach(
            function (joke) {
                jokesList.appendChild(createJokeItem(joke.joke));
            }
        );
    }else {
        jokesList.appendChild(createJokeItem(jokes.joke));
    }
}

function displayError() {
    console.log(`=> displayError()`);
    jokesList.appendChild(createJokeItem('Something went wrong!'));
}

function getJokesFromIcndb() {
    console.log('=> getJokesFromIcndb()');
    const xmlHttpRequest = new XMLHttpRequest();

    console.log(`http://api.icndb.com/jokes/random/${numberOfJokes.value}`);
    xmlHttpRequest.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes.value}`, true);
    xmlHttpRequest.onload = function() {
        if (xmlHttpRequest.status === STATUS_OK) {
            console.log(`=> responseText = ${this.responseText}`);
            let response = JSON.parse(this.responseText);
            if (response.type === 'success') {
                displayJokes(response.value);
            } else {
                displayError();
            }

        }
    };
    xmlHttpRequest.send();
}

function getJokes(event) {
    console.log('=> getJokes()');
    getJokesFromIcndb();
    event.preventDefault();
}