import {userInterface} from "./userInterface";
import {dataInterface} from "./dataInterface";

const SUCCESS = 'alert alert-success';
const ERROR = 'alert alert-danger';

function getPosts() {
    dataInterface.getPosts()
        .then(data => userInterface.showPosts(data))
        .catch(error => userInterface.showFeedback(error, ERROR));
}

function submitButtonClicked(event) {
    if (userInterface.isInputValid()) {
        dataInterface.addPost(
            { title: userInterface.getPostTitle(), body: userInterface.getPostBody()}
        )
            .then(
                data => {
                    userInterface.clearInputFields();
                    userInterface.showFeedback('Post added!', SUCCESS);
                    getPosts();
                }
            )
            .catch(error => userInterface.showFeedback(error, ERROR));
    }
    event.preventDefault();
}

function postsClicked(event) {
    console.log(`method = ${method}`);
    const method = event.target.parentElement.classList[0];
    switch (method) {
        case 'delete':
            console.log('delete post');
            dataInterface.deletePost(event.target.parentElement.dataset.id)
                .then(
                    () => {
                    userInterface.showFeedback('Post deleted!', SUCCESS);
                        getPosts();
                    }
                )
                .catch(error => userInterface.showFeedback(error, ERROR));
            break;
        case 'edit':
            console.log('editing post');
            break;
    }
}

function setUpEventListeners() {
    document.addEventListener('DOMContentLoaded', getPosts);
    userInterface.submitButton.addEventListener('click', submitButtonClicked);
    userInterface.posts.addEventListener('click', postsClicked);
}

setUpEventListeners();