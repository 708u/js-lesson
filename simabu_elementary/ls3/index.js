// DOM
const button = document.getElementById('addBtn');
const lists = document.getElementById('lists');

// functions
function addList(user) {
    const list = document.createElement('li');
    list.innerText = user.name;
    lists.appendChild(list);
}

async function getUsers() {
    const les = await fetch('https://jsonplaceholder.typicode.com/users');
    return await les.json();
}

async function listUsers() {
    const users = await getUsers();
    users.forEach(addList)
}

// Event
addEventListener('load', listUsers)
button.addEventListener('click', listUsers)

