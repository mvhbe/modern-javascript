class Github {
    constructor() {
        this.clientId = 'aee7ccb8405428433e56';
        this.clientSecret = 'a3ae7e5bf5e68dfbae35ed402591e772f580b2f1';
        this.numberOfRepos = 5;
        this.sortBy = 'created: asc';
    }

    async getUser(username) {
        const userResponse = await
            fetch(
                `https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
            );
        const reposResponse = await
            fetch(
                `https://api.github.com/users/${username}/repos?per_page=${this.numberOfRepos}&sort=${this.sortBy}&client_id=${this.clientId}&client_secret=${this.clientSecret}`
            );

        const user = await userResponse.json();
        const repos = await reposResponse.json();

        return {
            user,
            repos
        };
    }
}