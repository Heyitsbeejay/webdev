//Event handler//
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('toDoForm');
    const toDoList = document.getElementById('toDoList');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemInput = document.getElementById('item');
        const quantityInput = document.getElementById('quantity');
        const itemValue = itemInput.value;
        const quantityValue = quantityInput.value;

        if (itemValue.trim() !== '' && quantityValue.trim() !== '' && !isNaN(quantityValue)) {
            addItem(itemValue, quantityValue);
            itemInput.value = '';
            quantityInput.value = '';
        }
    });   

    //Function for add item with edit and delete buttons//
    function addItem(item, quantity) {
        const row = document.createElement('tr');
    
        const itemCell = document.createElement('td');
        itemCell.textContent = item;
    
        const quantityCell = document.createElement('td');
        quantityCell.textContent = quantity;
    
        const actionsCell = document.createElement('td');
    
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-outline-secondary', 'mr-2');
        editButton.addEventListener('click', function () {
            editItem(item, quantity, row);
        });
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-outline-success', 'mx-2');
        deleteButton.addEventListener('click', function () {
            deleteItem(row);
        });
    
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    
        row.appendChild(itemCell);
        row.appendChild(quantityCell);
        row.appendChild(actionsCell);
    
        toDoList.appendChild(row);
        saveItems();
    }

    //edit item//
    function editItem(item, quantity, row) {
        const itemCell = row.querySelector('td:first-child');
        const quantityCell = row.querySelector('td:nth-child(2)');
        const newItem = prompt('Enter the new item:', itemCell.textContent);
        const newQuantity = prompt('Enter the new quantity:', quantityCell.textContent);
    
        if (newItem !== null && newQuantity.trim() !== '' && !isNaN(newQuantity)) {
            itemCell.textContent = newItem;
            quantityCell.textContent = newQuantity;
            saveItems();
        }
    }

    //delete item//
    function deleteItem(row) {
        if (confirm('Are you sure you want to delete this item as done?')) {
            row.remove();
            saveItems();
        }
    }

    //save item with the use of local storage//
    function saveItems() {
        const items = [];
        const rows = toDoList.querySelectorAll('tr');

        rows.forEach(function (row) {
            const item = row.querySelector('td:first-child').textContent;
            items.push(item);
        });

        localStorage.setItem('toDoItems', JSON.stringify(items));
    }

    //display the saved item//
    function loadItems() {
        const storedItems = localStorage.getItem('toDoItems');

        if (storedItems) {
            const items = JSON.parse(storedItems);

            items.forEach(function (item) {
                addItem(item);
            });
        }
    }

    loadItems();
});
