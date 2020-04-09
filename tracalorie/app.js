const StorageController = (
    function () {
        function getItemsFromLocalStorage() {
            let items = JSON.parse(localStorage.getItem('items'));
            if (items === null) {
                items = [];
            }
            return items;
        }

        return {
            getItems:
                function () {
                    return getItemsFromLocalStorage();
                }

        }
    }
)();

const ItemController = (
    function () {
        console.log('>>> ItemController()');
        const Item = function(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        };
        const data = {
            items: [
                // {id: 1, name: 'Steak Dinner', calories: 1200},
                // {id: 2, name: 'Cookie', calories: 400},
                // {id: 3, name: 'Eggs', calories: 300},
            ],
            currentItem: null,
            totalCalories: 0
        };
        let nextId = data.items.length + 1;

        function setCurrentItem(itemId) {
            data.currentItem =  data.items.filter( item => item.id === itemId)[0];
            console.log(`currentItem (${itemId} = ${JSON.stringify(data.currentItem)}`);
        }

        function updateTotalCalories(oldCalories, newCalories) {
            data.totalCalories -= oldCalories;
            data.totalCalories += newCalories;
        }

        function updateItems() {
            let itemIndex;
            data.items.forEach(
                function (item, index) {
                    if (item.id === data.currentItem.id) {
                        itemIndex = index;
                    }
                }
            );
            data.items[itemIndex] = data.currentItem;
        }

        function updateCurrentItem(name, calories) {
            const newCalories = parseInt(calories);
            const oldCalories = data.currentItem.calories;
            updateTotalCalories(oldCalories, newCalories);
            data.currentItem.name = name;
            data.currentItem.calories = newCalories;
            updateItems();
        }

        function deleteCurrentItem() {
            console.log(`deleteCurrentItem()`);
            data.items = data.items.filter( item => item.id !== data.currentItem.id);
            console.log(`data.items = ${JSON.stringify(data.items)}`);
            updateTotalCalories(data.currentItem.calories, 0);
            data.currentItem = null;
        }

        return {
            data :
                function () {
                    console.log('>>> data()');
                    return data;
                },
            getItems:
                function () {
                    return data.items;
                },
            getTotalCalories:
                function () {
                    return data.totalCalories;
                },
            addItem:
                function (name, calories) {
                    const newItem = new Item(nextId++, name, parseInt(calories));
                    data.items.push(newItem);
                    data.totalCalories += newItem.calories;
                    return newItem;
                },
            clearItems:
                function () {
                    data.items = [];
                    data.totalCalories = 0;
                    nextId = 1;
                },
            setCurrentItem:
                function (itemId) {
                    setCurrentItem(parseInt(itemId));
                    return data.currentItem;
                },
            getCurrentItem:
                function () {
                    return data.currentItem;
                },
            updateCurrentItem:
                function (name, calories) {
                    updateCurrentItem(name, calories);
                    return data.currentItem;
                },
            deleteCurrentItem:
                function () {
                    deleteCurrentItem();
                }
        }
    }
)();

