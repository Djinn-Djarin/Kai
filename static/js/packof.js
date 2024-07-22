let gettdval = [];
let colorsdata = [];
let filteredArraydata = [];
let duplicatepackofarray = [];
let getfinalobj = [];
let objKeysarr = [];
let trueValueArray = [];
let totalvalueArray = [];
let outsideflatedarray = [];
let gettext = document.querySelectorAll('td');
let showvalueontop = document.getElementById('showvalueontop')
Array.from(gettext).forEach((item) => {
  item.addEventListener('mouseover', () => {
    let getData = item.textContent;
    let sumrisedata = getData.replace(/\s+/g, ' ').trim()
    showvalueontop.value = sumrisedata;
  })
})

function generateCells() {
  // Get the input values
  const packof = document.getElementById('packof').value;
  const color = document.getElementById('color').value;
  // Split the packof input into an array
  const packofArray = packof.split(',');
  let colors = color.split(' ');
  duplicatepackofarray.push(...packofArray)


  // Get the table element
  const table = document.getElementById('mainTable');

  // Clear the table content
  table.innerHTML = '';

  // Create the table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Number', ...colors];
  console.log(colors, "colors.....");
  colorsdata.push(...colors);
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const getLenght = headers.length - 1;

  // Create the table body
  const tbody = document.createElement('tbody');
  packofArray.forEach((item) => {
    const row1 = document.createElement('tr');
    row1.innerHTML = `
            <td>${item}</td>
        `;
    tbody.appendChild(row1);
    // tbody.appendChild(row2);

    for (let i = 0; i < getLenght; i++) {
      const inputcell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'getidvalue';
      inputcell.appendChild(input);
      row1.appendChild(inputcell);
      gettdval.push(inputcell.textContent);
    }
    tbody.appendChild(row1);
  });
  table.appendChild(tbody);
  document.getElementById('Sendjsondata').style.display = 'block'


}


// add new javascript file

document.getElementById('Sendjsondata').addEventListener('submit', () => {
  let rightsidecontainer = document.querySelector('.rightsidecontainer');
  rightsidecontainer.style.display = 'block'
  let getdataval = document.querySelectorAll('.getidvalue');
  let gettdval = [];
  let filteredArraydata = [];

  Array.from(getdataval).forEach((item) => {
    gettdval.push(item.value);
  });

  let filteredArray = gettdval.filter(item => item.trim() !== '');
  filteredArraydata.push(...filteredArray);

  const funcalling = divideArray(filteredArraydata, colorsdata.length);
  const getcolorarraylenght = colorsdata.length;
  const getlastarray = funcalling.splice(-getcolorarraylenght);
  let resultArray = [];
  duplicatepackofarray.forEach((item, i) => {
    if (getlastarray[i]) {
      let obj = {};
      obj[item] = getlastarray[i];
      resultArray.push(obj);
    }
  });
  let formdata = new FormData();
  formdata.append('jsondata', resultArray);
  console.log(resultArray, "getfinalobj");
  resultArray.map((item) => {
    console.log(item, "itemmm...");
    console.log(Object.keys(item));
    const objKeys = Object.keys(item)
    let getObjValues = Object.values(item);
    console.log(getObjValues, "getObjvalues");
    getObjValues.map(innerArray => {
      let innerarrr = innerArray.map(Number);
      console.log(innerarrr);
      let totalval = innerarrr.reduce((accumulator, currentValue) => accumulator + currentValue);
      console.log(totalval, "total");
      console.log(objKeys);
      let objKeysData = objKeys.map(Number);
      objKeysarr.push(objKeysData);
      console.log(objKeysarr, "objKeysArr");
      let flatedarr = objKeysarr.flat();
      console.log(flatedarr, "flatedarr");
      totalvalueArray.push(totalval);
      flatedarr.map((item) => {
        outsideflatedarray.push(item)
        console.log(totalval, ":totalval");
        if (item === totalval) {
          console.log(true);
          trueValueArray.push(true);

        } else {
          console.log(false);
          trueValueArray.push(false);
        }
      })

    });

  })

  console.log(trueValueArray, "truevalueArray");
  console.log(totalvalueArray, "totalvalueArray");
  console.log(outsideflatedarray, "flatedarr");
  let newoutsideflatedarray = outsideflatedarray.slice(colorsdata.length);
  console.log(newoutsideflatedarray, "newoutsideflatedarray");


  if (newoutsideflatedarray.length !== totalvalueArray.length) {
    throw new Error('Arrays are not of the same length');
  }

  for (let i = 0; i < newoutsideflatedarray.length; i++) {
    if (newoutsideflatedarray[i] !== totalvalueArray[i]) {
      // throw new Error(`Arrays do not match at index ${i}`);
      alert('someting went rong')
    }
  }





});

function divideArray(arr, n) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}











