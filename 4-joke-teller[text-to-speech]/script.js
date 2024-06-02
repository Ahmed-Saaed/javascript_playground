const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeText = document.getElementById('jokeText');

//Disable / Enable the Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// get jokes from API
async function getJokes() {
  let joke = '';

  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    jokeText.textContent = joke;

    //text-to-speech
    tellME(joke);
    //disable button
    toggleButton();
  } catch (error) {
    // catch error
  }
}

//passing the joke to voice rcc
function tellME(joke) {
  VoiceRSS.speech({
    key: '26b8f3523120426785c709c53683f22c',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

function sayMyName(value) {
  VoiceRSS.speech({
    key: '26b8f3523120426785c709c53683f22c',
    src: value,
    hl: 'ar-eg',
    v: 'Oda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// test();
