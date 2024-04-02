const loadFromLocalStorage = (dataKey,displayLoadedData) => {
    let listOfData = new Array();

    let allKeys = Object.keys(localStorage);
    allKeys.sort();

    for (let i = 0; i < allKeys.length; i++) {
        let key = allKeys[i];
        if (key.startsWith(dataKey)) {
            let value = localStorage.getItem(key);
            let task = JSON.parse(value);
            listOfData.push(task);
        }
    }

    displayLoadedData(listOfData);
}

const saveToLocalStorage = (dataKey, data, callback) => {
    let key = dataKey + data.id;
    let value = JSON.stringify(data);
    localStorage.setItem(key, value);
    callback();
}

const deleteFromLocalStorage = (data, callback) => {
    let key = dataKey + data.id;
    localStorage.removeItem(key);
    callback();
}

module.export(
    loadFromLocalStorage,
    saveToLocalStorage,
    deleteFromLocalStorage
)