function uploadfile() {
  document.getElementById('upload-button').addEventListener('click', function () {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];

    if (file) {
      let formData = new FormData();
      formData.append('file', file);

      fetch('/uploadfile', { // corrected typo in the URL as well
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      alert("Please select a file first.");
    }
  });
}


// *********************************************************************************************



document.addEventListener("DOMContentLoaded", function () {
  const jsonData = JSON.parse('{{ df_json|escapejs }}');

  if (jsonData.length > 0) {
    createTableHeaders(jsonData);
    displayRecords(jsonData);
    addDropdownToAllRows(); // Call function to add dropdowns after displaying records
  } else {
    console.log("No data to display");
  }

  let gettext = document.querySelectorAll('td');
  let showvalueontop = document.getElementById('showvalueontop')
  Array.from(gettext).forEach((item) => {
    item.addEventListener('mouseover', () => {
      let getData = item.textContent;
      let sumrisedata = getData.replace(/\s+/g, ' ').trim()
      showvalueontop.value = sumrisedata;
    })
  })
});


// ****************************************************************************************

let rowCount = 0;


document.addEventListener('DOMContentLoaded', (event) => {
  // Add 5 rows by default
  for (let i = 0; i < 5; i++) {
    addRow();
  }
});

function addRow() {
  rowCount++;
  const tableBody = document.getElementById('table-body');
  const row = document.createElement('tr');
  row.innerHTML = `
          <td><input type="number" name="pack${rowCount}" value="${rowCount}"></td>
          <td><input type="number" name="color1_${rowCount}" value="0"></td>
          <td><input type="number" name="color2_${rowCount}" value="0"></td>
          <td><input type="number" name="color3_${rowCount}" value="0"></td>
          <td><input type="number" name="color4_${rowCount}" value="0"></td>
      `;
  tableBody.appendChild(row);
}

document.getElementById('upload-form').addEventListener('submit', function (event) {
  event.preventDefault();

  let fileInput = document.getElementById('file-input');
  let file = fileInput.files[0];

  if (file) {
    let formData = new FormData();
    formData.append('file', file);

    fetch('/upload/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    alert('Please select a file to upload');
  }
});

// ***********************************************************************************
function createTableHeaders(data) {
  const tableHead = document.querySelector("#recordsTable thead");
  tableHead.innerHTML = "";
  const headers = Object.keys(data[0]);
  const headerRow = document.createElement("tr");

  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
    headerRow.appendChild(th);
  });

  const th = document.createElement("th");
  th.textContent = "Dropdown"; // Adding header for the dropdown column
  headerRow.appendChild(th);

  tableHead.appendChild(headerRow);
}

function displayRecords(data) {
  const tableBody = document.querySelector("#recordsTable tbody");
  tableBody.innerHTML = "";

  data.forEach(record => {
    const row = document.createElement("tr");

    Object.keys(record).forEach(key => {
      const cell = document.createElement("td");
      cell.textContent = record[key];
      row.appendChild(cell);
    });

    const dropdownCell = document.createElement("td");
    row.appendChild(dropdownCell); // Create empty cell for the dropdown

    tableBody.appendChild(row);
  });
}

function createDropdown() {
  // Create the dropdown element
  var select = document.createElement('select');

  // Create the Sync option
  var optionSync = document.createElement('option');
  optionSync.value = 'sync';
  optionSync.text = 'Sync';
  select.appendChild(optionSync);

  // Create the Async option
  var optionAsync = document.createElement('option');
  optionAsync.value = 'async';
  optionAsync.text = 'Async';
  select.appendChild(optionAsync);

  return select;
}

function addDropdownToAllRows() {
  // Get all rows in the table, skipping the header row
  var rows = document.querySelectorAll('#recordsTable tbody tr');

  // Iterate through each row
  rows.forEach(function (row) {
    // Create a new dropdown
    var dropdown = createDropdown();

    // Get the fifth cell or create it if it doesn't exist
    var cell = row.cells[2];
    if (!cell) {
      cell = row.insertCell(2);
    } else {
      // Clear any existing content
      cell.innerHTML = '';
    }

    // Append the dropdown to the fifth cell
    cell.appendChild(dropdown);
  });
}

function applySelectedOptionToAll() {
  // Get the value of the first dropdown in the table
  var firstDropdown = document.querySelector('#recordsTable tbody tr select');
  if (!firstDropdown) return;

  var selectedValue = firstDropdown.value;

  // Get all dropdowns in the table
  var dropdowns = document.querySelectorAll('#recordsTable tbody select');

  // Iterate through each dropdown and set its value to the selected value
  dropdowns.forEach(function (dropdown) {
    dropdown.value = selectedValue;
  });
}

// Ensure the addDropdownToAllRows is called at the right time
document.addEventListener("DOMContentLoaded", function () {
  const jsonData = JSON.parse('{{ df_json|escapejs }}');

  if (jsonData.length > 0) {
    createTableHeaders(jsonData);
    displayRecords(jsonData);
    addDropdownToAllRows(); // Add this line to ensure dropdowns are added after records are displayed
  } else {
    console.log("No data to display");
  }
});

function popup() {
  document.getElementById('upload-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    var formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {

      }
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.success) {
          alert('File uploaded successfully: ' + result.uploaded_file_url);
        } else {
          alert('Upload failed: ' + JSON.stringify(result.errors));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while uploading the file.');
      });
  });

};



// [2, 2, 5]
// [1, 2, 5]
