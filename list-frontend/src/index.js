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
    const newListInput = document.createElement("input");
    newListInput.type = "text";
    form.appendChild(newListInput);
    span.appendChild(form);
    const newListButton = document.createElement("button");
    newListButton.type = "submit";
    newListButton.innerHTML = "Create List";
    newListButton.addEventListener("click", function (e) {
        if (newListInput.value.length > 0) {
            List.create(newListInput.value);
        }
    });
    form.appendChild(newListButton)
}

function render(jsonObject) {

    for (const lst of jsonObject.data) {
        let list = new List(lst.attributes);
        list.buildList();
    }

}