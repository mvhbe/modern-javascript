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
                {id: 1, name: 'Steak Dinner', calories: 1200},
                {id: 2, name: 'Cookie', calories: 400},
                {id: 3, name: 'Eggs', calories: 300},
            ],
            currentItem: null,
            totalCalories: 0
        };
        return {
            data : function () {
                console.log('>>> data()');
                return data;
            },
            getItems: function () {
                return data.items;
            }
        }
    }
)();

const UIController = (
    function () {
        console.log('>>> UIController()');
        const itemsList = document.querySelector('#item-list');

        function createItemList(item) {
            return `
                <li><strong>${item.name}</strong></li>
            `;
        }

        function populateItemsList(items) {
            let html = '';
            items.forEach((item) => html += createItemList(item));
            itemsList.innerHTML = html;
        }

        return {
            populateItemsList: function (items) {
                populateItemsList(items);
            }
        }
    }
)();

const AppController = (
    function (itemController, uiController) {
        console.log('>>> AppController()');
        return {
            initialize: function () {
                console.log('>>> initialize()');
                uiController.populateItemsList(itemController.getItems());
            }
        }
    }
)(ItemController, UIController);

AppController.initialize();