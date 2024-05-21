const quoteContainer = document.getElementById('quote-box');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author-title');
const twitterButton = document.getElementById('tweet-quote');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// different api links:
// https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request

// https://zenquotes.io/api/today - Generate the quote of the day on each request

// https://zenquotes.io/api/random - Generate a random quote on each request

function newQuote() {
  loading();

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // check the quote lengt

  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // set the quote & hide the loader

  quoteText.textContent = quote.text;
  complete();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, '_blank');
}

async function getQuote() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

//Event listeners

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// onLoad
getQuote();
