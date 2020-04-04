const searchBox = document.querySelector('#searchUser');
const github = new Github();
const userInterface = new UserInterface();

function searchGithubForUSer(event) {
    const username = searchBox.value;

    if (username !== '') {
        github.getUser(username)
            .then((data) => userInterface.showUserAndRepos(data));
    } else {
        userInterface.clearUserAndRepos();
    }
}

searchBox.addEventListener('keyup', (event) => searchGithubForUSer(event));