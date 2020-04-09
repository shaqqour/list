const BASE_URL = "http://localhost:3000";
const LISTS_URL = `${BASE_URL}/lists`;

const main = document.getElementsByTagName("main")[0];

document.addEventListener("DOMContentLoaded", () => {
    fetch(LISTS_URL)
    .then(response => response.json())
    .then(json => render(json));
});

function render(jsonObject) {
    let list = new List(jsonObject[0].name)
    let item = new Item(jsonObject[0].items[0])
    console.log(list);
    console.log(item);
}