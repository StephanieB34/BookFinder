"use strict";

var apiKey = "478e0a6fb75449b986daf400d6d72c50";
var googleBooksKey="AIzaSyDGU-FxJ-Dl4ax8JmNmzTwpImlD_x75OMw";
var searchURL = "https://api.nytimes.com/svc/books/v3/lists.json";
var defaultImg ="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png"
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
  if(bookArray[i].isbns && bookArray[i].isbns.length > 0) {
    var isbn = bookArray[i].isbns[0].isbn10;
    $("#results-list").append(
      `<li>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover" id="cover-${isbn}">
        <h3>${bookArray[i].book_details[0].title}</h3>
        <p>${bookArray[i].book_details[0].author}</p>
        <a href="${bookArray[i].amazon_product_url}" class="button">Buy</a>
        <button data-index="${i}" class="details-button button">details</button>
        <div class="clear"></div>
       </li>`
    );
    
    updateCover(isbn,i);
  }
  }
}

function updateCover(isbn,index) {
  fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=" + googleBooksKey, {
    method: 'get'
  })
  .then(response => { return response.json(); })
  .then(data => {
    var img = data.items? data.items[0].volumeInfo.imageLinks.thumbnail : defaultImg; 
    img = img.replace(/^http:\/\//i, 'https://');
    $('#cover-' + isbn).attr('src', img);
    bookArray[index].image=img
  })
  .catch(error => {
    console.log(error);
    console.log('Googel API Error: Defaulting to archival images for book' + ' ISBN: ' + isbn);
    /*var index = id - 1;
    var img = archivedImages[index];
    $('#cover-' + id).attr('src', img);*/
  });
}


function displayDetails(book) {
  console.log("Details for book:", book);
  $(".details-container").empty();
  $(".details-container").append(
    `<div>
    <img src="${book.image||defaultImg}" class="book-cover">
       <h3>${book.book_details[0].title}</h3>
       <p>${book.book_details[0].description}</p>
       <p>${book.book_details[0].author}</p>
       <p>Publisher:${book.book_details[0].publisher}</p>
    </div>`
  );
}
