const easyHttp = new Easyhttp2();

// easyHttp.get('https://jsonplaceholder.typicode.com/users')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

const user = {
    name: 'Guido Van Hoof',
    username: 'gvhoof',
    email: 'gvhoof@gmail.com'
};

easyHttp.post('https://jsonplaceholder.typicode.com/users', user)
    .then(data => console.log(data))
    .catch(error => console.log(error));
