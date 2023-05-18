//PARENT CLASS
class Employee {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
}

//CHILD CLASSES
class Staff extends Employee {
    constructor(name, surname, picture, email) {
        super(name, surname);
        this.picture = picture;
        this.email = email;
        this.status = "In";
        this.outTime = "";
        this.duration = "";
        this.expectedReturnTime = "";
    }
    staffMemberIsLate(){}
}

class DeliveryDriver extends Employee {
    constructor(name, surname, vehicle, telephone, address, returnTime) {
        super(name, surname);
        this.vehicle = vehicle;
        this.telephone = telephone;
        this.address = address;
        this.returnTime = returnTime;
    }
    deliveryDriverIsLate(){}
}

const staffList = [];
const driverList = [];


//POPULATE STAFF TABLE
window.onload = () => {
    staffUserGet()
};

function staffUserGet() {
    fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(data => {
        const staffMembers = data.results;
        staffMembers.forEach(staffMember => {
            const name = staffMember.name.first;
            const surname = staffMember.name.last;
            const picture = staffMember.picture.thumbnail;
            const email = staffMember.email;
            staffList.push(new Staff(name, surname, picture, email));
        });
        const tableBody = document.querySelector('#staffTable tbody');
        staffList.forEach((staffMember, index) => {
            const row = document.createElement('tr');
            const id = index;
            row.addEventListener('click', rowSelected);
            row.id = `row${id}`;
            row.innerHTML =
            `<td><img src="${staffMember.picture}"></td>
            <td>${staffMember.name}</td>
            <td>${staffMember.surname}</td>
            <td>${staffMember.email}</td>
            <td>${staffMember.status}</td>
            <td>${staffMember.outTime}</td>
            <td></td>
            <td>${staffMember.expectedReturnTime}</td>`;
            tableBody.appendChild(row);
        });
        console.log(staffList);
    })
    .catch(error => console.log(error));
}


//CHECK STAFF OUT
function staffOut() {
    const selectedRow = document.querySelector("#staffTable tbody tr.selected");
    if (selectedRow) {
        var minutes = prompt("Enter minutes away:");
        if (isNaN(minutes) || minutes <= 0) {
            alert("Please enter a valid number.");
        } else {
            var now = new Date();
            var returnTime = new Date(now.getTime() + minutes * 60 * 1000);

            var returnTimeString;
            if (minutes > 60) {
                var hours = Math.floor(minutes / 60);
                var remainingMinutes = minutes % 60;
                returnTimeString = `${hours}hrs ${remainingMinutes}min`;
            } else if (minutes === '60') {
                returnTimeString = '1hr';
            } else {
                returnTimeString = `${minutes}min`;
            }

            var staffMember = staffList[selectedRow.id.slice(3)];
            staffMember.status = "Out";
            staffMember.outTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            staffMember.duration = returnTimeString;
            staffMember.expectedReturnTime = returnTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            
            selectedRow.cells[4].innerHTML = staffMember.status;
            selectedRow.cells[5].innerHTML = staffMember.outTime;
            selectedRow.cells[6].innerHTML = staffMember.duration;
            selectedRow.cells[7].innerHTML = staffMember.expectedReturnTime;
        }
    } else {
        alert("Please select an employee from the staff table.");
    }

    const selectedRows = document.querySelectorAll('.selected');
    selectedRows.forEach(row => {
        row.classList.remove('selected');
    });

    console.log(staffList);
}


//CHECK STAFF IN
function staffIn() {
    const selectedRow = document.querySelector("#staffTable tbody tr.selected");
    if (selectedRow) {
        var staffMember = staffList[selectedRow.id.slice(3)];

        staffMember.status = "In";
        staffMember.outTime = "";
        staffMember.duration = "";
        staffMember.expectedReturnTime = "";

        selectedRow.cells[4].innerHTML = staffMember.status;
        selectedRow.cells[5].innerHTML = staffMember.outTime;
        selectedRow.cells[6].innerHTML = staffMember.duration;
        selectedRow.cells[7].innerHTML = staffMember.expectedReturnTime;
    } else {
        alert("Please select an employee from the staff table.")
    }
    const selectedRows = document.querySelectorAll('.selected');
    selectedRows.forEach(row => {
        row.classList.remove('selected');
    });
    console.log(staffList);
}


