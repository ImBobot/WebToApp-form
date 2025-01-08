document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission
  document.getElementById("message").textContent = "Submitting..";
  document.getElementById("message").style.display = "block";
  document.getElementById("submit-button").disabled = true;

  // Collect the form data
  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Send a POST request to your Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbzMbf6HItoIuJwJiAqp7GVLYQwS0XupRi7o6PsaEjkZsNr5dlXuZPhYF0yhQjWB8MCigQ/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  )
    .then(function (response) {
      // Check if the request was successful
      if (response) {
        return response; // Assuming your script returns JSON response
      } else {
        throw new Error("Failed to submit the form.");
      }
    })
    .then(function (data) {
      // Display a success message
      document.getElementById("message").textContent =
        "Data submitted successfully!";
      document.getElementById("message").style.display = "block";
      document.getElementById("message").style.backgroundColor = "green";
      document.getElementById("message").style.color = "beige";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("form").reset();

      setTimeout(function () {
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.display = "none";
      }, 2600);
    })
    .catch(function (error) {
      // Handle errors, you can display an error message here
      console.error(error);
      document.getElementById("message").textContent =
        "An error occurred while submitting the form.";
      document.getElementById("message").style.display = "block";
    });
});


// const DATA_ENTRY_SHEET_NAME = "Sheet1";
// const TIME_STAMP_COLUMN_NAME = "Timestamp"; 
// var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_ENTRY_SHEET_NAME);

// const doPost = (request = {}) => {
//   const { postData: { contents, type } = {} } = request;
//   var data = parseFormData(contents);
//   appendToGoogleSheet(data);
//  return ContentService.createTextOutput(contents).setMimeType(ContentService.MimeType.JSON);
// };
// function parseFormData(postData) {
//   var data = [];
//   var parameters = postData.split('&');
//   for (var i = 0; i < parameters.length; i++) {
//     var keyValue = parameters[i].split('=');
//     data[keyValue[0]] = decodeURIComponent(keyValue[1]);
//   }
//   return data;
// }
// function appendToGoogleSheet(data) {
//   if(TIME_STAMP_COLUMN_NAME !== ""){
//     data[TIME_STAMP_COLUMN_NAME] = new Date();
//   }
//   var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//   var rowData = headers.map(headerFld => data[headerFld]);
//   sheet.appendRow(rowData);
// }
