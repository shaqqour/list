class List {
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.items = this.createItems(json.items);
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
}