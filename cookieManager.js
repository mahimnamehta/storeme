const loadFromCookieStore = (preName,displayLoadedData) => {
    let cookies = document.cookie.split("; ");
    cookies.sort();
    if (cookies.length === 0 || cookies[0] === "") {
        return;
    }

    let listOfData = new Array();
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let [cookieName, cookieValue] = cookie.split("=");
        if (cookieName.startsWith(preName)) {
            let cookieValueDecode = decodeURIComponent(cookieValue);
            let task = JSON.parse(cookieValueDecode);
            listOfData.push(task);
        }
    }

    displayLoadedData(listOfData);
}

const saveToCookieStore = (data, callback,expirationTime) => {
    saveCookie(data, expirationTime);
    callback();
}

const saveCookie = (preName,data, expirationTime) => {
    let cookieName = preName + data.id;

    let cookieValue = JSON.stringify(data);
    let cookieValueEncode = encodeURIComponent(cookieValue);

    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationTime);
    let expirationDateUTC = expirationDate.toUTCString();

    let cookieString = cookieName + "=" + cookieValueEncode + "; expires=" + expirationDateUTC;
    document.cookie = cookieString;
}

const deleteFromStorage = (data, callback,expirationTime) => {
    saveCookie(data, expirationTime);
    callback();
}

module.export(
    loadFromCookieStore,
    saveToCookieStore,
    saveCookie,
    deleteFromStorage
)