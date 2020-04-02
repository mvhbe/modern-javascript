const easyHttp = new Easyhttp3();

// easyHttp.get('https://jsonplaceholder.typicode.com/users')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

const user = {
    name: 'Guido Van Hoof',
    username: 'guidovanhoof',
    email: 'gvhoof@gmail.com'
};

// easyHttp.post('https://jsonplaceholder.typicode.com/users', user)
//     .then(user => console.log(user))
//     .catch(error => console.log(error));

// easyHttp.put('https://jsonplaceholder.typicode.com/users/2', user)
//     .then(user => console.log(user))
//     .catch(error => console.log(error));

easyHttp.delete('https://jsonplaceholder.typicode.com/users/2')
    .then(data => console.log(data))
    .catch(error => console.log(error));
