const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photoArray = [];

// unsplash api
const count = 30;

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//helper function to set attrributes on dom elements

function setAttributes(elements, attrributes) {
  for (const key in attrributes) {
    elements.setAttribute(key, attrributes[key]);
  }
}

//create elements for links & photo add it to the Dom
function displayPhotos() {
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    //create a link to splash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // create an img
    const img = document.createElement('img');
    //helper function called
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // append it to a , then add it to the container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//getPhoto
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

//check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
  }
}

// check to if there scrolling near to bottom of the page, laod more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    // getPhotos();
    console.log('load more');
  }
  console.log('scrolled');
});

// onLoad
// getPhotos();
