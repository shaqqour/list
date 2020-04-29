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

        //find the div and ul where the item will be added
        const div = document.getElementById(this.list_id)
        const ul = div.lastChild;
        const li = document.createElement("li");

        //create the doing button to move it to the doing list
        const doingButton = document.createElement("button");
        doingButton.className = "doing";
        doingButton.innerHTML = "Doing";
        doingButton.addEventListener("click", (e) => {
            this.changeItemStatusToDoing();
            e.target.parentElement.remove();
        });

        //create the delete button in case the user want to delete the item
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.type = "submit";
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", (e) => {
            this.delete();
            e.target.parentElement.remove();
        });

        li.innerHTML = this.name;
        li.appendChild(deleteButton);
        li.appendChild(doingButton);
        ul.appendChild(li);
        div.appendChild(ul);
    }

    addDoingToDOM() {

        //find the div and ul where the item will be added
        const div = document.getElementById(this.list_id + "doing");
        const ul = div.lastChild;
        const li = document.createElement("li");

        //create the done button to move it to the done list
        const doneButton = document.createElement("button");
        doneButton.className = "done";
        doneButton.innerHTML = "Done";
        doneButton.addEventListener("click", (e) => {
            this.changeItemStatusToDone();
            e.target.parentElement.remove();
        });

        li.innerHTML = this.name;
        li.appendChild(doneButton);
        ul.appendChild(li);
        div.appendChild(ul);

    }

    addDoneToDOM() {

        //find the div and ul where the item will be added
        const div = document.getElementById(this.list_id + "done");
        const ul = div.lastChild;
        const li = document.createElement("li");

        //create the remove button
        const removeButton = document.createElement("button");
        removeButton.className = "delete";
        removeButton.innerHTML = "Remove";
        removeButton.addEventListener("click", (e) => {
            this.delete();
            e.target.parentElement.remove();
        });

        li.innerHTML = this.name;
        li.appendChild(removeButton);
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

    static compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

}