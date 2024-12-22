let people = []; //[name, moneyTotal]
let peopleCount = 0;
let items = []; //[name, price, [buyers]]
let itemsCount = 0;


function addPerson(name, money) {
    people.push([name, money]);
    peopleCount++;
    console.log(people);
    updateTable();
}

function addItem(name, price, buyers) {
    items.push([name, price, buyers]);
    itemsCount++;
    console.log(items);
    updateTable();
}

function updateTable() {
    const table = document.getElementById("table");
    let tableHTML =
        `<table>
            <tr>
                <th>Name</th>
                <th>Price</th>`;

    for (let i = 0; i < peopleCount; i++) {
        tableHTML += `<th>${people[i][0]}</th>`;
    }

    tableHTML += "<th>Per Person</th>";
    tableHTML += "</tr>";

    for (let i = 0; i < itemsCount; i++) {
        tableHTML += `<tr>
            <td>${items[i][0]}</td>
            <td>${items[i][1]}</td>`;

        // Updated button logic: use "Buy" or "Unbuy" as button text instead of 0/1
        for (let j = 0; j < peopleCount; j++) {
            const hasBought = items[i][2].includes(j);
            const buttonText = hasBought ? "Unbuy" : "Buy";
            tableHTML += `<td><button id="${i}-${j}" onclick="buy(${i}, ${j})">${buttonText}</button></td>`;
        }

        // Handle division by zero for "Per Person"
        const perPerson = items[i][2].length > 0 ? (items[i][1] / items[i][2].length).toFixed(2) : "N/A";
        tableHTML += `<td>${perPerson}</td>`;
        tableHTML += "</tr>";
    }

    // Calculate total money spent by each person
    tableHTML += `<tr>
        <td>Total</td>
        <td></td>`;
    for (let i = 0; i < peopleCount; i++) {
        let totalMoney = 0;
        for (let j = 0; j < itemsCount; j++) {
            if (items[j][2].includes(i)) {
                totalMoney += items[j][1] / items[j][2].length;
            }
        }
        tableHTML += `<td>${totalMoney.toFixed(2)}</td>`; // Ensure monetary values are consistently formatted
    }
    tableHTML += "</tr>";
    tableHTML += "</table>";
    table.innerHTML = tableHTML;
}

function buy(item, person) {
    const hasBought = items[item][2].includes(person); // Check if the person has already bought the item
    if (!hasBought) {
        console.log(item, person, "buy");
        items[item][2].push(person); // Add person to buyers list
    } else {
        console.log(item, person, "unbuy");
        items[item][2].splice(items[item][2].indexOf(person), 1); // Remove person from buyers list
    }
    updateTable();
    console.log(items);
    console.log(people);
}

addPerson("John", 0);
addPerson("Jane", 0);
addPerson("Bro", 0);
addItem("Milk", 100, []);
addItem("Bread", 235, []);
