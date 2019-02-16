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
        category: 'Furniture',
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
const SELECT_INPUT = document.querySelector("select");
const NAME_INPUT = document.querySelector("input");
const NAME_HEAD = document.querySelector(".name");
const CATEGORY_HEAD = document.querySelector(".category");
const SORT_LIST = [
    {
        name: "Name",
        sort: undefined,
        element: NAME_HEAD
    },
    {
        name: "Category",
        sort: undefined,
        element: CATEGORY_HEAD
    }
];

document.addEventListener(
    "DOMContentLoaded", function () {
        addTableData(GOODS)
    });
document.addEventListener("DOMContentLoaded", addSelectOptions);
SELECT_INPUT.addEventListener("input", filter);
NAME_INPUT.addEventListener("input", filter);
NAME_HEAD.addEventListener(
    "click", function () {
        changeSort("Name");
    });

CATEGORY_HEAD.addEventListener(
    "click", function () {
        changeSort("Category");
    });

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
    tr.appendChild(createElement("th"));
    tr.appendChild(createElement("th"));
    tr.appendChild(createElement("th", "Total:"));
    tr.appendChild(createElement("th", sum.toFixed(2) + "$"));
    tfoot.appendChild(tr);
}

function createElement(tag, value = "") {
    let element = document.createElement(tag);
    element.innerHTML = value;
    return element;
}

function addSelectOptions() {
    let select = document.querySelector("select");
    let uniqueCategories = [];

    for (let item of GOODS) {
        if (!uniqueCategories.includes(item.category)) {
            uniqueCategories.push(item.category);
            let option = createElement("option", item.category);
            option.setAttribute("value", item.category);
            select.appendChild(option);
        }
    }
}

function removeAllChild(parentElement) {
    while (parentElement.firstChild) {
        parentElement.firstChild.remove();
    }
}

function filter() {
    let array = GOODS;
    let category = SELECT_INPUT.value;
    let name = NAME_INPUT.value;

    /* Filter by category */
    if (category !== "") {
        array = GOODS.filter(item => item.category === category);
    }

    /* Filter by name */
    if (name !== "") {
        array = array.filter(item => item.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
    }

    /* Sort */
    for (let sortColumn of SORT_LIST) {
        if (sortColumn.sort !== undefined) {

            let sortField = sortColumn.name.toLowerCase();
            array.sort(function (firstObject, secondObject) {

                if (firstObject[sortField] > secondObject[sortField]) {
                    return 1;
                }

                if (firstObject[sortField] < secondObject[sortField]) {
                    return -1;
                }

                return 0;
            });

            if (!sortColumn.sort) {
                array.reverse();
            }

            break;
        }
    }

    addTableData(array);
}

function changeSort(fieldName) {
    for (let item of SORT_LIST) {

        if (item.name === fieldName) {

            /* Set new sort */
            if (item.sort === undefined) {
                item.sort = true;
            } else {
                item.sort = !item.sort;
            }

            if (item.sort) {
                item.element.innerHTML = item.name + " ▼";
            } else {
                item.element.innerHTML = item.name + " ▲";
            }

        } else {
            /* Reset sort in all another field */
            item.sort = undefined;
            item.element.innerHTML = item.name + " ▼▲";
        }
    }

    filter();
}
