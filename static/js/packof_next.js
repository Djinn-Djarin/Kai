// *****************Gaurav*****************************
let gettdval = [];
let colorsdata = [];
let filteredArraydata = [];
let duplicatepackofarray = [];
let getfinalobj = [];
let objKeysarr = [];
let trueValueArray = [];
let totalvalueArray = [];
let outsideflatedarray = [];
let outsideResultArray = []

let colorsvalues = [];
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
  console.log('this is for genrate table');
  // Get the input values
  const packof = document.getElementById('packof').value;
  const color = document.getElementById('color').value;
  // Split the packof input into an array
  const packofArray = packof.split(',');
  let colors = color.split(',');
  colorsvalues.push(...colors);
  duplicatepackofarray.push(...packofArray);
  console.log(packofArray.length, colors.length);
  console.log(packofArray, colors);


  if (packofArray.length <= 1 || colors.length <= 0) {
    console.log('inifcondition');
    return null;
  }
  else {
    console.log('inelse');
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
      th.className = 'sideTablecenter'
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
            <td class="centernumbers">${item}</td>
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
    console.log(table);
    document.getElementById('Sendjsondata').style.display = 'block'
  }
}

let Sendjsondata = document.getElementById('Sendjsondata');
console.log(Sendjsondata, ": sendjsondata");

Sendjsondata.addEventListener('click', () => {
  console.log('this is log for SendJsonData');
  let bottomcontainer = document.querySelector('.bottomcontainer').style.display = 'block'
  let rightsidecontainer = document.querySelector('.rightsidecontainer');
  rightsidecontainer.style.display = 'block'
  let getdataval = document.querySelectorAll('.getidvalue');
  let gettdval = [];
  let filteredArraydata = [];

  Array.from(getdataval).forEach((item) => {
    gettdval.push(item.value);
  });

  let filteredArray = gettdval.filter(item => item.trim() !== '');
  console.log(filteredArray, "for filterArrayline110......");
  filteredArraydata.push(...filteredArray);

  const funcalling = divideArray(filteredArraydata, colorsdata.length);
  console.log(funcalling, "funcallingarray");
  const getcolorarraylenght = colorsdata.length;
  const getlastarray = funcalling.splice(-getcolorarraylenght);
  let resultArray = [];
  console.log(duplicatepackofarray, "duplicateArray", );
  console.log(getlastarray,":getlastarray");
  duplicatepackofarray.forEach((item, i) => {
    if (getlastarray[i]) {
      let obj = {};
      obj[item] = getlastarray[i];
      resultArray.push(obj);
    }
  });
  resultArray.push(...colorsvalues)
  console.log(resultArray, "getfinalobj");
  outsideResultArray.push(...resultArray)


  // fetch('//', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(resultArray)
  // })
  //   .then(response => {
  //     console.log(response, "for response");
  //     response.json()
  //   })
  //   .then(data => {
  //     if (data.message) {
  //       document.getElementById('message').innerText = data.message;
  //     }

  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //     document.getElementById('message').innerText = 'An error occurred. Please try again.';
  //   });


});

function divideArray(arr, n) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}

// ***********************************Gaurav*****************************************

function sendData() {


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
  console.log(headerRow)

  headers.forEach(header => {
    const th = document.createElement("th");
    th.className = 'maintabledata'
    th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
    headerRow.appendChild(th);
  });

  // const th = document.createElement("th");
  // th.textContent = "Dropdown"; // Adding header for the dropdown column
  // headerRow.appendChild(th);

  tableHead.appendChild(headerRow);
}

function displayRecords(data) {
  const tableBody = document.querySelector("#recordsTable tbody");
  tableBody.innerHTML = "";

  data.forEach(record => {
    const row = document.createElement("tr");

    Object.keys(record).forEach(key => {
      const cell = document.createElement("td");
      cell.className = 'maintabledata'
      cell.textContent = record[key];
      row.appendChild(cell);
    });


    tableBody.appendChild(row);
  });
}


// Ensure the addDropdownToAllRows is called at the right time
document.addEventListener("DOMContentLoaded", function () {
  const jsonData = JSON.parse('{{ df_json|escapejs }}');

  if (jsonData.length > 0) {
    createTableHeaders(jsonData);
    displayRecords(jsonData);
    // addDropdownToAllRows(); // Add this line to ensure dropdowns are added after records are displayed
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

