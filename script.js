"use strict";

var apiKey = "478e0a6fb75449b986daf400d6d72c50";

var searchURL = "https://api.nytimes.com/svc/books/v3/lists.json";
//const googleBooksKey = "AIzaSyCMWQfZEffiicT5FNa2Dx_PUYdVLpaJBW4"

//---loading page- hide results and details page
$(document).ready(function() {
  $(".results").hide();
  $(".details").hide();
});

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
  console.log(responseJson);

  $("#list-form").hide();
  $("#results").show();
  $("#list-form").hide();
  for (let i = 0; i < responseJson.results.length; i++) {
    $("#results-list").append(
      `<li>
        <h3>${responseJson.results[i].book_details[0].title}</h3>
        <p>${responseJson.results[i].book_details[0].author}</p>
        <p>${responseJson.results[i].isbns[0].isbn13}</p>
      </li>`
    );
  }

  $("#results").removeClass("hidden");
}

function getRequest(term, lists) {}
