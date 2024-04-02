let db = null;

// initialize();

const initialize = (databaseName, keyPath) => {
    let request = window.indexedDB.open(databaseName);

    request.onsuccess = (event) => {
        db = event.target.result;
        loadFromStorage();
    };

    request.onerror = (event) => {
        console.error("Error while opening IndexedDB connection:", event.target.error);
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        db.createObjectStore("Tasks", { keyPath: keyPath});
    };
}

const loadFromStorage = (databaseName,displayLoadedData) => {

    let transaction = db.transaction(databaseName, "readonly");
    let request = transaction.objectStore(databaseName).getAll();

    request.onsuccess =  () => {
        displayLoadedData(request.result);
    };

    request.onerror =  (event) => {
        console.error("Error retrieving data:", event.target.error);
    };
}

const findById = (id, callback, databaseName) => {
    let transaction = db.transaction(databaseName, "readonly");
    let request = transaction.objectStore(databaseName).get(id);

    request.onsuccess =  (event) => {
        let data = event.target.result;
        callback(data);
    };
}

const saveToStorage = (data, callback) => {
    findById(data.id, (datafound) => {

        let transaction = db.transaction(databaseName, "readwrite");
        let request;

        if (datafound == null)
            request = transaction.objectStore(databaseName).add(data);
        else
            request = transaction.objectStore(databaseName).put(data);

        request.onsuccess = () => {
            callback();
        };

        request.onerror =  () => {
            console.error("Error updating task: " + request.error);
        };
    });
}

const deleteFromStorage = (databaseName, data,callback) => {
    let transaction = db.transaction(databaseName, "readwrite");
    let request = transaction.objectStore(databaseName).delete(data.id);

    request.onsuccess = () => {
        callback();
    };

    request.onerror = () => {
        console.error("Error deleting data: " + request.error);
    };
}

module.export (
    initialize,
    deleteFromStorage,
    saveToStorage,
    findById,
    loadFromStorage
)