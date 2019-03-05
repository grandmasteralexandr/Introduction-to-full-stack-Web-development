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
/* Selectors */
const table = document.querySelector("table");
const selectInput = document.querySelector("select");
const nameInput = document.querySelector("input");
const nameHead = document.querySelector(".name");
const categoryHead = document.querySelector(".category");

const sortList = [
    {
        name: "Name",
        sort: undefined,
        element: nameHead
    },
    {
        name: "Category",
        sort: undefined,
        element: categoryHead
    }
];

/* Event listeners */
document.addEventListener("DOMContentLoaded", () => addTableData(GOODS));
document.addEventListener("DOMContentLoaded", () => addSelectOptions(selectInput, GOODS, "category"));
selectInput.addEventListener("input", filter);
nameInput.addEventListener("input", filter);
nameHead.addEventListener("click", () => changeSort("Name"));
categoryHead.addEventListener("click", () => changeSort("Category"));

/**
 * Fill body of specified table with data from array
 *
 * @param array Array with data to fill table body
 * @param table Table to fill
 */
function addTableData(array = GOODS, table = table) {
    let sum = 0;
    const tbody = table.querySelector("tbody");
    const tfoot = table.querySelector("tfoot");

    /* Delete old table */
    removeAllChild(tbody);
    removeAllChild(tfoot);

    /* Create new table */
    for (let item of array) {
        const tr = document.createElement("tr");
        tr.appendChild(createElement("td", item.category));
        tr.appendChild(createElement("td", item.name));
        tr.appendChild(createElement("td", item.amount));
        tr.appendChild(createElement("td", item.price));
        sum += item.amount * item.price;
        tbody.appendChild(tr);
    }

    const tr = document.createElement("tr");
    tr.appendChild(createElement("th"));
    tr.appendChild(createElement("th"));
    tr.appendChild(createElement("th", "Total:"));
    tr.appendChild(createElement("th", sum.toFixed(2) + "$"));
    tfoot.appendChild(tr);
}

/**
 * Create any HTML element
 *
 * @param tag HTML tag
 * @param value Value of innerHTML
 * @returns {HTMLElement}
 */
function createElement(tag, value = "") {
    const element = document.createElement(tag);
    element.innerHTML = value;
    return element;
}

/**
 * Fill select options with data in array
 *
 * @param select Element of tag select
 * @param array Array of objects
 * @param objectName Name of field in object to be added in select options
 */
function addSelectOptions(select, array, objectName) {
    const uniqueName = [];

    for (let item of array) {
        if (!uniqueName.includes(item[objectName])) {
            uniqueName.push(item[objectName]);
            let option = createElement("option", item[objectName]);
            option.setAttribute("value", item[objectName]);
            select.appendChild(option);
        }
    }
}

/**
 * Remove all child from specified element
 *
 * @param parentElement Element whose children will be deleted
 */
function removeAllChild(parentElement) {
    while (parentElement.firstChild) {
        parentElement.firstChild.remove();
    }
}

/**
 * Filter data in array and add this data in table
 */
function filter() {
    let array = GOODS;
    const category = selectInput.value;
    const name = nameInput.value;

    /* Filter by category */
    if (category !== "") {
        array = GOODS.filter(item => item.category === category);
    }

    /* Filter by name */
    if (name !== "") {
        array = array.filter(item => item.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
    }

    /* Sort */
    for (let sortColumn of sortList) {
        if (sortColumn.sort !== undefined) {

            const sortField = sortColumn.name.toLowerCase();
            array.sort((firstObject, secondObject) => {

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

/**
 * Change column to sort
 *
 * @param columnName Name of column to sort
 */
function changeSort(columnName) {
    for (let item of sortList) {

        if (item.name === columnName) {

            /* Set new sort */
            if (item.sort === undefined) {
                item.sort = true;
            } else {
                item.sort = !item.sort;
            }

            if (item.sort) {
                item.element.innerText = item.name + " ▼";
            } else {
                item.element.innerText = item.name + " ▲";
            }

        } else {
            /* Reset sort in all another field */
            item.sort = undefined;
            item.element.innerText = item.name + " ▼▲";
        }
    }

    filter();
}
