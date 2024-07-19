function uploadfile() {
  document.getElementById('upload-button').addEventListener('click', function() {
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
    rows.forEach(function(row) {
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
    dropdowns.forEach(function(dropdown) {
        dropdown.value = selectedValue;
    });
}

// Ensure the addDropdownToAllRows is called at the right time
document.addEventListener("DOMContentLoaded", function() {
    const jsonData = JSON.parse('{{ df_json|escapejs }}');

    if (jsonData.length > 0) {
        createTableHeaders(jsonData);
        displayRecords(jsonData);
        addDropdownToAllRows(); // Add this line to ensure dropdowns are added after records are displayed
    } else {
        console.log("No data to display");
    }
});
