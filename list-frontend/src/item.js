class Item {
    constructor(attributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.status = attributes.status;
        this.priority = attributes.priority;
        this.due_date = attributes.due_date;
        this.list_id = attributes.list_id;
    }

    addToDOM() {
        let item = this;
        //find the div and ul where the item will be added
        const div = document.getElementById(this.list_id)
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
        deleteButton.addEventListener("click", function (e) {
            item.delete();
            e.target.parentElement.remove();
        });

        li.innerHTML = item.name;
        li.appendChild(deleteButton);
        li.appendChild(doingButton);
        ul.appendChild(li);
        div.appendChild(ul);
    }

    delete() {
        let configObj = { method: "DELETE" };
        fetch(ITEMS_URL + "/" + this.id, configObj);
    }
}