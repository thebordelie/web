function checkY() {
    let valY = $('#input-Y').val();
    valY = (Number(valY)).toFixed(10);
    if (valY >= -5 && valY <= 5 && valY != '') {
        return true;
    } else {
        return false;
    }
}

function checkR() {
    if ($('#input-R option:selected').length > 0 && $('#input-R option:selected').val() != "0") {
        return true;
    } else {
        return false;
    }
}

function checkX() {
    if ($(".input-X:checked").length > 0) {
        return true;
    } else {
        return false;
    }
}

function validateVar() {
    return checkY() && checkR() && checkX();
}


let count = 1
const form = document.querySelector('#js-form');
form.onsubmit = function (event) {
    event.preventDefault();
    if (!validateVar()) {
        let response = '';
        if (!checkX()) {
            response += "Не выбран X, ";
        }
        if (!checkY()) {
            response += "Неправильно ввёден Y, ";
        }
        if (!checkR()) {
            response += "Не выбран R";
        }
        alert(response);
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/php/main.php', false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhr.send('countValues=' + count + "&" + $('#js-form').serialize() + "&time=" + new Date().toLocaleTimeString());
    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        createNewRow(xhr.responseText);
    }

}

function createNewRow(response) {
    let tableRef = document.getElementById("table");
    let row = document.createElement("tr");
    row.setAttribute('class', 'infoOfRequest table1');
    row.setAttribute("align", "center");
    tableRef.append(row);
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.innerHTML = count;
    count += 1;
    td3.innerHTML = new Date().toLocaleTimeString();
    td2.innerHTML = $('.input-X:checked').val() + " " + $('#input-Y').val() + " " + $('#input-R option:selected').val();
    td4.innerHTML = response + " секунд";
    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
}

window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/php/data.php', false);
    xhr.send();
    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        let arrayOfValues = xhr.responseText;
        arrayOfValues = arrayOfValues.split(' ');
        for (let i = 0; i < arrayOfValues.length - 1;) {
            loadValuesAtSession(arrayOfValues[i + 1], arrayOfValues[i + 2], arrayOfValues[i + 3],arrayOfValues[i + 4],arrayOfValues[i] +" "+ arrayOfValues[i + 5]);
            i += 6;
        }
    }
}

function loadValuesAtSession( x, y, r, time, validate) {
    let tableRef = document.getElementById("table");
    let row = document.createElement("tr");
    row.setAttribute('class', 'infoOfRequest table1');
    row.setAttribute("align", "center");
    tableRef.append(row);
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.innerHTML = count;
    count += 1;
    td3.innerHTML = time;
    td2.innerHTML = x + " " + y + " " + r;
    td4.innerHTML = validate + " секунд";
    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);

}