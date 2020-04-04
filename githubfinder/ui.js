const CLASS_ERROR = 'alert-danger';

class UserInterface {
    constructor() {
        this.profile = document.querySelector('#profile');
        this.message = document.querySelector('#message');
    }

    showUserAndRepos(data) {
        console.log(`>>> data.user.message = ${data.user.message}`);
        if (data.user.message === 'Not Found') {
            this.showMessage('User Not Found!', CLASS_ERROR)
        } else {
            this.showUser(data.user);
            this.showRepos(data.repos);
        }
    }

    showUser(user) {
        this.profile.innerHTML = this.buildUserProfile(user);
    }

    showRepos(repos) {
        const reposDiv = document.querySelector('#repos');
        console.log(`>>> reposDiv = ${reposDiv}`);
        reposDiv.innerHTML = this.buildRepos(repos);
    }

    clearUserAndRepos() {
        this.profile.innerHTML = '';
    }

    buildUserProfile(user) {
        return `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos : ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists : ${user.public_gists}</span>
                        <span class="badge badge-success">Followers : ${user.followers}</span>
                        <span class="badge badge-info">Following : ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company : ${user.company}</li>
                            <li class="list-group-item">Website/Blog : ${user.blog}</li>
                            <li class="list-group-item">Location : ${user.location}</li>
                            <li class="list-group-item">Member Since : ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
    }

    showMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert ${className}`;
        messageDiv.appendChild(document.createTextNode(message));

        const card = document.querySelector('.card');
        const searchBox = document.querySelector('#searchUser');

        card.insertBefore(messageDiv, searchBox);
        setTimeout(this.removeErrorMessage, 3000);

    }

    removeErrorMessage() {
        document.querySelector('.alert').remove();
    }

    buildRepos(repos) {
        console.log(`>>> building repos ...`);
        let html = '';
        repos.forEach(
            (repo) => (html += this.addHtmlForRepo(repo))
        );
        return html;
    }

    addHtmlForRepo(repoToAdd) {
        console.log(`>>> adding html for repo ...`);
        return `
             <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repoToAdd.html_url}" target="_blank">${repoToAdd.name}</a>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Stars : ${repoToAdd.stargazers_count}</span>
                        <span class="badge badge-secondary">Watchers : ${repoToAdd.watchers_count}</span>
                        <span class="badge badge-success">Forkers : ${repoToAdd.forks_count}</span>
                    </div>
                </div>
             </div>
        `;
    }
}