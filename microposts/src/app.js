import {userInterface} from "./userInterface";
import {dataInterface} from "./dataInterface";

const SUCCESS = 'alert alert-success';
const ERROR = 'alert alert-danger';

function getPosts() {
    dataInterface.getPosts()
        .then(data => userInterface.showPosts(data))
        .catch(error => userInterface.showFeedback(error, ERROR));
}

function addPost() {
    dataInterface.addPost(
        {title: userInterface.getPostTitle(), body: userInterface.getPostBody()}
    )
        .then(
            () => {
                userInterface.clearInputFields();
                userInterface.showFeedback('Post added!', SUCCESS);
                getPosts();
            }
        )
        .catch(error => userInterface.showFeedback(error, ERROR));
}

function updatePost() {
    console.log('>>> updatePost()');
    dataInterface.updatePost(
        {
            id: userInterface.getPostId(),
            title: userInterface.getPostTitle(),
            body: userInterface.getPostBody()
        }
    )
        .then(
            () => {
                userInterface.clearInputFields();
                userInterface.showFeedback('Post updated!', SUCCESS);
                userInterface.setAddFormState();
                getPosts();
            }
        )
        .catch(error => userInterface.showFeedback(error, ERROR));
}

function submitButtonClicked(event) {
    switch (userInterface.formState) {
        case 'add':
            if (userInterface.isInputValid()) {
                addPost();
            }
            break;
        case 'edit':
            if (userInterface.isInputChanged()) {
                updatePost();
            }
            break;
    }
    event.preventDefault();
}

function deletePost(event) {
    dataInterface.deletePost(event.target.parentElement.dataset.id)
        .then(
            () => {
                userInterface.showFeedback('Post deleted!', SUCCESS);
                getPosts();
            }
        )
        .catch(error => userInterface.showFeedback(error, ERROR));
    event.preventDefault();
}

function editPost(event) {
    dataInterface.getPost(event.target.parentElement.dataset.id)
        .then(data => userInterface.setEditFormState(data))
        .catch(error => userInterface.showFeedback(error, ERROR));
    event.preventDefault();
}

function postsClicked(event) {
    const method = event.target.parentElement.classList[0];
    switch (method) {
        case 'delete':
            deletePost(event);
            break;
        case 'edit':
            editPost(event);
            break;
    }
    event.preventDefault();
}

function cancelButtonClicked() {
    userInterface.clearInputFields();
    userInterface.setAddFormState();
}

function setUpEventListeners() {
    document.addEventListener('DOMContentLoaded', getPosts);
    userInterface.submitButton.addEventListener('click', submitButtonClicked);
    userInterface.posts.addEventListener('click', postsClicked);
    userInterface.cancelButton.addEventListener('click', cancelButtonClicked);
}

userInterface.setAddFormState();
setUpEventListeners();