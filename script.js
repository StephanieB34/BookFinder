"use strict";

var apiKey = "478e0a6fb75449b986daf400d6d72c50";

var searchURL = "https://api.nytimes.com/svc/books/v3/lists.json";
//const googleBooksKey = "AIzaSyCMWQfZEffiicT5FNa2Dx_PUYdVLpaJBW4"
var bookArray = [];

//---loading page- hide results and details page
$(document).ready(function() {
  //
});

//doesn't show list again after going back
$(".nav-link-list").on("click", function(event) {
  event.preventDefault();
  showLandingPage();
});
$(".back").click(function(event) {
  event.preventDefault();
  showResultsPage();
});

$("#list-form").submit(function(event) {
  event.preventDefault();
  let selectedList = $("#list").val();
  getDataFromAPI(selectedList);
  showResultsPage();
});

function showLandingPage() {
  $("#landing-page").show();
  $("#results-page").hide();
  $("#details-page").hide();
}
function showResultsPage() {
  $("#landing-page").hide();
  $("#results-page").show();
  $("#details-page").hide();
}
function showDetailsPage() {
  $("#landing-page").hide();
  $("#results-page").hide();
  $("#details-page").show();
}

$("#results-list").on("click", ".details-button", function(event) {
  event.preventDefault();
  showDetailsPage();
  let index = $(this).attr("data-index");
  displayDetails(bookArray[index]);
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
    .then(responseJson => {
      bookArray = responseJson.results;
      console.log("book array:", bookArray);
      displayResults(bookArray);
    })
    .catch(err => {
      console.log(err);
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join("&");
}

function displayResults(bookArray) {
  $("#results-list").empty();
  for (let i = 0; i < bookArray.length; i++) {
    $("#results-list").append(
      `<li>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover">
        <h3>${bookArray[i].book_details[0].title}</h3>
        <p>${bookArray[i].book_details[0].author}</p>
        <a href="${bookArray[i].amazon_product_url}">Buy</a>
        <button data-index="${i}" class="details-button">details</button>
        <div class="clear"></div>
       </li>`
    );
  }
}

function displayDetails(book) {
  console.log("Details for book:", book);
  $(".details-container").empty();
  $(".details-container").append(
    `<div>
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover">
       <h3>${book.book_details[0].title}</h3>
       <p>${book.book_details[0].description}</p>
       <p>${book.book_details[0].author}</p>
       <p>Publisher:${book.book_details[0].publisher}</p>
    </div>`
  );
}
