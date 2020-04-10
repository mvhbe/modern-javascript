import {userInterface} from "./userInterface";
import {dataInterface} from "./dataInterface";

const SUCCESS = 'alert alert-success';
const ERROR = 'alert alert-danger';

function getPosts() {
    dataInterface.getPosts()
        .then(data => userInterface.showPosts(data))
        .catch(error => userInterface.displayError(error));
}

function submitButtonClicked(event) {
    if (userInterface.isInputValid()) {
        dataInterface.addPost(
            { title: userInterface.getPostTitle(), body: userInterface.getPostBody()}
        )
            .then(
                data => {
                    userInterface.addPost(data);
                    userInterface.clearInputFields();
                    userInterface.showFeedback('Post added!', SUCCESS)
                }
            )
            .catch(error => userInterface.displayError(error));
    }
    event.preventDefault();
}

function setUpEventListeners() {
    document.addEventListener('DOMContentLoaded', getPosts);
    userInterface.submitButton.addEventListener('click', submitButtonClicked);
}

setUpEventListeners();