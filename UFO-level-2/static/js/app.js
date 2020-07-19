// from data.js
var tableData = data;
// YOUR CODE HERE!

// Make sure to check if variables are already named in css file.
// Use D3 for table references
var tbody = d3.select("tbody");

// function used to add data from data.js to table
function buildTable(data) {
    //clear table
    tbody.html("");
    
    //iterate through table rows.
    //tr is the table row, td is the table data.
    data.forEach((dataRow) => {
        var row = tbody.append("tr");
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

// Keep Track of all filters with a dictionary, NOT A LIST.
var filterList = {};

function filterFiller() {

  // get the element, value, and id of the filter that was changed
  var getElement = d3.select(this).select("input"); // Selects all inputs that have been changed
  var getValue = getElement.property("value"); // date, specific state, city, etc.
  var getId = getElement.attr("id"); // keys for the filterList dictionary

  // If a value (specific date or city or etc.) was entered then add that filterId and value to the filters list. 
  // Otherwise, it removes the filter from the filterList
  if (getValue) {
    filterList[getId] = getValue;
  }
  else {
    delete filterList[getId];
  }

  // Call function to apply all filters and rebuild the table
  filterTable();

}

//similar to level 1, but requires use of dictionary componenets.
function filterTable() {

    d3.event.preventDefault();
    let filteredData = tableData;

  // Loop through all of the filters and find the data that matches the values in filterList
    Object.entries(filterList).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
    });

  buildTable(filteredData);
}

// Unlike before where we used a button, this allows the table to be updated in real time whenever there's a valid input.
d3.selectAll(".filter").on("change", filterFiller);

// Build the table when the page loads
buildTable(tableData);