const UIController = (
    function () {
        console.log('>>> UIController()');
        const selectors = {
            clearButton: ".clear-btn",
            itemName: "#item-name",
            itemCalories: "#item-calories",
            addButton: ".add-btn",
            updateButton: ".update-btn",
            deleteButton: ".delete-btn",
            backButton: ".back-btn",
            totalCalories: ".total-calories",
            itemList: "#item-list",
        };
        const clearButton = document.querySelector(selectors.clearButton);
        const itemName = document.querySelector(selectors.itemName);
        const itemCalories = document.querySelector(selectors.itemCalories);
        const addButton = document.querySelector(selectors.addButton);
        const updateButton = document.querySelector(selectors.updateButton);
        const deleteButton = document.querySelector(selectors.deleteButton);
        const backButton = document.querySelector(selectors.backButton);
        const totalCalories = document.querySelector(selectors.totalCalories);
        const itemsList = document.querySelector(selectors.itemList);

        function createHtmlForItemList(item) {
            return `
            <li class="collection-item" id="item-${item.id}">
              <strong>${item.name} : </strong> <em>${item.calories} Calories</em>
              <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
              </a>
            </li>
            `;
        }

        function hideItemsList() {
            itemsList.style.display = 'none';
        }

        function showItemsList() {
            itemsList.style.display = 'block';
        }

        function populateItemsList(items) {
            if (items.length === 0) {
                hideItemsList();
            } else {
                showItemsList();
                let html = '';
                items.forEach(
                    (item) => html += createHtmlForItemList(item)
                );
                itemsList.innerHTML = html;
            }
            totalCalories.textContent = ItemController.getTotalCalories();
        }

        function isItemNameValid() {
            return itemName.value !== '';
        }

        function isItemCaloriesValid() {
            return itemCalories.value !== '';
        }

        function isInputValid() {
            return isItemNameValid() && isItemCaloriesValid();
        }

        function addToItemsList(item) {
            showItemsList();
            itemsList.innerHTML += createHtmlForItemList(item);
            totalCalories.textContent = ItemController.getTotalCalories();
        }

        function clearInputFields() {
            itemName.value = '';
            itemCalories.value = '';
        }

        function addItem(event) {
            console.log('>>> addItem()');
            if (isInputValid()) {
                addToItemsList(ItemController.addItem(itemName.value, itemCalories.value));
                clearInputFields();
            }
            event.preventDefault();
        }

        function clearItemsList() {
            ItemController.clearItems();
            itemsList.innerHTML = '';
            totalCalories.textContent = ItemController.getTotalCalories();
            hideItemsList();
        }

        function updateIconClicked(event) {
            return event.target.className === 'edit-item fa fa-pencil';
        }

        function fillInputFields(item) {
            console.log(`item = ${JSON.stringify(item)}`);
            itemName.value = item.name;
            itemCalories.value = item.calories;
        }

        function updateOrDeleteItem(event) {
            console.log(`target.classname = ${event.target.className})`);
            if (updateIconClicked(event)) {
                const itemId = event.target.parentElement.parentElement.id.replace('item-', '',);
                const item = ItemController.setCurrentItem(itemId);
                fillInputFields(item);
                enableEditingAndDeleting();
            }
            event.preventDefault()
        }

        function inputChanged() {
            const currentItem = ItemController.getCurrentItem();
            return itemName.value !== currentItem.name || parseInt(itemCalories.value) !== currentItem.calories;
        }

        function createItemList(item) {
            const itemList = document.createElement('LI');
            itemList.className = 'collection-item';
            itemList.id = `item-${item.id}`;
            itemList.innerHTML = `
              <strong>${item.name} : </strong> <em>${item.calories} Calories</em>
              <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
              </a>
            `;
            return itemList;
        }

        function updateItemInList(item) {
            const itemList = document.querySelector(`#item-${item.id}`);
            const newItemList = createItemList(item);
            itemsList.replaceChild(newItemList, itemList);
        }

        function updateItem(event) {
            if (inputChanged()) {
                const currentItem =  ItemController.updateCurrentItem(itemName.value, itemCalories.value);
                updateItemInList(currentItem);
                totalCalories.textContent = ItemController.getTotalCalories();
                enableAdding();
            }
            event.preventDefault();
        }

        function removeItemFromItemsList(id) {
            const itemList = document.querySelector(`#item-${id}`);
            itemList.remove();
        }

        function deleteItem(event) {
            console.log(`deleteItem() : target.classname = ${event.target.className})`);
            const item = ItemController.getCurrentItem();
            ItemController.deleteCurrentItem();
            removeItemFromItemsList(item.id);
            if (itemsList.childElementCount === 0) {
                hideItemsList();
            }
            totalCalories.textContent = ItemController.getTotalCalories();
            clearInputFields(item);
            enableAdding();
            event.preventDefault();
        }

        function disableSubmintOnEnter(event) {
            if (event.keyCode === 13 || event.which === 13) {
                event.preventDefault();
                return false;
            }
        }

        function setUpEventListeners() {
            clearButton.addEventListener('click', clearItemsList);
            addButton.addEventListener('click', addItem);
            updateButton.addEventListener('click', updateItem);
            deleteButton.addEventListener('click', deleteItem);
            backButton.addEventListener('click', () => enableAdding());
            itemsList.addEventListener('click', updateOrDeleteItem);
            document.addEventListener('keypress', disableSubmintOnEnter);
        }

        function enableEditingAndDeleting() {
            updateButton.style.display = 'inline';
            deleteButton.style.display = 'inline';
            backButton.style.display = 'inline';
            addButton.style.display = 'none';
        }

        function enableAdding() {
            clearInputFields();
            updateButton.style.display = 'none';
            deleteButton.style.display = 'none';
            backButton.style.display = 'none';
            addButton.style.display = 'inline';
        }

        return {
            initialize:
                function () {
                    setUpEventListeners();
                    populateItemsList(ItemController.getItems());
                    enableAdding();
                }
        };
    }
)();

const AppController = (
    function (itemController, uiController) {
        console.log('>>> AppController()');
        return {
            initialize: function () {
                console.log('>>> initialize()');
                uiController.initialize();
            }
        }
    }
)(ItemController, UIController);

AppController.initialize();