//VALIDATE DRIVERS
function validateDelivery() {
    const vehicle = document.querySelector('input[name="delVehicle"]:checked');
    const name = document.getElementById('delName').value;
    const surname = document.getElementById('delSurname').value;
    const telephone = document.getElementById('delPhone').value;
    const address = document.getElementById('delAddress').value;
    const returnTime = document.getElementById('delReturnTime').value;

    if (!name || !surname || !telephone || !address || !returnTime) {
        alert("Please fill out all fields.");
        return false;
    }

    if (!vehicle) {
        alert("Please select a vehicle.");
        return false;
    }

    const vehicleValue = vehicle.value;

    const correctName = /^[a-zA-ZæøåÆØÅ\s ]/;       //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
    if (!name.match(correctName) || !surname.match(correctName)) {
        alert("Please enter a valid name (can only contain letters (and hyphen)).");
        return false;
    }

    const correctPhone = /^\d{8,}/;             //Learned from codesnippet: /\d{8,}/ from https://stackoverflow.com/questions/5416250/regex-contains-at-least-8-decimal-digitshttps://stackoverflow.com/questions/5416250/regex-contains-at-least-8-decimal-digits
    if (!telephone.match(correctPhone)) {
        alert("Phone number must be at least 8 digits.");
        return false;
    }

    const correctAddress = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9\s]*$/;        //Learned about ? and * at https://docs.netapp.com/us-en/oncommand-insight/config-admin/regular-expression-examples.html#example-6-showing-computer-names-with-a-pattern
    if (!address.match(correctAddress)) {
        alert("Please enter a valid address (must contain street name and house number.");
        return false;
    }

    const existingDriver = driverList.find(
        (driver) => driver.name === name && driver.surname === surname
    );
    if (existingDriver) {
        alert("Driver is already out for delivery.");
        return;
    }

    driverList.push(new DeliveryDriver(name, surname, vehicleValue, telephone, address, returnTime));
    return true;
}


//ADD DRIVER TO DELIVERY BOARD
function addDelivery() {
    if(!validateDelivery()) {
        return;
    }

    const deliveryBoardTable = document.querySelector('#deliveryBoard tbody');
    deliveryBoardTable.innerHTML = '';      //To prevent dublication of the previously added driver.

    driverList.forEach((driver, index) => {
        const newRow = document.createElement('tr');
        const id = index;
        newRow.id = `newRow${id}`;
        newRow.addEventListener('click', rowSelected);

        let vehicleIcon;
        if (driver.vehicle === 'Motorcycle') {
            vehicleIcon = '<i class="fa fa-motorcycle" id="bikeIcon"></i>';
        } else if (driver.vehicle === 'Car') {
            vehicleIcon = '<i class="bi bi-car-front-fill" id="carIcon"></i>';
        }

        newRow.innerHTML =
        `<td>${vehicleIcon}</td>
        <td>${driver.name}</td>
        <td>${driver.surname}</td>
        <td>${driver.telephone}</td>
        <td>${driver.address}</td>
        <td>${driver.returnTime}</td>`;
        deliveryBoardTable.appendChild(newRow);
    })
    const selectedRows = document.querySelectorAll('.selected');
    selectedRows.forEach(row => {
        row.classList.remove('selected');
    });
    console.log(driverList);

    const vehicleRadio = document.querySelectorAll('input[name="delVehicle"]');
    vehicleRadio.forEach(radio => radio.checked = false);
    document.getElementById('delName').value = '';
    document.getElementById('delSurname').value = '';
    document.getElementById('delPhone').value = '';
    document.getElementById('delAddress').value = '';
    document.getElementById('delReturnTime').value = '';
};


//CLEAR DRIVER FROM BOARD
function removeDriver() {
    const selectedRow = document.querySelector("#deliveryBoard tbody tr.selected");

    if (!selectedRow) {
        const selectedStaffRow = document.querySelector("#staffTable tbody tr.selected");
        if (selectedStaffRow) {
            alert("Please select an employee from the Delivery Board.");
        } else {
            alert("Please select an employee Delivery Board and then click 'Clear'.");
        }
        return;
    }

    if (!confirm("Are you sure?")) {
        return;
    }

    const rowIndex = parseInt(selectedRow.dataset.index);   //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    driverList.splice(rowIndex, 1);                         //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

    selectedRow.remove();
    const remainingRows = document.querySelectorAll("#deliveryBoard tbody tr");
    remainingRows.forEach((row, index) => {
        row.id = `newRow${index}`;
        row.dataset.index = index;
    });

    const selectedRows = document.querySelectorAll('.selected');
    selectedRows.forEach(row => {
        row.classList.remove('selected');
    });
}


