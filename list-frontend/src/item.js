class Item {
    constructor(attributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.status = attributes.status;
        this.priority = attributes.priority;
        this.due_date = attributes.due_date;
        this.list_id = attributes.list_id;
    }

    delete() {
        let configObj = { method: "DELETE" };
        fetch(ITEMS_URL + "/" + this.id, configObj);
    }
}