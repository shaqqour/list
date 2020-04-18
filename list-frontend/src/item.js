class Item {
    constructor(attributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.status = attributes.status;
        this.priority = attributes.priority;
        this.due_date = attributes.due_date;
        this.list_id = attributes.list_id;
    }

    addToDoToDOM() {
        let item = this;

        //find the div and ul where the item will be added
        const div = document.getElementById(this.list_id)
        const ul = div.lastChild;
        const li = document.createElement("li");

        //create the doing button to move it to the doing list
        const doingButton = document.createElement("button");
        doingButton.className = "doing";
        doingButton.innerHTML = "Doing";
        doingButton.addEventListener("click", function(e) {
            item.changeItemStatusToDoing();
            e.target.parentElement.remove();
        });

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

    addDoingToDOM() {
        let item = this;

        //find the div and ul where the item will be added
        const div = document.getElementById(this.list_id + "doing");
        const ul = div.lastChild;
        const li = document.createElement("li");

        //create the done button to move it to the done list
        const doneButton = document.createElement("button");
        doneButton.className = "done";
        doneButton.innerHTML = "Done";
        doneButton.addEventListener("click", function (e) {
            item.changeItemStatusToDone();
            e.target.parentElement.remove();
        });

        li.innerHTML = this.name;
        li.appendChild(doneButton);
        ul.appendChild(li);
        div.appendChild(ul);

    }

    addDoneToDOM() {
        let item = this;

        //find the div and ul where the item will be added
        const div = document.getElementById(this.list_id + "done");
        const ul = div.lastChild;
        const li = document.createElement("li");

        li.innerHTML = this.name;
        ul.appendChild(li);
        div.appendChild(ul);

    }

    changeItemStatusToDoing() {
        let formData = {
            "status": "doing",
        };
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        };
        fetch(ITEMS_URL + "/" + this.id, configObj)
        .then(response => response.json())
        .then(function (jsonItem) {
            if (jsonItem.data.id) {
                let item = new Item(jsonItem.data.attributes)
                //add the item to the DOM
                item.addDoingToDOM();
            }
        });
    }

    changeItemStatusToDone() {
        let formData = {
            "status": "done",
        };
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        };
        fetch(ITEMS_URL + "/" + this.id, configObj)
            .then(response => response.json())
            .then(function (jsonItem) {
                if (jsonItem.data.id) {
                    let item = new Item(jsonItem.data.attributes)
                    //add the item to the DOM
                    item.addDoneToDOM();
                }
            });
    }

    delete() {
        let configObj = { method: "DELETE" };
        fetch(ITEMS_URL + "/" + this.id, configObj);
    }
}