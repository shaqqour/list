class List {

    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.items = this.createItems(json.items);
    }

    static create(name) {
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
        
        fetch(LISTS_URL, configObj);
    }

    createItems(items) {
        let itemsArray = []
        items.forEach(itm => {
            itemsArray.push(new Item(itm));
        });
        return itemsArray;
    }

    createItem(name) {
        let attributes = {
            name: name,
            status: "to_do",
            priority: null,
            due_date: null,
            list_id: this.id 
        };
        return new Item(attributes);
    }

    addInfo() {
        //to use inside eventListner
        const list = this;
        
        const main = document.createElement("main");
        body.appendChild(main);
        
        //create container
        const div = document.createElement("div");
        div.className = "list";
        div.id = this.id;
        main.appendChild(div);
        
        //add list name
        const p = document.createElement("p");
        p.innerHTML = this.name + " list:";
        //add delete list button
        this.addDeleteListButton();
        div.appendChild(p);
        
        //add textfield and button to add items to the list
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
                list.updateList(item);
            }
        });
        
        //add exsiting list items
        const ul = document.createElement('ul');
        div.appendChild(ul);
        for (const item of this.items) {
            this.addItem(item);
        }
    }

    updateList(item) {
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
        .then(function (jsonItem) {
            if (jsonItem.id) {
                let item = new Item(jsonItem)
                this.addItem(item);
            }
        });
    }

    addItem(item) {

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

    addDeleteListButton() {
        //to use inside the event listner
        const list = this;
        
        const div = document.getElementById(this.id);
        const deleteList = document.createElement("button");
        deleteList.className = "delete";
        deleteList.innerHTML = "Delete List"
        div.appendChild(deleteList);

        deleteList.addEventListener("click", function (e) {
            list.removeList()
            div.parentElement.remove();
        });

    }

    removeList() {
        let configObj = { method: "DELETE" };
        fetch(LISTS_URL + "/" + this.id, configObj);
    }

}