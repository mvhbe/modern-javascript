const easyHttp = new EasyHttp();

function displayPosts(error, posts) {
    if (error) {
        console.log(`=> ${error}`)
    } else {
        console.log(`=> post(s) = ${posts}`);
    }
}

//easyHttp.get('https://jsonplaceholder.typicode.com/posts', displayPosts);

const post = {
    title: 'My First Post',
    body: 'This is my first post!'
};

//easyHttp.post('https://jsonplaceholder.typicode.com/posts', post, displayPosts);

//easyHttp.put('https://jsonplaceholder.typicode.com/posts/1', post, displayPosts);

//easyHttp.delete('https://jsonplaceholder.typicode.com/posts/1', displayPosts);