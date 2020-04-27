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
        
        fetch(LISTS_URL, configObj)
        .then(response => response.json())
        .then(function(jsonObject) { 
            let list = new List(jsonObject.data.attributes);
            list.buildList();
        });
    }

    createItems(items) {
        let itemsArray = []
        if(items) {
            items.forEach(itm => {
                itemsArray.push(new Item(itm));
            });
        }
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

    buildList() {
        
        const main = document.createElement("main");
        body.appendChild(main);
        
        //create to_do containers
        const div = document.createElement("div");
        div.className = "list";
        div.id = this.id;
        main.appendChild(div);
        this.addToDoInfo(div);

        //create doing container
        const div_doing = document.createElement("div");
        div_doing.className = "list doing";
        div_doing.id = this.id + "doing";
        main.appendChild(div_doing);
        this.addDoingInfo(div_doing);

        //create done container
        const div_done = document.createElement("div");
        div_done.className = "list done";
        div_done.id = this.id + "done";
        main.appendChild(div_done);
        this.addDoneInfo(div_done);
        
    }

    addToDoInfo(div) {
        //to use inside the eventlistner
        const list = this;

        //add list name
        const p = document.createElement("p");
        p.innerHTML = this.name + " (to do):";
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

        //add exsiting list to do items
        const ul = document.createElement('ul');
        div.appendChild(ul);
        for (const item of this.items) {
            if (item.status == "to_do") {
                item.addToDoToDOM();
            }
        }
    }

    addDoingInfo(div) {
        const list = this;

        //add list name
        const p = document.createElement("p");
        p.innerHTML = this.name + " (doing):";
        div.appendChild(p);

        //add exsiting list doing items
        const ul = document.createElement('ul');
        div.appendChild(ul);
        for (const item of list.items) {
            if (item.status == "doing") {
                item.addDoingToDOM();
            }
        }
    }

    addDoneInfo(div) {
        const list = this;

        //add list name
        const p = document.createElement("p");
        p.innerHTML = this.name + " (done):";
        div.appendChild(p);

        //add exsiting list done items
        const ul = document.createElement('ul');
        div.appendChild(ul);
        for (const item of list.items) {
            if (item.status == "done") {
                item.addDoneToDOM();
            }
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
                //add the item to the DOM
                item.addToDoToDOM();
            }
        });
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