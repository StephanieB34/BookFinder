'use strict';

const nytimesKey = " 478e0a6fb75449b986daf400d6d72c50"
var  searchURL = "https://api.nytimes.com/svc/books/v3/lists.json"
const googleBooksKey = "AIzaSyCMWQfZEffiicT5FNa2Dx_PUYdVLpaJBW4"

//---loading page- hide results and details page
$(document).ready(function (){
  $('.results').hide();
  $('.details').hide();
});

$('#action.page').submit(function (event) {
  event.preventDefault();
  let selectedList = $("#list").val();

  getDataFromAPI(selectedList);
});

function getDataFromAPI(selectedList) {
  fetch (searchURL)
  .then(response => {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    console.log(err);
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

