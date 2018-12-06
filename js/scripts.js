// plik scripts.js

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var prefix = "https://cors-anywhere.herokuapp.com/";


function getQuote() {
    fetch(prefix + quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
	var quoteAuthor = data.title;
	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		document.querySelector('.quote').innerText = quoteText;
		document.querySelector('.author').innerText = "Author: " + quoteAuthor;
		document.querySelector('.tweet').setAttribute('href', tweet);
	}
	
	
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});









/*---------------------JQUERY-------------------------
function getQuote() {
	$.getJSON(quoteUrl, createTweet);
}

function createTweet(input) {
	if (!input.quoteAuthor.length) {
		input.quoteAuthor = "Unknown author";
	}
	var tweetText = "Quote of the day - " + input.quoteText + " Author: " + input.quoteAuthor;
	
	if (tweetText.length > 140) {
		getQuote();
	} 
	else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(input.quoteText);
		$('.author').text("Author: " + input.quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
	$('.tweet').attr('href', tweet);
}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
		getQuote();
	})
});

*/