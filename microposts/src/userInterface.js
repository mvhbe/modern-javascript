import {dataInterface} from "./dataInterface";

function createPostCard(post) {
    return `
        <div class="card mb-1">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.body}</p>
                <a href="#" class="edit card-link" data-id="${post.id}">
                    <i class="fa fa-pencil"></i>
                </a>
                <a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        </div>    
    `;
}

class UserInterface {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.postId = document.querySelector('#post-id');
        this.postTitle = document.querySelector('#post-title');
        this.postBody = document.querySelector('#post-body');
        this.submitButton = document.querySelector('#submitButton');
        this.formMessage = document.querySelector('#form-message');
        this.formState = 'add';
    }

    showPosts(posts) {
        let postsList = '';
        posts.forEach(
            (post) => postsList += createPostCard(post)
        );
        this.posts.innerHTML = postsList;
    }

    isPostTitleValid() {
        return this.postTitle.value !== '';
    }

    isPostBodyValid() {
        return this.postBody.value !== '';
    }

    isInputValid() {
        return this.isPostTitleValid() && this.isPostBodyValid();
    }

    getPostTitle() {
        return this.postTitle.value;
    }

    getPostBody() {
        return this.postBody.value;
    }

    clearInputFields() {
        this.postTitle.value = '';
        this.postBody.value = '';
    }

    showFeedback(message, feedbackColor) {
        this.formMessage.textContent = message;
        this.formMessage.className = `mt-3 ${feedbackColor}`;
        setTimeout(
            () => {
                this.formMessage.innerHTML = '';
                this.formMessage.className = '';
            },
            3000);
    }
}

export const userInterface = new UserInterface();