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
        price: 2
    },
    {
        category: 'Other',
        name: 'Trash Bin',
        amount: 1,
        price: 5
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

document.addEventListener("DOMContentLoaded", addTableData);

function addTableData() {
    let sum = 0;
    let table = document.querySelector("tbody");
    let tfoot = document.querySelector("tfoot");

    for (let item of GOODS) {
        let tr = document.createElement("tr");
        tr.appendChild(createElement("td", item.category));
        tr.appendChild(createElement("td", item.name));
        tr.appendChild(createElement("td", item.amount));
        tr.appendChild(createElement("td", item.price));
        sum += item.amount * item.price;
        table.appendChild(tr);
    }

    let tr = document.createElement("tr");
    tr.appendChild(createElement("th", ""));
    tr.appendChild(createElement("th", ""));
    tr.appendChild(createElement("th", "Total:"));
    tr.appendChild(createElement("th", sum + "$"));
    tfoot.appendChild(tr);

    function createElement(tag, value) {
        let element = document.createElement(tag);
        element.innerHTML = value;
        return element;
    }
}
