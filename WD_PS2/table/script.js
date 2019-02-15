const GOODS = [
    {
        category: 'Furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'Supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2.22
    },
    {
        category: 'Other',
        name: 'Trash Bin',
        amount: 1,
        price: 5.1
    },
    {
        category: 'Furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'Supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'Other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];

const TABLE = document.querySelector("table");

document.addEventListener("DOMContentLoaded", function() {addTableData(GOODS)});
document.addEventListener("DOMContentLoaded", addSelectOptions);

function addTableData(array = GOODS, table = TABLE) {
    let sum = 0;
    let tbody = table.querySelector("tbody");
    let tfoot = table.querySelector("tfoot");

    /* Delete old table */
    removeAllChild(tbody);
    removeAllChild(tfoot);

    /* Create new table */
    for (let item of array) {
        let tr = document.createElement("tr");
        tr.appendChild(createElement("td", item.category));
        tr.appendChild(createElement("td", item.name));
        tr.appendChild(createElement("td", item.amount));
        tr.appendChild(createElement("td", item.price));
        sum += item.amount * item.price;
        tbody.appendChild(tr);
    }

    let tr = document.createElement("tr");
    tr.appendChild(createElement("th", ""));
    tr.appendChild(createElement("th", ""));
    tr.appendChild(createElement("th", "Total:"));
    tr.appendChild(createElement("th", sum.toFixed(2) + "$"));
    tfoot.appendChild(tr);
}

function createElement(tag, value) {
    let element = document.createElement(tag);
    element.innerHTML = value;
    return element;
}

function addSelectOptions() {
    let select = document.querySelector("select");
    let categories = GOODS;
    for (let item of categories) {
        let option = createElement("option", item.category);
        option.setAttribute("value", item.category);
        select.appendChild(option);
    }
}

function removeAllChild(parentElement) {
    while (parentElement.firstChild) {
        parentElement.firstChild.remove();
    }
}
