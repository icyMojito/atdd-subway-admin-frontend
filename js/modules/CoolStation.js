const stationList = document.getElementById("station-list");
stationList.addEventListener("click", deleteStation);

const stationAddBtn = document.querySelector("#station-add-btn");
stationAddBtn.addEventListener("click", addStation);

const stationName = document.getElementById("station-name");

function deleteStation(e) {
    const element = e.target;
    if (element.className === "deleteBtn") {
        element.parentElement.parentElement.remove();
    }
}

function addStation(e) {
    e.preventDefault();

    const name = stationName.value;
    const errorMsg = getInvalidNameErrorMsg(name);
    if (errorMsg) {
        alert(errorMsg);
        return;
    }
    stationList.innerHTML += `<div class="nameLine">
<div class="nameBox"> ${name} </div>
<div class="deleteBtnBox">
<button class="deleteBtn">X</button>
</div>
</div>`;
    stationName.value = "";
}

function getInvalidNameErrorMsg(name) {
    if (name === "") {
        return "역 이름을 입력하지 않았습니다!";
    }
    if (hasBlank(name)) {
        return "역 이름에 공백이 포함되어 있습니다!";
    }
    if (hasNumber(name)) {
        return "역 이름에 숫자가 포함되어 있습니다!";
    }
    if (hasDuplication(name)) {
        return "동일한 역이 존재합니다!";
    }
}

function hasBlank(name) {
    return Array.from(name).some(c => c === " ");
}

function hasNumber(name) {
    const isNumber = /[0-9]/g;
    return Array.from(name).some(c => isNumber.test(c));
}

function hasDuplication(name) {
    const names = document.getElementsByClassName("nameBox");
    return Array.from(names)
        .map(nameElement => nameElement.innerText)
        .some(_name => _name === name);
}