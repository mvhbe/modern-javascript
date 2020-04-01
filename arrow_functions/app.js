// const sayHello = function () {
//     console.log('Hello');
// };

// const sayHello = () => {
//     console.log('Hello');
// };

// const sayHello = () => console.log('Hello');

// sayHello();

// const sayHello = function () {
//     return 'Hello';
// };

// const sayHello = () => 'Hello ...';

// const sayHello = () => ({msg: 'Hello Again'});

// console.log(sayHello());

// const sayHello = (name) => console.log(`name = ${name}`);
const sayHello = name => console.log(`name = ${name}`);

sayHello('Guido Van Hoof');

const users = [
    'Guido', 'Christel', 'Patrick'
];

// const nameLengts = users.map(
//     function (user) {
//         return user.length;
//     }
// );

// const nameLengts = users.map(
//     (user) => {
//         return user.length;
//     }
// );

const nameLengts = users.map(
    user => user.length
);

console.log(nameLengts);