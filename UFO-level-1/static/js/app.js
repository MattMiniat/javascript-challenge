// from data.js
var tableData = data;

// YOUR CODE HERE!
// Make sure to name variables that are already in css file.
// Use D3 for table references
var tbody = d3.select("tbody");

// function used to add data from data.js to table
function buildTable(data) {
    //clear table
    tbody.html("");
    
    //iterate through table rows and add values to the html based on their values and id.
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

// filter function
function filterClick() {
//prevent page from refreshing VERY IMPORTANT!!!!!!!!!!!!!
   d3.event.preventDefault();

// Take date from input and filter table.
   var date = d3.select("#datetime").property("value");
   let filterData = tableData;

//conditional to make sure it's a date, then filters through
    if(date) {
        filterData = filterData.filter(row => row.datetime === date);
    }
//rebuild table with filtereddata
    buildTable(filterData);
}

//statement for filter button
d3.selectAll("#filter-btn").on("click", filterClick);

// Build the table when the page loads
buildTable(tableData);