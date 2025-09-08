const todoList = document.getElementById('todoList');
const inputBox = document.getElementById('inputBox');
const adddBtn = document.getElementById('adddBtn');

async function onLoad() {
    const response = await axios({
        method: "get",
        url: "http://localhost:3000/todos",
        headers: {
            token: localStorage.getItem('token')
        }
    })

    //Fetch the response to the todolis
    const { data } = response;

    for (let i = 0; i < data.length; i++) {
        const todo = document.createElement('li');
        const uuid = data[i]._id.toString();
        todo.setAttribute('id', uuid);

        todo.innerHTML = `<div>${data[i].todo}</div>
        <button onclick="deleteFn('${uuid}')">delete</button>
        <button onclick="updateFn('${uuid}')">update</button>`

        todoList.appendChild(todo);
    }
}
onLoad();


addBtn.addEventListener('click', async (e) => {
    let value = inputBox.value;
    if (!value.trim()) return;

    const todo = document.createElement('li');

    todo.innerHTML = `<div>${value}</div>`
    todo.style.opacity = 0.5;

    todoList.appendChild(todo);
    inputBox.value = "";

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/todo',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                todo: value,
                done: false
            }
        })
        console.log(response);

        if (response) {
            const { data } = response;
            const uuid = data._id.toString();
            todo.setAttribute('id', uuid);

            todo.innerHTML = `<div>${data.todo}</div>
            <button onclick="deleteFn('${uuid}')">delete</button>
            <button onclick="updateFn('${uuid}')">update</button>`;
            todo.style.opacity = 1;
        }
    } catch (e) {
        console.log(e)
    }
})

async function deleteFn(id) {
    const ele = document.getElementById(id);
    ele.style.opacity = 0.5;

    try {
        const response = await axios({
            method: 'delete',
            url: 'http://localhost:3000/todo',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id
            }
        })
        console.log(response);

        if (response) {
            ele.parentNode.removeChild(ele);
        }
    } catch (e) {
        console.log(e)
    }
}

async function updateFn(id) {
    const ele = document.getElementById(id);
    ele.innerHTML = `<input type="text" placeholder="Update todo.."/>
    <button onclick="saveFn('${id}')"> save </button>`
}

async function saveFn(id) {
    const ele = document.getElementById(id);
    const saveValue = ele.querySelector('input').value;
    ele.innerHTML = `<div>${saveValue}</div>`
    ele.style.opacity = 0.5;

    try {
        const response = await axios({
            method: 'put',
            url: 'http://localhost:3000/todo',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id : id,
                todo: saveValue,
                done: false
            }
        })
        console.log(response);

        if (response) {
            ele.innerHTML = `<div>${saveValue}</div>
            <button onclick="deleteFn('${id}')">delete</button>
            <button onclick="updateFn('${id}')">update</button>`;
            ele.style.opacity = 1;
        }
    } catch (e) {
        console.log(e)
    }
}