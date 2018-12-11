'use strict';

var apiKey = "478e0a6fb75449b986daf400d6d72c50"

var  searchURL = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${apiKey}`
//const googleBooksKey = "AIzaSyCMWQfZEffiicT5FNa2Dx_PUYdVLpaJBW4"

//---loading page- hide results and details page
$(document).ready(function (){
  $('.results').hide();
  $('.details').hide();
});

$('#list-form').submit(function (event) {
  event.preventDefault();
  let selectedList = $("#list").val();

  getDataFromAPI(selectedList);
});



function getDataFromAPI(selectedList) {
  var url = `${searchURL}&list=${selectedList}`
  fetch (url, {method: 'GET'})
  .then(response => {
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

function displayResults(responseJson) {
  console.log(responseJson);
  // $('#results').show();
  // $('#action.page').hide();
  // for(let i= 0; i< responseJson.items.length; i++) {

  //   $('#results-list').append (
  //     `<li><h3>${responseJson.items[i].book.title}</h3>
  //     <p>${responseJson.items[i].book.author}</p>
  //     <p>${responseJson.items[i].book.isnb}</p>
  //     </li>`
  //   )
  // };
  
  // $('#results').removeClass('hidden');
}

function getRequest(term, lists) {
  $('#list-form').hide();
  $('#results').show();

  
}