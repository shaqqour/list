const BASE_URL = "http://localhost:3000";
const LISTS_URL = `${BASE_URL}/lists`;
const ITEMS_URL = `${BASE_URL}/items`;

const body = document.getElementsByTagName("body")[0];

document.addEventListener("DOMContentLoaded", () => {

    //Create a new list
    createNewListForm();
    
    fetch(LISTS_URL)
    .then(response => response.json())
    .then(json => render(json));
});

function createNewListForm() {
    const span = document.createElement("span");
    span.className = "createlist";
    body.appendChild(span);
    const form = document.createElement("form");
    const newListTextfield = document.createElement("input");
    newListTextfield.type = "text";
    form.appendChild(newListTextfield);
    span.appendChild(form);
    const createNewListButton = document.createElement("button");
    createNewListButton.type = "submit";
    createNewListButton.innerHTML = "Create List";
    createNewListButton.addEventListener("click", function (e) {
        if (newListTextfield.value.length > 0) {
            addNewList(newListTextfield.value);
        }
    });
    form.appendChild(createNewListButton)
}

function render(jsonObject) {

    for (const lst of jsonObject.data) {
        let list = new List(lst.attributes);
        addInfo(list)
    }

}

function addInfo(list) {

    const main = document.createElement("main");
    body.appendChild(main);

    //create container
    const div = document.createElement("div");
    div.className = "list";
    div.id = list.id;
    main.appendChild(div);

    //add list name
    const p = document.createElement("p");
    p.innerHTML = list.name + " list:";
    div.appendChild(p);

    //add textfield and button to add to the list
    const form = document.createElement("form");
    const newItemTextfield = document.createElement("input");
    newItemTextfield.type = "text";
    form.appendChild(newItemTextfield);
    div.appendChild(form);
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.innerHTML = "Add";
    form.appendChild(addButton)
    
    addButton.addEventListener("click", function (e) {
        if (newItemTextfield.value.length > 0) {
            let item = list.createItem(newItemTextfield.value);
            updateList(item);
        }
    });

    //add exsiting list items
    const ul = document.createElement('ul');
    div.appendChild(ul);
    for (const item of list.items) {
        addItem(item);
    }
}

function addItem(item) {

    //find the div and ul where the item will be added
    const div = document.getElementById(item.list_id)
    const ul = div.lastChild;
    const li = document.createElement("li");

    //create the doing button to move it to the doing list
    const doingButton = document.createElement("button");
    doingButton.className = "doing";
    doingButton.innerHTML = "Doing";

    //create the delete button in case the user want to delete the item
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.type = "submit";
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function(e){
        deleteItem(item);
        e.target.parentElement.remove();
    });

    li.innerHTML = item.name;
    li.appendChild(deleteButton);
    li.appendChild(doingButton);
    ul.appendChild(li);
    div.appendChild(ul);
}

function updateList(item) {
    let formData = {
        "name": item.name,
        "status": item.status,
        "priority": item.priority,
        "due_date": item.due_date,
        "list_id": item.list_id
    };
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch(ITEMS_URL, configObj)
    .then(response => response.json())
    .then(function(jsonItem){
        if (jsonItem.id) {
            let item = new Item(jsonItem)
            addItem(item);
        }
    });
}

function deleteItem(item) {
    let configObj = { method: "DELETE" };
    console.log(item);
    fetch(ITEMS_URL + "/" + item.id, configObj);
}

function addNewList(name) {
    let formData = {
        "name": name
    };
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch(LISTS_URL, configObj)
    .then(response => response.json())
    .then(function (jsonList) {
        if (jsonList.id) {
            let list = new List(jsonList);
                addInfo(list);
        }
    });
}