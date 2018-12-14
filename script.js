"use strict";

var apiKey = "478e0a6fb75449b986daf400d6d72c50";

var searchURL = "https://api.nytimes.com/svc/books/v3/lists.json";
//const googleBooksKey = "AIzaSyCMWQfZEffiicT5FNa2Dx_PUYdVLpaJBW4"

//---loading page- hide results and details page
$(document).ready(function() {
  $(".results").hide();
  $(".details").hide();
});
//doesn't show list again after going back
$('.nav-link-list').on("click", function (event) {
  event.preventDefault();
  $("#list-form").show();
  $('.results-container').hide();
  $('.main-section').show();
})

$("#list-form").submit(function(event) {

  event.preventDefault();
  let selectedList = $("#list").val();
  getDataFromAPI(selectedList);
});

function getDataFromAPI(selectedList) {
  const params = {
    list: selectedList,
    "api-key": apiKey
  };
  const url = searchURL + "?" + formatQueryParams(params);

  fetch(url, { method: "GET" })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson)
  $("#list-form").hide();
  $('.main-section').hide();
  $("#results").show();
  for (let i = 0; i < responseJson.results.length; i++) {
    $("#results-list").append(
      `<li>
        <h3>${responseJson.results[i].book_details[0].title}</h3>
        <p>${responseJson.results[i].book_details[0].author}</p>
        <p>${responseJson.results[i].isbns[0].isbn13}</p>
        '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover" id="cover-'+ '">'
      </li>`
    )};
}

$('#buy-button').click(function(event) {
  event.preventDefault();
  window.location='http://www.amazon.com';
  $('.results-container').show();
  $('.main-section').hide();
  $('#list-form').hide();
});



$('.detail-button').on("click", function (event) {
  event.preventDefault();
  //$('.details').removeClass(hidden);
  $('#details').show();
  $('.results').hide();
  $('.main-section').hide();
  $('#list-form').hide();
});

function displayDetails (responseJson) {
  console.log(responseJson)
  $('#list-form').hide();
  $('.main-section').hide();
  $('#results').hide();
  $('#details').show();
  for (let i = 0; i < responseJson.results.length; i++) {
    $("#results-list").append(
      `<li>
      <h3>${responseJson.results[i].book_details[0].description}</h3>
      </li>`
    )};
}


