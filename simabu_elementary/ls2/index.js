// async function callApi() {
//     // 実際に叩く
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const users = await res.json()
//     console.log(users);
// }

// function callApi() {
//     // 実際に叩く
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then((res) => res.json())
//         .then((users) => console.log(users))
// }

// function callApi() {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", 'https://jsonplaceholder.typicode.com/users');
//     xhr.responseType = 'json';
//     xhr.send();
//     xhr.onload = function () {
//         console.log(xhr.response);
//     }
// }

callApi();
