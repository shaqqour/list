const BASE_URL = "http://localhost:3000";
const LISTS_URL = `${BASE_URL}/lists`;
const ITEMS_URL = `${BASE_URL}/items`;

const main = document.getElementsByTagName("main")[0];

document.addEventListener("DOMContentLoaded", () => {
    fetch(LISTS_URL)
    .then(response => response.json())
    .then(json => render(json));
});

function render(jsonObject) {

    for (const lst of jsonObject.data) {
        let list = new List(lst.attributes);
        addInfo(list)
    }

}

function addInfo(list) {

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
    const textfield = document.createElement("input");
    textfield.type = "text";
    form.appendChild(textfield);
    div.appendChild(form);
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.innerHTML = "Add";
    form.appendChild(addButton)
    
    addButton.addEventListener("click", function (e) {
        if (textfield.value.length > 0) {
            let item = list.createItem(textfield.value);
            UpdateList(item);
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
    deleteButton.addEventListener("click", deleteItem);

    li.innerHTML = item.name;
    li.appendChild(deleteButton);
    li.appendChild(doingButton);
    ul.appendChild(li);
    div.appendChild(ul);
}

function UpdateList(item) {
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
            addItem(jsonItem);
        }
    });
}

function deleteItem(e) {
    console.log(e);
    e.target.parentElement.remove();
}