//SELECT ROW
var selectedRows = [];
function rowSelected() {
    var clickedRow = this;
    var selectedRows = document.querySelectorAll('.selected');

    if (clickedRow.classList.contains('selected')) {
        clickedRow.classList.remove('selected');
        selectedRow = null;
    } else {
        selectedRows.forEach((row) => {
            row.classList.remove('selected');
        });
        clickedRow.classList.add('selected');
        selectedRow = clickedRow;
    }
}


//TOASTS
function staffMemberIsLate() {
    staffList.forEach((staffMember, index) => {
        const row = document.getElementById(`row${index}`);
        const duration = row.cells[6].innerHTML;
        const expectedReturnTimeValue = row.cells[7].innerHTML;
        const returnTime = new Date();
        const [hours, minutes] = expectedReturnTimeValue.split(":");    //https://www.tabnine.com/code/javascript/functions/builtins/setHours - Code snippet (from a larger function): const ... = schedule.map(time => { const [hour, minute] = time.split(:); const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);...}
        returnTime.setHours(hours);
        returnTime.setMinutes(minutes);

        if (returnTime < new Date()) {
            const toastContent = document.createElement('div');
            toastContent.className = 'toast-body';

            const imgSrc = row.cells[0].getElementsByTagName('img')[0].src;
            const imgLine = `<div><img src="${imgSrc}" class="toast-img"></div>`;
            toastContent.innerHTML += imgLine;

            const nameLine = `<div>${row.cells[1].innerHTML} ${row.cells[2].innerHTML} is late!</div>`;
            toastContent.innerHTML += nameLine;

            const durationLine = `<div>Out of office: ${duration}</div>`;
            toastContent.innerHTML += durationLine;

            $("#staffLate .toast-body").remove();
            $("#staffLate").append(toastContent);
            $("#staffLate").toast("show");
        }
    });
} setInterval(staffMemberIsLate, 5000);

function deliveryDriverIsLate() {
    driverList.forEach((deliveryDriver, index) => {
        const newRow = document.getElementById(`newRow${index}`);

        const telephone = newRow.cells[3].innerHTML;
        const address = newRow.cells[4].innerHTML;
        const returnTimeValue = newRow.cells[5].innerHTML;
        const returnTime = new Date();
        const [hours, minutes] = returnTimeValue.split(":");
        returnTime.setHours(hours);
        returnTime.setMinutes(minutes);

        if (returnTime < new Date()) {
            const toastContent = document.createElement('div');
            toastContent.className = 'toast-body';

            const nameLine = `<div>${newRow.cells[1].innerHTML} ${newRow.cells[2].innerHTML} is late!</div>`;
            toastContent.innerHTML += nameLine;

            const phoneLine = `<div>Telephone: ${telephone}</div>`;
            toastContent.innerHTML += phoneLine;

            const returnTimeLine = `<div>Return time: ${returnTimeValue}</div>`;
            toastContent.innerHTML += returnTimeLine;

            const addressLine = `<div>Delivery address: ${address}</div>`;
            toastContent.innerHTML += addressLine;

            $("#driverLate .toast-body").remove();
            $("#driverLate").append(toastContent);
            $("#driverLate").toast("show");
        }
    });
} setInterval(deliveryDriverIsLate, 5000);


//DIGITAL CLOCK
function digitalClock() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();
    let hh = date.getHours();
    let m = date.getMinutes();
    let ss = date.getSeconds();

    dd = (dd < 10) ? '0' + dd : dd;
    mm = (mm < 10) ? '0' + mm : mm;
    hh = (hh < 10) ? '0' + hh : hh;
    m = (m < 10) ? '0' + m : m;
    ss = (ss < 10) ? '0' + ss : ss;

    let time = `${dd}-${mm}-${yy} ${hh}:${m}:${ss}`;

    document.getElementById('clock').innerHTML = time;
} setInterval(digitalClock, 1000);

/*Inspirational code snippet from https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript 
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
console.log(dateToYMD(new Date(2017,10,5))); // Nov 5*/